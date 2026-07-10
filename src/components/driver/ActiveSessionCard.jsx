import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RefreshCw } from "lucide-react";

import { getActiveSession } from "../../services/parkingService";
import { initiateSTKPush } from "../../services/mpesaService";

export default function ActiveSessionCard() {
  const [session, setSession] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    loadSession();
  }, []);

  async function loadSession() {
    try {
      const previousStatus = session?.payment_status;

      const data = await getActiveSession();

      if (data.message) {
        setSession(null);
      } else {
        setSession(data);

        if (
          previousStatus === "pending" &&
          data.payment_status === "paid"
        ) {
          toast.success(
            "Payment received successfully. Your parking session has been completed."
          );
        }
      }
    } catch (err) {
      console.error(err);
      setSession(null);
    } finally {
      setLoading(false);
    }
  }

  async function handlePayment() {
    if (!phoneNumber.trim()) {
      toast.error("Please enter your M-Pesa phone number.");
      return;
    }

    let formattedPhone = phoneNumber.trim().replace(/\s+/g, "");

    if (formattedPhone.startsWith("+254")) {
      formattedPhone = formattedPhone.substring(1);
    }

    if (formattedPhone.startsWith("07")) {
      formattedPhone = "254" + formattedPhone.substring(1);
    }

    try {
      setPaying(true);

      await initiateSTKPush({
        phone_number: formattedPhone,
        amount: session.mpesa_amount,
        parking_session_id: session.id,
      });

      toast.success(
        "M-Pesa prompt sent. Complete the payment on your phone to finish checking out.",
        {
          duration: 5000,
        }
      );

      await loadSession();
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.error ||
          "Failed to send STK Push."
      );
    } finally {
      setPaying(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        Loading active parking session...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        <div className="mb-4 text-5xl">🚗</div>

        <h2 className="text-2xl font-bold text-slate-800">
          No Active Parking Session
        </h2>

        <p className="mt-2 text-slate-500">
          You currently have no active parking session.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold text-slate-800">
          Active Parking Session
        </h2>

        <button
          onClick={loadSession}
          className="rounded-lg p-2 transition hover:bg-slate-100"
          title="Refresh"
        >
          <RefreshCw size={18} />
        </button>

      </div>

      <div className="grid gap-4 md:grid-cols-2">

        <div className="rounded-xl bg-slate-100 p-4">
          <p className="text-sm text-slate-500">
            Parking Slot
          </p>

          <p className="text-lg font-semibold">
            {session.slot_details?.slot_number}
          </p>
        </div>

        <div className="rounded-xl bg-slate-100 p-4">
          <p className="text-sm text-slate-500">
            License Plate
          </p>

          <p className="text-lg font-semibold">
            {session.license_plate}
          </p>
        </div>

        <div className="rounded-xl bg-slate-100 p-4">
          <p className="text-sm text-slate-500">
            Status
          </p>

          <p className="text-lg font-semibold">
            {session.payment_status === "active"
              ? "Parking Active"
              : session.payment_status === "pending"
              ? "Payment Required"
              : "Paid"}
          </p>
        </div>

        <div className="rounded-xl bg-slate-100 p-4">
          <p className="text-sm text-slate-500">
            Amount Due
          </p>

          <p className="text-2xl font-bold text-[#1A5F7A]">
            {session.payment_status === "pending"
              ? `KES ${session.mpesa_amount || session.total_fee || "0.00"}`
              : "--"}
          </p>
        </div>

      </div>

      {session.payment_status === "active" && (
        <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4">

          <h3 className="font-semibold text-blue-800">
            🚗 Parking Session Active
          </h3>

          <p className="mt-2 text-sm text-blue-700">
            Your vehicle is currently parked.
            Payment will become available once Gate Staff initiates the check-out process.
          </p>

        </div>
      )}

      {session.payment_status === "pending" && (
        <div className="mt-8">

          <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-4">

            <h3 className="text-lg font-semibold text-amber-700">
              Payment Required
            </h3>

            <p className="mt-2 text-sm text-amber-700">
              Your vehicle has been checked out successfully.
              Please complete payment below to finalize your parking session.
            </p>

          </div>

          <label className="mb-2 block font-medium">
            M-Pesa Phone Number
          </label>

          <input
            type="tel"
            placeholder="07XXXXXXXX"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mb-4 w-full rounded-xl border border-slate-300 p-3"
          />

          <button
            onClick={handlePayment}
            disabled={paying}
            className="rounded-xl bg-[#1A5F7A] px-6 py-3 font-semibold text-white transition hover:bg-[#144b61] disabled:opacity-50"
          >
            {paying
              ? "Sending STK Push..."
              : "Pay with M-Pesa"}
          </button>

        </div>
      )}

      {session.payment_status === "paid" && (
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4">

          <h3 className="font-semibold text-emerald-700">
            ✅ Payment Successful
          </h3>

          <p className="mt-2 text-sm text-emerald-700">
            Thank you. Your parking session has been completed successfully.
          </p>

        </div>
      )}

    </div>
  );
}