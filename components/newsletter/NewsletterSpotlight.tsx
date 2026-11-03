"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Shuffle } from "lucide-react"
import { SERIF, categoryColor, editionLabel, formatDate, type ArticleMeta } from "@/lib/newsletter-shared"
import Cover from "./Cover"

const EASE = [0.22, 1, 0.36, 1] as const

function pick(length: number, avoid?: number) {
  if (length < 2) return 0
  let i = Math.floor(Math.random() * length)
  if (i === avoid) i = (i + 1 + Math.floor(Math.random() * (length - 1))) % length
  return i
}

export default function NewsletterSpotlight({ articles }: { articles: ArticleMeta[] }) {
  // começa pela edição mais recente (igual no servidor e no navegador) e sorteia ao abrir a página
  const [index, setIndex] = useState(0)
  useEffect(() => setIndex(pick(articles.length)), [articles.length])

  const a = articles[index]
  const color = categoryColor(a.category)

  return (
    <section className="bg-[#F4F1EA] px-5 py-20 text-[#1C1A17] sm:px-6 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#1C1A17] pb-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#5E574D]">
              Da nossa newsletter
            </span>
            <h2 className={`${SERIF} mt-2 text-4xl font-light tracking-tight md:text-5xl`}>
              Aprenda antes <em className="font-normal">de errar.</em>
            </h2>
          </div>
          {articles.length > 1 && (
            <button
              type="button"
              onClick={() => setIndex((i) => pick(articles.length, i))}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#CFC7B6] px-5 text-sm text-[#3A352E] transition-colors hover:border-[#1C1A17] hover:text-[#1C1A17]"
            >
              <Shuffle size={15} />
              Sortear outra edição
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={a.slug}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <Link href={`/newsletter/${a.slug}`} className="group mt-10 grid gap-8 md:grid-cols-12 md:gap-10">
              <Cover
                slug={a.slug}
                category={a.category}
                number={a.number}
                big
                className="aspect-[4/3] rounded-sm md:col-span-6"
              />
              <div className="flex flex-col justify-center md:col-span-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em]">
                  <span style={{ color }}>{a.category}</span>
                  <span className="text-[#8A8275]"> · {editionLabel(a.number)}</span>
                </p>
                <h3
                  className={`${SERIF} mt-4 text-3xl font-medium leading-[1.08] tracking-tight decoration-1 underline-offset-[6px] group-hover:underline md:text-[42px]`}
                >
                  {a.title}
                </h3>
                <p className={`${SERIF} mt-5 text-lg italic leading-snug text-[#5E574D] md:text-xl`}>{a.subtitle}</p>
                <p className="mt-6 text-[13px] text-[#8A8275]">
                  {formatDate(a.date)} · {a.readingMinutes} min de leitura
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                  Ler a edição <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#D9D2C3] pt-6">
          <p className="text-[14px] text-[#5E574D]">
            {articles.length} edições sobre gestão, impostos, delivery, Google, redes sociais e automação.
          </p>
          <Link
            href="/newsletter"
            className="inline-flex items-center gap-2 rounded-full bg-[#1C1A17] px-6 py-3 text-sm font-medium text-[#F4F1EA] transition-colors hover:bg-black"
          >
            Ver todas as edições <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
