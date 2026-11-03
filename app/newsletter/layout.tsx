import { Newsreader } from "next/font/google"
import Navbar from "@/components/Navbar"

const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
})

export default function NewsletterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${serif.variable} min-h-screen bg-[#F4F1EA] text-[#1C1A17] selection:bg-[#C2410C]/20`}>
      <Navbar />
      {children}
    </div>
  )
}
