'use client'

import { useEffect, useState } from 'react'
import { sanitizeHTML } from '@/lib/sanitize'

interface SafeHTMLProps {
  html: string
  className?: string
  tag?: keyof JSX.IntrinsicElements
}

export default function SafeHTML({ html, className = '', tag: Tag = 'div' }: SafeHTMLProps) {
  const [sanitized, setSanitized] = useState('')

  useEffect(() => {
    sanitizeHTML(html).then(setSanitized)
  }, [html])

  return <Tag className={className} dangerouslySetInnerHTML={{ __html: sanitized }} />
}