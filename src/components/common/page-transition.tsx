"use client"

import { motion } from "framer-motion"

/**
 * Enter animation for every route. `app/template.tsx` remounts this on each
 * navigation, so the fade/slide replays without needing AnimatePresence.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
