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
    id: "azure",
    name: "Microsoft Azure",
    shortName: "Azure",
    color: "bg-[#0078D4]",
    textColor: "text-white",
    icon: "azure",
  },
];

export const contributors: Contributor[] = [
  { name: "Mario Lopez Martinez", github: "HiMarioLopez" },
];

export const metadata: ReportMetadata = {
  id: "vercel-azure",
  title: "Vercel vs Azure",
  subtitle: "Agent Stack Technical Evaluation",
  description:
    "Comprehensive comparison of Vercel + AI SDK versus Microsoft Foundry Agent Service + Microsoft Agent Framework 1.0 for building production-ready AI agents.",
  href: "/reports/vercel-azure",
  date: "April 21, 2026",
  dateIso: "2026-04-21",
  version: "1.0.0",
  platforms,
  highlights: [
    "Agent Framework 1.0 GA (Apr 3, 2026)",
    "Foundry Agent Service: 24 regions",
    "Supersedes Semantic Kernel + AutoGen",
  ],
  contributors,
};
