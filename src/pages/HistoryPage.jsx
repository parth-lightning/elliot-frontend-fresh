import HistoryTable from '../components/HistoryTable.jsx'

export default function HistoryPage({ history, onViewHistory }) {
  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-8 px-6 py-8 lg:px-10">
      <header className="flex flex-col gap-4 border-b border-line pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">
            Analysis Archive
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">
            History
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Every scan you have run in this session, organized for quick review and follow-up.
          </p>
        </div>

        <div className="rounded-2xl border border-line bg-panel px-5 py-4 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
            Total Scans
          </p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-ink">
            {history.length}
          </p>
        </div>
      </header>

      <section className="rounded-2xl border border-line bg-panel shadow-sm">
        {history.length === 0 ? (
          <div className="px-6 py-20 text-center">
            <p className="text-lg text-muted">No history yet.</p>
            <p className="mt-2 text-sm text-muted">
              Run your first analysis to start building a record of scans.
            </p>
          </div>
        ) : (
          <div className="p-2 sm:p-4">
            <HistoryTable entries={history} onView={onViewHistory} compact />
          </div>
        )}
      </section>
    </div>
  )
}