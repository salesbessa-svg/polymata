"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  BellRing,
  Check,
  ChefHat,
  Minus,
  Plus,
  ShoppingBag,
  UserRound,
} from "lucide-react";

/* =========================================================
   DADOS DO CARDÁPIO
   prepMin = média de preparo (min) nas últimas realizações
========================================================= */

type Product = {
  id: number;
  name: string;
  price: number;
  weight: string;
  description: string;
  ingredients: string;
  servings: number;
  prepMin: number;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Frango Cremoso",
    price: 29.9,
    weight: "400 g",
    description: "Peito de frango macio em um creme aveludado, com queijo derretido.",
    ingredients: "Frango, creme de leite, queijo, arroz e ervas.",
    servings: 2,
    prepMin: 12,
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Strogonoff de Carne",
    price: 34.9,
    weight: "450 g",
    description: "Tiras de carne suculentas no molho cremoso clássico, com cogumelos frescos.",
    ingredients: "Carne bovina, creme de leite, cogumelos e arroz.",
    servings: 2,
    prepMin: 14,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Lasanha Artesanal",
    price: 39.9,
    weight: "500 g",
    description: "Camadas de massa fresca, molho de tomate caseiro e queijo gratinado.",
    ingredients: "Massa, molho de tomate, carne, queijo e manjericão.",
    servings: 3,
    prepMin: 18,
    image:
      "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Risoto de Cogumelos",
    price: 32.9,
    weight: "350 g",
    description: "Arroz arbóreo cremoso, mexido na hora, com cogumelos e parmesão.",
    ingredients: "Arroz arbóreo, cogumelos, parmesão e ervas.",
    servings: 1,
    prepMin: 16,
    image:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    name: "Escondidinho",
    price: 31.9,
    weight: "400 g",
    description: "Purê de batata sedoso sobre carne desfiada, coberto de queijo dourado.",
    ingredients: "Purê de batata, carne desfiada, queijo e ervas.",
    servings: 2,
    prepMin: 13,
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80",
  },
];

const byId = (id: number) => products.find((p) => p.id === id)!;
const money = (n: number) => `R$ ${n.toFixed(2).replace(".", ",")}`;
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const fmtClock = (min: number) =>
  `${String(Math.floor(min / 60) % 24).padStart(2, "0")}:${String(Math.floor(min % 60)).padStart(2, "0")}`;
const AVG_PREP = Math.round(products.reduce((s, p) => s + p.prepMin, 0) / products.length);

/* =========================================================
   SIMULAÇÃO DA COZINHA
   1 segundo real = 1 minuto simulado
========================================================= */

const STATIONS = 2; // pedidos preparados ao mesmo tempo
const HOLD = 3; // min que o pedido "pronto" espera o garçom
const TABLE = 12; // mesa do cliente na demonstração
const TICK_MS = 250;
const SPEED = 1; // minutos simulados por segundo real

type Item = { id: number; name: string; qty: number };
type Status = "queued" | "cooking" | "ready" | "done";
type KOrder = {
  id: number;
  table: number;
  items: Item[];
  prep: number;
  remaining: number;
  status: Status;
  placedAt: number;
  readyAt?: number;
  mine?: boolean;
  total?: number;
  etaAtPlace?: number;
};
type State = { orders: KOrder[]; clock: number; nextId: number; nextBg: number };
type Action =
  | { type: "tick"; dt: number }
  | { type: "place"; items: Item[]; table: number; total: number }
  | { type: "reset" };

function orderPrep(items: Item[]) {
  const qty = items.reduce((s, i) => s + i.qty, 0);
  return Math.max(...items.map((i) => byId(i.id).prepMin)) + 2 * (qty - 1);
}

function startCooking(orders: KOrder[]) {
  let cooking = orders.filter((o) => o.status === "cooking").length;
  return orders.map((o) => {
    if (o.status === "queued" && cooking < STATIONS) {
      cooking += 1;
      return { ...o, status: "cooking" as Status };
    }
    return o;
  });
}

