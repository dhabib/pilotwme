import { ReactNode } from 'react'

interface DeskBoxProps {
  children: ReactNode
}

export function DeskBox({ children }: DeskBoxProps) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
      {children}
    </div>
  )
}
