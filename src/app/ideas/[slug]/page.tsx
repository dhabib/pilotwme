import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Eyebrow } from '@/components/eyebrow'
import { TopicPill } from '@/components/topic-pill'
import { HookArticle } from '@/components/hook-article'
import { RelatedHooks } from '@/components/related-hooks'

export const revalidate = 3600

interface SourceArtifact {
  id: string
  title: string
  source: string | null
}

interface HookDetail {
  id: string
  identifier: string
  title: string
  topic_region: string | null
  summary: string
  is_pinned: boolean
  body_html: string
  source_artifacts: SourceArtifact[]
  voice_snapshot: { brevity: number; formality: number; confidence: number } | null
  generatedAt: string
}

interface RelatedHook {
  identifier: string
  title: string
  topic_region: string | null
  summary: string
}

const PILOT_API_URL = process.env.PILOT_API_URL || 'https://api.pilotwme.com'
const PILOT_TENANT_ID = process.env.PILOT_TENANT_ID || ''

async function fetchHook(slug: string): Promise<HookDetail | null> {
  if (!PILOT_TENANT_ID) return null
  try {
    const res = await fetch(
      `${PILOT_API_URL}/api/v1/public/hooks/${slug}?tenantId=${PILOT_TENANT_ID}`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

async function fetchRelated(slug: string): Promise<RelatedHook[]> {
  if (!PILOT_TENANT_ID) return []
  try {
    const res = await fetch(
      `${PILOT_API_URL}/api/v1/public/hooks/${slug}/related?tenantId=${PILOT_TENANT_ID}&limit=3`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export async function generateStaticParams() {
  if (!PILOT_TENANT_ID) return []
  try {
    const res = await fetch(
      `${PILOT_API_URL}/api/v1/public/hooks?tenantId=${PILOT_TENANT_ID}&limit=50`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return []
    const hooks: Array<{ identifier: string }> = await res.json()
    return hooks.map((h) => ({ slug: h.identifier }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const hook = await fetchHook(params.slug)
  if (!hook) return {}

  const canonical = `https://www.pilotwme.com/ideas/${hook.identifier}`

  return {
    title: `${hook.title} — Pilot`,
    description: hook.summary ?? '',
    openGraph: {
      title: hook.title,
      description: hook.summary ?? '',
      type: 'article',
      url: canonical,
      publishedTime: hook.generatedAt,
    },
    alternates: { canonical },
  }
}

export default async function IdeaPage({ params }: { params: { slug: string } }) {
  const [hook, related] = await Promise.all([
    fetchHook(params.slug),
    fetchRelated(params.slug),
  ])

  if (!hook) notFound()

  // Normalize fields that may be absent on older API responses
  const sourceArtifacts = hook.source_artifacts ?? []
  const bodyHtml = hook.body_html ?? ''
  const summary = hook.summary ?? ''

  const date = new Date(hook.generatedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: hook.title,
    description: hook.summary,
    datePublished: hook.generatedAt,
    publisher: {
      '@type': 'Organization',
      name: 'Pilot',
      url: 'https://www.pilotwme.com',
    },
  }

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="py-12 max-w-2xl">
        {/* Back link */}
        <Link href="/ideas" className="text-blue text-sm hover:underline mb-8 block">
          ← All ideas
        </Link>

        {/* Header */}
        <header className="mb-10">
          {hook.topic_region && (
            <div className="mb-4">
              <TopicPill label={hook.topic_region} />
            </div>
          )}
          <h1 className="font-serif text-[32px] md:text-[42px] leading-tight text-ink mb-4">
            {hook.title}
          </h1>
          <p className="text-slate text-lg leading-relaxed mb-6">{summary}</p>
          <div className="flex items-center gap-4 text-slate-light text-xs border-t border-[#E2E8F0] pt-4">
            <time dateTime={hook.generatedAt}>{date}</time>
            {sourceArtifacts.length > 0 && (
              <span>
                {sourceArtifacts.length} source{sourceArtifacts.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </header>

        {/* Article body */}
        <HookArticle bodyHtml={bodyHtml} sourceArtifacts={sourceArtifacts} />

        {/* Provenance footer */}
        {sourceArtifacts.length > 0 && (
          <aside className="mt-12 pt-8 border-t border-[#E2E8F0]">
            <Eyebrow text="SOURCES" className="mb-4" />
            <ol className="space-y-2">
              {sourceArtifacts.map((artifact, i) => (
                <li key={artifact.id} className="text-sm text-slate leading-snug">
                  <span className="text-slate-light mr-2">{i + 1}.</span>
                  <strong>{artifact.title}</strong>
                  {artifact.source && <span className="text-slate-light ml-2">— {artifact.source}</span>}
                </li>
              ))}
            </ol>
          </aside>
        )}

        {/* Ask CTA */}
        <div className="mt-12 bg-blue-light rounded-xl p-6">
          <p className="text-blue font-semibold text-base mb-2">Want to go deeper?</p>
          <p className="text-slate text-sm mb-4">
            Ask Pilot a follow-up question and it will project an answer from the same knowledge base.
          </p>
          <Link
            href={`/ask?q=${encodeURIComponent('Tell me more about ' + hook.title)}`}
            className="inline-flex items-center px-4 py-2 bg-blue text-white rounded-lg text-sm font-medium hover:bg-blue-dark transition-colors"
          >
            Ask Pilot →
          </Link>
        </div>

        {/* Related hooks */}
        <RelatedHooks hooks={related} />
      </article>
    </>
  )
}
