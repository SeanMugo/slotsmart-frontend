import { useState } from "react";
import { ShieldCheck } from "lucide-react";

import useAuth from "../hooks/useAuth";
import CheckInForm from "../components/gate/CheckInForm";
import ActiveSessionsTable from "../components/gate/ActiveSessionsTable";

export default function GateDashboard() {
  const { user } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  const roleLabel =
    user?.role === "admin"
      ? "Administrator"
      : user?.role === "gate_staff"
      ? "Gate Staff"
      : "Driver";

  const roleDescription =
    user?.role === "admin"
      ? "Full access to parking operations and system administration."
      : "Responsible for vehicle check-in and check-out.";

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-8 py-10">

        {/* Header */}

        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

          <div>

            <p className="text-sm font-semibold uppercase tracking-widest text-[#22A39F]">
              Parking Operations
            </p>

            <h1 className="mt-2 text-4xl font-bold text-slate-900">
              Welcome, {user?.username || roleLabel}
            </h1>

            <p className="mt-3 max-w-2xl text-slate-500">
              Manage vehicle arrivals, departures and active parking sessions
              from one place.
            </p>

          </div>

          <div className="rounded-2xl bg-[#1A5F7A] px-6 py-5 text-white shadow-lg">

            <div className="mb-3 flex items-center gap-3">

              <div className="rounded-xl bg-white/20 p-2">
                <ShieldCheck size={22} />
              </div>

              <div>

                <p className="text-xs uppercase tracking-wider text-slate-200">
                  Current Role
                </p>

                <h2 className="text-2xl font-bold">
                  {roleLabel}
                </h2>

              </div>

            </div>

            <p className="text-sm text-slate-200">
              {roleDescription}
            </p>

          </div>

        </div>

        {/* Main Content */}

        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">

          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <h2 className="mb-2 text-lg font-semibold text-slate-800">
              Vehicle Check-In
            </h2>

            <p className="mb-5 text-sm text-slate-500">
              Register incoming vehicles and assign them to an available
              parking slot.
            </p>

            <CheckInForm
              onCheckedIn={() => setRefreshKey((k) => k + 1)}
            />

          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <div className="mb-5">

              <h2 className="text-lg font-semibold text-slate-800">
                Active Parking Sessions
              </h2>

              <p className="text-sm text-slate-500">
                Monitor vehicles currently parked and process check-outs.
              </p>

            </div>

            <ActiveSessionsTable
              refreshKey={refreshKey}
            />

          </div>

        </div>

      </div>
    </div>
  );
}