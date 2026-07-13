import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfileCard({
  profile,
  onSave,
  onRefresh,
}) {
  const [form, setForm] = useState(profile);

  async function handleSave() {
    try {
      await onSave(form);

      toast.success("Profile updated successfully.");

      onRefresh();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.detail ??
        "Unable to update profile."
      );
    }
  }

  function updateField(field, value) {
    setForm({
      ...form,
      [field]: value,
    });
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold text-slate-800">
        Personal Information
      </h2>

      <div className="grid gap-5 md:grid-cols-2">

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
            Email
          </label>

          <input
            type="email"
            value={form.email ?? ""}
            onChange={(e) =>
              updateField("email", e.target.value)
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

        {form.role === "driver" && (
          <div className="md:col-span-2">

            <label className="mb-1 block font-medium">
              Default Vehicle
            </label>

            <input
              placeholder="KDA 123A"
              value={form.default_vehicle ?? ""}
              onChange={(e) =>
                updateField(
                  "default_vehicle",
                  e.target.value.toUpperCase()
                )
              }
              className="w-full rounded-xl border p-3"
            />

            <p className="mt-2 text-sm text-slate-500">
              Used as the default vehicle during check-in.
            </p>

          </div>
        )}

      </div>

      <div className="mt-8 flex justify-end">

        <button
          onClick={handleSave}
          className="rounded-xl bg-[#1A5F7A] px-6 py-2 font-semibold text-white transition hover:bg-[#144b61]"
        >
          Save Changes
        </button>

      </div>

    </div>
  );
}