"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { fireConfetti } from "@/lib/confetti"
import { CAKE } from "@/lib/data"

/** Lets the burst land before the closing card covers it. */
const FINALE_DELAY_MS = 900

function Candle({ lit, onBlowOut }: { lit: boolean; onBlowOut: () => void }) {
  return (
    <button
      type="button"
      onClick={onBlowOut}
      disabled={!lit}
      aria-label={lit ? "Лаа унтраах" : "Лаа унтарсан"}
      className="group flex cursor-pointer flex-col items-center px-2.5 pt-3 outline-none disabled:cursor-default"
    >
      <span className="relative mb-1 block h-5 w-3">
        <AnimatePresence>
          {lit ? (
            <motion.span
              key="flame"
              className="absolute inset-x-0 bottom-0 mx-auto block size-3 bg-flame shadow-[0_0_14px_3px_var(--flame)]"
              style={{ borderRadius: "50% 50% 45% 45% / 65% 65% 35% 35%" }}
              animate={{ scaleY: [1, 1.3, 1], scaleX: [1, 0.9, 1] }}
              // The flicker repeats forever, so the exit needs its own
              // finite transition or AnimatePresence never removes the flame.
              exit={{
                scale: 0,
                opacity: 0,
                transition: { duration: 0.25, repeat: 0 },
              }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
            />
          ) : (
            <motion.span
              key="smoke"
              className="absolute inset-x-0 bottom-0 mx-auto block size-2 rounded-full bg-muted-foreground/40"
              initial={{ opacity: 0.6, y: 0, scale: 0.6 }}
              animate={{ opacity: 0, y: -22, scale: 1.6 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>
      </span>

      <span
        className="block h-11 w-1.5 rounded-full bg-primary/75 transition-transform group-enabled:group-hover:-translate-y-0.5"
        aria-hidden
      />
    </button>
  )
}

export function Cake() {
  const [litCandles, setLitCandles] = useState<boolean[]>(() =>
    Array.from({ length: CAKE.candleCount }, () => true)
  )
  const [showFinale, setShowFinale] = useState(false)

  const allOut = litCandles.every((lit) => !lit)

  useEffect(() => {
    if (!allOut) return

    void fireConfetti()
    const timer = window.setTimeout(() => setShowFinale(true), FINALE_DELAY_MS)

    return () => window.clearTimeout(timer)
  }, [allOut])

  function blowOut(index: number) {
    setLitCandles((previous) =>
      previous.map((lit, position) => (position === index ? false : lit))
    )
  }

  function relight() {
    setShowFinale(false)
    setLitCandles(Array.from({ length: CAKE.candleCount }, () => true))
  }

  return (
    <div className="space-y-6">
      <motion.div
        className="mx-auto w-[17rem] select-none"
        // The cake takes the blast with the confetti.
        animate={allOut ? { scale: [1, 1.07, 0.97, 1] } : { scale: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <div className="mx-auto w-[15rem]">
          <div className="flex items-end justify-center">
            {litCandles.map((lit, index) => (
              <Candle key={index} lit={lit} onBlowOut={() => blowOut(index)} />
            ))}
          </div>

          <div className="overflow-hidden rounded-t-[1.75rem] rounded-b-2xl shadow-[0_20px_44px_-26px_var(--foreground)]">
            {/* Frosting */}
            <div className="relative h-9 bg-accent">
              <span className="absolute top-3 left-8 size-1.5 rounded-full bg-primary/60" />
              <span className="absolute top-5 left-1/2 size-1.5 rounded-full bg-primary/45" />
              <span className="absolute top-3.5 right-9 size-1.5 rounded-full bg-primary/60" />
            </div>

            {/* Upper tier */}
            <div className="h-14 bg-primary/25" />

            {/* Cream band */}
            <div className="h-4 bg-accent" />

            {/* Lower tier */}
            <div className="h-16 bg-primary/30" />
          </div>
        </div>

        {/* Plate */}
        <div className="-mt-1 h-3 w-full rounded-full bg-foreground/15" />
      </motion.div>

      <div className="min-h-12 text-center">
        <AnimatePresence mode="wait">
          {allOut ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Button variant="ghost" size="sm" onClick={relight}>
                Дахин асаах
              </Button>
            </motion.div>
          ) : (
            <motion.p
              key="wish"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-pretty text-muted-foreground"
            >
              {CAKE.wish}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <Dialog open={showFinale} onOpenChange={setShowFinale}>
        <DialogContent className="gap-4 sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center font-heading text-xl">
              {CAKE.finale.title}
            </DialogTitle>
          </DialogHeader>

          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
            <Image
              src={CAKE.finale.photo}
              alt={CAKE.finale.alt}
              fill
              sizes="24rem"
              className="object-cover"
              priority
            />
          </div>

          <DialogDescription className="text-center font-heading text-base text-balance text-foreground">
            {CAKE.finale.text}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  )
}