/** Previsão = quando uma bancada fica livre + tempo médio de preparo do pedido */
function estimate(orders: KOrder[], id: number) {
  const line = orders.filter((o) => o.status === "queued" || o.status === "cooking");
  const target = line.find((o) => o.id === id);
  if (!target) return { eta: 0, ahead: 0 };
  const ahead = line.filter((o) => o.id < id).length;
  if (target.status === "cooking") return { eta: target.remaining, ahead };

  const free = Array<number>(STATIONS).fill(0);
  line.filter((o) => o.status === "cooking").forEach((o, i) => (free[i % STATIONS] = o.remaining));
  for (const o of line.filter((x) => x.status === "queued")) {
    const i = free.indexOf(Math.min(...free));
    free[i] += o.prep;
    if (o.id === id) return { eta: free[i], ahead };
  }
  return { eta: 0, ahead };
}

const start = 19 * 60 + 30;
const seed = (id: number, table: number, items: Item[], remaining: number, status: Status, placedAt: number): KOrder => ({
  id, table, items, prep: orderPrep(items), remaining, status, placedAt,
});

const initialState: State = {
  clock: start,
  nextId: 1044,
  nextBg: start + 3,
  orders: [
    seed(1041, 4, [{ id: 3, name: "Lasanha Artesanal", qty: 2 }], 5, "cooking", start - 12),
    seed(1042, 9, [{ id: 2, name: "Strogonoff de Carne", qty: 1 }, { id: 4, name: "Risoto de Cogumelos", qty: 1 }], 8, "cooking", start - 9),
    seed(1043, 2, [{ id: 5, name: "Escondidinho", qty: 1 }], 13, "queued", start - 5),
  ],
};

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "tick": {
      const clock = s.clock + a.dt;
      let orders = s.orders.map((o) => {
        if (o.status !== "cooking") return o;
        const r = o.remaining - a.dt;
        return r <= 0 ? { ...o, status: "ready" as Status, remaining: 0, readyAt: clock } : { ...o, remaining: r };
      });
      orders = orders.flatMap((o) => {
        if (o.status === "ready" && clock - (o.readyAt ?? clock) >= HOLD) {
          return o.mine ? [{ ...o, status: "done" as Status }] : [];
        }
        return [o];
      });
      orders = startCooking(orders);

      // outros clientes continuam pedindo, como num dia real
      let { nextId, nextBg } = s;
      const active = orders.filter((o) => o.status === "queued" || o.status === "cooking").length;
      if (clock >= nextBg) {
        if (active < 5) {
          const p = products[(nextId * 3) % products.length];
          const items = [{ id: p.id, name: p.name, qty: nextId % 3 === 0 ? 2 : 1 }];
          orders = startCooking([
            ...orders,
            seed(nextId, ((nextId * 5) % 11) + 1, items, orderPrep(items), "queued", clock),
          ]);
          nextId += 1;
          nextBg = clock + 3.5;
        } else {
          nextBg = clock + 1;
        }
      }
      return { orders, clock, nextId, nextBg };
    }
    case "place": {
      const prep = orderPrep(a.items);
      const mine: KOrder = {
        id: s.nextId, table: a.table, items: a.items, prep, remaining: prep,
        status: "queued", placedAt: s.clock, mine: true, total: a.total,
      };
      const orders = startCooking([...s.orders.filter((o) => !o.mine), mine]);
      const eta = estimate(orders, mine.id).eta;
      return {
        ...s,
        nextId: s.nextId + 1,
        orders: orders.map((o) => (o.id === mine.id ? { ...o, etaAtPlace: eta } : o)),
      };
    }
    case "reset":
      return { ...s, orders: s.orders.filter((o) => !o.mine) };
  }
}

/* =========================================================
   PEÇAS VISUAIS
========================================================= */

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto h-[640px] w-full max-w-[320px] overflow-hidden rounded-[40px] border-[7px] border-neutral-900 bg-[#f7f6f2] shadow-2xl">
      <div className="absolute left-1/2 top-1.5 z-30 h-4 w-20 -translate-x-1/2 rounded-full bg-neutral-900" />
      {children}
    </div>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-center text-[13px] font-medium text-black/55">{children}</p>;
}

function Connector({ pulse, delay = 0 }: { pulse: number; delay?: number }) {
  return (
    <div className="flex items-center justify-center py-1" aria-hidden="true">
      <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-black/60 shadow-sm">
        {pulse > 0 && (
          <motion.span
            key={pulse}
            className="absolute inset-0 rounded-full bg-emerald-400"
            initial={{ opacity: 0 }}
            animate={{ scale: [1, 2.6], opacity: [0.6, 0] }}
            transition={{ duration: 1, delay }}
          />
        )}
        <ArrowRight size={16} className="relative hidden lg:block" />
        <ArrowDown size={16} className="relative lg:hidden" />
      </div>
    </div>
  );
}

