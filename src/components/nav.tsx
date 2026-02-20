'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { label: 'Home',         href: '/' },
  { label: 'Ideas',        href: '/ideas' },
  { label: 'About',        href: '/about' },
  { label: 'Ask',          href: '/ask' },
  { label: 'How It Works', href: '/how-it-works' },
]

export function Nav() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-blue focus:px-3 focus:py-1.5 focus:rounded focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 w-full bg-paper/95 backdrop-blur-md border-b border-[#E2E8F0]">
        <nav
          className="max-w-site mx-auto flex items-center justify-between h-14 px-4"
          aria-label="Main navigation"
        >
          {/* Logo + wordmark */}
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="Pilot — Home">
            <div className="w-8 h-8 rounded-md overflow-hidden bg-blue-light flex-shrink-0">
              <Image
                src="/pilot-logo.png"
                alt=""
                width={32}
                height={32}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <span className="font-bold text-lg tracking-tight text-ink group-hover:text-blue transition-colors">
              pilot
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {links.map(({ label, href }) => {
              const active =
                href === '/' ? pathname === '/' : pathname.startsWith(href)
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      active
                        ? 'bg-blue-light text-blue font-semibold'
                        : 'text-slate hover:text-ink hover:bg-blue-light/50'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
            {/* Divider + Peek behind link */}
            <li role="separator" className="w-px h-4 bg-[#E2E8F0] mx-1" aria-hidden />
            <li>
              <a
                href="https://peek.pilotwme.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-md text-xs font-normal text-slate-light hover:text-ink hover:bg-blue-light/50 transition-colors"
              >
                Peek behind ↗
              </a>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-slate hover:text-ink hover:bg-blue-light/50 transition-colors"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-[#E2E8F0] bg-paper">
            <ul className="max-w-site mx-auto px-4 py-3 flex flex-col gap-1" role="list">
              {links.map(({ label, href }) => {
                const active =
                  href === '/' ? pathname === '/' : pathname.startsWith(href)
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        active
                          ? 'bg-blue-light text-blue font-semibold'
                          : 'text-slate hover:text-ink hover:bg-blue-light/50'
                      }`}
                      aria-current={active ? 'page' : undefined}
                    >
                      {label}
                    </Link>
                  </li>
                )
              })}
              <li>
                <a
                  href="https://peek.pilotwme.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-xs font-normal text-slate-light hover:text-ink hover:bg-blue-light/50 transition-colors"
                >
                  Peek behind ↗
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  )
}
