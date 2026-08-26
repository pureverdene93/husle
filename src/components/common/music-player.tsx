"use client"

import { useEffect, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"

import { cn } from "@/lib/utils"

type MusicPlayerProps = {
  src: string
  title: string
}

/**
 * Background music. Browsers block autoplay, so playback is armed on the very
 * first tap anywhere on the page — which on this app is the envelope.
 */
export function MusicPlayer({ src, title }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    function startOnFirstInteraction() {
      if (!audio) return
      audio.volume = 0.35
      void audio.play().catch(() => {
        // Still blocked — the visitor can start it from the button instead.
      })
    }

    document.addEventListener("pointerdown", startOnFirstInteraction, {
      once: true,
    })

    return () =>
      document.removeEventListener("pointerdown", startOnFirstInteraction)
  }, [])

  function toggle() {
    const audio = audioRef.current
    if (!audio) return

    const nextMuted = !muted
    audio.muted = nextMuted
    setMuted(nextMuted)

    if (!nextMuted && audio.paused) {
      audio.volume = 0.35
      void audio.play().catch(() => {})
    }
  }

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />
      <button
        type="button"
        onClick={toggle}
        aria-label={muted ? `${title} — асаах` : `${title} — унтраах`}
        className={cn(
          "fixed top-4 right-4 z-50 grid size-10 place-items-center rounded-full",
          "border border-border/70 bg-card/80 text-muted-foreground backdrop-blur-sm",
          "transition-all hover:scale-105 hover:text-primary active:scale-95"
        )}
      >
        {muted ? (
          <VolumeX className="size-4" />
        ) : (
          <Volume2 className="size-4" />
        )}
      </button>
    </>
  )
}
