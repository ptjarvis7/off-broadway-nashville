import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getGuideBySlug, getPublishedGuides } from '@/lib/content'
import { renderMarkdown } from '@/lib/markdown'
import { pageMetadata, formatDate } from '@/lib/seo'
import Byline from '@/components/Byline'
import JsonLd from '@/components/JsonLd'
import { articleSchema, breadcrumbSchema } from '@/lib/structured-data'

// Only routed when at least one guide is published (see next.config.js).

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  return getPublishedGuides().map(g => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuideBySlug(slug)
  if (!guide) return {}
  return pageMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    ogType: 'article',
  })
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params
  const guide = getGuideBySlug(slug)
  if (!guide) notFound()

  const path = `/guides/${guide.slug}/`

  return (
    <div className="min-h-screen bg-cream">
      <JsonLd data={articleSchema({ ...guide, path })} />
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Guides', path: '/guides/' },
        { name: guide.title },
      ])} />
      <div className="bg-white border-b border-border px-4 py-3">
        <div className="max-w-3xl mx-auto text-xs text-muted flex items-center gap-2">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <span>›</span>
          <Link href="/guides/" className="hover:text-accent transition-colors">Guides</Link>
          <span>›</span>
          <span className="text-ink">{guide.title}</span>
        </div>
      </div>

      <article>
        <header className="bg-white border-b border-border py-10 px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-display text-4xl font-bold text-ink mb-4 leading-tight">{guide.title}</h1>
            <p className="text-muted leading-relaxed mb-4">{guide.description}</p>
            <Byline className="mb-1" />
            <p className="text-xs text-muted">
              Published <time dateTime={guide.datePublished}>{formatDate(guide.datePublished)}</time>
              {' · '}Updated <time dateTime={guide.dateModified}>{formatDate(guide.dateModified)}</time>
            </p>
          </div>
        </header>
        <div className="max-w-3xl mx-auto px-4 py-10">
          <div className="guide-body" dangerouslySetInnerHTML={{ __html: renderMarkdown(guide.body) }} />
          <div className="mt-12 pt-8 border-t border-border">
            <Link href="/guides/" className="btn-outline">← All guides</Link>
          </div>
        </div>
      </article>
    </div>
  )
}
