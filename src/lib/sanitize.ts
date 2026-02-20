'use client'

/**
 * Content sanitizer — DOMPurify wrapper for AI-generated text.
 * Prevents XSS from streamed content.
 * Converts markdown to HTML before sanitizing.
 */

import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({ html: false, breaks: false, linkify: false })

let DOMPurify: any = null

async function getDOMPurify() {
  if (!DOMPurify) {
    const mod = await import('dompurify')
    DOMPurify = mod.default || mod
  }
  return DOMPurify
}

export async function sanitizeHTML(dirty: string): Promise<string> {
  if (typeof window === 'undefined') {
    return dirty.replace(/<[^>]*>/g, '')
  }

  // If content doesn't start with an HTML tag, treat as markdown
  const source = dirty.trimStart().startsWith('<') ? dirty : md.render(dirty)

  const purify = await getDOMPurify()
  return purify.sanitize(source, {
    ALLOWED_TAGS: [
      'b', 'i', 'em', 'strong', 'a', 'p', 'br',
      'ul', 'ol', 'li', 'code', 'pre', 'blockquote',
      'h1', 'h2', 'h3', 'h4',
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  })
}
