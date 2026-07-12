import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | Off Broadway Nashville',
  description: 'Get in touch with Off Broadway Nashville to report a venue update, suggest a new listing, or just say hi.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-white border-b border-border py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl font-bold text-ink">Contact</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <p className="text-muted leading-relaxed mb-4">
          Off Broadway Nashville is run by one person, not a company.
        </p>
        <p className="text-muted leading-relaxed">
          Spot a venue that's closed, moved, or got a fact wrong? Have a place that belongs in the directory? Just want to say hi? Email{' '}
          <a href="mailto:hello@offbroadwaynashville.co" className="text-accent hover:underline">hello@offbroadwaynashville.co</a>
          {' '}and I'll get back to you.
        </p>
      </div>
    </div>
  )
}
