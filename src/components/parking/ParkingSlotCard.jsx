import {
  CarFront,
  Wrench,
  CircleCheck,
} from "lucide-react";

function getStatusStyle(status) {
  switch (status) {
    case "available":
      return "bg-emerald-100 text-emerald-700";

    case "occupied":
      return "bg-red-100 text-red-700";

    case "maintenance":
      return "bg-slate-200 text-slate-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getStatusLabel(status) {
  switch (status) {
    case "available":
      return "🟢 Available";

    case "occupied":
      return "🔴 Occupied";

    case "maintenance":
      return "⚙ Maintenance";

    default:
      return status;
  }
}

export default function ParkingSlotCard({
  slot,
  isAdmin,
  isGateStaff,
  onEdit,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

      <div className="mb-4 flex items-center justify-between">

        <h2 className="text-xl font-bold">
          {slot.slot_number}
        </h2>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
            slot.status
          )}`}
        >
          {getStatusLabel(slot.status)}
        </span>

      </div>

      <div className="space-y-2 text-sm text-slate-600">

        <p>
          📍 <strong>Zone:</strong> {slot.zone}
        </p>

        <p>
          🏢 <strong>Floor:</strong> {slot.floor}
        </p>

        <p>
          🚗 <strong>Vehicle:</strong> {slot.slot_type}
        </p>

        <p>
          💰 <strong>Rate:</strong> KES {slot.base_rate}/hr
        </p>

        {slot.has_charger && (
          <p className="font-medium text-[#1A5F7A]">
            ⚡ EV Charging Available
          </p>
        )}

      </div>

      {(isAdmin || isGateStaff) &&
        slot.current_session && (

          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">

            <h3 className="mb-2 font-semibold text-slate-800">
              Occupancy Details
            </h3>

            <p>
              👤 <strong>Driver:</strong>{" "}
              {slot.current_session.driver_name}
            </p>

            <p>
              🆔 <strong>Driver ID:</strong>{" "}
              #{slot.current_session.driver_id}
            </p>

            <p>
              🚘 <strong>Plate:</strong>{" "}
              {slot.current_session.license_plate}
            </p>

            <p>
              🕒 <strong>Checked In:</strong>{" "}
              {new Date(
                slot.current_session.check_in_time
              ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

          </div>
        )}

      {isAdmin && !slot.current_session && (
        <button
          onClick={() => onEdit(slot)}
          className="mt-5 w-full rounded-xl bg-[#1A5F7A] py-2 font-semibold text-white transition hover:bg-[#144b61]"
        >
          ⚙ Edit Slot
        </button>
      )}

      {slot.current_session && (
        <div className="mt-5 rounded-xl bg-red-50 p-3 text-center text-sm font-medium text-red-700">
          🔒 Slot currently occupied.
          Check out the vehicle before editing.
        </div>
      )}

    </div>
  );
}