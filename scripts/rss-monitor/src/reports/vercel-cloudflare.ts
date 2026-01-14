/**
 * Vercel vs Cloudflare Report Configuration
 *
 * Monitors Cloudflare Workers AI, Agents SDK, and Vercel AI SDK
 * for updates relevant to the Vercel vs Cloudflare comparison report.
 */

import {
  mergeKeywords,
  sharedVercelFeeds,
  sharedVercelExtendedFeeds,
} from '../keywords/index.js';
import type { ReportConfig, ReportConfigInput } from './types.js';

/**
 * Cloudflare-specific feeds
 */
const cloudflareCoreFeeds = [
  {
    url: 'https://blog.cloudflare.com/rss/',
    name: 'Cloudflare Blog',
    category: 'cloudflare' as const,
  },
  {
    url: 'https://github.com/cloudflare/agents/releases.atom',
    name: 'Cloudflare Agents SDK Releases',
    category: 'github-release' as const,
  },
];

const cloudflareExtendedFeeds: typeof cloudflareCoreFeeds = [
  // Could add more Cloudflare-specific feeds here
];

/**
 * Cloudflare-specific keywords
 */
const cloudflareExactKeywords = [
  // Workers AI
  'workers ai',
  'cloudflare workers ai',

  // Agents SDK
  'cloudflare agents',
  'agents sdk',
  '@cloudflare/agents',

  // Workers platform
  'cloudflare workers',
  'workers',
  'durable objects',

  // AI Gateway
  'cloudflare ai gateway',

  // Vectorize
  'vectorize',
  'cloudflare vectorize',

  // D1 / KV
  'd1 database',
  'workers kv',

  // R2
  'r2 storage',
  'cloudflare r2',
];

const cloudflareContextualKeywords = [
  'pages',
  'wrangler',
  'miniflare',
  'workerd',
  'hono',
];

const cloudflarePhraseKeywords = [
  'edge first',
  'edge native',
  'global network',
  'birthday week',
  'developer week',
  'workers runtime',
];

/**
 * Report configuration input (before merging shared keywords)
 */
const configInput: ReportConfigInput = {
  id: 'vercel-cloudflare',
  name: 'Vercel vs Cloudflare',
  description:
    'Comparing Vercel + AI SDK against Cloudflare Workers AI and the Agents SDK for edge-native AI agent deployment.',
  feeds: {
    core: [...sharedVercelFeeds, ...cloudflareCoreFeeds],
    extended: [...sharedVercelExtendedFeeds, ...cloudflareExtendedFeeds],
  },
  keywords: {
    exact: cloudflareExactKeywords,
    phrase: cloudflarePhraseKeywords,
    contextual: cloudflareContextualKeywords,
  },
  labels: {
    base: ['rss-monitor', 'vercel-cloudflare'],
    categoryMap: {
      cloudflare: 'cloudflare',
      vercel: 'vercel',
      'github-release': 'release',
      'model-provider': 'ai-models',
    },
  },
  issuePrefix: {
    categoryMap: {
      cloudflare: '🟠 [Cloudflare]',
      vercel: '▲ [Vercel]',
      'github-release': '📦 [Release]',
      'model-provider': '🤖 [Model]',
    },
    default: '📰 [Update]',
  },
  defaultThreshold: 3,
};

/**
 * Complete Vercel vs Cloudflare report configuration
 */
export const vercelCloudflareConfig: ReportConfig = {
  ...configInput,
  keywords: mergeKeywords(configInput.keywords),
  defaultThreshold: configInput.defaultThreshold ?? 3,
};
