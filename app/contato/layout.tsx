import type { Metadata } from "next"
import { SHARE_IMAGES, jsonLdScript, pageMetadata, webPageJsonLd } from "@/lib/seo"

const PAGE = {
  title: "Contato",
  description:
    "Fale com a Polymata pelo WhatsApp (11) 94037-8289 ou pelo formulário. Atendemos empresas em todo o Estado de São Paulo, com resposta em até 24 horas.",
  path: "/contato",
  image: SHARE_IMAGES.contato,
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
            name: "Contato Polymata",
            description: PAGE.description,
            image: PAGE.image,
            breadcrumb: "Contato",
            type: "ContactPage",
          }),
        )}
      />
      {children}
    </>
  )
}
