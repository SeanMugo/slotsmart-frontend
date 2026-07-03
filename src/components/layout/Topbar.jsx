import { Bell } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">
      <div>
        <h1 className="text-xl font-semibold text-slate-800">
          Dashboard
        </h1>

        <p className="text-sm text-slate-500">
          Welcome back.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-lg p-2 transition hover:bg-slate-100">
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 font-semibold text-white">
            S
          </div>

          <div>
            <p className="text-sm font-medium">Sean</p>
            <p className="text-xs text-slate-500">Driver</p>
          </div>
        </div>
      </div>
    </header>
  );
}