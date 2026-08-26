"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { toast } from "sonner"

import { buttonVariants } from "@/components/ui/button"
import { firePop } from "@/lib/confetti"
import { LOVE_GATE } from "@/lib/data"
import { cn } from "@/lib/utils"

/** How much the "Үгүй" button swells with each refusal. */
const GROWTH_PER_PRESS = 0.24
/**
 * Sonner's store is global and survives navigation, so a long toast would still
 * be on screen after "Тийм" moves us to the next page. Keep them brief.
 */
const TOAST_DURATION_MS = 2500
/** Keeps a jump from landing half off-screen. */
const EDGE_MARGIN = 12
/** The button stays out of the bottom strip so it never buries the "Тийм". */
const LOWEST_LANDING = 0.68

type Offset = { x: number; y: number }

function randomBetween(min: number, max: number) {
  return min + Math.random() * Math.max(0, max - min)
}

export function LoveGate({ nextHref }: { nextHref: string }) {
  const noRef = useRef<HTMLButtonElement>(null)
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 })
  const [refusals, setRefusals] = useState(0)
  const [popped, setPopped] = useState(false)

  /** Where the button is right now, in viewport coordinates. */
  function currentCentre() {
    const rect = noRef.current?.getBoundingClientRect()
    if (!rect) return null

    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      halfWidth: rect.width / 2,
      halfHeight: rect.height / 2,
    }
  }

  /** Teleports the button somewhere else in the viewport. */
  function jumpAway(centre: NonNullable<ReturnType<typeof currentCentre>>) {
    // The centre already includes the current offset, so subtract it back out
    // to find where the button would sit untranslated.
    const homeX = centre.x - offset.x
    const homeY = centre.y - offset.y

    // Grow first, then leave room for the size it is about to become.
    const grownHalfWidth = centre.halfWidth * 1.3
    const grownHalfHeight = centre.halfHeight * 1.3

    const targetX = randomBetween(
      EDGE_MARGIN + grownHalfWidth,
      window.innerWidth - EDGE_MARGIN - grownHalfWidth
    )
    const targetY = randomBetween(
      EDGE_MARGIN + grownHalfHeight,
      window.innerHeight * LOWEST_LANDING - grownHalfHeight
    )

    setOffset({ x: targetX - homeX, y: targetY - homeY })
  }

  function handleNo() {
    const centre = currentCentre()
    const next = refusals + 1

    // One press past the last excuse and the button gives up.
    if (next > LOVE_GATE.noToasts.length) {
      if (centre) {
        void firePop({
          x: centre.x / window.innerWidth,
          y: centre.y / window.innerHeight,
        })
      }
      setPopped(true)
      toast(LOVE_GATE.popToast, { duration: TOAST_DURATION_MS })
      return
    }

    if (centre) jumpAway(centre)
    setRefusals(next)
    toast(LOVE_GATE.noToasts[next - 1], { duration: TOAST_DURATION_MS })
  }

  return (
    <div className="w-full space-y-4">
      <p className="text-center text-sm text-balance text-muted-foreground">
        {LOVE_GATE.question}
      </p>

      <div className="flex items-center justify-center gap-3">
        <motion.div
          className={cn(popped && "w-full")}
          layout
          animate={popped ? { scale: [1, 1.08, 1] } : { scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href={nextHref}
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 px-6 text-base font-medium shadow-[0_12px_28px_-14px_var(--primary)]",
              popped && "w-full"
            )}
          >
            {LOVE_GATE.yes}
          </Link>
        </motion.div>

        <AnimatePresence>
          {popped ? null : (
            <motion.button
              ref={noRef}
              key="no"
              type="button"
              onClick={handleNo}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                // buttonVariants ships `transition-all`; a CSS transition on
                // transform fights Framer's per-frame updates and the button
                // ends up barely moving. Framer owns the motion here.
                "relative z-30 h-12 px-6 text-base font-medium transition-none"
              )}
              animate={{
                x: offset.x,
                y: offset.y,
                scale: 1 + refusals * GROWTH_PER_PRESS,
              }}
              exit={{ scale: 2.4, opacity: 0, transition: { duration: 0.25 } }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              {LOVE_GATE.no}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
