import { NextRequest, NextResponse } from 'next/server'

const PILOT_API_URL = process.env.PILOT_API_URL || 'https://api.pilotwme.com'
const PILOT_TENANT_ID = process.env.PILOT_TENANT_ID || ''

export const revalidate = 3600

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params

  if (!PILOT_TENANT_ID) {
    return NextResponse.json({ error: 'PILOT_TENANT_ID not configured' }, { status: 503 })
  }

  try {
    const res = await fetch(
      `${PILOT_API_URL}/api/v1/public/boilerplate/${slug}?tenantId=${PILOT_TENANT_ID}`,
      { next: { revalidate: 3600 } }
    )

    if (!res.ok) {
      const error = await res.json().catch(() => ({}))
      return NextResponse.json(
        { error: error.error?.message || 'Page not found' },
        { status: res.status }
      )
    }

    const page = await res.json()
    return NextResponse.json(page)
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal error' }, { status: 500 })
  }
}
