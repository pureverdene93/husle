import { PageTransition } from "@/components/common/page-transition"

/**
 * A template remounts on every navigation (a layout would not), which is what
 * replays the page transition.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>
}
