import { Search } from "lucide-react";

export default function ParkingFilters({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  zoneFilter,
  setZoneFilter,
}) {
  return (
    <div className="mb-8 grid gap-4 md:grid-cols-3">

      <div className="relative">

        <Search
          size={18}
          className="absolute left-3 top-3.5 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search slot..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-3 shadow-sm focus:border-[#1A5F7A] focus:outline-none"
        />

      </div>

      <select
        value={statusFilter}
        onChange={(e) =>
          setStatusFilter(e.target.value)
        }
        className="rounded-xl border border-slate-300 bg-white p-3 shadow-sm"
      >
        <option value="all">
          All Status
        </option>

        <option value="available">
          Available
        </option>

        <option value="occupied">
          Occupied
        </option>

        <option value="maintenance">
          Maintenance
        </option>

      </select>

      <select
        value={zoneFilter}
        onChange={(e) =>
          setZoneFilter(e.target.value)
        }
        className="rounded-xl border border-slate-300 bg-white p-3 shadow-sm"
      >
        <option value="all">
          All Zones
        </option>

        <option value="A">
          Zone A
        </option>

        <option value="B">
          Zone B
        </option>

        <option value="C">
          Zone C
        </option>

      </select>

    </div>
  );
}