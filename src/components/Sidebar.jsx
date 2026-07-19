const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'new', label: 'New Analysis' },
  { id: 'history', label: 'History' },
  { id: 'reports', label: 'Reports' },
]

function NavIcon({ id }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }
  if (id === 'dashboard') return <svg {...common}><rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" /></svg>
  if (id === 'new') return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M12 8v8M8 12h8" /></svg>
  if (id === 'history') return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
  return <svg {...common}><path d="M6 2h9l5 5v13a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" /><path d="M9 13h6M9 17h6" /></svg>
}

export default function Sidebar({ page, onNavigate, aiOnline }) {
  return (
    <aside className="w-64 shrink-0 bg-sidebar text-white/90 flex flex-col min-h-screen">
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="w-10 h-10 rounded-xl bg-signal flex items-center justify-center shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <rect x="5" y="7" width="14" height="12" rx="3" />
            <circle cx="9.5" cy="13" r="1.2" fill="white" />
            <circle cx="14.5" cy="13" r="1.2" fill="white" />
            <path d="M12 7V4M9 4h6" strokeLinecap="round" />
          </svg>
        </div>
        <p className="font-display font-semibold text-lg leading-tight">UI/UX Review<br />Agent</p>
      </div>

      <nav className="px-3 mt-2 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              page === item.id ? 'bg-signal text-white' : 'text-white/70 hover:bg-sidebar-hover hover:text-white'
            }`}
          >
            <NavIcon id={item.id} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto px-3 pb-5 flex flex-col gap-3">
        <div className="rounded-xl bg-sidebar-hover px-4 py-3">
          <p className="text-[11px] uppercase tracking-wide text-white/50 font-mono mb-1">AI Model</p>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${aiOnline ? 'bg-good' : 'bg-white/30'}`} />
            <p className="text-sm font-medium">Llama-4-Scout</p>
          </div>
          <p className={`text-xs mt-0.5 ${aiOnline ? 'text-good' : 'text-white/40'}`}>
            {aiOnline ? 'Online' : 'Unreachable'}
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-sidebar-hover px-4 py-3">
          <div className="w-9 h-9 rounded-full bg-signal/30 flex items-center justify-center text-sm font-medium">
            U
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium">User</p>
            <p className="text-xs text-white/40 truncate">local session</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
