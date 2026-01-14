/**
 * GitHub Issue Creator
 *
 * Creates GitHub issues for relevant RSS feed items,
 * aggregated by feed category (one issue per platform).
 */

import { Octokit } from '@octokit/rest';
import type { RelevantItem, CreateIssueResult, FeedCategory } from './types.js';
import type { ReportConfig } from './reports/types.js';

// Initialize Octokit with GitHub token
function getOctokit(): Octokit {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error('GITHUB_TOKEN environment variable is required');
  }
  return new Octokit({ auth: token });
}

// Get repository info from environment or default
function getRepoInfo(): { owner: string; repo: string } {
  // GitHub Actions provides GITHUB_REPOSITORY in format "owner/repo"
  const repoFullName = process.env.GITHUB_REPOSITORY;

  if (repoFullName) {
    const [owner, repo] = repoFullName.split('/');
    return { owner, repo };
  }

  // Fallback for local testing
  return {
    owner: process.env.REPO_OWNER || 'your-org',
    repo: process.env.REPO_NAME || 'adlc-evals',
  };
}

/**
 * Group items by their feed category
 */
function groupItemsByCategory(
  items: RelevantItem[]
): Map<FeedCategory, RelevantItem[]> {
  const grouped = new Map<FeedCategory, RelevantItem[]>();

  for (const item of items) {
    const existing = grouped.get(item.feedCategory) || [];
    existing.push(item);
    grouped.set(item.feedCategory, existing);
  }

  return grouped;
}

/**
 * Check if an aggregated issue already exists for this category and date
 */
async function aggregatedIssueExists(
  octokit: Octokit,
  owner: string,
  repo: string,
  category: FeedCategory,
  config: ReportConfig,
  date: string
): Promise<{ exists: boolean; issueNumber?: number }> {
  try {
    // Search for issues with the category label created today
    const prefix = config.issuePrefix.categoryMap[category] ?? config.issuePrefix.default;
    const searchQuery = `repo:${owner}/${repo} is:issue is:open "${prefix}" "${date}" in:title`;
    
    const { data } = await octokit.rest.search.issuesAndPullRequests({
      q: searchQuery,
    });

    if (data.total_count > 0) {
      return { exists: true, issueNumber: data.items[0].number };
    }
    return { exists: false };
  } catch (error) {
    console.error('Error checking for existing issue:', error);
    return { exists: false };
  }
}

/**
 * Format the aggregated issue body for a category
 */
function formatAggregatedIssueBody(
  items: RelevantItem[],
  category: FeedCategory,
  config: ReportConfig
): string {
  const topScore = Math.max(...items.map((i) => i.matchResult.score));
  const allKeywords = new Set<string>();
  items.forEach((item) =>
    item.matchResult.matchedKeywords.forEach((k) => allKeywords.add(k))
  );

  const itemsList = items
    .map((item) => {
      const truncatedDesc =
        item.description.length > 200
          ? `${item.description.slice(0, 200)}...`
          : item.description;
      return `### [${item.title}](${item.link})
**Source:** ${item.feedName} | **Score:** ${item.matchResult.score} | **Published:** ${item.pubDate.toISOString().split('T')[0]}

> ${truncatedDesc || 'No description available.'}
`;
    })
    .join('\n---\n\n');

  return `## ${config.name} - Platform Update Summary

**Category:** ${category}
**Items found:** ${items.length}
**Top relevance score:** ${topScore}

### Matched Keywords
${[...allKeywords]
  .slice(0, 20)
  .map((k) => `\`${k}\``)
  .join(', ')}${allKeywords.size > 20 ? ` (+${allKeywords.size - 20} more)` : ''}

---

## Updates

${itemsList}

