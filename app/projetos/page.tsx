"use client";

import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Coins,
  GraduationCap,
  Landmark,
  Network,
  Users,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { RevealText, RevealBlock } from "@/components/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

const cardV: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/* =========================================================
   PILARES DO ECOSSISTEMA
========================================================= */

const pillars = [
  {
    icon: Users,
    accent: "#F97316",
    title: "Networking Empresarial",
    text: "Aproximamos empresários da mesma região e do mesmo momento de crescimento, criando conexões reais — não apenas contatos trocados em um evento.",
  },
  {
    icon: Network,
    accent: "#34D399",
    title: "Comunidade",
    text: "Um espaço contínuo de troca entre negócios locais, onde experiência, indicação e apoio mútuo substituem a concorrência silenciosa.",
  },
  {
    icon: Landmark,
    accent: "#60A5FA",
    title: "Elisão Fiscal",
    text: "Orientação sobre estruturas associativas e cooperativas que permitem operar com mais eficiência tributária, sempre dentro da lei.",
  },
  {
    icon: Coins,
    accent: "#C084FC",
    title: "Capitalização de Recursos",
    text: "Acesso facilitado a linhas de crédito, editais e parcerias de investimento pensadas para negócios em expansão regional.",
  },
  {
    icon: GraduationCap,
    accent: "#FBBF24",
    title: "Rede Fornecedor-Consumidor",
    text: "Conectamos quem produz a quem consome dentro da própria rede, reduzindo custos e fortalecendo a economia local.",
  },
];

/* =========================================================
   FORMATOS DE WORKSHOP
========================================================= */

const workshops = [
  {
    title: "Encontros de Networking",
    text: "Rodadas mensais entre empresas parceiras para apresentar necessidades, oportunidades e fechar negócios entre si.",
  },
  {
    title: "Rodas de Comunidade",
    text: "Conversas abertas sobre desafios reais do dia a dia do negócio, com trocas de experiência entre donos de empresas semelhantes.",
  },
  {
    title: "Planejamento Tributário",
    text: "Sessões com especialistas convidados sobre estruturas associativas e como elas podem reduzir a carga tributária legalmente.",
  },
  {
    title: "Acesso a Capital",
    text: "Apresentação de linhas de crédito, editais públicos e investidores interessados em negócios da região.",
  },
];

/* =========================================================
   PÁGINA
========================================================= */

export default function Projetos() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="bg-neutral-900 px-6 py-20 text-center md:px-8 md:py-24">
        <RevealText
          text="Projetos"
          as="h1"
          className="mb-6 text-4xl font-light md:text-5xl"
        />
        <RevealBlock delay={0.15}>
          <p className="mx-auto max-w-2xl text-lg text-white/70">
            Além de construir marcas, construímos o ecossistema em volta delas: uma rede de empresas que crescem
            juntas, em vez de competir sozinhas.
          </p>
        </RevealBlock>
      </section>

      {/* ---------- PILARES ---------- */}
      <section className="bg-neutral-900 px-6 pb-24 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                variants={cardV}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className="rounded-2xl bg-neutral-800 p-7 shadow-lg"
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-full text-black"
                  style={{ backgroundColor: p.accent }}
                >
                  <Icon size={18} />
                </span>
                <h2 className="mb-1.5 mt-5 text-xl font-semibold">{p.title}</h2>
                <p className="text-[14.5px] leading-relaxed text-white/65">{p.text}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ---------- WORKSHOPS ---------- */}
      <section className="bg-black px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <RevealText
            text="Encontros e workshops"
            as="h2"
            className="text-3xl font-light leading-tight md:text-4xl"
          />
          <RevealBlock delay={0.15}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
              Formatos pensados para transformar a rede em resultado prático, não apenas em contatos guardados.
            </p>
          </RevealBlock>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {workshops.map((w) => (
              <motion.div
                key={w.title}
                variants={cardV}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className="rounded-2xl border border-white/10 p-7"
              >
                <h3 className="text-lg font-semibold text-white">{w.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-white/60">{w.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="bg-neutral-900 px-6 py-24 text-center md:px-8 md:py-28">
        <RevealText
          text="Quer fazer parte da rede?"
          as="h2"
          className="mx-auto max-w-2xl text-3xl font-light tracking-wide md:text-5xl"
        />
        <RevealBlock delay={0.2} className="mt-8 flex justify-center">
          <Link
            href="/contato"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition-colors hover:bg-white/85"
          >
            Falar com a Polymata
            <ArrowRight size={15} />
          </Link>
        </RevealBlock>
      </section>
    </main>
  );
}