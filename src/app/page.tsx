import Link from 'next/link'
import { Eyebrow } from '@/components/eyebrow'
import { Button } from '@/components/button'
import { Card } from '@/components/card'
import { Cite } from '@/components/cite'
import { homeHero, homeCards, homeTransparency } from '@/lib/data'

export const metadata = {
  title: 'Pilot — The World\'s First Wisdom Engine',
  description:
    'Pilot ingests what you know, shapes it through editorial intelligence, and projects structured knowledge on demand.',
}

export default function HomePage() {
  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                                */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-b border-[#E2E8F0] py-20 md:py-28">
        <Eyebrow text={homeHero.eyebrow} className="mb-5" />
        <h1 className="font-serif text-[42px] md:text-[56px] leading-[1.1] text-ink mb-4 max-w-2xl">
          {homeHero.headline}
          <br />
          <em>{homeHero.headlineEm}</em>
        </h1>
        <p className="text-slate text-lg leading-relaxed max-w-xl mb-8">
          {homeHero.subhead}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/wisdom-engine">
            <Button variant="primary">See it in action →</Button>
          </Link>
          <Link href="/research-desk">
            <Button variant="outline">Ask Pilot anything</Button>
          </Link>
          <a
            href="https://peek.pilotwme.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-150 bg-white border border-[#E2E8F0] text-ink hover:border-blue hover:text-blue"
          >
            Peek behind the curtain
          </a>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Three feature cards                                                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-b border-[#E2E8F0] py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {homeCards.map((card) => (
            <Card key={card.tag} {...card} />
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Transparency notice (dark section)                                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-ink -mx-4 px-4 py-14 md:py-16">
        <div className="max-w-2xl">
          <h2 className="font-serif text-[28px] md:text-[34px] text-white mb-5 leading-tight">
            {homeTransparency.heading}
          </h2>
          {homeTransparency.body.map((para, i) => (
            <p key={i} className="text-slate-light leading-relaxed mb-4 text-base">
              {para}
            </p>
          ))}
          <p className="text-slate-light leading-relaxed mb-4 text-base italic">
            <Cite artifact={homeTransparency.citedBook.artifact}>
              {homeTransparency.citedBook.quote}
            </Cite>
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Bottom spacer                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-10 text-center">
        <p className="text-slate-light text-sm">
          Built with Pilot ·{' '}
          <Link href="/research-desk" className="text-blue hover:underline">
            Ask us anything
          </Link>
        </p>
      </section>
    </>
  )
}
