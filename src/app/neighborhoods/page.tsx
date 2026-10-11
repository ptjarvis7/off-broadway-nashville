import type { Metadata } from 'next'
import { pageMetadata, venueCount } from '@/lib/seo'
import Link from 'next/link'
import { getNeighborhoodsWithPages, getNeighborhoodsWithoutPages, getNeighborhoodInfo, getVenuesByNeighborhood, neighborhoodToSlug } from '@/lib/venues'

export const metadata: Metadata = pageMetadata({
  title: 'Nashville Live Music by Neighborhood',
  description: 'Explore Nashville live music venues by neighborhood. East Nashville, The Gulch, Midtown, SoBro, Music Valley, and more.',
  path: '/neighborhoods',
})

export default function NeighborhoodsPage() {
  const neighborhoods = getNeighborhoodsWithPages()
  const smallerScenes = getNeighborhoodsWithoutPages()

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-white border-b border-border py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="section-label mb-2">Explore the city</div>
          <h1 className="font-display text-4xl font-bold text-ink mb-3">Nashville by Neighborhood</h1>
          <p className="text-muted max-w-xl">
            Nashville's live music scene spreads across the city. Each neighborhood has its own character. Here's where to start.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {neighborhoods.map(neighborhood => {
            const venues = getVenuesByNeighborhood(neighborhood)
            const slug = neighborhoodToSlug(neighborhood)
            const description = getNeighborhoodInfo(neighborhood)?.blurb

            return (
              <Link
                key={neighborhood}
                href={`/neighborhoods/${slug}/`}
                className="bg-white border border-border rounded-lg p-6 hover:border-accent hover:shadow-sm transition-all group"
              >
                <div className="flex items-start justify-between mb-2">
                  <h2 className="font-display font-semibold text-xl text-ink group-hover:text-accent transition-colors">
                    {neighborhood}
                  </h2>
                  <span className="text-xs text-muted bg-stone-50 border border-stone-100 rounded-full px-2 py-0.5 ml-2 shrink-0">
                    {venueCount(venues.length)}
                  </span>
                </div>
                <p className="text-sm text-muted leading-relaxed">{description}</p>
              </Link>
            )
          })}
        </div>

        <section aria-labelledby="smaller-scenes" className="mt-14">
          <h2 id="smaller-scenes" className="font-display text-2xl font-semibold text-ink mb-6">Smaller scenes</h2>
          <ul className="bg-white border border-border rounded-lg divide-y divide-border">
            {smallerScenes.map(neighborhood => {
              const venues = getVenuesByNeighborhood(neighborhood)
              return (
                <li key={neighborhood} className="p-5 sm:grid sm:grid-cols-3 sm:gap-6">
                  <h3 className="font-display font-semibold text-lg text-ink mb-1 sm:mb-0">{neighborhood}</h3>
                  <p className="text-sm text-muted leading-relaxed mb-3 sm:mb-0">{getNeighborhoodInfo(neighborhood)?.blurb}</p>
                  <ul className="text-sm space-y-1" aria-label={`Venues in ${neighborhood}`}>
                    {venues.map(venue => (
                      <li key={venue.slug}>
                        <Link href={`/venues/${venue.slug}/`} className="text-accent hover:underline">
                          {venue.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ul>
        </section>
      </div>
    </div>
  )
}
