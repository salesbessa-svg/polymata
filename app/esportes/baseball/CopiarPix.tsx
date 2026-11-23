"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

/** Copia a chave PIX para a área de transferência. */
export default function CopiarPix({ chave }: { chave: string }) {
  const [copiado, setCopiado] = useState(false)

  async function copiar() {
    try {
      await navigator.clipboard.writeText(chave)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2500)
    } catch {
      setCopiado(false)
    }
  }

  return (
    <button
      type="button"
      onClick={copiar}
      className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#F97316] px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F97316]"
    >
      {copiado ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      <span aria-live="polite">{copiado ? "Chave copiada" : "Copiar chave PIX"}</span>
    </button>
  )
}
