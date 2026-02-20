import { Eyebrow } from '@/components/eyebrow'
import { ManifoldExplorer } from '@/components/manifold-explorer'
import { VoiceDemo } from '@/components/voice-demo'

export const metadata = {
  title: 'How It Works — Pilot Wisdom Engine',
  description:
    'Explore Pilot\'s knowledge manifold and see how the editorial voice constitution shapes every projection it generates.',
}

export default function HowItWorksPage() {
  return (
    <>
      {/* Intro */}
      <section className="border-b border-[#E2E8F0] py-12 md:py-16">
        <div className="max-w-2xl">
          <Eyebrow text="HOW IT WORKS" className="mb-4" />
          <h1 className="font-serif text-[36px] md:text-[48px] leading-tight text-ink mb-4">
            Two ideas. One wisdom engine.
          </h1>
          <p className="text-slate text-lg leading-relaxed">
            Pilot is built on two foundational mechanisms: a <strong className="text-ink">knowledge manifold</strong> that
            organises everything it has read, and an <strong className="text-ink">editorial voice constitution</strong> that
            shapes how it speaks. Together they make every projection grounded, citable, and consistently on-voice.
          </p>
        </div>
      </section>

      {/* Manifold Explorer */}
      <section id="manifold" className="border-b border-[#E2E8F0] py-14">
        <div className="max-w-2xl mb-8">
          <Eyebrow text="MANIFOLD EXPLORER" className="mb-4" />
          <h2 className="font-serif text-[28px] md:text-[36px] leading-tight text-ink mb-3">
            The knowledge space behind this site
          </h2>
          <p className="text-slate text-base leading-relaxed">
            Every bubble is a semantic region — a cluster of related concepts drawn from the source material.
            Density reflects how richly a region is covered; artifacts counts the source passages that
            contribute to it. Click any region to explore, then ask Pilot a question about it.
          </p>
        </div>

        <ManifoldExplorer />
      </section>

      {/* Voice Demo */}
      <section id="voice" className="py-14">
        <div className="max-w-2xl mb-8">
          <Eyebrow text="VOICE DEMO" className="mb-4" />
          <h2 className="font-serif text-[28px] md:text-[36px] leading-tight text-ink mb-3">
            Same knowledge, different voice
          </h2>
          <p className="text-slate text-base leading-relaxed">
            The editorial constitution is a set of parameters — brevity, formality, confidence — that shape
            every projection Pilot produces. Adjust the sliders to see how the same underlying knowledge
            reads at different voice settings. This is not style; it is epistemology made configurable.
          </p>
        </div>

        <VoiceDemo />
      </section>
    </>
  )
}
