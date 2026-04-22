import type { AnyReport, ReportMetadata } from "@/data/report-schema.ts";
import { vercelAwsReport } from "./vercel-aws/index.ts";
import { vercelAzureReport } from "./vercel-azure/index.ts";

export const reports = {
  "vercel-aws": vercelAwsReport,
  "vercel-azure": vercelAzureReport,
} as const;

export type ReportId = keyof typeof reports;

export function getReport(id: ReportId): AnyReport {
  return reports[id];
}

export function getReportMetadata(id: ReportId): ReportMetadata {
  return reports[id].metadata;
}

export function getAllReportMetadata(): ReportMetadata[] {
  return Object.values(reports).map((report) => report.metadata);
}

export function getReportIds(): ReportId[] {
  return Object.keys(reports) as ReportId[];
}
