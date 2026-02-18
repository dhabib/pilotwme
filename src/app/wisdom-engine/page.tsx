'use client'

import { useState, useRef, useEffect } from 'react'
import { Eyebrow } from '@/components/eyebrow'
import { Cite } from '@/components/cite'
import { PullQuote } from '@/components/pull-quote'
import { ScrollHint } from '@/components/scroll-hint'
import { StreamingParagraph } from '@/components/streaming-paragraph'
import { ProvenanceFooter } from '@/components/provenance-footer'
import { GeneratedFooter } from '@/components/generated-footer'
import { TopicPill } from '@/components/topic-pill'
import { hookPage } from '@/lib/data'

export default function WisdomEnginePage() {
  const [exploratoryActive, setExploratoryActive] = useState(false)
  const [streamDone, setStreamDone] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const hookRef = useRef<HTMLElement>(null)

  // Track scroll position for the hint bar
  useEffect(() => {
    const handleScroll = () => {
      const el = hookRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const progress = Math.min(1, (-rect.top) / (el.offsetHeight * 0.55))
      setScrollProgress(Math.max(0, progress))

      if (!exploratoryActive && -rect.top / el.offsetHeight >= 0.55) {
        setExploratoryActive(true)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [exploratoryActive])

  // Update streamDone when streaming completes
  // We pass a callback via the StreamingParagraph component
  // For simplicity, use a timer approximation based on text length
  useEffect(() => {
    if (!exploratoryActive) return
    const charCount = hookPage.exploratoryText.length
    const duration = charCount * 14 // 14ms per char
    const timer = setTimeout(() => setStreamDone(true), duration)
    return () => clearTimeout(timer)
  }, [exploratoryActive])

  return (
    <>
      {/* Hook zone */}
      <article ref={hookRef} className="border-b border-[#E2E8F0] py-12 max-w-2xl">
        <Eyebrow text={hookPage.eyebrow} className="mb-4" />
        <h1 className="font-serif text-[38px] md:text-[48px] leading-tight text-ink mb-8">
          {hookPage.title}
        </h1>

        {hookPage.paragraphs.map((p) => {
          if (p.isPullQuote) {
            return <PullQuote key={p.id} text={p.pullQuoteText!} />
          }

          return (
            <p key={p.id} className="text-slate text-base leading-relaxed mb-5">
              {p.citation ? (
                <>
                  {p.text.split(p.citation.text)[0]}
                  <Cite artifact={p.citation.artifact}>
                    {p.citation.text}
                  </Cite>
                  {p.text.split(p.citation.text)[1]}
                </>
              ) : (
                p.text
              )}
            </p>
          )
        })}

        <ScrollHint progress={scrollProgress} visible={!exploratoryActive} />
      </article>

      {/* Exploratory zone */}
      {exploratoryActive && (
        <section className="border-b border-[#E2E8F0] py-12 max-w-2xl">
          <Eyebrow text="EXPLORATORY · STREAMING FROM MANIFOLD" color="accent" className="mb-2" />

          {!streamDone && (
            <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse mb-4" />
          )}

          <h3 className="font-serif text-[26px] text-ink mb-5 leading-snug">
            Going Deeper: The Pull-to-Push Revolution
          </h3>

          <StreamingParagraph
            text={hookPage.exploratoryText}
            active={exploratoryActive}
            speed={12}
          />

          {streamDone && (
            <>
              <ProvenanceFooter
                artifactCount={hookPage.provenanceFooter.artifactCount}
                voiceSettings={hookPage.provenanceFooter.voiceSettings}
                timestamp={hookPage.provenanceFooter.timestamp}
              />
              <div className="flex flex-wrap gap-2 mt-4">
                {hookPage.exploratoryTopics.map((topic) => (
                  <TopicPill key={topic} label={topic} />
                ))}
              </div>
            </>
          )}
        </section>
      )}

      <GeneratedFooter
        date={hookPage.generatedFooter.date}
        libraryUrl={hookPage.generatedFooter.libraryUrl}
      />
    </>
  )
}
