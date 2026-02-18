interface GeneratedFooterProps {
  date: string
  libraryUrl?: string
}

export function GeneratedFooter({ date, libraryUrl = '#' }: GeneratedFooterProps) {
  return (
    <footer className="border-t border-[#E2E8F0] mt-10 pt-5 text-slate-light text-xs leading-relaxed">
      <p>
        This content was projected from Pilot&apos;s wisdom manifold on {date}, shaped by the
        editorial constitution active at that time.{' '}
        <a
          href={libraryUrl}
          className="text-blue hover:underline"
        >
          Explore the sources in Library →
        </a>
      </p>
    </footer>
  )
}
