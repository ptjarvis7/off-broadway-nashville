import type { Metadata } from 'next'
import Script from 'next/script'
import localFont from 'next/font/local'
import './globals.css'
import { SITE_NAME, SITE_URL } from '@/lib/seo'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const GA_MEASUREMENT_ID = 'G-LTE4T13MJF'

// Self-hosted variable fonts (latin subset) from @fontsource-variable.
// next/font serves them from our domain, preloads them, and size-adjusts the fallback.
const displayFont = localFont({
  src: '../../node_modules/@fontsource-variable/playfair-display/files/playfair-display-latin-wght-normal.woff2',
  weight: '400 900',
  style: 'normal',
  display: 'swap',
  variable: '--font-playfair',
  adjustFontFallback: 'Times New Roman',
})

const bodyFont = localFont({
  src: '../../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2',
  weight: '100 1000',
  style: 'normal',
  display: 'swap',
  variable: '--font-dm-sans',
  adjustFontFallback: 'Arial',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Find Live Music Beyond Broadway`,
    template: `%s | ${SITE_NAME}`,
  },
  description: 'Find live music in Nashville beyond Broadway. Listening rooms, honky tonks, jazz clubs, songwriter rounds, and more.',
  // No openGraph/twitter defaults here on purpose: Next.js replaces rather than
  // merges them per segment, so a default at the root leaks onto any page that
  // does not set its own. Every route supplies its own via pageMetadata().
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'google-adsense-account': 'ca-pub-8609591932306793',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8609591932306793" crossOrigin="anonymous"></script>
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
        </Script>
      </body>
    </html>
  )
}
