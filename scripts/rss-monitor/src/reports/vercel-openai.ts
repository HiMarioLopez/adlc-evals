/**
 * Vercel vs OpenAI Report Configuration
 *
 * Monitors OpenAI's Responses API, Agents SDK, and Vercel AI SDK
 * for updates relevant to the Vercel vs OpenAI comparison report.
 */

import {
  mergeKeywords,
  sharedVercelFeeds,
  sharedVercelExtendedFeeds,
} from '../keywords/index.js';
import type { ReportConfig, ReportConfigInput } from './types.js';

/**
 * OpenAI-specific feeds
 */
const openaiCoreFeeds = [
  {
    url: 'https://openai.com/blog/rss/',
    name: 'OpenAI Blog',
    category: 'openai' as const,
  },
  {
    url: 'https://github.com/openai/openai-python/releases.atom',
    name: 'OpenAI Python SDK',
    category: 'github-release' as const,
  },
  {
    url: 'https://github.com/openai/openai-agents-python/releases.atom',
    name: 'OpenAI Agents SDK',
    category: 'github-release' as const,
  },
];

const openaiExtendedFeeds = [
  {
    url: 'https://github.com/openai/openai-node/releases.atom',
    name: 'OpenAI Node SDK',
    category: 'github-release' as const,
  },
];

/**
 * OpenAI-specific keywords
 */
const openaiExactKeywords = [
  // Responses API
  'responses api',
  'response api',

  // Agents SDK
  'agents sdk',
  'openai agents',
  'openai-agents-python',

  // Built-in tools
  'code interpreter',
  'file search',
  'web search',

  // Assistants API (deprecated)
  'assistants api',
  'assistant api',

  // MCP Support
  'mcp support',
  'model context protocol',

  // Models
  'gpt-4',
  'gpt-4o',
  'gpt-4-turbo',
  'o1',
  'o1-mini',
  'o1-preview',
  'o3',
  'o3-mini',
];

const openaiContextualKeywords = [
  'function calling',
  'tool use',
  'streaming',
  'structured outputs',
  'json mode',
  'vision',
  'audio',
  'realtime',
];

const openaiPhraseKeywords = [
  'openai platform',
  'openai api',
  'openai sdk',
  'chat completions',
  'tool calls',
];

/**
 * Report configuration input (before merging shared keywords)
 */
const configInput: ReportConfigInput = {
  id: 'vercel-openai',
  name: 'Vercel vs OpenAI',
  description:
    "Comparing Vercel AI SDK with OpenAI's Responses API and Agents SDK for building agentic applications.",
  feeds: {
    core: [...sharedVercelFeeds, ...openaiCoreFeeds],
    extended: [...sharedVercelExtendedFeeds, ...openaiExtendedFeeds],
  },
  keywords: {
    exact: openaiExactKeywords,
    phrase: openaiPhraseKeywords,
    contextual: openaiContextualKeywords,
  },
  labels: {
    base: ['rss-monitor', 'vercel-openai'],
    categoryMap: {
      openai: 'openai',
      vercel: 'vercel',
      'github-release': 'release',
      'model-provider': 'ai-models',
    },
  },
  issuePrefix: {
    categoryMap: {
      openai: '🟢 [OpenAI]',
      vercel: '▲ [Vercel]',
      'github-release': '📦 [Release]',
      'model-provider': '🤖 [Model]',
    },
    default: '📰 [Update]',
  },
  defaultThreshold: 3,
};

/**
 * Complete Vercel vs OpenAI report configuration
 */
export const vercelOpenaiConfig: ReportConfig = {
  ...configInput,
  keywords: mergeKeywords(configInput.keywords),
  defaultThreshold: configInput.defaultThreshold ?? 3,
};
