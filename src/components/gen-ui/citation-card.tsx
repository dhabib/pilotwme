'use client'

export interface CitationCardProps {
  sourceId: string
  fileName: string
  score?: number
  isPublic?: boolean
  excerpt?: string
}

export default function CitationCard({ fileName, score, excerpt }: CitationCardProps) {
  const displayName = fileName.replace(/\.\w+$/, '')
  const confidence = score ? Math.round(score * 100) : null

  return (
    <aside
      className="border border-[#E2E8F0] rounded-lg p-3 my-2 bg-white hover:bg-slate-50 transition-colors"
      role="complementary"
      aria-label={`Source: ${displayName}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-slate-400 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="text-sm font-medium text-slate truncate">{displayName}</span>
          </div>
          {excerpt && (
            <p className="text-xs text-slate-light mt-1 line-clamp-2">{excerpt}</p>
          )}
        </div>
        {confidence !== null && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-blue/10 text-blue font-medium flex-shrink-0">
            {confidence}%
          </span>
        )}
      </div>
    </aside>
  )
}
