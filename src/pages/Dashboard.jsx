import DashboardHeader from "../components/dashboard/DashboardHeader";
import ActiveSessionCard from "../components/driver/ActiveSessionCard";
import HistoryList from "../components/driver/HistoryList";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-8 py-10">

        <DashboardHeader />

        <div className="mt-8">
          <ActiveSessionCard />
        </div>

        <HistoryList />

      </div>
    </div>
  );
}