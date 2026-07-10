import { useState } from "react";
import toast from "react-hot-toast";

import { createUser } from "../../services/adminService";

const INITIAL_FORM = {
  username: "",
  email: "",
  password: "",
  first_name: "",
  last_name: "",
  phone_number: "",
  role: "driver",
};

export default function CreateUserModal({
  isOpen,
  onClose,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState(INITIAL_FORM);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleClose() {
    setForm(INITIAL_FORM);
    onClose();
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      await createUser(form);

      toast.success("User created successfully.");

      setForm(INITIAL_FORM);

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.error ||
          "Failed to create user."
      );
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-xl">

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800">
            Create New User
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Create a Driver, Gate Staff or Administrator account.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <div className="grid gap-4 md:grid-cols-2">

            <input
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
              className="rounded-xl border p-3"
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="rounded-xl border p-3"
            />

            <input
              name="first_name"
              placeholder="First Name"
              value={form.first_name}
              onChange={handleChange}
              className="rounded-xl border p-3"
            />

            <input
              name="last_name"
              placeholder="Last Name"
              value={form.last_name}
              onChange={handleChange}
              className="rounded-xl border p-3"
            />

            <input
              name="phone_number"
              placeholder="07XXXXXXXX"
              value={form.phone_number}
              onChange={handleChange}
              className="rounded-xl border p-3"
            />

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="rounded-xl border p-3"
            >
              <option value="driver">
                Driver
              </option>

              <option value="gate_staff">
                Gate Staff
              </option>

              <option value="admin">
                Administrator
              </option>
            </select>

          </div>

          <input
            name="password"
            type="password"
            placeholder="Temporary Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full rounded-xl border p-3"
          />

          <p className="text-xs text-slate-500">
            Users can change this password after logging in.
          </p>

          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border px-5 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[#1A5F7A] px-5 py-2 font-semibold text-white disabled:opacity-50"
            >
              {loading
                ? "Creating..."
                : "Create User"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}