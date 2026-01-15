/**
 * Vercel vs Databricks Report Configuration
 *
 * Monitors Databricks Mosaic AI Agent Framework, Unity Catalog, MLflow,
 * and Vercel AI SDK for updates relevant to the Vercel vs Databricks comparison report.
 */

import {
  mergeKeywords,
  sharedVercelFeeds,
  sharedVercelExtendedFeeds,
} from '../keywords/index.js';
import type { ReportConfig, ReportConfigInput } from './types.js';

/**
 * Databricks-specific feeds
 */
const databricksCoreFeeds = [
  {
    url: 'https://www.databricks.com/blog/feed',
    name: 'Databricks Blog',
    category: 'databricks' as const,
  },
  {
    url: 'https://github.com/mlflow/mlflow/releases.atom',
    name: 'MLflow Releases',
    category: 'github-release' as const,
  },
];

const databricksExtendedFeeds = [
  {
    url: 'https://www.databricks.com/blog/category/engineering/feed',
    name: 'Databricks Engineering Blog',
    category: 'databricks' as const,
  },
];

/**
 * Databricks-specific keywords
 */
const databricksExactKeywords = [
  // Mosaic AI
  'mosaic ai',
  'mosaic ai agent',
  'mosaic ai agent framework',
  'agent framework',

  // Unity Catalog
  'unity catalog',
  'uc',
  'abac',
  'attribute-based access control',

  // MLflow
  'mlflow',
  'mlflow tracing',
  'mlflow agents',

  // MCP
  'mcp catalog',

  // Databricks models
  'dbrx',
  'databricks models',

  // Databricks SQL
  'databricks sql',
  'delta lake',
  'delta sharing',
];

const databricksContextualKeywords = [
  'lakehouse',
  'spark',
  'notebooks',
  'workspace',
  'clusters',
  'jobs',
  'workflows',
  'serving',
  'endpoints',
];

const databricksPhraseKeywords = [
  'databricks platform',
  'databricks ai',
  'model serving',
  'feature store',
  'vector search',
];

/**
 * Report configuration input (before merging shared keywords)
 */
const configInput: ReportConfigInput = {
  id: 'vercel-databricks',
  name: 'Vercel vs Databricks',
  description:
    'Evaluating Vercel AI SDK versus Databricks Mosaic AI Agent Framework for data-plane agents with Unity Catalog governance.',
  feeds: {
    core: [...sharedVercelFeeds, ...databricksCoreFeeds],
    extended: [...sharedVercelExtendedFeeds, ...databricksExtendedFeeds],
  },
  keywords: {
    exact: databricksExactKeywords,
    phrase: databricksPhraseKeywords,
    contextual: databricksContextualKeywords,
  },
  labels: {
    base: ['rss-monitor', 'vercel-databricks'],
    categoryMap: {
      databricks: 'databricks',
      vercel: 'vercel',
      'github-release': 'release',
      'model-provider': 'ai-models',
    },
  },
  issuePrefix: {
    categoryMap: {
      databricks: '🧱 [Databricks]',
      vercel: '▲ [Vercel]',
      'github-release': '📦 [Release]',
      'model-provider': '🤖 [Model]',
    },
    default: '📰 [Update]',
  },
  defaultThreshold: 3,
};

/**
 * Complete Vercel vs Databricks report configuration
 */
export const vercelDatabricksConfig: ReportConfig = {
  ...configInput,
  keywords: mergeKeywords(configInput.keywords),
  defaultThreshold: configInput.defaultThreshold ?? 3,
};
