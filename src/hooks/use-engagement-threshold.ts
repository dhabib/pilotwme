'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface EngagementConfig {
  /** Scroll depth (0-1) to trigger. Default 0.55 */
  scrollDepth?: number
  /** Dwell time in ms to trigger. Set to 0 to disable. Default 0 (V1) */
  dwellMs?: number
  /** Whether an explicit click should trigger. Default false (V1) */
  clickTrigger?: boolean
}

/**
 * Detects reader engagement and fires a callback once.
 *
 * V1 (default): triggers on scroll past 55% of the tracked element.
 * V2: enable dwellMs and clickTrigger for the full bimodal engagement model.
 *
 * Usage:
 *   const { containerRef, triggered } = useEngagementThreshold({ scrollDepth: 0.55 })
 *   <div ref={containerRef}>...</div>
 */
export function useEngagementThreshold(config: EngagementConfig = {}) {
  const { scrollDepth = 0.55, dwellMs = 0 } = config

  const [triggered, setTriggered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const dwellTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const firedRef = useRef(false)

  const fire = useCallback(() => {
    if (firedRef.current) return
    firedRef.current = true
    setTriggered(true)
  }, [])

  // Scroll-based trigger
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const handleScroll = () => {
      if (firedRef.current) return
      const rect = el.getBoundingClientRect()
      const totalHeight = el.offsetHeight
      const scrolled = -rect.top
      const progress = scrolled / totalHeight

      if (progress >= scrollDepth) {
        fire()
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollDepth, fire])

  // Dwell-time trigger (V2)
  useEffect(() => {
    if (!dwellMs) return
    dwellTimerRef.current = setTimeout(fire, dwellMs)
    return () => {
      if (dwellTimerRef.current) clearTimeout(dwellTimerRef.current)
    }
  }, [dwellMs, fire])

  return { containerRef, triggered }
}
