import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { AdoptionSection } from "@/components/report/adoption-section";
import { CostCalculator } from "@/components/report/cost-calculator";
import { DataFreshnessBanner } from "@/components/report/data-freshness-banner";
import { DeltaSection } from "@/components/report/delta-section";
import { DeploymentSection } from "@/components/report/deployment-section";
import { Footer } from "@/components/report/footer";
import { ForewordSection } from "@/components/report/foreword-section";
import { Hero } from "@/components/report/hero";
import { InfrastructureSection } from "@/components/report/infrastructure-section";
import { Navigation } from "@/components/report/navigation";
import { PricingSection } from "@/components/report/pricing-section";
import { vercelAwsReport } from "@/data/reports/vercel-aws";

export const metadata: Metadata = {
  title: "Vercel vs AWS Agent Stack Comparison | 2026 Report",
  description:
    "Comprehensive technical evaluation of Vercel AI SDK and AWS Bedrock AgentCore for building production-ready AI agents. Infrastructure, pricing, and architecture analysis.",
  openGraph: {
    title: "Vercel vs AWS Agent Stack Comparison | 2026 Report",
    description:
      "Comprehensive technical evaluation of Vercel AI SDK and Bedrock AgentCore",
    type: "article",
  },
};

// Loading skeleton for heavy sections
function SectionSkeleton({ height = "600px" }: { height?: string }) {
  return (
    <div
      aria-hidden="true"
      className="w-full animate-pulse rounded-lg bg-muted/30"
      style={{ height }}
    />
  );
}

// Dynamic imports for heavy components - defer loading until needed
const CodeSection = dynamic(
  () =>
    import("@/components/report/code-section").then((m) => ({
      default: m.CodeSection,
    })),
  {
    loading: () => (
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionSkeleton height="600px" />
        </div>
      </section>
    ),
  }
);

const RegionalSection = dynamic(
  () =>
    import("@/components/report/regional-section").then((m) => ({
      default: m.RegionalSection,
    })),
  {
    loading: () => (
      <section className="bg-muted/30 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionSkeleton height="800px" />
        </div>
      </section>
    ),
  }
);

export default function VercelAwsReportPage() {
  const report = vercelAwsReport;

  return (
    <main className="min-h-screen bg-background">
      <DataFreshnessBanner />
      <Navigation sections={report.sections} />
      {/* Spacer for fixed nav (h-16 = 64px) + banner (~44px) */}
      <div aria-hidden="true" className="h-28" />
      <Hero data={report.hero} platforms={report.metadata.platforms} />
      <ForewordSection />
      <InfrastructureSection data={report.infrastructure} />
      <PricingSection data={report.pricing} />
      <CostCalculator />
      <CodeSection data={report.code} />
      <DeploymentSection data={report.deployment} />
      <RegionalSection data={report.regions} />
      <AdoptionSection data={report.adoption} />
      <DeltaSection data={report.delta} />
      <Footer data={report.footer} />
    </main>
  );
}
