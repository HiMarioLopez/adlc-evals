import { DataFreshnessBanner } from "@/components/report/data-freshness-banner"
import { Navigation } from "@/components/report/navigation"
import { Hero } from "@/components/report/hero"
import { ForewordSection } from "@/components/report/foreword-section"
import { InfrastructureSection } from "@/components/report/infrastructure-section"
import { PricingSection } from "@/components/report/pricing-section"
import { CostCalculator } from "@/components/report/cost-calculator"
import { CodeSection } from "@/components/report/code-section"
import { DeploymentSection } from "@/components/report/deployment-section"
import { RegionalSection } from "@/components/report/regional-section"
import { AdoptionSection } from "@/components/report/adoption-section"
import { DeltaSection } from "@/components/report/delta-section"
import { Footer } from "@/components/report/footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <DataFreshnessBanner />
      <Navigation />
      <Hero />
      <ForewordSection />
      <InfrastructureSection />
      <PricingSection />
      <CostCalculator />
      <CodeSection />
      <DeploymentSection />
      <RegionalSection />
      <AdoptionSection />
      <DeltaSection />
      <Footer />
    </main>
  )
}
