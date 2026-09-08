export interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  items: FAQItem[]
}

export default function FAQ({ items }: FAQProps) {
  if (items.length === 0) return null

  return (
    <div className="mt-14 pt-8 border-t border-border">
      <div className="section-label mb-4">Frequently asked questions</div>
      <div className="space-y-6 max-w-2xl">
        {items.map(item => (
          <div key={item.question}>
            <h3 className="font-display font-semibold text-ink mb-1.5">{item.question}</h3>
            <p className="text-sm text-muted leading-relaxed">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
