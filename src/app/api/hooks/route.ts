import { NextResponse } from 'next/server'

const PILOT_API_URL = process.env.PILOT_API_URL || 'https://api.pilotwme.com'
const PILOT_TENANT_ID = process.env.PILOT_TENANT_ID

export const revalidate = 60

export async function GET() {
  if (!PILOT_TENANT_ID) {
    return NextResponse.json({ error: 'PILOT_TENANT_ID not configured' }, { status: 503 })
  }

  try {
    const res = await fetch(
      `${PILOT_API_URL}/api/v1/public/hooks?tenantId=${PILOT_TENANT_ID}&limit=50`,
      { next: { revalidate: 60 } }
    )

    if (!res.ok) {
      const error = await res.json().catch(() => ({}))
      console.error('[api/hooks] PilotCMS error:', error)
      return NextResponse.json({ error: 'Failed to fetch hooks' }, { status: 503 })
    }

    const hooks = await res.json()
    return NextResponse.json(hooks)
  } catch (error) {
    console.error('[api/hooks] Fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch hooks' }, { status: 503 })
  }
}
