/**
 * Relevance Scorer
 *
 * Generic relevance scoring logic that works with any KeywordConfig.
 * Calculates scores based on keyword matches in text content.
 */

import type { KeywordConfig, KeywordMatchResult } from './types.js';

/**
 * Calculate relevance score for given text using the provided keyword config
 * @param text The text to analyze (title + description)
 * @param keywords The keyword configuration to use
 * @returns Match result with score and matched keywords
 */
export function calculateRelevanceScore(
  text: string,
  keywords: KeywordConfig
): KeywordMatchResult {
  const lowerText = text.toLowerCase();
  const matchedKeywords: string[] = [];
  const categories = new Set<string>();
  let score = 0;

  // Check exclusions first
  for (const keyword of keywords.exclude) {
    if (lowerText.includes(keyword.toLowerCase())) {
      return { score: 0, matchedKeywords: [], categories: [] };
    }
  }

  // Exact keywords - high priority (3 points each)
  for (const keyword of keywords.exact) {
    if (lowerText.includes(keyword.toLowerCase())) {
      score += 3;
      matchedKeywords.push(keyword);
      categories.add('exact');
    }
  }

  // Phrase keywords (2 points each)
  for (const phrase of keywords.phrase) {
    if (lowerText.includes(phrase.toLowerCase())) {
      score += 2;
      matchedKeywords.push(phrase);
      categories.add('phrase');
    }
  }

  // SDK function keywords (2 points each)
  for (const keyword of keywords.sdkFunctions) {
    if (lowerText.includes(keyword.toLowerCase())) {
      score += 2;
      matchedKeywords.push(keyword);
      categories.add('sdk');
    }
  }

  // Model keywords (2 points each)
  for (const keyword of keywords.models) {
    if (lowerText.includes(keyword.toLowerCase())) {
      score += 2;
      matchedKeywords.push(keyword);
      categories.add('model');
    }
  }

  // Framework keywords (1 point each - contextual)
  for (const keyword of keywords.frameworks) {
    if (lowerText.includes(keyword.toLowerCase())) {
      score += 1;
      matchedKeywords.push(keyword);
      categories.add('framework');
    }
  }

  // Pricing keywords (1 point each)
  for (const keyword of keywords.pricing) {
    if (lowerText.includes(keyword.toLowerCase())) {
      score += 1;
      matchedKeywords.push(keyword);
      categories.add('pricing');
    }
  }

  // Check if we have AI context for contextual keywords
  const hasAIContext = keywords.aiContextIndicators.some((indicator) =>
    lowerText.includes(indicator.toLowerCase())
  );

  // Contextual keywords - only count if AI context present (1 point each)
  if (hasAIContext) {
    for (const keyword of keywords.contextual) {
      if (lowerText.includes(keyword.toLowerCase())) {
        score += 1;
        matchedKeywords.push(keyword);
        categories.add('contextual');
      }
    }
  }

  // Broad keywords - count matches
  let broadMatches = 0;
  const broadMatchedKeywords: string[] = [];
  for (const keyword of keywords.broad) {
    if (lowerText.includes(keyword.toLowerCase())) {
      broadMatches++;
      broadMatchedKeywords.push(keyword);
    }
  }

  // Broad keywords only contribute if 2+ matches or combined with other matches
  if (broadMatches >= 2 || (broadMatches >= 1 && score > 0)) {
    score += broadMatches;
    matchedKeywords.push(...broadMatchedKeywords);
    categories.add('broad');
  }

  return {
    score,
    matchedKeywords: [...new Set(matchedKeywords)], // Deduplicate
    categories: [...categories],
  };
}
