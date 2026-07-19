import HistoryTable from '../components/HistoryTable.jsx'

export default function HistoryPage({ history, onViewHistory }) {
  return (
    <div className="p-8 max-w-[1400px] mx-auto flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">History</h1>
        <p className="text-sm text-muted mt-1">Every scan you've run this session</p>
      </div>
      <HistoryTable entries={history} onView={onViewHistory} />
    </div>
  )
}
