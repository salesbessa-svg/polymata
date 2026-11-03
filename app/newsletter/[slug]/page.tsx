import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import ArticleBody from "@/components/newsletter/ArticleBody"
import ArticleCard from "@/components/newsletter/ArticleCard"
import Cover from "@/components/newsletter/Cover"
import ReadingProgress from "@/components/newsletter/ReadingProgress"
import SignupBand from "@/components/newsletter/SignupBand"
import {
  SERIF,
  SITE_URL,
  categoryColor,
  editionLabel,
  formatDate,
  getAllArticles,
  getArticle,
  getRelated,
  toMeta,
} from "@/lib/newsletter"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}
  return {
    title: `${article.title} | Newsletter Polymata`,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: `/newsletter/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      locale: "pt_BR",
      publishedTime: article.date,
      section: article.category,
      tags: article.keywords,
    },
  }
}

function ShareLinks({ url, title }: { url: string; title: string }) {
  const enc = encodeURIComponent
  const links = [
    { label: "WhatsApp", href: `https://wa.me/?text=${enc(`${title} ${url}`)}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
  ]
  return (
    <div className="flex flex-wrap items-center gap-2 text-[12px]">
      <span className="uppercase tracking-[0.2em] text-[#8A8275]">Compartilhar</span>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-[#CFC7B6] px-3 py-1.5 text-[#3A352E] transition-colors hover:border-[#1C1A17]"
        >
          {l.label}
        </a>
      ))}
    </div>
  )
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const color = categoryColor(article.category)
  const url = `${SITE_URL}/newsletter/${article.slug}`
  const toc = article.blocks.filter((b): b is Extract<typeof b, { type: "h2" }> => b.type === "h2")
  const related = getRelated(article)

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: article.title,
        description: article.description,
        datePublished: article.date,
        dateModified: article.date,
        inLanguage: "pt-BR",
        articleSection: article.category,
        keywords: article.keywords.join(", "),
        wordCount: article.wordCount,
        mainEntityOfPage: url,
        author: { "@type": "Organization", name: "Polymata", url: SITE_URL },
        publisher: { "@type": "Organization", name: "Polymata", url: SITE_URL },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Newsletter", item: `${SITE_URL}/newsletter` },
          { "@type": "ListItem", position: 3, name: article.title, item: url },
        ],
      },
    ],
  }

  return (
    <main>
      <ReadingProgress color={color} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ---------- CABEÇALHO ---------- */}
      <header className="px-5 pt-28 sm:px-6 md:px-8 md:pt-36">
        <div className="mx-auto max-w-3xl text-center">
          <Link href="/newsletter" className="inline-flex items-center gap-2 text-[13px] text-[#5E574D] hover:text-[#1C1A17]">
            <ArrowLeft size={14} /> Newsletter Polymata
          </Link>
          <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.25em]">
            <span style={{ color }}>{article.category}</span>
            <span className="text-[#8A8275]"> · {editionLabel(article.number)}</span>
          </p>
          <h1 className={`${SERIF} mt-5 text-[40px] font-medium leading-[1.05] tracking-[-0.02em] sm:text-5xl md:text-6xl`}>
            {article.title}
          </h1>
          {article.subtitle && (
            <p className={`${SERIF} mx-auto mt-6 max-w-2xl text-xl italic leading-snug text-[#5E574D] md:text-2xl`}>
              {article.subtitle}
            </p>
          )}
          <p className="mt-8 text-[13px] text-[#8A8275]">
            Por <span className="text-[#3A352E]">Redação Polymata</span> · {formatDate(article.date)} ·{" "}
            {article.readingMinutes} min de leitura
          </p>
        </div>
      </header>

      <div className="mx-auto mt-12 max-w-5xl px-5 sm:px-6 md:px-8">
        <Cover slug={article.slug} category={article.category} number={article.number} big className="aspect-[16/9] rounded-sm md:aspect-[21/9]" />
      </div>

      {/* ---------- CORPO ---------- */}
      <div className="px-5 py-14 sm:px-6 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 xl:grid-cols-[200px_minmax(0,680px)_200px] xl:justify-center">
          <aside className="hidden xl:block">
            {toc.length > 1 && (
              <nav className="sticky top-32" aria-label="Neste artigo">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8A8275]">Neste artigo</p>
                <ol className="mt-4 space-y-3 border-l border-[#D9D2C3]">
                  {toc.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="-ml-px block border-l border-transparent pl-4 text-[13.5px] leading-snug text-[#5E574D] hover:border-[#1C1A17] hover:text-[#1C1A17]">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
          </aside>

          <article id="artigo" className="min-w-0">
            <ArticleBody blocks={article.blocks} accent={color} />

            {article.keywords.length > 0 && (
              <div className="mt-14 border-t border-[#D9D2C3] pt-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8A8275]">Assuntos</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {article.keywords.map((k) => (
                    <li key={k} className="rounded-full bg-[#E9E4D8] px-3 py-1.5 text-[12.5px] text-[#3A352E]">
                      {k}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8">
              <ShareLinks url={url} title={article.title} />
            </div>

            {/* CHAMADA */}
            <div className="mt-14 rounded-sm border-t-4 bg-white/70 p-7 md:p-10" style={{ borderColor: color }}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color }}>
                Polymata
              </p>
              <p className={`${SERIF} mt-3 text-2xl leading-snug md:text-[28px]`}>{article.cta}</p>
              <Link
                href="/contato"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#1C1A17] px-6 py-3 text-sm font-medium text-[#F4F1EA] transition-colors hover:bg-black"
              >
                Conversar com um especialista <ArrowRight size={15} />
              </Link>
            </div>

            <div className="mt-6">
              <SignupBand source={`/newsletter/${article.slug}`} compact />
            </div>
          </article>

          <div className="hidden xl:block" />
        </div>
      </div>

      {/* ---------- LEIA TAMBÉM ---------- */}
      {related.length > 0 && (
        <section className="border-t border-[#D9D2C3] px-5 py-16 sm:px-6 md:px-8 md:py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className={`${SERIF} text-3xl font-light tracking-tight md:text-4xl`}>Continue lendo</h2>
            <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={toMeta(a)} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
