import { Hero } from "@/components/report/hero"
import { Navigation } from "@/components/report/navigation"
import { TechDelta } from "@/components/report/tech-delta"
import { ComparisonTable } from "@/components/report/comparison-table"
import { ToolExecution } from "@/components/report/tool-execution"
import { PricingSection } from "@/components/report/pricing-section"
import { CostCalculator } from "@/components/report/cost-calculator"
import { RegionMatrix } from "@/components/report/region-matrix"
import { AdoptionMetrics } from "@/components/report/adoption-metrics"
import { Footer } from "@/components/report/footer"

export default function Page() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <TechDelta />
      <ComparisonTable />
      <ToolExecution />
      <PricingSection />
      <CostCalculator />
      <RegionMatrix />
      <AdoptionMetrics />
      <Footer />
    </main>
  )
}
