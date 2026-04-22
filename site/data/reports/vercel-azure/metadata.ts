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
  date: "April 22, 2026",
  dateIso: "2026-04-22",
  version: "1.1.0",
  platforms,
  highlights: [
    "Hosted Agents refresh (Apr 22): $0.0994/vCPU-hr + $0.0118/GiB-hr",
    "Foundry Toolbox + Memory (MAF + LangGraph native)",
    "Agent Framework 1.0 GA · AI Red Teaming Agent GA",
  ],
  contributors,
};
