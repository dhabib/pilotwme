'use client'

import { ManifoldRegion } from '@/lib/types'

interface ManifoldVizProps {
  regions: ManifoldRegion[]
  selected: string | null
  onSelect: (id: string | null) => void
}

export function ManifoldViz({ regions, selected, onSelect }: ManifoldVizProps) {
  const handleClick = (id: string) => {
    onSelect(selected === id ? null : id)
  }

  return (
    <div
      className="relative bg-ink rounded-xl overflow-hidden flex-shrink-0"
      style={{ width: '100%', maxWidth: 480, aspectRatio: '480/380' }}
      role="group"
      aria-label="Manifold knowledge regions"
    >
      {/* Grid lines */}
      {[20, 40, 60, 80].map((pct) => (
        <div key={`h${pct}`}>
          <div
            className="absolute top-0 bottom-0"
            style={{ left: `${pct}%`, width: 1, background: 'rgba(255,255,255,0.04)' }}
          />
          <div
            className="absolute left-0 right-0"
            style={{ top: `${pct}%`, height: 1, background: 'rgba(255,255,255,0.04)' }}
          />
        </div>
      ))}

      {/* Region circles */}
      {regions.map((region) => {
        const isSelected = selected === region.id
        const opacity = 0.3 + region.density * 0.5
        const fontSize = Math.max(9, Math.min(13, region.size / 5.5))

        return (
          <button
            key={region.id}
            onClick={() => handleClick(region.id)}
            aria-pressed={isSelected}
            aria-label={`${region.label}: ${region.artifacts} artifacts, ${Math.round(region.density * 100)}% density`}
            className="absolute flex items-center justify-center text-white text-center leading-tight font-sans transition-all duration-200 cursor-pointer hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-1 focus:ring-offset-ink rounded-full"
            style={{
              left: `${region.x}%`,
              top: `${region.y}%`,
              width: region.size,
              height: region.size,
              transform: `translate(-50%, -50%)`,
              background: `rgba(37, 99, 235, ${opacity})`,
              border: isSelected ? '2px solid #2563EB' : '2px solid transparent',
              fontSize,
            }}
          >
            {region.label}
          </button>
        )
      })}
    </div>
  )
}
