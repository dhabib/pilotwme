'use client'

import { useState } from 'react'
import { Eyebrow } from '@/components/eyebrow'
import { ManifoldViz } from '@/components/manifold-viz'
import { ManifoldDetail } from '@/components/manifold-detail'
import { manifoldRegions, manifoldPage } from '@/lib/data'

export default function ManifoldPage() {
  const [selected, setSelected] = useState<string | null>(null)
  const selectedRegion = manifoldRegions.find((r) => r.id === selected) ?? null

  return (
    <section className="py-12">
      <div className="max-w-2xl mb-10">
        <Eyebrow text={manifoldPage.eyebrow} className="mb-4" />
        <h2 className="font-serif text-[36px] md:text-[44px] leading-tight text-ink mb-4">
          {manifoldPage.title}
        </h2>
        <p className="text-slate text-base leading-relaxed">{manifoldPage.description}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <ManifoldViz regions={manifoldRegions} selected={selected} onSelect={setSelected} />
        <ManifoldDetail region={selectedRegion} />
      </div>
    </section>
  )
}
