'use client'

import { useState, useEffect, useRef } from 'react'
import { sanitizeHTML } from '@/lib/sanitize'

interface SourceArtifact {
  id: string
  title: string
  source: string | null
}

interface HookArticleProps {
  bodyHtml: string
  sourceArtifacts: SourceArtifact[]
}

export function HookArticle({ bodyHtml, sourceArtifacts }: HookArticleProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [sanitized, setSanitized] = useState('')

  // Build a lookup map for cite attributes → artifact metadata
  const artifactMap = new Map<string, SourceArtifact>(
    sourceArtifacts.map((a) => [a.id, a])
  )

  // Sanitize HTML on the client
  useEffect(() => {
    sanitizeHTML(bodyHtml).then(setSanitized)
  }, [bodyHtml])

  // After render, hydrate data-cite-artifact spans into interactive tooltips
  useEffect(() => {
    const container = containerRef.current
    if (!container || !sanitized) return

    const spans = container.querySelectorAll<HTMLElement>('[data-cite-artifact]')
    const cleanups: Array<() => void> = []

    spans.forEach((span) => {
      const artifactId = span.getAttribute('data-cite-artifact') || ''
      const citeTitle = span.getAttribute('data-cite-title') || ''
      const citeSource = span.getAttribute('data-cite-source') || ''
      const artifact = artifactMap.get(artifactId)

      const displayTitle = citeTitle || artifact?.title || artifactId
      const displaySource = citeSource || artifact?.source || ''

      // Apply cite styling
      span.style.borderBottom = '1px dotted #2563EB'
      span.style.cursor = 'help'
      span.style.position = 'relative'
      span.setAttribute('tabindex', '0')
      span.setAttribute('role', 'button')
      span.setAttribute('aria-label', `Source: ${displayTitle}${displaySource ? '. ' + displaySource : ''}`)

      let tooltip: HTMLElement | null = null

      const showTooltip = () => {
        if (tooltip) return
        tooltip = document.createElement('span')
        tooltip.setAttribute('role', 'tooltip')
        tooltip.style.cssText = [
          'position: absolute',
          'bottom: 100%',
          'left: 50%',
          'transform: translateX(-50%)',
          'margin-bottom: 8px',
          'z-index: 50',
          'width: 256px',
          'background: white',
          'border: 1px solid #E2E8F0',
          'border-radius: 8px',
          'box-shadow: 0 4px 12px rgba(0,0,0,0.1)',
          'padding: 12px',
          'text-align: left',
          'pointer-events: none',
          'font-style: normal',
        ].join(';')
        tooltip.innerHTML = [
          `<span style="display:block;font-weight:600;color:#1e293b;font-size:12px;margin-bottom:2px;line-height:1.4">${escapeHtml(displayTitle)}</span>`,
          displaySource ? `<span style="display:block;color:#94a3b8;font-size:12px;margin-bottom:8px;line-height:1.4">${escapeHtml(displaySource)}</span>` : '',
          '<span style="color:#2563EB;font-size:12px;font-weight:500">Source</span>',
        ].join('')
        span.appendChild(tooltip)
      }

      const hideTooltip = () => {
        tooltip?.remove()
        tooltip = null
      }

      span.addEventListener('mouseenter', showTooltip)
      span.addEventListener('mouseleave', hideTooltip)
      span.addEventListener('focus', showTooltip)
      span.addEventListener('blur', hideTooltip)

      cleanups.push(() => {
        span.removeEventListener('mouseenter', showTooltip)
        span.removeEventListener('mouseleave', hideTooltip)
        span.removeEventListener('focus', showTooltip)
        span.removeEventListener('blur', hideTooltip)
        tooltip?.remove()
      })
    })

    return () => cleanups.forEach((fn) => fn())
  }, [sanitized, artifactMap])

  return (
    <div
      ref={containerRef}
      className="prose prose-slate prose-lg max-w-none leading-relaxed"
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  )
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
