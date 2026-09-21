import type { MetadataRoute } from 'next'
import { getAllVenues, getAllNeighborhoods, neighborhoodToSlug } from '@/lib/venues'
import { categories } from '@/app/categories/page'
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

function matchesCategory(venue: Venue, filterType: string, filterValue: string): boolean {
  if (filterType === 'venueType') return venue.venueTypeTags.includes(filterValue)
  if (filterType === 'genre') return venue.genreTags.includes(filterValue)
  if (filterType === 'bestFor') return venue.bestForTags.includes(filterValue)
  if (filterType === 'neighborhood') return venue.neighborhood === filterValue
  return false
}

export default function sitemap(): MetadataRoute.Sitemap {
  const venues = getAllVenues()
  const neighborhoods = getAllNeighborhoods()
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

  const categoryRoutes: MetadataRoute.Sitemap = categories.map(cat => ({
    url: canonicalUrl(`/categories/${cat.slug}`),
    lastModified: newestUpdate(venues.filter(v => matchesCategory(v, cat.filterType, cat.filterValue))),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...venueRoutes, ...neighborhoodRoutes, ...categoryRoutes]
}
