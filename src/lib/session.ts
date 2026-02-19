/**
 * Session utility for pilotwme
 *
 * Provides a persistent session ID stored in sessionStorage so that
 * multi-turn MCP conversations survive page navigations within the same tab.
 */

function generateSessionId(): string {
  return `sess_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return generateSessionId()

  const stored = sessionStorage.getItem('pilot_session_id')
  if (stored) return stored

  const id = generateSessionId()
  sessionStorage.setItem('pilot_session_id', id)
  return id
}
