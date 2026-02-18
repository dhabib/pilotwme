'use client'

interface TopicPillProps {
  label: string
  onClick?: () => void
}

export function TopicPill({ label, onClick }: TopicPillProps) {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="inline-flex items-center px-3 py-1 rounded-full bg-blue-light text-blue text-xs font-medium hover:bg-blue hover:text-white transition-colors duration-150 cursor-pointer"
      >
        {label}
      </button>
    )
  }

  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-light text-blue text-xs font-medium">
      {label}
    </span>
  )
}
