function barColor(score) {
  if (score >= 8) return 'bg-good'
  if (score >= 5) return 'bg-major'
  return 'bg-critical'
}

export default function ScoreBreakdownPanel({ breakdown }) {
  return (
    <div className="bg-panel border border-line rounded-xl p-6">
      <h2 className="font-display font-semibold text-ink">Score Breakdown</h2>
      <div className="mt-4 flex flex-col gap-4">
        {breakdown.map(({ label, score }) => (
          <div key={label}>
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span className="text-ink/80">{label}</span>
              <span className="font-mono text-xs text-muted">{score}/10</span>
            </div>
            <div className="h-1.5 rounded-full bg-line overflow-hidden">
              <div
                className={`h-full rounded-full ${barColor(score)}`}
                style={{ width: `${score * 10}%`, transition: 'width 700ms ease' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
