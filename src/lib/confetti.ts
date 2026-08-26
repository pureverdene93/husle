/**
 * Fires a birthday confetti burst. canvas-confetti is browser-only, so it is
 * imported lazily and never lands in the server bundle.
 */

/**
 * canvas-confetti paints to a <canvas>, so it takes literal colours rather
 * than CSS variables. These mirror the warm palette in globals.css — keep them
 * in sync if the theme changes.
 */
const WARM_COLORS = [
  "#c8785c", // primary / terracotta
  "#e8b95f", // flame
  "#f3c6a5", // peach
  "#fbebd8", // cream
  "#e0a890", // rose
  "#c2b49a", // sand
]

export async function fireConfetti() {
  const { default: confetti } = await import("canvas-confetti")

  const defaults = {
    spread: 80,
    ticks: 120,
    gravity: 0.9,
    scalar: 1.1,
    colors: WARM_COLORS,
  }

  confetti({ ...defaults, particleCount: 80, origin: { x: 0.2, y: 0.7 } })
  confetti({ ...defaults, particleCount: 80, origin: { x: 0.8, y: 0.7 } })

  window.setTimeout(() => {
    confetti({ ...defaults, particleCount: 120, origin: { x: 0.5, y: 0.6 } })
  }, 250)
}

/** A small burst at one point on screen — used when the "Үгүй" button pops. */
export async function firePop(origin: { x: number; y: number }) {
  const { default: confetti } = await import("canvas-confetti")

  confetti({
    particleCount: 46,
    spread: 360,
    startVelocity: 20,
    ticks: 70,
    scalar: 0.8,
    colors: WARM_COLORS,
    origin,
  })
}
