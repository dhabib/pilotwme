interface PullQuoteProps {
  text: string
}

export function PullQuote({ text }: PullQuoteProps) {
  return (
    <blockquote className="border-l-[3px] border-blue pl-5 my-6">
      <p className="font-serif italic text-[21px] leading-relaxed text-ink">{text}</p>
    </blockquote>
  )
}
