'use client'

import { useState, useRef, useEffect } from 'react'
import { Eyebrow } from './eyebrow'
import { ScrollHint } from './scroll-hint'
import { StreamingParagraph } from './streaming-paragraph'
import { GeneratedFooter } from './generated-footer'

interface WisdomEngineContentProps {
  title: string
  hookContent: string
  generatedAt: string
}

export function WisdomEngineContent({ title, hookContent, generatedAt }: WisdomEngineContentProps) {
  const [exploratoryActive, setExploratoryActive] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const hookRef = useRef<HTMLElement>(null)

  // Remove markdown title if present, split content into main (60%) and exploratory (40%)
  const cleanContent = hookContent.replace(/^#\s+.*?\n\n/, '').trim()
  const splitPoint = Math.floor(cleanContent.length * 0.6)
  const mainContent = cleanContent.slice(0, splitPoint).trim()
  const exploratoryContent = cleanContent.slice(splitPoint).trim()

  // Track scroll position for the hint bar
  useEffect(() => {
    const handleScroll = () => {
      const el = hookRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const progress = Math.min(1, -rect.top / (el.offsetHeight * 0.55))
      setScrollProgress(Math.max(0, progress))

      if (!exploratoryActive && -rect.top / el.offsetHeight >= 0.55) {
        setExploratoryActive(true)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [exploratoryActive])

  const formattedDate = new Date(generatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      {/* Hook zone */}
      <article ref={hookRef} className="border-b border-[#E2E8F0] py-12 max-w-2xl">
        <Eyebrow text="HOOK CONTENT · CACHED · STABLE URL" className="mb-4" />
        <h1 className="font-serif text-[38px] md:text-[48px] leading-tight text-ink mb-8">
          {title}
        </h1>

        {mainContent.split('\n\n').map((para, i) => (
          <p key={i} className="text-slate text-base leading-relaxed mb-5 whitespace-pre-wrap">
            {para.trim()}
          </p>
        ))}

        <ScrollHint progress={scrollProgress} visible={!exploratoryActive} />
      </article>

      {/* Exploratory zone */}
      {exploratoryActive && exploratoryContent && (
        <section className="border-b border-[#E2E8F0] py-12 max-w-2xl">
          <Eyebrow text="EXPLORATORY · STREAMING FROM MANIFOLD" color="accent" className="mb-4" />

          <StreamingParagraph text={exploratoryContent} active={exploratoryActive} speed={3} />
        </section>
      )}

      <GeneratedFooter
        date={formattedDate}
        libraryUrl="https://console.pilotwme.com/dashboard/artifacts"
      />
    </>
  )
}
