import { SERIF, categoryColor, editionLabel, hash } from "@/lib/newsletter-shared"

/** Capa tipográfica gerada a partir da categoria e do número da edição. */
export default function Cover({
  slug,
  category,
  number,
  className = "",
  big = false,
}: {
  slug: string
  category: string
  number: number
  className?: string
  big?: boolean
}) {
  const color = categoryColor(category)
  const h = hash(slug)
  const variant = h % 4
  const cx = 120 + (h % 200)
  const cy = 60 + ((h >> 4) % 180)

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ backgroundColor: color }} aria-hidden="true">
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        {variant === 0 &&
          Array.from({ length: 9 }, (_, i) => (
            <circle key={i} cx={cx} cy={cy} r={22 + i * 26} fill="none" stroke="#fff" strokeOpacity={0.2 - i * 0.015} strokeWidth="1.2" />
          ))}
        {variant === 1 &&
          Array.from({ length: 22 }, (_, i) => (
            <line key={i} x1={-100 + i * 26} y1={300} x2={60 + i * 26} y2={0} stroke="#fff" strokeOpacity="0.13" strokeWidth="1.2" />
          ))}
        {variant === 2 && (
          <>
            {Array.from({ length: 14 * 11 }, (_, i) => (
              <circle key={i} cx={14 + (i % 14) * 29} cy={14 + Math.floor(i / 14) * 28} r="1.6" fill="#fff" fillOpacity="0.28" />
            ))}
            <circle cx={cx} cy={cy} r="70" fill="#fff" fillOpacity="0.12" />
          </>
        )}
        {variant === 3 &&
          Array.from({ length: 7 }, (_, i) => (
            <path
              key={i}
              d={`M ${-20 + i * 18} 300 A ${140 + i * 30} ${140 + i * 30} 0 0 1 ${280 + i * 40} ${-10}`}
              fill="none"
              stroke="#fff"
              strokeOpacity="0.17"
              strokeWidth="1.3"
            />
          ))}
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
      <span className="absolute left-4 top-4 text-[10px] font-medium uppercase tracking-[0.25em] text-white/85 sm:left-5 sm:top-5 sm:text-[11px]">
        {category}
      </span>
      <span
        className={`${SERIF} absolute bottom-2 right-4 font-light leading-none text-white sm:right-5 ${
          big ? "text-7xl md:text-9xl" : "text-5xl md:text-6xl"
        }`}
      >
        {editionLabel(number)}
      </span>
    </div>
  )
}
