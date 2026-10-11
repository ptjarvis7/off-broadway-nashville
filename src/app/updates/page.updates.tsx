import type { Metadata } from 'next'
import { getSiteUpdates } from '@/lib/content'
import { pageMetadata, formatDate } from '@/lib/seo'

// Only routed when src/data/updates.json has entries (see next.config.js).

export const metadata: Metadata = pageMetadata({
  title: 'Site Updates',
  description: 'Venues added, closed, moved, or changed on Off Broadway Nashville.',
  path: '/updates',
})

export default function UpdatesPage() {
  const updates = getSiteUpdates()

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-white border-b border-border py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl font-bold text-ink mb-4">Site updates</h1>
          <p className="text-muted leading-relaxed">Venues added, closed, moved, or changed.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <ol className="space-y-6">
          {updates.map((u, i) => (
            <li key={`${u.date}-${i}`} className="border-l-2 border-border pl-4">
              <time dateTime={u.date} className="section-label block mb-1">{formatDate(u.date)}</time>
              <p className="text-muted leading-relaxed">{u.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
