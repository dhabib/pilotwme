interface ScrollHintProps {
  progress: number  // 0-1
  visible: boolean
}

export function ScrollHint({ progress, visible }: ScrollHintProps) {
  if (!visible) return null

  return (
    <div className="flex flex-col items-center gap-3 py-8 text-slate-light text-sm select-none">
      <p className="animate-pulse">↓ Keep scrolling to see exploratory content ↓</p>
      <div className="w-[200px] h-[3px] bg-[#E2E8F0] rounded-full overflow-hidden">
        <div
          className="h-full bg-blue rounded-full transition-all duration-150"
          style={{ width: `${Math.min(progress * 100, 100)}%` }}
        />
      </div>
    </div>
  )
}
