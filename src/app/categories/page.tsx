import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Nashville Live Music Categories | Off Broadway Nashville',
  description: 'Browse Nashville live music venues by category. Listening rooms, songwriter rounds, honky tonks, jazz clubs, karaoke bars, and more.',
}

export const categories = [
  {
    slug: 'listening-rooms',
    title: 'Best Nashville Listening Rooms',
    shortTitle: 'Listening Rooms',
    description: 'Seated venues built for hearing the music, the words, and the stories behind both.',
    filterType: 'venueType',
    filterValue: 'Listening Room',
  },
  {
    slug: 'songwriter-rounds',
    shortTitle: 'Songwriter Rounds',
    title: 'Best Songwriter Rounds in Nashville',
    description: 'Multiple writers share the stage, trading original songs and the stories behind them. This is the format Nashville invented.',
    filterType: 'venueType',
    filterValue: "Writer's Round Venue",
  },
  {
    slug: 'honky-tonks',
    shortTitle: 'Honky Tonks',
    title: 'Best Honky Tonks in Nashville Not on Broadway',
    description: 'Classic country bars with live bands, cold beer, and a crowd that lives here. Beyond the Broadway tourist strip.',
    filterType: 'venueType',
    filterValue: 'Honky Tonk',
  },
  {
    slug: 'concert-venues',
    shortTitle: 'Concert Venues',
    title: 'Best Nashville Concert Venues Beyond Broadway',
    description: 'From intimate clubs to mid-size rooms to historic halls. This is where touring artists play when they\'re not at the arena downtown.',
    filterType: 'venueType',
    filterValue: 'Concert Venue',
  },
  {
    slug: 'jazz-clubs',
    shortTitle: 'Jazz Clubs',
    title: 'Best Jazz Clubs in Nashville',
    description: "Nashville has a stronger jazz scene than most visitors realize. These are the spots dedicated to it.",
    filterType: 'venueType',
    filterValue: 'Jazz Club',
  },
  {
    slug: 'karaoke-bars',
    shortTitle: 'Karaoke Bars',
    title: 'Best Karaoke Bars in Nashville',
    description: "From piano bars to double-wide dive bars. Nashville's karaoke scene has more range than you'd expect.",
    filterType: 'venueType',
    filterValue: 'Karaoke Bar',
  },
  {
    slug: 'dinner-and-a-show',
    shortTitle: 'Dinner & a Show',
    title: 'Best Dinner and a Show Spots in Nashville',
    description: 'Venues where the food and the music are both worth showing up for. Seated, intentional nights out.',
    filterType: 'bestFor',
    filterValue: 'Dinner and a show',
  },
  {
    slug: 'bluegrass',
    shortTitle: 'Bluegrass Venues',
    title: 'Best Nashville Venues for Bluegrass',
    description: "The Station Inn is the anchor, but Nashville's bluegrass scene goes beyond one legendary room.",
    filterType: 'genre',
    filterValue: 'Bluegrass / Roots',
  },
  {
    slug: 'country-music',
    shortTitle: 'Country Music Bars',
    title: 'Best Nashville Bars with Live Country Music Off Broadway',
    description: 'Not cover bands for bachelor parties. Bars where country music is the real draw.',
    filterType: 'genre',
    filterValue: 'Country',
  },
  {
    slug: 'near-the-opry',
    shortTitle: 'Near the Opry',
    title: 'Live Music Near the Grand Ole Opry',
    description: "Venues in Music Valley and around Opryland. Classic country, line dancing, and the real deal near Nashville's most famous stage.",
    filterType: 'bestFor',
    filterValue: 'Near the Opry',
  },
  {
    slug: 'date-night',
    shortTitle: 'Date Night',
    title: 'Best Nashville Music Venues for a Date Night',
    description: 'Intimate rooms, good sound, and something worth talking about after. Music that becomes the evening.',
    filterType: 'bestFor',
    filterValue: 'Date night',
  },
  {
    slug: 'late-night',
    shortTitle: 'Late Night',
    title: 'Best Late Night Live Music in Nashville',
    description: "Where to go when the earlier shows have ended. Venues that keep the music going past midnight.",
    filterType: 'bestFor',
    filterValue: 'Late night',
  },
]

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-white border-b border-border py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="section-label mb-2">Browse by experience</div>
          <h1 className="font-display text-4xl font-bold text-ink mb-3">Nashville Live Music Categories</h1>
          <p className="text-muted max-w-xl">
            Find exactly what you're looking for, whether that's a songwriter round, a jazz club, a honky tonk, or a late-night karaoke bar.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map(cat => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="bg-white border border-border rounded-lg p-6 hover:border-accent hover:shadow-sm transition-all group"
            >
              <h2 className="font-display font-semibold text-lg text-ink group-hover:text-accent transition-colors mb-2">
                {cat.shortTitle}
              </h2>
              <p className="text-sm text-muted leading-relaxed">{cat.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
