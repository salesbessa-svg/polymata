"use client";

import { motion, type Variants } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Check,
  MapPin,
  Palette,
  ShieldCheck,
  Star,
  TrendingUp,
  UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import LocationMap from "@/components/LocationMap";
import ProductCatalog from "@/components/ProductCatalog";

const mapPoints = [
  "Perfil completo nas buscas e no mapa",
  "Avaliações positivas que geram confiança",
  "Fotos de altíssima qualidade dos seus produtos e serviços",
  "Catálogo bonito e sempre atualizado",
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* =========================================================
   ANIMAÇÕES
========================================================= */

const cardV: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, staggerChildren: 0.12, delayChildren: 0.05 },
  },
};
const itemV: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};
const listV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};
const popV: Variants = {
  hidden: { opacity: 0, scale: 0 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 380, damping: 15 } },
};

/* =========================================================
   AÇÕES DE NAVEGAÇÃO
========================================================= */

/** rola até uma seção respeitando "reduzir movimento" */
function goTo(id: string) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

/** botão grande e evidente, com área de toque confortável — usado só quando leva a algo real na própria página */
function DemoButton({
  target,
  icon,
  children,
}: {
  target: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => goTo(target)}
      className="flex min-h-12 w-full items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-3 text-left text-[15px] font-medium text-white transition-colors hover:bg-white/[0.12] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-black">{icon}</span>
      <span className="flex-1">{children}</span>
      <ArrowDown size={16} className="shrink-0 text-white/60" />
    </button>
  );
}

/** link real (não botão decorativo): sempre leva a um destino concreto */
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-2.5 font-medium text-black transition-colors hover:bg-gray-300"
    >
      {children}
      <ArrowRight size={15} />
    </Link>
  );
}

function BackToServices() {
  return (
    <div className="mt-10 flex justify-center">
      <button
        type="button"
        onClick={() => goTo("servicos")}
        className="flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
      >
        <ArrowUp size={15} /> Voltar aos serviços
      </button>
    </div>
  );
}

/* =========================================================
   ILUSTRAÇÕES — uma pequena cena animada por card
========================================================= */

function DesignIllustration() {
  const colors = ["#F87171", "#FBBF24", "#34D399", "#60A5FA", "#C084FC"];
  return (
    <div className="relative flex h-28 items-center justify-center">
      <motion.div
        variants={itemV}
        className="absolute left-1/2 top-1/2 flex h-16 w-24 -translate-x-[70%] -translate-y-1/2 -rotate-6 flex-col items-center justify-center gap-1.5 rounded-xl bg-white/10 text-white/40"
      >
        <span className="h-6 w-6 rounded-full bg-white/20" />
        <span className="text-[9px] uppercase tracking-wide">genérico</span>
      </motion.div>

      <motion.div
        variants={popV}
        className="relative z-10 flex h-20 w-28 translate-x-[8%] rotate-3 flex-col items-center justify-center gap-1.5 rounded-xl shadow-lg"
        style={{ background: "linear-gradient(135deg, #F97316, #C084FC)" }}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-bold text-neutral-900">
          A
        </span>
        <span className="text-[9px] font-medium uppercase tracking-wide text-white/90">sua marca</span>
      </motion.div>

      <div className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 gap-1.5">
        {colors.map((c) => (
          <motion.span
            key={c}
            variants={popV}
            className="h-3 w-3 rounded-full ring-2 ring-neutral-800"
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
    </div>
  );
}

function CredibilityIllustration() {
  return (
    <div className="flex h-28 flex-col items-center justify-center gap-2.5">
      <div className="flex items-center gap-1.5">
        <motion.span variants={itemV} className="text-lg font-semibold text-white">
          4,9
        </motion.span>
        <span className="flex text-[#FBBC04]">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.span key={i} variants={popV} className="inline-flex">
              <Star size={13} fill="currentColor" strokeWidth={0} />
            </motion.span>
          ))}
        </span>
        <motion.span
          variants={popV}
          className="flex h-4 w-4 items-center justify-center rounded-full bg-[#1a73e8] text-white"
        >
          <ShieldCheck size={11} />
        </motion.span>
      </div>

      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            variants={popV}
            className="h-9 w-11 rounded-md"
            style={{ background: `linear-gradient(135deg, rgba(52,211,153,${0.2 + i * 0.1}), rgba(52,211,153,0.55))` }}
          />
        ))}
      </div>

      <motion.span variants={itemV} className="text-[10.5px] text-white/40">
        328 avaliações · catálogo atualizado
      </motion.span>
    </div>
  );
}

function StrategyIllustration() {
  const points = [
    { x: 12, y: 74 },
    { x: 46, y: 55 },
    { x: 80, y: 62 },
    { x: 116, y: 30 },
    { x: 150, y: 40 },
    { x: 170, y: 18 },
  ];
  return (
    <div className="flex h-28 items-center justify-center">
      <svg viewBox="0 0 180 90" className="h-24 w-full max-w-[230px]" aria-hidden="true">
        <motion.path
          d="M12 74 L46 55 L80 62 L116 30 L150 40 L170 18"
          fill="none"
          stroke="#60A5FA"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={itemV}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.25 }}
        />
        {points.map((p, i) => (
          <motion.circle key={i} cx={p.x} cy={p.y} r="4.5" fill="#60A5FA" variants={popV} />
        ))}
      </svg>
    </div>
  );
}

/* =========================================================
   CARTÃO DE SERVIÇO
========================================================= */

