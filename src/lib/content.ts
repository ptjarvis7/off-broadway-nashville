import { readAllGuides, readPublishedGuides, readUpdates } from '@/lib/content-source'
import { guideHubs } from '@/data/guide-hubs'
import { guideVenueOrder } from '@/data/guide-venue-order'

export interface Guide {
  slug: string
  title: string
  description: string
  datePublished: string
  dateModified: string
  body: string
}

/** Published guides from content/guides/, newest first. */
export function getPublishedGuides(): Guide[] {
  return readPublishedGuides()
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return getPublishedGuides().find(g => g.slug === slug)
}

/**
 * Published guides whose text links to /venues/<slug>/. Guides listed for the venue
 * in src/data/guide-venue-order.ts come first, in listed order; the rest follow, newest first.
 */
export function getGuidesForVenue(slug: string): Guide[] {
  const href = `](/venues/${slug}/)`
  const listed = guideVenueOrder[slug] ?? []
  for (const g of readAllGuides()) {
    if (listed.includes(g.slug) && !g.body.includes(href)) {
      throw new Error(`src/data/guide-venue-order.ts: guide "${g.slug}" does not link /venues/${slug}/ (listed for ${slug})`)
    }
  }
  const known = new Set(readAllGuides().map(g => g.slug))
  for (const guideSlug of listed) {
    if (!known.has(guideSlug)) throw new Error(`src/data/guide-venue-order.ts: no guide named "${guideSlug}" in content/guides/ (listed for ${slug})`)
  }
  const linking = getPublishedGuides().filter(g => g.body.includes(href))
  const first = listed.flatMap(s => linking.filter(g => g.slug === s))
  return [...first, ...linking.filter(g => !listed.includes(g.slug))]
}

/** Published guides listed for a category or neighborhood page in src/data/guide-hubs.ts, in listed order. */
export function getGuidesForHub(path: string): Guide[] {
  const known = new Set(readAllGuides().map(g => g.slug))
  const listed = guideHubs[path] ?? []
  for (const slug of listed) {
    if (!known.has(slug)) throw new Error(`src/data/guide-hubs.ts: no guide named "${slug}" in content/guides/ (listed for ${path})`)
  }
  const published = getPublishedGuides()
  return listed.flatMap(slug => published.filter(g => g.slug === slug))
}

/** Whether /guides/ is built at all, and so whether anything may link to it. */
export function hasGuides(): boolean {
  return getPublishedGuides().length > 0
}

export interface SiteUpdate {
  date: string
  text: string
}

/** Entries from src/data/updates.json, newest first. */
export function getSiteUpdates(): SiteUpdate[] {
  return readUpdates()
}

/** The footer links /updates/ only once it has enough entries to be worth a visit. */
export const UPDATES_FOOTER_THRESHOLD = 3
