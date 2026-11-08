/* =========================================================
   NEWSLETTER: leitura dos artigos em content/newsletter/*.md
   Cada arquivo .md é uma edição. Arquivos que começam com "_"
   (como _MODELO.md) são ignorados. Veja _MODELO.md para o formato.
========================================================= */

import fs from "node:fs"
import path from "node:path"
import { slugify, type ArticleMeta } from "./newsletter-shared"

export * from "./newsletter-shared"

const DIR = path.join(process.cwd(), "content", "newsletter")

export { SITE_URL } from "./newsletter-shared-url"

export type Block =
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "quote"; text: string }
  | { type: "callout"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "hr" }

export type Article = ArticleMeta & { blocks: Block[]; wordCount: number }

/* ---------- leitura do arquivo ---------- */

function parseFrontmatter(raw: string) {
  const match = raw.replace(/^﻿/, "").match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/)
  if (!match) return { data: {} as Record<string, string>, body: raw }
  const data: Record<string, string> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^\s*([\w-]+)\s*:\s*(.*)$/)
    if (m) data[m[1].toLowerCase()] = m[2].trim().replace(/^["'](.*)["']$/, "$1")
  }
  return { data, body: match[2] }
}

function parseBody(body: string): Block[] {
  const lines = body.split(/\r?\n/)
  const blocks: Block[] = []
  let para: string[] = []
  const flush = () => {
    if (para.length) blocks.push({ type: "p", text: para.join(" ").trim() })
    para = []
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    if (!line) { flush(); continue }
    if (/^-{3,}$/.test(line)) { flush(); blocks.push({ type: "hr" }); continue }
    if (line.startsWith("### ")) { flush(); blocks.push({ type: "h3", text: line.slice(4).trim() }); continue }
    if (line.startsWith("## ")) {
      flush()
      const text = line.slice(3).trim()
      blocks.push({ type: "h2", text, id: slugify(text) })
      continue
    }

    // blocos de várias linhas: citação (>), alerta (!>) e listas
    const collect = (re: RegExp) => {
      const out: string[] = []
      while (i < lines.length && re.test(lines[i].trim())) {
        out.push(lines[i].trim().replace(re, "").trim())
        i++
      }
      i--
      return out
    }
    if (line.startsWith("!>")) { flush(); blocks.push({ type: "callout", text: collect(/^!>\s?/).join(" ") }); continue }
    if (line.startsWith(">")) { flush(); blocks.push({ type: "quote", text: collect(/^>\s?/).join(" ") }); continue }
    if (/^[-*]\s+/.test(line)) { flush(); blocks.push({ type: "ul", items: collect(/^[-*]\s+/) }); continue }
    if (/^\d+[.)]\s+/.test(line)) { flush(); blocks.push({ type: "ol", items: collect(/^\d+[.)]\s+/) }); continue }

    para.push(line)
  }
  flush()
  return blocks
}

function isYes(value?: string) {
  return /^(sim|true|yes|s)$/i.test(value ?? "")
}

function readArticles(): Article[] {
  if (!fs.existsSync(DIR)) return []
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".md") && !f.startsWith("_"))

  const list = files
    .map((file) => {
      const raw = fs.readFileSync(path.join(DIR, file), "utf-8")
      const { data, body } = parseFrontmatter(raw)
      if (isYes(data.rascunho)) return null
      const blocks = parseBody(body)
      const words = body.split(/\s+/).filter(Boolean).length
      const title = data.titulo || file.replace(/\.md$/, "")
      return {
        slug: data.slug || file.replace(/\.md$/, ""),
        number: 0,
        title,
        subtitle: data.subtitulo || "",
        description: data.descricao || data.subtitulo || "",
        category: data.categoria || "Gestão & Operação",
        date: data.data || "2026-01-01",
        keywords: (data["palavras-chave"] || "").split(",").map((k) => k.trim()).filter(Boolean),
        cta: data.chamada || "Quer aplicar isso no seu negócio? Fale com a Polymata.",
        featured: isYes(data.destaque),
        readingMinutes: Math.max(1, Math.round(words / 200)),
        wordCount: words,
        blocks,
      } satisfies Article
    })
    .filter((a): a is Article => a !== null)

  // numeração das edições pela data (a mais antiga é a nº 1)
  ;[...list].sort((a, b) => a.date.localeCompare(b.date)).forEach((a, i) => (a.number = i + 1))
  // mais recentes primeiro
  return list.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title))
}

let cache: Article[] | null = null
export function getAllArticles(): Article[] {
  if (process.env.NODE_ENV === "development") return readArticles()
  return (cache ??= readArticles())
}

export function getArticle(slug: string) {
  return getAllArticles().find((a) => a.slug === slug)
}

export function getFeatured() {
  const all = getAllArticles()
  return all.find((a) => a.featured) ?? all[0]
}

export function toMeta(a: Article): ArticleMeta {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { blocks, wordCount, ...meta } = a
  return meta
}

export function getRelated(article: Article, count = 3) {
  const others = getAllArticles().filter((a) => a.slug !== article.slug)
  const same = others.filter((a) => a.category === article.category)
  const rest = others.filter((a) => a.category !== article.category)
  return [...same, ...rest].slice(0, count)
}
