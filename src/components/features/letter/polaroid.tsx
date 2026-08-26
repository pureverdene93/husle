"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { RotateCcw } from "lucide-react"

type PolaroidFace = {
  src: string
  caption: string
}

type PolaroidProps = {
  alt: string
  front: PolaroidFace
  /** Revealed when the card is tapped. */
  back: PolaroidFace
}

/** One side of the card — same frame, so the flip stays seamless. */
function Face({
  face,
  alt,
  priority,
  flipped,
}: {
  face: PolaroidFace
  alt: string
  priority?: boolean
  flipped?: boolean
}) {
  return (
    <div
      className="backface-hidden absolute inset-0 flex flex-col rounded-sm bg-paper p-3 pb-[4.75rem] shadow-[0_18px_44px_-20px_var(--foreground)]"
      style={flipped ? { transform: "rotateY(180deg)" } : undefined}
    >
      <div className="relative flex-1 overflow-hidden bg-muted">
        <Image
          src={face.src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 14rem, 16rem"
          className="object-cover"
          priority={priority}
        />
      </div>

      {/* Flip hint — kept in the photo corner so it never crowds the caption. */}
      <span className="absolute top-4 right-4 grid size-6 place-items-center rounded-full bg-paper/85 text-primary/70 backdrop-blur-sm">
        <RotateCcw className="size-3" />
      </span>

      {/* The caption sits centred in the thick bottom border of the frame. */}
      <div className="absolute inset-x-3 bottom-0 flex h-[4.75rem] items-center justify-center">
        <p className="line-clamp-4 text-center font-heading text-[0.78rem] leading-snug text-balance text-muted-foreground italic">
          {face.caption}
        </p>
      </div>
    </div>
  )
}

export function Polaroid({ alt, front, back }: PolaroidProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="flex justify-center" style={{ perspective: 1200 }}>
      <motion.button
        type="button"
        onClick={() => setFlipped((previous) => !previous)}
        aria-label={flipped ? "Нүүрэн талыг харах" : "Ар талыг нь харах"}
        aria-pressed={flipped}
        className="preserve-3d relative h-[21rem] w-56 cursor-pointer rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/40 sm:h-[24rem] sm:w-64"
        initial={{ rotate: -4 }}
        whileHover={{ scale: 1.03, rotate: -1 }}
        whileTap={{ scale: 0.98 }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 24 }}
      >
        {/* Both faces load up front: the back is rotated away, so lazy
            loading never triggers for it and the flip would show a blank
            frame while it fetched. */}
        <Face face={front} alt={alt} priority />
        <Face face={back} alt={alt} priority flipped />
      </motion.button>
    </div>
  )
}
