export interface Venue {
  id: number
  name: string
  slug: string
  neighborhood: string
  venueTypeTags: string[]
  genreTags: string[]
  bestForTags: string[]
  shortDescription: string
  officialWebsite: string | null
  status: 'active' | 'inactive'
  lastUpdated: string
  whatToExpect?: string
  /** Optional one-liner shown on cards in category and neighborhood listings. */
  cardHook?: string
}

export interface VenuesData {
  meta: {
    city: string
    version: string
    venueCount: number
    lastUpdated: string
  }
  venues: Venue[]
}

export type FilterState = {
  neighborhood: string
  venueType: string
  genre: string
  bestFor: string
}
