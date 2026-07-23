function getScoreStyle(score) {
  if (score >= 8) {
    return {
      bar: 'bg-good',
      badge: 'bg-good/10 text-good border-good/20',
    }
  }

  if (score >= 5) {
    return {
      bar: 'bg-major',
      badge: 'bg-major/10 text-major border-major/20',
    }
  }

  return {
    bar: 'bg-critical',
    badge: 'bg-critical/10 text-critical border-critical/20',
  }
}

export default function ScoreBreakdownPanel({ breakdown }) {
  return (
    <div className="rounded-2xl border border-line bg-panel p-8">
      <div className="mb-6 border-b border-line pb-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
          Metrics
        </p>

        <h2 className="mt-2 font-display text-xl font-semibold text-ink">
          Score Breakdown
        </h2>
      </div>

      <div className="space-y-6">
        {breakdown.map(({ label, score }) => {
          const style = getScoreStyle(score)

          return (
            <div key={label}>
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-ink">
                  {label}
                </span>

                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${style.badge}`}
                >
                  {score}/10
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-line">
                <div
                  className={`h-full rounded-full ${style.bar}`}
                  style={{
                    width: `${score * 10}%`,
                    transition: 'width 700ms ease',
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}