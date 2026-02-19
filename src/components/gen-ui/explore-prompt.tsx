'use client'

export interface ExplorePromptProps {
  question: string
  context?: string
  onClick?: (question: string) => void
}

export default function ExplorePrompt({ question, context, onClick }: ExplorePromptProps) {
  return (
    <button
      onClick={() => onClick?.(question)}
      className="w-full text-left border border-dashed border-[#E2E8F0] rounded-lg p-4 my-3 hover:border-blue hover:bg-blue/5 transition-all group cursor-pointer"
      aria-label={`Explore: ${question}`}
    >
      <div className="flex items-start gap-3">
        <span className="text-blue mt-0.5 group-hover:translate-x-0.5 transition-transform">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
        <div>
          <p className="text-sm font-medium text-ink">{question}</p>
          {context && <p className="text-xs text-slate-light mt-1">{context}</p>}
        </div>
      </div>
    </button>
  )
}
