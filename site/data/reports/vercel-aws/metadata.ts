import type {
  Contributor,
  Platform,
  ReportMetadata,
} from "@/data/report-schema.ts";

export const platforms: Platform[] = [
  {
    id: "vercel",
    name: "Vercel",
    shortName: "Vercel",
    color: "bg-foreground",
    textColor: "text-background",
    icon: "vercel",
  },
  {
    id: "aws",
    name: "AWS",
    shortName: "AWS",
    color: "bg-aws",
    textColor: "text-white",
    icon: "aws",
  },
];

export const contributors: Contributor[] = [
  { name: "Mario Lopez Martinez", github: "HiMarioLopez" },
];

export const metadata: ReportMetadata = {
  id: "vercel-aws",
  title: "Vercel vs AWS",
  subtitle: "Agent Stack Technical Evaluation",
  description:
    "Comprehensive comparison of Vercel + AI SDK versus AWS Bedrock AgentCore + Strands SDK for building production-ready AI agents.",
  href: "/reports/vercel-aws",
  date: "April 21, 2026",
  version: "2.0.0",
  platforms,
  highlights: [
    "Sandbox + Workflow now GA",
    "AgentCore Runtime: 14 regions",
    "Claude Opus 4.7 · Sonnet 4.6",
  ],
  contributors,
};
