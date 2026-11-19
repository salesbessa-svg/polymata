"use client"

import { RevealText, RevealBlock } from "./Reveal"

type VideoTextSectionProps = {
  /** ex: "/video/comunidade": o componente busca .webm e .mp4 com esse prefixo */
  videoBase: string
  /** descrição do vídeo para leitores de tela e para o Google */
  videoLabel?: string
  eyebrow?: string
  title: string
  description: string
  align?: "left" | "center" | "right"
  /** 0 a 1: quanto mais alto, mais escuro o vídeo fica atrás do texto */
  overlay?: number
  children?: React.ReactNode
}

const alignMap = {
  left: "items-start text-left",
  center: "items-center text-center",
  right: "items-end text-right",
} as const

export default function VideoTextSection({
  videoBase,
  videoLabel,
  eyebrow,
  title,
  description,
  align = "center",
  overlay = 0.55,
  children,
}: VideoTextSectionProps) {
  return (
    <section
      className="
        relative
        flex
        h-[100svh]
        min-h-[100svh]
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-black
      "
    >
      {/* VÍDEO DE FUNDO */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={videoLabel}
        title={videoLabel}
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
      >
        <source src={`${videoBase}.webm`} type="video/webm" />
        <source src={`${videoBase}.mp4`} type="video/mp4" />
      </video>

      {/* ESCURECIMENTO DO VÍDEO */}
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlay }}
      />

      {/* GRADIENTE PARA DAR PROFUNDIDADE */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black
          via-black/10
          to-black/50
        "
      />

      {/* CONTEÚDO */}
      <div
        className={`
          relative
          z-10
          mx-auto
          flex
          h-full
          w-full
          max-w-4xl
          flex-col
          justify-center
          px-6
          py-24
          md:px-8
          md:py-28
          ${alignMap[align]}
        `}
      >
        {/* EYEBROW */}
        {eyebrow && (
          <RevealBlock>
            <span
              className="
                mb-4
                block
                text-xs
                font-medium
                uppercase
                tracking-[0.3em]
                text-white/50
                sm:text-sm
              "
            >
              {eyebrow}
            </span>
          </RevealBlock>
        )}

        {/* TÍTULO */}
        <RevealText
          text={title}
          as="h2"
          className="
            max-w-4xl
            text-4xl
            font-light
            leading-[1.05]
            tracking-wide
            text-white
            sm:text-5xl
            md:text-6xl
          "
        />

        {/* DESCRIÇÃO */}
        <RevealBlock
          delay={0.25}
          className="
            mt-6
            max-w-xl
            text-base
            leading-relaxed
            text-white/70
            sm:text-lg
          "
        >
          <p>{description}</p>
        </RevealBlock>

        {/* BOTÃO / CONTEÚDO EXTRA */}
        {children && (
          <RevealBlock
            delay={0.4}
            className="mt-8 shrink-0"
          >
            {children}
          </RevealBlock>
        )}
      </div>
    </section>
  )
}