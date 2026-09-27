"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  animate,
  motion,
  type Variants,
} from "framer-motion";

/* =========================================================
   DADOS  (troque nomes, textos e emojis por casos reais)
   x / y = posição do ponto no mapa, em %
========================================================= */

type Place = {
  emoji: string;
  color: string;
  glow: string;
  x: number;
  y: number;
  query: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  /** 3 "fotos" (aqui emojis; troque por <Image /> com fotos reais) */
  photos: [string, string, string];
  catalog: { name: string; price: string }[];
  comments: { author: string; text: string }[];
};

const places: Place[] = [
  {
    emoji: "🍔",
    color: "#FF5C5C",
    glow: "rgba(255,92,92,0.45)",
    x: 24,
    y: 58,
    query: "hamburgueria perto de mim",
    name: "Brasa & Chama Burgers",
    category: "Hamburgueria",
    rating: 4.9,
    reviews: 1284,
    photos: ["🍔", "🍟", "🥤"],
    catalog: [
      { name: "Smash duplo", price: "R$ 32" },
      { name: "Costela e bacon", price: "R$ 39" },
      { name: "Batata rústica", price: "R$ 18" },
    ],
    comments: [
      { author: "Mariana S.", text: "Melhor burger da região! Carne no ponto e atendimento impecável." },
      { author: "Rafael T.", text: "As fotos no Maps me fizeram ir. Valeu cada mordida." },
    ],
  },
  {
    emoji: "🍕",
    color: "#FF9F43",
    glow: "rgba(255,159,67,0.45)",
    x: 42,
    y: 40,
    query: "pizzaria perto de mim",
    name: "Forno & Fatia",
    category: "Pizzaria",
    rating: 4.8,
    reviews: 972,
    photos: ["🍕", "🌿", "🍷"],
    catalog: [
      { name: "Margherita", price: "R$ 54" },
      { name: "Calabresa artesanal", price: "R$ 62" },
      { name: "Quatro queijos", price: "R$ 68" },
    ],
    comments: [
      { author: "Camila R.", text: "Massa leve, borda perfeita. Já virou a pizza da nossa sexta." },
      { author: "Bruno A.", text: "Achei pelo Google e não me arrependi. Entrega rápida!" },
    ],
  },
  {
    emoji: "🍣",
    color: "#D946EF",
    glow: "rgba(217,70,239,0.45)",
    x: 64,
    y: 58,
    query: "restaurante japonês perto de mim",
    name: "Sakura Sushi Bar",
    category: "Restaurante japonês",
    rating: 4.9,
    reviews: 1510,
    photos: ["🍣", "🍱", "🥢"],
    catalog: [
      { name: "Combo 20 peças", price: "R$ 89" },
      { name: "Temaki de salmão", price: "R$ 32" },
      { name: "Yakisoba", price: "R$ 46" },
    ],
    comments: [
      { author: "Juliana K.", text: "Peixe fresquíssimo e uma apresentação linda em cada prato." },
      { author: "Thiago M.", text: "Cardápio completo e atualizado. Pedi sem nenhuma dúvida." },
    ],
  },
  {
    emoji: "💅",
    color: "#EC4899",
    glow: "rgba(236,72,153,0.45)",
    x: 74,
    y: 40,
    query: "salão de beleza perto de mim",
    name: "Studio Lumière",
    category: "Salão de beleza",
    rating: 5.0,
    reviews: 642,
    photos: ["💅", "✨", "🌸"],
    catalog: [
      { name: "Manicure em gel", price: "R$ 70" },
      { name: "Escova modelada", price: "R$ 80" },
      { name: "Hidratação", price: "R$ 95" },
    ],
    comments: [
      { author: "Patrícia L.", text: "Ambiente lindo e um resultado impecável. Saí me sentindo ótima!" },
      { author: "Renata O.", text: "Agendei pelo perfil e amei o atendimento de ponta a ponta." },
    ],
  },
  {
    emoji: "💇",
    color: "#8B5CF6",
    glow: "rgba(139,92,246,0.45)",
    x: 56,
    y: 66,
    query: "design de cabelo perto de mim",
    name: "Atelier do Cabelo",
    category: "Design de cabelo",
    rating: 4.9,
    reviews: 418,
    photos: ["💇", "✂️", "💆"],
    catalog: [
      { name: "Corte e finalização", price: "R$ 120" },
      { name: "Coloração", price: "R$ 230" },
      { name: "Mechas", price: "R$ 380" },
    ],
    comments: [
      { author: "Fernanda C.", text: "Saí com o cabelo dos sonhos. Profissionais incríveis!" },
      { author: "Lucas P.", text: "As fotos de antes e depois me convenceram na hora." },
    ],
  },
  {
    emoji: "🏠",
    color: "#14B8A6",
    glow: "rgba(20,184,166,0.45)",
    x: 34,
    y: 66,
    query: "loja de decoração perto de mim",
    name: "Casa Nova Decor",
    category: "Loja de decoração",
    rating: 4.8,
    reviews: 356,
    photos: ["🏠", "🕯️", "🌿"],
    catalog: [
      { name: "Vaso de cerâmica", price: "R$ 89" },
      { name: "Luminária de linho", price: "R$ 149" },
      { name: "Kit de almofadas", price: "R$ 119" },
    ],
    comments: [
      { author: "Aline B.", text: "Produtos lindos, bem embalados e a entrega foi rápida." },
      { author: "Diego F.", text: "Vi o catálogo no Maps e comprei na hora. Recomendo!" },
    ],
  },
];

