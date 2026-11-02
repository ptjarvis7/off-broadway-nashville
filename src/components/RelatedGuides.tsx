import Link from 'next/link'
import type { Guide } from '@/lib/content'

interface RelatedGuidesProps {
  guides: Guide[]
  /**
   * Venue pages show each guide's description under its title. Hub pages show
   * titles only: hubs sell the experience and leave logistics to the pages they link to.
   */
  variant: 'venue' | 'hub'
}

export default function RelatedGuides({ guides, variant }: RelatedGuidesProps) {
  if (guides.length === 0) return null

  if (variant === 'hub') {
    return (
      <div className="mt-12 max-w-2xl">
        <div className="section-label mb-3">Related guides</div>
        <ul className="space-y-2">
          {guides.map(g => (
            <li key={g.slug}>
              <Link href={`/guides/${g.slug}/`} className="font-display font-semibold text-ink hover:text-accent transition-colors">
                {g.title} →
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="mb-8">
      <h2 className="font-display text-xl font-semibold text-ink mb-3">Related Guides</h2>
      <ul className="space-y-4">
        {guides.map(g => (
          <li key={g.slug}>
            <Link href={`/guides/${g.slug}/`} className="font-display font-semibold text-ink hover:text-accent transition-colors">
              {g.title} →
            </Link>
            <p className="text-sm text-muted leading-relaxed mt-1">{g.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
