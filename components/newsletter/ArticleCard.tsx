import Link from "next/link"
import { SERIF, categoryColor, formatDate, type ArticleMeta } from "@/lib/newsletter-shared"
import Cover from "./Cover"

export default function ArticleCard({ article, horizontal = false }: { article: ArticleMeta; horizontal?: boolean }) {
  const color = categoryColor(article.category)
  return (
    <Link
      href={`/newsletter/${article.slug}`}
      className={`group ${horizontal ? "grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-start gap-5" : "flex flex-col"}`}
    >
      <Cover
        slug={article.slug}
        category={article.category}
        number={article.number}
        className={`rounded-sm transition-transform duration-500 group-hover:scale-[1.015] ${horizontal ? "aspect-[4/3]" : "aspect-[16/10]"}`}
      />
      <div className={horizontal ? "" : "mt-5"}>
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color }}>
          {article.category}
        </span>
        <h3
          className={`${SERIF} mt-2 font-medium leading-[1.15] tracking-tight text-[#1C1A17] decoration-1 underline-offset-4 group-hover:underline ${
            horizontal ? "text-xl md:text-2xl" : "text-2xl"
          }`}
        >
          {article.title}
        </h3>
        {!horizontal && <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-[#5E574D]">{article.subtitle}</p>}
        <p className="mt-3 text-[12.5px] text-[#8A8275]">
          {formatDate(article.date)} · {article.readingMinutes} min de leitura
        </p>
      </div>
    </Link>
  )
}