/* =========================================================
   TIMELINE (ms) de cada estabelecimento
========================================================= */

const T = {
  zoom: 1900, // busca digitada -> zoom no ponto
  pin: 3200, // zoom terminou -> pin cai
  card: 4000, // perfil sobe
  out: 10500, // perfil sai, mapa afasta
  next: 11900, // troca de estabelecimento
};
const ZOOM = 2.8;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Phase = "search" | "zoom" | "pin" | "card" | "out";

/* =========================================================
   MAPA (SVG)
========================================================= */

const blocks = [
  { x: 30, y: 110, w: 120, h: 80 },
  { x: 170, y: 90, w: 100, h: 70 },
  { x: 290, y: 60, w: 130, h: 90 },
  { x: 40, y: 290, w: 110, h: 85 },
  { x: 180, y: 280, w: 120, h: 90 },
  { x: 470, y: 70, w: 110, h: 75 },
  { x: 460, y: 300, w: 120, h: 90 },
  { x: 60, y: 420, w: 140, h: 70 },
  { x: 250, y: 420, w: 110, h: 65 },
  { x: 640, y: 120, w: 110, h: 95 },
];

const roads = [
  { d: "M -20 250 L 820 210", w: 26 },
  { d: "M -20 385 L 820 425", w: 20 },
  { d: "M 385 -20 L 425 520", w: 22 },
  { d: "M 570 -20 L 520 520", w: 12 },
];

const streets = [
  "M 10 170 L 400 240",
  "M 120 40 L 330 250",
  "M 20 330 L 380 250",
  "M 130 500 L 420 360",
  "M 600 150 L 800 190",
  "M 600 340 L 800 290",
];

const trees: [number, number][] = [
  [40, 50], [90, 30], [140, 65], [190, 40], [240, 70], [70, 90],
  [640, 430], [690, 470], [740, 420], [710, 400], [770, 465],
];

