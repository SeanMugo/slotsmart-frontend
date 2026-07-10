import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CarFront, RefreshCw } from "lucide-react";

import {
  getActiveSession,
  checkOut,
} from "../../services/parkingService";

export default function ActiveSessionsTable({ refreshKey }) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkingOutId, setCheckingOutId] = useState(null);

  useEffect(() => {
    loadSessions();
  }, [refreshKey]);

  async function loadSessions() {
    setLoading(true);

    try {
      const data = await getActiveSession();
      setSessions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      toast.error("Could not load active parking sessions.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCheckOut(sessionId) {
    setCheckingOutId(sessionId);

    try {
      const response = await checkOut(sessionId);

      if (response.payment_required) {
        toast.success(
          "Check-out initiated. Waiting for the driver to complete payment.",
          {
            duration: 5000,
          }
        );
      } else {
        toast.success(
          "Check-out completed successfully. Payment was made using the driver's wallet."
        );
      }

      await loadSessions();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.error ||
          error.response?.data?.detail ||
          "Unable to check out vehicle."
      );
    } finally {
      setCheckingOutId(null);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-5 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-[#22A39F]/10 p-3 text-[#22A39F]">
            <CarFront size={22} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Currently Parked Vehicles
            </h2>

            <p className="text-sm text-slate-500">
              Manage active parking sessions and initiate vehicle check-out.
            </p>
          </div>

        </div>

        <button
          onClick={loadSessions}
          className="rounded-lg p-2 transition hover:bg-slate-100"
          title="Refresh"
        >
          <RefreshCw
            size={18}
            className={loading ? "animate-spin" : ""}
          />
        </button>

      </div>

      {loading ? (
        <p className="py-8 text-center text-slate-500">
          Loading active parking sessions...
        </p>
      ) : sessions.length === 0 ? (
        <div className="rounded-xl bg-slate-50 p-8 text-center">

          <p className="font-medium text-slate-700">
            No Active Parking Sessions
          </p>

          <p className="mt-2 text-sm text-slate-500">
            All parking spaces are currently available.
          </p>

        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full text-left text-sm">

            <thead>

              <tr className="border-b border-slate-200 text-slate-500">

                <th className="pb-3 pr-4 font-medium">
                  Plate
                </th>

                <th className="pb-3 pr-4 font-medium">
                  Driver
                </th>

                <th className="pb-3 pr-4 font-medium">
                  Slot
                </th>

                <th className="pb-3 pr-4 font-medium">
                  Checked In
                </th>

                <th className="pb-3 text-right font-medium">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {sessions.map((session) => (

                <tr
                  key={session.id}
                  className="border-b border-slate-100 last:border-0"
                >

                  <td className="py-4 font-semibold text-slate-800">
                    {session.license_plate}
                  </td>

                  <td className="text-slate-600">
                    {session.user_details?.username}
                  </td>

                  <td className="text-slate-600">
                    {session.slot_details?.slot_number}
                  </td>

                  <td className="text-slate-500">
                    {new Date(session.check_in_time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>

                  <td className="text-right">

                    {session.status === "completed" &&
                    session.payment_status === "pending" ? (

                      <span className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
                        Awaiting Driver Payment
                      </span>

                    ) : (

                      <button
                        onClick={() => handleCheckOut(session.id)}
                        disabled={checkingOutId === session.id}
                        className="rounded-xl bg-[#F2A65A] px-4 py-2 font-semibold text-slate-800 transition hover:bg-[#df9448] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {checkingOutId === session.id
                          ? "Processing Check-out..."
                          : "Check Out"}
                      </button>

                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}