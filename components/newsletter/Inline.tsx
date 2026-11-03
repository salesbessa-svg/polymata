import Link from "next/link"
import type { ReactNode } from "react"

/** Converte **negrito**, *itálico* e [links](url) em elementos. */
export default function Inline({ text }: { text: string }) {
  const parts: ReactNode[] = []
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)\s]+\))/g
  let last = 0
  let m: RegExpExecArray | null
  let k = 0
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    const t = m[0]
    if (t.startsWith("**")) parts.push(<strong key={k++} className="font-semibold text-[#1C1A17]">{t.slice(2, -2)}</strong>)
    else if (t.startsWith("*")) parts.push(<em key={k++}>{t.slice(1, -1)}</em>)
    else {
      const [, label, href] = t.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/)!
      const cls = "underline decoration-[#C2410C]/50 underline-offset-4 hover:decoration-[#C2410C]"
      parts.push(
        href.startsWith("/") ? (
          <Link key={k++} href={href} className={cls}>{label}</Link>
        ) : (
          <a key={k++} href={href} target="_blank" rel="noopener noreferrer" className={cls}>{label}</a>
        ),
      )
    }
    last = m.index + t.length
  }
  if (last < text.length) parts.push(text.slice(last))
  return <>{parts}</>
}
