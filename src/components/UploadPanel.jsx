import { useEffect, useRef, useState } from 'react'

const ANALYSIS_STEPS = [
  'Uploading screenshot...',
  'Preprocessing image...',
  'Detecting UI components...',
  'Evaluating accessibility...',
  'Analyzing layout & spacing...',
  'Checking visual hierarchy...',
  'Generating recommendations...',
  'Preparing final report...',
]

export default function UploadPanel({
  onFileSelected,
  onAnalyze,
  selectedFile,
  analyzing,
  error,
}) {
  const inputRef = useRef(null)
  const [dragActive, setDragActive] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  function pick(file) {
    if (file) onFileSelected(file)
  }

  useEffect(() => {
    if (!analyzing) {
      setProgress(0)
      setCurrentStep(0)
      return
    }

    let fakeProgress = 0

    setProgress(0)
    setCurrentStep(0)

    const timer = setInterval(() => {
      fakeProgress = Math.min(95, fakeProgress + Math.random() * 10 + 5)

      const nextProgress = Math.round(fakeProgress)
      const nextStep = Math.min(
        ANALYSIS_STEPS.length - 1,
        Math.floor(fakeProgress / (100 / ANALYSIS_STEPS.length))
      )

      setProgress(nextProgress)
      setCurrentStep(nextStep)
    }, 500)

    return () => clearInterval(timer)
  }, [analyzing])

  return (
    <div className="rounded-2xl border border-line bg-panel p-8">
      <div className="border-b border-line pb-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
          Input
        </p>

        <h2 className="mt-2 font-display text-xl font-semibold text-ink">
          Upload Screenshot
        </h2>

        <p className="mt-2 text-sm leading-6 text-muted">
          Upload a desktop or mobile application screenshot to begin the AI-powered
          UI/UX evaluation.
        </p>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragActive(true)
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragActive(false)
          pick(e.dataTransfer.files?.[0])
        }}
        onClick={() => !analyzing && inputRef.current?.click()}
        className={`mt-8 cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all ${
          dragActive
            ? 'border-signal bg-signal-dim'
            : 'border-line hover:border-signal/40 hover:bg-paper'
        } ${analyzing ? 'pointer-events-none opacity-90' : ''}`}
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-signal/10 text-signal">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 16V4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 8l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 18v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h3 className="mt-6 text-lg font-semibold text-ink">
          Drag & Drop Screenshot
        </h3>

        <p className="mt-2 text-sm text-muted">
          or click anywhere in this area to browse your files
        </p>

        <p className="mt-4 text-xs uppercase tracking-wide text-muted">
          PNG • JPG • WEBP
        </p>

        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={(e) => pick(e.target.files?.[0])}
          disabled={analyzing}
        />
      </div>

      {selectedFile && (
        <div className="mt-6 rounded-xl border border-good/20 bg-good/10 p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-good">
                Selected File
              </p>

              <p className="mt-1 truncate text-sm font-medium text-ink">
                {selectedFile.name}
              </p>
            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-good text-white">
              ✓
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-5 rounded-xl border border-critical/20 bg-critical/10 p-4">
          <p className="text-sm text-critical">{error}</p>
        </div>
      )}

      {!analyzing ? (
        <button
          onClick={onAnalyze}
          disabled={!selectedFile}
          className="
            mt-8
            w-full
            rounded-xl
            bg-signal
            px-5
            py-3.5
            text-sm
            font-semibold
            text-white
            transition-all
            hover:bg-signal/90
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          Start Analysis
        </button>
      ) : (
        <div className="mt-8 rounded-2xl border border-line bg-paper p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                AI Analysis
              </p>
              <h3 className="mt-1 text-lg font-semibold text-ink">
                Processing Screenshot
              </h3>
            </div>

            <span className="text-lg font-bold text-signal">
              {progress}%
            </span>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full bg-signal transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-6 space-y-3">
            {ANALYSIS_STEPS.map((step, index) => {
              const completed = index < currentStep
              const active = index === currentStep

              return (
                <div key={step} className="flex items-center gap-3">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                      completed
                        ? 'bg-good text-white'
                        : active
                          ? 'bg-signal text-white animate-pulse'
                          : 'bg-line text-muted'
                    }`}
                  >
                    {completed ? '✓' : index + 1}
                  </div>

                  <span
                    className={`text-sm ${
                      completed
                        ? 'text-good'
                        : active
                          ? 'font-medium text-ink'
                          : 'text-muted'
                    }`}
                  >
                    {step}
                  </span>

                  {active && (
                    <svg
                      className="ml-auto h-4 w-4 animate-spin text-signal"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                        opacity=".25"
                      />
                      <path
                        d="M22 12A10 10 0 0 0 12 2"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}