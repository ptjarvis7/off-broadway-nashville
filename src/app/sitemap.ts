import type { MetadataRoute } from 'next'
import { getAllVenues, getAllNeighborhoods, neighborhoodToSlug } from '@/lib/venues'
import { categories } from '@/app/categories/page'

export const revalidate = false

const BASE_URL = 'https://www.offbroadwaynashville.co'

export default function sitemap(): MetadataRoute.Sitemap {
  const venues = getAllVenues()
  const neighborhoods = getAllNeighborhoods()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/venues`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/neighborhoods`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/categories`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  const venueRoutes: MetadataRoute.Sitemap = venues.map(venue => ({
    url: `${BASE_URL}/venues/${venue.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const neighborhoodRoutes: MetadataRoute.Sitemap = neighborhoods.map(n => ({
    url: `${BASE_URL}/neighborhoods/${neighborhoodToSlug(n)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const categoryRoutes: MetadataRoute.Sitemap = categories.map(cat => ({
    url: `${BASE_URL}/categories/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...venueRoutes, ...neighborhoodRoutes, ...categoryRoutes]
}
