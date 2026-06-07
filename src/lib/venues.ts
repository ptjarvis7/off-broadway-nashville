import venuesData from '@/data/venues.json'
import type { Venue, VenuesData } from '@/types'

const data = venuesData as VenuesData

export function getAllVenues(): Venue[] {
  return data.venues.filter(v => v.status === 'active')
}

export function getVenueBySlug(slug: string): Venue | undefined {
  return data.venues.find(v => v.slug === slug && v.status === 'active')
}

export function getVenuesByNeighborhood(neighborhood: string): Venue[] {
  return getAllVenues().filter(v => v.neighborhood === neighborhood)
}

export function getVenuesByType(type: string): Venue[] {
  return getAllVenues().filter(v => v.venueTypeTags.includes(type))
}

export function getVenuesByGenre(genre: string): Venue[] {
  return getAllVenues().filter(v => v.genreTags.includes(genre))
}

export function getVenuesByBestFor(tag: string): Venue[] {
  return getAllVenues().filter(v => v.bestForTags.includes(tag))
}

export function getAllNeighborhoods(): string[] {
  const all = getAllVenues().map(v => v.neighborhood)
  return Array.from(new Set(all)).sort()
}

export function getAllVenueTypes(): string[] {
  const all = getAllVenues().flatMap(v => v.venueTypeTags)
  return Array.from(new Set(all)).sort()
}

export function getAllGenres(): string[] {
  const all = getAllVenues().flatMap(v => v.genreTags)
  return Array.from(new Set(all)).sort()
}

export function getAllBestForTags(): string[] {
  const all = getAllVenues().flatMap(v => v.bestForTags)
  return Array.from(new Set(all)).sort()
}

export function getSimilarVenues(venue: Venue, limit = 3): Venue[] {
  return getAllVenues()
    .filter(v => v.slug !== venue.slug)
    .map(v => {
      let score = 0
      if (v.neighborhood === venue.neighborhood) score += 3
      venue.genreTags.forEach(g => { if (v.genreTags.includes(g)) score += 2 })
      venue.venueTypeTags.forEach(t => { if (v.venueTypeTags.includes(t)) score += 2 })
      venue.bestForTags.forEach(b => { if (v.bestForTags.includes(b)) score += 1 })
      return { venue: v, score }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(r => r.venue)
}

export function getNeighborhoodSlugs(): string[] {
  return getAllNeighborhoods().map(n =>
    n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  )
}

export function neighborhoodToSlug(neighborhood: string): string {
  return neighborhood.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function slugToNeighborhood(slug: string): string | undefined {
  return getAllNeighborhoods().find(n => neighborhoodToSlug(n) === slug)
}
