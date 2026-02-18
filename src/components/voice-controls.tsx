'use client'

import { VoiceSlider } from '@/lib/types'

interface VoiceValues {
  brevity: number
  formality: number
  confidence: number
}

interface VoiceControlsProps {
  sliders: VoiceSlider[]
  values: VoiceValues
  onChange: (id: string, value: number) => void
}

function computeCost(values: VoiceValues): string {
  const cost = 0.02 + (100 - values.brevity) * 0.0004 + values.formality * 0.0001
  return cost.toFixed(3)
}

export function VoiceControls({ sliders, values, onChange }: VoiceControlsProps) {
  const cost = computeCost(values)

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg p-5 w-full md:w-[280px] flex-shrink-0">
      <h3 className="font-sans font-semibold text-ink text-[15px] mb-4">Voice Parameters</h3>

      <div className="flex flex-col gap-5">
        {sliders.map((slider) => {
          const val = values[slider.id as keyof VoiceValues]

          return (
            <div key={slider.id}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-slate-light text-xs">{slider.leftLabel}</span>
                <span className="font-semibold text-ink text-xs">{slider.name}</span>
                <span className="text-slate-light text-xs">{slider.rightLabel}</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={val}
                onChange={(e) => onChange(slider.id, Number(e.target.value))}
                className="w-full accent-blue cursor-pointer"
                aria-label={`${slider.name}: ${val}`}
              />
            </div>
          )
        })}
      </div>

      <div className="mt-5 bg-blue-light rounded-lg p-3">
        <p className="text-blue text-xs font-medium">Estimated cost per projection</p>
        <p className="text-blue text-lg font-bold mt-0.5">${cost}</p>
        <p className="text-slate-light text-[11px] mt-1">
          Based on token estimate for current voice settings
        </p>
      </div>
    </div>
  )
}
