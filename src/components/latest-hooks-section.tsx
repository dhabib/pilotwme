import { Eyebrow } from './eyebrow'
import { LatestHookCard } from './latest-hook-card'

interface Hook {
  id: string
  identifier: string
  content: string
  generatedAt: string
}

export async function LatestHooksSection() {
  // Fetch hooks server-side at build time
  let hooks: Hook[] = []
  let error = false

  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3003'
    const res = await fetch(`${siteUrl}/api/hooks`, {
      next: { revalidate: 3600 }
    })

    if (res.ok) {
      hooks = await res.json()
    } else {
      console.error('[LatestHooksSection] Failed to fetch hooks:', res.status)
      error = true
    }
  } catch (err) {
    console.error('[LatestHooksSection] Fetch error:', err)
    error = true
  }

  // Don't render section if no hooks or error
  if (error || hooks.length === 0) {
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
