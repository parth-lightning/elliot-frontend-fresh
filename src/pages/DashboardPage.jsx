import UploadPanel from '../components/UploadPanel.jsx'
import ScreenshotPreview from '../components/ScreenshotPreview.jsx'
import ScoreRing from '../components/ScoreRing.jsx'
import ScoreBreakdownPanel from '../components/ScoreBreakdownPanel.jsx'
import IssuesPanel from '../components/IssuesPanel.jsx'
import RecommendationsPanel from '../components/RecommendationsPanel.jsx'
import HistoryTable from '../components/HistoryTable.jsx'
import ExportPanel from '../components/ExportPanel.jsx'

export default function DashboardPage({
  selectedFile, imageUrl, report, summary,
  analyzing, error,
  onFileSelected, onAnalyze, onExport,
  history, onViewHistory,
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
    <div className="p-8 max-w-[1400px] mx-auto flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Dashboard</h1>
        <p className="text-sm text-muted mt-1">Analyze UI/UX of any screenshot using AI</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <UploadPanel
          selectedFile={selectedFile}
          analyzing={analyzing}
          error={error}
          onFileSelected={onFileSelected}
          onAnalyze={onAnalyze}
        />
        <ScreenshotPreview imageUrl={imageUrl} />
      </div>

      {report && (
        <>
          <div className="grid lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-3">
              <ScoreRing score={report.overall_score} />
            </div>
            <div className="lg:col-span-3">
              <ScoreBreakdownPanel breakdown={breakdown} />
            </div>
            <div className="lg:col-span-4">
              <IssuesPanel issues={report.issues} />
            </div>
            <div className="lg:col-span-2">
              <RecommendationsPanel issues={report.issues} />
            </div>
          </div>

          {summary?.executive_summary && (
            <div className="bg-signal-dim border border-signal/20 rounded-xl p-6">
              <p className="font-mono text-xs uppercase tracking-wide text-signal mb-2">
                If you only fix a few things
              </p>
              <p className="text-sm text-ink/85 leading-relaxed">{summary.executive_summary}</p>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <HistoryTable entries={history} onView={onViewHistory} compact />
            </div>
            <ExportPanel onExport={onExport} disabled={!report} />
          </div>
        </>
      )}
    </div>
  )
}
