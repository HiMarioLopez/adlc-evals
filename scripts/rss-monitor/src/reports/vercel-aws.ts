/**
 * Vercel vs AWS Report Configuration
 *
 * Monitors AWS Bedrock, AgentCore, Strands SDK and Vercel AI SDK
 * for updates relevant to the Vercel vs AWS comparison report.
 */

import {
  mergeKeywords,
  sharedVercelFeeds,
  sharedVercelExtendedFeeds,
} from '../keywords/index.js';
import type { ReportConfig, ReportConfigInput } from './types.js';

/**
 * AWS-specific feeds
 */
const awsCoreFeeds = [
  {
    url: 'https://aws.amazon.com/blogs/machine-learning/feed/',
    name: 'AWS ML Blog',
    category: 'aws' as const,
  },
  {
    url: 'https://github.com/aws/bedrock-agentcore-sdk-python/releases.atom',
    name: 'AgentCore SDK',
    category: 'github-release' as const,
  },
  {
    url: 'https://github.com/strands-agents/sdk-python/releases.atom',
    name: 'Strands SDK',
    category: 'github-release' as const,
  },
];

const awsExtendedFeeds = [
  {
    url: 'https://aws.amazon.com/blogs/aws/feed/',
    name: 'AWS News Blog',
    category: 'aws' as const,
  },
  {
    url: 'https://aws.amazon.com/new/feed/',
    name: "AWS What's New",
    category: 'aws' as const,
  },
  {
    url: 'https://aws.amazon.com/blogs/developer/feed/',
    name: 'AWS Developer Blog',
    category: 'aws' as const,
  },
  {
    url: 'https://aws.amazon.com/blogs/compute/feed/',
    name: 'AWS Compute Blog',
    category: 'aws' as const,
  },
];

/**
 * AWS-specific keywords
 */
const awsExactKeywords = [
  // AgentCore Services
  'agentcore',
  'agent core',
  'bedrock agentcore',

  // Strands SDK
  'strands agents',
  'strands sdk',
  'strands-agents',

  // Amazon Bedrock
  'bedrock',
  'amazon bedrock',
  'bedrock agents',
  'bedrock guardrails',
  'bedrock knowledge bases',

  // Cedar Policy
  'cedar policy',
  'cedar language',
  'nl2cedar',

  // Amazon Nova models
  'amazon nova',
  'nova lite',
  'nova pro',

  // Amazon Titan
  'amazon titan',
];

const awsContextualKeywords = [
  'lambda',
  'step functions',
  'workflow',
  'memory',
  'gateway',
  'runtime',
  'sagemaker',
];

const awsPhraseKeywords = [
  'secure compute',
  'vpc peering',
  'durable functions',
  'workflow development kit',
];

/**
 * Report configuration input (before merging shared keywords)
 */
const configInput: ReportConfigInput = {
  id: 'vercel-aws',
  name: 'Vercel vs AWS',
  description:
    'Comparing Vercel + AI SDK against AWS Bedrock AgentCore and Strands SDK for building AI agents.',
  feeds: {
    core: [...sharedVercelFeeds, ...awsCoreFeeds],
    extended: [...sharedVercelExtendedFeeds, ...awsExtendedFeeds],
  },
  keywords: {
    exact: awsExactKeywords,
    phrase: awsPhraseKeywords,
    contextual: awsContextualKeywords,
  },
  labels: {
    base: ['rss-monitor', 'vercel-aws'],
    categoryMap: {
      aws: 'aws',
      vercel: 'vercel',
      'github-release': 'release',
      'model-provider': 'ai-models',
    },
  },
  issuePrefix: {
    categoryMap: {
      aws: '🔶 [AWS]',
      vercel: '▲ [Vercel]',
      'github-release': '📦 [Release]',
      'model-provider': '🤖 [Model]',
    },
    default: '📰 [Update]',
  },
  defaultThreshold: 3,
};

/**
 * Complete Vercel vs AWS report configuration
 */
export const vercelAwsConfig: ReportConfig = {
  ...configInput,
  keywords: mergeKeywords(configInput.keywords),
  defaultThreshold: configInput.defaultThreshold ?? 3,
};
