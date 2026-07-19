// Derives a per-category score (0-10) from the flat issues list your
// backend already returns. No backend change needed — this is a
// client-side estimate: each category starts at 10 and loses points
// per issue found in it, weighted by severity.

const BUCKETS = [
  'Layout & Structure',
  'Typography',
  'Color & Contrast',
  'Accessibility',
  'Navigation',
  'Consistency',
  'User Experience',
]

const SEVERITY_PENALTY = {
  Critical: 3,
  Major: 2,
  Moderate: 2,
  Minor: 1,
}

// Loosely maps whatever free-text category the model returned
// (e.g. "Color Contrast", "Password Visibility") onto one of the
// fixed buckets above.
function bucketFor(rawCategory = '') {
  const c = rawCategory.toLowerCase()
  if (/layout|spacing|structure|grid|alignment/.test(c)) return 'Layout & Structure'
  if (/type|font|label|text size/.test(c)) return 'Typography'
  if (/color|contrast/.test(c)) return 'Color & Contrast'
  if (/access|password|aria|screen reader|keyboard/.test(c)) return 'Accessibility'
  if (/nav|menu|breadcrumb/.test(c)) return 'Navigation'
  if (/consisten/.test(c)) return 'Consistency'
  return 'User Experience'
}

export function computeBreakdown(issues) {
  const scores = Object.fromEntries(BUCKETS.map((b) => [b, 10]))

  for (const issue of issues) {
    const bucket = bucketFor(issue.category)
    const penalty = SEVERITY_PENALTY[issue.severity] ?? 1
    scores[bucket] = Math.max(0, scores[bucket] - penalty)
  }

  return BUCKETS.map((label) => ({ label, score: scores[label] }))
}
