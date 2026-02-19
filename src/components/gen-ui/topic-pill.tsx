'use client'

export interface TopicPillProps {
  topic: string
  query?: string
  onClick?: (query: string) => void
}

export default function TopicPill({ topic, query, onClick }: TopicPillProps) {
  const searchQuery = query || topic

  return (
    <button
      onClick={() => onClick?.(searchQuery)}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full border border-[#E2E8F0] bg-white text-slate hover:bg-blue hover:text-white hover:border-blue transition-colors cursor-pointer"
      aria-label={`Explore topic: ${topic}`}
    >
      <svg
        className="w-3.5 h-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      {topic}
    </button>
  )
}
