/**
 * Shared Type Definitions
 *
 * Common types used across the RSS monitor.
 */

/**
 * Feed category type - extensible for new report types
 */
export type FeedCategory =
  | 'aws'
  | 'vercel'
  | 'gcp'
  | 'azure'
  | 'cloudflare'
  | 'modal'
  | 'github-release'
  | 'model-provider';

/**
 * RSS/Atom feed configuration
 */
export interface FeedConfig {
  url: string;
  name: string;
  category: FeedCategory;
}

/**
 * Parsed feed item from RSS/Atom
 */
export interface FeedItem {
  title: string;
  link: string;
  pubDate: Date;
  description: string;
  feedName: string;
  feedCategory: FeedCategory;
}

/**
 * Result of keyword matching analysis
 */
export interface KeywordMatchResult {
  score: number;
  matchedKeywords: string[];
  categories: string[];
}

/**
 * Feed item that passed relevance filtering
 */
export interface RelevantItem extends FeedItem {
  matchResult: KeywordMatchResult;
}

/**
 * Result of creating a GitHub issue
 */
export interface CreateIssueResult {
  item: RelevantItem;
  success: boolean;
  issueUrl?: string;
  skipped?: boolean;
  error?: string;
}

/**
 * Keyword configuration for a report
 */
export interface KeywordConfig {
  /** High priority exact match keywords (3 points each) */
  exact: string[];
  /** Multi-word phrase keywords (2 points each) */
  phrase: string[];
  /** SDK function keywords (2 points each) */
  sdkFunctions: string[];
  /** Model name keywords (2 points each) */
  models: string[];
  /** Framework name keywords (1 point each) */
  frameworks: string[];
  /** Pricing-related keywords (1 point each) */
  pricing: string[];
  /** Contextual keywords - only count with AI context (1 point each) */
  contextual: string[];
  /** Broad keywords - need 2+ matches or combination (1 point each) */
  broad: string[];
  /** AI context indicators for validating contextual keywords */
  aiContextIndicators: string[];
  /** Keywords that should cause an item to be excluded */
  exclude: string[];
}
