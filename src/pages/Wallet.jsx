import useAuth from "../hooks/useAuth";

export default function Wallet() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-2 text-3xl font-bold text-slate-800">
        My Wallet
      </h1>

      <p className="mb-8 text-slate-500">
        Manage your SlotSmart wallet.
      </p>

      {/* Wallet Card */}
      <div className="rounded-2xl bg-[#1A5F7A] p-8 text-white shadow-lg">
        <p className="text-sm uppercase tracking-wider opacity-80">
          Current Balance
        </p>

        <h2 className="mt-3 text-5xl font-bold">
          KES {user?.wallet_balance || "0.00"}
        </h2>

        <p className="mt-4 opacity-80">
          Top up your wallet using M-Pesa to pay for parking.
        </p>
      </div>

      {/* Actions */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-800">
            Top Up Wallet
          </h3>

          <p className="mt-2 text-slate-500">
            Add money instantly using M-Pesa STK Push.
          </p>

          <button
            className="mt-6 rounded-xl bg-[#22A39F] px-6 py-3 font-semibold text-white transition hover:bg-[#1b8b87]"
          >
            Top Up via M-Pesa
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-800">
            Coming Soon
          </h3>

          <ul className="mt-4 space-y-2 text-slate-600">
            <li>• Transaction History</li>
            <li>• Payment Receipts</li>
            <li>• Wallet Statements</li>
            <li>• Automatic Top-Ups</li>
          </ul>
        </div>
      </div>
    </div>
  );
}