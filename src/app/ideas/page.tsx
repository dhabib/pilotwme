import type { Metadata } from 'next'
import { Eyebrow } from '@/components/eyebrow'
import { IdeasGrid } from '@/components/ideas-grid'
import type { HookCardData } from '@/components/hook-card'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Ideas — Pilot',
  description:
    'Articles and ideas projected from Pilot\'s knowledge manifold. Every piece is grounded in source material, cites its origins, and reflects our editorial voice.',
}

async function fetchHooks(): Promise<HookCardData[]> {
  const PILOT_API_URL = process.env.PILOT_API_URL || 'https://api.pilotwme.com'
  const PILOT_TENANT_ID = process.env.PILOT_TENANT_ID || ''

  if (!PILOT_TENANT_ID) return []

  try {
    const res = await fetch(
      `${PILOT_API_URL}/api/v1/public/hooks?tenantId=${PILOT_TENANT_ID}&limit=50`,
      { next: { revalidate: 60 } }
    )
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export default async function IdeasPage() {
  const hooks = await fetchHooks()

  return (
    <section className="py-12">
      <div className="max-w-2xl mb-10">
        <Eyebrow text="IDEAS" className="mb-4" />
        <h1 className="font-serif text-[36px] md:text-[48px] leading-tight text-ink mb-4">
          From the manifold
        </h1>
        <p className="text-slate text-lg leading-relaxed">
          Projections from Pilot&apos;s knowledge space. Every piece is drawn from source material,
          traces its origins, and speaks in our editorial voice.
        </p>
      </div>

      <IdeasGrid hooks={hooks} />
    </section>
  )
}
