'use client'

import { useState, useId, ReactNode } from 'react'
import { CitationArtifact } from '@/lib/types'

const CONSOLE_URL = 'https://console.pilotwme.com'

interface CiteProps {
  artifact: CitationArtifact
  children: ReactNode
}

export function Cite({ artifact, children }: CiteProps) {
  const [visible, setVisible] = useState(false)
  const descId = useId()

  const libraryHref = artifact.artifactId
    ? `${CONSOLE_URL}/dashboard/artifacts?select=${artifact.artifactId}`
    : null

  return (
    <span className="relative inline">
      <span
        className="border-b border-dotted border-blue cursor-help"
        aria-describedby={descId}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        tabIndex={0}
        role="button"
      >
        {children}
      </span>

      {/* Visually hidden description for screen readers */}
      <span id={descId} className="sr-only">
        Source: {artifact.title}. {artifact.source}.
      </span>

      {/* Tooltip */}
      {visible && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64 bg-white border border-[#E2E8F0] rounded-lg shadow-lg p-3 text-left"
        >
          <span className="block font-semibold text-ink text-xs mb-0.5 leading-snug">
            {artifact.title}
          </span>
          <span className="block text-slate-light text-xs mb-2 leading-snug">
            {artifact.source}
          </span>
          {libraryHref ? (
            <a
              href={libraryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue text-xs font-medium hover:underline"
            >
              View in Library →
            </a>
          ) : (
            <span className="text-blue text-xs font-medium">View in Library →</span>
          )}
          {/* Arrow */}
          <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#E2E8F0]" />
        </span>
      )}
    </span>
  )
}
