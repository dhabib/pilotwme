'use client'

import { useStreamText } from '@/hooks/use-stream-text'

interface StreamingParagraphProps {
  text: string
  active: boolean
  speed?: number
}

export function StreamingParagraph({ text, active, speed = 14 }: StreamingParagraphProps) {
  const { displayed, done } = useStreamText(text, speed, active)

  if (!active) return null

  // Handle multi-paragraph text
  const paragraphs = displayed.split('\n\n').filter(Boolean)

  return (
    <div aria-live="polite" aria-label="Streaming content">
      {paragraphs.map((para, i) => (
        <p key={i} className="text-slate text-base leading-relaxed mb-4">
          {para}
          {/* Show cursor only on last paragraph while streaming */}
          {!done && i === paragraphs.length - 1 && (
            <span className="inline-block w-[2px] h-[1em] bg-blue ml-0.5 animate-pulse align-middle">
              ▍
            </span>
          )}
        </p>
      ))}
    </div>
  )
}
