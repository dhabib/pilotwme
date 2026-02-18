'use client'

import { useState } from 'react'
import { Eyebrow } from './eyebrow'
import { GeneratedFooter } from './generated-footer'
import { useAskStream } from '@/hooks/use-ask-stream'

interface WisdomEngineContentProps {
  title: string
  hookContent: string
  generatedAt: string
}

export function WisdomEngineContent({ title, hookContent, generatedAt }: WisdomEngineContentProps) {
  const [exploratoryActive, setExploratoryActive] = useState(false)
  const { answer, sources, streaming, error, submit, reset } = useAskStream()

  // Remove markdown title if present
  let cleanContent = hookContent.replace(/^#\s+.*?\n\n/, '').trim()

  // Strip markdown heading syntax but KEEP source attributions
  cleanContent = cleanContent
    .replace(/^##\s+/gm, '') // Remove ## headings
    .replace(/^###\s+/gm, '') // Remove ### headings
    .trim()

  // Show full hook content (no split)
  const fullContent = cleanContent

  const formattedDate = new Date(generatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      {/* Main hook content */}
      <article className="border-b border-[#E2E8F0] py-12 max-w-2xl">
        <Eyebrow text="HOOK CONTENT · CACHED · STABLE URL" className="mb-4" />
        <h1 className="font-serif text-[38px] md:text-[48px] leading-tight text-ink mb-8">
          {title}
        </h1>

        {fullContent.split('\n\n').map((para, i) => (
          <p key={i} className="text-slate text-base leading-relaxed mb-5 whitespace-pre-wrap">
            {para.trim()}
          </p>
        ))}

        {/* Expand button */}
        {!exploratoryActive && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => {
                setExploratoryActive(true)
                submit("How is a Wisdom Engine different from a traditional CMS?")
              }}
              className="px-6 py-3 bg-blue text-white font-medium rounded-lg hover:bg-blue-dark transition-colors"
            >
              Get more from the Wisdom Engine →
            </button>
          </div>
        )}
      </article>

      {/* Exploratory section - dynamic manifold query */}
      {exploratoryActive && (
        <section className="border-b border-[#E2E8F0] py-12 max-w-2xl">
          <Eyebrow text="EXPLORATORY · STREAMING FROM MANIFOLD" color="accent" className="mb-4" />

          {/* Streaming answer */}
          <div className="text-slate text-base leading-relaxed mb-5">
            {answer}
            {streaming && (
              <span className="inline-block w-[2px] h-[1em] bg-blue ml-0.5 animate-pulse align-middle">
                ▍
              </span>
            )}
          </div>

          {/* Error state */}
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          {/* Sources (when streaming completes) */}
          {!streaming && sources.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[#E2E8F0]">
              <p className="text-slate-light text-xs font-medium mb-2">Sources</p>
              <ul className="flex flex-col gap-1.5">
                {sources.map((src) => (
                  <li key={src.artifactId} className="flex items-center gap-2">
                    <span className="text-blue">⬦</span>
                    <span className="text-slate text-xs">{src.fileName}</span>
                    <span className="text-blue text-[11px] font-medium">Available in Library</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      <GeneratedFooter
        date={formattedDate}
        libraryUrl="https://console.pilotwme.com/dashboard/artifacts"
      />
    </>
  )
}
