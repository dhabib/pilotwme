'use client'

import { useState } from 'react'
import { HookCard, HookCardData } from './hook-card'
import { TopicFilterBar } from './topic-filter-bar'

interface IdeasGridProps {
  hooks: HookCardData[]
}

export function IdeasGrid({ hooks }: IdeasGridProps) {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)

  // Collect unique non-null topics
  const topics = Array.from(
    new Set(hooks.map((h) => h.topic_region).filter((t): t is string => Boolean(t)))
  )

  const filtered = selectedTopic
    ? hooks.filter((h) => h.topic_region === selectedTopic)
    : hooks

  const [featured, ...rest] = filtered

  if (hooks.length === 0) {
    return (
      <p className="text-slate leading-relaxed">
        The manifold is warming up. Check back soon, or{' '}
        <a href="/ask" className="text-blue hover:underline">
          ask Pilot anything on the Ask page
        </a>
        .
      </p>
    )
  }

  return (
    <>
      <TopicFilterBar topics={topics} selected={selectedTopic} onSelect={setSelectedTopic} />

      {filtered.length === 0 ? (
        <p className="text-slate text-sm">No ideas in this topic region yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featured && <HookCard hook={featured} featured />}
          {rest.map((hook) => (
            <HookCard key={hook.identifier} hook={hook} />
          ))}
        </div>
      )}
    </>
  )
}
