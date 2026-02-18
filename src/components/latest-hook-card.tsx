'use client'

import { useState } from 'react'
import { Eyebrow } from './eyebrow'
import { useAskStream } from '@/hooks/use-ask-stream'

interface Hook {
  id: string
  identifier: string
  content: string
  generatedAt: string
}

interface LatestHookCardProps {
  hook: Hook
}

export function LatestHookCard({ hook }: LatestHookCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [exploratoryActive, setExploratoryActive] = useState(false)
  const { answer, sources, streaming, error, submit } = useAskStream()

  // Clean markdown (reuse pattern from wisdom-engine-content.tsx)
  let cleanContent = hook.content.replace(/^#\s+.*?\n\n/, '').trim()
  cleanContent = cleanContent
    .replace(/^##\s+/gm, '')
    .replace(/^###\s+/gm, '')
    .trim()

  // Extract title from first # line or use identifier
  const titleMatch = hook.content.match(/^#\s+(.+)$/m)
  const title = titleMatch ? titleMatch[1] : hook.identifier.replace(/-/g, ' ')

  // Preview: first 200 chars
  const preview = cleanContent.slice(0, 200) + (cleanContent.length > 200 ? '...' : '')

  // Format date: "6 days ago" or formatted date
  const date = new Date(hook.generatedAt)
  const daysAgo = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24))
  const dateString = daysAgo === 0 ? 'Today' :
                     daysAgo === 1 ? 'Yesterday' :
                     daysAgo < 7 ? `${daysAgo} days ago` :
                     date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })

  // Generate contextual exploratory question based on title
  const exploratoryQuestion = `Tell me more about ${title.toLowerCase()}`

  return (
    <div className="border border-[#E2E8F0] rounded-lg p-6 hover:border-blue transition-colors">
      {/* Header */}
      <div className="mb-4">
        <p className="text-slate-light text-xs font-medium mb-2">
          HOOK CONTENT · {dateString.toUpperCase()}
        </p>
        <h3 className="font-serif text-[20px] text-ink leading-tight">
          {title}
        </h3>
      </div>

      {/* Content preview (when collapsed) */}
      {!expanded && (
        <>
          <p className="text-slate text-sm leading-relaxed mb-4">
            {preview}
          </p>
          <button
            onClick={() => setExpanded(true)}
            className="text-blue text-sm font-medium hover:underline"
          >
            Read more →
          </button>
        </>
      )}

      {/* Full content (when expanded) */}
      {expanded && (
        <>
          <div className="text-slate text-sm leading-relaxed mb-4">
            {cleanContent.split('\n\n').map((para, i) => (
              <p key={i} className="mb-3 whitespace-pre-wrap">
                {para.trim()}
              </p>
            ))}
          </div>

          {/* Exploratory button */}
          {!exploratoryActive && (
            <button
              onClick={() => {
                setExploratoryActive(true)
                submit(exploratoryQuestion)
              }}
              className="w-full px-4 py-2.5 bg-blue text-white text-sm font-medium rounded-lg hover:bg-blue-dark transition-colors"
            >
              Get more from the Wisdom Engine →
            </button>
          )}

          {/* Exploratory section (streaming answer) */}
          {exploratoryActive && (
            <div className="mt-6 pt-6 border-t border-[#E2E8F0]">
              <Eyebrow text="EXPLORATORY · STREAMING FROM MANIFOLD" color="accent" className="mb-3" />

              <div className="text-slate text-sm leading-relaxed mb-4">
                {answer}
                {streaming && (
                  <span className="inline-block w-[2px] h-[1em] bg-blue ml-0.5 animate-pulse align-middle">
                    ▍
                  </span>
                )}
              </div>

              {error && (
                <div className="text-red-500 text-xs">{error}</div>
              )}

              {!streaming && sources.length > 0 && (
                <div className="pt-3 border-t border-[#E2E8F0]">
                  <p className="text-slate-light text-xs font-medium mb-2">Sources</p>
                  <ul className="flex flex-col gap-1.5">
                    {sources.map((src) => (
                      <li key={src.artifactId} className="flex items-center gap-2">
                        <span className="text-blue text-xs">⬦</span>
                        <span className="text-slate text-xs">{src.fileName}</span>
                        <span className="text-blue text-[10px] font-medium">Available in Library</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
