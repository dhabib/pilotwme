import { NextResponse } from 'next/server'

const PILOT_API_URL = process.env.PILOT_API_URL || 'https://api.pilotwme.com'
const PILOT_ASK_SECRET = process.env.PILOT_ASK_SECRET || ''
const PILOT_TENANT_ID = process.env.PILOT_TENANT_ID || ''

/**
 * GET /api/mcp-token
 *
 * Server-side route that fetches a short-lived MCP JWT from the Pilot API.
 * The JWT is returned to the browser so it can open an MCP SSE session.
 * The ASK_SECRET is never exposed to the browser.
 */
export async function GET() {
  if (!PILOT_TENANT_ID) {
    return NextResponse.json({ error: 'PILOT_TENANT_ID not configured' }, { status: 503 })
  }

  try {
    const res = await fetch(`${PILOT_API_URL}/api/v1/public/mcp-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(PILOT_ASK_SECRET ? { 'x-ask-secret': PILOT_ASK_SECRET } : {}),
      },
      body: JSON.stringify({ tenantId: PILOT_TENANT_ID }),
      cache: 'no-store',
    })

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      console.error('MCP token fetch failed:', res.status, text)
      return NextResponse.json({ error: 'Failed to obtain MCP token' }, { status: 503 })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    console.error('MCP token error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
