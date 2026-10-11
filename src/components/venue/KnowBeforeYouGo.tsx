import type { KnowBeforeYouGo as Details } from '@/types'

const FIELDS: { key: keyof Details; label: string }[] = [
  { key: 'cover', label: 'Cover' },
  { key: 'payment', label: 'Payment' },
  { key: 'seating', label: 'Seating' },
  { key: 'ages', label: 'Ages' },
  { key: 'parking', label: 'Parking' },
  { key: 'bestNights', label: 'Best nights' },
]

export const KNOW_BEFORE_YOU_GO_FIELDS = FIELDS.map(f => f.key)

/** Renders only the filled fields, and nothing at all when none are filled. */
export default function KnowBeforeYouGo({ details }: { details?: Details }) {
  const rows = FIELDS.filter(f => details?.[f.key]?.trim())
  if (rows.length === 0) return null

  return (
    <div className="bg-white border border-border rounded-lg p-6 mb-6">
      <h2 className="font-display text-xl font-semibold text-ink mb-3">Know before you go</h2>
      <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
        {rows.map(({ key, label }) => (
          <div key={key} className="contents">
            <dt className="section-label pt-0.5">{label}</dt>
            <dd className="text-muted leading-relaxed">{details![key]}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
