import type { Metadata } from 'next'
import { getAllVenues, getAllNeighborhoods, getAllVenueTypes, getAllGenres, getAllBestForTags } from '@/lib/venues'
import VenuesDirectory from '@/components/venue/VenuesDirectory'

export const metadata: Metadata = {
  title: 'All Nashville Live Music Venues | Off Broadway Nashville',
  description: 'Browse all live music venues in Nashville beyond Broadway. Filter by neighborhood, venue type, genre, and experience.',
}

export default function VenuesPage() {
  const venues = getAllVenues()
  const neighborhoods = getAllNeighborhoods()
  const venueTypes = getAllVenueTypes()
  const genres = getAllGenres()
  const bestForTags = getAllBestForTags()

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-white border-b border-border py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="section-label mb-2">The full list</div>
          <h1 className="font-display text-4xl font-bold text-ink mb-3">Nashville Live Music Venues</h1>
          <p className="text-muted max-w-xl">
            {venues.length} venues across {neighborhoods.length} Nashville neighborhoods. Use the filters to find exactly what you're looking for tonight.
          </p>
        </div>
      </div>
      <VenuesDirectory venues={venues} neighborhoods={neighborhoods} venueTypes={venueTypes} genres={genres} bestForTags={bestForTags} />
    </div>
  )
}
