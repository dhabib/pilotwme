import { Eyebrow } from './eyebrow'
import { LatestHookCard } from './latest-hook-card'

interface Hook {
  id: string
  identifier: string
  content: string
  generatedAt: string
}

export async function LatestHooksSection() {
  const PILOT_API_URL = process.env.PILOT_API_URL || 'http://localhost:3001'
  const PILOT_TENANT_ID = process.env.PILOT_TENANT_ID || ''

  let hooks: Hook[] = []

  try {
    const res = await fetch(
      `${PILOT_API_URL}/api/v1/public/hooks?tenantId=${PILOT_TENANT_ID}&limit=3`,
      { next: { revalidate: 3600 } }
    )

    if (res.ok) {
      hooks = await res.json()
    } else {
      console.error('[LatestHooksSection] Failed to fetch hooks:', res.status)
    }
  } catch (err) {
    console.error('[LatestHooksSection] Fetch error:', err)
  }

  if (hooks.length === 0) {
    return null
  }

  return (
    <section className="border-b border-[#E2E8F0] py-14">
      <Eyebrow text="LATEST FROM THE MANIFOLD" className="mb-5" />
      <h2 className="font-serif text-[34px] text-ink mb-3">Fresh perspectives</h2>
      <p className="text-slate text-base mb-8 max-w-2xl">
        The latest projections from Pilot's knowledge manifold, generated on demand and always current.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {hooks.map((hook) => (
          <LatestHookCard key={hook.id} hook={hook} />
        ))}
      </div>
    </section>
  )
}
