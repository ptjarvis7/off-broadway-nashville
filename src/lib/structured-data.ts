import { AUTHOR_NAME, AUTHOR_PATH, SITE_NAME, SITE_URL, canonicalUrl } from '@/lib/seo'
import type { FAQItem } from '@/components/FAQ'
import type { Venue } from '@/types'

/**
 * JSON-LD builders. Every URL here is a canonical www URL with a trailing
 * slash, and scripts/check-jsonld.mjs fails the build if any of them points at
 * a page that was not exported.
 */

type Thing = Record<string, unknown>

const ORGANIZATION_ID = `${SITE_URL}/#organization`
const WEBSITE_ID = `${SITE_URL}/#website`
export const PERSON_ID = `${canonicalUrl(AUTHOR_PATH)}#person`

export function personSchema(): Thing {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: AUTHOR_NAME,
    url: canonicalUrl(AUTHOR_PATH),
  }
}

export function organizationSchema(): Thing {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE_NAME,
    url: canonicalUrl('/'),
    founder: { '@id': PERSON_ID },
  }
}

export function homepageSchema(): Thing {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: SITE_NAME,
        url: canonicalUrl('/'),
        publisher: { '@id': ORGANIZATION_ID },
        inLanguage: 'en-US',
      },
      organizationSchema(),
      personSchema(),
    ],
  }
}

export interface Crumb {
  name: string
  /** Root-relative path. Omit only for the current page (the last crumb). */
  path?: string
}

export function breadcrumbSchema(crumbs: Crumb[]): Thing {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      ...(c.path ? { item: canonicalUrl(c.path) } : {}),
    })),
  }
}

const venueTypeToSchemaUri: Record<string, string> = {
  'Restaurant w/ Live Music': 'https://schema.org/Restaurant',
  'Jazz Club': 'https://schema.org/NightClub',
  'Karaoke Bar': 'https://schema.org/BarOrPub',
  'Historic Venue': 'https://schema.org/LandmarksOrHistoricalBuildings',
}

export function venueSchema(venue: Venue): Thing {
  const additionalType = Array.from(
    new Set(venue.venueTypeTags.map(t => venueTypeToSchemaUri[t]).filter(Boolean))
  )
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicVenue',
    name: venue.name,
    description: venue.shortDescription,
    url: canonicalUrl(`/venues/${venue.slug}`),
    address: {
      '@type': 'PostalAddress',
      ...(venue.address ? { streetAddress: venue.address.street, postalCode: venue.address.zip } : {}),
      addressLocality: venue.address?.city ?? 'Nashville',
      addressRegion: venue.address?.state ?? 'TN',
      addressCountry: 'US',
    },
    ...(venue.officialWebsite ? { sameAs: venue.officialWebsite } : {}),
    ...(additionalType.length ? { additionalType } : {}),
    ...(venue.image ? { image: `${SITE_URL}${venue.image.src}` } : {}),
  }
}

export function collectionPageSchema({ name, description, path, venues }: {
  name: string
  description: string
  path: string
  venues: Venue[]
}): Thing {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: canonicalUrl(path),
    isPartOf: { '@id': WEBSITE_ID },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: venues.length,
      itemListElement: venues.map((v, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: v.name,
        url: canonicalUrl(`/venues/${v.slug}`),
      })),
    },
  }
}

export function faqSchema(items: FAQItem[]): Thing {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

export function articleSchema({ title, description, path, datePublished, dateModified }: {
  title: string
  description: string
  path: string
  datePublished: string
  dateModified: string
}): Thing {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: canonicalUrl(path),
    mainEntityOfPage: canonicalUrl(path),
    datePublished,
    dateModified,
    author: personSchema(),
    publisher: { '@type': 'Organization', name: SITE_NAME, url: canonicalUrl('/') },
  }
}
