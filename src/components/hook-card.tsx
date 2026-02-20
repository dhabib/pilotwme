import Link from 'next/link'
import { TopicPill } from './topic-pill'

export interface HookCardData {
  identifier: string
  title: string
  topic_region: string | null
  summary: string
  is_pinned: boolean
  source_artifact_count: number
  generatedAt: string
}

interface HookCardProps {
  hook: HookCardData
  featured?: boolean
}

export function HookCard({ hook, featured = false }: HookCardProps) {
  const date = new Date(hook.generatedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  if (featured) {
    return (
      <Link href={`/ideas/${hook.identifier}`} className="group block col-span-full border border-[#E2E8F0] rounded-xl p-8 hover:border-blue transition-colors duration-200">
        <div className="flex items-center gap-2 mb-4">
          {hook.topic_region && <TopicPill label={hook.topic_region} />}
          {hook.is_pinned && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium">
              Featured
            </span>
          )}
        </div>
        <h2 className="font-serif text-[28px] md:text-[32px] leading-tight text-ink group-hover:text-blue transition-colors mb-3">
          {hook.title}
        </h2>
        <p className="text-slate text-base leading-relaxed mb-4 max-w-2xl">
          {hook.summary}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-slate-light text-xs">
            {date} · {hook.source_artifact_count} source{hook.source_artifact_count !== 1 ? 's' : ''}
          </span>
          <span className="text-blue text-sm font-medium group-hover:underline">
            Read →
          </span>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/ideas/${hook.identifier}`} className="group block border border-[#E2E8F0] rounded-lg p-6 hover:border-blue transition-colors duration-200">
      <div className="flex items-center gap-2 mb-3">
        {hook.topic_region && <TopicPill label={hook.topic_region} />}
      </div>
      <h3 className="font-serif text-[20px] leading-tight text-ink group-hover:text-blue transition-colors mb-2">
        {hook.title}
      </h3>
      <p className="text-slate text-sm leading-relaxed mb-4 line-clamp-3">
        {hook.summary}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-slate-light text-xs">
          {date}
        </span>
        <span className="text-blue text-xs font-medium group-hover:underline">
          Read →
        </span>
      </div>
    </Link>
  )
}
