import Link from 'next/link'
import HeaderNav from './HeaderNav'

export default function Header() {
  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      {/* Phones get the nav on its own row under the logo so all four links fit
          at 375px; from sm up it sits beside the logo as before. */}
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between sm:h-14">
        <Link href="/" className="flex flex-col leading-none h-14 justify-center self-start sm:self-auto">
          <span className="font-display font-semibold text-lg text-ink tracking-tight">Off Broadway</span>
          <span className="text-[10px] tracking-[0.2em] uppercase text-muted font-body">Nashville</span>
        </Link>
        <HeaderNav />
      </div>
    </header>
  )
}
