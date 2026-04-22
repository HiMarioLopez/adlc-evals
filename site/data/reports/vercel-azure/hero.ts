import type { HeroData } from "@/data/report-schema.ts";

export const heroData: HeroData = {
  lastUpdated: "April 21, 2026",
  title: {
    primary: "Vercel",
    secondary: "Azure",
  },
  subtitle: "Agent Stack Technical Evaluation",
  description:
    "A comprehensive comparison of Vercel + AI SDK versus Microsoft Foundry Agent Service + Microsoft Agent Framework 1.0 for building production-ready AI agents.",
  keyFindings: [
    {
      label: "Agent Service Regions",
      values: {
        primary: { value: "21", label: "Vercel Compute" },
        secondary: { value: "24", label: "Azure Agent Service" },
      },
    },
    {
      label: "Blessed Framework",
      values: {
        primary: { value: "AI SDK 6.x" },
        secondary: { value: "MAF 1.0" },
      },
    },
  ],
  keyFindingsInline: {
    label: "Key Findings",
    items: [
      { label: "Infra", primary: "≈5%", secondary: "of TCO" },
      {
        label: "Time-to-first-agent",
        primary: "3 min",
        secondary: "30-45 min",
        highlightSecondary: true,
      },
    ],
  },
};
