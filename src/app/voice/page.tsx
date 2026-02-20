'use client'

import { Eyebrow } from '@/components/eyebrow'
import { VoiceDemo } from '@/components/voice-demo'
import { voicePage } from '@/lib/data'

export default function VoicePage() {
  return (
    <section className="py-12">
      <div className="max-w-2xl mb-10">
        <Eyebrow text={voicePage.eyebrow} className="mb-4" />
        <h2 className="font-serif text-[36px] md:text-[44px] leading-tight text-ink mb-4">
          {voicePage.title}
        </h2>
        <p className="text-slate text-base leading-relaxed">{voicePage.description}</p>
      </div>

      <VoiceDemo />
    </section>
  )
}
