"use client";

import { motion, type Variants } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Check,
  MapPin,
  Sparkles,
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
  "Fotografias ultraprofissionais dos seus produtos e serviços",
  "Catálogo audiovisual sempre atualizado",
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

/** botão grande e evidente, com área de toque confortável: usado só quando leva a algo real na própria página */
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
      className="flex min-h-12 w-full min-w-0 items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-3 text-left text-[15px] font-medium leading-snug text-white transition-colors hover:bg-white/[0.12] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-black">{icon}</span>
      <span className="min-w-0 flex-1 break-words leading-snug">{children}</span>
      <ArrowDown size={16} className="shrink-0 text-white/60" />
    </button>
  );
}

/** link real (não botão decorativo): sempre leva a um destino concreto */
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="flex min-h-12 w-full min-w-0 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-center font-medium leading-snug text-black transition-colors hover:bg-gray-300 sm:px-6"
    >
      <span className="min-w-0 break-words text-center">{children}</span>
      <ArrowRight size={15} className="shrink-0" />
    </Link>
  );
}

function BackToServices() {
  return (
    <div className="mt-10 flex justify-center px-2">
      <button
        type="button"
        onClick={() => goTo("servicos")}
        className="inline-flex min-h-11 max-w-full min-w-0 items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-center text-sm leading-snug text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:px-5"
      >
        <ArrowUp size={15} className="shrink-0" />
          <span className="min-w-0 break-words">Voltar aos serviços</span>
      </button>
    </div>
  );
}

/* =========================================================
   ILUSTRAÇÕES: uma pequena cena animada por card
========================================================= */

