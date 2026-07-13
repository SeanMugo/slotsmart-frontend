export default function ConfirmModal({
  isOpen,
  title = "Confirm Action",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "bg-red-600 hover:bg-red-700",
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

        <h2 className="text-xl font-bold text-slate-800">
          {title}
        </h2>

        <p className="mt-3 text-slate-600">
          {message}
        </p>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onCancel}
            className="rounded-xl border px-5 py-2 font-medium"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className={`rounded-xl px-5 py-2 font-semibold text-white transition ${confirmColor}`}
          >
            {confirmText}
          </button>

        </div>

      </div>

    </div>
  );
}