import Link from 'next/link'
import { ManifoldRegion } from '@/lib/types'
import { Eyebrow } from './eyebrow'
import { Button } from './button'

interface ManifoldDetailProps {
  region: ManifoldRegion | null
}

export function ManifoldDetail({ region }: ManifoldDetailProps) {
  if (!region) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[200px] text-slate-light text-sm italic">
        ← Click a topic region to explore the manifold
      </div>
    )
  }

  // Pre-fill question for research desk based on region
  const question = `Tell me about ${region.label.toLowerCase()} in the context of Pilot`

  return (
    <div className="flex-1 min-w-0">
      <Eyebrow text="TOPIC REGION" className="mb-3" />
      <h3 className="font-sans font-bold text-ink text-[22px] mb-4">{region.label}</h3>

      <div className="flex gap-3 mb-4">
        <div className="flex-1 bg-blue-light rounded-lg p-3 text-center">
          <p className="text-blue text-2xl font-bold">{region.artifacts}</p>
          <p className="text-blue text-xs font-medium mt-0.5">Artifacts</p>
        </div>
        <div className="flex-1 bg-green-light rounded-lg p-3 text-center">
          <p className="text-green text-2xl font-bold">{Math.round(region.density * 100)}%</p>
          <p className="text-green text-xs font-medium mt-0.5">Density</p>
        </div>
      </div>

      <div className="bg-blue-light border-l-4 border-blue rounded-r-lg p-3 mb-4 text-sm text-slate leading-relaxed">
        <strong className="text-blue font-semibold">Tip:</strong> Click &apos;Generate
        projection&apos; to ask Pilot about this manifold region.
      </div>

      <Link href={`/research-desk?q=${encodeURIComponent(question)}`}>
        <Button variant="primary" className="w-full justify-center">
          Generate projection →
        </Button>
      </Link>
    </div>
  )
}
