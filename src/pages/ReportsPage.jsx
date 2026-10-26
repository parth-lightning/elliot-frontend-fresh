export default function ReportsPage({ history, onViewHistory, onExportEntry }) {
  return (
    <div className="mx-auto max-w-screen-2xl px-10 py-8">
      <div className="mb-10 flex items-end justify-between border-b border-line pb-6">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink">
            Reports
          </h1>

          <p className="mt-2 text-muted">
            Browse previous UI/UX analyses and export detailed reports.
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs uppercase tracking-widest text-muted">
            Total Reports
          </p>

          <p className="text-3xl font-semibold text-ink">
            {history.length}
          </p>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="rounded-xl border border-dashed border-line py-20 text-center">
          <p className="text-lg text-muted">
            No reports available.
          </p>

          <p className="mt-2 text-sm text-muted">
            Run an analysis to generate your first report.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-line bg-panel">
          <div className="grid grid-cols-[70px_1fr_120px_140px] border-b border-line bg-panel/70 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted">
            <div>Preview</div>
            <div>Report</div>
            <div>Score</div>
            <div className="text-right">Actions</div>
          </div>

          {history.map((entry) => (
            <div
              key={entry.id}
              className="grid grid-cols-[70px_1fr_120px_140px] items-center border-b border-line px-6 py-5 transition-colors hover:bg-panel-hover"
            >
              <div>
                {entry.thumbnail ? (
                  <img
                    src={entry.thumbnail}
                    alt=""
                    className="h-12 w-16 rounded object-cover border border-line"
                  />
                ) : (
                  <div className="h-12 w-16 rounded border border-line" />
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate font-medium text-ink">
                  {entry.fileName}
                </p>

                <p className="mt-1 text-sm text-muted">
                  {entry.report.total_issues} issues detected
                  {entry.report.is_demo ? ' · Demo report' : ''}
                </p>
              </div>

              <div>
                <span className="text-xl font-semibold text-ink">
                  {entry.report.overall_score}
                </span>

                <span className="text-muted"> / 10</span>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => onViewHistory(entry)}
                  className="rounded-lg border border-line px-4 py-2 text-sm hover:bg-panel-hover"
                >
                  View
                </button>

                <button
                  onClick={() => onExportEntry(entry)}
                  className="rounded-lg border border-line px-4 py-2 text-sm hover:bg-panel-hover"
                >
                  Export
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}