function MapBase() {
  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <rect width="800" height="500" fill="#e6e8e2" />
      <ellipse cx="110" cy="60" rx="190" ry="62" fill="#cfe3c9" transform="rotate(-8 110 60)" />
      <ellipse cx="700" cy="450" rx="160" ry="70" fill="#c9dfc3" transform="rotate(12 700 450)" />
      {trees.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="7" fill="#b7d4af" />
      ))}

      <path
        d="M 640 -20 C 720 120, 590 260, 700 380 S 770 480, 820 520"
        fill="none"
        stroke="#bcdde9"
        strokeWidth="48"
        strokeLinecap="round"
      />

      {blocks.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="8" fill="#d5d8d2" />
          <rect x={b.x + 7} y={b.y + 7} width={b.w - 14} height={b.h - 14} rx="5" fill="#dcdfda" />
        </g>
      ))}

      {streets.map((d, i) => (
        <path key={i} d={d} stroke="#fff" strokeOpacity="0.85" strokeWidth="6" fill="none" />
      ))}

      {roads.map((r, i) => (
        <g key={i} fill="none">
          <path d={r.d} stroke="#cfd2cc" strokeWidth={r.w + 3} />
          <path d={r.d} stroke="#fff" strokeWidth={r.w} />
        </g>
      ))}

      <g fill="rgba(0,0,0,0.3)" fontSize="12" fontWeight="500" letterSpacing="1.6">
        <text x="60" y="80">Jardim Central</text>
        <text x="455" y="45" transform="rotate(2 455 45)">Avenida Paulista</text>
        <text x="600" y="270">Centro</text>
        <text x="210" y="470" transform="rotate(-6 210 470)">Rua Principal</text>
      </g>
    </svg>
  );
}

/* =========================================================
   PEQUENOS COMPONENTES
========================================================= */

function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.5l2.94 5.96 6.58.96-4.76 4.64 1.12 6.55L12 17.52l-5.88 3.09 1.12-6.55L2.48 9.42l6.58-.96L12 2.5z" />
    </svg>
  );
}

function Verified() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-[#1a73e8]" aria-label="Perfil verificado">
      <path
        fill="currentColor"
        d="M12 1.8l2.4 1.7 2.9-.1 1 2.8 2.4 1.7-.9 2.8.9 2.8-2.4 1.7-1 2.8-2.9-.1L12 20.2l-2.4-1.7-2.9.1-1-2.8-2.4-1.7.9-2.8-.9-2.8 2.4-1.7 1-2.8 2.9.1L12 1.8z"
      />
      <path d="M8 12.2l2.7 2.7L16.2 9.4" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CountUp({ to }: { to: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const controls = animate(0, to, {
      duration: 1.1,
      ease: "easeOut",
      onUpdate: setV,
    });
    return () => controls.stop();
  }, [to]);
  return <>{v.toFixed(1).replace(".", ",")}</>;
}

function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <motion.span key={i} variants={wordV} className="mr-[0.28em] inline-block">
          {w}
        </motion.span>
      ))}
    </>
  );
}

function useTyping(text: string, speed = 42) {
  const [state, setState] = useState({ text: "", n: 0 });
  useEffect(() => {
    let n = 0;
    const id = setInterval(() => {
      n += 1;
      setState({ text, n });
      if (n >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return state.text === text ? text.slice(0, state.n) : "";
}

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return desktop;
}

/* =========================================================
   VARIANTS DO PERFIL
========================================================= */

const cardV: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, staggerChildren: 0.3, delayChildren: 0.2 },
  },
  exit: { opacity: 0, y: 16, transition: { duration: 0.35 } },
};

const itemV: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const reviewV: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE, staggerChildren: 0.035, delayChildren: 0.3 },
  },
};

const wordV: Variants = {
  hidden: { opacity: 0, y: 4 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const starV: Variants = {
  hidden: { opacity: 0, scale: 0 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 420, damping: 14 } },
};

const tileV: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
};

/* =========================================================
   PERFIL (estilo Google Maps)
========================================================= */

