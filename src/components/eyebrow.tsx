interface EyebrowProps {
  text: string
  color?: 'blue' | 'accent' | 'slate'
  className?: string
}

export function Eyebrow({ text, color = 'blue', className = '' }: EyebrowProps) {
  const colorClass =
    color === 'accent'
      ? 'text-accent'
      : color === 'slate'
      ? 'text-slate-light'
      : 'text-blue'

  return (
    <p
      className={`font-mono text-[11px] uppercase tracking-[2.5px] font-medium ${colorClass} ${className}`}
    >
      {text}
    </p>
  )
}
