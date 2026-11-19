import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import Navbar from "@/components/Navbar"
import WhatsappButton from "@/components/WhatsappButton"
import { RevealBlock, RevealText } from "@/components/Reveal"
import CopiarPix from "./CopiarPix"
import { EQUIPAMENTOS, ESPORTES_FAQ, NICODEMUS_URL, PIX_NICODEMUS } from "./conteudo"

/* =========================================================
   POLYMATA ESPORTES
   Página de entrada para quem pesquisa baseball no Brasil e
   baseball universitário. O destaque é o card do nicodemus,
   o caderno de baseball que a Polymata desenvolve.
========================================================= */

const RECURSOS = [
  {
    nome: "Gaiola",
    texto:
      "Treino de rebatida (battingo), arremesso (pitchingo) e sprint registrados toque a toque, com mapa de calor da zona de strike e relatório de fraquezas de cada atleta.",
  },
  {
    nome: "Jogo",
    texto:
      "Escalação por posição, súmula jogada a jogada no mapa do campo e placar ao vivo, direto do celular do banco de reservas.",
  },
  {
    nome: "Atleta",
    texto:
      "Perfil com a escala 20–80 de scouting calculada a partir dos treinos e jogos, destaques, evolução do pitcher e do hitter e nota do técnico.",
  },
  {
    nome: "Equipe",
    texto:
      "Agenda de treinos e jogos, convites, análises da equipe e controle financeiro do time em um só lugar, funcionando até sem internet.",
  },
]

