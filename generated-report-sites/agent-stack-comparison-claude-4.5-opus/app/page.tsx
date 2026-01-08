import { Nav } from "@/components/report/nav"
import { Hero } from "@/components/report/hero"
import { DeltaSection } from "@/components/report/delta-section"
import { InfrastructureSection } from "@/components/report/infrastructure-section"
import { RuntimeSection } from "@/components/report/runtime-section"
import { SecuritySection } from "@/components/report/security-section"
import { PricingSection } from "@/components/report/pricing-section"
import { CodeSection } from "@/components/report/code-section"
import { ObservabilitySection } from "@/components/report/observability-section"
import { RegionalSection } from "@/components/report/regional-section"
import { AdoptionSection } from "@/components/report/adoption-section"
import { Footer } from "@/components/report/footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <Hero />
      <DeltaSection />
      <InfrastructureSection />
      <RuntimeSection />
      <SecuritySection />
      <PricingSection />
      <CodeSection />
      <ObservabilitySection />
      <RegionalSection />
      <AdoptionSection />
      <Footer />
    </main>
  )
}
