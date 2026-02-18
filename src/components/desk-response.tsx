'use client'

import Image from 'next/image'
import { useStreamText } from '@/hooks/use-stream-text'
import { Source } from '@/lib/types'

interface DeskResponseProps {
  answer: string
  streaming: boolean
  sources: Source[]
}

export function DeskResponse({ answer, streaming, sources }: DeskResponseProps) {
  const { displayed, done } = useStreamText(answer, 12, streaming)

  const shownText = streaming ? displayed : answer
  const showSources = streaming ? done : true

  return (
    <div className="p-4" role="log" aria-live="polite" aria-label="Pilot response">
      <div className="flex gap-3 items-start">
        {/* Avatar */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden bg-blue-light border border-[#E2E8F0]">
          <Image
            src="/pilot-logo.png"
            alt="Pilot"
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Response */}
        <div className="flex-1 min-w-0">
          <p className="text-slate text-base leading-relaxed">
            {shownText}
            {streaming && !done && (
              <span className="inline-block w-[2px] h-[1em] bg-blue ml-0.5 animate-pulse align-middle">
                ▍
              </span>
            )}
          </p>

          {/* Sources */}
          {showSources && sources.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[#E2E8F0]">
              <p className="text-slate-light text-xs font-medium mb-2">Sources</p>
              <ul className="flex flex-col gap-1.5">
                {sources.map((src) => (
                  <li key={src.id} className="flex items-center justify-between gap-2">
                    <span className="text-slate text-xs flex items-center gap-1.5">
                      <span className="text-blue">⬦</span>
                      {src.title}
                    </span>
                    <span className="text-slate-light text-[11px] font-mono flex-shrink-0">
                      {src.id}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