---
*This issue was automatically created by the RSS Feed Monitor.*
*Report: ${config.id}*`;
}

/**
 * Generate an aggregated issue title
 */
function generateAggregatedIssueTitle(
  category: FeedCategory,
  itemCount: number,
  config: ReportConfig,
  date: string
): string {
  const prefix = config.issuePrefix.categoryMap[category] ?? config.issuePrefix.default;
  return `${prefix} ${itemCount} update${itemCount > 1 ? 's' : ''} - ${date}`;
}

/**
 * Get labels for an aggregated issue
 */
function getAggregatedLabels(
  items: RelevantItem[],
  category: FeedCategory,
  config: ReportConfig
): string[] {
  const labels: string[] = [...config.labels.base];

  // Add category-based label from config
  const categoryLabel = config.labels.categoryMap[category];
  if (categoryLabel) {
    labels.push(categoryLabel);
  }

  // Add keyword-based labels if any items have them
  const hasSDK = items.some((i) => i.matchResult.categories.includes('sdk'));
  const hasPricing = items.some((i) =>
    i.matchResult.categories.includes('pricing')
  );

  if (hasSDK) labels.push('sdk');
  if (hasPricing) labels.push('pricing');

  return labels;
}

/**
 * Aggregated issue result
 */
export interface AggregatedIssueResult {
  category: FeedCategory;
  itemCount: number;
  success: boolean;
  issueUrl?: string;
  skipped?: boolean;
  error?: string;
}

/**
 * Create an aggregated GitHub issue for a category
 */
async function createAggregatedIssue(
  octokit: Octokit,
  owner: string,
  repo: string,
  category: FeedCategory,
  items: RelevantItem[],
  config: ReportConfig,
  date: string
): Promise<AggregatedIssueResult> {
  try {
    // Check for existing issue for this category today
    const existing = await aggregatedIssueExists(
      octokit,
      owner,
      repo,
      category,
      config,
      date
    );

    if (existing.exists && existing.issueNumber) {
      // Update existing issue with new items
      console.log(
        `  Updating existing issue #${existing.issueNumber} for ${category}`
      );
      
      const { data } = await octokit.rest.issues.update({
        owner,
        repo,
        issue_number: existing.issueNumber,
        body: formatAggregatedIssueBody(items, category, config),
        title: generateAggregatedIssueTitle(category, items.length, config, date),
      });

      return {
        category,
        itemCount: items.length,
        success: true,
        issueUrl: data.html_url,
      };
    }

    // Create new issue
    const { data } = await octokit.rest.issues.create({
      owner,
      repo,
      title: generateAggregatedIssueTitle(category, items.length, config, date),
      body: formatAggregatedIssueBody(items, category, config),
      labels: getAggregatedLabels(items, category, config),
    });

    console.log(
      `  Created issue #${data.number} for ${category} (${items.length} items)`
    );
    return {
      category,
      itemCount: items.length,
      success: true,
      issueUrl: data.html_url,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`  Error creating issue for ${category}:`, errorMessage);
    return {
      category,
      itemCount: items.length,
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Simulate aggregated issue creation for dry run mode
 */
function simulateAggregatedIssue(
  category: FeedCategory,
  items: RelevantItem[],
  config: ReportConfig,
  date: string
): AggregatedIssueResult {
  const title = generateAggregatedIssueTitle(
    category,
    items.length,
    config,
    date
  );
  console.log(`  [DRY RUN] Would create issue: ${title}`);
  
  // Show what would be included
  for (const item of items.slice(0, 5)) {
    console.log(`    - [${item.matchResult.score}] ${item.title}`);
  }
  if (items.length > 5) {
    console.log(`    ... and ${items.length - 5} more`);
  }

  return {
    category,
    itemCount: items.length,
    success: true,
    skipped: false,
  };
}

/**
 * Create GitHub issues for all relevant items, aggregated by category
 */
export async function createIssuesForItems(
  items: RelevantItem[],
  config: ReportConfig,
  dryRun: boolean = false
): Promise<AggregatedIssueResult[]> {
  if (items.length === 0) {
    console.log('\nNo relevant items to create issues for.');
    return [];
  }

  const { owner, repo } = getRepoInfo();
  const today = new Date().toISOString().split('T')[0];

  console.log(`\nCreating aggregated issues in ${owner}/${repo} for ${config.name}...`);

  // Group items by category
  const grouped = groupItemsByCategory(items);
  console.log(`  Found ${grouped.size} categories with updates`);

  if (dryRun) {
    console.log('[DRY RUN MODE - No issues will be created]\n');
    const results: AggregatedIssueResult[] = [];
    
    for (const [category, categoryItems] of grouped) {
      const result = simulateAggregatedIssue(category, categoryItems, config, today);
      results.push(result);
      console.log('');
    }

    console.log(`Summary:`);
    console.log(`  Would create: ${results.length} issues`);
    console.log(`  Total items: ${items.length}`);
    return results;
  }

  // Real mode - need GitHub token
  const octokit = getOctokit();
  const results: AggregatedIssueResult[] = [];

  // Process each category
  for (const [category, categoryItems] of grouped) {
    const result = await createAggregatedIssue(
      octokit,
      owner,
      repo,
      category,
      categoryItems,
      config,
      today
    );
    results.push(result);

    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  // Summary
  const created = results.filter((r) => r.success && r.issueUrl).length;
  const failed = results.filter((r) => !r.success).length;
  const totalItems = results.reduce((sum, r) => sum + r.itemCount, 0);

  console.log(`\nSummary:`);
  console.log(`  Issues created/updated: ${created}`);
  console.log(`  Failed: ${failed}`);
  console.log(`  Total items aggregated: ${totalItems}`);

  return results;
}

// Re-export for backwards compatibility (though the return type changed)
export type { CreateIssueResult };
