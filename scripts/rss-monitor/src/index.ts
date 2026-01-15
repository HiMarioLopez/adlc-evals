/**
 * RSS Feed Monitor - Main Entrypoint
 *
 * Monitors RSS feeds for relevant updates and creates GitHub issues
 * for items matching the configured keywords.
 *
 * Usage:
 *   bun run src/index.ts --report=vercel-aws [--dry-run] [--threshold=N]
 *   bun run src/index.ts --list-reports
 *
 * Environment Variables:
 *   GITHUB_TOKEN      - Required for creating issues
 *   GITHUB_REPOSITORY - Auto-set in GitHub Actions (owner/repo format)
 *   EXTENDED_FEEDS    - Set to "true" to include extended feeds
 *   DRY_RUN           - Set to "true" to skip issue creation
 *   REPORT            - Report ID to use (alternative to --report)
 */

import { getRelevantUpdates } from './parser.js';
import { createIssuesForItems } from './issue-creator.js';
import {
  getReportConfig,
  getAvailableReportIds,
  getAllReportConfigs,
} from './reports/index.js';
import {
  loadState,
  saveState,
  filterNewItems,
  addProcessedItems,
  pruneOldEntries,
} from './state-manager.js';

interface ParsedArgs {
  dryRun: boolean;
  threshold: number | undefined;
  reportId: string | undefined;
  listReports: boolean;
}

// Parse command line arguments
function parseArgs(): ParsedArgs {
  const args = process.argv.slice(2);

  let dryRun = process.env.DRY_RUN === 'true';
  let threshold: number | undefined;
  let reportId = process.env.REPORT;
  let listReports = false;

  for (const arg of args) {
    if (arg === '--dry-run') {
      dryRun = true;
    } else if (arg === '--list-reports') {
      listReports = true;
    } else if (arg.startsWith('--threshold=')) {
      const value = parseInt(arg.split('=')[1], 10);
      if (!isNaN(value) && value > 0) {
        threshold = value;
      }
    } else if (arg.startsWith('--report=')) {
      reportId = arg.split('=')[1];
    }
  }

  return { dryRun, threshold, reportId, listReports };
}

// Display available reports
function displayAvailableReports(): void {
  console.log('\n========================================');
  console.log('  Available Reports');
  console.log('========================================\n');

  const configs = getAllReportConfigs();

  for (const config of configs) {
    console.log(`  ${config.id}`);
    console.log(`    Name: ${config.name}`);
    console.log(`    Description: ${config.description}`);
    console.log(`    Core feeds: ${config.feeds.core.length}`);
    console.log(`    Extended feeds: ${config.feeds.extended.length}`);
    console.log(`    Default threshold: ${config.defaultThreshold}`);
    console.log('');
  }

  console.log('Usage: bun run src/index.ts --report=<report-id> [--dry-run]');
  console.log('');
}

async function main(): Promise<void> {
  const { dryRun, threshold, reportId, listReports } = parseArgs();

  // Handle --list-reports
  if (listReports) {
    displayAvailableReports();
    return;
  }

  // Validate report ID
  if (!reportId) {
    console.error('Error: No report specified.');
    console.error('');
    console.error('Usage: bun run src/index.ts --report=<report-id> [--dry-run]');
    console.error('');
    console.error('Available reports:');
    for (const id of getAvailableReportIds()) {
      console.error(`  - ${id}`);
    }
    console.error('');
    console.error('Or use --list-reports to see detailed information.');
    process.exit(1);
  }

  const config = getReportConfig(reportId);
  if (!config) {
    console.error(`Error: Unknown report "${reportId}"`);
    console.error('');
    console.error('Available reports:');
    for (const id of getAvailableReportIds()) {
      console.error(`  - ${id}`);
    }
    process.exit(1);
  }

  const effectiveThreshold = threshold ?? config.defaultThreshold;

  console.log('========================================');
  console.log('  RSS Feed Monitor - ADLC Evals');
  console.log('========================================');
  console.log(`  Started at: ${new Date().toISOString()}`);
  console.log(`  Report: ${config.name} (${config.id})`);
  console.log(`  Dry run: ${dryRun}`);
  console.log(`  Relevance threshold: ${effectiveThreshold}`);
  console.log(`  Extended feeds: ${process.env.EXTENDED_FEEDS === 'true'}`);

  try {
    // Load state to track previously processed items
    const state = await loadState(config.id);

    // Fetch and filter relevant items
    const relevantItems = await getRelevantUpdates(config, effectiveThreshold);

    if (relevantItems.length === 0) {
      console.log('\n✓ No relevant updates found in the last 24 hours.');
      return;
    }

    // Filter out items we've already processed
    const newItems = filterNewItems(relevantItems, state);

    if (newItems.length === 0) {
      console.log('\n✓ No new items since last run (all items were previously processed).');
      return;
    }

    console.log(`\n📋 Found ${newItems.length} new items (${relevantItems.length - newItems.length} already processed):`);
    for (const item of newItems) {
      console.log(`  - [${item.matchResult.score}] ${item.title}`);
      console.log(
        `    Keywords: ${item.matchResult.matchedKeywords.slice(0, 5).join(', ')}${item.matchResult.matchedKeywords.length > 5 ? '...' : ''}`
      );
    }

    // Create issues for new items only
    await createIssuesForItems(newItems, config, dryRun);

    // Update state with newly processed items
    addProcessedItems(newItems, state);

    // Remove entries older than 7 days (matches GitHub cache TTL)
    pruneOldEntries(state, 7);

    // Save updated state
    await saveState(state);

    console.log('\n✓ RSS Feed Monitor completed successfully.');
  } catch (error) {
    console.error('\n✗ RSS Feed Monitor failed:', error);
    process.exit(1);
  }
}

// Run the main function
main();
