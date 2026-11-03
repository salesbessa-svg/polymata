"use client"

import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"

export default function NewsletterSignup({
  source = "newsletter",
  theme = "dark",
}: {
  source?: string
  theme?: "dark" | "light"
}) {
  const light = theme === "light"
  const input = light
    ? "min-h-12 rounded-xl border border-[#CFC7B6] bg-white px-4 text-[#1C1A17] placeholder:text-[#9A9183]"
    : "min-h-12 rounded-xl border border-white/10 bg-neutral-900 px-4 text-white placeholder:text-white/40"
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    const form = new FormData(e.currentTarget)
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.get("nome"),
          email: form.get("email"),
          empresa: form.get("empresa"),
          origem: source,
        }),
      })
      setStatus(res.ok ? "ok" : "error")
    } catch {
      setStatus("error")
    }
  }

  if (status === "ok") {
    return (
      <div className={`flex items-center gap-3 rounded-2xl border p-6 ${light ? "border-[#CFC7B6] bg-white text-[#1C1A17]" : "border-white/10 bg-white/[0.04] text-white"}`}>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#34D399] text-black">
          <Check size={16} strokeWidth={3} />
        </span>
        <p className="text-[15px] leading-relaxed">Inscrição feita! Você vai receber as próximas edições no seu e-mail.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-2">
      <input
        name="nome"
        required
        placeholder="Seu nome"
        aria-label="Seu nome"
        className={input}
      />
      <input
        name="email"
        type="email"
        required
        placeholder="Seu e-mail"
        aria-label="Seu e-mail"
        className={input}
      />
      <input
        name="empresa"
        placeholder="Sua empresa (opcional)"
        aria-label="Sua empresa"
        className={`${input} sm:col-span-2`}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 font-medium transition-colors disabled:opacity-60 sm:col-span-2 ${light ? "bg-[#1C1A17] text-[#F4F1EA] hover:bg-black" : "bg-white text-black hover:bg-white/85"}`}
      >
        {status === "loading" ? "Enviando..." : "Quero receber a newsletter"}
        <ArrowRight size={15} />
      </button>
      {status === "error" && (
        <p className="text-sm text-red-400 sm:col-span-2">Não foi possível enviar agora. Tente novamente em instantes.</p>
      )}
    </form>
  )
}
