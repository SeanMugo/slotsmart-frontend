import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserCog, Plus } from "lucide-react";

import {
  getAllUsers,
  activateUser,
  deactivateUser,
} from "../../services/adminService";

import useAuth from "../../hooks/useAuth";
import CreateUserModal from "./CreateUserModal";

const ROLE_LABELS = {
  driver: "Driver",
  gate_staff: "Gate Staff",
  admin: "Admin",
};

export default function UsersTable() {
  const { user: currentUser } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    setLoading(true);

    try {
      const data = await getAllUsers();

      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);

      toast.error("Could not load users.");
    } finally {
      setLoading(false);
    }
  }

  async function toggleActive(targetUser) {
    setBusyId(targetUser.id);

    try {
      if (targetUser.is_active) {
        await deactivateUser(targetUser.id);

        toast.success(
          `${targetUser.username} deactivated.`
        );
      } else {
        await activateUser(targetUser.id);

        toast.success(
          `${targetUser.username} activated.`
        );
      }

      loadUsers();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.error ||
          "Could not update this user."
      );
    } finally {
      setBusyId(null);
    }
  }

  return (
    <>
      <CreateUserModal
        isOpen={showCreateModal}
        onClose={() =>
          setShowCreateModal(false)
        }
        onSuccess={loadUsers}
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        {/* Header */}

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
            onClick={() =>
              setShowCreateModal(true)
            }
            className="flex items-center gap-2 rounded-xl bg-[#1A5F7A] px-5 py-3 font-semibold text-white transition hover:bg-[#154b61]"
          >
            <Plus size={18} />

            Create User
          </button>

        </div>

        {/* Table */}

        {loading ? (
          <p className="py-10 text-center text-slate-500">
            Loading users...
          </p>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>

                <tr className="border-b border-slate-200 text-sm uppercase tracking-wide text-slate-500">

                  <th className="pb-4">
                    User
                  </th>

                  <th className="pb-4">
                    Role
                  </th>

                  <th className="pb-4">
                    Status
                  </th>

                  <th className="pb-4 text-right">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {users.map((u) => (

                  <tr
                    key={u.id}
                    className="border-b border-slate-100 last:border-0"
                  >

                    <td className="py-5">

                      <p className="font-semibold text-slate-800">
                        {u.username}
                      </p>

                      <p className="text-sm text-slate-500">
                        {u.email}
                      </p>

                    </td>

                    <td>

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">
                        {ROLE_LABELS[u.role] ||
                          u.role}
                      </span>

                    </td>

                    <td>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          u.is_active
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {u.is_active
                          ? "Active"
                          : "Inactive"}
                      </span>

                    </td>

                    <td className="text-right">

                      <button
                        onClick={() =>
                          toggleActive(u)
                        }
                        disabled={
                          busyId === u.id ||
                          u.id === currentUser?.id
                        }
                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {busyId === u.id
                          ? "..."
                          : u.is_active
                          ? "Deactivate"
                          : "Activate"}
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}
      </div>
    </>
  );
}