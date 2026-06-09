import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllVenues, getAllNeighborhoods, neighborhoodToSlug } from '@/lib/venues'
import VenueCard from '@/components/venue/VenueCard'

export const metadata: Metadata = {
  title: 'Off Broadway Nashville | Find Live Music Beyond Broadway',
  description: 'Find the best live music in Nashville beyond Broadway. Listening rooms, honky tonks, songwriter rounds, jazz clubs, and more — neighborhood by neighborhood.',
}

const featuredNeighborhoods = [
  { name: 'East Nashville', description: 'Indie, rock, and the local scene' },
  { name: 'The Gulch', description: 'Bluegrass, jazz, and upscale nights' },
  { name: 'Midtown', description: 'Country honky tonks near Music Row' },
  { name: 'SoBro', description: 'Songwriter rounds and river views' },
  { name: "Printer's Alley", description: 'Blues, jazz, and late nights' },
  { name: 'Music Valley', description: 'Near the Opry, real country music' },
  { name: 'West End', description: 'Rock venues and neighborhood bars' },
  { name: 'Germantown', description: 'Touring acts, acclaimed dining, and craft beer' },
]

const experiences = [
  {
    label: 'Songwriter Rounds',
    href: '/categories/songwriter-rounds',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="17.5" rx="4.5" ry="3.5"/>
        <circle cx="12" cy="17.5" r="1.3"/>
        <line x1="12" y1="14" x2="12" y2="6"/>
        <line x1="10" y1="5.5" x2="14" y2="5.5"/>
        <line x1="10.5" y1="7.5" x2="13.5" y2="7.5"/>
      </svg>
    ),
  },
  {
    label: 'Listening Rooms',
    href: '/categories/listening-rooms',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 14a9 9 0 0 1 18 0"/>
        <path d="M3 14v4a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1z"/>
        <path d="M21 14v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1z"/>
      </svg>
    ),
  },
  {
    label: 'Honky Tonks',
    href: '/categories/honky-tonks',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 13Q9 8.5 12 8.5Q15 8.5 16 13"/>
        <path d="M4 15.5Q4 17.5 7 17.5h10Q20 17.5 20 15.5"/>
        <line x1="5.5" y1="13" x2="18.5" y2="13"/>
      </svg>
    ),
  },
  {
    label: 'Jazz Clubs',
    href: '/categories/jazz-clubs',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="18" r="2"/>
        <circle cx="15" cy="16" r="2"/>
        <line x1="8" y1="18" x2="8" y2="8"/>
        <line x1="17" y1="16" x2="17" y2="6"/>
        <line x1="8" y1="8" x2="17" y2="6"/>
      </svg>
    ),
  },
  {
    label: 'Karaoke Bars',
    href: '/categories/karaoke-bars',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="2" width="6" height="11" rx="3"/>
        <path d="M5 11a7 7 0 0 0 14 0"/>
        <line x1="12" y1="18" x2="12" y2="21"/>
        <line x1="9" y1="21" x2="15" y2="21"/>
      </svg>
    ),
  },
  {
    label: 'Concert Venues',
    href: '/categories/concert-venues',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="1"/>
        <line x1="15" y1="6" x2="15" y2="18"/>
        <path d="M2 10.5a2 2 0 0 0 0 3"/>
        <path d="M22 10.5a2 2 0 0 1 0 3"/>
      </svg>
    ),
  },
  {
    label: 'Dinner & A Show',
    href: '/categories/dinner-and-a-show',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v6a3 3 0 0 0 3 3v11"/>
        <path d="M5 2v5M7 2v5"/>
        <line x1="17" y1="2" x2="17" y2="22"/>
        <path d="M14 2v7a2 2 0 0 0 2 2h2"/>
      </svg>
    ),
  },
  {
    label: 'Bluegrass',
    href: '/categories/bluegrass',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="15" r="5.5"/>
        <circle cx="10" cy="15" r="2"/>
        <path d="M14.5 10.5L19.5 5"/>
        <line x1="18" y1="3.5" x2="21" y2="6.5"/>
      </svg>
    ),
  },
]

