/**
 * Purely decorative wash behind every page: a few blurred colour pools plus
 * small drifting marks. No client JS — the drift is a CSS keyframe.
 */

type Mark = {
  symbol: string
  /** Tailwind position + size utilities for this mark. */
  position: string
  duration: string
  delay: string
}

const MARKS: Mark[] = [
  { symbol: "✨", position: "top-[8%] left-1 text-base", duration: "11s", delay: "0s" },
  { symbol: "💛", position: "top-[22%] right-1 text-sm", duration: "13s", delay: "1.5s" },
  { symbol: "🎈", position: "top-[56%] left-0.5 text-lg", duration: "15s", delay: "0.8s" },
  { symbol: "🌸", position: "top-[72%] right-0.5 text-base", duration: "12s", delay: "2.2s" },
  { symbol: "✨", position: "bottom-[10%] left-[10%] text-xs", duration: "14s", delay: "3s" },
]

export function BackgroundDecor() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute -top-24 -left-24 size-72 rounded-full bg-accent/45 blur-3xl" />
      <div className="absolute top-1/3 -right-28 size-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-32 left-1/4 size-80 rounded-full bg-warm-to/50 blur-3xl" />

      {MARKS.map((mark, index) => (
        <span
          key={index}
          className={`absolute select-none opacity-35 ${mark.position}`}
          style={{
            animation: `drift-soft ${mark.duration} ease-in-out ${mark.delay} infinite`,
          }}
        >
          {mark.symbol}
        </span>
      ))}
    </div>
  )
}
