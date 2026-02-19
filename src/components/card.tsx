import { Eyebrow } from './eyebrow'
import SafeHTML from './safe-html'

interface CardProps {
  tag: string
  title: string
  description: string
}

export function Card({ tag, title, description }: CardProps) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg p-6 hover:border-blue transition-colors duration-200">
      <Eyebrow text={tag} className="mb-3" />
      <h4 className="font-sans font-semibold text-ink text-[17px] mb-2 leading-snug">{title}</h4>
      <SafeHTML html={description} className="text-slate text-sm leading-relaxed" tag="p" />
    </div>
  )
}
