# UI/UX Review Agent — Dashboard Frontend

React + Vite + Tailwind dashboard, restructured to match a sidebar-nav
admin-dashboard layout: Dashboard / New Analysis / History / Reports.

## Setup

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`. Proxies `/api/*` to your FastAPI
backend at `http://127.0.0.1:8000` — start that separately with
`uvicorn app.main:app --reload`.

## What's new vs the previous version

- **Sidebar layout** — Dashboard, New Analysis, History, Reports nav;
  AI model status (pings your existing `GET /health`); user block
- **Persistent upload panel** next to a live screenshot preview,
  instead of a full-page upload screen
- **Score ring + Score Breakdown** — the breakdown (Layout & Structure,
  Typography, Color & Contrast, Accessibility, Navigation, Consistency,
  User Experience) is derived **client-side** from your existing
  `issues[]` list (`src/utils/categoryBreakdown.js`) — no backend
  change. Each bucket starts at 10 and loses points per issue found in
  it, weighted by severity. It's an estimate, not a model-generated
  score — flag it as such if you present it to others.
- **Issues Detected panel** — numbered, severity-tagged cards
- **Recommendations panel** — de-duplicated checklist of fixes across
  all detected issues
- **Analysis History** — kept in `localStorage` (this app runs
  entirely on your machine, so nothing leaves your browser); shows a
  thumbnail, score, issue count, and a "view" action to reload that
  report
- **Export Report → PDF** — generated client-side with `jspdf`
  (`src/utils/pdfExport.js`), no backend involved

## Notes on the AI Model status indicator

It's a real check, not decorative — it calls your `/health` endpoint
every 15s. If your backend isn't running, it'll correctly show
"Unreachable."

## Still backend-driven (unchanged)

- `POST /analyze` — your existing endpoint, untouched
- `POST /analyze/summary` — the optional AI-layer summary endpoint
  from `ux-agent-ai-layer/`, still optional; the "if you only fix a
  few things" panel just won't appear if it's not wired in
