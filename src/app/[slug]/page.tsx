import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import SafeHTML from '@/components/safe-html'

export const revalidate = 3600

interface BoilerplatePage {
  slug: string
  title: string
  url_path: string
  body_html: string
  meta_description: string | null
  nav_order: number
  updated_at: string
}

async function fetchPage(slug: string): Promise<BoilerplatePage | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.pilotwme.com'
    const res = await fetch(`${baseUrl}/api/boilerplate/${slug}`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export async function generateStaticParams() {
  try {
    const PILOT_API_URL = process.env.PILOT_API_URL || 'https://api.pilotwme.com'
    const PILOT_TENANT_ID = process.env.PILOT_TENANT_ID || ''
    const res = await fetch(
      `${PILOT_API_URL}/api/v1/public/boilerplate?tenantId=${PILOT_TENANT_ID}`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return []
    const pages: BoilerplatePage[] = await res.json()
    return pages.map((p) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const page = await fetchPage(params.slug)
  if (!page) return {}
  return {
    title: `${page.title} — Pilot`,
    description: page.meta_description || undefined,
  }
}

export default async function BoilerplatePage({ params }: { params: { slug: string } }) {
  const page = await fetchPage(params.slug)
  if (!page) notFound()

  return (
    <article className="py-12">
      <div className="max-w-2xl">
        <h1 className="font-serif text-[36px] md:text-[44px] leading-tight text-ink mb-8">
          {page.title}
        </h1>
        <SafeHTML
          html={page.body_html}
          className="prose prose-slate max-w-none text-slate leading-relaxed"
        />
        <p className="text-slate-light text-xs mt-12">
          Last updated: {new Date(page.updated_at).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
      </div>
    </article>
  )
}
