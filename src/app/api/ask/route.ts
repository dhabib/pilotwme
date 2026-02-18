import { NextRequest } from 'next/server'

const PILOT_API_URL = process.env.PILOT_API_URL || 'https://api.pilotwme.com'
const PILOT_TENANT_ID = process.env.PILOT_TENANT_ID || ''
const PILOT_ASK_SECRET = process.env.PILOT_ASK_SECRET || ''

export async function POST(req: NextRequest) {
  const { question } = await req.json()

  if (!question || typeof question !== 'string' || question.trim().length === 0) {
    return new Response(JSON.stringify({ error: 'question is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (!PILOT_TENANT_ID) {
    return new Response(JSON.stringify({ error: 'PILOT_TENANT_ID not configured' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const upstream = await fetch(`${PILOT_API_URL}/api/v1/public/ask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(PILOT_ASK_SECRET ? { 'x-ask-secret': PILOT_ASK_SECRET } : {}),
    },
    body: JSON.stringify({ question: question.trim(), tenantId: PILOT_TENANT_ID }),
  })

  if (!upstream.ok || !upstream.body) {
    const text = await upstream.text()
    return new Response(text, { status: upstream.status, headers: { 'Content-Type': 'application/json' } })
  }

  // Pass through SSE stream from PilotCMS
  return new Response(upstream.body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
