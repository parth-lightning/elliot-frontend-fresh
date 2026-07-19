export default function RecommendationsPanel({ issues }) {
  // De-duplicate recommendation text so repeated fixes across issues
  // (e.g. two contrast issues) don't show the same line twice.
  const seen = new Set()
  const items = []
  for (const issue of issues) {
    const key = issue.recommendation.trim().toLowerCase()
    if (!seen.has(key)) {
      seen.add(key)
      items.push(issue.recommendation)
    }
  }

  return (
    <div className="bg-panel border border-line rounded-xl p-6">
      <div className="flex items-center gap-2">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1EA672" strokeWidth="2">
          <path d="M9 11l3 3L22 4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h2 className="font-display font-semibold text-ink">Recommendations</h2>
      </div>
      <div className="mt-4 flex flex-col gap-3">
        {items.map((text, i) => (
          <div key={i} className="flex items-start gap-2.5 text-sm text-ink/80">
            <span className="w-4 h-4 shrink-0 rounded-full bg-good/15 text-good flex items-center justify-center mt-0.5">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {text}
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-muted font-mono">No recommendations yet.</p>
        )}
      </div>
    </div>
  )
}
