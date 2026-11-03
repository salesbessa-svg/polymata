"use client"

import { useEffect, useState } from "react"

export default function ReadingProgress({ color }: { color: string }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById("artigo")
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const done = Math.min(Math.max(-rect.top / (total || 1), 0), 1)
      setProgress(done)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <div className="fixed left-0 right-0 top-[68px] z-[90] h-[3px] bg-transparent sm:top-[72px]" aria-hidden="true">
      <div className="h-full origin-left" style={{ backgroundColor: color, transform: `scaleX(${progress})` }} />
    </div>
  )
}
