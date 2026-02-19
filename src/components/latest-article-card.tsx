'use client'

import { useRouter } from 'next/navigation'
import { Article } from '@/lib/types'

interface LatestArticleCardProps {
  article: Article
}

const STRIP_EXTENSIONS = /\.(pdf|docx|doc|txt)$/i

export function LatestArticleCard({ article }: LatestArticleCardProps) {
  const router = useRouter()

  const displayTitle = article.title.replace(STRIP_EXTENSIONS, '')

  const date = article.publishedAt ? new Date(article.publishedAt) : null
  const dateString = date
    ? date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : ''

  return (
    <div className="border border-[#E2E8F0] rounded-lg p-6 hover:border-blue transition-colors">
      {/* Header */}
      <div className="mb-4">
        <p className="text-slate-light text-xs font-medium mb-2">
          ARTICLE{dateString ? ` · ${dateString.toUpperCase()}` : ''}
        </p>
        <h3 className="font-serif text-[20px] text-ink leading-tight">
          {displayTitle}
        </h3>
      </div>

      {/* CTA */}
      <button
        onClick={() =>
          router.push(`/research-desk?q=${encodeURIComponent(displayTitle)}`)
        }
        className="text-blue text-sm font-medium hover:underline"
      >
        Ask Pilot about this →
      </button>
    </div>
  )
}
