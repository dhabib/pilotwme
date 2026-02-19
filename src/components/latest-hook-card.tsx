'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()
  const [expanded, setExpanded] = useState(false)

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

          {/* Ask Pilot CTA — links to Research Desk with context */}
          <button
            onClick={() =>
              router.push(`/research-desk?q=${encodeURIComponent(exploratoryQuestion)}`)
            }
            className="w-full px-4 py-2.5 bg-blue text-white text-sm font-medium rounded-lg hover:bg-blue-dark transition-colors"
          >
            Ask Pilot about this →
          </button>
        </>
      )}
    </div>
  )
}
