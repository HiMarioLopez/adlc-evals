import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { AdoptionSection } from "@/components/report/adoption-section.tsx";
import { CostCalculator } from "@/components/report/cost-calculator.tsx";
import { DataFreshnessBanner } from "@/components/report/data-freshness-banner.tsx";
import { DeltaSection } from "@/components/report/delta-section.tsx";
import { DeploymentSection } from "@/components/report/deployment-section.tsx";
import { Footer } from "@/components/report/footer.tsx";
import { ForewordSection } from "@/components/report/foreword-section.tsx";
import { Hero } from "@/components/report/hero.tsx";
import { InfrastructureSection } from "@/components/report/infrastructure-section.tsx";
import { Navigation } from "@/components/report/navigation.tsx";
import { PricingSection } from "@/components/report/pricing-section.tsx";
import { SidebarToc } from "@/components/report/sidebar-toc.tsx";
import type { SecondaryPlatformTheme } from "@/data/report-schema.ts";
import { vercelAwsReport } from "@/data/reports/vercel-aws/index.ts";

const awsSecondaryTheme: SecondaryPlatformTheme = {
  accent: "aws",
  label: "AWS",
  letter: "A",
  stackName: "AWS Bedrock AgentCore + Strands SDK",
  stackLabel: "AWS Stack",
  docsLabel: "AWS Documentation",
  pricingNoteLabel: "AWS Bedrock Pricing Note",
  pricingTiersLabel: "Amazon Bedrock Pricing Tiers",
  regionalMatrixLabel: "AWS Bedrock AgentCore Regional Matrix",
};

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
    import("@/components/report/code-section.tsx").then((m) => ({
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
    import("@/components/report/regional-section.tsx").then((m) => ({
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
      <DataFreshnessBanner
        capturedDate={report.metadata.date}
        capturedDateIso={report.metadata.dateIso}
        secondaryTheme={awsSecondaryTheme}
      />
      <Navigation
        secondaryTheme={awsSecondaryTheme}
        sections={report.sections}
      />
      <SidebarToc sections={report.sections} />
      {/* Spacer for fixed nav (h-14 = 56px) + banner (~40px) */}
      <div aria-hidden="true" className="h-[6rem]" />

      <div>
        <Hero
          data={report.hero}
          platforms={report.metadata.platforms}
          secondaryTheme={awsSecondaryTheme}
        />
        <ForewordSection secondaryTheme={awsSecondaryTheme} />
        <InfrastructureSection
          data={report.infrastructure}
          secondaryTheme={awsSecondaryTheme}
        />
        <PricingSection
          data={report.pricing}
          secondaryTheme={awsSecondaryTheme}
        />
        <CostCalculator />
        <CodeSection data={report.code} secondaryTheme={awsSecondaryTheme} />
        <DeploymentSection
          data={report.deployment}
          secondaryTheme={awsSecondaryTheme}
        />
        <RegionalSection data={report.regions} />
        <AdoptionSection
          data={report.adoption}
          secondaryTheme={awsSecondaryTheme}
        />
        <DeltaSection data={report.delta} />
        <Footer data={report.footer} secondaryTheme={awsSecondaryTheme} />
      </div>
    </main>
  );
}
