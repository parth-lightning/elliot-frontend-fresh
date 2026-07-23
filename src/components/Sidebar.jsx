const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'history', label: 'History' },
  { id: 'reports', label: 'Reports' },
]

function NavIcon({ id }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }

  if (id === 'dashboard') {
    return (
      <svg {...common}>
        <rect x="3" y="3" width="7" height="9" rx="1.5" />
        <rect x="14" y="3" width="7" height="5" rx="1.5" />
        <rect x="14" y="12" width="7" height="9" rx="1.5" />
        <rect x="3" y="16" width="7" height="5" rx="1.5" />
      </svg>
    )
  }
  
  if (id === 'history') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
      <path d="M9 13h6M9 17h6" />
    </svg>
  )
}

export default function Sidebar({ page, onNavigate, aiOnline }) {
  return (
    <aside className="flex min-h-screen w-60 shrink-0 flex-col border-r border-line bg-sidebar text-white/90">
      <div className="px-5 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-signal">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <rect x="5" y="7" width="14" height="12" rx="3" />
              <circle cx="9.5" cy="13" r="1.2" fill="white" />
              <circle cx="14.5" cy="13" r="1.2" fill="white" />
              <path d="M12 7V4M9 4h6" strokeLinecap="round" />
            </svg>
          </div>

          <div className="min-w-0">
            <p className="font-display text-lg font-semibold leading-tight text-white">
              UX Review Platform
            </p>
            <p className="mt-0.5 text-xs text-white/45">
              Automated interface analysis
            </p>
          </div>
        </div>
      </div>

      <div className="px-5">
        <div className="h-px bg-white/10" />
      </div>

      <nav className="mt-4 flex flex-col gap-1 px-3">
        <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/35">
          Workspace
        </p>

        {NAV_ITEMS.map((item) => {
          const active = page === item.id

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                active
                  ? 'border border-white/10 bg-white/10 text-white'
                  : 'text-white/68 hover:bg-white/5 hover:text-white'
              }`}
            >
              <NavIcon id={item.id} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="mt-6 px-3">
        <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/35">
          System
        </p>

        <div className="rounded-2xl border border-white/10 bg-sidebar-hover px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-white">AI Backend</p>
              <p className="mt-1 text-xs text-white/45">Llama-4-Scout</p>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  aiOnline ? 'bg-good' : 'bg-white/25'
                }`}
              />
              <span
                className={`text-xs font-medium ${
                  aiOnline ? 'text-good' : 'text-white/40'
                }`}
              >
                {aiOnline ? 'Connected' : 'Offline'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto px-3 pb-5">
        <div className="rounded-2xl border border-white/10 bg-sidebar-hover px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/35">
            Session
          </p>

          <div className="mt-2 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-signal/25 text-sm font-semibold text-white/90">
              U
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium text-white">Local Session</p>
              <p className="truncate text-xs text-white/40">
                UI/UX analysis workspace
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}