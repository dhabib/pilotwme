'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Eyebrow } from '@/components/eyebrow'
import { DeskBox } from '@/components/desk-box'
import { DeskInput } from '@/components/desk-input'
import { DeskResponse } from '@/components/desk-response'
import { SuggestionPills } from '@/components/suggestion-pills'
import { useAskStream } from '@/hooks/use-ask-stream'
import { researchDeskPage, researchSuggestions } from '@/lib/data'

function ResearchDeskContent() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const { answer, sources, streaming, error, submit, reset } = useAskStream()

  // Pre-fill question from ?q= query parameter
  useEffect(() => {
    const q = searchParams.get('q')
    if (q && q.trim()) {
      setQuery(q.trim())
      setSubmitted(true)
      submit(q.trim())
    }
  }, [searchParams, submit])

  const handleSubmit = (q: string) => {
    setQuery(q)
    setSubmitted(true)
    submit(q)
  }

  const handleReset = () => {
    setSubmitted(false)
    setQuery('')
    reset()
  }

  return (
    <section className="py-12">
      <div className="max-w-2xl mb-10">
        <Eyebrow text={researchDeskPage.eyebrow} className="mb-4" />
        <h2 className="font-serif text-[36px] md:text-[44px] leading-tight text-ink mb-4">
          {researchDeskPage.title}
        </h2>
        <p className="text-slate text-base leading-relaxed">{researchDeskPage.description}</p>
      </div>

      <div className="max-w-2xl">
        <DeskBox>
          <DeskInput
            value={query}
            onChange={setQuery}
            onSubmit={handleSubmit}
            placeholder={researchDeskPage.placeholder}
          />

          {submitted && (
            <DeskResponse
              answer={answer}
              streaming={streaming}
              sources={sources}
              error={error}
            />
          )}

          {submitted && !streaming && !error && (
            <div className="px-4 pb-4">
              <button
                onClick={handleReset}
                className="text-slate-light text-xs hover:text-slate transition-colors"
              >
                ← Ask another question
              </button>
            </div>
          )}
        </DeskBox>

        {!submitted && (
          <SuggestionPills suggestions={researchSuggestions} onSelect={setQuery} />
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
            <div className="text-slate-light text-center">Loading...</div>
          </div>
        </section>
      }
    >
      <ResearchDeskContent />
    </Suspense>
  )
}
