import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { SITE_NAME, SITE_URL } from '@/lib/seo'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const GA_MEASUREMENT_ID = 'G-LTE4T13MJF'

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
