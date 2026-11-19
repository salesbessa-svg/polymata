import type { Metadata } from "next"
import { SITE_URL } from "@/lib/newsletter-shared-url"
import { SHARE_IMAGES, jsonLdScript, pageMetadata, webPageJsonLd } from "@/lib/seo"
import { ESPORTES_FAQ, NICODEMUS_URL } from "./conteudo"

const PAGE = {
  title: "Baseball no Brasil e baseball universitário | Polymata Esportes e nicodemus",
  description:
    "Baseball no Brasil e beisebol universitário: conheça o nicodemus (nicodemus.com.br), app brasileiro e gratuito para equipes amadoras e universitárias registrarem treinos, jogos, estatísticas e a evolução de cada atleta.",
  path: "/esportes",
  image: SHARE_IMAGES.esportes,
}

const base = pageMetadata({ ...PAGE, absoluteTitle: true })

export const metadata: Metadata = {
  ...base,
  keywords: [
    "baseball no Brasil",
    "beisebol no Brasil",
    "baseball universitário",
    "beisebol universitário",
    "baseball universitário Brasil",
    "campeonato brasileiro de beisebol universitário",
    "time de baseball São Paulo",
    "como jogar baseball no Brasil",
    "app de baseball",
    "estatística de baseball",
    "scouting baseball",
    "nicodemus",
    "nicodemus baseball",
    "nicodemus.com.br",
    "Polymata Esportes",
  ],
}

const nicodemusJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${NICODEMUS_URL}/#app`,
      name: "nicodemus",
      alternateName: ["nicodemus baseball", "nicodemus.com.br"],
      url: NICODEMUS_URL,
      image: `${SITE_URL}/esportes/cap.png`,
      description:
        "App brasileiro de baseball (beisebol) para equipes amadoras e universitárias: treino na gaiola com mapa de zona, súmula de jogo jogada a jogada, perfil do atleta com escala 20–80, agenda e análises da equipe.",
      applicationCategory: "SportsApplication",
      operatingSystem: "Web, Android, iOS (PWA)",
      inLanguage: "pt-BR",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
      audience: { "@type": "Audience", audienceType: "Equipes de baseball amadoras e universitárias no Brasil" },
      about: [
        { "@type": "Thing", name: "Baseball no Brasil" },
        { "@type": "Thing", name: "Baseball universitário" },
      ],
      publisher: { "@id": `${SITE_URL}/#organization` },
      creator: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/esportes/#faq`,
      mainEntity: ESPORTES_FAQ.map((f) => ({
        "@type": "Question",
        name: f.pergunta,
        acceptedAnswer: { "@type": "Answer", text: f.resposta },
      })),
    },
  ],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          webPageJsonLd({
            path: PAGE.path,
            name: "Polymata Esportes: baseball no Brasil, baseball universitário e o app nicodemus",
            description: PAGE.description,
            image: PAGE.image,
            breadcrumb: "Esportes",
          }),
        )}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(nicodemusJsonLd)} />
      {children}
    </>
  )
}
