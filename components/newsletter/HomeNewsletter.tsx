import { Newsreader } from "next/font/google"
import { getAllArticles, toMeta } from "@/lib/newsletter"
import NewsletterSpotlight from "./NewsletterSpotlight"

const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
})

/** Seção da página inicial: mostra uma edição da newsletter sorteada a cada visita. */
export default function HomeNewsletter() {
  const articles = getAllArticles().map(toMeta)
  if (articles.length === 0) return null
  return (
    <div className={serif.variable}>
      <NewsletterSpotlight articles={articles} />
    </div>
  )
}
