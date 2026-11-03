import type { MetadataRoute } from "next"
import { SITE_URL, getAllArticles } from "@/lib/newsletter"

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/services", "/projetos", "/newsletter", "/contato"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }))
  const posts = getAllArticles().map((a) => ({
    url: `${SITE_URL}/newsletter/${a.slug}`,
    lastModified: new Date(`${a.date}T12:00:00`),
  }))
  return [...pages, ...posts]
}
