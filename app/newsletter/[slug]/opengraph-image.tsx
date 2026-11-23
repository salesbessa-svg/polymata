import fs from "node:fs"
import path from "node:path"
import { ImageResponse } from "next/og"
import { categoryColor, getAllArticles, getArticle } from "@/lib/newsletter"

/* Imagem de compartilhamento de cada artigo (WhatsApp, LinkedIn, Facebook, X). */

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Artigo da newsletter Polymata"

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(slug)
  const title = article?.title ?? "Newsletter Polymata"
  const category = article?.category ?? "Newsletter"
  const color = categoryColor(category)
  const logo = fs.readFileSync(path.join(process.cwd(), "public", "polymata-logo-branco-pequeno.png")).toString("base64")
  const titleSize = title.length > 90 ? 50 : title.length > 60 ? 58 : 66

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0B0B0A", padding: 22 }}>
        <div style={{ flex: 1, display: "flex", border: "1.5px solid #C9A96E", padding: 6 }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "1px solid #5E4E33",
              padding: "56px 72px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 12, height: 12, borderRadius: 6, background: color }} />
              <div style={{ fontSize: 20, letterSpacing: 6, color: "#C9A96E", textTransform: "uppercase" }}>{category}</div>
            </div>
            <div style={{ display: "flex", fontSize: titleSize, lineHeight: 1.12, color: "#F1EBDD", maxWidth: 980 }}>{title}</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`data:image/png;base64,${logo}`} width={44} height={56} alt="" />
                <div style={{ fontSize: 26, letterSpacing: 10, color: "#F1EBDD" }}>POLYMATA</div>
              </div>
              <div style={{ fontSize: 20, letterSpacing: 4, color: "#B9B0A0" }}>polymata.com.br/newsletter</div>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  )
}
