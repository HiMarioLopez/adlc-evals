/**
 * Vercel vs Azure Report Configuration
 *
 * Monitors Azure AI Agent Service, Semantic Kernel, and Vercel AI SDK
 * for updates relevant to the Vercel vs Azure comparison report.
 */

import {
  mergeKeywords,
  sharedVercelFeeds,
  sharedVercelExtendedFeeds,
} from '../keywords/index.js';
import type { ReportConfig, ReportConfigInput } from './types.js';

/**
 * Azure-specific feeds
 */
const azureCoreFeeds = [
  {
    url: 'https://azure.microsoft.com/en-us/blog/feed/',
    name: 'Azure Blog',
    category: 'azure' as const,
  },
  {
    url: 'https://github.com/microsoft/semantic-kernel/releases.atom',
    name: 'Semantic Kernel Releases',
    category: 'github-release' as const,
  },
];

const azureExtendedFeeds = [
  {
    url: 'https://devblogs.microsoft.com/azure-sdk/feed/',
    name: 'Azure SDK Blog',
    category: 'azure' as const,
  },
];

/**
 * Azure-specific keywords
 */
const azureExactKeywords = [
  // Azure AI Agent Service
  'azure ai agent',
  'azure ai agent service',
  'ai agent service',

  // Semantic Kernel
  'semantic kernel',
  'sk agent',
  'sk planner',

  // Azure OpenAI
  'azure openai',
  'azure openai service',

  // Azure Functions
  'azure functions',
  'durable functions',

  // Azure AI services
  'azure ai',
  'azure cognitive',
  'azure ai studio',
  'ai foundry',

  // Azure container apps
  'container apps',
  'azure container apps',
];

const azureContextualKeywords = [
  'cosmos db',
  'azure storage',
  'service bus',
  'event grid',
  'app service',
  'logic apps',
];

const azurePhraseKeywords = [
  'microsoft azure',
  'azure ai foundry',
  'prompt flow',
  'responsible ai',
  'content safety',
];

/**
 * Report configuration input (before merging shared keywords)
 */
const configInput: ReportConfigInput = {
  id: 'vercel-azure',
  name: 'Vercel vs Azure',
  description:
    'Evaluating Vercel + AI SDK versus Azure AI Agent Service and Semantic Kernel for building scalable AI agent solutions.',
  feeds: {
    core: [...sharedVercelFeeds, ...azureCoreFeeds],
    extended: [...sharedVercelExtendedFeeds, ...azureExtendedFeeds],
  },
  keywords: {
    exact: azureExactKeywords,
    phrase: azurePhraseKeywords,
    contextual: azureContextualKeywords,
  },
  labels: {
    base: ['rss-monitor', 'vercel-azure'],
    categoryMap: {
      azure: 'azure',
      vercel: 'vercel',
      'github-release': 'release',
      'model-provider': 'ai-models',
    },
  },
  issuePrefix: {
    categoryMap: {
      azure: '🔷 [Azure]',
      vercel: '▲ [Vercel]',
      'github-release': '📦 [Release]',
      'model-provider': '🤖 [Model]',
    },
    default: '📰 [Update]',
  },
  defaultThreshold: 3,
};

/**
 * Complete Vercel vs Azure report configuration
 */
export const vercelAzureConfig: ReportConfig = {
  ...configInput,
  keywords: mergeKeywords(configInput.keywords),
  defaultThreshold: configInput.defaultThreshold ?? 3,
};