function ServiceCard({
  anchorId,
  index,
  icon,
  title,
  tagline,
  accent,
  illustration,
  bullets,
  footer,
}: {
  anchorId: string;
  index: string;
  icon: React.ReactNode;
  title: string;
  tagline: string;
  accent: string;
  illustration: React.ReactNode;
  bullets: string[];
  footer: React.ReactNode;
}) {
  return (
    <motion.div
      id={anchorId}
      variants={cardV}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className="scroll-mt-24 flex flex-col justify-between rounded-2xl bg-neutral-800 p-7 shadow-lg md:p-8"
    >
      <div>
        <motion.div variants={itemV} className="flex items-center justify-between">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-full text-black"
            style={{ backgroundColor: accent }}
          >
            {icon}
          </span>
          <span className="text-xs font-medium tracking-[0.2em] text-white/25">{index}</span>
        </motion.div>

        <motion.h2 variants={itemV} className="mb-1.5 mt-5 text-3xl font-semibold">
          {title}
        </motion.h2>
        <motion.p variants={itemV} className="text-[14.5px] leading-relaxed text-white/55">
          {tagline}
        </motion.p>

        <motion.div variants={cardV} className="mt-2">
          {illustration}
        </motion.div>

        <motion.ul variants={listV} className="mt-4 space-y-2.5">
          {bullets.map((b) => (
            <motion.li
              key={b}
              variants={itemV}
              className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-white/85"
            >
              <span
                className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: `${accent}33`, color: accent }}
              >
                <Check size={10} strokeWidth={3} />
              </span>
              {b}
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <div className="mt-8 space-y-2.5">{footer}</div>
    </motion.div>
  );
}

/* =========================================================
   PÁGINA
========================================================= */

export default function Services() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="bg-neutral-900 px-6 py-20 text-center md:px-8 md:py-24">
        <h1 className="mb-6 text-4xl font-light md:text-5xl">Nossos Serviços</h1>
        <p className="mx-auto max-w-2xl text-lg text-white/70">
          Conheça nossas soluções pensadas para destacar sua marca, gerar credibilidade e expandir seus negócios de
          forma estratégica.
        </p>
      </section>

      {/* ---------- CARDS DE SERVIÇO ---------- */}
      <section id="servicos" className="scroll-mt-20 bg-neutral-900 px-6 pb-24 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3 md:gap-10">
          <ServiceCard
            anchorId="design"
            index="01"
            icon={<Palette size={18} />}
            title="Design de Produto"
            tagline="Uma marca que se destaca à primeira vista, longe do genérico."
            accent="#F97316"
            illustration={<DesignIllustration />}
            bullets={[
              "Logomarca autoral e exclusiva",
              "Paleta de cores memorável",
              "Diferenciação de produtos genéricos gerados por IA",
            ]}
            footer={
              <FooterLink href="/contato">Conversar sobre este serviço</FooterLink>
            }
          />

          <ServiceCard
            anchorId="credibilidade"
            index="02"
            icon={<ShieldCheck size={18} />}
            title="Credibilidade"
            tagline="Prova social visível bem onde o seu cliente já está procurando."
            accent="#34D399"
            illustration={<CredibilityIllustration />}
            bullets={[
              "Fotos de altíssima qualidade dos seus produtos e serviços",
              "Avaliações reais que geram confiança",
              "Catálogo sempre atualizado",
              "Presença completa em apps de busca e mapas",
            ]}
            footer={
              <>
                <DemoButton target="demo-mapa" icon={<MapPin size={16} />}>
                  Ver mapa e avaliações
                </DemoButton>
                <DemoButton target="demo-catalogo" icon={<UtensilsCrossed size={16} />}>
                  Ver cardápio e pedidos
                </DemoButton>
              </>
            }
          />

          <ServiceCard
            anchorId="estrategia"
            index="03"
            icon={<TrendingUp size={18} />}
            title="Estratégia Regionalizada"
            tagline="Dados e contatos certos para crescer na sua região."
            accent="#60A5FA"
            illustration={<StrategyIllustration />}
            bullets={[
              "Mapeamento do mercado regional",
              "Identificação de oportunidades locais",
              "Rede de contatos estratégicos",
            ]}
            footer={<FooterLink href="/projetos">Conhecer os projetos</FooterLink>}
          />
        </div>
      </section>

      {/* ---------- DEMO 1: MAPA E AVALIAÇÕES ---------- */}
      <section id="demo-mapa" className="scroll-mt-16 bg-black px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <h2 className="text-3xl font-light leading-tight md:text-4xl">
              Seu negócio no topo das buscas e no mapa
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/70">
              Quando alguém pesquisa o que você vende, o seu perfil aparece completo, bonito e com a nota que
              conquistou.
            </p>

            <ul className="mt-8 space-y-3.5">
              {mapPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-white/85">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-black">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <LocationMap />
        </div>
        <BackToServices />
      </section>

      {/* ---------- DEMO 2: CARDÁPIO E PEDIDOS ---------- */}
      <section id="demo-catalogo" className="scroll-mt-16 bg-neutral-900 px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-light leading-tight md:text-4xl">Do cardápio direto para a cozinha</h2>
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              O cliente escolhe entre pratos fotografados em excelente qualidade por profissionais da nossa equipe,
              editados por designers e descritos de forma atraente para o consumidor. O cliente pede em segundos e
              acompanha o preparo pelo celular, diminuindo a carga do trabalhador. Na cozinha, o pedido aparece na
              hora e o garçom já é avisado.
            </p>
            <p className="mt-4 text-sm text-white/50">
              Teste você mesmo: adicione um prato no celular e toque em &quot;Fazer pedido&quot;.
            </p>
          </div>

          <div className="mt-12 rounded-[32px] bg-[#efeee8] p-4 text-black md:p-8">
            <ProductCatalog />
          </div>
        </div>
        <BackToServices />
      </section>
    </main>
  );
}