function DesignIllustration() {
  const colors = ["#F87171", "#FBBF24", "#34D399", "#60A5FA", "#C084FC"];
  return (
    <div className="relative flex h-28 min-w-0 items-center justify-center overflow-visible">
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
    <div className="flex h-28 min-w-0 flex-col items-center justify-center gap-2.5">
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
    <div className="flex h-28 min-w-0 items-center justify-center overflow-visible">
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
      className="scroll-mt-24 flex min-w-0 flex-col justify-between overflow-visible rounded-2xl bg-neutral-800 p-6 shadow-lg sm:p-7 md:p-8"
    >
      <div className="min-w-0">
        <motion.div variants={itemV} className="flex min-w-0 items-center justify-between">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-full text-black"
            style={{ backgroundColor: accent }}
          >
            {icon}
          </span>
          <span className="text-xs font-medium tracking-[0.2em] text-white/25">{index}</span>
        </motion.div>

        <motion.h2 variants={itemV} className="mb-1.5 mt-5 break-words text-2xl font-semibold leading-tight sm:text-3xl">
          {title}
        </motion.h2>
        <motion.p variants={itemV} className="text-[14.5px] leading-relaxed text-white/55">
          {tagline}
        </motion.p>

        <motion.div variants={cardV} className="mt-2 min-w-0 overflow-visible">
          {illustration}
        </motion.div>

        <motion.ul variants={listV} className="mt-4 min-w-0 space-y-2.5">
          {bullets.map((b) => (
            <motion.li
              key={b}
              variants={itemV}
              className="flex min-w-0 items-start gap-2.5 text-[14.5px] leading-relaxed text-white/85"
            >
              <span
                className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: `${accent}33`, color: accent }}
              >
                <Check size={10} strokeWidth={3} />
              </span>
              <span className="min-w-0 break-words">{b}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <div className="mt-8 min-w-0 space-y-2.5">{footer}</div>
    </motion.div>
  );
}

/* =========================================================
   PÁGINA
========================================================= */

export default function Services() {
  return (
    <main className="min-h-screen overflow-x-clip bg-black text-white">
      <Navbar />

      <section className="overflow-x-clip bg-neutral-900 px-5 py-20 text-center sm:px-6 md:px-8 md:py-24">
        <h1 className="mb-6 break-words text-3xl font-light leading-tight sm:text-4xl md:text-5xl">Nossos Serviços</h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
          Conheça nossas soluções pensadas para destacar sua marca, gerar credibilidade e expandir seus negócios de
          forma estratégica.
        </p>
      </section>

      {/* ---------- CARDS DE SERVIÇO ---------- */}
      <section id="servicos" className="scroll-mt-20 overflow-x-clip bg-neutral-900 px-5 pb-20 sm:px-6 md:px-8 md:pb-24">
        <div className="mx-auto grid min-w-0 max-w-7xl gap-5 md:grid-cols-3 md:gap-8 lg:gap-10">
          <ServiceCard
            anchorId="design"
            index="01"
            icon={<Palette size={18} />}
            title="Design de Produto"
            tagline="Design orgânico e marcante para sua empresa, longe do genérico."
            accent="#F97316"
            illustration={<DesignIllustration />}
            bullets={[
              "Logomarca autoral e exclusiva",
              "Paleta de cores memorável",
              "Toda a ciência aplicada ao marketing",
              "Realidade que se destaca em meio ao conteúdo gerado por IA",
            ]}
            footer={
              <>
                <DemoButton target="demo-design" icon={<Sparkles size={16} />}>
                  Por que design orgânico?
                </DemoButton>
                <FooterLink href="/contato">Conversar sobre este serviço</FooterLink>
              </>
            }
          />

          <ServiceCard
            anchorId="credibilidade"
            index="02"
            icon={<ShieldCheck size={18} />}
            title="Credibilidade"
            tagline="Tá começando? Não se preocupe! Sabemos exatamente o que preocupa o cliente e como ele valida seu preço."
            accent="#34D399"
            illustration={<CredibilityIllustration />}
            bullets={[
              "Construímos a prova social do seu negócio",
              "Catalogamos seus produtos com o melhor do audiovisual",
              "Fotografias ultraprofissionais",
              "Filmagens cinematográficas",
              "Perfil excelente no Google Maps",
              "Impulsionamento estratégico online",
            ]}
            footer={
              <>
                <DemoButton target="demo-mapa" icon={<MapPin size={16} />}>
                  Ver modelos de maps
                </DemoButton>
                <DemoButton target="demo-catalogo" icon={<UtensilsCrossed size={16} />}>
                  Ver mais
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

      {/* ---------- DESIGN ORGÂNICO ---------- */}
      <section id="demo-design" className="scroll-mt-16 overflow-x-clip bg-black px-5 py-20 sm:px-6 md:px-8 md:py-28">
        <div className="mx-auto min-w-0 max-w-3xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#F97316]">Design orgânico</span>
          <h2 className="mt-4 break-words text-3xl font-light leading-tight md:text-4xl">
            Em um mundo cheio de IA, a realidade se destaca
          </h2>
          <p className="mt-6 break-words text-base leading-relaxed text-white/70 sm:text-lg">
            Pesquisas apontam que o consumidor de alto padrão percebe produtos gerados por IA e sente distanciamento
            e repulsa. Em um mundo onde muitos usam esse recurso para apresentar seus serviços, a realidade se
            destaca e agrega valor.
          </p>
          <p className="mt-4 break-words text-base leading-relaxed text-white/70 sm:text-lg">
            Fazemos design orgânico e marcante para sua empresa, utilizando toda a ciência aplicada ao marketing.
          </p>
          <div className="mx-auto mt-10 max-w-sm">
            <FooterLink href="/contato">Quero um design autoral</FooterLink>
          </div>
        </div>
        <BackToServices />
      </section>

      {/* ---------- DEMO 1: MAPA E AVALIAÇÕES ---------- */}
      <section id="demo-mapa" className="scroll-mt-16 overflow-x-clip bg-neutral-900 px-5 py-20 sm:px-6 md:px-8 md:py-28">
        <div className="mx-auto grid min-w-0 max-w-7xl items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <h2 className="break-words text-3xl font-light leading-tight md:text-4xl">
              Seu negócio no topo das buscas e no mapa
            </h2>
            <p className="mt-5 max-w-lg break-words text-base leading-relaxed text-white/70 sm:text-lg">
              Quando alguém pesquisa o que você vende, o seu perfil aparece completo, bonito e com a nota que
              conquistou.
            </p>

            <ul className="mt-8 space-y-3.5">
              {mapPoints.map((point) => (
                <li key={point} className="flex min-w-0 items-start gap-3 text-white/85">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-black">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span className="min-w-0 break-words">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <LocationMap />
        </div>
        <BackToServices />
      </section>

      {/* ---------- DEMO 2: CARDÁPIO E PEDIDOS ---------- */}
      <section id="demo-catalogo" className="scroll-mt-16 overflow-x-clip bg-black px-5 py-20 sm:px-6 md:px-8 md:py-28">
        <div className="mx-auto min-w-0 max-w-7xl">
          <div className="mx-auto min-w-0 max-w-2xl text-center">
            <h2 className="break-words text-3xl font-light leading-tight md:text-4xl">Do cardápio direto para a cozinha</h2>
            <p className="mt-5 break-words text-base leading-relaxed text-white/70 sm:text-lg">
              O cliente escolhe entre pratos fotografados em excelente qualidade por profissionais da nossa equipe,
              editados por designers e descritos de forma atraente para o consumidor. O cliente pede em segundos e
              acompanha o preparo pelo celular, diminuindo a carga do trabalhador. Na cozinha, o pedido aparece na
              hora e o garçom já é avisado.
            </p>
            <p className="mt-4 text-sm text-white/50">
              Teste você mesmo: adicione um prato no celular e toque em &quot;Fazer pedido&quot;.
            </p>
          </div>

          <div className="mt-10 min-w-0 overflow-hidden rounded-[32px] bg-[#efeee8] p-3 text-black sm:p-4 md:mt-12 md:p-8">
            <ProductCatalog />
          </div>
        </div>
        <BackToServices />
      </section>
    </main>
  );
}