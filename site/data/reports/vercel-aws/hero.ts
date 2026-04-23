import type { HeroData } from "@/data/report-schema.ts";

export const heroData: HeroData = {
  lastUpdated: "April 22, 2026",
  title: {
    primary: "Vercel",
    secondary: "AWS",
  },
  subtitle: "Agent Stack Technical Evaluation",
  description:
    "A comprehensive comparison of Vercel + AI SDK versus AWS Bedrock AgentCore + Strands SDK for building production-ready AI agents.",
  keyFindings: [
    {
      label: "Infra",
      values: {
        primary: { value: "<5%", label: "of TCO" },
      },
    },
    {
      label: "Time-to-first-agent",
      values: {
        primary: { value: "3 min" },
        secondary: { value: "60+ min" },
      },
    },
  ],
  keyFindingsInline: {
    label: "Key Findings",
    items: [
      { label: "Infra", primary: "≈3%", secondary: "of TCO" },
      {
        label: "Time-to-first-agent",
        primary: "3 min",
        secondary: "60+ min",
        highlightSecondary: true,
      },
    ],
  },
};
