import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Logo from "@/components/Logo"
import { SERIF } from "@/lib/newsletter-shared"

/* =========================================================
   QUEM É POLYMATA
   Única seção de fundo preto da newsletter.
   A logo do site sempre leva para cá (#quem-e-polymata).
========================================================= */

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-5 mt-14 font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-[#F97316]">{children}</h3>
  )
}

export default function QuemEPolymata() {
  return (
    <section id="quem-e-polymata" className="scroll-mt-16 bg-black px-5 py-24 text-white sm:px-6 md:px-8 md:py-32">
      {/* LOGO + TIPOGRAFIA */}
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <Logo size={240} background="dark" link={false} className="mx-auto" />
        <h2 className="mt-8 text-3xl font-light tracking-[0.35em] sm:text-4xl md:text-5xl">POLYMATA</h2>
        <p className={`${SERIF} mt-5 text-lg italic text-white/55 md:text-xl`}>
          do grego <span className="not-italic">polymathḗs</span>: aquele que aprendeu muito
        </p>
        <span className="mt-10 block h-px w-16 bg-white/25" aria-hidden="true" />
      </div>

      {/* HISTÓRIA */}
      <div className={`${SERIF} mx-auto mt-6 max-w-[680px] text-[19px] leading-[1.8] text-white/80 md:text-[20px]`}>
        <Heading>Quem é Polymata</Heading>
        <p className="mb-6 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[78px] first-letter:font-medium first-letter:leading-[0.8] first-letter:text-white">
          Polímata é a pessoa cujo conhecimento não cabe em uma só área. Gente que transita entre a arte, a ciência, a
          técnica e a linguagem como quem atravessa os cômodos de uma mesma casa, e que enxerga ligações onde os outros
          só veem fronteiras.
        </p>
        <p className="mb-6">
          Desde criança, eu sou fascinado por essas pessoas. Leonardo da Vinci, que desenhava máquinas voadoras entre
          um retrato e outro. Alberto Santos Dumont, o brasileiro que fez do céu de Paris o seu laboratório e voou com
          o 14-bis em 1906. E um nome que pouca gente conhece, mas que acabou dando rosto a esta empresa: Fausto
          Verancio.
        </p>

        <Heading>O homem que voa</Heading>
        <p className="mb-6">
          Verancio nasceu em 1551, em Šibenik, na costa da Dalmácia, então parte da República de Veneza. Foi bispo,
          diplomata, inventor e, acima de tudo, um apaixonado pela linguagem. Em 1595 publicou um dicionário das cinco
          línguas que chamava de &ldquo;as mais nobres da Europa&rdquo;: latim, italiano, alemão, croata e húngaro. Para ele,
          as palavras eram pontes entre povos.
        </p>
        <p className="mb-6">
          A outra paixão dele eram as forças da natureza. No livro <em>Machinae Novae</em>, desenhou pontes suspensas,
          moinhos movidos pelas marés e algumas das primeiras turbinas de vento da história. Verancio não tentava
          vencer o vento, a água ou a gravidade. Tentava compreendê-los e colocá-los a serviço das pessoas.
        </p>
        <p className="mb-6">
          Em uma das pranchas desse livro está o <em>Homo Volans</em>, o homem que voa: uma figura presa a uma vela
          quadrada, descendo suavemente pelo ar. Verancio estudou os esboços de paraquedas de Leonardo e criou o seu
          próprio. Diz a lenda que, em 1617, já com mais de sessenta anos, ele mesmo saltou de uma torre em Veneza para
          provar que a ideia funcionava.
        </p>

        <blockquote className="my-12 border-l-2 border-[#F97316] pl-6 md:-mx-10 md:pl-10">
          <p className="text-[26px] font-light italic leading-snug text-white md:text-[32px]">
            Ninguém sabe ao certo se o salto aconteceu. Mas foi essa imagem que escolhi para a nossa marca.
          </p>
        </blockquote>

        <p className="mb-6">
          Porque ela reúne tudo o que sempre me encantou em Verancio: a coragem de testar a própria ideia com o próprio
          corpo, a paixão pela linguagem que aproxima as pessoas e a curiosidade diante das forças da natureza. Um homem
          sozinho, saltando no vazio, sustentado apenas pelo que entendeu sobre o mundo.
        </p>

        <Heading>Como a Polymata surgiu</Heading>
        <p className="mb-6">
          A Polymata nasceu dessa admiração. A ideia era simples: os problemas de uma empresa não respeitam as
          fronteiras entre as especialidades. Uma marca forte depende de design, fotografia, vídeo, tecnologia,
          estratégia, impostos bem planejados e pessoas certas por perto. Então decidimos juntar tudo isso em um só
          lugar, e em uma rede de empresários que crescem juntos.
        </p>

        <Heading>Em busca de polímatas</Heading>
        <p className="mb-6">
          Preciso ser honesto: eu ainda não sou um polímata. Estou longe disso. Mas estou em busca deles. De pessoas
          curiosas e inquietas, que dominam um ofício e não têm medo de aprender outro. De empresários que querem ir
          além do que já sabem.
        </p>
        <p className="mb-6">
          A Polymata é o lugar onde quero reunir essas pessoas, para que, juntos, possamos construir um mundo melhor.
        </p>

        <p className="mt-12 font-sans text-[13px] uppercase tracking-[0.25em] text-white/45">Fundador da Polymata</p>

        <Link
          href="/contato"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-sans text-sm font-medium text-black transition-colors hover:bg-white/85"
        >
          Quero fazer parte <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  )
}
