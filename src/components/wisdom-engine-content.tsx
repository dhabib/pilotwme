'use client'

import { useState } from 'react'
import { Eyebrow } from './eyebrow'
import { StreamingParagraph } from './streaming-paragraph'
import { GeneratedFooter } from './generated-footer'

interface WisdomEngineContentProps {
  title: string
  hookContent: string
  generatedAt: string
}

export function WisdomEngineContent({ title, hookContent, generatedAt }: WisdomEngineContentProps) {
  const [exploratoryActive, setExploratoryActive] = useState(false)

  // Remove markdown title if present
  let cleanContent = hookContent.replace(/^#\s+.*?\n\n/, '').trim()

  // Strip markdown heading syntax but KEEP source attributions
  cleanContent = cleanContent
    .replace(/^##\s+/gm, '') // Remove ## headings
    .replace(/^###\s+/gm, '') // Remove ### headings
    .trim()

  // Split into main (60%) and exploratory (40%)
  const splitPoint = Math.floor(cleanContent.length * 0.6)
  const mainContent = cleanContent.slice(0, splitPoint).trim()
  const exploratoryContent = cleanContent.slice(splitPoint).trim()

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

        {mainContent.split('\n\n').map((para, i) => (
          <p key={i} className="text-slate text-base leading-relaxed mb-5 whitespace-pre-wrap">
            {para.trim()}
          </p>
        ))}

        {/* Expand button */}
        {!exploratoryActive && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setExploratoryActive(true)}
              className="px-6 py-3 bg-blue text-white font-medium rounded-lg hover:bg-blue-dark transition-colors"
            >
              Get more from the Wisdom Engine →
            </button>
          </div>
        )}
      </article>

      {/* Exploratory section - only shown after clicking expand */}
      {exploratoryActive && (
        <section className="border-b border-[#E2E8F0] py-12 max-w-2xl">
          <Eyebrow text="EXPLORATORY · STREAMING FROM MANIFOLD" color="accent" className="mb-4" />
          <StreamingParagraph text={exploratoryContent} active={true} speed={3} />
        </section>
      )}

      <GeneratedFooter
        date={formattedDate}
        libraryUrl="https://console.pilotwme.com/dashboard/artifacts"
      />
    </>
  )
}
