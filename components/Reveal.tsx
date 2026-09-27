"use client"

import { motion, type Variants } from "framer-motion"

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Revela um texto palavra por palavra quando ele entra na tela,
 * na mesma linguagem visual do AnimatedHeroText (blur + subida + fade),
 * mas disparado por scroll em vez de looping automático.
 */
export function RevealText({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
}: {
  text: string
  as?: "h1" | "h2" | "h3" | "p"
  className?: string
  delay?: number
}) {
  const words = text.split(" ")

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.055, delayChildren: delay },
    },
  }

  const word: Variants = {
    hidden: { opacity: 0, y: 22, filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: EASE },
    },
  }

  return (
    <Tag className={className}>
      <motion.span
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-15% 0px" }}
        variants={container}
        className="inline"
        aria-label={text}
      >
        {words.map((w, i) => (
          <motion.span key={i} variants={word} className="inline-block whitespace-pre" aria-hidden="true">
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  )
}

/** Fade + subida simples para blocos que não são texto de destaque (parágrafos, grupos). */
export function RevealBlock({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}