import { LatestArticleCard } from './latest-article-card'
import { Article } from '@/lib/types'

export async function LatestArticlesSection() {
  const PILOT_API_URL = process.env.PILOT_API_URL || 'http://localhost:3001'
  const PILOT_TENANT_ID = process.env.PILOT_TENANT_ID || ''

  let articles: Article[] = []

  try {
    const res = await fetch(
      `${PILOT_API_URL}/api/v1/public/articles?tenantId=${PILOT_TENANT_ID}&limit=1`,
      { next: { revalidate: 3600 } }
    )

    if (res.ok) {
      articles = await res.json()
    } else {
      console.error('[LatestArticlesSection] Failed to fetch articles:', res.status)
    }
  } catch (err) {
    console.error('[LatestArticlesSection] Fetch error:', err)
  }

  if (articles.length === 0) {
    return null
  }

  return <LatestArticleCard article={articles[0]} />
}
