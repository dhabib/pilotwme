import { Eyebrow } from '@/components/eyebrow'
import { LatestHooksSection } from '@/components/latest-hooks-section'

export const metadata = {
  title: 'Latest — Pilot',
  description: 'The latest projections from the Pilot knowledge manifold.',
}

export default function LatestPage() {
  return (
    <section className="py-12">
      <div className="max-w-2xl mb-10">
        <Eyebrow text="LATEST FROM THE MANIFOLD" className="mb-4" />
        <h2 className="font-serif text-[36px] md:text-[44px] leading-tight text-ink mb-4">
          Fresh perspectives
        </h2>
        <p className="text-slate text-base leading-relaxed">
          The latest projections from Pilot&apos;s knowledge manifold, generated on demand and always current.
        </p>
      </div>
      <LatestHooksSection />
    </section>
  )
}
