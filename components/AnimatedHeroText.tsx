"use client"

import { useEffect, useState } from "react"

const slides = [
  "Você é muito maior conosco",
  "Seus clientes saberão seu nome",
  "Você se distingue dos demais!",
  "A sua imagem permanece na memória deles!",
  "Anti IA camouflage"
]

const exitOrders = [
  [4,0,1,2,4],
  [0,1,4,4,4],
  [4,0,1,2,4],
  [0,1,2,8,6,7,5],
  [4,2,5]
]

export default function AnimatedHeroText() {

  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState("pre")

  useEffect(() => {

    let timeout: NodeJS.Timeout

    const runCycle = () => {

      timeout = setTimeout(() => {

        setPhase("exit")

        timeout = setTimeout(() => {

          timeout = setTimeout(() => {

            setIndex((prev) => (prev + 1) % slides.length)

            setPhase("pre")

            requestAnimationFrame(() => {
              setPhase("enter")
            })

            runCycle()

          }, 900)

        }, 1400)

      }, 3600)

    }

    runCycle()

    return () => clearTimeout(timeout)

  }, [])

  useEffect(() => {

    if (phase === "pre") {
      requestAnimationFrame(() => setPhase("enter"))
    }

  }, [index])

  const words = slides[index].split(" ")

  return (

    <h1
      className="
      text-white
      text-4xl
      md:text-6xl
      lg:text-7xl
      font-light
      tracking-wide
      leading-tight
      flex flex-wrap justify-center gap-x-3
      "
    >

      {words.map((word, i) => {

        const order = exitOrders[index]?.[i] ?? i

        const baseDelay =
          phase === "exit"
            ? order * 120
            : i * 120

        const maxOrder = Math.max(...(exitOrders[index] || [0]))

        const extraDelay =
          phase === "exit" && order === maxOrder
            ? 450
            : 0

        const delay = baseDelay + extraDelay

        return (

          <span
            key={i}
            style={{ transitionDelay: `${delay}ms` }}
            className={`
            inline-block
            transition-all
            duration-[1000ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]

            ${phase === "enter" && "opacity-100 translate-y-0 blur-0"}
            ${phase === "pre" && "opacity-0 translate-y-8 blur-xl"}
            ${phase === "exit" && "opacity-0 -translate-y-6"}
            `}
          >

            {word}

          </span>

        )

      })}

    </h1>

  )

}