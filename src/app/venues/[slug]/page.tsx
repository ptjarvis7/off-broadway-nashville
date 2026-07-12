import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllVenues, getVenueBySlug, getSimilarVenues, neighborhoodToSlug } from '@/lib/venues'
import VenueCard from '@/components/venue/VenueCard'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const venues = getAllVenues()
  return venues.map(v => ({ slug: v.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const venue = getVenueBySlug(slug)
  if (!venue) return {}
  return {
    title: `${venue.name} | Off Broadway Nashville`,
    description: venue.shortDescription,
  }
}

export default async function VenuePage({ params }: Props) {
  const { slug } = await params
  const venue = getVenueBySlug(slug)
  if (!venue) notFound()

  const similar = getSimilarVenues(venue, 3)

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'MusicVenue',
    name: venue.name,
    description: venue.shortDescription,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nashville',
      addressRegion: 'TN',
      addressCountry: 'US',
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <div className="min-h-screen bg-cream">
        <div className="bg-white border-b border-border px-4 py-3">
          <div className="max-w-4xl mx-auto text-xs text-muted flex items-center gap-2">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <span>›</span>
            <Link href="/venues" className="hover:text-accent transition-colors">Venues</Link>
            <span>›</span>
            <Link href={`/neighborhoods/${neighborhoodToSlug(venue.neighborhood)}`} className="hover:text-accent transition-colors">{venue.neighborhood}</Link>
            <span>›</span>
            <span className="text-ink">{venue.name}</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="section-label mb-2">{venue.neighborhood}</div>
              <h1 className="font-display text-4xl font-bold text-ink mb-4 leading-tight">{venue.name}</h1>
              <div className="flex flex-wrap gap-2 mb-6">
                {venue.venueTypeTags.map(tag => <span key={tag} className="tag-pill">{tag}</span>)}
                {venue.genreTags.map(tag => <span key={tag} className="tag-pill-accent">{tag}</span>)}
              </div>
              <p className="text-lg text-muted leading-relaxed mb-8 border-l-2 border-accent pl-4">{venue.shortDescription}</p>
              {venue.whatToExpect && (
                <div className="bg-white border border-border rounded-lg p-6 mb-6">
                  <h2 className="font-display text-xl font-semibold text-ink mb-3">What to Expect</h2>
                  <p className="text-muted leading-relaxed">{venue.whatToExpect}</p>
                </div>
              )}
              <div className="mb-8">
                <h2 className="font-display text-xl font-semibold text-ink mb-3">Best For</h2>
                <div className="flex flex-wrap gap-2">
                  {venue.bestForTags.map(tag => <span key={tag} className="bg-accent-light text-accent px-3 py-1.5 rounded-full text-sm font-medium">{tag}</span>)}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white border border-border rounded-lg p-5 sticky top-20">
                <h3 className="font-display font-semibold text-ink mb-4">Venue Info</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="section-label mb-1">Neighborhood</div>
                    <Link href={`/neighborhoods/${neighborhoodToSlug(venue.neighborhood)}`} className="text-accent hover:underline">{venue.neighborhood}</Link>
                  </div>
                  <div>
                    <div className="section-label mb-1">Type</div>
                    <div className="text-ink">{venue.venueTypeTags.join(', ')}</div>
                  </div>
                  <div>
                    <div className="section-label mb-1">Genre</div>
                    <div className="text-ink">{venue.genreTags.join(', ')}</div>
                  </div>
                  {venue.officialWebsite && (
                    <div>
                      <div className="section-label mb-1">Website</div>
                      <a href={venue.officialWebsite} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Official website →</a>
                    </div>
                  )}
                </div>
                <div className="border-t border-border mt-5 pt-5">
                  <Link href="/venues" className="btn-outline w-full justify-center text-xs">← Back to all venues</Link>
                </div>
              </div>
            </div>
          </div>

          {similar.length > 0 && (
            <div className="mt-14">
              <div className="section-label mb-3">You might also like</div>
              <h2 className="font-display text-2xl font-semibold text-ink mb-6">Similar Venues</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {similar.map(v => <VenueCard key={v.id} venue={v} compact />)}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
