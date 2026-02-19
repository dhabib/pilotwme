'use client'

import { ReactNode } from 'react'

export interface InsightPanelProps {
  title: string
  confidence?: number
  children?: ReactNode
  content?: string
}

export default function InsightPanel({ title, confidence, children, content }: InsightPanelProps) {
  const confidencePercent = confidence ? Math.round(confidence * 100) : null
  const confidenceColor =
    confidence && confidence > 0.7
      ? 'text-green-600'
      : confidence && confidence > 0.4
        ? 'text-yellow-600'
        : 'text-orange-600'

  return (
    <section
      className="border-l-4 border-blue bg-slate-50 rounded-r-lg p-4 my-4"
      role="region"
      aria-label={`Insight: ${title}`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-ink flex items-center gap-2">
          <svg
            className="w-4 h-4 text-blue"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          {title}
        </h3>
        {confidencePercent !== null && (
          <span className={`text-xs font-medium ${confidenceColor}`}>
            {confidencePercent}% confidence
          </span>
        )}
      </div>
      <div className="text-sm text-slate leading-relaxed">{children || content || null}</div>
    </section>
  )
}
