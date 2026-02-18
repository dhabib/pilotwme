'use client'

import { useState, useRef, useEffect } from 'react'
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
  const exploratoryRef = useRef<HTMLElement>(null)

  // Remove markdown title if present, split content into main (60%) and exploratory (40%)
  const cleanContent = hookContent.replace(/^#\s+.*?\n\n/, '').trim()
  const splitPoint = Math.floor(cleanContent.length * 0.6)
  const mainContent = cleanContent.slice(0, splitPoint).trim()
  const exploratoryContent = cleanContent.slice(splitPoint).trim()

  // Use IntersectionObserver on the exploratory section itself
  // When it enters viewport, activate streaming
  useEffect(() => {
    const section = exploratoryRef.current
    if (!section) {
      console.log('No exploratory ref found')
      return
    }

    console.log('Setting up IntersectionObserver for exploratory section')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log('Intersection event:', {
            isIntersecting: entry.isIntersecting,
            intersectionRatio: entry.intersectionRatio,
            boundingClientRect: entry.boundingClientRect,
            exploratoryActive,
          })

          if (entry.isIntersecting && !exploratoryActive) {
            console.log('✅ Activating exploratory streaming NOW')
            setExploratoryActive(true)
          }
        })
      },
      {
        // Trigger when top of section is 80% down the viewport
        threshold: 0,
        rootMargin: '0px 0px -20% 0px',
      }
    )

    observer.observe(section)

    return () => {
      console.log('Cleaning up IntersectionObserver')
      observer.disconnect()
    }
  }, [exploratoryActive])

  const formattedDate = new Date(generatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      {/* Hook zone */}
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

        {/* Scroll hint at end of hook content */}
        {!exploratoryActive && (
          <div className="flex flex-col items-center gap-3 py-8">
            <p className="text-slate-light text-sm animate-pulse">
              ↓ Keep scrolling to see exploratory content ↓
            </p>
            <div className="w-[200px] h-[3px] bg-[#E2E8F0] rounded-full">
              <div className="h-full w-1/3 bg-blue rounded-full animate-pulse" />
            </div>
          </div>
        )}
      </article>

      {/* Exploratory zone - always in DOM to prevent layout shift */}
      <section
        ref={exploratoryRef}
        className="border-b border-[#E2E8F0] py-12 max-w-2xl"
        style={{ minHeight: '200px' }}
      >
        {exploratoryActive ? (
          <>
            <Eyebrow text="EXPLORATORY · STREAMING FROM MANIFOLD" color="accent" className="mb-4" />
            {exploratoryContent && (
              <StreamingParagraph text={exploratoryContent} active={true} speed={3} />
            )}
          </>
        ) : (
          <div className="text-slate-light text-sm text-center py-12">
            {/* Placeholder to maintain layout */}
          </div>
        )}
      </section>

      <GeneratedFooter
        date={formattedDate}
        libraryUrl="https://console.pilotwme.com/dashboard/artifacts"
      />
    </>
  )
}
