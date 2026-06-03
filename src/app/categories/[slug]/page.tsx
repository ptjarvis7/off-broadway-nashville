import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllVenues } from '@/lib/venues'
import VenueCard from '@/components/venue/VenueCard'
import { categories } from '../page'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return categories.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = categories.find(c => c.slug === slug)
  if (!category) return {}
  return {
    title: `${category.title} | Off Broadway Nashville`,
    description: category.description,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = categories.find(c => c.slug === slug)
  if (!category) notFound()

  const allVenues = getAllVenues()

  const venues = allVenues.filter(v => {
    if (category.filterType === 'venueType') return v.venueTypeTags.includes(category.filterValue)
    if (category.filterType === 'genre') return v.genreTags.includes(category.filterValue)
    if (category.filterType === 'bestFor') return v.bestForTags.includes(category.filterValue)
    return false
  })

  const relatedCategories = categories.filter(c => c.slug !== slug).slice(0, 4)

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-white border-b border-border px-4 py-3">
        <div className="max-w-6xl mx-auto text-xs text-muted flex items-center gap-2">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <span>›</span>
          <Link href="/categories" className="hover:text-accent transition-colors">Categories</Link>
          <span>›</span>
          <span className="text-ink">{category.shortTitle}</span>
        </div>
      </div>

      <div className="bg-white border-b border-border py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-3xl mb-3">{category.emoji}</div>
          <h1 className="font-display text-4xl font-bold text-ink mb-4">{category.title}</h1>
          <p className="text-muted max-w-2xl leading-relaxed mb-3">{category.description}</p>
          <div className="text-sm text-muted">{venues.length} venues</div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {venues.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {venues.map(venue => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted">No venues found in this category.</div>
        )}

        <div className="mt-14 pt-8 border-t border-border">
          <div className="section-label mb-4">Keep exploring</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {relatedCategories.map(cat => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="bg-white border border-border rounded-lg p-4 hover:border-accent transition-all group text-center"
              >
                <div className="text-2xl mb-1">{cat.emoji}</div>
                <div className="text-xs font-medium text-ink group-hover:text-accent transition-colors">
                  {cat.shortTitle}
                </div>
              </Link>
            ))}
          </div>
          <Link href="/venues" className="btn-outline">← Browse all venues</Link>
        </div>
      </div>
    </div>
  )
}
