import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllNeighborhoods, getVenuesByNeighborhood, slugToNeighborhood, neighborhoodToSlug } from '@/lib/venues'
import VenueCard from '@/components/venue/VenueCard'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const neighborhoods = getAllNeighborhoods()
  return neighborhoods.map(n => ({ slug: neighborhoodToSlug(n) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const neighborhood = slugToNeighborhood(slug)
  if (!neighborhood) return {}
  const venues = getVenuesByNeighborhood(neighborhood)
  return {
    title: `Live Music in ${neighborhood} Nashville | Off Broadway Nashville`,
    description: `Find the best live music venues in ${neighborhood}, Nashville. ${venues.length} venues including ${venues.slice(0, 3).map(v => v.name).join(', ')}, and more.`,
  }
}

const neighborhoodIntros: Record<string, string> = {
  'East Nashville': "East Nashville is where the local music scene lives. You'll find indie rock, singer-songwriters, themed dance nights, and neighborhood bars that have nothing to prove. It's the part of the city that feels most like itself.",
  'The Gulch': "The Gulch is more of a music neighborhood than most visitors realize, with venues tucked between upscale restaurants and hotel bars. The Station Inn is one of the best bluegrass rooms in the country, Rudy's Jazz Room is a dedicated jazz club, small and seated, with live music every night, and Cannery Hall brings in everything from songwriter nights to bigger touring acts.",
  'Midtown': "Midtown sits right next to Music Row, which means the bars here attract actual industry people. Bobby's Idle Hour has been a songwriter hangout for decades. Losers is divey and real. This is where the business of music bleeds into the bar scene.",
  'SoBro': "South of Broadway but not part of it. The Listening Room Cafe is one of the best songwriter venues in the country, Ascend Amphitheater has the best skyline views of any outdoor venue in the city, and Third Man Records' Blue Room is unlike anything else in Nashville.",
  'Music Valley': "This is Grand Ole Opry territory. The venues out here cater to a more traditional country crowd, and that's not a criticism — it's exactly what some visitors are looking for. Real country music, near the Opry.",
  "Printer's Alley": "The old entertainment strip that predates Broadway's current incarnation. Blues, jazz, karaoke, and late nights. Skull's Rainbow Room has been here in various forms since the 1940s.",
  'West End': "Home to Exit/In, one of Nashville's most important rock venues, and Springwater, one of its oldest bars. The End is as divey as it gets. West End has the best concentration of rock venues in the city.",
  'Germantown': "Just north of downtown. Brooklyn Bowl is the main draw — it's a legitimate concert venue that also has bowling, which sounds gimmicky but works. Star Rover Sound is worth knowing about for a more intimate night.",
  'Green Hills': "One reason to come to Green Hills: The Bluebird Cafe. The most famous listening room in the world. Book tickets in advance.",
  'Downtown': "The Ryman Auditorium alone justifies knowing this neighborhood. Municipal Auditorium handles bigger touring shows. A few honky tonks exist outside the Broadway corridor if you know where to look.",
  'Wedgewood-Houston': "Santa's Pub is here and that's what matters. A Christmas-themed double-wide trailer with karaoke, cash only, and one of the most genuinely local experiences left in Nashville.",
  'Berry Hill': "Just south of the city core. Big Machine Distillery & Tavern does weekend live music with a brunch crowd and a patio. Low-key and worth the short drive.",
  'Madison': "Dee's Country Cocktail Lounge is the reason to come to Madison. A real neighborhood honky tonk with a local following and zero tourist energy.",
  'The Nations': "The Nations Bar & Grill is a neighborhood staple in West Nashville. Country, Americana, and bluegrass-leaning music in a casual bar setting.",
  'West Nashville': "Ray Stevens built the CabaRay Showroom out here — a proper dinner theater with old-school Nashville entertainment. Worth it if that's your thing.",
  'Hillsboro Village': "Anzie Blue is a small, seated venue for songwriter rounds and intimate shows. Quiet neighborhood energy, walkable from Vanderbilt.",
  'Marathon Village': "Marathon Music Works is a converted warehouse space that handles mid-size touring acts well. Not much else music-wise in the immediate area, but it's a great venue.",
  '8th Ave S': "The Basement is one of Nashville's best small venues for discovering new artists. The Green Light Bar does songwriter rounds. The Eighth Room is more upscale.",
}

export default async function NeighborhoodPage({ params }: Props) {
  const { slug } = await params
  const neighborhood = slugToNeighborhood(slug)
  if (!neighborhood) notFound()

  const venues = getVenuesByNeighborhood(neighborhood)
  const intro = neighborhoodIntros[neighborhood] || `Live music venues in ${neighborhood}, Nashville.`

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-white border-b border-border px-4 py-3">
        <div className="max-w-6xl mx-auto text-xs text-muted flex items-center gap-2">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <span>›</span>
          <Link href="/neighborhoods" className="hover:text-accent transition-colors">Neighborhoods</Link>
          <span>›</span>
          <span className="text-ink">{neighborhood}</span>
        </div>
      </div>

      <div className="bg-white border-b border-border py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="section-label mb-2">Nashville neighborhood</div>
          <h1 className="font-display text-4xl font-bold text-ink mb-4">Live Music in {neighborhood}</h1>
          <p className="text-muted max-w-2xl leading-relaxed mb-3">{intro}</p>
          <div className="text-sm text-muted">{venues.length} venues in this neighborhood</div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {venues.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {venues.map(venue => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted">No venues found in this neighborhood.</div>
        )}
        <div className="mt-10 pt-8 border-t border-border">
          <Link href="/neighborhoods" className="btn-outline">← All neighborhoods</Link>
        </div>
      </div>
    </div>
  )
}
