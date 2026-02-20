'use client'

import { Eyebrow } from '@/components/eyebrow'
import { ManifoldExplorer } from '@/components/manifold-explorer'
import { manifoldPage } from '@/lib/data'

export default function ManifoldPage() {
  return (
    <section className="py-12">
      <div className="max-w-2xl mb-10">
        <Eyebrow text={manifoldPage.eyebrow} className="mb-4" />
        <h2 className="font-serif text-[36px] md:text-[44px] leading-tight text-ink mb-4">
          {manifoldPage.title}
        </h2>
        <p className="text-slate text-base leading-relaxed">{manifoldPage.description}</p>
      </div>

      <ManifoldExplorer />
    </section>
  )
}
