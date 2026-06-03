import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllNeighborhoods, getVenuesByNeighborhood, neighborhoodToSlug } from '@/lib/venues'

export const metadata: Metadata = {
  title: 'Nashville Live Music by Neighborhood | Off Broadway Nashville',
  description: 'Explore Nashville live music venues by neighborhood. East Nashville, The Gulch, Midtown, SoBro, Music Valley, and more.',
}

const neighborhoodDescriptions: Record<string, string> = {
  'East Nashville': 'The indie heart of the city. Local bands, divey rooms, and a scene that feels like Nashville before the boom.',
  'The Gulch': 'Bluegrass legends, jazz clubs, and record store venues. More depth than the neighborhood gets credit for.',
  'Midtown': 'Music Row is right here. Songwriter bars, honky tonks, and spots where industry people actually drink.',
  'SoBro': 'Downtown-adjacent without being Broadway. Listening rooms, outdoor stages, and river views.',
  'Music Valley': 'Near the Opry. Classic country, line dancing, and venues that feel like Nashville used to.',
  "Printer's Alley": 'The old late-night strip. Blues, jazz, karaoke, and a few spots that have been here for decades.',
  'West End': 'Historic rock venues, neighborhood bars, and a couple of Nashville institutions worth knowing.',
  'Germantown': 'Newer but not generic. Brooklyn Bowl anchors it, with a few other spots worth the trip north.',
  'Green Hills': 'The Bluebird Cafe is here. That alone makes it worth the drive.',
  'Wedgewood-Houston': "Santa's Pub is here. Enough said.",
  'Berry Hill': 'Just south of downtown. A distillery tavern and a laid-back vibe away from the tourist core.',
  'Madison': "Dee's Country Cocktail Lounge. A real local honky tonk north of the city.",
  'The Nations': 'West Nashville neighborhood bar territory. Casual, local, and worth knowing about.',
  'West Nashville': 'Ray Stevens built a showroom out here. Old-school Nashville entertainment.',
  'Hillsboro Village': 'Quiet neighborhood venue energy. Good for a songwriter round without the crowds.',
  'Marathon Village': 'Marathon Music Works is the anchor. Mid-size shows in an industrial converted space.',
  '8th Ave S': 'The Basement is here, along with a couple of smaller spots on the corridor south of downtown.',
  'Downtown': 'The Ryman, Municipal Auditorium, and a few honky tonks that exist outside the Broadway bubble.',
}

export default function NeighborhoodsPage() {
  const neighborhoods = getAllNeighborhoods()

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-white border-b border-border py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="section-label mb-2">Explore the city</div>
          <h1 className="font-display text-4xl font-bold text-ink mb-3">Nashville by Neighborhood</h1>
          <p className="text-muted max-w-xl">
            Nashville's live music scene spreads across the city. Each neighborhood has its own character — here's where to start.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {neighborhoods.map(neighborhood => {
            const venues = getVenuesByNeighborhood(neighborhood)
            const slug = neighborhoodToSlug(neighborhood)
            const description = neighborhoodDescriptions[neighborhood] || `${venues.length} live music venues in ${neighborhood}.`

            return (
              <Link
                key={neighborhood}
                href={`/neighborhoods/${slug}`}
                className="bg-white border border-border rounded-lg p-6 hover:border-accent hover:shadow-sm transition-all group"
              >
                <div className="flex items-start justify-between mb-2">
                  <h2 className="font-display font-semibold text-xl text-ink group-hover:text-accent transition-colors">
                    {neighborhood}
                  </h2>
                  <span className="text-xs text-muted bg-stone-50 border border-stone-100 rounded-full px-2 py-0.5 ml-2 shrink-0">
                    {venues.length} venues
                  </span>
                </div>
                <p className="text-sm text-muted leading-relaxed">{description}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