export default function Baseball() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-neutral-950 text-white">
        {/* ============ ABERTURA ============ */}
        <section className="relative px-6 pb-16 pt-36 md:pt-44">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#F97316]/10 blur-[120px]"
          />
          <div className="relative mx-auto max-w-4xl text-center">
            <nav aria-label="Trilha" className="mb-5 text-xs uppercase tracking-[0.35em]">
              <Link href="/esportes" className="text-white/50 transition-colors hover:text-white">
                Polymata Esportes
              </Link>
              <span aria-hidden="true" className="mx-3 text-white/30">/</span>
              <span className="text-[#F97316]">Baseball</span>
            </nav>
            <h1 className="text-4xl font-light leading-tight md:text-6xl">
              Baseball no Brasil, do campo de bairro ao profissional
            </h1>
            <RevealBlock delay={0.15}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
                A Polymata leva tecnologia ao beisebol brasileiro, do amador ao profissional, passando pela universidade. Nosso primeiro projeto é o
                nicodemus, um app com cadastro gratuito para equipes registrarem treinos, jogos e a evolução de cada
                atleta com dados de verdade.
              </p>
            </RevealBlock>
          </div>
        </section>

        {/* ============ CARD NICODEMUS ============ */}
        <section className="px-6 pb-24" aria-labelledby="nicodemus-titulo">
          <RevealBlock>
            <a
              href={NICODEMUS_URL}
              target="_blank"
              rel="noopener"
              aria-label="Abrir o nicodemus baseball em nicodemus.com.br"
              className="group relative mx-auto block max-w-3xl rounded-[28px] bg-gradient-to-br from-[#F97316] via-[#F97316]/40 to-white/10 p-px shadow-[0_0_0_rgba(249,115,22,0)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_90px_-20px_rgba(249,115,22,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F97316]"
            >
              <div className="relative flex flex-col items-center gap-8 overflow-hidden rounded-[27px] bg-gradient-to-br from-[#14100c] via-neutral-950 to-[#0b1510] px-8 py-10 text-center sm:flex-row sm:px-12 sm:text-left">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-[#F97316]/20 blur-3xl transition-opacity duration-500 group-hover:opacity-100 sm:opacity-60"
                />
                {/* costuras da bola, decorativas */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 200 200"
                  className="pointer-events-none absolute -right-20 -bottom-20 h-72 w-72 text-white/[0.04]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <circle cx="100" cy="100" r="96" />
                  <path d="M40 22c30 40 30 116 0 156M160 22c-30 40-30 116 0 156" strokeDasharray="6 7" />
                </svg>

                <div className="relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-105">
                  <Image
                    src="/esportes/cap.png"
                    alt="Máscara de catcher laranja, símbolo do nicodemus baseball"
                    width={191}
                    height={256}
                    className="h-24 w-auto drop-shadow-[0_10px_25px_rgba(249,115,22,0.45)]"
                    priority
                  />
                </div>

                <div className="relative flex-1">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">App de baseball</p>
                  <h2 id="nicodemus-titulo" className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
                    nico<span className="text-[#F97316]">demus</span>{" "}
                    <span className="font-light text-white/80">baseball</span>
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-white/65">
                    Treino na gaiola, jogo e atleta no mesmo lugar. Para equipes amadoras, universitárias e profissionais.
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#F97316] px-5 py-2.5 text-sm font-medium text-black transition-colors group-hover:bg-white">
                    Entrar em nicodemus.com.br
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </a>
          </RevealBlock>
        </section>

        {/* ============ O QUE O NICODEMUS FAZ ============ */}
        <section className="border-t border-white/10 px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <RevealText
              text="O que o nicodemus faz"
              as="h2"
              className="text-3xl font-light leading-tight md:text-4xl"
            />
            <RevealBlock delay={0.1}>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/70">
                O nicodemus (nicodemus.com.br) é um caderno digital de beisebol feito no Brasil, em português. Ele
                substitui a prancheta e a planilha do técnico: cada rebatida, arremesso e jogada vira estatística, e
                cada atleta ganha um perfil que mostra onde está forte e o que precisa treinar. Instala no celular como
                aplicativo (PWA) e continua funcionando sem sinal no campo.
              </p>
            </RevealBlock>

            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              {RECURSOS.map((r, i) => (
                <RevealBlock key={r.nome} delay={0.05 * i}>
                  <article className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-7">
                    <h3 className="text-lg font-medium text-[#F97316]">{r.nome}</h3>
                    <p className="mt-3 leading-relaxed text-white/70">{r.texto}</p>
                  </article>
                </RevealBlock>
              ))}
            </div>

            <RevealBlock delay={0.1}>
              <p className="mt-10 max-w-3xl leading-relaxed text-white/60">
                Em desenvolvimento: ball tracker por câmera do celular, integração com radar de velocidade e sensor no
                taco, para que a captura dos dados fique automática.
              </p>
            </RevealBlock>
          </div>
        </section>

        {/* ============ BASEBALL NO BRASIL ============ */}
        <section className="border-t border-white/10 px-6 py-24">
          <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2">
            <div>
              <RevealText
                text="O baseball no Brasil"
                as="h2"
                className="text-3xl font-light leading-tight md:text-4xl"
              />
              <RevealBlock delay={0.1}>
                <div className="mt-6 space-y-5 leading-relaxed text-white/70">
                  <p>
                    O beisebol chegou ao Brasil no começo do século XX com norte-americanos que trabalhavam em São
                    Paulo e ganhou força com a imigração japonesa a partir de 1908. O primeiro Campeonato Brasileiro de
                    Beisebol foi disputado em 1936.
                  </p>
                  <p>
                    Hoje o esporte é organizado pela Confederação Brasileira de Beisebol e Softbol (CBBS), fundada em
                    1990, com clubes concentrados principalmente em São Paulo e no Paraná. O Estádio Mie Nishi, no Bom
                    Retiro, e o centro de treinamento de Ibiúna, sede da academia da MLB no país, são referências para
                    quem joga.
                  </p>
                  <p>
                    Do time amador ao profissional, o desafio é o mesmo: transformar cada treino e cada jogo em dado útil. É aí
                    que o nicodemus entra.
                  </p>
                </div>
              </RevealBlock>
            </div>

            <div>
              <RevealText
                text="Baseball universitário"
                as="h2"
                className="text-3xl font-light leading-tight md:text-4xl"
              />
              <RevealBlock delay={0.1}>
                <div className="mt-6 space-y-5 leading-relaxed text-white/70">
                  <p>
                    O beisebol universitário cresce no Brasil desde que a CBBS criou o seu departamento universitário e
                    realizou, em 2022, o primeiro Campeonato Brasileiro de Beisebol Universitário. Atléticas e equipes
                    de faculdades formam times novos todos os anos, muitas vezes com atletas que nunca jogaram antes.
                  </p>
                  <p>
                    Para essas equipes, o nicodemus organiza o elenco, registra cada treino e jogo e mostra a evolução
                    de cada calouro, com cadastro gratuito e sem precisar de equipamento caro.
                  </p>
                </div>
              </RevealBlock>
            </div>
          </div>
        </section>

        {/* ============ APOIE ============ */}
        <section id="apoie" className="border-t border-white/10 px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <RevealText
              text="Apoie a estação de batchingo"
              as="h2"
              className="text-3xl font-light leading-tight md:text-4xl"
            />
            <RevealBlock delay={0.1}>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/70">
                O cadastro no nicodemus é gratuito. Para levar o rastreio automático ao campo, estamos construindo uma
                estação de batchingo que mede a trajetória e a velocidade de cada bola. O projeto aceita doações,
                financiamento e equipamentos.
              </p>
            </RevealBlock>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <RevealBlock>
                <article className="h-full rounded-2xl border border-[#F97316]/40 bg-[#F97316]/[0.04] p-7">
                  <h3 className="text-lg font-medium text-[#F97316]">Doação por PIX</h3>
                  <p className="mt-3 leading-relaxed text-white/70">
                    Qualquer valor ajuda a pagar servidor, peças e testes. Chave PIX (e-mail):
                  </p>
                  <p className="mt-4 select-all break-all font-mono text-lg text-white">{PIX_NICODEMUS}</p>
                  <CopiarPix chave={PIX_NICODEMUS} />
                </article>
              </RevealBlock>

              <RevealBlock delay={0.08}>
                <article className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-7">
                  <h3 className="text-lg font-medium text-[#F97316]">Equipamentos e financiamento</h3>
                  <p className="mt-3 leading-relaxed text-white/70">
                    Clubes, empresas e patrocinadores podem financiar o projeto ou doar e emprestar:
                  </p>
                  <ul className="mt-4 grid gap-2 text-white/75 sm:grid-cols-2">
                    {EQUIPAMENTOS.map((e) => (
                      <li key={e} className="flex gap-2">
                        <span aria-hidden="true" className="text-[#F97316]">·</span>
                        {e}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="https://wa.me/5511940378289?text=Quero%20apoiar%20o%20nicodemus%20baseball"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex rounded-full border border-white/20 px-5 py-2.5 text-sm text-white/85 transition-colors hover:border-white hover:text-white"
                  >
                    Combinar doação pelo WhatsApp
                  </a>
                </article>
              </RevealBlock>
            </div>
          </div>
        </section>

        {/* ============ PERGUNTAS ============ */}
        <section className="border-t border-white/10 px-6 py-24">
          <div className="mx-auto max-w-3xl">
            <RevealText
              text="Perguntas frequentes"
              as="h2"
              className="text-3xl font-light leading-tight md:text-4xl"
            />
            <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {ESPORTES_FAQ.map((f) => (
                <details key={f.pergunta} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg text-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F97316]">
                    {f.pergunta}
                    <span aria-hidden="true" className="text-[#F97316] transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 leading-relaxed text-white/65">{f.resposta}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CHAMADA ============ */}
        <section className="border-t border-white/10 px-6 py-24 text-center">
          <RevealText
            text="Sua equipe quer apoiar ou testar o projeto?"
            as="h2"
            className="mx-auto max-w-3xl text-3xl font-light leading-tight md:text-4xl"
          />
          <RevealBlock delay={0.15}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href={NICODEMUS_URL}
                target="_blank"
                rel="noopener"
                className="rounded-full bg-[#F97316] px-7 py-3 text-sm font-medium text-black transition-colors hover:bg-white"
              >
                Abrir o nicodemus
              </a>
              <Link
                href="/contato"
                className="rounded-full border border-white/20 px-7 py-3 text-sm text-white/85 transition-colors hover:border-white hover:text-white"
              >
                Falar com a Polymata
              </Link>
            </div>
          </RevealBlock>
        </section>
      </main>

      <WhatsappButton />
    </>
  )
}
