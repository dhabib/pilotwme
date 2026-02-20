'use client'

interface TopicFilterBarProps {
  topics: string[]
  selected: string | null
  onSelect: (topic: string | null) => void
}

export function TopicFilterBar({ topics, selected, onSelect }: TopicFilterBarProps) {
  if (topics.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter by topic">
      <button
        onClick={() => onSelect(null)}
        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-150 ${
          selected === null
            ? 'bg-blue text-white'
            : 'bg-blue-light text-blue hover:bg-blue hover:text-white'
        }`}
        aria-pressed={selected === null}
      >
        All
      </button>
      {topics.map((topic) => (
        <button
          key={topic}
          onClick={() => onSelect(selected === topic ? null : topic)}
          className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-150 ${
            selected === topic
              ? 'bg-blue text-white'
              : 'bg-blue-light text-blue hover:bg-blue hover:text-white'
          }`}
          aria-pressed={selected === topic}
        >
          {topic}
        </button>
      ))}
    </div>
  )
}
