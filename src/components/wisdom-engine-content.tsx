'use client'

import { Eyebrow } from './eyebrow'
import { GeneratedFooter } from './generated-footer'

interface WisdomEngineContentProps {
  title: string
  hookContent: string
  generatedAt: string
}

export function WisdomEngineContent({ title, hookContent, generatedAt }: WisdomEngineContentProps) {
  // Remove markdown title if present
  const cleanContent = hookContent.replace(/^#\s+.*?\n\n/, '').trim()

  const formattedDate = new Date(generatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      {/* Main content - all of it, no split */}
      <article className="border-b border-[#E2E8F0] py-12 max-w-2xl">
        <Eyebrow text="HOOK CONTENT · CACHED · STABLE URL" className="mb-4" />
        <h1 className="font-serif text-[38px] md:text-[48px] leading-tight text-ink mb-8">
          {title}
        </h1>

        {cleanContent.split('\n\n').map((para, i) => (
          <p key={i} className="text-slate text-base leading-relaxed mb-5 whitespace-pre-wrap">
            {para.trim()}
          </p>
        ))}
      </article>

      <GeneratedFooter
        date={formattedDate}
        libraryUrl="https://console.pilotwme.com/dashboard/artifacts"
      />
    </>
  )
}
