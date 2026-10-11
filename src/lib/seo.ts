import type { Metadata } from 'next'

export const SITE_NAME = 'Off Broadway Nashville'
export const SITE_URL = 'https://www.offbroadwaynashville.co'
export const AUTHOR_NAME = 'Peter'
export const AUTHOR_PATH = '/about/'

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
  /** Root-relative image path. Switches the Twitter card to summary_large_image. */
  image?: { src: string; alt: string; width: number; height: number }
  /** Open Graph type; guides use "article". */
  ogType?: 'website' | 'article'
}

/**
 * Per-page metadata: self-referencing canonical plus Open Graph and Twitter tags
 * that match the page's own title and description. Next.js replaces rather than
 * merges `openGraph`/`twitter` across segments, so each page emits a full set.
 */
export function pageMetadata({ title, description, path, titleIsComplete = false, image, ogType = 'website' }: PageMetaInput): Metadata {
  const url = canonicalUrl(path)
  const fullTitle = titleIsComplete ? title : `${title} | ${SITE_NAME}`
  const ogImage = image ? { url: `${SITE_URL}${image.src}`, width: image.width, height: image.height, alt: image.alt } : null

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: ogType,
      locale: 'en_US',
      siteName: SITE_NAME,
      url,
      title: fullTitle,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    twitter: {
      // A large card only when the page has its own image to show.
      card: ogImage ? 'summary_large_image' : 'summary',
      title: fullTitle,
      description,
      ...(ogImage ? { images: [ogImage.url] } : {}),
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

/** "October 11, 2026", rendered from a YYYY-MM-DD date in UTC. */
export function formatDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

/** "September 2026", rendered from a YYYY-MM-DD date in UTC so it cannot drift a day. */
export function formatUpdated(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
