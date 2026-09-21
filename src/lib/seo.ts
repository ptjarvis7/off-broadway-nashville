import type { Metadata } from 'next'

export const SITE_NAME = 'Off Broadway Nashville'
export const SITE_URL = 'https://www.offbroadwaynashville.co'

/** Canonical URL for a route: always the www host, always a trailing slash. */
export function canonicalUrl(path: string): string {
  const trimmed = path.replace(/^\/+|\/+$/g, '')
  return trimmed ? `${SITE_URL}/${trimmed}/` : `${SITE_URL}/`
}

interface PageMetaInput {
  title: string
  description: string
  path: string
  /**
   * The homepage sits in the same segment as the root layout, so its title does
   * not run through the layout's title template. Every other route does.
   */
  titleIsComplete?: boolean
}

/**
 * Per-page metadata: self-referencing canonical plus Open Graph and Twitter tags
 * that match the page's own title and description. Next.js replaces rather than
 * merges `openGraph`/`twitter` across segments, so each page emits a full set.
 */
export function pageMetadata({ title, description, path, titleIsComplete = false }: PageMetaInput): Metadata {
  const url = canonicalUrl(path)
  const fullTitle = titleIsComplete ? title : `${title} | ${SITE_NAME}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: SITE_NAME,
      url,
      title: fullTitle,
      description,
    },
    twitter: {
      // "summary" until the site has an og:image worth showing.
      card: 'summary',
      title: fullTitle,
      description,
    },
  }
}

/** "1 venue" / "2 venues". */
export function venueCount(n: number): string {
  return `${n} ${n === 1 ? 'venue' : 'venues'}`
}

/**
 * Names up to `max` venues, appending "and more" only when the page actually
 * holds venues beyond the ones named.
 */
export function venueNameList(names: string[], max = 3): string {
  const shown = names.slice(0, max)
  return shown.length < names.length ? `${shown.join(', ')}, and more` : shown.join(', ')
}

/** "September 2026", rendered from a YYYY-MM-DD date in UTC so it cannot drift a day. */
export function formatUpdated(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
