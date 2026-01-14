/**
 * RSS/Atom Feed Parser
 *
 * Parses RSS and Atom feeds, filters items from the last 24 hours,
 * and matches against relevance keywords.
 */

import Parser from 'rss-parser';
import type { FeedConfig, FeedItem, RelevantItem } from './types.js';
import type { ReportConfig } from './reports/types.js';
import { calculateRelevanceScore } from './relevance-scorer.js';

const parser = new Parser({
  timeout: 10000, // 10 second timeout
  headers: {
    'User-Agent': 'ADLC-Evals-RSS-Monitor/1.0',
  },
});

/**
 * Check if a date is within the last N hours
 */
function isWithinHours(date: Date, hours: number): boolean {
  const now = new Date();
  const cutoff = new Date(now.getTime() - hours * 60 * 60 * 1000);
  return date >= cutoff;
}

/**
 * Parse a single feed and return items from the last 24 hours
 */
async function parseFeed(feed: FeedConfig): Promise<FeedItem[]> {
  try {
    console.log(`  Fetching: ${feed.name} (${feed.url})`);
    const parsed = await parser.parseURL(feed.url);

    const items: FeedItem[] = [];

    for (const item of parsed.items || []) {
      // Get publication date (RSS uses pubDate, Atom uses isoDate)
      const dateStr = item.pubDate || item.isoDate;
      if (!dateStr) continue;

      const pubDate = new Date(dateStr);
      if (isNaN(pubDate.getTime())) continue;

      // Only include items from the last 24 hours
      if (!isWithinHours(pubDate, 24)) continue;

      items.push({
        title: item.title || 'Untitled',
        link: item.link || '',
        pubDate,
        description: item.contentSnippet || item.content || item.summary || '',
        feedName: feed.name,
        feedCategory: feed.category,
      });
    }

    console.log(`    Found ${items.length} items from last 24h`);
    return items;
  } catch (error) {
    console.error(
      `  Error fetching ${feed.name}:`,
      error instanceof Error ? error.message : error
    );
    return [];
  }
}

/**
 * Get feeds based on configuration and environment
 */
function getFeeds(config: ReportConfig): FeedConfig[] {
  const useExtended = process.env.EXTENDED_FEEDS === 'true';

  if (useExtended) {
    return [...config.feeds.core, ...config.feeds.extended];
  }

  return config.feeds.core;
}

/**
 * Parse all configured feeds and return items from the last 24 hours
 */
export async function parseAllFeeds(config: ReportConfig): Promise<FeedItem[]> {
  const feeds = getFeeds(config);
  console.log(`\nParsing ${feeds.length} feeds for ${config.name}...`);

  const results = await Promise.allSettled(feeds.map((feed) => parseFeed(feed)));

  const allItems: FeedItem[] = [];

  for (const result of results) {
    if (result.status === 'fulfilled') {
      allItems.push(...result.value);
    }
  }

  console.log(`\nTotal items from last 24h: ${allItems.length}`);
  return allItems;
}

/**
 * Filter items by relevance score
 */
export function filterRelevantItems(
  items: FeedItem[],
  config: ReportConfig,
  threshold?: number
): RelevantItem[] {
  const effectiveThreshold = threshold ?? config.defaultThreshold;
  const relevant: RelevantItem[] = [];

  for (const item of items) {
    // Combine title and description for matching
    const textToMatch = `${item.title} ${item.description}`;
    const matchResult = calculateRelevanceScore(textToMatch, config.keywords);

    if (matchResult.score >= effectiveThreshold) {
      relevant.push({
        ...item,
        matchResult,
      });
    }
  }

  // Sort by score (highest first)
  relevant.sort((a, b) => b.matchResult.score - a.matchResult.score);

  console.log(`Relevant items (score >= ${effectiveThreshold}): ${relevant.length}`);
  return relevant;
}

/**
 * Main function to fetch and filter relevant feed items
 */
export async function getRelevantUpdates(
  config: ReportConfig,
  threshold?: number
): Promise<RelevantItem[]> {
  const allItems = await parseAllFeeds(config);
  return filterRelevantItems(allItems, config, threshold);
}
