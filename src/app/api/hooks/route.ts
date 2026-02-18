import { NextResponse } from 'next/server'

const PILOT_API_URL = process.env.PILOT_API_URL || 'https://api.pilotwme.com'
const PILOT_TENANT_ID = process.env.PILOT_TENANT_ID

export const revalidate = 3600 // ISR: Revalidate every 1 hour

export async function GET() {
  try {
    const url = `${PILOT_API_URL}/api/v1/public/hooks?tenantId=${PILOT_TENANT_ID}&limit=3`

    const res = await fetch(url, {
      next: { revalidate: 3600 }
    })

    if (!res.ok) {
      const error = await res.json().catch(() => ({}))
      console.error('[api/hooks] PilotCMS error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch hooks' },
        { status: 503 }
      )
    }

    const hooks = await res.json()
    return NextResponse.json(hooks)
  } catch (error) {
    console.error('[api/hooks] Fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch hooks' },
      { status: 503 }
    )
  }
}
