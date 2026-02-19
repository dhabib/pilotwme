import type { Metadata } from 'next'
import { DM_Serif_Display, DM_Sans, JetBrains_Mono } from 'next/font/google'
import { Nav } from '@/components/nav'
import './globals.css'

const serif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-serif',
  display: 'swap',
})

const sans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Pilot — The World\'s First Wisdom Engine',
    template: '%s | Pilot',
  },
  description:
    'Pilot doesn\'t just store files for retrieval. It memorizes what you know, and projects structured knowledge on demand - as articles, briefings, newsletters, social posts... Your full treasury of source material, now truly within reach.',
  metadataBase: new URL('https://pilotcms.com'),
  openGraph: {
    type: 'website',
    siteName: 'Pilot',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body className="site-border">
        <Nav />
        <main id="main-content" className="max-w-site mx-auto px-4">
          {children}
        </main>
      </body>
    </html>
  )
}
