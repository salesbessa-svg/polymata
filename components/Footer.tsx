"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Logo from "./Logo"

const links = [
  { href: "/services", label: "Serviços" },
  { href: "/projetos", label: "Projetos" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/contato", label: "Contato" },
]

export default function Footer() {
  const pathname = usePathname() ?? ""
  // na newsletter o rodapé acompanha o papel claro; a seção "Quem é Polymata" é a única preta ali
  const paper = pathname.startsWith("/newsletter")

  const t = paper
    ? { bg: "bg-[#ECE7DB] text-[#1C1A17] border-[#D9D2C3]", muted: "text-[#5E574D]", link: "hover:text-black" }
    : { bg: "bg-neutral-950 text-white border-white/10", muted: "text-white/55", link: "hover:text-white" }

  return (
    <footer className={`border-t px-5 py-16 sm:px-6 md:px-8 ${t.bg}`}>
      <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
        <Logo size={64} background={paper ? "light" : "dark"} />
        <Link href="/" className="mt-4 text-lg font-light tracking-[0.3em] transition-opacity hover:opacity-70">
          POLYMATA
        </Link>

        <nav className={`mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[13px] uppercase tracking-[0.2em] ${t.muted}`}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={`transition-colors ${t.link}`}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className={`mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm ${t.muted}`}>
          <a href="mailto:polymata.br@gmail.com" className={`transition-colors ${t.link}`}>
            polymata.br@gmail.com
          </a>
          <a href="https://wa.me/5511940378289" target="_blank" rel="noopener noreferrer" className={`transition-colors ${t.link}`}>
            WhatsApp +55 11 94037-8289
          </a>
        </div>

        <p className={`mt-10 text-xs ${t.muted}`}>
          © {new Date().getFullYear()} Polymata · Estado de São Paulo
        </p>
      </div>
    </footer>
  )
}
