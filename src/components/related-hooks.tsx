import Link from 'next/link'
import { TopicPill } from './topic-pill'

interface RelatedHook {
  identifier: string
  title: string
  topic_region: string | null
  summary: string
}

interface RelatedHooksProps {
  hooks: RelatedHook[]
}

export function RelatedHooks({ hooks }: RelatedHooksProps) {
  if (hooks.length === 0) return null

  return (
    <aside className="mt-16 pt-10 border-t border-[#E2E8F0]">
      <h2 className="font-sans font-semibold text-ink text-[17px] mb-6">
        More from the manifold
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {hooks.map((hook) => (
          <Link
            key={hook.identifier}
            href={`/ideas/${hook.identifier}`}
            className="group block border border-[#E2E8F0] rounded-lg p-5 hover:border-blue transition-colors duration-200"
          >
            {hook.topic_region && (
              <div className="mb-2">
                <TopicPill label={hook.topic_region} />
              </div>
            )}
            <h3 className="font-serif text-[17px] leading-snug text-ink group-hover:text-blue transition-colors mb-2">
              {hook.title}
            </h3>
            <p className="text-slate text-sm leading-relaxed line-clamp-2">
              {hook.summary}
            </p>
          </Link>
        ))}
      </div>
    </aside>
  )
}
