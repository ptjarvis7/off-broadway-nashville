import Link from 'next/link'
import type { Venue } from '@/types'

interface VenueCardProps {
  venue: Venue
  compact?: boolean
}

export default function VenueCard({ venue, compact = false }: VenueCardProps) {
  return (
    <div className="venue-card flex flex-col h-full">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <Link href={`/venues/${venue.slug}`}>
            <h3 className="font-display font-semibold text-lg text-ink hover:text-accent transition-colors leading-tight">
              {venue.name}
            </h3>
          </Link>
          <div className="text-xs text-muted mt-0.5">{venue.neighborhood}</div>
        </div>
      </div>

      {/* Venue type + genre tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {venue.venueTypeTags.slice(0, 2).map(tag => (
          <span key={tag} className="tag-pill">{tag}</span>
        ))}
        {venue.genreTags.map(tag => (
          <span key={tag} className="tag-pill-accent">{tag}</span>
        ))}
      </div>

      {!compact && (
        <p className="text-sm text-muted leading-relaxed mb-4 flex-1">
          {venue.shortDescription}
        </p>
      )}

      {/* Best For tags */}
      <div className="flex flex-wrap gap-1 mb-4">
        {venue.bestForTags.slice(0, 4).map(tag => (
          <span key={tag} className="text-xs text-stone-500 bg-stone-50 px-2 py-0.5 rounded border border-stone-100">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto">
        <Link href={`/venues/${venue.slug}`} className="btn-outline text-xs w-full justify-center">
          View venue →
        </Link>
      </div>
    </div>
  )
}
