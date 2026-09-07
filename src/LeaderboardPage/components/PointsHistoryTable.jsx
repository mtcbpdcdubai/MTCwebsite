const SOURCE_LABELS = {
  EVENT: (h) => `${h.event_name} — ${h.achievement}`,
  REFERRAL: () => "Referral Bonus",
  MANUAL_ADJUSTMENT: (h) => h.reason ?? "Manual Adjustment",
};

export default function PointsHistoryTable({ history }) {
  if (!history || history.length === 0) {
    return <p className="text-gray-400 text-center py-6">No points recorded yet this year.</p>;
  }

  return (
    <div className="divide-y divide-gray-800">
      {history.map((entry, idx) => {
        const label = (SOURCE_LABELS[entry.source] ?? (() => entry.source))(entry);
        const isPositive = entry.points >= 0;
        return (
          <div key={idx} className="flex items-center justify-between py-3">
            <div>
              <p className="text-white font-medium">{label}</p>
              <p className="text-gray-500 text-xs">
                {new Date(entry.created_at).toLocaleDateString()}
              </p>
            </div>
            <span className={`font-semibold ${isPositive ? "text-green-400" : "text-red-400"}`}>
              {isPositive ? "+" : ""}
              {entry.points}
            </span>
          </div>
        );
      })}
    </div>
  );
}
