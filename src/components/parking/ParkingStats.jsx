import {
  ParkingSquare,
  CircleCheck,
  CarFront,
  Wrench,
} from "lucide-react";

export default function ParkingStats({
  total,
  available,
  occupied,
  maintenance,
}) {
  return (
    <div className="mb-8 grid gap-4 md:grid-cols-4">

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="mb-2 flex items-center gap-2">
          <ParkingSquare
            size={20}
            className="text-[#1A5F7A]"
          />
          <span className="font-medium">
            Total Slots
          </span>
        </div>

        <p className="text-3xl font-bold">
          {total}
        </p>
      </div>

      <div className="rounded-2xl bg-emerald-50 p-5 shadow-sm">
        <div className="mb-2 flex items-center gap-2">
          <CircleCheck
            size={20}
            className="text-emerald-600"
          />
          <span className="font-medium">
            Available
          </span>
        </div>

        <p className="text-3xl font-bold text-emerald-600">
          {available}
        </p>
      </div>

      <div className="rounded-2xl bg-red-50 p-5 shadow-sm">
        <div className="mb-2 flex items-center gap-2">
          <CarFront
            size={20}
            className="text-red-500"
          />
          <span className="font-medium">
            Occupied
          </span>
        </div>

        <p className="text-3xl font-bold text-red-500">
          {occupied}
        </p>
      </div>

      <div className="rounded-2xl bg-slate-100 p-5 shadow-sm">
        <div className="mb-2 flex items-center gap-2">
          <Wrench
            size={20}
            className="text-slate-600"
          />
          <span className="font-medium">
            Maintenance
          </span>
        </div>

        <p className="text-3xl font-bold text-slate-700">
          {maintenance}
        </p>
      </div>

    </div>
  );
}