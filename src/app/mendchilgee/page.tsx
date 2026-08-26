import { PageShell } from "@/components/common/page-shell"
import { Reveal } from "@/components/common/reveal"
import { LoveGate } from "@/components/features/letter/love-gate"
import { Polaroid } from "@/components/features/letter/polaroid"
import { LETTER, STEPS } from "@/lib/data"

export default function LetterPage() {
  return (
    <PageShell footer={<LoveGate nextHref={STEPS[2].href} />} className="gap-8">
      <h1 className="text-center font-heading text-3xl font-semibold">
        {LETTER.title}
      </h1>

      <Reveal>
        <Polaroid
          alt={LETTER.photo.alt}
          front={LETTER.photo.front}
          back={LETTER.photo.back}
        />
      </Reveal>

      <div className="space-y-4 text-[0.95rem] leading-relaxed text-pretty">
        {LETTER.paragraphs.map((paragraph, index) => (
          <Reveal key={paragraph} index={index}>
            <p>{paragraph}</p>
          </Reveal>
        ))}
      </div>

      <p className="text-right font-heading text-lg text-primary">
        {LETTER.signature}
      </p>
    </PageShell>
  )
}
