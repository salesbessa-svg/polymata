"use client"

import { useState } from "react"
import Link from "next/link"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 w-full z-[100] backdrop-blur-md bg-black/40 border-b border-white/10">

      {/* NAVBAR */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 h-[68px] sm:h-[72px] flex items-center justify-between">

        {/* LOGO */}
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="text-white text-lg sm:text-xl tracking-[0.20em] sm:tracking-[0.25em] font-light hover:text-white/80 transition"
        >
          POLYMATA
        </Link>

        {/* MENU DESKTOP */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-white/80 text-sm tracking-widest">

          <Link
            href="/services"
            className="hover:text-white transition"
          >
            SERVIÇOS
          </Link>

          <Link
            href="/projetos"
            className="hover:text-white transition"
          >
            PROJETOS
          </Link>

          <Link
            href="/contato"
            className="hover:text-white transition"
          >
            CONTATO
          </Link>

        </nav>

        {/* BOTÃO MOBILE */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isOpen}
          className="md:hidden relative flex h-10 w-10 items-center justify-center text-white"
        >
          <div className="flex w-5 flex-col gap-[5px]">

            <span
              className={`block h-[1px] w-full bg-white transition-transform duration-300 ${
                isOpen ? "translate-y-[6px] rotate-45" : ""
              }`}
            />

            <span
              className={`block h-[1px] w-full bg-white transition-opacity duration-300 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />

            <span
              className={`block h-[1px] w-full bg-white transition-transform duration-300 ${
                isOpen ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />

          </div>
        </button>

      </div>

      {/* OVERLAY MOBILE */}
      <div
        onClick={() => setIsOpen(false)}
        className={`
          fixed inset-0 top-[68px]
          bg-black/50 backdrop-blur-sm
          transition-opacity duration-300
          md:hidden
          ${isOpen ? "opacity-100 visible" : "pointer-events-none opacity-0 invisible"}
        `}
      />

      {/* MENU MOBILE */}
      <div
        className={`
          absolute
          top-[68px]
          left-0
          w-full
          md:hidden
          border-t border-white/10
          bg-black/95
          backdrop-blur-xl
          transition-all duration-300
          ease-out
          ${
            isOpen
              ? "translate-y-0 opacity-100 visible"
              : "-translate-y-4 opacity-0 invisible pointer-events-none"
          }
        `}
      >

        <nav className="flex flex-col px-6 py-6">

          <Link
            href="/services"
            onClick={() => setIsOpen(false)}
            className="border-b border-white/10 py-5 text-sm tracking-[0.2em] text-white/80 transition hover:text-white"
          >
            SERVIÇOS
          </Link>

          <Link
            href="/projetos"
            onClick={() => setIsOpen(false)}
            className="border-b border-white/10 py-5 text-sm tracking-[0.2em] text-white/80 transition hover:text-white"
          >
            PROJETOS
          </Link>

          <Link
            href="/contato"
            onClick={() => setIsOpen(false)}
            className="py-5 text-sm tracking-[0.2em] text-white/80 transition hover:text-white"
          >
            CONTATO
          </Link>

        </nav>

      </div>

    </header>
  )
}
