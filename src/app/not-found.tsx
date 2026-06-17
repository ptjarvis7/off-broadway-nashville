import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-20">
      <div className="max-w-lg text-center">
        <div className="section-label mb-3">404</div>
        <h1 className="font-display text-3xl font-bold text-ink mb-4">
          This page packed up and left town.
        </h1>
        <p className="text-muted leading-relaxed mb-8">
          We couldn't find what you were looking for. It might have moved, or the link might be off. Try heading back to the directory or browsing by neighborhood instead.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/venues" className="btn-primary px-6 py-3 text-base">
            Browse All Venues
          </Link>
          <Link href="/neighborhoods" className="btn-outline px-6 py-3 text-base">
            Browse by Neighborhood
          </Link>
        </div>
      </div>
    </div>
  )
}
