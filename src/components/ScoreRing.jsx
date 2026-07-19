import { useEffect, useState } from 'react'

function colorFor(score) {
  if (score >= 8) return '#1EA672'
  if (score >= 5) return '#E0900F'
  return '#D64545'
}

function verdictCopy(score) {
  if (score >= 8) return 'Great job! Your UI/UX is good but there are some areas to improve.'
  if (score >= 5) return 'Decent foundation, but a few issues need attention.'
  return 'Significant UX gaps — worth prioritizing fixes soon.'
}

export default function ScoreRing({ score }) {
  const [animated, setAnimated] = useState(0)
  const radius = 68
  const circumference = 2 * Math.PI * radius
  const pct = Math.max(0, Math.min(10, score)) / 10
  const ring = colorFor(score)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(pct), 80)
    return () => clearTimeout(t)
  }, [pct])

  const offset = circumference * (1 - animated)

  return (
    <div className="bg-panel border border-line rounded-xl p-6 flex flex-col items-center text-center">
      <h2 className="font-display font-semibold text-ink self-start">Overall UI/UX Score</h2>
      <svg width="180" height="180" viewBox="0 0 180 180" className="mt-4">
        <circle cx="90" cy="90" r={radius} fill="none" stroke="#E4E7EC" strokeWidth="14" />
        <circle
          cx="90" cy="90" r={radius} fill="none"
          stroke={ring} strokeWidth="14" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          transform="rotate(-90 90 90)"
          style={{ transition: 'stroke-dashoffset 900ms cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
        <text x="90" y="88" textAnchor="middle" className="font-display" fontSize="40" fontWeight="700" fill="#14161A">
          {score}
        </text>
        <text x="90" y="108" textAnchor="middle" className="font-mono" fontSize="13" fill="#6B7280">
          / 10
        </text>
      </svg>
      <p className="font-display font-semibold mt-1" style={{ color: ring }}>
        {score >= 8 ? 'Good' : score >= 5 ? 'Fair' : 'Needs Work'}
      </p>
      <p className="text-sm text-muted mt-2">{verdictCopy(score)}</p>
    </div>
  )
}
