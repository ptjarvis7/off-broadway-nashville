/**
 * Emits one JSON-LD block. "<" is escaped so text in the data can never close
 * the script tag early; JSON parsers read < back as "<".
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
