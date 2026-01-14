/**
 * Vercel vs GCP Report Configuration
 *
 * Monitors Google Cloud Vertex AI, Agent Builder, Agent Development Kit,
 * and Vercel AI SDK for updates relevant to the Vercel vs GCP comparison report.
 */

import {
  mergeKeywords,
  sharedVercelFeeds,
  sharedVercelExtendedFeeds,
} from '../keywords/index.js';
import type { ReportConfig, ReportConfigInput } from './types.js';

/**
 * GCP-specific feeds
 */
const gcpCoreFeeds = [
  {
    url: 'https://cloud.google.com/blog/products/ai-machine-learning/rss',
    name: 'GCP AI/ML Blog',
    category: 'gcp' as const,
  },
  // ADK doesn't have a releases feed yet - placeholder
  // {
  //   url: 'https://github.com/google/adk-python/releases.atom',
  //   name: 'ADK Releases',
  //   category: 'github-release' as const,
  // },
];

const gcpExtendedFeeds = [
  {
    url: 'https://cloud.google.com/blog/rss',
    name: 'Google Cloud Blog',
    category: 'gcp' as const,
  },
];

/**
 * GCP-specific keywords
 */
const gcpExactKeywords = [
  // Vertex AI
  'vertex ai',
  'vertex ai agent',
  'vertex ai agent builder',
  'agent builder',

  // Agent Development Kit
  'agent development kit',
  'adk',
  'google adk',

  // Cloud Run / Functions
  'cloud run',
  'cloud functions',
  'cloud run functions',

  // Gemini models
  'gemini pro',
  'gemini ultra',
  'gemini nano',
  'gemini flash',

  // Other GCP AI services
  'palm',
  'palm 2',
  'duet ai',
  'google ai studio',
  'ai studio',
  'generative ai studio',
];

const gcpContextualKeywords = [
  'bigquery',
  'cloud storage',
  'pubsub',
  'dataflow',
  'kubernetes',
  'gke',
  'anthos',
];

const gcpPhraseKeywords = [
  'google cloud',
  'vertex agent',
  'vertex endpoint',
  'model garden',
  'grounding api',
];

/**
 * Report configuration input (before merging shared keywords)
 */
const configInput: ReportConfigInput = {
  id: 'vercel-gcp',
  name: 'Vercel vs GCP',
  description:
    'Comparing Vercel + AI SDK against Google Cloud Vertex AI Agent Builder and Agent Development Kit for enterprise AI agents.',
  feeds: {
    core: [...sharedVercelFeeds, ...gcpCoreFeeds],
    extended: [...sharedVercelExtendedFeeds, ...gcpExtendedFeeds],
  },
  keywords: {
    exact: gcpExactKeywords,
    phrase: gcpPhraseKeywords,
    contextual: gcpContextualKeywords,
  },
  labels: {
    base: ['rss-monitor', 'vercel-gcp'],
    categoryMap: {
      gcp: 'gcp',
      vercel: 'vercel',
      'github-release': 'release',
      'model-provider': 'ai-models',
    },
  },
  issuePrefix: {
    categoryMap: {
      gcp: '🔵 [GCP]',
      vercel: '▲ [Vercel]',
      'github-release': '📦 [Release]',
      'model-provider': '🤖 [Model]',
    },
    default: '📰 [Update]',
  },
  defaultThreshold: 3,
};

/**
 * Complete Vercel vs GCP report configuration
 */
export const vercelGcpConfig: ReportConfig = {
  ...configInput,
  keywords: mergeKeywords(configInput.keywords),
  defaultThreshold: configInput.defaultThreshold ?? 3,
};
