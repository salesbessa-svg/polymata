"use client";

import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Coins,
  GraduationCap,
  Handshake,
  Landmark,
  Network,
  PartyPopper,
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
    text: "Funciona por meio de uma análise semestral do andamento da sua empresa. Te colocamos onde você não sabia que podia chegar, aprimorando seu modelo de negócio e suas especificidades.",
  },
  {
    icon: Network,
    accent: "#34D399",
    title: "Comunidade",
    text: "Um espaço para discutirmos soluções e contratos facilitados com fornecedores e contratantes do seu serviço. Uma rede mesmo!",
  },
  {
    icon: Landmark,
    accent: "#60A5FA",
    title: "Estratégia Tributária",
    text: "Analisamos onde você perde dinheiro e sugerimos estratégias de elisão fiscal, acordos e contratos para reduzir os impostos dentro da lei. O planejamento formal, a contabilidade e a parte jurídica ficam com contadores e advogados parceiros da rede. Também diminuímos custos de operação como água, luz e ingredientes, e enxugamos onde mais vaza dinheiro da sua receita sem que você perceba.",
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
   REDE DE CONTATOS E WORKSHOPS
========================================================= */

const network = [
  "Gestores empresariais",
  "Associações sociais",
  "Associações atléticas",
  "Bancos",
  "Advogados",
];

const workshopTopics = [
  "Escalabilidade empresarial",
  "Elisão fiscal",
  "Investimento",
  "Estratégia comercial",
  "Automação de processos",
  "Redução de custos",
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
            Além de construirmos marcas por todo o Estado de São Paulo, fazemos com que cada empresa nova ganhe seu
            espaço na nossa rede de contatos.
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

      {/* ---------- REDE DE CONTATOS ---------- */}
      <section className="bg-black px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl text-center">
          <RevealText
            text="Uma rede inteira esperando por você"
            as="h2"
            className="mx-auto max-w-3xl text-3xl font-light leading-tight md:text-4xl"
          />
          <RevealBlock delay={0.15}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
              Possuímos uma rede de contatos com gestores empresariais, associações sociais, associações atléticas,
              bancos e advogados esperando você entrar nessa.
            </p>
          </RevealBlock>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {network.map((n) => (
              <motion.span
                key={n}
                variants={cardV}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm text-white/85"
              >
                {n}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- ENCONTROS E WORKSHOPS ---------- */}
      <section className="bg-neutral-900 px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <RevealText
            text="Não pode faltar festa!"
            as="h2"
            className="text-3xl font-light leading-tight md:text-4xl"
          />
          <RevealBlock delay={0.15}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
              Realizamos encontros exclusivos para quem se torna Polymata.
            </p>
          </RevealBlock>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <motion.div
              variants={cardV}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="rounded-2xl bg-neutral-800 p-7 shadow-lg"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FBBF24] text-black">
                <PartyPopper size={18} />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-white">Workshop com especialistas do ramo</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-white/60">Temas como:</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {workshopTopics.map((t) => (
                  <span key={t} className="rounded-full bg-white/[0.07] px-3.5 py-1.5 text-[13px] text-white/85">
                    {t}
                  </span>
                ))}
                <span className="rounded-full px-1 py-1.5 text-[13px] text-white/50">e muito mais</span>
              </div>
            </motion.div>

            <motion.div
              variants={cardV}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="rounded-2xl bg-neutral-800 p-7 shadow-lg"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#34D399] text-black">
                <Handshake size={18} />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-white">A cooperação fortalece!</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-white/60">
                Muitos empresários trabalham com tentativa e erro. Aqui nós fazemos você aprender antes de errar.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="bg-black px-6 py-24 text-center md:px-8 md:py-28">
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