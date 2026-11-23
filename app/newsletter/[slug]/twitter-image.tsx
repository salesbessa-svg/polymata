import { getAllArticles } from "@/lib/newsletter"
import OgImage from "./opengraph-image"

/* Mesma imagem do compartilhamento, para o X (Twitter). */

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Artigo da newsletter Polymata"

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }))
}

export default OgImage
