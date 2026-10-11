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
  /** Practical details, each rendered only when filled. */
  knowBeforeYouGo?: KnowBeforeYouGo
  image?: VenueImage
}

export interface KnowBeforeYouGo {
  cover?: string
  payment?: string
  seating?: string
  ages?: string
  parking?: string
  bestNights?: string
}

export interface VenueImage {
  /** Root-relative path, e.g. /images/venues/the-station-inn-1600.webp (output of npm run images). */
  src: string
  alt: string
  width: number
  height: number
  credit?: string
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
