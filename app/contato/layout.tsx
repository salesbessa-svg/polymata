import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a Polymata pelo WhatsApp (11) 94037-8289 ou pelo formulário. Atendemos empresas em todo o Estado de São Paulo, com resposta em até 24 horas.",
  alternates: { canonical: "/contato" },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
