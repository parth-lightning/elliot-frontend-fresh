import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import HistoryPage from './pages/HistoryPage.jsx'
import ReportsPage from './pages/ReportsPage.jsx'
import { analyzeScreenshot, checkHealth } from './api/analyzeService.js'
import { getHistory, addHistoryEntry } from './utils/history.js'
import { makeThumbnail } from './utils/thumbnail.js'
import { exportReportPdf } from './utils/pdfExport.js'

export default function App() {
  const [page, setPage] = useState('dashboard')
  const [aiOnline, setAiOnline] = useState(false)

  const [selectedFile, setSelectedFile] = useState(null)
  const [imageUrl, setImageUrl] = useState('')
  const [report, setReport] = useState(null)
  const [summary, setSummary] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [error, setError] = useState('')
  const [fileName, setFileName] = useState('')

  const [history, setHistory] = useState(() => getHistory())

  useEffect(() => {
    checkHealth().then(setAiOnline)

    const interval = setInterval(() => {
      checkHealth().then(setAiOnline)
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  function handleFileSelected(file) {
    setSelectedFile(file)
    setError('')
    setImageUrl(URL.createObjectURL(file))
  }

  async function handleAnalyze() {
    if (!selectedFile) return

    setAnalyzing(true)
    setError('')
    setSummary(null)

    try {
      const data = await analyzeScreenshot(selectedFile)

      setReport(data)
      setFileName(selectedFile.name)

      const thumbnail = await makeThumbnail(selectedFile).catch(() => null)

      const nextHistory = addHistoryEntry({
        fileName: selectedFile.name,
        report: data,
        thumbnail,
      })

      setHistory(nextHistory)

    } catch (err) {
      console.error("FULL ERROR:", err)

      setError(
        err.response?.data?.detail
          ? String(err.response.data.detail)
          : "Could not analyze that screenshot. Check the backend is running and try again."
      )

    } finally {
      setAnalyzing(false)
    }
  }

  function handleExport() {
    if (!report) return

    exportReportPdf({
      fileName,
      report,
      summary
    })
  }

  function handleExportEntry(entry) {
    exportReportPdf({
      fileName: entry.fileName,
      report: entry.report,
      summary: null
    })
  }

  function handleViewHistory(entry) {
    setReport(entry.report)
    setFileName(entry.fileName)
    setImageUrl(entry.thumbnail || '')
    setSummary(null)
    setSelectedFile(null)
    setPage('dashboard')
  }

  return (
    <div className="min-h-screen flex bg-paper">

      <Sidebar 
        page={page} 
        onNavigate={setPage} 
        aiOnline={aiOnline} 
      />

      <main className="flex-1 min-w-0">

        {(page === 'dashboard' || page === 'new') && (
          <DashboardPage
            selectedFile={selectedFile}
            imageUrl={imageUrl}
            report={report}
            summary={summary}
            analyzing={analyzing}
            error={error}
            onFileSelected={handleFileSelected}
            onAnalyze={handleAnalyze}
            onExport={handleExport}
            history={history}
            onViewHistory={handleViewHistory}
          />
        )}

        {page === 'history' && (
          <HistoryPage 
            history={history} 
            onViewHistory={handleViewHistory} 
          />
        )}

        {page === 'reports' && (
          <ReportsPage
            history={history}
            onViewHistory={handleViewHistory}
            onExportEntry={handleExportEntry}
          />
        )}

      </main>

    </div>
  )
}