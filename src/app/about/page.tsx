import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | Off Broadway Nashville',
  description: 'About Off Broadway Nashville, a guide to live music venues beyond the Broadway strip.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-white border-b border-border py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl font-bold text-ink">About</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <p className="text-muted leading-relaxed">About page copy coming soon.</p>
      </div>
    </div>
  )
}
