interface ProvenanceFooterProps {
  artifactCount: number
  voiceSettings: string
  timestamp: string
}

export function ProvenanceFooter({ artifactCount, voiceSettings, timestamp }: ProvenanceFooterProps) {
  const date = new Date(timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="flex items-center gap-2 text-green text-sm mt-4 mb-2">
      <span aria-hidden="true">✓</span>
      <span>
        Projected from{' '}
        <strong className="font-semibold">{artifactCount} artifacts</strong> · Voice:{' '}
        <em>{voiceSettings}</em> · {date}
      </span>
    </div>
  )
}