const noScrollbar = "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

/* =========================================================
   CELULAR DO CLIENTE
========================================================= */

function CustomerPhone({
  cart, setCart, mine, eta, ahead, onOrder, onReset,
}: {
  cart: Record<number, number>;
  setCart: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  mine?: KOrder;
  eta: number;
  ahead: number;
  onOrder: () => void;
  onReset: () => void;
}) {
  const count = Object.values(cart).reduce((s, n) => s + n, 0);
  const total = products.reduce((s, p) => s + p.price * (cart[p.id] ?? 0), 0);
  const change = (id: number, d: number) =>
    setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] ?? 0) + d) }));

  return (
    <PhoneFrame>
      <AnimatePresence mode="wait" initial={false}>
        {!mine ? (
          <motion.div
            key="catalog"
            className="flex h-full flex-col pt-8"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3 }}
          >
            <header className="flex items-center justify-between px-5 pb-2">
              <div>
                <p className="text-[11px] font-medium text-black/45">Mesa {TABLE}</p>
                <h2 className="text-xl font-semibold tracking-tight text-black">Cardápio</h2>
              </div>
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                <ShoppingBag size={18} strokeWidth={1.8} className="text-black/70" />
                {count > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[10px] font-semibold text-white">
                    {count}
                  </span>
                )}
              </div>
            </header>

            {count === 0 && (
              <motion.p
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.4, repeat: Infinity }}
                className="mx-5 mb-2 rounded-full bg-black/[0.05] px-3 py-1.5 text-center text-[11px] text-black/60"
              >
                Experimente: escolha um prato e faça o pedido
              </motion.p>
            )}

            <div className={`flex-1 snap-y snap-proximity space-y-3 overflow-y-auto overscroll-contain px-3 pb-24 ${noScrollbar}`}>
              {products.map((p) => {
                const qty = cart[p.id] ?? 0;
                return (
                  <article key={p.id} className="snap-start overflow-hidden rounded-[24px] bg-white shadow-sm">
                    <div className="relative aspect-[4/3] bg-black/5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
                      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
                      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[13px] font-semibold shadow-sm backdrop-blur">
                        {money(p.price)}
                      </span>
                    </div>

                    <div className="p-3.5">
                      <h3 className="text-[17px] font-semibold leading-tight tracking-tight text-black">{p.name}</h3>
                      <p className="mt-1 text-[12.5px] leading-[1.35] text-black/60">{p.description}</p>

                      <div className="mt-2 flex items-center gap-2.5 text-[12px] text-black/50">
                        <span>{p.weight}</span>
                        <span className="h-3 w-px bg-black/15" />
                        <span className="flex gap-0.5">
                          {Array.from({ length: p.servings }).map((_, i) => (
                            <UserRound key={i} size={13} fill="currentColor" strokeWidth={1.5} />
                          ))}
                        </span>
                      </div>
                      <p className="mt-1.5 text-[11.5px] leading-snug text-black/40">{p.ingredients}</p>

                      <div className="mt-3">
                        {qty === 0 ? (
                          <button
                            type="button"
                            onClick={() => change(p.id, 1)}
                            className="flex w-full items-center justify-center gap-1.5 rounded-full bg-black py-2.5 text-[13px] font-medium text-white transition active:scale-[0.98]"
                          >
                            <Plus size={14} /> Adicionar
                          </button>
                        ) : (
                          <div className="flex items-center justify-between rounded-full border border-black/10 bg-[#f7f6f2] p-1">
                            <button
                              type="button"
                              onClick={() => change(p.id, -1)}
                              aria-label={`Remover ${p.name}`}
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-semibold tabular-nums">{qty}</span>
                            <button
                              type="button"
                              onClick={() => change(p.id, 1)}
                              aria-label={`Adicionar mais ${p.name}`}
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <AnimatePresence>
              {count > 0 && (
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 40, opacity: 0 }}
                  className="absolute inset-x-3 bottom-3 z-20"
                >
                  <button
                    type="button"
                    onClick={onOrder}
                    className="flex w-full items-center justify-between rounded-full bg-black px-5 py-3.5 text-sm font-medium text-white shadow-[0_12px_30px_-8px_rgba(0,0,0,0.5)] transition active:scale-[0.98]"
                  >
                    <span>Fazer pedido</span>
                    <span className="tabular-nums">{money(total)}</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <Tracking key="tracking" mine={mine} eta={eta} ahead={ahead} onReset={onReset} />
        )}
      </AnimatePresence>
    </PhoneFrame>
  );
}

function Tracking({ mine, eta, ahead, onReset }: { mine: KOrder; eta: number; ahead: number; onReset: () => void }) {
  const idx = mine.status === "ready" ? 2 : mine.status === "done" ? 4 : 1;
  const progress = mine.status === "ready" || mine.status === "done" ? 1 : clamp01(1 - eta / (mine.etaAtPlace || 1));
  const steps = [
    { label: "Pedido recebido na cozinha", sub: `Enviado às ${fmtClock(mine.placedAt)}` },
    {
      label: "Em preparo",
      sub: mine.status === "queued" ? `Na fila · ${ahead} ${ahead === 1 ? "pedido" : "pedidos"} na frente` : "O chef está preparando",
    },
    { label: "Pronto", sub: "O garçom foi avisado" },
    { label: "Na sua mesa", sub: "Bom apetite!" },
  ];
  const headline =
    mine.status === "done" ? "Bom apetite!" : mine.status === "ready" ? "Pronto!" : `≈ ${Math.max(1, Math.ceil(eta))} min`;

  return (
    <motion.div
      className="flex h-full flex-col px-5 pb-5 pt-9"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <p className="text-[11px] font-medium text-black/45">
        Pedido #{mine.id} · Mesa {mine.table}
      </p>
      <h2 className="mt-1 text-[40px] font-semibold leading-none tracking-tight tabular-nums text-black">{headline}</h2>
      <p className="mt-1.5 text-[13px] text-black/55">
        {mine.status === "done"
          ? "Pedido entregue na sua mesa."
          : mine.status === "ready"
            ? "O garçom está levando à sua mesa."
            : "Previsão de entrega, atualizada em tempo real."}
      </p>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-black/10">
        <motion.div
          className="h-full rounded-full bg-black"
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      <ol className="mt-5 space-y-3.5">
        {steps.map((s, i) => {
          const done = i < idx;
          const current = i === idx;
          return (
            <li key={s.label} className="flex items-start gap-3">
              <span
                className={`relative mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white transition-colors duration-500 ${
                  done ? "bg-emerald-500" : current ? "bg-black" : "bg-black/10"
                }`}
              >
                {current && <span className="absolute inset-0 animate-ping rounded-full bg-black/30 motion-reduce:hidden" />}
                {done && <Check size={14} strokeWidth={3} />}
              </span>
              <div>
                <p className={`text-[13.5px] font-medium ${done || current ? "text-black" : "text-black/35"}`}>{s.label}</p>
                {(done || current) && <p className="text-[12px] text-black/50">{s.sub}</p>}
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-auto space-y-3">
        {(mine.status === "queued" || mine.status === "cooking") && (
          <div className="rounded-2xl bg-white p-3.5 text-[12px] leading-relaxed text-black/60 shadow-sm">
            <p className="mb-1 text-[12px] font-semibold text-black">Como calculamos</p>
            <p>
              <b className="font-semibold text-black">{ahead}</b> {ahead === 1 ? "pedido" : "pedidos"} na frente do seu
            </p>
            <p>
              Média por prato: <b className="font-semibold text-black">{orderPrep(mine.items)} min</b> (últimos pedidos)
            </p>
          </div>
        )}
        <div className="flex items-center justify-between text-[13px] text-black/60">
          <span className="truncate pr-3">{mine.items.map((i) => `${i.qty}× ${i.name}`).join(", ")}</span>
          <span className="shrink-0 font-semibold text-black">{money(mine.total ?? 0)}</span>
        </div>
        {mine.status === "done" && (
          <button
            type="button"
            onClick={onReset}
            className="w-full rounded-full bg-black py-3 text-sm font-medium text-white transition active:scale-[0.98]"
          >
            Fazer outro pedido
          </button>
        )}
      </div>
    </motion.div>
  );
}

/* =========================================================
   TELA DA COZINHA
========================================================= */

const kitchenStyle: Record<Exclude<Status, "done">, { box: string; bar: string; label: string; text: string }> = {
  queued: { box: "border-stone-600/70 bg-stone-900", bar: "bg-stone-500", label: "Na fila", text: "text-stone-400" },
  cooking: { box: "border-amber-400/50 bg-stone-900", bar: "bg-amber-400", label: "Em preparo", text: "text-amber-300" },
  ready: { box: "border-emerald-400/70 bg-emerald-950/70", bar: "bg-emerald-400", label: "Pronto", text: "text-emerald-300" },
};

function Ticket({ o, clock }: { o: KOrder; clock: number }) {
  const st = kitchenStyle[o.status as Exclude<Status, "done">];
  const progress = o.status === "cooking" ? 1 - o.remaining / o.prep : o.status === "ready" ? 1 : 0;
  const isNew = clock - o.placedAt < 1.5;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.85, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className={`relative rounded-xl border p-3 ${st.box} ${o.mine ? "ring-2 ring-white/80" : ""}`}
    >
      {o.mine && isNew && (
        <motion.span
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="absolute -top-2 right-3 rounded bg-white px-1.5 py-0.5 text-[10px] font-bold text-black"
        >
          NOVO
        </motion.span>
      )}
      <div className="flex items-baseline justify-between">
        <span className="text-[15px] font-semibold text-white">Mesa {o.table}</span>
        <span className="text-[11px] tabular-nums text-stone-500">
          #{o.id} · {fmtClock(o.placedAt)}
        </span>
      </div>
      <ul className="mt-1.5 space-y-0.5 text-[13px] text-stone-200">
        {o.items.map((i) => (
          <li key={i.id}>
            <b className="font-semibold text-white">{i.qty}×</b> {i.name}
          </li>
        ))}
      </ul>
      <div className="mt-2.5 flex items-center justify-between text-[11px]">
        <span className={`font-medium ${st.text}`}>{st.label}</span>
        {o.status === "cooking" && <span className="tabular-nums text-stone-400">~{Math.ceil(o.remaining)} min</span>}
      </div>
      <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/10">
        <div className={`h-full rounded-full transition-all duration-300 ${st.bar}`} style={{ width: `${progress * 100}%` }} />
      </div>
    </motion.li>
  );
}

function Kitchen({ orders, clock }: { orders: KOrder[]; clock: number }) {
  const list = orders.filter((o) => o.status !== "done").sort((a, b) => a.id - b.id).slice(0, 6);
  const queued = orders.filter((o) => o.status === "queued").length;
  const cooking = orders.filter((o) => o.status === "cooking").length;

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-[600px] w-full flex-col overflow-hidden rounded-2xl border-[8px] border-neutral-800 bg-stone-950 shadow-2xl">
        <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-2.5 text-white">
            <ChefHat size={20} strokeWidth={1.8} />
            <div>
              <h3 className="text-[15px] font-semibold leading-none">Cozinha</h3>
              <p className="mt-1 text-[11px] text-stone-400">
                {cooking} em preparo · {queued} na fila · média {AVG_PREP} min
              </p>
            </div>
          </div>
          <span className="text-2xl font-semibold tabular-nums text-white">{fmtClock(clock)}</span>
        </header>

        <ul className={`grid flex-1 auto-rows-min grid-cols-1 content-start gap-2.5 overflow-y-auto p-3 sm:grid-cols-2 ${noScrollbar}`}>
          <AnimatePresence mode="popLayout">
            {list.map((o) => (
              <Ticket key={o.id} o={o} clock={clock} />
            ))}
          </AnimatePresence>
        </ul>
        {list.length === 0 && <p className="absolute inset-x-0 top-1/2 text-center text-sm text-stone-500">Sem pedidos na fila</p>}
      </div>
      <div className="h-3 w-24 bg-neutral-800" />
      <div className="h-1.5 w-40 rounded-full bg-neutral-800" />
    </div>
  );
}

/* =========================================================
   CELULAR DO GARÇOM
========================================================= */

const waiterChip: Record<Exclude<Status, "done">, string> = {
  queued: "bg-black/[0.06] text-black/60",
  cooking: "bg-amber-100 text-amber-700",
  ready: "bg-emerald-500 text-white",
};
const waiterLabel: Record<Exclude<Status, "done">, string> = {
  queued: "Na fila",
  cooking: "Em preparo",
  ready: "Levar à mesa",
};

function WaiterPhone({ orders, clock }: { orders: KOrder[]; clock: number }) {
  const list = orders.filter((o) => o.status !== "done").sort((a, b) => b.id - a.id).slice(0, 6);
  const fresh = orders.find((o) => o.mine && o.status !== "done" && clock - o.placedAt < 2.5);

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col pt-8">
        <header className="px-5 pb-3">
          <p className="text-[11px] font-medium text-black/45">Salão</p>
          <h2 className="text-xl font-semibold tracking-tight text-black">Pedidos ao vivo</h2>
        </header>

        <AnimatePresence>
          {fresh && (
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="mx-3 mb-2 flex items-center gap-2.5 rounded-2xl bg-black px-3.5 py-3 text-white"
            >
              <motion.span
                animate={{ rotate: [0, -16, 16, -10, 10, 0] }}
                transition={{ duration: 0.7, repeat: 2 }}
                className="inline-flex"
              >
                <BellRing size={18} />
              </motion.span>
              <div className="min-w-0 text-[12px] leading-tight">
                <p className="font-semibold">Novo pedido · Mesa {fresh.table}</p>
                <p className="truncate text-white/60">{fresh.items.map((i) => `${i.qty}× ${i.name}`).join(", ")}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <ul className={`flex-1 space-y-2 overflow-y-auto px-3 pb-4 ${noScrollbar}`}>
          <AnimatePresence mode="popLayout">
            {list.map((o) => {
              const s = o.status as Exclude<Status, "done">;
              return (
                <motion.li
                  key={o.id}
                  layout
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  className={`rounded-2xl bg-white p-3 shadow-sm ${o.mine ? "ring-2 ring-black" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-semibold text-black">Mesa {o.table}</span>
                    <span className={`rounded-full px-2.5 py-1 text-[10.5px] font-semibold ${waiterChip[s]} ${s === "ready" ? "animate-pulse" : ""}`}>
                      {waiterLabel[s]}
                    </span>
                  </div>
                  <p className="mt-1 text-[12px] leading-snug text-black/55">
                    {o.items.map((i) => `${i.qty}× ${i.name}`).join(", ")}
                  </p>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </div>
    </PhoneFrame>
  );
}

/* =========================================================
   COMPONENTE PRINCIPAL
========================================================= */

export default function ProductCatalog() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [cart, setCart] = useState<Record<number, number>>({});
  const [pulse, setPulse] = useState(0);
  const [running, setRunning] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // a cozinha só "anda" enquanto a demonstração está visível
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => dispatch({ type: "tick", dt: (TICK_MS / 1000) * SPEED }), TICK_MS);
    return () => clearInterval(id);
  }, [running]);

  const mine = state.orders.find((o) => o.mine);
  const { eta, ahead } = mine ? estimate(state.orders, mine.id) : { eta: 0, ahead: 0 };

  function handleOrder() {
    const items = products
      .filter((p) => (cart[p.id] ?? 0) > 0)
      .map((p) => ({ id: p.id, name: p.name, qty: cart[p.id] }));
    if (!items.length) return;
    const total = items.reduce((s, i) => s + byId(i.id).price * i.qty, 0);
    dispatch({ type: "place", items, table: TABLE, total });
    setCart({});
    setPulse((n) => n + 1);
  }

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={ref}
        aria-label="Demonstração: pedido do cliente chegando na cozinha e no celular do garçom"
        className="w-full"
      >
        <div className="grid items-center gap-2 lg:grid-cols-[300px_44px_minmax(0,1fr)_44px_270px] lg:gap-3">
          <div>
            <Caption>No celular do cliente</Caption>
            <CustomerPhone
              cart={cart}
              setCart={setCart}
              mine={mine}
              eta={eta}
              ahead={ahead}
              onOrder={handleOrder}
              onReset={() => dispatch({ type: "reset" })}
            />
          </div>

          <Connector pulse={pulse} />

          <div>
            <Caption>Na tela da cozinha</Caption>
            <Kitchen orders={state.orders} clock={state.clock} />
          </div>

          <Connector pulse={pulse} delay={0.35} />

          <div>
            <Caption>No celular do garçom</Caption>
            <WaiterPhone orders={state.orders} clock={state.clock} />
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-black/40">
          Demonstração em tempo acelerado: 1 segundo equivale a 1 minuto de cozinha.
        </p>
      </section>
    </MotionConfig>
  );
}
