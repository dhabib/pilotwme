'use client'

import { useState } from 'react'
import { ManifoldViz } from './manifold-viz'
import { ManifoldDetail } from './manifold-detail'
import { manifoldRegions } from '@/lib/data'

export function ManifoldExplorer() {
  const [selected, setSelected] = useState<string | null>(null)
  const selectedRegion = manifoldRegions.find((r) => r.id === selected) ?? null

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start">
      <ManifoldViz regions={manifoldRegions} selected={selected} onSelect={setSelected} />
      <ManifoldDetail region={selectedRegion} />
    </div>
  )
}
