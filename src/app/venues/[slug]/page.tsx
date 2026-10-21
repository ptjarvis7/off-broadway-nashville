import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllVenues, getVenueBySlug, getSimilarVenues, neighborhoodToSlug, neighborhoodHasPage } from '@/lib/venues'
import { pageMetadata, formatUpdated } from '@/lib/seo'
import VenueCard from '@/components/venue/VenueCard'
import KnowBeforeYouGo from '@/components/venue/KnowBeforeYouGo'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema, venueSchema, type Crumb } from '@/lib/structured-data'

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
  return pageMetadata({
    title: venue.name,
    description: venue.shortDescription,
    path: `/venues/${venue.slug}`,
    image: venue.image,
  })
}

export default async function VenuePage({ params }: Props) {
  const { slug } = await params
  const venue = getVenueBySlug(slug)
  if (!venue) notFound()

  const similar = getSimilarVenues(venue, 3)
  const neighborhoodHref = neighborhoodHasPage(venue.neighborhood)
    ? `/neighborhoods/${neighborhoodToSlug(venue.neighborhood)}/`
    : null

  const crumbs: Crumb[] = [
    { name: 'Home', path: '/' },
    { name: 'Venues', path: '/venues/' },
    // Neighborhoods without a page are left out rather than linked to a redirect.
    ...(neighborhoodHref ? [{ name: venue.neighborhood, path: neighborhoodHref }] : []),
    { name: venue.name },
  ]
  const image = venue.image
  // npm run images writes <slug>-1600.webp and <slug>-800.webp side by side.
  const smallSrc = image?.src.endsWith('-1600.webp') ? image.src.replace(/-1600\.webp$/, '-800.webp') : null

  return (
    <>
      <JsonLd data={venueSchema(venue)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <div className="min-h-screen bg-cream">
        <div className="bg-white border-b border-border px-4 py-3">
          <div className="max-w-4xl mx-auto text-xs text-muted flex items-center gap-2">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <span>›</span>
            <Link href="/venues/" className="hover:text-accent transition-colors">Venues</Link>
            <span>›</span>
            {neighborhoodHref
              ? <Link href={neighborhoodHref} className="hover:text-accent transition-colors">{venue.neighborhood}</Link>
              : <span>{venue.neighborhood}</span>}
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
              {image && (
                <figure className="mb-8">
                  <img
                    src={image.src}
                    srcSet={smallSrc ? `${smallSrc} 800w, ${image.src} 1600w` : undefined}
                    sizes={smallSrc ? '(min-width: 1024px) 560px, 100vw' : undefined}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="w-full h-auto rounded-lg border border-border"
                  />
                  {image.credit && <figcaption className="text-xs text-muted mt-2">Photo: {image.credit}</figcaption>}
                </figure>
              )}
              <p className="text-lg text-muted leading-relaxed mb-8 border-l-2 border-accent pl-4">{venue.shortDescription}</p>
              {venue.whatToExpect && (
                <div className="bg-white border border-border rounded-lg p-6 mb-6">
                  <h2 className="font-display text-xl font-semibold text-ink mb-3">What to Expect</h2>
                  <p className="text-muted leading-relaxed">{venue.whatToExpect}</p>
                </div>
              )}
              <KnowBeforeYouGo details={venue.knowBeforeYouGo} />
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
                    {neighborhoodHref
                      ? <Link href={neighborhoodHref} className="text-accent hover:underline">{venue.neighborhood}</Link>
                      : <div className="text-ink">{venue.neighborhood}</div>}
                  </div>
                  <div>
                    <div className="section-label mb-1">Type</div>
                    <div className="text-ink">{venue.venueTypeTags.join(', ')}</div>
                  </div>
                  <div>
                    <div className="section-label mb-1">Genre</div>
                    <div className="text-ink">{venue.genreTags.join(', ')}</div>
                  </div>
                  {venue.address && (
                    <div>
                      <div className="section-label mb-1">Address</div>
                      <address className="not-italic text-ink">
                        {venue.address.street}<br />
                        {venue.address.city}, {venue.address.state} {venue.address.zip}
                      </address>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${venue.name}, ${venue.address.street}, ${venue.address.city}, ${venue.address.state} ${venue.address.zip}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline"
                      >
                        Get directions →
                      </a>
                    </div>
                  )}
                  {venue.officialWebsite && (
                    <div>
                      <div className="section-label mb-1">Website</div>
                      <a href={venue.officialWebsite} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Official website →</a>
                    </div>
                  )}
                </div>
                <div className="border-t border-border mt-5 pt-5">
                  <p className="text-xs text-muted mb-3">
                    Updated <time dateTime={venue.lastUpdated}>{formatUpdated(venue.lastUpdated)}</time>
                  </p>
                  <Link href="/venues/" className="btn-outline w-full justify-center text-xs">← Back to all venues</Link>
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
