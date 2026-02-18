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
    <div className="flex flex-col gap-4">
      {hooks.map((hook) => (
        <LatestHookCard key={hook.id} hook={hook} />
      ))}
    </div>
  )
}
