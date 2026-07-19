const SEVERITY_CHIP = {
  Critical: 'bg-critical-dim text-critical',
  Major: 'bg-major-dim text-major',
  Moderate: 'bg-major-dim text-major',
  Minor: 'bg-minor-dim text-minor',
}

const NUMBER_BG = {
  Critical: 'bg-critical',
  Major: 'bg-major',
  Moderate: 'bg-major',
  Minor: 'bg-major', // reference image uses amber numbering regardless of exact severity tier
}

export default function IssuesPanel({ issues }) {
  return (
    <div className="bg-panel border border-line rounded-xl p-6">
      <h2 className="font-display font-semibold text-ink">Issues Detected ({issues.length})</h2>
      <div className="mt-4 flex flex-col gap-3">
        {issues.map((issue, i) => (
          <div key={i} className="rounded-lg bg-major-dim/60 border border-major/15 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <span className={`w-5 h-5 shrink-0 rounded-full ${NUMBER_BG[issue.severity] || 'bg-major'} text-white text-[11px] font-mono flex items-center justify-center mt-0.5`}>
                  {i + 1}
                </span>
                <h3 className="font-display font-semibold text-ink">{issue.category}</h3>
              </div>
              <span className={`shrink-0 font-mono text-[11px] px-2 py-0.5 rounded-full ${SEVERITY_CHIP[issue.severity] || 'bg-line text-muted'}`}>
                {issue.severity}
              </span>
            </div>
            <p className="text-sm text-ink/80 mt-2">
              <span className="font-medium">Component:</span> {issue.component}
            </p>
            <p className="text-sm text-ink/80 mt-1">{issue.description}</p>
            <p className="text-sm text-ink/80 mt-2">
              <span className="font-medium">Recommendation:</span> {issue.recommendation}
            </p>
          </div>
        ))}
        {issues.length === 0 && (
          <p className="text-sm text-muted font-mono py-6 text-center">No issues detected.</p>
        )}
      </div>
    </div>
  )
}
