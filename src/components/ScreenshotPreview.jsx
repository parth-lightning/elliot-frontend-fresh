export default function ScreenshotPreview({ imageUrl }) {
  return (
    <div className="rounded-2xl border border-line bg-panel p-8">
      <div className="border-b border-line pb-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
          Preview
        </p>

        <h2 className="mt-2 font-display text-xl font-semibold text-ink">
          Uploaded Screenshot
        </h2>

        <p className="mt-2 text-sm text-muted">
          Review the uploaded interface before starting the AI evaluation.
        </p>
      </div>

      <div className="mt-8">
        <div className="flex min-h-[500px] items-center justify-center overflow-hidden rounded-xl border border-line bg-paper">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Uploaded screenshot"
              className="max-h-[650px] w-auto max-w-full object-contain transition-transform duration-300 hover:scale-[1.01]"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              <svg
                width="54"
                height="54"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="text-muted"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="2"
                />
                <circle
                  cx="8.5"
                  cy="8.5"
                  r="1.5"
                />
                <path d="M21 15l-5-5L5 21" />
              </svg>

              <p className="mt-6 text-lg font-medium text-muted">
                No screenshot uploaded
              </p>

              <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
                Upload an application screenshot to preview it here before
                running the UI/UX analysis.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}