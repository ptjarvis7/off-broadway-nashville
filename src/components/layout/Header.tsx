import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-display font-semibold text-lg text-ink tracking-tight">Off Broadway</span>
          <span className="text-[10px] tracking-[0.2em] uppercase text-muted font-body">Nashville</span>
        </Link>
        <nav className="flex items-center gap-5">
          <Link href="/neighborhoods" className="text-sm text-muted hover:text-ink transition-colors font-body hidden sm:block">
            Neighborhoods
          </Link>
          <Link href="/categories" className="text-sm text-muted hover:text-ink transition-colors font-body hidden sm:block">
            Categories
          </Link>
          <Link href="/venues" className="btn-primary text-xs px-3 py-1.5">
            Find Music
          </Link>
        </nav>
      </div>
    </header>
  )
}
