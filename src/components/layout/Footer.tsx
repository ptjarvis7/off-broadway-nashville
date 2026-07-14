import Link from 'next/link'

const neighborhoods = [
  'East Nashville', 'Midtown', 'The Gulch', 'SoBro',
  'Music Valley', "Printer's Alley", 'West End', 'Germantown'
]

const categories = [
  { label: 'Listening Rooms', href: '/categories/listening-rooms' },
  { label: 'Songwriter Rounds', href: '/categories/songwriter-rounds' },
  { label: 'Honky Tonks', href: '/categories/honky-tonks' },
  { label: 'Jazz Clubs', href: '/categories/jazz-clubs' },
  { label: 'Karaoke Bars', href: '/categories/karaoke-bars' },
  { label: 'Concert Venues', href: '/categories/concert-venues' },
]

export default function Footer() {
  return (
    <footer className="bg-ink text-white mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="mb-4">
              <div className="font-display font-semibold text-xl leading-none">Off Broadway</div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-stone-400 mt-0.5">Nashville</div>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed">
              Nashville live music beyond the Broadway strip. A local's take on where to go instead.
            </p>
          </div>
          <div>
            <div className="section-label text-stone-500 mb-3">Neighborhoods</div>
            <ul className="space-y-1.5">
              {neighborhoods.map(n => (
                <li key={n}>
                  <Link
                    href={`/neighborhoods/${n.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    className="text-sm text-stone-400 hover:text-white transition-colors"
                  >
                    {n}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="section-label text-stone-500 mb-3">Categories</div>
            <ul className="space-y-1.5">
              {categories.map(c => (
                <li key={c.href}>
                  <Link href={c.href} className="text-sm text-stone-400 hover:text-white transition-colors">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-stone-800 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-stone-600 text-xs">
          <span>© {new Date().getFullYear()} Off Broadway Nashville. Built for live music lovers.</span>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-stone-400 transition-colors">About</Link>
            <Link href="/contact" className="hover:text-stone-400 transition-colors">Contact</Link>
            <Link href="/privacy" className="hover:text-stone-400 transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
