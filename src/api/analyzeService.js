import axios from 'axios'

// Configurable API base URL:
// In production on Netlify, can point directly to the Render backend URL (e.g. https://<backend>.onrender.com)
// or fallback to '/api' (proxied by Netlify redirects or local Vite proxy).
const rawApiUrl = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')
const baseURL = rawApiUrl || '/api'

const client = axios.create({ baseURL, timeout: 60000 })

/**
 * Sends a screenshot to POST /analyze and returns the structured
 * UX report: { overall_score, total_issues, issues: [...] }.
 */
export async function analyzeScreenshot(file) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await client.post('/analyze', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}

/**
 * Sends the already-parsed issues list to the AI-layer endpoint
 * (POST /analyze/summary) to get a written executive summary and a
 * prioritized fix order. Optional — see ux-agent-ai-layer/.
 */
export async function summarizeReport(report) {
  const response = await client.post('/analyze/summary', report)
  return response.data
}

/**
 * Pings your existing GET /health endpoint (per the backend report)
 * to drive the "AI Model Online" indicator in the sidebar.
 */
export async function checkHealth() {
  try {
    await client.get('/health')
    return true
  } catch {
    return false
  }
}
