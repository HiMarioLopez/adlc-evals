import type { ReportSection } from "@/data/report-schema.ts";

export const sections: ReportSection[] = [
  { id: "foreword", label: "Foreword" },
  { id: "infrastructure", label: "Infrastructure" },
  { id: "pricing", label: "Pricing" },
  { id: "code", label: "Code" },
  { id: "deployment", label: "Deployment" },
  { id: "regions", label: "Regions" },
  { id: "adoption", label: "Adoption" },
  { id: "delta", label: "Updates" },
];
