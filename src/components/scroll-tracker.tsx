'use client'

import { ReactNode } from 'react'
import { useEngagementThreshold } from '@/hooks/use-engagement-threshold'
import { ScrollHint } from './scroll-hint'

interface ScrollTrackerProps {
  children: (props: { triggered: boolean; progress: number }) => ReactNode
  scrollDepth?: number
}

export function ScrollTracker({ children, scrollDepth = 0.55 }: ScrollTrackerProps) {
  const { containerRef, triggered } = useEngagementThreshold({ scrollDepth })

  // Track raw scroll progress for the hint bar
  // This is a simplified version — progress is exposed via the containerRef
  // For the hint, we compute approximate progress from the triggered state

  return (
    <div ref={containerRef}>
      {children({ triggered, progress: triggered ? 1 : 0 })}
    </div>
  )
}
