'use client'

import Image from 'next/image'

interface AskSource {
  fileName: string
  artifactId: string
  score: number
}

interface DeskResponseProps {
  answer: string
  streaming: boolean
  sources: AskSource[]
  error?: string | null
}

export function DeskResponse({ answer, streaming, sources, error }: DeskResponseProps) {
  if (error) {
    return (
      <div className="p-4" role="alert">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    )
  }

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
          <p className="text-slate text-base leading-relaxed whitespace-pre-wrap">
            {answer}
            {streaming && (
              <span className="inline-block w-[2px] h-[1em] bg-blue ml-0.5 animate-pulse align-middle">
                ▍
              </span>
            )}
          </p>

          {/* Sources */}
          {!streaming && sources.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[#E2E8F0]">
              <p className="text-slate-light text-xs font-medium mb-2">Sources</p>
              <ul className="flex flex-col gap-1.5">
                {sources.map((src) => (
                  <li key={src.artifactId} className="flex items-center justify-between gap-2">
                    <span className="text-slate text-xs flex items-center gap-1.5">
                      <span className="text-blue">⬦</span>
                      {src.fileName}
                    </span>
                    <span className="text-blue text-[11px] font-medium flex-shrink-0">
                      Available in Library
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