function ProfileCard({ p }: { p: Place }) {
  return (
    <motion.article
      variants={cardV}
      initial="hidden"
      animate="show"
      exit="exit"
      className="pointer-events-auto rounded-2xl border border-black/5 bg-white/95 p-3.5 shadow-[0_24px_60px_-18px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-4"
    >
      {/* cabeçalho + nota */}
      <motion.header variants={itemV}>
        <div className="flex items-center gap-1.5">
          <h3 className="truncate text-[15px] font-semibold text-neutral-900">{p.name}</h3>
          <Verified />
        </div>

        <div className="mt-1 flex items-center gap-1.5 text-xs text-neutral-600">
          <span className="text-sm font-semibold tabular-nums text-neutral-900">
            <CountUp to={p.rating} />
          </span>
          <span className="flex text-[#FBBC04]">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.span key={i} variants={starV} className="inline-flex">
                <Star className="h-3.5 w-3.5" />
              </motion.span>
            ))}
          </span>
          <span>({p.reviews.toLocaleString("pt-BR")})</span>
        </div>

        <p className="mt-0.5 text-xs text-neutral-500">
          {p.category} ·{" "}
          <span className="font-medium text-emerald-600">Aberto agora</span>
        </p>
      </motion.header>

      {/* fotos */}
      <motion.div variants={itemV} className="mt-3 grid grid-cols-3 gap-1.5">
        {p.photos.map((e, i) => (
          <motion.div
            key={i}
            variants={tileV}
            className="relative flex h-14 items-center justify-center overflow-hidden rounded-lg sm:h-16 md:h-[68px]"
            style={{ background: `linear-gradient(135deg, ${p.color}33, ${p.color}b3)` }}
          >
            <span className="text-2xl md:text-3xl">{e}</span>
            <span className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-transparent" />
          </motion.div>
        ))}
      </motion.div>

      {/* avaliações */}
      <div className="mt-3 space-y-2">
        {p.comments.map((c) => (
          <motion.div
            key={c.author}
            variants={reviewV}
            className="flex gap-2.5 rounded-xl bg-black/[0.035] p-2.5"
          >
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
              style={{ backgroundColor: p.color }}
            >
              {c.author[0]}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-neutral-800">{c.author}</span>
                <span className="flex text-[#FBBC04]">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-2.5 w-2.5" />
                  ))}
                </span>
              </div>
              <p className="mt-0.5 text-[12px] leading-snug text-neutral-700">
                <Words text={c.text} />
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* catálogo */}
      <motion.div variants={itemV} className="mt-3">
        <p className="mb-1.5 text-[11px] font-medium text-neutral-500">Catálogo atualizado</p>
        <div className="flex flex-wrap gap-1.5">
          {p.catalog.map((c) => (
            <motion.span
              key={c.name}
              variants={tileV}
              className="rounded-full border px-2.5 py-1 text-[11px] text-neutral-700"
              style={{ borderColor: `${p.color}55`, backgroundColor: `${p.color}12` }}
            >
              {c.name} <b className="font-semibold text-neutral-900">{c.price}</b>
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.article>
  );
}

/* =========================================================
   COMPONENTE PRINCIPAL
========================================================= */

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

export default function LocationMap() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("search");
  const desktop = useIsDesktop();

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("zoom"), T.zoom),
      setTimeout(() => setPhase("pin"), T.pin),
      setTimeout(() => setPhase("card"), T.card),
      setTimeout(() => setPhase("out"), T.out),
      setTimeout(() => {
        setIndex((i) => (i + 1) % places.length);
        setPhase("search");
      }, T.next),
    ];
    return () => timers.forEach(clearTimeout);
  }, [index]);

  const p = places[index];
  const typed = useTyping(p.query);

  const zoomed = phase === "zoom" || phase === "pin" || phase === "card";
  const pinVisible = phase === "pin" || phase === "card";

  // onde o ponto vai parar na tela depois do zoom (sem deixar bordas vazias)
  const want = desktop ? { x: 30, y: 58 } : { x: 50, y: 27 };
  const focus = {
    x: clamp(want.x, 100 - ZOOM * (100 - p.x), ZOOM * p.x),
    y: clamp(want.y, 100 - ZOOM * (100 - p.y), ZOOM * p.y),
  };

  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-label="Demonstração: empresa aparecendo no Google Maps com avaliações, fotos e catálogo"
        className="w-full"
      >
        <div className="relative h-[620px] w-full overflow-hidden rounded-[28px] border border-black/10 bg-[#e6e8e2] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.3)] md:h-[520px] lg:h-[560px]">
          {/* ---------- MAPA (faz o zoom a partir do ponto) ---------- */}
          <motion.div
            className="absolute inset-0 will-change-transform"
            style={{ originX: `${p.x}%`, originY: `${p.y}%` }}
            animate={
              zoomed
                ? { scale: ZOOM, x: `${focus.x - p.x}%`, y: `${focus.y - p.y}%` }
                : { scale: 1, x: "0%", y: "0%" }
            }
            transition={{ duration: 1.3, ease: [0.65, 0, 0.35, 1] }}
          >
            <MapBase />

            {places.map((loc, i) => {
              const isActive = i === index;
              // ponto ativo some quando o pin cai; os demais somem durante o zoom
              const visible = isActive ? !pinVisible : !zoomed;
              return (
                <motion.span
                  key={loc.name + i}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                  animate={{ opacity: visible ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {isActive && (
                    <span
                      className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full opacity-40 motion-reduce:hidden"
                      style={{ backgroundColor: loc.color }}
                    />
                  )}
                  <span
                    className={`relative block rounded-full ring-white transition-all duration-500 ${
                      isActive ? "h-3.5 w-3.5 ring-4" : "h-2.5 w-2.5 opacity-70 ring-2"
                    }`}
                    style={{ backgroundColor: loc.color }}
                  />
                </motion.span>
              );
            })}
          </motion.div>

          {/* suavização */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/[0.06] via-transparent to-white/10" />

          {/* ---------- BARRA DE BUSCA ---------- */}
          <div className="absolute left-3 right-3 top-3 z-30 md:left-4 md:right-auto md:top-4 md:w-[340px] lg:w-[380px]">
            <div className="flex h-11 items-center gap-2.5 rounded-full bg-white px-4 shadow-[0_6px_24px_-6px_rgba(0,0,0,0.25)]">
              <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-neutral-500" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <circle cx="11" cy="11" r="6.5" />
                <path d="M16 16l4.5 4.5" />
              </svg>
              <span className="truncate text-sm text-neutral-800">
                {typed}
                {typed.length < p.query.length && (
                  <span className="ml-px inline-block h-4 w-px translate-y-0.5 animate-pulse bg-neutral-800" />
                )}
              </span>
            </div>
          </div>

          {/* ---------- PIN (cai no ponto depois do zoom) ---------- */}
          <div
            className="pointer-events-none absolute z-10 h-0 w-0"
            style={{ left: `${focus.x}%`, top: `${focus.y}%` }}
          >
            <motion.span
              className="absolute left-0 top-0 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/80 ring-4 ring-white/80"
              animate={{ opacity: pinVisible ? 1 : 0, scale: pinVisible ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />

            <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
              <motion.div
                className="flex flex-col items-center"
                style={{ originX: 0.5, originY: 1 }}
                initial={false}
                animate={pinVisible ? "in" : "out"}
                variants={{
                  in: {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 260, damping: 15 },
                  },
                  out: { opacity: 0, scale: 0.3, y: -30, transition: { duration: 0.3 } },
                }}
              >
                <div
                  className="absolute top-3 h-28 w-28 rounded-full blur-2xl"
                  style={{ backgroundColor: p.glow }}
                />
                <div
                  className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-white md:h-24 md:w-24 md:border-[5px]"
                  style={{ boxShadow: `0 14px 34px rgba(0,0,0,0.25), 0 0 0 3px ${p.color}40` }}
                >
                  <span className="select-none text-4xl md:text-5xl">{p.emoji}</span>
                </div>
                <div className="relative z-10 -mt-2 h-4 w-4 rotate-45 bg-white" />
              </motion.div>
            </div>
          </div>

          {/* ---------- PERFIL ---------- */}
          <div className="pointer-events-none absolute inset-x-3 bottom-3 z-20 md:inset-x-auto md:bottom-auto md:right-4 md:top-1/2 md:w-[340px] md:-translate-y-1/2 lg:w-[380px]">
            <AnimatePresence mode="wait">
              {phase === "card" && <ProfileCard key={p.name} p={p} />}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
