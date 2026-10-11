import Link from 'next/link'
import { AUTHOR_NAME, AUTHOR_PATH } from '@/lib/seo'

export default function Byline({ className = '' }: { className?: string }) {
  return (
    <p className={`text-xs text-muted ${className}`}>
      Written by{' '}
      <Link href={AUTHOR_PATH} rel="author" className="underline underline-offset-2 hover:text-accent transition-colors">
        {AUTHOR_NAME}
      </Link>
    </p>
  )
}
