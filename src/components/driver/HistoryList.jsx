import { useEffect, useState } from "react";
import { getSessionHistory } from "../../services/parkingService";

export default function HistoryList() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      const data = await getSessionHistory();
      setHistory(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-slate-500">
          Loading parking history...
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold text-slate-800">
        Parking History
      </h2>

      {history.length === 0 ? (
        <div className="rounded-xl bg-slate-50 p-8 text-center">
          <p className="text-slate-500">
            No completed parking sessions found.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((session) => (
            <div
              key={session.id}
              className="rounded-xl border border-slate-200 p-5 transition hover:shadow-md"
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    {session.slot?.slot_number || `Slot ${session.slot}`}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Plate: {session.license_plate}
                  </p>

                  <p className="text-sm text-slate-500">
                    Checked In:{" "}
                    {session.check_in_time
                      ? new Date(session.check_in_time).toLocaleString()
                      : "-"}
                  </p>

                  <p className="text-sm text-slate-500">
                    Checked Out:{" "}
                    {session.check_out_time
                      ? new Date(session.check_out_time).toLocaleString()
                      : "-"}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold text-[#1A5F7A]">
                    KES {session.total_fee ?? 0}
                  </p>

                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      session.payment_status === "paid"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {session.payment_status || "Pending"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}