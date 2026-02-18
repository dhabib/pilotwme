import { Eyebrow } from './eyebrow'

interface VoicePreviewProps {
  text: string
  manifoldRegion: string
  sourceCount: number
}

export function VoicePreview({ text, manifoldRegion, sourceCount }: VoicePreviewProps) {
  return (
    <div className="flex-1 min-w-0">
      <div className="bg-white border border-[#E2E8F0] rounded-lg p-5 mb-3">
        <Eyebrow text="LIVE PROJECTION PREVIEW" color="accent" className="mb-3" />
        <p className="text-slate text-base leading-relaxed">{text}</p>
      </div>
      <p className="text-slate-light text-xs">
        Manifold region: <strong className="text-slate">{manifoldRegion}</strong> ·{' '}
        <strong className="text-slate">{sourceCount}</strong> source artifacts
      </p>
    </div>
  )
}
