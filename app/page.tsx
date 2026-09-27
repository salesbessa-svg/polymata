import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Navbar from "@/components/Navbar"
import HeroBand from "@/components/HeroBand"
import VideoTextSection from "@/components/VideoTextSection"
import ServicesShowcase from "@/components/ServicesShowcase"
import { RevealText, RevealBlock } from "@/components/Reveal"

export default function Home() {
  return (
    <main className="bg-black text-white">
      <Navbar />

      <HeroBand />

      {/*
        As duas faixas abaixo usam vídeos da pasta /public/video.
        Troque "servicos" e "comunidade" pelos nomes reais dos arquivos
        (.mp4 e .webm) que você quer usar — hoje só existe "fachada".
      */}
      <VideoTextSection
        videoBase="/video/servicos"
        eyebrow="Sofisticação estratégica"
        title="Seu negócio, apresentado como ele merece"
        description="Nada de identidade genérica ou perfil incompleto. Cuidamos do design, da credibilidade e da estratégia para que sua marca seja lembrada — não confundida com a concorrência."
      >
        <Link
          href="/services"
          className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-white/85"
        >
          Ver nossos serviços
          <ArrowRight size={15} />
        </Link>
      </VideoTextSection>

      <ServicesShowcase />

      <VideoTextSection
        videoBase="/video/comunidade"
        eyebrow="Presença memorável"
        title="Crescer não precisa ser solitário"
        description="Construímos uma comunidade de empresas que trocam entre si: fornecedores, clientes, parceiros e oportunidades reais dentro da sua própria região."
        align="left"
      >
        <Link
          href="/projetos"
          className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
        >
          Conhecer os projetos
          <ArrowRight size={15} />
        </Link>
      </VideoTextSection>

      <section className="bg-neutral-900 px-6 py-24 text-center md:px-8 md:py-32">
        <RevealText
          text="Vamos construir sua presença?"
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
  )
}