'use client'

import { Suspense, useState, useEffect, useRef, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { Eyebrow } from '@/components/eyebrow'
import { DeskBox } from '@/components/desk-box'
import { DeskInput } from '@/components/desk-input'
import { SuggestionPills } from '@/components/suggestion-pills'
import GenUIRenderer, { GenUIItem } from '@/components/gen-ui-renderer'
import { MCPClient, MCPStreamChunk } from '@/lib/mcp-client'
import { getOrCreateSessionId } from '@/lib/session'
import { researchDeskPage, researchSuggestions } from '@/lib/data'

interface UserMessage {
  role: 'user'
  content: string
}

interface AssistantMessage {
  role: 'assistant'
  items: GenUIItem[]
  streaming: boolean
  error: string | null
}

type Message = UserMessage | AssistantMessage

function ResearchDeskContent() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [mcpReady, setMcpReady] = useState(false)
  const [connectError, setConnectError] = useState<string | null>(null)
  const mcpRef = useRef<MCPClient | null>(null)
  const sessionIdRef = useRef<string>('')
  const initRef = useRef(false)
  // Track message count so we can compute indices before async state updates
  const msgCountRef = useRef(0)

  // Connect MCP on mount
  useEffect(() => {
    if (initRef.current) return
    initRef.current = true

    async function init() {
      try {
        const tokenRes = await fetch('/api/mcp-token')
        if (!tokenRes.ok) throw new Error('Could not obtain MCP token')
        const { token } = await tokenRes.json()

        sessionIdRef.current = getOrCreateSessionId()
        const client = new MCPClient(token)
        await client.connect()
        mcpRef.current = client
        setMcpReady(true)
      } catch (err: any) {
        setConnectError(err.message || 'Failed to connect to Pilot')
      }
    }

    init()

    return () => {
      mcpRef.current?.disconnect()
    }
  }, [])

  const appendChunk = useCallback((msgIndex: number, chunk: MCPStreamChunk) => {
    setMessages((prev) => {
      const next = [...prev]
      const msg = next[msgIndex] as AssistantMessage
      if (!msg || msg.role !== 'assistant') return prev

      if (chunk.type === 'text') {
        const content: string =
          typeof chunk.data === 'string' ? chunk.data : (chunk.data?.content ?? '')
        const items = [...msg.items]
        const last = items[items.length - 1]
        if (last?.type === 'text') {
          items[items.length - 1] = {
            type: 'text',
            data: { content: (last.data.content || '') + content },
          }
        } else {
          items.push({ type: 'text', data: { content } })
        }
        next[msgIndex] = { ...msg, items }
      } else if (chunk.type === 'component') {
        next[msgIndex] = {
          ...msg,
          items: [...msg.items, { type: 'component', data: chunk.data }],
        }
      } else if (chunk.type === 'provenance') {
        next[msgIndex] = {
          ...msg,
          items: [...msg.items, { type: 'provenance', data: chunk.data }],
        }
      } else if (chunk.type === 'done') {
        next[msgIndex] = { ...msg, streaming: false }
      } else if (chunk.type === 'error') {
        next[msgIndex] = {
          ...msg,
          streaming: false,
          error: chunk.data?.message || 'Something went wrong',
        }
      }

      return next
    })
  }, [])

  const sendMessage = useCallback(
    async (q: string) => {
      if (!q.trim() || !mcpRef.current?.isConnected()) return
      setQuery('')

      const userMsg: UserMessage = { role: 'user', content: q.trim() }
      const assistantMsg: AssistantMessage = {
        role: 'assistant',
        items: [],
        streaming: true,
        error: null,
      }

      // Compute assistant message index before updating state
      const assistantIndex = msgCountRef.current + 1
      msgCountRef.current += 2

      setMessages((prev) => [...prev, userMsg, assistantMsg])

      try {
        await mcpRef.current!.callToolStreaming(
          'generate_projection',
          { query: q.trim(), sessionId: sessionIdRef.current },
          (chunk) => appendChunk(assistantIndex, chunk)
        )
      } catch (err: any) {
        setMessages((prev) => {
          const next = [...prev]
          const msg = next[assistantIndex] as AssistantMessage
          if (msg) next[assistantIndex] = { ...msg, streaming: false, error: err.message }
          return next
        })
      }
    },
    [appendChunk]
  )

  // Pre-fill from ?q= param once MCP is ready
  const prefillSent = useRef(false)
  useEffect(() => {
    if (!mcpReady || prefillSent.current) return
    const q = searchParams.get('q')
    if (q?.trim()) {
      prefillSent.current = true
      sendMessage(q.trim())
    }
  }, [mcpReady, searchParams, sendMessage])

  const hasMessages = messages.length > 0
  const isStreaming = messages.some((m) => m.role === 'assistant' && (m as AssistantMessage).streaming)

  return (
    <section className="py-12">
      <div className="max-w-2xl mb-10">
        <Eyebrow text={researchDeskPage.eyebrow} className="mb-4" />
        <h2 className="font-serif text-[36px] md:text-[44px] leading-tight text-ink mb-4">
          {researchDeskPage.title}
        </h2>
        <p className="text-slate text-base leading-relaxed">{researchDeskPage.description}</p>
      </div>

      <div className="max-w-2xl space-y-4">
        {/* Message history */}
        {hasMessages && (
          <div className="space-y-6" role="log" aria-live="polite">
            {messages.map((msg, i) => {
              if (msg.role === 'user') {
                return (
                  <div key={i} className="flex justify-end">
                    <div className="max-w-[80%] bg-blue text-white rounded-xl px-4 py-3 text-sm leading-relaxed">
                      {msg.content}
                    </div>
                  </div>
                )
              }

              const assistantMsg = msg as AssistantMessage
              return (
                <div key={i} className="flex justify-start">
                  <div className="flex-1">
                    <DeskBox>
                      <div className="p-4">
                        {assistantMsg.error ? (
                          <p className="text-red-500 text-sm">{assistantMsg.error}</p>
                        ) : assistantMsg.streaming && assistantMsg.items.length === 0 ? (
                          <div className="flex items-center gap-2 text-slate-light text-sm py-2">
                            <span className="inline-block w-2 h-2 rounded-full bg-blue animate-pulse" />
                            Querying the manifold…
                          </div>
                        ) : (
                          <GenUIRenderer
                            items={assistantMsg.items}
                            streaming={assistantMsg.streaming}
                            onTopicClick={sendMessage}
                            onExploreClick={sendMessage}
                          />
                        )}
                      </div>
                    </DeskBox>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Input area */}
        <DeskBox>
          {connectError ? (
            <div className="p-4 text-sm text-red-500">{connectError}</div>
          ) : (
            <DeskInput
              value={query}
              onChange={setQuery}
              onSubmit={sendMessage}
              placeholder={
                !mcpReady
                  ? 'Connecting to Pilot…'
                  : isStreaming
                    ? 'Pilot is responding…'
                    : researchDeskPage.placeholder
              }
            />
          )}
        </DeskBox>

        {/* Suggestion pills — visible until first message sent */}
        {!hasMessages && (
          <SuggestionPills suggestions={researchSuggestions} onSelect={sendMessage} />
        )}
      </div>
    </section>
  )
}

export default function ResearchDeskPage() {
  return (
    <Suspense
      fallback={
        <section className="py-12">
          <div className="max-w-2xl">
            <div className="text-slate-light text-center">Loading…</div>
          </div>
        </section>
      }
    >
      <ResearchDeskContent />
    </Suspense>
  )
}
