import ExportPanel from '../components/ExportPanel.jsx'

export default function ReportsPage({ history, onViewHistory, onExportEntry }) {
  return (
    <div className="p-8 max-w-[1400px] mx-auto flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Reports</h1>
        <p className="text-sm text-muted mt-1">Revisit or export any past scan</p>
      </div>
      {history.length === 0 && (
        <p className="text-sm text-muted font-mono">No reports yet — run an analysis first.</p>
      )}
      <div className="grid gap-4">
        {history.map((entry) => (
          <div key={entry.id} className="bg-panel border border-line rounded-xl p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              {entry.thumbnail && (
                <img src={entry.thumbnail} alt="" className="w-14 h-10 object-cover rounded border border-line" />
              )}
              <div className="min-w-0">
                <p className="font-medium text-ink truncate">{entry.fileName}</p>
                <p className="text-xs text-muted font-mono">
                  {entry.report.overall_score}/10 · {entry.report.total_issues} issues
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onViewHistory(entry)}
                className="text-xs font-mono uppercase tracking-wide px-3 py-1.5 rounded-md border border-line text-muted hover:border-ink/40 hover:text-ink transition-colors"
              >
                View
              </button>
              <button
                onClick={() => onExportEntry(entry)}
                className="text-xs font-mono uppercase tracking-wide px-3 py-1.5 rounded-md border border-line text-muted hover:border-ink/40 hover:text-ink transition-colors"
              >
                PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
