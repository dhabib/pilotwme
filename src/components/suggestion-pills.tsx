'use client'

interface SuggestionPillsProps {
  suggestions: string[]
  onSelect: (text: string) => void
}

export function SuggestionPills({ suggestions, onSelect }: SuggestionPillsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 mt-4">
      <span className="text-slate-light text-xs">Try asking:</span>
      {suggestions.map((s) => (
        <button
          key={s}
          onClick={() => onSelect(s)}
          className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-light text-blue text-xs font-medium hover:bg-blue hover:text-white transition-colors duration-150 cursor-pointer"
        >
          {s}
        </button>
      ))}
    </div>
  )
}
