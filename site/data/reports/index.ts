import type { Report, ReportMetadata } from "@/data/report-schema";
import { vercelAwsReport } from "./vercel-aws";

// Report registry - all available reports
export const reports = {
  "vercel-aws": vercelAwsReport,
  // Future reports:
  // 'vercel-gcp': vercelGcpReport,
  // 'vercel-azure': vercelAzureReport,
  // 'vercel-cloudflare': vercelCloudflareReport,
  // 'vercel-modal': vercelModalReport,
} as const;

export type ReportId = keyof typeof reports;

// Helper functions
export function getReport(id: ReportId): Report {
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
