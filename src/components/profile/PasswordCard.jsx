import { useState } from "react";
import toast from "react-hot-toast";

import { changePassword } from "../../services/profileService";

export default function PasswordCard() {
  const [form, setForm] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  function updateField(field, value) {
    setForm({
      ...form,
      [field]: value,
    });
  }

  async function handleChangePassword() {
    try {
      await changePassword(form);

      toast.success("Password changed successfully.");

      setForm({
        old_password: "",
        new_password: "",
        confirm_password: "",
      });

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.error ||
        error.response?.data?.detail ||
        "Unable to change password."
      );
    }
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold text-slate-800">
        Change Password
      </h2>

      <div className="space-y-5">

        <div>
          <label className="mb-1 block font-medium">
            Current Password
          </label>

          <input
            type="password"
            value={form.old_password}
            onChange={(e) =>
              updateField("old_password", e.target.value)
            }
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">
            New Password
          </label>

          <input
            type="password"
            value={form.new_password}
            onChange={(e) =>
              updateField("new_password", e.target.value)
            }
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">
            Confirm Password
          </label>

          <input
            type="password"
            value={form.confirm_password}
            onChange={(e) =>
              updateField("confirm_password", e.target.value)
            }
            className="w-full rounded-xl border p-3"
          />
        </div>

      </div>

      <div className="mt-8 flex justify-end">

        <button
          onClick={handleChangePassword}
          className="rounded-xl bg-[#1A5F7A] px-6 py-2 font-semibold text-white transition hover:bg-[#144b61]"
        >
          Change Password
        </button>

      </div>

    </div>
  );
}