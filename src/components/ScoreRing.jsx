import { useEffect, useState } from 'react'

function colorFor(score) {
  if (score >= 8) return '#1EA672'
  if (score >= 5) return '#E0900F'
  return '#D64545'
}

function labelFor(score) {
  if (score >= 9) return 'Excellent'
  if (score >= 8) return 'Good'
  if (score >= 5) return 'Fair'
  return 'Needs Work'
}

function verdictCopy(score) {
  if (score >= 8)
    return 'The interface demonstrates a strong user experience with only minor improvements recommended.'

  if (score >= 5)
    return 'The interface is functional but several usability and accessibility improvements are recommended.'

  return 'The interface contains significant usability concerns and should be reviewed before release.'
}

export default function ScoreRing({ score }) {
  const [animated, setAnimated] = useState(0)

  const radius = 72
  const circumference = 2 * Math.PI * radius

  const pct = Math.max(0, Math.min(10, score)) / 10

  const color = colorFor(score)

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(pct), 120)
    return () => clearTimeout(timer)
  }, [pct])

  return (
    <div className="rounded-2xl border border-line bg-panel p-8">
      <div className="border-b border-line pb-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
          Overall Assessment
        </p>

        <h2 className="mt-2 font-display text-xl font-semibold text-ink">
          UI / UX Score
        </h2>
      </div>

      <div className="mt-8 flex justify-center">
        <div className="relative">
          <svg width="200" height="200" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="14"
            />

            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - animated)}
              transform="rotate(-90 100 100)"
              style={{
                transition:
                  'stroke-dashoffset 900ms cubic-bezier(0.16,1,0.3,1)',
              }}
            />

            <text
              x="100"
              y="96"
              textAnchor="middle"
              fontSize="42"
              fontWeight="700"
              fill="#14161A"
            >
              {score}
            </text>

            <text
              x="100"
              y="118"
              textAnchor="middle"
              fontSize="14"
              fill="#6B7280"
            >
              out of 10
            </text>
          </svg>
        </div>
      </div>

      <div className="mt-6 text-center">
        <span
          className="inline-flex rounded-full border px-4 py-1 text-sm font-semibold"
          style={{
            color,
            borderColor: `${color}33`,
            backgroundColor: `${color}12`,
          }}
        >
          {labelFor(score)}
        </span>

        <p className="mt-5 text-sm leading-7 text-muted">
          {verdictCopy(score)}
        </p>
      </div>
    </div>
  )
}