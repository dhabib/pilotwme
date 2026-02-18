'use client'

import { useEffect, useState } from 'react'
import { WisdomEngineContent } from '@/components/wisdom-engine-content'

interface Hook {
  id: string
  identifier: string
  content: string
  generatedAt: string
  updatedAt: string
}

export default function WisdomEnginePage() {
  const [hook, setHook] = useState<Hook | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/hook')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load hook')
        return res.json()
      })
      .then((data) => {
        setHook(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="py-20 max-w-2xl">
        <div className="text-slate-light text-center">Loading...</div>
      </div>
    )
  }

  if (error || !hook) {
    return (
      <div className="py-20 max-w-2xl">
        <div className="text-red-500 text-center">
          {error || 'Hook not found'}
        </div>
      </div>
    )
  }

  return (
    <WisdomEngineContent
      title="What Is a Wisdom Engine?"
      hookContent={hook.content}
      generatedAt={hook.generatedAt}
    />
  )
}
