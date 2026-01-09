import dynamic from "next/dynamic"
import { DataFreshnessBanner } from "@/components/report/data-freshness-banner"
import { Navigation } from "@/components/report/navigation"
import { Hero } from "@/components/report/hero"
import { ForewordSection } from "@/components/report/foreword-section"
import { InfrastructureSection } from "@/components/report/infrastructure-section"
import { PricingSection } from "@/components/report/pricing-section"
import { CostCalculator } from "@/components/report/cost-calculator"
import { DeploymentSection } from "@/components/report/deployment-section"
import { AdoptionSection } from "@/components/report/adoption-section"
import { DeltaSection } from "@/components/report/delta-section"
import { Footer } from "@/components/report/footer"

// Loading skeleton for heavy sections
function SectionSkeleton({ height = "600px" }: { height?: string }) {
  return (
    <div 
      className="w-full bg-muted/30 animate-pulse rounded-lg"
      style={{ height }}
      aria-hidden="true"
    />
  )
}

// Dynamic imports for heavy components - defer loading until needed
// Note: ssr: false must be used in Client Components, but these components
// already have "use client" so they handle client-only rendering internally
const CodeSection = dynamic(
  () => import("@/components/report/code-section").then(m => ({ default: m.CodeSection })),
  { 
    loading: () => (
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionSkeleton height="600px" />
        </div>
      </section>
    ),
  }
)

const RegionalSection = dynamic(
  () => import("@/components/report/regional-section").then(m => ({ default: m.RegionalSection })),
  { 
    loading: () => (
      <section className="py-24 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <SectionSkeleton height="800px" />
        </div>
      </section>
    ),
  }
)

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <DataFreshnessBanner />
      <Navigation />
      {/* Spacer for fixed nav (h-16 = 64px) + banner (~44px) */}
      <div className="h-28" aria-hidden="true" />
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
