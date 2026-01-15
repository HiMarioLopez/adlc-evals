/**
 * State Manager for RSS Feed Deduplication
 *
 * Manages persistent state to track which feed items have been processed,
 * preventing duplicate processing across runs.
 *
 * State is stored as JSON files in the ./state directory, which is cached
 * by GitHub Actions between runs.
 */

import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import type { RelevantItem } from './types.js';

/**
 * Individual entry for a processed item
 */
export interface StateEntry {
  /** Timestamp when this item was added to state */
  addedAt: string;
  /** Item title for debugging/inspection */
  title: string;
}

/**
 * Persistent state for a report's processed items
 */
export interface State {
  /** Report identifier (e.g., 'vercel-aws') */
  reportId: string;
  /** Map of item hashes to their state entries */
  processedItems: Record<string, StateEntry>;
  /** Timestamp of the last successful run */
  lastRunAt: string;
}

/** Directory where state files are stored */
const STATE_DIR = join(dirname(import.meta.url.replace('file://', '')), '..', 'state');

/**
 * Get the path to a report's state file
 */
function getStatePath(reportId: string): string {
  return join(STATE_DIR, `${reportId}.json`);
}

/**
 * Generate a deterministic hash for a feed item
 *
 * Uses the item's URL as the primary identifier, falling back to
 * URL + title combination if URL is missing.
 */
export function generateItemHash(item: { link: string; title: string }): string {
  const identifier = item.link || `${item.link}:${item.title}`;
  return createHash('sha256').update(identifier).digest('hex').slice(0, 16);
}

/**
 * Load state from disk for a given report
 *
 * Returns an empty state if the file doesn't exist (first run or cache miss).
 */
export async function loadState(reportId: string): Promise<State> {
  const statePath = getStatePath(reportId);

  try {
    const content = await readFile(statePath, 'utf-8');
    const state = JSON.parse(content) as State;

    // Validate the loaded state
    if (state.reportId !== reportId) {
      console.warn(`State file has mismatched reportId, starting fresh`);
      return createEmptyState(reportId);
    }

    console.log(
      `📂 Loaded state: ${Object.keys(state.processedItems).length} previously processed items`
    );
    return state;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      console.log('📂 No existing state found, starting fresh');
    } else {
      console.warn('⚠️ Failed to load state, starting fresh:', error);
    }
    return createEmptyState(reportId);
  }
}

/**
 * Create an empty state object
 */
function createEmptyState(reportId: string): State {
  return {
    reportId,
    processedItems: {},
    lastRunAt: new Date().toISOString(),
  };
}

/**
 * Save state to disk
 */
export async function saveState(state: State): Promise<void> {
  const statePath = getStatePath(state.reportId);

  // Ensure the state directory exists
  await mkdir(dirname(statePath), { recursive: true });

  // Update lastRunAt
  state.lastRunAt = new Date().toISOString();

  await writeFile(statePath, JSON.stringify(state, null, 2), 'utf-8');
  console.log(
    `💾 Saved state: ${Object.keys(state.processedItems).length} processed items`
  );
}

/**
 * Filter items to return only those not previously processed
 */
export function filterNewItems<T extends { link: string; title: string }>(
  items: T[],
  state: State
): T[] {
  const newItems: T[] = [];
  let skippedCount = 0;

  for (const item of items) {
    const hash = generateItemHash(item);
    if (state.processedItems[hash]) {
      skippedCount++;
    } else {
      newItems.push(item);
    }
  }

  if (skippedCount > 0) {
    console.log(`⏭️  Skipped ${skippedCount} previously processed items`);
  }

  return newItems;
}

/**
 * Add newly processed items to the state
 */
export function addProcessedItems(
  items: RelevantItem[],
  state: State
): void {
  const now = new Date().toISOString();

  for (const item of items) {
    const hash = generateItemHash(item);
    state.processedItems[hash] = {
      addedAt: now,
      title: item.title,
    };
  }
}

/**
 * Remove entries older than the specified number of days
 *
 * This prevents unbounded state growth and aligns with GitHub's
 * cache TTL (7 days by default).
 */
export function pruneOldEntries(state: State, maxAgeDays: number): number {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - maxAgeDays);
  const cutoffTime = cutoff.getTime();

  let prunedCount = 0;
  const entries = Object.entries(state.processedItems);

  for (const [hash, entry] of entries) {
    const entryTime = new Date(entry.addedAt).getTime();
    if (entryTime < cutoffTime) {
      delete state.processedItems[hash];
      prunedCount++;
    }
  }

  if (prunedCount > 0) {
    console.log(`🧹 Pruned ${prunedCount} entries older than ${maxAgeDays} days`);
  }

  return prunedCount;
}
