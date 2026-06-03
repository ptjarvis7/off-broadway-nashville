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
  { name: 'Germantown', description: 'Bowling, touring acts, and more' },
]

const experiences = [
  { label: 'Songwriter Rounds', href: '/categories/songwriter-rounds', emoji: '🎸' },
  { label: 'Listening Rooms', href: '/categories/listening-rooms', emoji: '🎵' },
  { label: 'Honky Tonks', href: '/categories/honky-tonks', emoji: '🤠' },
  { label: 'Jazz Clubs', href: '/categories/jazz-clubs', emoji: '🎷' },
  { label: 'Karaoke Bars', href: '/categories/karaoke-bars', emoji: '🎤' },
  { label: 'Concert Venues', href: '/categories/concert-venues', emoji: '🎟️' },
  { label: 'Dinner & a Show', href: '/categories/dinner-and-a-show', emoji: '🍽️' },
  { label: 'Bluegrass', href: '/categories/bluegrass', emoji: '🪕' },
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
          <div className="section-label mb-3">What are you looking for?</div>
          <h2 className="font-display text-3xl font-semibold text-ink mb-8">Browse by Experience</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {experiences.map(exp => (
              <Link
                key={exp.href}
                href={exp.href}
                className="bg-white border border-border rounded-lg p-4 hover:border-accent hover:shadow-sm transition-all group"
              >
                <div className="text-2xl mb-2">{exp.emoji}</div>
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
            If you've spent any time on Lower Broad, you know the scene: cover bands, celebrity bars, $20 beers, and a crowd that's mostly there for the experience rather than the music. That's fine. But it's not the whole picture.
          </p>
          <p className="text-muted leading-relaxed mb-6">
            Off Broadway Nashville exists to help you find the other side of this city — the listening rooms where songwriters play the hits they wrote for other people, the East Nashville dives where local bands pack the room, the jazz club in the Gulch that most tourists never find.
          </p>
          <Link href="/venues" className="btn-primary px-6 py-3">
            Start Exploring
          </Link>
        </div>
      </section>
    </>
  )
}
