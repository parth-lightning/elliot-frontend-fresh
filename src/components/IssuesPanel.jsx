const SEVERITY_STYLES = {
  Critical: {
    badge: 'bg-red-50 text-red-700 border-red-200',
    dot: 'bg-red-500',
  },
  Major: {
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
    dot: 'bg-amber-500',
  },
  Moderate: {
    badge: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    dot: 'bg-yellow-500',
  },
  Minor: {
    badge: 'bg-blue-50 text-blue-700 border-blue-200',
    dot: 'bg-blue-500',
  },
}

export default function IssuesPanel({ issues }) {
  return (
    <div className="rounded-2xl border border-line bg-panel p-8">
      <div className="mb-6 flex items-end justify-between border-b border-line pb-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
            Findings
          </p>

          <h2 className="mt-2 font-display text-xl font-semibold text-ink">
            Detected Issues
          </h2>
        </div>

        <div className="rounded-full bg-paper px-3 py-1 text-sm font-medium text-muted">
          {issues.length} {issues.length === 1 ? 'Issue' : 'Issues'}
        </div>
      </div>

      {issues.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-lg text-muted">
            No issues detected.
          </p>

          <p className="mt-2 text-sm text-muted">
            The interface passed the current evaluation criteria.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {issues.map((issue, index) => {
            const style =
              SEVERITY_STYLES[issue.severity] ?? {
                badge: 'bg-gray-100 text-gray-700 border-gray-200',
                dot: 'bg-gray-500',
              }

            return (
              <div
                key={index}
                className="rounded-xl border border-line bg-paper p-6 transition-all duration-200 hover:border-ink/20 hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`mt-2 h-3 w-3 shrink-0 rounded-full ${style.dot}`}
                    />

                    <div>
                      <h3 className="text-lg font-semibold text-ink">
                        {issue.category}
                      </h3>

                      <p className="mt-1 text-sm text-muted">
                        Component: {issue.component}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${style.badge}`}
                  >
                    {issue.severity}
                  </span>
                </div>

                <div className="mt-5 grid gap-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                      Description
                    </p>

                    <p className="mt-2 text-sm leading-6 text-ink/85">
                      {issue.description}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                      Recommendation
                    </p>

                    <p className="mt-2 text-sm leading-6 text-ink/85">
                      {issue.recommendation}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}