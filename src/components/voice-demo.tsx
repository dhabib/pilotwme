'use client'

import { useState } from 'react'
import { VoiceControls } from './voice-controls'
import { VoicePreview } from './voice-preview'
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

export function VoiceDemo() {
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
    <div className="flex flex-col md:flex-row gap-6 items-start">
      <VoiceControls sliders={voiceSliders} values={values} onChange={handleChange} />
      <VoicePreview
        text={previewText}
        manifoldRegion={voicePage.manifoldRegion}
        sourceCount={voicePage.sourceCount}
      />
    </div>
  )
}
