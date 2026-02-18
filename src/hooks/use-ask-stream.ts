'use client'

import { useState, useCallback } from 'react'

export interface AskSource {
  fileName: string
  artifactId: string
  score: number
}

export interface AskStreamResult {
  answer: string
  sources: AskSource[]
  streaming: boolean
  error: string | null
  submit: (question: string) => void
  reset: () => void
}

/**
 * Hook for streaming research answers from the PilotCMS public ask endpoint.
 * Calls /api/ask (Next.js route) which proxies to api.pilotwme.com/api/v1/public/ask.
 */
export function useAskStream(): AskStreamResult {
  const [answer, setAnswer] = useState('')
  const [sources, setSources] = useState<AskSource[]>([])
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const reset = useCallback(() => {
    setAnswer('')
    setSources([])
    setStreaming(false)
    setError(null)
  }, [])

  const submit = useCallback(async (question: string) => {
    setAnswer('')
    setSources([])
    setError(null)
    setStreaming(true)

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || `Request failed (${res.status})`)
      }

      const reader = res.body?.getReader()
      if (!reader) throw new Error('No response body')

      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const raw = line.slice(6).trim()
          if (!raw) continue

          try {
            const event = JSON.parse(raw)
            if (event.type === 'sources') {
              setSources(event.sources ?? [])
            } else if (event.type === 'token') {
              setAnswer((prev) => prev + (event.content ?? ''))
            } else if (event.type === 'done') {
              setStreaming(false)
            } else if (event.type === 'error') {
              throw new Error(event.error || 'Stream error')
            }
          } catch {
            // ignore malformed SSE lines
          }
        }
      }
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong')
      setStreaming(false)
    }
  }, [])

  return { answer, sources, streaming, error, submit, reset }
}
