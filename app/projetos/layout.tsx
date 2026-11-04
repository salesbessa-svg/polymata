import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Rede empresarial: networking, comunidade e workshops",
  description:
    "A rede de empresários da Polymata: networking com análise semestral do negócio, comunidade de fornecedores e contratantes, encontros exclusivos e workshops sobre escalabilidade, elisão fiscal, investimento e redução de custos.",
  alternates: { canonical: "/projetos" },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
