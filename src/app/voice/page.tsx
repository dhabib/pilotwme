'use client'

import { useState } from 'react'
import { Eyebrow } from '@/components/eyebrow'
import { VoiceControls } from '@/components/voice-controls'
import { VoicePreview } from '@/components/voice-preview'
import { voiceSliders, voiceVariants, voicePage } from '@/lib/data'

interface VoiceValues {
  brevity: number
  formality: number
  confidence: number
}

function selectVariant(values: VoiceValues): string {
  if (values.brevity < 30 && values.formality > 60) return voiceVariants.scholarly
  if (values.brevity > 70 && values.formality < 40) return voiceVariants.casual
  return voiceVariants.balanced
}

export default function VoicePage() {
  const [values, setValues] = useState<VoiceValues>({
    brevity: 50,
    formality: 70,
    confidence: 65,
  })

  const handleChange = (id: string, value: number) => {
    setValues((prev) => ({ ...prev, [id]: value }))
  }

  const previewText = selectVariant(values)

  return (
    <section className="py-12">
      <div className="max-w-2xl mb-10">
        <Eyebrow text={voicePage.eyebrow} className="mb-4" />
        <h2 className="font-serif text-[36px] md:text-[44px] leading-tight text-ink mb-4">
          {voicePage.title}
        </h2>
        <p className="text-slate text-base leading-relaxed">{voicePage.description}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        <VoiceControls sliders={voiceSliders} values={values} onChange={handleChange} />
        <VoicePreview
          text={previewText}
          manifoldRegion={voicePage.manifoldRegion}
          sourceCount={voicePage.sourceCount}
        />
      </div>
    </section>
  )
}
