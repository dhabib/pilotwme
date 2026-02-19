'use client'

import { useEffect, useState } from 'react'
import { sanitizeHTML } from '@/lib/sanitize'

export interface TextBlockProps {
  content: string
  tone?: 'academic' | 'professional' | 'conversational' | 'casual'
  streaming?: boolean
}

const toneStyles: Record<string, string> = {
  academic: 'font-serif leading-relaxed',
  professional: 'leading-relaxed',
  conversational: 'leading-loose',
  casual: 'leading-loose text-[0.95rem]',
}

export default function TextBlock({ content, tone = 'professional', streaming = false }: TextBlockProps) {
  const [sanitized, setSanitized] = useState('')

  useEffect(() => {
    sanitizeHTML(content).then(setSanitized)
  }, [content])

  return (
    <div
      className={`prose prose-sm max-w-none text-foreground ${toneStyles[tone] || ''} ${
        streaming ? 'after:content-["▍"] after:inline-block after:w-[2px] after:animate-pulse after:text-blue' : ''
      }`}
      dangerouslySetInnerHTML={{ __html: sanitized }}
      role="article"
    />
  )
}
