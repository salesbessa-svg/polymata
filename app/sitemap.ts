import type { MetadataRoute } from "next"
import { SITE_URL, getAllArticles } from "@/lib/newsletter"
import { SHARE_IMAGES } from "@/lib/seo"

/* Mapa do site para o Google, com as imagens de cada página. */

const img = (path: string) => `${SITE_URL}${path}`

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1,
      images: [img(SHARE_IMAGES.home.path), img("/polymata-logo.png")] },
    { url: `${SITE_URL}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9,
      images: [img(SHARE_IMAGES.servicos.path)] },
    { url: `${SITE_URL}/projetos`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8,
      images: [img(SHARE_IMAGES.rede.path)] },
    { url: `${SITE_URL}/newsletter`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8,
      images: [img(SHARE_IMAGES.newsletter.path)] },
    { url: `${SITE_URL}/contato`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6,
      images: [img(SHARE_IMAGES.contato.path)] },
  ]
  const posts: MetadataRoute.Sitemap = getAllArticles().map((a) => ({
    url: `${SITE_URL}/newsletter/${a.slug}`,
    lastModified: new Date(`${a.date}T12:00:00`),
    changeFrequency: "monthly",
    priority: 0.7,
    images: [img(`/newsletter/${a.slug}/opengraph-image`)],
  }))
  return [...pages, ...posts]
}
