'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const sectionLinks = [
  { href: '/venues/', label: 'Venues' },
  { href: '/neighborhoods/', label: 'Neighborhoods' },
  { href: '/categories/', label: 'Categories' },
]
const guidesLink = { href: '/guides/', label: 'Guides' }
const aboutLink = { href: '/about/', label: 'About' }

const stripSlash = (path: string) => path.replace(/\/+$/, '')

/** showGuides is false until a guide is published, since /guides/ is not built before then. */
export default function HeaderNav({ showGuides }: { showGuides: boolean }) {
  const pathname = stripSlash(usePathname() ?? '')
  const links = [...sectionLinks, ...(showGuides ? [guidesLink] : []), aboutLink]

  return (
    <nav aria-label="Main" className="w-full sm:w-auto border-t border-border sm:border-t-0">
      <ul className="flex flex-wrap items-center justify-between sm:justify-end gap-x-2 sm:gap-x-5 gap-y-1">
        {links.map(({ href, label }) => {
          const section = stripSlash(href)
          // "page" on the section index itself, "true" on pages inside it
          // (for example a single venue under Venues).
          const current = pathname === section ? 'page' : pathname.startsWith(`${section}/`) ? 'true' : undefined
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={current}
                className={`block py-2 text-sm font-body transition-colors ${
                  current ? 'text-ink font-medium underline decoration-accent decoration-2 underline-offset-[6px]' : 'text-muted hover:text-ink'
                }`}
              >
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
