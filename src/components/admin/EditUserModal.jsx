import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { updateUser } from "../../services/adminService";

export default function EditUserModal({
  isOpen,
  user,
  onClose,
  onSuccess,
}) {
  const [form, setForm] = useState({});

  useEffect(() => {
    if (user) setForm(user);
  }, [user]);

  if (!isOpen || !user) return null;

  function updateField(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSave() {
    try {
      await updateUser(user.id, form);

      toast.success("User updated successfully.");

      onSuccess();
      onClose();

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.error ??
        "Unable to update user."
      );
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">

        <h2 className="mb-6 text-2xl font-bold">
          Edit User
        </h2>

        <div className="grid gap-4 md:grid-cols-2">

          <div>
            <label className="mb-1 block font-medium">
              Username
            </label>

            <input
              value={form.username ?? ""}
              onChange={(e) =>
                updateField("username", e.target.value)
              }
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">
              Email
            </label>

            <input
              value={form.email ?? ""}
              onChange={(e) =>
                updateField("email", e.target.value)
              }
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">
              First Name
            </label>

            <input
              value={form.first_name ?? ""}
              onChange={(e) =>
                updateField("first_name", e.target.value)
              }
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">
              Last Name
            </label>

            <input
              value={form.last_name ?? ""}
              onChange={(e) =>
                updateField("last_name", e.target.value)
              }
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">
              Phone Number
            </label>

            <input
              value={form.phone_number ?? ""}
              onChange={(e) =>
                updateField("phone_number", e.target.value)
              }
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">
              Role
            </label>

            <select
              value={form.role ?? "driver"}
              onChange={(e) =>
                updateField("role", e.target.value)
              }
              className="w-full rounded-xl border p-3"
            >
              <option value="driver">Driver</option>
              <option value="gate_staff">Gate Staff</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {form.role === "driver" && (
            <div className="md:col-span-2">

              <label className="mb-1 block font-medium">
                Default Vehicle
              </label>

              <input
                value={form.default_vehicle ?? ""}
                onChange={(e) =>
                  updateField(
                    "default_vehicle",
                    e.target.value.toUpperCase()
                  )
                }
                className="w-full rounded-xl border p-3"
              />

            </div>
          )}

        </div>

        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-xl border px-5 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="rounded-xl bg-[#1A5F7A] px-5 py-2 font-semibold text-white hover:bg-[#144b61]"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}