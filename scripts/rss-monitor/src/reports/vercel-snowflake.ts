/**
 * Vercel vs Snowflake Report Configuration
 *
 * Monitors Snowflake Cortex Agents, Cortex Analyst, Cortex Search,
 * and Vercel AI SDK for updates relevant to the Vercel vs Snowflake comparison report.
 */

import {
  mergeKeywords,
  sharedVercelFeeds,
  sharedVercelExtendedFeeds,
} from '../keywords/index.js';
import type { ReportConfig, ReportConfigInput } from './types.js';

/**
 * Snowflake-specific feeds
 */
const snowflakeCoreFeeds = [
  {
    url: 'https://www.snowflake.com/blog/feed/',
    name: 'Snowflake Blog',
    category: 'snowflake' as const,
  },
];

const snowflakeExtendedFeeds = [
  {
    url: 'https://www.snowflake.com/engineering-blog/feed/',
    name: 'Snowflake Engineering Blog',
    category: 'snowflake' as const,
  },
];

/**
 * Snowflake-specific keywords
 */
const snowflakeExactKeywords = [
  // Cortex Agents
  'cortex agents',
  'cortex agent',
  'snowflake agents',

  // Cortex Analyst
  'cortex analyst',
  'snowflake analyst',

  // Cortex Search
  'cortex search',
  'snowflake search',

  // Snowflake AI
  'snowflake ai',
  'snowflake cortex',
  'cortex llm',
  'cortex ml',

  // Streamlit
  'streamlit',
  'streamlit in snowflake',

  // Arctic
  'snowflake arctic',
  'arctic embed',

  // Anthropic partnership
  'snowflake anthropic',
];

const snowflakeContextualKeywords = [
  'warehouse',
  'snowpark',
  'snowpipe',
  'data sharing',
  'secure data',
  'native app',
  'marketplace',
  'iceberg',
];

const snowflakePhraseKeywords = [
  'snowflake platform',
  'snowflake data cloud',
  'data warehouse',
  'semantic layer',
  'natural language query',
];

/**
 * Report configuration input (before merging shared keywords)
 */
const configInput: ReportConfigInput = {
  id: 'vercel-snowflake',
  name: 'Vercel vs Snowflake',
  description:
    'Comparing Vercel AI SDK with Snowflake Cortex Agents for warehouse-native analytics agents.',
  feeds: {
    core: [...sharedVercelFeeds, ...snowflakeCoreFeeds],
    extended: [...sharedVercelExtendedFeeds, ...snowflakeExtendedFeeds],
  },
  keywords: {
    exact: snowflakeExactKeywords,
    phrase: snowflakePhraseKeywords,
    contextual: snowflakeContextualKeywords,
  },
  labels: {
    base: ['rss-monitor', 'vercel-snowflake'],
    categoryMap: {
      snowflake: 'snowflake',
      vercel: 'vercel',
      'github-release': 'release',
      'model-provider': 'ai-models',
    },
  },
  issuePrefix: {
    categoryMap: {
      snowflake: '❄️ [Snowflake]',
      vercel: '▲ [Vercel]',
      'github-release': '📦 [Release]',
      'model-provider': '🤖 [Model]',
    },
    default: '📰 [Update]',
  },
  defaultThreshold: 3,
};

/**
 * Complete Vercel vs Snowflake report configuration
 */
export const vercelSnowflakeConfig: ReportConfig = {
  ...configInput,
  keywords: mergeKeywords(configInput.keywords),
  defaultThreshold: configInput.defaultThreshold ?? 3,
};
