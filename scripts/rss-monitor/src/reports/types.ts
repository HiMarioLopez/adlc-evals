/**
 * Report Configuration Types
 *
 * Defines the structure for report-specific configurations.
 */

import type { FeedCategory, FeedConfig, KeywordConfig } from '../types.js';

/**
 * Configuration for a specific report type
 */
export interface ReportConfig {
  /** Unique identifier for the report (e.g., "vercel-aws") */
  id: string;

  /** Human-readable name (e.g., "Vercel vs AWS") */
  name: string;

  /** Description of what this report compares */
  description: string;

  /** Feed configuration */
  feeds: {
    /** Core feeds - always checked */
    core: FeedConfig[];
    /** Extended feeds - optional, enabled via EXTENDED_FEEDS */
    extended: FeedConfig[];
  };

  /** Merged keyword configuration (shared + report-specific) */
  keywords: KeywordConfig;

  /** GitHub issue labeling configuration */
  labels: {
    /** Base labels applied to all issues (e.g., ["rss-monitor", "vercel-aws"]) */
    base: string[];
    /** Map from feed category to issue label */
    categoryMap: Partial<Record<FeedCategory, string>>;
  };

  /** Issue title prefix configuration */
  issuePrefix: {
    /** Map from feed category to emoji + prefix (e.g., { aws: "🔶 [AWS]" }) */
    categoryMap: Partial<Record<FeedCategory, string>>;
    /** Default prefix for unknown categories */
    default: string;
  };

  /** Default relevance threshold for this report */
  defaultThreshold: number;
}

/**
 * Partial report config for defining report-specific values
 * before merging with shared keywords
 */
export interface ReportConfigInput {
  id: string;
  name: string;
  description: string;
  feeds: {
    core: FeedConfig[];
    extended: FeedConfig[];
  };
  /** Report-specific keywords (will be merged with shared) */
  keywords: Partial<KeywordConfig>;
  labels: {
    base: string[];
    categoryMap: Partial<Record<FeedCategory, string>>;
  };
  issuePrefix: {
    categoryMap: Partial<Record<FeedCategory, string>>;
    default: string;
  };
  defaultThreshold?: number;
}
