"use client"

import { RevealText, RevealBlock } from "./Reveal"

type VideoTextSectionProps = {
  /** ex: "/video/comunidade" — o componente busca .webm e .mp4 com esse prefixo */
  videoBase: string
  eyebrow?: string
  title: string
  description: string
  align?: "left" | "center" | "right"
  /** 0 a 1 — quanto mais alto, mais escuro o vídeo fica atrás do texto */
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
  eyebrow,
  title,
  description,
  align = "center",
  overlay = 0.55,
  children,
}: VideoTextSectionProps) {
  return (
    <section className="relative flex min-h-[90vh] w-full items-center overflow-hidden bg-black">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={`${videoBase}.webm`} type="video/webm" />
        <source src={`${videoBase}.mp4`} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black" style={{ opacity: overlay }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

      <div className={`relative z-10 mx-auto flex w-full max-w-4xl flex-col px-6 md:px-8 ${alignMap[align]}`}>
        {eyebrow && (
          <RevealBlock>
            <span className="mb-4 text-sm font-medium tracking-[0.3em] text-white/50">{eyebrow}</span>
          </RevealBlock>
        )}

        <RevealText
          text={title}
          as="h2"
          className="text-4xl font-light leading-tight tracking-wide text-white md:text-6xl"
        />

        <RevealBlock delay={0.25} className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
          <p>{description}</p>
        </RevealBlock>

        {children && (
          <RevealBlock delay={0.4} className="mt-8">
            {children}
          </RevealBlock>
        )}
      </div>
    </section>
  )
}