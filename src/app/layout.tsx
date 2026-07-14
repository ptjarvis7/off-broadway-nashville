import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.offbroadwaynashville.co'),
  title: {
    default: 'Off Broadway Nashville | Find Live Music Beyond Broadway',
    template: '%s | Off Broadway Nashville',
  },
  description: 'Find live music in Nashville beyond Broadway. Listening rooms, honky tonks, jazz clubs, songwriter rounds, and more.',
  keywords: ['Nashville live music', 'Nashville venues', 'beyond Broadway Nashville', 'Nashville listening rooms', 'Nashville honky tonks'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.offbroadwaynashville.co',
    siteName: 'Off Broadway Nashville',
    title: 'Off Broadway Nashville | Find Live Music Beyond Broadway',
    description: 'Find live music in Nashville beyond Broadway. Listening rooms, honky tonks, songwriter rounds, and more.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Off Broadway Nashville | Find Live Music Beyond Broadway',
    description: 'Find live music in Nashville beyond Broadway. Listening rooms, honky tonks, songwriter rounds, and more.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8609591932306793" crossOrigin="anonymous"></script>
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
