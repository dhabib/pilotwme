'use client'

import { useState, useEffect, useRef } from 'react'

interface UseStreamTextResult {
  displayed: string
  done: boolean
}

/**
 * Character-by-character text reveal hook.
 *
 * V1: Uses setInterval to simulate streaming.
 * V2: Replace with Vercel AI SDK's useCompletion or useChat streaming.
 *
 * Respects prefers-reduced-motion: shows full text immediately if set.
 */
export function useStreamText(
  text: string,
  speed: number = 14,
  active: boolean = true
): UseStreamTextResult {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const indexRef = useRef(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Check for reduced motion preference
  const prefersReduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  useEffect(() => {
    if (!active) {
      setDisplayed('')
      setDone(false)
      indexRef.current = 0
      return
    }

    // Immediately show full text for reduced motion
    if (prefersReduced) {
      setDisplayed(text)
      setDone(true)
      return
    }

    setDisplayed('')
    setDone(false)
    indexRef.current = 0

    intervalRef.current = setInterval(() => {
      indexRef.current += 1
      setDisplayed(text.slice(0, indexRef.current))

      if (indexRef.current >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setDone(true)
      }
    }, speed)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [text, speed, active, prefersReduced])

  return { displayed, done }
}
