import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Off Broadway Nashville',
  description: 'Privacy policy for Off Broadway Nashville, including information on cookies, advertising, and your rights.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-white border-b border-border py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl font-bold text-ink mb-2">Privacy Policy</h1>
          <p className="text-muted text-sm">Last updated: July 12, 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
        <p className="text-muted leading-relaxed">
          Off Broadway Nashville is a directory of live music venues in Nashville, Tennessee. This policy explains what information this site collects, how cookies work here, and what control you have over both.
        </p>

        <div>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">Information we collect</h2>
          <p className="text-muted leading-relaxed mb-3">
            Browsing this site does not require an account, and we do not collect personal information just from you looking at the directory. If you email us through the contact page, we keep whatever you send us in that email, and use it only to reply to you.
          </p>
          <p className="text-muted leading-relaxed">
            Like most websites, our hosting provider logs standard technical data such as IP address, browser type, and pages visited. This is used for security and performance, not to identify individual visitors.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">Cookies and advertising</h2>
          <p className="text-muted leading-relaxed mb-3">
            This site uses Google AdSense to display ads. Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this site or other websites. This is known as personalized advertising.
          </p>
          <p className="text-muted leading-relaxed mb-3">
            You can opt out of personalized advertising through Google's Ads Settings at{' '}
            <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">adssettings.google.com</a>.
            {' '}You can manage choices with other ad networks at{' '}
            <a href="https://aboutads.info/choices" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">aboutads.info/choices</a>.
            {' '}Visitors in the EU and UK can also manage preferences at{' '}
            <a href="https://youronlinechoices.eu" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">youronlinechoices.eu</a>.
            {' '}Google explains its own data use at{' '}
            <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">policies.google.com/technologies/partner-sites</a>.
          </p>
          <p className="text-muted leading-relaxed">
            Visitors in the EU, UK, and Switzerland are asked for consent before any personalized advertising cookies are set, through Google's certified consent tools.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">Analytics</h2>
          <p className="text-muted leading-relaxed">
            This site does not currently use Google Analytics or any other analytics tracking tool. If that changes, this policy will be updated to reflect it.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">Children's privacy</h2>
          <p className="text-muted leading-relaxed">
            This site is not directed at children under 13 and does not knowingly collect information from them.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">Your rights</h2>
          <p className="text-muted leading-relaxed">
            Depending on where you live, you may have the right to access, correct, or delete information we hold about you, and to object to certain uses of cookies. Most of what this site collects comes from advertising cookies, which you can manage through the opt-out links above. For anything else, contact us using the information below.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">Changes to this policy</h2>
          <p className="text-muted leading-relaxed">
            We may update this policy as the site changes. The date at the top reflects the most recent update.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">Contact</h2>
          <p className="text-muted leading-relaxed">
            Questions about this policy:{' '}
            <a href="mailto:hello@offbroadwaynashville.co" className="text-accent hover:underline">hello@offbroadwaynashville.co</a>
          </p>
        </div>
      </div>
    </div>
  )
}
