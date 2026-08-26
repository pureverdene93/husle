import type { Metadata, Viewport } from "next"
import { Manrope, Playfair_Display } from "next/font/google"

import "./globals.css"
import { BackgroundDecor } from "@/components/common/background-decor"
import { MusicPlayer } from "@/components/common/music-player"
import { Toaster } from "@/components/ui/sonner"
import { MUSIC, TO_NAME } from "@/lib/data"
import { cn } from "@/lib/utils"

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
})

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-heading",
})

export const metadata: Metadata = {
  title: `${TO_NAME} — төрсөн өдрийн мэнд`,
  description: "Чамд зориулсан жижигхэн бэлэг.",
}

export const viewport: Viewport = {
  // Mirrors --background in globals.css; a meta tag cannot read a CSS variable.
  themeColor: "#fbf4ea",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="mn"
      className={cn("h-full antialiased", manrope.variable, playfair.variable)}
    >
      <body className="min-h-full">
        <BackgroundDecor />
        {MUSIC.src ? (
          <MusicPlayer src={MUSIC.src} title={MUSIC.title} />
        ) : null}
        {children}
        <Toaster theme="light" position="top-center" />
      </body>
    </html>
  )
}
