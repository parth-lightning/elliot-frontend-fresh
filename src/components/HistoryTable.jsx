function formatDate(ts) {
  return new Date(ts).toLocaleString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

export default function HistoryTable({ entries, onView, compact }) {
  return (
    <div className="bg-panel border border-line rounded-xl p-6">
      <h2 className="font-display font-semibold text-ink">Analysis History</h2>
      {entries.length === 0 ? (
        <p className="text-sm text-muted font-mono mt-4">No scans yet — run an analysis to see it here.</p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted font-mono text-[11px] uppercase tracking-wide border-b border-line">
                <th className="pb-2 pr-3">#</th>
                <th className="pb-2 pr-3">Screenshot</th>
                <th className="pb-2 pr-3">Score</th>
                <th className="pb-2 pr-3">Issues</th>
                <th className="pb-2 pr-3">Date</th>
                <th className="pb-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {(compact ? entries.slice(0, 5) : entries).map((entry, i) => (
                <tr key={entry.id} className="border-b border-line last:border-0">
                  <td className="py-2.5 pr-3 text-muted">{i + 1}</td>
                  <td className="py-2.5 pr-3">
                    <div className="flex items-center gap-2">
                      {entry.thumbnail && (
                        <img src={entry.thumbnail} alt="" className="w-8 h-6 object-cover rounded border border-line" />
                      )}
                      <span className="text-ink/80 truncate max-w-[140px]">{entry.fileName}</span>
                    </div>
                  </td>
                  <td className="py-2.5 pr-3 font-mono text-good">{entry.report.overall_score}/10</td>
                  <td className="py-2.5 pr-3 font-mono text-major">{entry.report.total_issues}</td>
                  <td className="py-2.5 pr-3 text-muted">{formatDate(entry.id)}</td>
                  <td className="py-2.5">
                    <button
                      onClick={() => onView(entry)}
                      className="w-7 h-7 rounded-md border border-line flex items-center justify-center text-signal hover:bg-signal-dim transition-colors"
                      title="View report"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
