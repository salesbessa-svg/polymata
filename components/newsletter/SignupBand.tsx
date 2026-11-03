import NewsletterSignup from "@/components/NewsletterSignup"
import { SERIF } from "@/lib/newsletter-shared"

export default function SignupBand({ source, compact = false }: { source: string; compact?: boolean }) {
  return (
    <div className={`text-[#1C1A17] ${compact ? "rounded-sm border border-[#D9D2C3] bg-white/70 p-7 md:p-10" : "border-y border-[#D9D2C3] bg-[#ECE7DB] px-5 py-20 sm:px-6 md:px-8 md:py-24"}`}>
      <div className={`mx-auto grid gap-10 ${compact ? "" : "max-w-6xl lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-center"}`}>
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C2410C]">Newsletter Polymata</span>
          <h2 className={`${SERIF} mt-4 font-light leading-[1.1] tracking-tight ${compact ? "text-3xl" : "text-4xl md:text-5xl"}`}>
            Toda semana, um problema real de quem toca uma empresa e o que ninguém conta sobre ele.
          </h2>
          {!compact && (
            <p className="mt-5 max-w-lg leading-relaxed text-[#5E574D]">
              Leitura de cinco minutos, escrita para donos de negócio. Gratuita, sem spam, e você sai quando quiser.
            </p>
          )}
        </div>
        <NewsletterSignup source={source} theme="light" />
      </div>
    </div>
  )
}
