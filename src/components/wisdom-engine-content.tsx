'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Eyebrow } from './eyebrow'
import { GeneratedFooter } from './generated-footer'
import { useEngagementThreshold } from '@/hooks/use-engagement-threshold'
import { MCPClient, MCPStreamChunk } from '@/lib/mcp-client'
import { getOrCreateSessionId } from '@/lib/session'
import GenUIRenderer, { GenUIItem } from './gen-ui-renderer'

interface WisdomEngineContentProps {
  title: string
  hookContent: string
  generatedAt: string
}

interface ExploratoryResult {
  query: string
  items: GenUIItem[]
  streaming: boolean
  error: string | null
}

function buildQuery(title: string, content: string): string {
  const sentences = content
    .replace(/\n+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
  const firstSentence = sentences[0] || ''
  const lastSentence = sentences.length > 1 ? sentences[sentences.length - 1] : ''
  return lastSentence
    ? `${title}. ${firstSentence}... ${lastSentence}`
    : `${title}. ${firstSentence}`
}

export function WisdomEngineContent({ title, hookContent, generatedAt }: WisdomEngineContentProps) {
  const router = useRouter()
  const [results, setResults] = useState<ExploratoryResult[]>([])
  const [mcpError, setMcpError] = useState<string | null>(null)
  const mcpRef = useRef<MCPClient | null>(null)
  const sessionIdRef = useRef<string>('')
  const activatingRef = useRef(false)

  // Engagement threshold: scroll 55% OR 30s dwell
  const { containerRef, triggered } = useEngagementThreshold({
    scrollDepth: 0.55,
    dwellMs: 30000,
  })

  // Clean hook content
  let cleanContent = hookContent.replace(/^#\s+.*?\n\n/, '').trim()
  cleanContent = cleanContent
    .replace(/^##\s+/gm, '')
    .replace(/^###\s+/gm, '')
    .trim()

  const formattedDate = new Date(generatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const appendChunk = useCallback((resultIndex: number, chunk: MCPStreamChunk) => {
    setResults((prev) => {
      const next = [...prev]
      const result = { ...next[resultIndex] }

      if (chunk.type === 'text') {
        const content: string =
          typeof chunk.data === 'string' ? chunk.data : chunk.data?.content ?? ''
        const items = [...result.items]
        const last = items[items.length - 1]
        if (last?.type === 'text') {
          items[items.length - 1] = {
            type: 'text',
            data: { content: (last.data.content || '') + content },
          }
        } else {
          items.push({ type: 'text', data: { content } })
        }
        result.items = items
      } else if (chunk.type === 'component') {
        result.items = [...result.items, { type: 'component', data: chunk.data }]
      } else if (chunk.type === 'provenance') {
        result.items = [...result.items, { type: 'provenance', data: chunk.data }]
      } else if (chunk.type === 'done') {
        result.streaming = false
      } else if (chunk.type === 'error') {
        result.streaming = false
        result.error = chunk.data?.message || 'Something went wrong'
      }

      next[resultIndex] = result
      return next
    })
  }, [])

  const runQuery = useCallback(
    async (query: string) => {
      if (!mcpRef.current?.isConnected()) return

      const resultIndex = results.length
      setResults((prev) => [
        ...prev,
        { query, items: [], streaming: true, error: null },
      ])

      const sessionId = sessionIdRef.current

      try {
        await mcpRef.current.callToolStreaming(
          'generate_projection',
          { query, sessionId },
          (chunk) => appendChunk(resultIndex, chunk)
        )
      } catch (err: any) {
        setResults((prev) => {
          const next = [...prev]
          if (next[resultIndex]) {
            next[resultIndex] = { ...next[resultIndex], streaming: false, error: err.message }
          }
          return next
        })
      }
    },
    [results.length, appendChunk]
  )

  const activate = useCallback(async () => {
    if (activatingRef.current || results.length > 0) return
    activatingRef.current = true
    setMcpError(null)

    try {
      const tokenRes = await fetch('/api/mcp-token')
      if (!tokenRes.ok) throw new Error('Could not obtain MCP token')
      const { token } = await tokenRes.json()

      sessionIdRef.current = getOrCreateSessionId()
      const client = new MCPClient(token)
      await client.connect()
      mcpRef.current = client

      // Fire-and-forget interaction log
      client
        .callTool('log_interaction', {
          sessionId: sessionIdRef.current,
          interactionType: 'wisdom_engine_activate',
          content: title,
        })
        .catch(() => {})

      const query = buildQuery(title, cleanContent)
      const resultIndex = 0
      setResults([{ query, items: [], streaming: true, error: null }])

      await client.callToolStreaming(
        'generate_projection',
        { query, sessionId: sessionIdRef.current },
        (chunk) => appendChunk(resultIndex, chunk)
      )
    } catch (err: any) {
      setMcpError(err.message || 'Failed to connect to Pilot')
      activatingRef.current = false
    }
  }, [results.length, title, cleanContent, appendChunk])

  // Trigger on scroll/dwell engagement
  useEffect(() => {
    if (triggered && results.length === 0) {
      activate()
    }
  }, [triggered, activate, results.length])

  // Disconnect on unmount
  useEffect(() => {
    return () => {
      mcpRef.current?.disconnect()
    }
  }, [])

  const handleTopicClick = useCallback(
    (query: string) => {
      runQuery(query)
    },
    [runQuery]
  )

  const handleExploreClick = useCallback(
    (question: string) => {
      router.push(`/research-desk?q=${encodeURIComponent(question)}`)
    },
    [router]
  )

  const exploratoryActive = results.length > 0 || activatingRef.current

  return (
    <>
      {/* Main hook content — containerRef tracks scroll engagement */}
      <article ref={containerRef} className="border-b border-[#E2E8F0] py-12 max-w-2xl">
        <Eyebrow text="HOOK CONTENT · CACHED · STABLE URL" className="mb-4" />
        <h1 className="font-serif text-[38px] md:text-[48px] leading-tight text-ink mb-8">
          {title}
        </h1>

        {cleanContent.split('\n\n').map((para, i) => (
          <p key={i} className="text-slate text-base leading-relaxed mb-5 whitespace-pre-wrap">
            {para.trim()}
          </p>
        ))}

        {/* Explicit CTA button */}
        {!exploratoryActive && !mcpError && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={activate}
              className="px-6 py-3 bg-blue text-white font-medium rounded-lg hover:bg-blue-dark transition-colors"
            >
              Get more from the Wisdom Engine →
            </button>
          </div>
        )}

        {mcpError && (
          <div className="mt-6 text-sm text-red-500">{mcpError}</div>
        )}
      </article>

      {/* Exploratory results — each topic click appends a new one */}
      {results.map((result, i) => (
        <section key={`result-${i}`} className="border-b border-[#E2E8F0] py-12 max-w-2xl">
          <Eyebrow text="EXPLORATORY · STREAMING FROM MANIFOLD" color="accent" className="mb-4" />

          {result.error ? (
            <div className="text-sm text-red-500">{result.error}</div>
          ) : (
            <GenUIRenderer
              items={result.items}
              streaming={result.streaming}
              onTopicClick={handleTopicClick}
              onExploreClick={handleExploreClick}
            />
          )}

          {result.streaming && result.items.length === 0 && (
            <div className="flex items-center gap-2 text-slate-light text-sm">
              <span className="inline-block w-2 h-2 rounded-full bg-blue animate-pulse" />
              Querying the manifold…
            </div>
          )}
        </section>
      ))}

      <GeneratedFooter
        date={formattedDate}
        libraryUrl="https://console.pilotwme.com/dashboard/artifacts"
      />
    </>
  )
}
