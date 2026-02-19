'use client'

/**
 * Content sanitizer — DOMPurify wrapper for AI-generated text.
 * Prevents XSS from streamed content.
 */

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

  const purify = await getDOMPurify()
  return purify.sanitize(dirty, {
    ALLOWED_TAGS: [
      'b', 'i', 'em', 'strong', 'a', 'p', 'br',
      'ul', 'ol', 'li', 'code', 'pre', 'blockquote',
      'h1', 'h2', 'h3', 'h4',
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  })
}
