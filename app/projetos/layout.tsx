import type { Metadata } from "next"
import { SHARE_IMAGES, jsonLdScript, pageMetadata, webPageJsonLd } from "@/lib/seo"

const PAGE = {
  title: "Rede empresarial: networking, comunidade e workshops",
  description:
    "A rede de empresários da Polymata: networking com análise semestral do negócio, comunidade de fornecedores e contratantes, encontros exclusivos e workshops sobre escalabilidade, elisão fiscal, investimento e redução de custos.",
  path: "/projetos",
  image: SHARE_IMAGES.rede,
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
            name: "Rede empresarial Polymata: networking, comunidade e workshops",
            description: PAGE.description,
            image: PAGE.image,
            breadcrumb: "Rede empresarial",
            type: "AboutPage",
          }),
        )}
      />
      {children}
    </>
  )
}
