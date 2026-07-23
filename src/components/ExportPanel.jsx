export default function ExportPanel({ onExport, disabled }) {
  return (
    <div className="rounded-2xl border border-line bg-panel p-7">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
            Export
          </p>

          <h2 className="mt-2 text-xl font-semibold text-ink">
            Generate Report
          </h2>

          <p className="mt-3 text-sm leading-6 text-muted">
            Download the complete analysis as a professionally formatted PDF
            report suitable for documentation or sharing.
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-paper">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path
              d="M12 3v12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 10l5 5 5-5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 20h16"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      <button
        onClick={onExport}
        disabled={disabled}
        className="
          mt-8
          w-full
          rounded-xl
          border
          border-line
          px-5
          py-3
          text-sm
          font-medium
          text-ink
          transition-all
          hover:border-ink/40
          hover:bg-paper
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        Download PDF Report
      </button>
    </div>
  )
}