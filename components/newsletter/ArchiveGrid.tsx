"use client"

import { useMemo, useState } from "react"
import { categoryColor, type ArticleMeta } from "@/lib/newsletter-shared"
import ArticleCard from "./ArticleCard"

export default function ArchiveGrid({ articles }: { articles: ArticleMeta[] }) {
  const [active, setActive] = useState<string | null>(null)
  const categories = useMemo(() => {
    const count = new Map<string, number>()
    articles.forEach((a) => count.set(a.category, (count.get(a.category) ?? 0) + 1))
    return [...count.entries()].sort((a, b) => b[1] - a[1])
  }, [articles])

  const list = active ? articles.filter((a) => a.category === active) : articles

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por tema">
        <button
          type="button"
          onClick={() => setActive(null)}
          aria-pressed={active === null}
          className={`rounded-full border px-4 py-2 text-[13px] transition-colors ${
            active === null ? "border-[#1C1A17] bg-[#1C1A17] text-[#F4F1EA]" : "border-[#CFC7B6] text-[#3A352E] hover:border-[#1C1A17]"
          }`}
        >
          Todos os temas
        </button>
        {categories.map(([cat, n]) => {
          const on = active === cat
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(on ? null : cat)}
              aria-pressed={on}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] transition-colors ${
                on ? "border-[#1C1A17] bg-[#1C1A17] text-[#F4F1EA]" : "border-[#CFC7B6] text-[#3A352E] hover:border-[#1C1A17]"
              }`}
            >
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: categoryColor(cat) }} />
              {cat}
              <span className={on ? "text-white/60" : "text-[#9A9183]"}>{n}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </div>
  )
}
