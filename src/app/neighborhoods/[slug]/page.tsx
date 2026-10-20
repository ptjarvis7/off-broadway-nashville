import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getNeighborhoodsWithPages, getVenuesByNeighborhood, slugToNeighborhood, neighborhoodToSlug } from '@/lib/venues'
import { neighborhoodIntros, neighborhoodIntroMore, neighborhoodFaqs } from '@/data/neighborhoods'
import { pageMetadata, venueCount, venueNameList } from '@/lib/seo'
import VenueCard from '@/components/venue/VenueCard'
import FAQ from '@/components/FAQ'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema, collectionPageSchema, faqSchema } from '@/lib/structured-data'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getNeighborhoodsWithPages().map(n => ({ slug: neighborhoodToSlug(n) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const neighborhood = slugToNeighborhood(slug)
  if (!neighborhood) return {}
  const venues = getVenuesByNeighborhood(neighborhood)
  const where = `${neighborhood}${neighborhood.includes('Nashville') ? '' : ', Nashville'}`
  return pageMetadata({
    title: `Live Music in ${neighborhood}`,
    description: `Find the best live music venues in ${where}. ${venueCount(venues.length)} including ${venueNameList(venues.map(v => v.name))}.`,
    path: `/neighborhoods/${neighborhoodToSlug(neighborhood)}`,
  })
}

export default async function NeighborhoodPage({ params }: Props) {
  const { slug } = await params
  const neighborhood = slugToNeighborhood(slug)
  if (!neighborhood) notFound()

  const venues = getVenuesByNeighborhood(neighborhood)
  const intro = neighborhoodIntros[neighborhood] || `Live music venues in ${neighborhood}${neighborhood.includes('Nashville') ? '' : ', Nashville'}.`
  const introMore = neighborhoodIntroMore[neighborhood]
  const faqs = neighborhoodFaqs[neighborhood]
  const path = `/neighborhoods/${slug}/`

  return (
    <div className="min-h-screen bg-cream">
      <JsonLd data={collectionPageSchema({ name: `Live Music in ${neighborhood}`, description: intro, path, venues })} />
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Neighborhoods', path: '/neighborhoods/' },
        { name: neighborhood },
      ])} />
      {faqs && faqs.length > 0 && <JsonLd data={faqSchema(faqs)} />}
      <div className="bg-white border-b border-border px-4 py-3">
        <div className="max-w-6xl mx-auto text-xs text-muted flex items-center gap-2">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <span>›</span>
          <Link href="/neighborhoods/" className="hover:text-accent transition-colors">Neighborhoods</Link>
          <span>›</span>
          <span className="text-ink">{neighborhood}</span>
        </div>
      </div>

      <div className="bg-white border-b border-border py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="section-label mb-2">Nashville neighborhood</div>
          <h1 className="font-display text-4xl font-bold text-ink mb-4">Live Music in {neighborhood}</h1>
          <p className="text-muted max-w-2xl leading-relaxed mb-3">{intro}</p>
          <div className="text-sm text-muted">{venueCount(venues.length)} in this neighborhood</div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {venues.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {venues.map(venue => (
              <VenueCard key={venue.id} venue={venue} showDescription={false} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted">No venues found in this neighborhood.</div>
        )}
        {introMore && (
          <div className="mt-12 max-w-2xl space-y-4">
            {introMore.split(/\n\s*\n/).map((para, i) => (
              <p key={i} className="text-muted leading-relaxed">{para.trim()}</p>
            ))}
          </div>
        )}
        <div className="mt-10 pt-8 border-t border-border">
          <Link href="/neighborhoods/" className="btn-outline">← All neighborhoods</Link>
        </div>

        {faqs && <FAQ items={faqs} />}
      </div>
    </div>
  )
}
