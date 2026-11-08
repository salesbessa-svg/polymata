/* =========================================================
   SEO: como o Google deve entender a Polymata.
   Nada aqui aparece na tela; vai só no código da página
   (metadados e dados estruturados schema.org).
========================================================= */

import type { Metadata } from "next"
import { SITE_URL } from "./newsletter-shared-url"

export const SITE_NAME = "Polymata"

export const SITE_DESCRIPTION =
  "Polymata é um ecossistema empresarial brasileiro que reúne em um só lugar o que um negócio precisa para crescer: sites e sistemas para restaurantes, clínicas e escritórios de advocacia, automação, imagens melhores para a empresa com fotografia e vídeo profissionais, catálogo digital, presença no Google, análise e estratégias de elisão fiscal com contadores e advogados parceiros, redução de custos e uma rede de networking para empresas do Estado de São Paulo."

export const SITE_KEYWORDS = [
  "Polymata",
  "ecossistema empresarial",
  "consultoria para pequenas empresas",
  "sistema para restaurantes",
  "sistema para clínicas",
  "sistema para advogados",
  "criação de sites",
  "automação de processos",
  "imagens melhores para a empresa",
  "fotos profissionais para empresas",
  "fotografia de produtos",
  "catálogo digital",
  "Google Meu Negócio",
  "planejamento tributário",
  "elisão fiscal",
  "redução de custos",
  "networking empresarial São Paulo",
  "identidade visual",
]

const SERVICES = [
  "Sites para empresas",
  "Sistemas para restaurantes, cardápio digital e pedidos",
  "Sistemas para clínicas e consultórios médicos",
  "Sistemas e sites para escritórios de advocacia",
  "Automação de processos e atendimento",
  "Imagens melhores para a empresa: fotografia profissional de produtos e alimentos",
  "Filmagens e vídeos para empresas",
  "Catálogo digital",
  "Perfil da Empresa no Google e posicionamento nas buscas",
  "Impulsionamento estratégico online",
  "Identidade visual e design de marca",
  "Análise e estratégias de elisão fiscal, acordos e contratos (planejamento formal, contabilidade e jurídico com parceiros)",
  "Redução de custos operacionais",
  "Networking empresarial, comunidade e workshops",
]

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        legalName: SITE_NAME,
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png`, width: 512, height: 512 },
        image: [`${SITE_URL}/compartilhar/polymata-ecossistema-empresarial.png`, `${SITE_URL}/polymata-logo.png`],
        description: SITE_DESCRIPTION,
        disambiguatingDescription:
          "O nome vem de polímata: a pessoa cujo conhecimento abrange muitas áreas, como Leonardo da Vinci, Fausto Verancio e Santos Dumont. A Polymata une várias especialidades para resolver os problemas de uma empresa por inteiro, não apenas o design.",
        slogan: "Não tenha dúvidas, somos a solução!",
        founder: { "@type": "Person", name: "Paulo Henrique Bessa", jobTitle: "Fundador" },
        address: { "@type": "PostalAddress", addressRegion: "SP", addressCountry: "BR" },
        areaServed: [
          { "@type": "State", name: "São Paulo", containedInPlace: { "@type": "Country", name: "Brasil" } },
          { "@type": "Country", name: "Brasil" },
        ],
        knowsLanguage: "pt-BR",
        knowsAbout: [
          "gestão de pequenas empresas",
          "desenvolvimento de sites e sistemas",
          "automação de processos",
          "marketing local e SEO",
          "imagens melhores para a empresa",
          "fotografia de produtos",
          "produção de vídeo",
          "planejamento tributário",
          "elisão fiscal",
          "redução de custos",
          "networking empresarial",
          "design de marca",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "atendimento ao cliente",
          telephone: "+55-11-94037-8289",
          email: "polymata.br@gmail.com",
          availableLanguage: ["Portuguese"],
          areaServed: "BR",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Serviços Polymata",
          itemListElement: SERVICES.map((name) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name, provider: { "@id": `${SITE_URL}/#organization` }, areaServed: "BR-SP" },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        alternateName: ["Polymata Brasil", "Polymata Ecossistema Empresarial"],
        url: SITE_URL,
        inLanguage: "pt-BR",
        description: SITE_DESCRIPTION,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  }
}

/* =========================================================
   IMAGENS DE COMPARTILHAMENTO (og:image) E METADADOS POR PÁGINA
   As imagens ficam em /public/compartilhar (1200 × 630 px).
========================================================= */


export type ShareImage = { path: string; alt: string }

export const SHARE_IMAGES = {
  home: {
    path: "/compartilhar/polymata-ecossistema-empresarial.png",
    alt: "Polymata, ecossistema empresarial em São Paulo: sites, sistemas, imagens melhores para a empresa, gestão e rede de empresários.",
  },
  servicos: {
    path: "/compartilhar/polymata-servicos.png",
    alt: "Serviços Polymata: sites e sistemas, automação, fotografia e vídeo, Google Maps, identidade visual e estratégia tributária.",
  },
  rede: {
    path: "/compartilhar/polymata-rede-empresarial.png",
    alt: "Rede empresarial Polymata: networking, comunidade de fornecedores e contratantes, encontros e workshops.",
  },
  contato: {
    path: "/compartilhar/polymata-contato.png",
    alt: "Fale com a Polymata pelo WhatsApp (11) 94037-8289 ou pelo e-mail polymata.br@gmail.com.",
  },
  newsletter: {
    path: "/compartilhar/polymata-newsletter.png",
    alt: "Newsletter Polymata: gestão, impostos, delivery, Google, redes sociais e automação para pequenas empresas.",
  },
} satisfies Record<string, ShareImage>

export function shareImage(img: ShareImage) {
  return { url: img.path, secureUrl: `${SITE_URL}${img.path}`, width: 1200, height: 630, alt: img.alt, type: "image/png" }
}

/** Título, descrição, link oficial e imagem de compartilhamento de uma página. */
export function pageMetadata({
  title,
  description,
  path,
  image,
  absoluteTitle = false,
}: {
  title: string
  description: string
  path: string
  image: ShareImage
  absoluteTitle?: boolean
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`
  const img = shareImage(image)
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "pt_BR",
      url: path,
      title: fullTitle,
      description,
      images: [img],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [img] },
  }
}

/* =========================================================
   FICHA DE CADA PÁGINA PARA O GOOGLE (WebPage + trilha)
   Invisível na tela: descreve a página, a imagem principal
   e onde ela fica dentro do site.
========================================================= */

export function webPageJsonLd({
  path,
  name,
  description,
  image,
  breadcrumb,
  type = "WebPage",
}: {
  path: string
  name: string
  description: string
  image: ShareImage
  breadcrumb?: string
  type?: "WebPage" | "CollectionPage" | "ContactPage" | "AboutPage"
}) {
  const url = `${SITE_URL}${path === "/" ? "" : path}`
  const graph: Record<string, unknown>[] = [
    {
      "@type": type,
      "@id": `${url}/#webpage`,
      url,
      name,
      description,
      inLanguage: "pt-BR",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${SITE_URL}${image.path}`,
        width: 1200,
        height: 630,
        caption: image.alt,
      },
    },
  ]
  if (breadcrumb) {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: breadcrumb, item: url },
      ],
    })
  }
  return { "@context": "https://schema.org", "@graph": graph }
}

/** Script invisível com a ficha da página. */
export function jsonLdScript(data: unknown) {
  return { __html: JSON.stringify(data) }
}
