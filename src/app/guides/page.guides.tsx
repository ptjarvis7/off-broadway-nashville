import Link from 'next/link'
import type { Metadata } from 'next'
import { getPublishedGuides } from '@/lib/content'
import { pageMetadata, formatDate } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'

// Only routed when at least one guide is published (see next.config.js).

export const metadata: Metadata = pageMetadata({
  title: 'Nashville Live Music Guides',
  description: 'Guides to live music in Nashville beyond Broadway, written by a local.',
  path: '/guides',
})

export default function GuidesPage() {
  const guides = getPublishedGuides()

  return (
    <div className="min-h-screen bg-cream">
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Guides' }])} />
      <div className="bg-white border-b border-border py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl font-bold text-ink mb-4">Guides</h1>
          <p className="text-muted leading-relaxed">Longer reads on live music in Nashville beyond Broadway.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <ul className="space-y-4">
          {guides.map(guide => (
            <li key={guide.slug}>
              <Link
                href={`/guides/${guide.slug}/`}
                className="block bg-white border border-border rounded-lg p-5 hover:border-accent hover:shadow-sm transition-all group"
              >
                <h2 className="font-display text-xl font-semibold text-ink group-hover:text-accent transition-colors mb-1">
                  {guide.title}
                </h2>
                <p className="text-sm text-muted leading-relaxed mb-2">{guide.description}</p>
                <p className="text-xs text-muted">
                  Updated <time dateTime={guide.dateModified}>{formatDate(guide.dateModified)}</time>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
