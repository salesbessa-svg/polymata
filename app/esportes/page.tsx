import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Navbar from "@/components/Navbar"
import WhatsappButton from "@/components/WhatsappButton"
import { RevealBlock } from "@/components/Reveal"
import { SITE_URL } from "@/lib/newsletter-shared-url"
import { SHARE_IMAGES, jsonLdScript, pageMetadata, webPageJsonLd } from "@/lib/seo"

/* =========================================================
   POLYMATA ESPORTES: escolha do esporte.
   Cada esporte tem um botão que leva à sua página.
========================================================= */

const PAGE = {
  title: "Polymata Esportes | Tecnologia para baseball no Brasil",
  description:
    "Polymata Esportes leva tecnologia ao esporte brasileiro, do amador ao profissional. Comece pelo baseball: conheça o app nicodemus, para treinos, jogos e evolução de atletas.",
  path: "/esportes",
  image: SHARE_IMAGES.esportes,
}

export const metadata: Metadata = pageMetadata({ ...PAGE, absoluteTitle: true })

const ESPORTES = [
  {
    nome: "Baseball",
    href: "/esportes/baseball",
    icone: "/esportes/cap.png",
    alt: "",
    texto: "Nicodemus",
  },
]

export default function Esportes() {
  const jsonLd = webPageJsonLd({
    path: PAGE.path,
    name: "Polymata Esportes",
    description: PAGE.description,
    image: PAGE.image,
    breadcrumb: "Esportes",
    type: "CollectionPage",
  })
  ;(jsonLd["@graph"][0] as Record<string, unknown>).hasPart = ESPORTES.map((e) => ({
    "@type": "WebPage",
    name: e.nome,
    url: `${SITE_URL}${e.href}`,
  }))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLd)} />
      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-neutral-950 px-6 pb-28 pt-36 text-white md:pt-44">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-32 h-[380px] w-[640px] -translate-x-1/2 rounded-full bg-[#F97316]/10 blur-[120px]"
        />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-5 text-xs uppercase tracking-[0.35em] text-[#F97316]">Polymata Esportes</p>
          <h1 className="text-4xl font-light leading-tight md:text-6xl">Escolha o esporte</h1>
          <RevealBlock delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              Tecnologia para atletas e equipes amadoras, universitárias e profissionais.
            </p>
          </RevealBlock>
        </div>

        <ul className="relative mx-auto mt-16 flex max-w-4xl flex-wrap justify-center gap-6">
          {ESPORTES.map((e) => (
            <li key={e.href}>
              <RevealBlock delay={0.15}>
                <Link
                  href={e.href}
                  className="group flex w-64 flex-col items-center rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent px-8 pb-8 pt-10 text-center transition-all duration-500 hover:-translate-y-1 hover:border-[#F97316]/60 hover:shadow-[0_30px_80px_-25px_rgba(249,115,22,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F97316]"
                >
                  <span className="flex h-32 w-32 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-105">
                    <Image
                      src={e.icone}
                      alt={e.alt}
                      width={191}
                      height={256}
                      className="h-24 w-auto drop-shadow-[0_10px_25px_rgba(249,115,22,0.45)]"
                      priority
                    />
                  </span>
                  <span className="mt-6 text-2xl font-semibold tracking-tight">{e.nome}</span>
                  <span className="mt-2 text-sm text-white/55">{e.texto}</span>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm text-[#F97316] transition-colors group-hover:text-white">
                    Entrar no {e.nome.toLowerCase()}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </RevealBlock>
            </li>
          ))}
        </ul>
      </main>

      <WhatsappButton />
    </>
  )
}
