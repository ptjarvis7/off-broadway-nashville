import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import Link from 'next/link'
import { getCategoriesWithPages } from '@/lib/categories'

export const metadata: Metadata = pageMetadata({
  title: 'Nashville Live Music Categories',
  description: 'Browse Nashville live music venues by category. Listening rooms, songwriter rounds, honky tonks, jazz clubs, karaoke bars, and more.',
  path: '/categories',
})

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
          {getCategoriesWithPages().map(cat => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}/`}
              className="bg-white border border-border rounded-lg p-6 hover:border-accent hover:shadow-sm transition-all group"
            >
              <h2 className="font-display font-semibold text-lg text-ink group-hover:text-accent transition-colors mb-2">
                {cat.shortTitle}
              </h2>
              <p className="text-sm text-muted leading-relaxed">{cat.teaser}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
