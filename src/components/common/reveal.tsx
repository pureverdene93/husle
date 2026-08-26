"use client"

import { motion } from "framer-motion"

type RevealProps = {
  children: React.ReactNode
  /** Stagger helper — delays the animation by index * 0.08s. */
  index?: number
  className?: string
}

export function Reveal({ children, index = 0, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
