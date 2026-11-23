import type { Metadata } from "next"
import { SITE_URL } from "@/lib/newsletter-shared-url"
import { SHARE_IMAGES, jsonLdScript, pageMetadata, webPageJsonLd } from "@/lib/seo"
import { ESPORTES_FAQ, NICODEMUS_URL } from "./conteudo"

const PAGE = {
  title: "Baseball no Brasil e baseball universitário | Polymata Esportes e nicodemus",
  description:
    "Baseball no Brasil e beisebol universitário: conheça o nicodemus (nicodemus.com.br), app brasileiro com cadastro gratuito para equipes amadoras, universitárias e profissionais registrarem treinos, jogos, estatísticas e a evolução de cada atleta.",
  path: "/esportes/baseball",
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
    "baseball profissional Brasil",
    "app de baseball para profissionais",
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
      url: `${NICODEMUS_URL}/`,
      sameAs: [`${NICODEMUS_URL}/`],
      disambiguatingDescription:
        "nicodemus (www.nicodemus.com.br) é um aplicativo de baseball da Polymata Esportes. Não tem relação com Nicodemos, personagem da Bíblia.",
      image: `${SITE_URL}/esportes/cap.png`,
      description:
        "App brasileiro de baseball (beisebol) para equipes amadoras, universitárias e profissionais: treino na gaiola com mapa de zona, súmula de jogo jogada a jogada, perfil do atleta com escala 20–80, agenda e análises da equipe.",
      applicationCategory: "SportsApplication",
      operatingSystem: "Web, Android, iOS (PWA)",
      inLanguage: "pt-BR",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "BRL", description: "Cadastro gratuito" },
      audience: { "@type": "Audience", audienceType: "Equipes e atletas de baseball amadores, universitários e profissionais no Brasil" },
      about: [
        { "@type": "Thing", name: "Baseball no Brasil" },
        { "@type": "Thing", name: "Baseball universitário" },
      ],
      publisher: { "@id": `${SITE_URL}/#organization` },
      creator: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Esportes", item: `${SITE_URL}/esportes` },
        { "@type": "ListItem", position: 3, name: "Baseball", item: `${SITE_URL}/esportes/baseball` },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/esportes/baseball/#faq`,
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
          }),
        )}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(nicodemusJsonLd)} />
      {children}
    </>
  )
}
