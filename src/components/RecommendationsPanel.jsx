export default function RecommendationsPanel({ issues }) {
  // Remove duplicate recommendations
  const seen = new Set()
  const recommendations = []

  for (const issue of issues) {
    const recommendation = issue.recommendation?.trim()

    if (!recommendation) continue

    const key = recommendation.toLowerCase()

    if (!seen.has(key)) {
      seen.add(key)
      recommendations.push(recommendation)
    }
  }

  return (
    <div className="rounded-2xl border border-line bg-panel p-8">
      <div className="mb-6 flex items-end justify-between border-b border-line pb-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
            Recommendations
          </p>

          <h2 className="mt-2 font-display text-xl font-semibold text-ink">
            Suggested Improvements
          </h2>
        </div>

        <div className="rounded-full bg-paper px-3 py-1 text-sm font-medium text-muted">
          {recommendations.length}{' '}
          {recommendations.length === 1 ? 'Recommendation' : 'Recommendations'}
        </div>
      </div>

      {recommendations.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-lg text-muted">
            No recommendations available.
          </p>

          <p className="mt-2 text-sm text-muted">
            The interface meets the current evaluation criteria.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {recommendations.map((recommendation, index) => (
            <div
              key={index}
              className="flex items-start gap-4 rounded-xl border border-line bg-paper p-5 transition-all duration-200 hover:border-good/30 hover:shadow-sm"
            >
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-good/10 text-good">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    d="M20 6L9 17l-5-5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Recommendation {index + 1}
                </p>

                <p className="mt-2 text-sm leading-6 text-ink/85">
                  {recommendation}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}