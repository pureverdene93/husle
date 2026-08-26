"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { toast } from "sonner"

import { COVER, STEPS } from "@/lib/data"

/** Where the envelope takes you once the photo is out. */
const NEXT_HREF = STEPS[1]?.href ?? "/"
const OPEN_DURATION_MS = 3400
/** Fires once the photo has finished rising out of the envelope. */
const PHOTO_TOAST_DELAY_MS = 1200

/** The pocket in front of the photo — a trapezoid cut out of a rectangle. */
const POCKET_CLIP = "polygon(0 26%, 50% 66%, 100% 26%, 100% 100%, 0 100%)"
const FLAP_CLIP = "polygon(0 0, 100% 0, 50% 100%)"

export function CoverScene() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  function handleOpen() {
    if (open) return
    setOpen(true)
    window.setTimeout(
      () => toast(COVER.photoToast, { duration: 2400 }),
      PHOTO_TOAST_DELAY_MS
    )
    window.setTimeout(() => router.push(NEXT_HREF), OPEN_DURATION_MS)
  }

  return (
    <div className="flex flex-col items-center gap-10">
      {/* The heading clears out of the way so the photo has room to rise. */}
      <motion.header
        className="space-y-3 text-center"
        animate={open ? { opacity: 0, y: -24 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="font-heading text-3xl leading-snug font-semibold text-balance sm:text-4xl">
          {COVER.title}
        </h1>
        <p className="text-sm text-balance text-muted-foreground">
          {COVER.subtitle}
        </p>
      </motion.header>

      <motion.button
        type="button"
        onClick={handleOpen}
        aria-label={COVER.hint}
        className="relative aspect-[4/3] w-full max-w-[19rem] cursor-pointer rounded-3xl outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
        style={{ perspective: 1200 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        animate={open ? { scale: 1.02, y: 8 } : { scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        {/* Envelope back */}
        <div className="absolute inset-0 rounded-2xl bg-secondary shadow-[0_24px_60px_-28px_var(--foreground)]" />

        {/* The photo, tucked inside until the flap lifts. It sits behind the
            pocket so the bottom edge stays hidden inside the envelope. */}
        <motion.div
          className="absolute bottom-6 left-1/2 z-10 w-40 -translate-x-1/2 rounded-sm bg-paper p-1.5 pb-5 shadow-[0_16px_36px_-18px_var(--foreground)]"
          initial={{ y: 56, opacity: 0, rotate: 0 }}
          animate={
            open
              ? { y: -56, opacity: 1, rotate: -3 }
              : { y: 56, opacity: 0, rotate: 0 }
          }
          transition={{
            delay: open ? 0.5 : 0,
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="relative aspect-[9/16] overflow-hidden bg-muted">
            <Image
              src={COVER.photo.src}
              alt={COVER.photo.alt}
              fill
              sizes="10rem"
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Front pocket */}
        <div
          className="absolute inset-0 z-20 rounded-2xl bg-accent"
          style={{ clipPath: POCKET_CLIP }}
        />

        {/* Flap */}
        <motion.div
          className="absolute inset-x-0 top-0 h-[66%] origin-top bg-accent-foreground/10"
          style={{ clipPath: FLAP_CLIP, transformStyle: "preserve-3d" }}
          animate={{ rotateX: open ? -172 : 0, zIndex: open ? 0 : 30 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />

        {/* Wax seal */}
        <motion.span
          className="absolute top-[58%] left-1/2 z-40 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_6px_16px_-6px_var(--primary)]"
          animate={
            open
              ? { scale: 0, opacity: 0 }
              : { scale: [1, 1.06, 1], opacity: 1 }
          }
          transition={
            open
              ? { duration: 0.3 }
              : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <Heart className="size-5 fill-current" />
        </motion.span>
      </motion.button>

      <motion.p
        className="text-sm text-muted-foreground"
        animate={open ? { opacity: 0 } : { opacity: [0.5, 1, 0.5] }}
        transition={
          open ? { duration: 0.2 } : { duration: 2.4, repeat: Infinity }
        }
      >
        {COVER.hint}
      </motion.p>
    </div>
  )
}
