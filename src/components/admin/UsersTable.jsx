import { useState } from "react";
import { UserCog, Plus } from "lucide-react";

import useAuth from "../../hooks/useAuth";
import useUsers from "../../hooks/useUsers";

import UserRow from "./UserRow";
import CreateUserModal from "./CreateUserModal";
import EditUserModal from "./EditUserModal";
import ConfirmModal from "../common/ConfirmModal";

export default function UsersTable() {
  const { user: currentUser } = useAuth();

  const {
    users,
    loading,
    busyId,
    refreshUsers,
    activate,
    deactivate,
  } = useUsers();

  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmUser, setConfirmUser] = useState(null);

  function handleEdit(user) {
    setSelectedUser(user);
    setShowEdit(true);
  }

  function handleToggle(user) {
    setConfirmUser(user);
  }

  async function handleConfirm() {
    if (!confirmUser) return;

    if (confirmUser.is_active) {
      await deactivate(
        confirmUser.id,
        confirmUser.username
      );
    } else {
      await activate(
        confirmUser.id,
        confirmUser.username
      );
    }

    setConfirmUser(null);
  }

  return (
    <>
      <CreateUserModal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        onSuccess={refreshUsers}
      />

      <EditUserModal
        isOpen={showEdit}
        user={selectedUser}
        onClose={() => {
          setShowEdit(false);
          setSelectedUser(null);
        }}
        onSuccess={refreshUsers}
      />

      <ConfirmModal
        isOpen={!!confirmUser}
        title={
          confirmUser?.is_active
            ? "Deactivate User"
            : "Activate User"
        }
        message={
          confirmUser &&
          `Are you sure you want to ${
            confirmUser.is_active
              ? "deactivate"
              : "activate"
          } ${confirmUser.username}?`
        }
        confirmText={
          confirmUser?.is_active
            ? "Deactivate"
            : "Activate"
        }
        confirmColor={
          confirmUser?.is_active
            ? "bg-red-600 hover:bg-red-700"
            : "bg-emerald-600 hover:bg-emerald-700"
        }
        onConfirm={handleConfirm}
        onCancel={() => setConfirmUser(null)}
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-6 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-[#1A5F7A]/10 p-3 text-[#1A5F7A]">
              <UserCog size={22} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800">
                User Management
              </h2>

              <p className="text-sm text-slate-500">
                {users.length} registered users
              </p>
            </div>

          </div>

          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 rounded-xl bg-[#1A5F7A] px-5 py-3 font-semibold text-white hover:bg-[#154b61]"
          >
            <Plus size={18} />
            Create User
          </button>

        </div>

        {loading ? (
          <p className="py-10 text-center text-slate-500">
            Loading users...
          </p>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>

                <tr className="border-b border-slate-200 text-sm uppercase tracking-wide text-slate-500">

                  <th className="pb-4">ID</th>
                  <th className="pb-4">User</th>
                  <th className="pb-4">Role</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4 text-right">Actions</th>

                </tr>

              </thead>

              <tbody>

                {users.map((user) => (
                  <UserRow
                    key={user.id}
                    user={user}
                    currentUser={currentUser}
                    busyId={busyId}
                    onEdit={handleEdit}
                    onToggle={handleToggle}
                  />
                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>
    </>
  );
}