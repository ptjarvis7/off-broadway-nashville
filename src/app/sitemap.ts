import type { MetadataRoute } from 'next'
import { getAllVenues, getNeighborhoodsWithPages, neighborhoodToSlug } from '@/lib/venues'
import { getCategoriesWithPages, venueInCategory } from '@/lib/categories'
import { assertRedirectsMatchRemovedPages } from '@/lib/redirects'
import { canonicalUrl } from '@/lib/seo'
import type { Venue } from '@/types'

export const revalidate = false

/**
 * Newest lastUpdated among the given venues. Deriving lastmod from the data
 * rather than from build time keeps the sitemap stable across rebuilds, so a
 * date only moves when the page's content actually moved.
 */
function newestUpdate(venues: Venue[]): Date {
  const newest = venues.reduce((max, v) => (v.lastUpdated > max ? v.lastUpdated : max), '1970-01-01')
  return new Date(`${newest}T00:00:00Z`)
}

export default function sitemap(): MetadataRoute.Sitemap {
  // The sitemap is the build's URL inventory, so it is also where the build
  // fails if vercel.json redirects drift from the hasPage flags.
  assertRedirectsMatchRemovedPages()

  const venues = getAllVenues()
  const neighborhoods = getNeighborhoodsWithPages()
  const siteUpdated = newestUpdate(venues)

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: canonicalUrl('/'), lastModified: siteUpdated, changeFrequency: 'weekly', priority: 1 },
    { url: canonicalUrl('/venues'), lastModified: siteUpdated, changeFrequency: 'weekly', priority: 0.9 },
    { url: canonicalUrl('/neighborhoods'), lastModified: siteUpdated, changeFrequency: 'monthly', priority: 0.8 },
    { url: canonicalUrl('/categories'), lastModified: siteUpdated, changeFrequency: 'monthly', priority: 0.8 },
  ]

  const venueRoutes: MetadataRoute.Sitemap = venues.map(venue => ({
    url: canonicalUrl(`/venues/${venue.slug}`),
    lastModified: new Date(`${venue.lastUpdated}T00:00:00Z`),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const neighborhoodRoutes: MetadataRoute.Sitemap = neighborhoods.map(n => ({
    url: canonicalUrl(`/neighborhoods/${neighborhoodToSlug(n)}`),
    lastModified: newestUpdate(venues.filter(v => v.neighborhood === n)),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const categoryRoutes: MetadataRoute.Sitemap = getCategoriesWithPages().map(cat => ({
    url: canonicalUrl(`/categories/${cat.slug}`),
    lastModified: newestUpdate(venues.filter(v => venueInCategory(v, cat))),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...venueRoutes, ...neighborhoodRoutes, ...categoryRoutes]
}
