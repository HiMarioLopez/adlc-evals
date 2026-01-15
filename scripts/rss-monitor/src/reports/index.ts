/**
 * Report Registry
 *
 * Central registry for all report configurations.
 * Add new reports here as they are created.
 */

import type { ReportConfig } from './types.js';
import { vercelAwsConfig } from './vercel-aws.js';

// Import stub configs (will be implemented later)
import { vercelGcpConfig } from './vercel-gcp.js';
import { vercelAzureConfig } from './vercel-azure.js';
import { vercelCloudflareConfig } from './vercel-cloudflare.js';
import { vercelModalConfig } from './vercel-modal.js';
import { vercelOpenaiConfig } from './vercel-openai.js';
import { vercelDatabricksConfig } from './vercel-databricks.js';
import { vercelSnowflakeConfig } from './vercel-snowflake.js';

/**
 * All available report configurations
 */
export const reportConfigs: Record<string, ReportConfig> = {
  'vercel-aws': vercelAwsConfig,
  'vercel-gcp': vercelGcpConfig,
  'vercel-azure': vercelAzureConfig,
  'vercel-cloudflare': vercelCloudflareConfig,
  'vercel-modal': vercelModalConfig,
  'vercel-openai': vercelOpenaiConfig,
  'vercel-databricks': vercelDatabricksConfig,
  'vercel-snowflake': vercelSnowflakeConfig,
};

/**
 * Get a report configuration by ID
 * @param reportId The report identifier (e.g., "vercel-aws")
 * @returns The report configuration or undefined if not found
 */
export function getReportConfig(reportId: string): ReportConfig | undefined {
  return reportConfigs[reportId];
}

/**
 * Get all available report IDs
 */
export function getAvailableReportIds(): string[] {
  return Object.keys(reportConfigs);
}

/**
 * Get all report configurations
 */
export function getAllReportConfigs(): ReportConfig[] {
  return Object.values(reportConfigs);
}

/**
 * Check if a report ID is valid
 */
export function isValidReportId(reportId: string): boolean {
  return reportId in reportConfigs;
}

// Re-export types
export type { ReportConfig, ReportConfigInput } from './types.js';
