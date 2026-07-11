export default function SlotModal({
  selectedSlot,
  setSelectedSlot,
  onSave,
  onDelete,
}) {
  if (!selectedSlot) return null;

  const isEditing = !!selectedSlot.id;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">

        <h2 className="mb-6 text-2xl font-bold text-slate-800">
          {isEditing
            ? "Edit Parking Slot"
            : "Create Parking Slot"}
        </h2>

        <div className="space-y-4">

          <div>
            <label className="mb-1 block font-medium">
              Slot Number
            </label>

            <input
              value={selectedSlot.slot_number}
              onChange={(e) =>
                setSelectedSlot({
                  ...selectedSlot,
                  slot_number: e.target.value.toUpperCase(),
                })
              }
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">
              Floor
            </label>

            <input
              type="number"
              min="1"
              value={selectedSlot.floor}
              onChange={(e) =>
                setSelectedSlot({
                  ...selectedSlot,
                  floor: Math.max(
                    1,
                    Number(e.target.value)
                  ),
                })
              }
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">
              Zone
            </label>

            <select
              value={selectedSlot.zone}
              onChange={(e) =>
                setSelectedSlot({
                  ...selectedSlot,
                  zone: e.target.value,
                })
              }
              className="w-full rounded-xl border p-3"
            >
              <option value="A">Zone A</option>
              <option value="B">Zone B</option>
              <option value="C">Zone C</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-medium">
              Vehicle Type
            </label>

            <select
              value={selectedSlot.slot_type}
              onChange={(e) =>
                setSelectedSlot({
                  ...selectedSlot,
                  slot_type: e.target.value,
                })
              }
              className="w-full rounded-xl border p-3"
            >
              <option value="car">
                Car
              </option>

              <option value="motorbike">
                Motorbike
              </option>

              <option value="ev">
                Electric Vehicle
              </option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-medium">
              Hourly Rate
            </label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={selectedSlot.base_rate}
              onChange={(e) =>
                setSelectedSlot({
                  ...selectedSlot,
                  base_rate: e.target.value,
                })
              }
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">
              Status
            </label>

            <select
              value={selectedSlot.status}
              onChange={(e) =>
                setSelectedSlot({
                  ...selectedSlot,
                  status: e.target.value,
                })
              }
              className="w-full rounded-xl border p-3"
            >
              <option value="available">
                Available
              </option>

              <option value="maintenance">
                Maintenance
              </option>
            </select>
          </div>

          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={selectedSlot.has_charger}
              onChange={(e) =>
                setSelectedSlot({
                  ...selectedSlot,
                  has_charger: e.target.checked,
                })
              }
            />

            <span>
              EV Charging Available
            </span>

          </label>

        </div>

        <div className="mt-8 flex items-center justify-between">

          <div>
            {isEditing && (
              <button
                onClick={onDelete}
                className="rounded-xl bg-red-600 px-5 py-2 font-semibold text-white transition hover:bg-red-700"
              >
                🗑 Delete Slot
              </button>
            )}
          </div>

          <div className="flex gap-3">

            <button
              onClick={() =>
                setSelectedSlot(null)
              }
              className="rounded-xl border px-5 py-2"
            >
              Cancel
            </button>

            <button
              onClick={onSave}
              className="rounded-xl bg-[#1A5F7A] px-5 py-2 font-semibold text-white transition hover:bg-[#144b61]"
            >
              {isEditing
                ? "Save Changes"
                : "Create Slot"}
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}