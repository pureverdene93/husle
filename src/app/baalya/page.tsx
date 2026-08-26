import { PageShell } from "@/components/common/page-shell"
import { Cake } from "@/components/features/cake/cake"
import { CAKE } from "@/lib/data"

export default function CakePage() {
  return (
    <PageShell className="gap-8">
      <header className="space-y-2 text-center">
        <h1 className="font-heading text-3xl font-semibold">{CAKE.title}</h1>
        <p className="text-sm text-muted-foreground">{CAKE.hint}</p>
      </header>

      <Cake />
    </PageShell>
  )
}
