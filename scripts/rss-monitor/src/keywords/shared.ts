/**
 * Shared Keywords
 *
 * Common keywords that apply across all report types.
 * These are combined with report-specific keywords.
 */

import type { FeedConfig, KeywordConfig } from '../types.js';

/**
 * Shared Vercel feeds - included in all reports since we compare against Vercel
 */
export const sharedVercelFeeds: FeedConfig[] = [
  {
    url: 'https://vercel.com/atom',
    name: 'Vercel',
    category: 'vercel',
  },
  {
    url: 'https://github.com/vercel/ai/releases.atom',
    name: 'AI SDK Releases',
    category: 'github-release',
  },
];

/**
 * Extended Vercel feeds
 */
export const sharedVercelExtendedFeeds: FeedConfig[] = [
  {
    url: 'https://github.com/vercel/next.js/releases.atom',
    name: 'Next.js Releases',
    category: 'github-release',
  },
];

/**
 * Shared exact match keywords - high priority terms common to all reports
 */
export const sharedExactKeywords: string[] = [
  // Vercel AI SDK (common to all reports)
  'ai sdk',
  'vercel ai sdk',
  '@ai-sdk',
  'ai sdk 6',
  'ai sdk 7',
  'toolloopagent',
  'tool loop agent',

  // Vercel AI Gateway
  'ai gateway',
  'vercel ai gateway',
  'byok',
  'bring your own key',

  // Vercel Sandbox
  'vercel sandbox',
  '@vercel/sandbox',
  'sandbox sdk',

  // Vercel Workflow
  'workflow sdk',
  'vercel workflow',
  'use workflow',

  // Model providers (common interest)
  'claude',
  'anthropic',
  'claude opus',
  'claude sonnet',
  'claude haiku',

  // Protocols
  'mcp',
  'model context protocol',
  'mcp server',
  'mcp client',
];

/**
 * Shared phrase keywords
 */
export const sharedPhraseKeywords: string[] = [
  'extended thinking',
  'effort parameter',
  'computer use',
  'tool use',
  'function calling',
  'tool calling',
  'fluid compute',
  'edge functions',
  'serverless functions',
  'retrieval augmented generation',
  'vector database',
  'vector search',
  'knowledge base',
  'multi-agent',
  'agent orchestration',
  'agent memory',
  'context window',
  'model routing',
  'model fallback',
  'prompt caching',
  'token optimization',
];

/**
 * Shared SDK function keywords
 */
export const sharedSdkFunctionKeywords: string[] = [
  'generatetext',
  'streamtext',
  'generateobject',
  'streamobject',
  'generateimage',
  'embed',
  'embedmany',
];

/**
 * Shared model name keywords
 */
export const sharedModelKeywords: string[] = [
  'gpt-4o',
  'gpt-5',
  'o1',
  'o3',
  'openai',
  'gemini',
  'gemini 2',
  'gemini 3',
  'llama',
  'llama 3',
  'llama 4',
  'mistral',
  'mixtral',
  'cohere',
  'command r',
  'deepseek',
];

/**
 * Shared framework keywords
 */
export const sharedFrameworkKeywords: string[] = [
  'langchain',
  'langgraph',
  'crewai',
  'autogpt',
  'autogen',
  'llamaindex',
];

/**
 * Shared pricing keywords
 */
export const sharedPricingKeywords: string[] = [
  'pricing',
  'cost',
  'billing',
  'free tier',
  'enterprise',
  'tokens per',
  'per million tokens',
  'vcpu hour',
  'gb hour',
];

/**
 * Shared broad keywords - need 2+ matches
 */
export const sharedBroadKeywords: string[] = [
  'agent',
  'serverless',
  'edge function',
  'llm',
  'foundation model',
  'embedding',
  'rag',
  'opentelemetry',
  'otel',
];

/**
 * Shared AI context indicators
 */
export const sharedAiContextIndicators: string[] = [
  'ai',
  'artificial intelligence',
  'machine learning',
  'ml',
  'agent',
  'llm',
  'large language model',
  'foundation model',
  'generative',
  'claude',
  'gpt',
];

/**
 * Shared exclusion keywords
 */
export const sharedExcludeKeywords: string[] = [
  'gaming',
  'mobile game',
  'playstation',
  'xbox',
  'nintendo',
];

/**
 * Get shared keywords as a KeywordConfig (partial)
 * Report-specific configs should merge with this
 */
export const sharedKeywords: Partial<KeywordConfig> = {
  exact: sharedExactKeywords,
  phrase: sharedPhraseKeywords,
  sdkFunctions: sharedSdkFunctionKeywords,
  models: sharedModelKeywords,
  frameworks: sharedFrameworkKeywords,
  pricing: sharedPricingKeywords,
  broad: sharedBroadKeywords,
  aiContextIndicators: sharedAiContextIndicators,
  exclude: sharedExcludeKeywords,
  contextual: [], // Report-specific
};

/**
 * Merge shared keywords with report-specific keywords
 */
export function mergeKeywords(
  reportKeywords: Partial<KeywordConfig>
): KeywordConfig {
  return {
    exact: [...sharedExactKeywords, ...(reportKeywords.exact || [])],
    phrase: [...sharedPhraseKeywords, ...(reportKeywords.phrase || [])],
    sdkFunctions: [
      ...sharedSdkFunctionKeywords,
      ...(reportKeywords.sdkFunctions || []),
    ],
    models: [...sharedModelKeywords, ...(reportKeywords.models || [])],
    frameworks: [
      ...sharedFrameworkKeywords,
      ...(reportKeywords.frameworks || []),
    ],
    pricing: [...sharedPricingKeywords, ...(reportKeywords.pricing || [])],
    broad: [...sharedBroadKeywords, ...(reportKeywords.broad || [])],
    aiContextIndicators: [
      ...sharedAiContextIndicators,
      ...(reportKeywords.aiContextIndicators || []),
    ],
    exclude: [...sharedExcludeKeywords, ...(reportKeywords.exclude || [])],
    contextual: reportKeywords.contextual || [],
  };
}
