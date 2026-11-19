import type { Metadata } from "next"
import { SHARE_IMAGES, jsonLdScript, pageMetadata, webPageJsonLd } from "@/lib/seo"

const PAGE = {
  title: "Serviços: sites, sistemas, imagens melhores para a empresa, Google e estratégia tributária",
  description:
    "Sites e sistemas para restaurantes, clínicas e advogados, automação, imagens melhores para a empresa com fotografia e vídeo profissionais, catálogo digital, Google Maps, impulsionamento, identidade visual e estratégias de elisão fiscal com contadores e advogados parceiros. Polymata, Estado de São Paulo.",
  path: "/services",
  image: SHARE_IMAGES.servicos,
}

export const metadata: Metadata = pageMetadata(PAGE)

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          webPageJsonLd({
            path: PAGE.path,
            name: "Serviços Polymata: sites, sistemas, imagens melhores para a empresa, Google e estratégia tributária",
            description: PAGE.description,
            image: PAGE.image,
            breadcrumb: "Serviços",
            type: "WebPage",
          }),
        )}
      />
      {children}
    </>
  )
}
