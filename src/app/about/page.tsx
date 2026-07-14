import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | Off Broadway Nashville',
  description: 'The story behind Off Broadway Nashville — a local\'s guide to live music venues beyond the Broadway strip.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-white border-b border-border py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl font-bold text-ink">About</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-5">
        <p className="text-muted leading-relaxed">
          I moved to Nashville in 2021 and spent my first six months doing what every tourist does: hitting Broadway, paying $10 for a domestic beer, hearing the same six cover songs at every honky tonk, and watching bachelorette parties go screaming past on party buses.
        </p>
        <p className="text-muted leading-relaxed">
          Eventually, I couldn't justify the Broadway prices, and I wanted to see what the local music scene looked like. Some friends mentioned a few Midtown bars, and we found out fast that the better music lives off Broadway. After a few weekends at Losers and Winners (now Riley Green's Duck Blind), I found Whiskey Jam. It's a Monday and Thursday night showcase for Nashville's best up-and-coming artists, which took place at Winners back then. One show in, I knew I wasn't going back to Broadway unless I had friends in town.
        </p>
        <p className="text-muted leading-relaxed">
          Whiskey Jam has since moved to Whiskey Row on Broadway, so these days you're more likely to fight a tourist crowd to get in the door. But it's what got me exploring the rest of the city, and after a few years of it, I've gotten pretty good at knowing where to send someone for a real night out in Nashville.
        </p>
        <p className="text-muted leading-relaxed">
          This site is that knowledge, put into something useful for people planning a trip here. It's the guide for someone who wants to go where locals actually go, not just the machine that is Broadway.
        </p>
        <p className="text-muted leading-relaxed">
          Most of these venues are places I've been myself. The rest come from Nashville friends whose taste I trust, or from hours of digging into what a place is actually known for before it makes the list.
        </p>
        <p className="text-muted leading-relaxed">
          My name is Peter, and I've lived in Nashville for five years and counting. I work at a marketing agency as a creative strategist, while building this and another business on the side. I'm a die-hard country music fan who loves a good night out for drinks, dinner, and live music. A site built by someone who actually lives here felt like the right way to help other people find that.
        </p>
        <p className="text-muted leading-relaxed">
          Think a venue's missing, or something here's wrong? Holler:{' '}
          <a href="mailto:hello@offbroadwaynashville.co" className="text-accent hover:underline">hello@offbroadwaynashville.co</a>
        </p>
      </div>
    </div>
  )
}
