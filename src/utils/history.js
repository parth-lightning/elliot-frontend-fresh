// Analysis history, kept in localStorage so it survives a refresh.
// This app runs entirely on your machine (Vite dev server), so
// localStorage here is just this browser's local data — nothing
// leaves your machine and no backend storage is needed.

const KEY = 'ux-agent-history'
const MAX_ENTRIES = 25

export function getHistory() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function addHistoryEntry(entry) {
  const current = getHistory()
  const next = [{ ...entry, id: Date.now() }, ...current].slice(0, MAX_ENTRIES)
  try {
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // storage full or unavailable — history just won't persist, not fatal
  }
  return next
}

export function clearHistory() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* noop */
  }
}
