const ROLE_LABELS = {
  driver: "Driver",
  gate_staff: "Gate Staff",
  admin: "Admin",
};

export default function UserRow({
  user,
  currentUser,
  busyId,
  onEdit,
  onToggle,
}) {
  return (
    <tr className="border-b border-slate-100 last:border-0">

      <td className="py-5 font-semibold text-slate-500">
        #{user.id}
      </td>

      <td>
        <p className="font-semibold text-slate-800">
          {user.username}
        </p>

        <p className="text-sm text-slate-500">
          {user.email}
        </p>
      </td>

      <td>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">
          {ROLE_LABELS[user.role]}
        </span>
      </td>

      <td>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            user.is_active
              ? "bg-emerald-100 text-emerald-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {user.is_active ? "Active" : "Inactive"}
        </span>
      </td>

      <td className="text-right">

        <div className="flex justify-end gap-2">

          <button
            onClick={() => onEdit(user)}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-100"
          >
            Edit
          </button>

          <button
            onClick={() => onToggle(user)}
            disabled={
              busyId === user.id ||
              user.id === currentUser?.id
            }
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busyId === user.id
              ? "..."
              : user.is_active
              ? "Deactivate"
              : "Activate"}
          </button>

        </div>

      </td>

    </tr>
  );
}