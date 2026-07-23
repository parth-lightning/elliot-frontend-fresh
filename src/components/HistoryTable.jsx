function formatDate(ts) {
  return new Date(ts).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function getScoreLabel(score) {
  if (score >= 9) return 'Excellent'
  if (score >= 8) return 'Good'
  if (score >= 7) return 'Fair'
  return 'Needs work'
}

function getScoreStyles(score) {
  if (score >= 9) return 'border-emerald-500/20 bg-emerald-500/10 text-emerald-700'
  if (score >= 8) return 'border-sky-500/20 bg-sky-500/10 text-sky-700'
  if (score >= 7) return 'border-amber-500/20 bg-amber-500/10 text-amber-700'
  return 'border-rose-500/20 bg-rose-500/10 text-rose-700'
}

export default function HistoryTable({ entries, onView, compact }) {
  const visibleEntries = compact ? entries.slice(0, 5) : entries

  return (
    <div className="rounded-2xl border border-line bg-panel p-8">
      <div className="mb-6 flex items-end justify-between gap-4 border-b border-line pb-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">
            Archive
          </p>
          <h2 className="mt-2 font-display text-xl font-semibold text-ink">
            Analysis History
          </h2>
        </div>

        <p className="text-sm text-muted">
          {entries.length} {entries.length === 1 ? 'report' : 'reports'}
        </p>
      </div>

      {entries.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-lg text-muted">No analyses have been recorded yet.</p>
          <p className="mt-2 text-sm text-muted">
            Run your first screenshot analysis to build a history here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-line text-left text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                <th className="pb-4 pr-4">Preview</th>
                <th className="pb-4 pr-4">Screenshot</th>
                <th className="pb-4 pr-4">Score</th>
                <th className="pb-4 pr-4">Issues</th>
                <th className="pb-4 pr-4">Date</th>
                <th className="pb-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {visibleEntries.map((entry) => {
                const score = entry.report.overall_score
                const scoreLabel = getScoreLabel(score)
                const scoreStyles = getScoreStyles(score)

                return (
                  <tr
                    key={entry.id}
                    className="border-b border-line/70 last:border-0 transition-colors hover:bg-paper/40"
                  >
                    <td className="py-4 pr-4 align-middle">
                      {entry.thumbnail ? (
                        <img
                          src={entry.thumbnail}
                          alt=""
                          className="h-14 w-20 rounded-lg border border-line object-cover"
                        />
                      ) : (
                        <div className="h-14 w-20 rounded-lg border border-line bg-paper" />
                      )}
                    </td>

                    <td className="py-4 pr-4 align-middle">
                      <div className="min-w-0 max-w-md">
                        <p className="truncate font-medium text-ink">
                          {entry.fileName}
                        </p>
                        <p className="mt-1 text-xs text-muted">
                          {entry.report.total_issues} issues detected
                        </p>
                      </div>
                    </td>

                    <td className="py-4 pr-4 align-middle">
                      <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium ${scoreStyles}`}>
                        <span>{score}/10</span>
                        <span className="text-[11px] font-semibold uppercase tracking-wide opacity-80">
                          {scoreLabel}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 pr-4 align-middle">
                      <span className="text-sm font-medium text-major">
                        {entry.report.total_issues}
                      </span>
                    </td>

                    <td className="py-4 pr-4 align-middle text-muted">
                      {formatDate(entry.id)}
                    </td>

                    <td className="py-4 align-middle text-right">
                      <button
                        onClick={() => onView(entry)}
                        className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink/40 hover:bg-paper"
                        title="View report"
                      >
                        View report
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M5 12h14" strokeLinecap="round" />
                          <path d="m13 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}