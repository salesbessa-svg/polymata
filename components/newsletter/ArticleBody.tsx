import type { Block } from "@/lib/newsletter"
import { SERIF } from "@/lib/newsletter-shared"
import Inline from "./Inline"

export default function ArticleBody({ blocks, accent }: { blocks: Block[]; accent: string }) {
  let firstParagraph = true

  return (
    <div className={`${SERIF} text-[19px] leading-[1.75] text-[#2B2722] md:text-[20px]`}>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2 key={i} id={b.id} className="mb-5 mt-14 scroll-mt-28 text-[28px] font-medium leading-tight tracking-tight text-[#1C1A17] md:text-[34px]">
                <span className="mb-4 block h-px w-12" style={{ backgroundColor: accent }} />
                <Inline text={b.text} />
              </h2>
            )
          case "h3":
            return (
              <h3 key={i} className="mb-3 mt-10 text-[22px] font-semibold leading-snug text-[#1C1A17]">
                <Inline text={b.text} />
              </h3>
            )
          case "p": {
            const drop = firstParagraph
            firstParagraph = false
            return (
              <p
                key={i}
                className={`mb-6 ${
                  drop
                    ? "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[78px] first-letter:font-medium first-letter:leading-[0.8] first-letter:text-[#1C1A17]"
                    : ""
                }`}
              >
                <Inline text={b.text} />
              </p>
            )
          }
          case "quote":
            return (
              <blockquote key={i} className="my-12 border-l-2 pl-6 md:-mx-10 md:pl-10" style={{ borderColor: accent }}>
                <p className="text-[26px] font-light italic leading-snug text-[#1C1A17] md:text-[32px]">
                  <Inline text={b.text} />
                </p>
              </blockquote>
            )
          case "callout":
            return (
              <aside key={i} className="my-10 rounded-sm border border-[#D9D2C3] bg-white/60 p-6 font-sans text-[16px] leading-relaxed text-[#3A352E]">
                <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: accent }}>
                  Atenção
                </span>
                <Inline text={b.text} />
              </aside>
            )
          case "ul":
            return (
              <ul key={i} className="mb-8 space-y-3">
                {b.items.map((item, j) => (
                  <li key={j} className="relative pl-7">
                    <span className="absolute left-0 top-[0.72em] h-[7px] w-[7px] rotate-45" style={{ backgroundColor: accent }} />
                    <Inline text={item} />
                  </li>
                ))}
              </ul>
            )
          case "ol":
            return (
              <ol key={i} className="mb-8 space-y-4">
                {b.items.map((item, j) => (
                  <li key={j} className="relative pl-10">
                    <span className="absolute left-0 top-0 text-[17px] font-semibold" style={{ color: accent }}>
                      {String(j + 1).padStart(2, "0")}
                    </span>
                    <Inline text={item} />
                  </li>
                ))}
              </ol>
            )
          case "hr":
            return (
              <div key={i} className="my-12 flex justify-center gap-3 text-[#B5AC9B]" aria-hidden="true">
                ✦ ✦ ✦
              </div>
            )
        }
      })}
    </div>
  )
}
