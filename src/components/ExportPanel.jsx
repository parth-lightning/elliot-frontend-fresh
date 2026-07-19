export default function ExportPanel({ onExport, disabled }) {
  return (
    <div className="bg-panel border border-line rounded-xl p-6 flex flex-col">
      <h2 className="font-display font-semibold text-ink">Export Report</h2>
      <p className="text-sm text-muted mt-1">Download the analysis report in PDF format.</p>
      <button
        onClick={onExport}
        disabled={disabled}
        className="mt-4 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-line text-sm font-medium text-ink disabled:opacity-40 disabled:cursor-not-allowed hover:border-ink/40 transition-colors"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3v12M7 10l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 19h16" strokeLinecap="round" />
        </svg>
        Download PDF
      </button>
    </div>
  )
}