export default function HomePage() {
  const venues = getAllVenues()
  const featuredVenues = venues.filter(v =>
    ['the-station-inn', 'the-bluebird-cafe', 'the-ryman-auditorium', 'rudy-s-jazz-room', 'the-basement-east', 'santa-s-pub'].includes(v.slug)
  ).slice(0, 3)

  // fallback if slugs don't match perfectly
  const displayVenues = featuredVenues.length >= 3 ? featuredVenues : venues.slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="bg-ink text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="section-label text-stone-500 mb-4">Nashville Live Music Guide</div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-3xl">
            Find Live Music in Nashville{' '}
            <span className="text-accent">Beyond Broadway</span>
          </h1>
          <p className="text-stone-400 text-lg max-w-xl leading-relaxed mb-8">
            Nashville's music scene goes way beyond the honky-tonk strip. This is your guide to the listening rooms, songwriter rounds, jazz clubs, and neighborhood venues that locals actually go to.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/venues" className="btn-primary px-6 py-3 text-base">
              Browse All Venues
            </Link>
            <Link href="/neighborhoods" className="btn-outline px-6 py-3 text-base border-stone-700 text-stone-300 hover:bg-stone-800 hover:text-white">
              Browse by Neighborhood
            </Link>
          </div>
        </div>
      </section>

      {/* Browse by Experience */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl font-semibold text-ink mb-8">Browse by Experience</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {experiences.map(exp => (
              <Link
                key={exp.href}
                href={exp.href}
                className="bg-white border border-border rounded-lg p-4 hover:border-accent hover:shadow-sm transition-all group"
              >
                <div className="mb-2.5 text-muted group-hover:text-accent transition-colors">
                  {exp.icon}
                </div>
                <div className="text-sm font-medium text-ink group-hover:text-accent transition-colors">
                  {exp.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Venues */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="section-label mb-3">Worth the trip</div>
          <h2 className="font-display text-3xl font-semibold text-ink mb-8">A Few Places to Start</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {displayVenues.map(venue => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
          <Link href="/venues" className="btn-outline">
            See all {venues.length} venues →
          </Link>
        </div>
      </section>

      {/* Browse by Neighborhood */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-6xl mx-auto">
          <div className="section-label mb-3">Explore the city</div>
          <h2 className="font-display text-3xl font-semibold text-ink mb-8">Browse by Neighborhood</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredNeighborhoods.map(n => (
              <Link
                key={n.name}
                href={`/neighborhoods/${neighborhoodToSlug(n.name)}`}
                className="bg-white border border-border rounded-lg p-5 hover:border-accent hover:shadow-sm transition-all group"
              >
                <div className="font-display font-semibold text-ink group-hover:text-accent transition-colors mb-1">
                  {n.name}
                </div>
                <div className="text-xs text-muted">{n.description}</div>
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <Link href="/neighborhoods" className="btn-outline">
              All neighborhoods →
            </Link>
          </div>
        </div>
      </section>

      {/* Why this site exists */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <div className="section-label mb-3">About this guide</div>
          <h2 className="font-display text-3xl font-semibold text-ink mb-4">
            Nashville's Music Scene is Bigger Than Broadway
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            If you've spent any time on Lower Broad, you know the scene: cover bands, celebrity bars, $20 drinks, and a crowd that's mostly there for the party rather than the music. That's fine. But it's not the whole picture.
          </p>
          <p className="text-muted leading-relaxed mb-6">
            Off Broadway Nashville exists to help you find the other side of this city: the listening rooms where songwriters play the hits they wrote for other people, the East Nashville dives where local bands pack the room, the jazz club in the Gulch that most visitors walk right past.
          </p>
          <Link href="/venues" className="btn-primary px-6 py-3">
            Start Exploring
          </Link>
        </div>
      </section>
    </>
  )
}
