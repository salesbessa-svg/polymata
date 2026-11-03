/* Partes da newsletter que podem rodar no navegador (sem acesso a arquivos). */

export type ArticleMeta = {
  slug: string
  number: number
  title: string
  subtitle: string
  description: string
  category: string
  date: string
  keywords: string[]
  cta: string
  featured: boolean
  readingMinutes: number
}

export const SERIF = "font-[family-name:var(--font-serif)]"

const CATEGORY_COLORS: Record<string, string> = {
  "Restaurantes & Delivery": "#C2410C",
  "Marketing & Presença": "#1D4ED8",
  "Marca & Reputação": "#BE185D",
  "Fotografia & Vídeo": "#B45309",
  "Gestão & Operação": "#047857",
  "Tributário & Finanças": "#6D28D9",
  "Tecnologia & Automação": "#0E7490",
  "Profissionais Liberais": "#334155",
  "Networking & Comunidade": "#9F1239",
}
const FALLBACK = ["#C2410C", "#1D4ED8", "#047857", "#6D28D9", "#0E7490", "#BE185D"]

export function hash(text: string) {
  let h = 0
  for (const c of text) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return h
}

export function categoryColor(category: string) {
  return CATEGORY_COLORS[category] ?? FALLBACK[hash(category) % FALLBACK.length]
}

export function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function editionLabel(n: number) {
  return `Nº ${String(n).padStart(2, "0")}`
}
