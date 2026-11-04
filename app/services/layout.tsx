import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Serviços: sites, sistemas, imagens melhores para a empresa, Google e planejamento tributário",
  description:
    "Sites e sistemas para restaurantes, clínicas e advogados, automação, imagens melhores para a empresa com fotografia e vídeo profissionais, catálogo digital, Google Maps, impulsionamento, identidade visual e planejamento tributário. Polymata, Estado de São Paulo.",
  alternates: { canonical: "/services" },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
