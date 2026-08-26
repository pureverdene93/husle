"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type NextButtonProps = {
  href: string
  label: string
  /** Renders the softer outline style — used by the replay button. */
  variant?: "default" | "outline"
}

export function NextButton({
  href,
  label,
  variant = "default",
}: NextButtonProps) {
  return (
    <motion.div
      className="w-full"
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      <Link
        href={href}
        className={cn(
          buttonVariants({ variant, size: "lg" }),
          "h-12 w-full gap-2 text-base font-medium",
          variant === "default" &&
            "shadow-[0_12px_28px_-14px_var(--primary)] hover:shadow-[0_16px_34px_-14px_var(--primary)]"
        )}
      >
        {label}
        <ArrowRight className="size-4" />
      </Link>
    </motion.div>
  )
}
