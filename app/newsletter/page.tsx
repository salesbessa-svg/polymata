import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import ArchiveGrid from "@/components/newsletter/ArchiveGrid"
import ArticleCard from "@/components/newsletter/ArticleCard"
import Cover from "@/components/newsletter/Cover"
import QuemEPolymata from "@/components/newsletter/QuemEPolymata"
import SignupBand from "@/components/newsletter/SignupBand"
import { SERIF, categoryColor, editionLabel, formatDate, getAllArticles, getFeatured, toMeta } from "@/lib/newsletter"

export const metadata: Metadata = {
  title: "Newsletter para pequenos empresários | Polymata",
  description:
    "Gestão, impostos, delivery, Google, redes sociais e automação: artigos para donos de pequenas empresas em São Paulo que querem crescer sem aprender errando.",
  alternates: { canonical: "/newsletter" },
  keywords: [
    "newsletter para empresários",
    "dicas para pequenas empresas",
    "gestão de pequenas empresas",
    "marketing para pequenas empresas",
    "como aumentar as vendas",
    "empreendedorismo São Paulo",
  ],
  openGraph: {
    title: "Newsletter Polymata: aprenda antes de errar",
    description: "Toda semana, um problema real de quem toca uma pequena empresa.",
    type: "website",
    locale: "pt_BR",
  },
}

export default function Newsletter() {
  const all = getAllArticles()
  if (all.length === 0) return <main className="px-6 pt-40 text-center">Nenhuma edição publicada ainda.</main>

  const featured = getFeatured()
  const rest = all.filter((a) => a.slug !== featured.slug)
  const secondary = rest.slice(0, 3)
  const color = categoryColor(featured.category)

  return (
    <main>
      {/* ---------- CABEÇALHO ---------- */}
      <header className="px-5 pt-28 sm:px-6 md:px-8 md:pt-32">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1C1A17] pb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[#5E574D]">
            <span>Newsletter Polymata</span>
            <span>
              {editionLabel(all[0].number)} · {formatDate(all[0].date)}
            </span>
          </div>
          <h1 className={`${SERIF} mt-8 text-[56px] font-light leading-[0.95] tracking-[-0.03em] sm:text-7xl md:text-8xl lg:text-[124px]`}>
            Aprenda antes <em className="font-normal">de errar.</em>
          </h1>
          <div className="mt-8 grid gap-6 border-b border-[#D9D2C3] pb-10 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <p className={`${SERIF} text-xl leading-snug text-[#3A352E] md:text-2xl`}>
              Ideias, alertas e bastidores para quem toca uma pequena empresa de verdade, escritos por quem constrói
              marcas, sistemas e redes de negócios em todo o Estado de São Paulo.
            </p>
            <p className="self-end text-[13px] leading-relaxed text-[#8A8275] md:text-right">
              {all.length} edições · gestão, impostos, delivery, Google, redes sociais, automação e mais
            </p>
          </div>
        </div>
      </header>

      {/* ---------- MATÉRIA DE CAPA ---------- */}
      <section className="px-5 py-12 sm:px-6 md:px-8 md:py-16">
        <Link href={`/newsletter/${featured.slug}`} className="group mx-auto grid max-w-6xl gap-8 md:grid-cols-12 md:gap-10">
          <Cover
            slug={featured.slug}
            category={featured.category}
            number={featured.number}
            big
            className="aspect-[4/3] rounded-sm md:col-span-7"
          />
          <div className="flex flex-col justify-center md:col-span-5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color }}>
              Matéria de capa · {featured.category}
            </span>
            <h2 className={`${SERIF} mt-4 text-4xl font-medium leading-[1.05] tracking-tight decoration-1 underline-offset-[6px] group-hover:underline md:text-5xl`}>
              {featured.title}
            </h2>
            <p className={`${SERIF} mt-5 text-xl italic leading-snug text-[#5E574D]`}>{featured.subtitle}</p>
            <p className="mt-6 text-[13px] text-[#8A8275]">
              {formatDate(featured.date)} · {featured.readingMinutes} min de leitura
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
              Ler a edição <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </section>

      {/* ---------- TAMBÉM NESTA EDIÇÃO ---------- */}
      {secondary.length > 0 && (
        <section className="px-5 pb-20 sm:px-6 md:px-8">
          <div className="mx-auto max-w-6xl border-t border-[#D9D2C3] pt-10">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5E574D]">Também em destaque</h2>
            <div className="mt-8 grid gap-10 md:grid-cols-3 md:gap-8">
              {secondary.map((a) => (
                <ArticleCard key={a.slug} article={toMeta(a)} />
              ))}
            </div>
          </div>
        </section>
      )}

      <SignupBand source="/newsletter" />

      {/* ---------- ARQUIVO ---------- */}
      <section className="px-5 py-20 sm:px-6 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className={`${SERIF} text-4xl font-light tracking-tight md:text-5xl`}>Todas as edições</h2>
          <p className="mb-10 mt-3 max-w-xl text-[15px] leading-relaxed text-[#5E574D]">
            Escolha um tema ou explore o arquivo completo.
          </p>
          <ArchiveGrid articles={all.map(toMeta)} />
        </div>
      </section>

      <QuemEPolymata />
    </main>
  )
}
