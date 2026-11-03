"use client"

import { useState } from "react"
import Link from "next/link"
import { LOGO_HREF, LOGO_RATIO, logoSrc } from "@/lib/brand"

/** Logo da Polymata (Homo Volans). Sempre leva à seção "Quem é Polymata" da newsletter. */
export default function Logo({
  size = 32,
  background = "dark",
  className = "",
  onClick,
  link = true,
}: {
  /** largura em pixels */
  size?: number
  /** cor do fundo onde a logo aparece */
  background?: "dark" | "light"
  className?: string
  onClick?: () => void
  link?: boolean
}) {
  const [missing, setMissing] = useState(false)
  if (missing) return null

  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logoSrc(background, size)}
      alt="Logo Polymata: o Homo Volans de Fausto Verancio"
      width={size}
      height={Math.round(size * LOGO_RATIO)}
      onError={() => setMissing(true)}
      className={`block h-auto object-contain ${className}`}
      style={{ width: size }}
    />
  )

  if (!link) return img
  return (
    <Link href={LOGO_HREF} onClick={onClick} aria-label="Quem é Polymata" className="inline-flex shrink-0 transition-opacity hover:opacity-80">
      {img}
    </Link>
  )
}
