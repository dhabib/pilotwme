'use client'

import { KeyboardEvent } from 'react'
import { Button } from './button'

interface DeskInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: (query: string) => void
  placeholder?: string
}

export function DeskInput({ value, onChange, onSubmit, placeholder }: DeskInputProps) {
  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim()) {
      onSubmit(value.trim())
    }
  }

  return (
    <div className="flex gap-3 p-4 border-b border-[#E2E8F0]">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKey}
        placeholder={placeholder ?? 'Ask anything about Pilot…'}
        className="flex-1 border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[15px] text-ink placeholder:text-slate-light focus:outline-none focus:border-blue transition-colors"
        aria-label="Research desk query"
      />
      <Button
        variant="primary"
        onClick={() => value.trim() && onSubmit(value.trim())}
        disabled={!value.trim()}
      >
        Ask
      </Button>
    </div>
  )
}
