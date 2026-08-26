"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { STEPS } from "@/lib/data"
import { cn } from "@/lib/utils"

/** Progress dots — also a shortcut back to any page already seen. */
export function StepDots() {
  const pathname = usePathname()
  const currentIndex = Math.max(
    0,
    STEPS.findIndex((step) => step.href === pathname)
  )

  return (
    <nav aria-label="Хуудасны явц" className="flex items-center">
      {STEPS.map((step, index) => {
        const isCurrent = index === currentIndex

        return (
          <Link
            key={step.href}
            href={step.href}
            aria-label={step.label}
            aria-current={isCurrent ? "step" : undefined}
            className="group grid h-8 place-items-center px-1.5"
          >
            <span
              className={cn(
                "block h-2 rounded-full transition-all duration-300 ease-out",
                isCurrent
                  ? "w-6 bg-primary"
                  : index < currentIndex
                    ? "w-2 bg-primary/40 group-hover:bg-primary/70"
                    : "w-2 bg-foreground/15 group-hover:bg-primary/40"
              )}
            />
          </Link>
        )
      })}
    </nav>
  )
}
