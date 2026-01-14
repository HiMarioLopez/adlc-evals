/**
 * Vercel vs Modal Report Configuration
 *
 * Monitors Modal's Python-first serverless platform and Vercel AI SDK
 * for updates relevant to the Vercel vs Modal comparison report.
 */

import {
  mergeKeywords,
  sharedVercelFeeds,
  sharedVercelExtendedFeeds,
} from '../keywords/index.js';
import type { ReportConfig, ReportConfigInput } from './types.js';

/**
 * Modal-specific feeds
 */
const modalCoreFeeds = [
  // Modal doesn't have a traditional blog RSS - may need to check their changelog
  // {
  //   url: 'https://modal.com/blog/rss',
  //   name: 'Modal Blog',
  //   category: 'modal' as const,
  // },
  {
    url: 'https://github.com/modal-labs/modal-client/releases.atom',
    name: 'Modal Client Releases',
    category: 'github-release' as const,
  },
];

const modalExtendedFeeds: typeof modalCoreFeeds = [
  // Could add more Modal-specific feeds here
];

/**
 * Modal-specific keywords
 */
const modalExactKeywords = [
  // Modal platform
  'modal labs',
  'modal.com',
  '@modal',
  'modal stub',
  'modal function',
  'modal app',

  // GPU / compute
  'gpu serverless',
  'a100',
  'h100',
  'a10g',
  't4 gpu',
  'gpu container',

  // Modal features
  'modal volume',
  'modal secret',
  'modal image',
  'modal sandbox',
  'modal cls',
];

const modalContextualKeywords = [
  'python serverless',
  'gpu compute',
  'container',
  'cuda',
  'pytorch',
  'tensorflow',
  'jax',
  'huggingface',
];

const modalPhraseKeywords = [
  'gpu acceleration',
  'serverless gpu',
  'python first',
  'custom container',
  'cold start',
  'warm pool',
];

/**
 * Report configuration input (before merging shared keywords)
 */
const configInput: ReportConfigInput = {
  id: 'vercel-modal',
  name: 'Vercel vs Modal',
  description:
    "Evaluating Vercel + AI SDK versus Modal's Python-first serverless platform for GPU-accelerated AI agent workloads.",
  feeds: {
    core: [...sharedVercelFeeds, ...modalCoreFeeds],
    extended: [...sharedVercelExtendedFeeds, ...modalExtendedFeeds],
  },
  keywords: {
    exact: modalExactKeywords,
    phrase: modalPhraseKeywords,
    contextual: modalContextualKeywords,
  },
  labels: {
    base: ['rss-monitor', 'vercel-modal'],
    categoryMap: {
      modal: 'modal',
      vercel: 'vercel',
      'github-release': 'release',
      'model-provider': 'ai-models',
    },
  },
  issuePrefix: {
    categoryMap: {
      modal: '🟢 [Modal]',
      vercel: '▲ [Vercel]',
      'github-release': '📦 [Release]',
      'model-provider': '🤖 [Model]',
    },
    default: '📰 [Update]',
  },
  defaultThreshold: 3,
};

/**
 * Complete Vercel vs Modal report configuration
 */
export const vercelModalConfig: ReportConfig = {
  ...configInput,
  keywords: mergeKeywords(configInput.keywords),
  defaultThreshold: configInput.defaultThreshold ?? 3,
};
