"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, MapPin, Palette, TrendingUp } from "lucide-react"
import { RevealText } from "./Reveal"

const EASE = [0.22, 1, 0.36, 1] as const

const services = [
  {
    id: "design",
    icon: Palette,
    accent: "#F97316",
    title: "Design de Produto",
    short: "Uma identidade autoral, longe do genérico gerado por IA.",
    detail:
      "Criamos uma logomarca exclusiva e uma paleta de cores que fazem sua marca ser reconhecida à primeira vista — em vez de se misturar aos concorrentes.",
  },
  {
    id: "credibilidade",
    icon: MapPin,
    accent: "#34D399",
    title: "Credibilidade",
    short: "Prova social exatamente onde seu cliente já está procurando.",
    detail:
      "Fotos profissionais, avaliações reais e um catálogo sempre atualizado no mapa e nos apps de busca — o cliente encontra e já confia antes de falar com você.",
  },
  {
    id: "estrategia",
    icon: TrendingUp,
    accent: "#60A5FA",
    title: "Estratégia Regionalizada",
    short: "Dados e uma rede de contatos certos para crescer na sua região.",
    detail:
      "Mapeamos o mercado local, identificamos oportunidades e conectamos seu negócio a uma rede de fornecedores, parceiros e outras empresas da região.",
  },
]

export default function ServicesShowcase() {
  const [active, setActive] = useState(0)
  const current = services[active]

  return (
    <section className="bg-neutral-950 px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <RevealText
          text="Três frentes, um só resultado"
          as="h2"
          className="text-3xl font-light tracking-wide text-white md:text-5xl"
        />
        <p className="mt-4 max-w-lg text-white/55">
          Escolha uma frente para ver como ela funciona na prática.
        </p>

        <div className="mt-12 grid gap-10 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-14">
          {/* SELETOR */}
          <div className="flex gap-2 overflow-x-auto md:flex-col md:gap-2 md:overflow-visible">
            {services.map((s, i) => {
              const Icon = s.icon
              const isActive = i === active
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className={`flex min-w-[220px] shrink-0 items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-colors md:min-w-0 ${
                    isActive
                      ? "border-white/20 bg-white/[0.08]"
                      : "border-white/10 bg-transparent hover:border-white/20"
                  }`}
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-black"
                    style={{ backgroundColor: s.accent }}
                  >
                    <Icon size={16} />
                  </span>
                  <span className={`text-sm font-medium ${isActive ? "text-white" : "text-white/60"}`}>
                    {s.title}
                  </span>
                </button>
              )
            })}
          </div>

          {/* PAINEL */}
          <div className="relative min-h-[220px] rounded-2xl bg-neutral-900 p-8 md:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <h3 className="text-2xl font-semibold text-white">{current.title}</h3>
                <p className="mt-2 text-white/60">{current.short}</p>
                <p className="mt-5 max-w-xl leading-relaxed text-white/80">{current.detail}</p>

                <Link
                  href={`/services#${current.id}`}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-white/70"
                >
                  Ver como funciona
                  <ArrowRight size={15} />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}