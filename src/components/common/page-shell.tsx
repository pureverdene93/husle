import { NextButton } from "@/components/common/next-button"
import { StepDots } from "@/components/common/step-dots"
import { cn } from "@/lib/utils"

type PageShellProps = {
  children: React.ReactNode
  /** Bottom call-to-action. Omitted on the cover, where the envelope navigates. */
  next?: { href: string; label: string; variant?: "default" | "outline" }
  /** Replaces the default next button — for pages with their own call to action. */
  footer?: React.ReactNode
  /** Classes for the content area — mostly to switch justify-center off. */
  className?: string
}

export function PageShell({
  children,
  next,
  footer,
  className,
}: PageShellProps) {
  return (
    <div className="mx-auto flex min-h-svh w-full max-w-md flex-col px-5 pt-12 pb-6 sm:max-w-xl sm:pt-16">
      <div className={cn("flex flex-1 flex-col justify-center", className)}>
        {children}
      </div>

      <footer className="mt-10 flex flex-col items-center gap-3">
        <StepDots />
        {footer ??
          (next ? (
            <NextButton
              href={next.href}
              label={next.label}
              variant={next.variant}
            />
          ) : null)}
      </footer>
    </div>
  )
}
