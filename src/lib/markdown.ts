/**
 * A deliberately small Markdown renderer for guides: headings (## to ####),
 * paragraphs, bulleted and numbered lists, blockquotes, horizontal rules,
 * links, bold, italic, and inline code. Raw HTML is escaped, not passed
 * through. Internal links are emitted as written, so the postbuild link
 * checker catches a missing page or trailing slash.
 */

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function inline(text: string): string {
  let out = escapeHtml(text)
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>')
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label: string, href: string) => {
    const external = /^https?:\/\//.test(href)
    const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : ''
    return `<a href="${href}"${attrs}>${label}</a>`
  })
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  out = out.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>')
  return out
}

export function renderMarkdown(source: string): string {
  const lines = source.replace(/\r\n/g, '\n').split('\n')
  const html: string[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (!line.trim()) { i++; continue }

    const heading = /^(#{2,4})\s+(.*)$/.exec(line)
    if (heading) {
      const level = heading[1].length
      html.push(`<h${level}>${inline(heading[2].trim())}</h${level}>`)
      i++
      continue
    }

    if (/^(-{3,}|\*{3,})\s*$/.test(line)) { html.push('<hr />'); i++; continue }

    if (/^\s*[-*]\s+/.test(line) || /^\s*\d+\.\s+/.test(line)) {
      const ordered = /^\s*\d+\.\s+/.test(line)
      const marker = ordered ? /^\s*\d+\.\s+/ : /^\s*[-*]\s+/
      const items: string[] = []
      while (i < lines.length && marker.test(lines[i])) {
        items.push(`<li>${inline(lines[i].replace(marker, ''))}</li>`)
        i++
      }
      const tag = ordered ? 'ol' : 'ul'
      html.push(`<${tag}>${items.join('')}</${tag}>`)
      continue
    }

    if (/^>\s?/.test(line)) {
      const quote: string[] = []
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quote.push(lines[i].replace(/^>\s?/, ''))
        i++
      }
      html.push(`<blockquote><p>${inline(quote.join(' '))}</p></blockquote>`)
      continue
    }

    const para: string[] = []
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{2,4})\s+/.test(lines[i]) &&
      !/^\s*([-*]|\d+\.)\s+/.test(lines[i]) &&
      !/^>\s?/.test(lines[i])
    ) {
      para.push(lines[i].trim())
      i++
    }
    html.push(`<p>${inline(para.join(' '))}</p>`)
  }

  return html.join('\n')
}
