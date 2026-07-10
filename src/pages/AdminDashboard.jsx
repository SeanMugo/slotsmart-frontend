import useAuth from "../hooks/useAuth";
import AdminStatsOverview from "../components/admin/AdminStatsOverview";
import UsersTable from "../components/admin/UsersTable";

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-8 py-10">

        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#22A39F]">
              Administration
            </p>

            <h1 className="mt-2 text-4xl font-bold text-slate-900">
              Welcome, {user?.username || "Administrator"}
            </h1>

            <p className="mt-3 max-w-2xl text-slate-500">
              Manage users, oversee parking operations and monitor the overall
              performance of the SlotSmart parking management system.
            </p>
          </div>

          <div className="rounded-2xl bg-[#1A5F7A] px-6 py-5 text-white shadow-lg">

            <p className="text-sm uppercase tracking-wide text-slate-200">
              Role
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              System Administrator
            </h2>

            <p className="mt-2 text-sm text-slate-200">
              Full access to users, parking operations and reports.
            </p>

          </div>

        </div>

        {/* Statistics */}
        <section className="mb-10">
          <h2 className="mb-5 text-xl font-semibold text-slate-800">
            System Overview
          </h2>

          <AdminStatsOverview />
        </section>

        {/* Users */}
        <section>

          <div className="mb-5 flex items-center justify-between">

            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                User Management
              </h2>

              <p className="text-sm text-slate-500">
                Create, activate and deactivate user accounts.
              </p>
            </div>

          </div>

          <UsersTable />

        </section>

      </div>
    </div>
  );
}