import UploadPanel from '../components/UploadPanel.jsx'
import ScreenshotPreview from '../components/ScreenshotPreview.jsx'
import ScoreRing from '../components/ScoreRing.jsx'
import ScoreBreakdownPanel from '../components/ScoreBreakdownPanel.jsx'
import IssuesPanel from '../components/IssuesPanel.jsx'
import RecommendationsPanel from '../components/RecommendationsPanel.jsx'
import HistoryTable from '../components/HistoryTable.jsx'
import ExportPanel from '../components/ExportPanel.jsx'

function SectionHeader({ eyebrow, title, description, rightSlot = null }) {
  return (
    <div className="flex flex-col gap-3 border-b border-border/60 pb-4 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-1 font-display text-xl font-semibold tracking-tight text-ink">
          {title}
        </h2>
        {description ? (
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
            {description}
          </p>
        ) : null}
      </div>
      {rightSlot}
    </div>
  )
}

function Card({ className = '', children }) {
  return (
    <div
      className={`rounded-2xl border border-border/70 bg-panel/90 p-6 shadow-sm shadow-black/5 backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  )
}

export default function DashboardPage({
  selectedFile,
  imageUrl,
  report,
  summary,
  analyzing,
  error,
  onFileSelected,
  onAnalyze,
  onExport,
  history,
  onViewHistory,
}) {
  const breakdown = report
  ? [
      {
        label: "Layout & Structure",
        score: report.category_scores.layout_structure,
      },
      {
        label: "Typography",
        score: report.category_scores.typography,
      },
      {
        label: "Color & Contrast",
        score: report.category_scores.color_contrast,
      },
      {
        label: "Accessibility",
        score: report.category_scores.accessibility,
      },
      {
        label: "Navigation",
        score: report.category_scores.navigation,
      },
      {
        label: "Consistency",
        score: report.category_scores.consistency,
      },
      {
        label: "User Experience",
        score: report.category_scores.user_experience,
      },
    ]
  : null

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-6 py-8 lg:px-8">
      <header className="flex flex-col gap-5 border-b border-border/60 pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">
            AI UI/UX Review Platform
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            UI/UX Analysis Dashboard
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted md:text-base">
            Upload a screenshot to generate a structured evaluation of usability, clarity,
            consistency, and visual quality.
          </p>
        </div>

        {report ? (
          <div className="rounded-2xl border border-border/70 bg-surface px-5 py-4 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
              Latest Score
            </p>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-ink">
              {report.overall_score}
              <span className="ml-1 text-lg font-medium text-muted">/100</span>
            </p>
            <p className="mt-1 text-sm text-muted">
              {summary?.executive_summary ? 'Executive summary available' : 'Detailed results ready'}
            </p>
          </div>
        ) : null}
      </header>

      <Card>
        <SectionHeader
          eyebrow="Input"
          title="Screenshot Submission"
          description="Upload the interface you want analyzed, review the preview, and begin the assessment."
        />

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <UploadPanel
            selectedFile={selectedFile}
            analyzing={analyzing}
            error={error}
            onFileSelected={onFileSelected}
            onAnalyze={onAnalyze}
          />
          <ScreenshotPreview imageUrl={imageUrl} />
        </div>
      </Card>

      {report ? (
        <>
          <Card>
            <SectionHeader
              eyebrow="Analysis"
              title="Results Overview"
              description="A concise summary of the interface quality assessment, with score context and issue distribution."
            />
            <div className="grid lg:grid-cols-12 gap-6">
                <div className="lg:col-span-4">
                  <ScoreRing score={report.overall_score} />
                </div>

                <div className="lg:col-span-8">
                  <ScoreBreakdownPanel breakdown={breakdown} />
                </div>
              </div>

              <div className="mt-6">
                <IssuesPanel issues={report.issues} />
              </div>

              <div className="mt-6">
                <RecommendationsPanel issues={report.issues} />
              </div>
          </Card>

          {summary?.executive_summary ? (
            <Card className="border-signal/20 bg-signal-dim/35">
              <SectionHeader
                eyebrow="Executive Summary"
                title="If Only a Few Things Are Fixed"
                description="This section highlights the most important improvements to prioritize first."
              />
              <p className="mt-5 max-w-4xl text-sm leading-7 text-ink/85">
                {summary.executive_summary}
              </p>
            </Card>
          ) : null}

          
        </>
      ) : null}
    </div>
  )
}