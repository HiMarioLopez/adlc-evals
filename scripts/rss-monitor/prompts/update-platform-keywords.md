# Update Platform Keywords Prompt

Use this prompt to research and update the keywords/feeds for a specific platform comparison report. Run this weekly or when you notice the ecosystem has evolved.

---

## Instructions

1. Replace `{{PLATFORM}}` with the platform name (e.g., "AWS", "GCP", "Azure", "Cloudflare", "Modal")
2. Replace `{{REPORT_ID}}` with the report ID (e.g., "vercel-aws", "vercel-gcp")
3. Provide the current config file content
4. Run the prompt with an AI assistant that has web search capabilities

---

## Prompt

```
I'm maintaining an RSS feed monitor that tracks updates relevant to a "Vercel vs {{PLATFORM}}" technical comparison report for AI agent development platforms.

## Current Configuration

Here's my current report config:

<current_config>
{{PASTE_CURRENT_CONFIG_FILE_HERE}}
</current_config>

## Your Task

Research the current {{PLATFORM}} AI/agent development ecosystem and help me update:

### 1. RSS Feeds to Monitor

Find official RSS/Atom feeds for:
- {{PLATFORM}}'s official blog (AI/ML focused if available)
- {{PLATFORM}}'s changelog or "what's new" feed
- GitHub release feeds for their key SDKs (format: https://github.com/org/repo/releases.atom)
- Any developer-focused blogs or community feeds

For each feed, provide:
- URL
- Name
- Whether it should be "core" (high signal) or "extended" (broader coverage)

### 2. Exact Keywords (3 points each)

These are high-priority terms that should always trigger a match. Research:
- Official product names for {{PLATFORM}}'s AI agent offerings
- SDK names and npm/pip package names
- Service names specific to their agent/AI platform
- Any branded features or tools

### 3. Phrase Keywords (2 points each)

Multi-word technical terms specific to {{PLATFORM}}:
- Feature names
- Architecture patterns they promote
- Unique terminology from their docs

### 4. Contextual Keywords (1 point each, only with AI context)

Terms that are only relevant when combined with AI/agent context:
- Generic infrastructure terms they use
- Compute/storage services that might be used for AI workloads

### 5. Keywords to Exclude

Terms that would cause false positives:
- Gaming/entertainment terms if the platform has gaming services
- Unrelated product lines

## Research Sources

Please check:
1. {{PLATFORM}}'s official AI/ML documentation
2. Their developer blog (last 3 months of posts)
3. Recent announcements (re:Invent, Google I/O, Build, etc.)
4. GitHub repos for their agent SDKs
5. Their pricing pages for AI services

## Output Format

Provide the updated TypeScript config in this format:

\`\`\`typescript
// Updated keywords based on research as of {{DATE}}

const {{PLATFORM_VAR}}ExactKeywords = [
  // Product names
  'example product',
  
  // SDK names
  'example-sdk',
  
  // Service names
  'example service',
];

const {{PLATFORM_VAR}}PhraseKeywords = [
  'example phrase',
];

const {{PLATFORM_VAR}}ContextualKeywords = [
  'example context',
];

// New feeds discovered
const {{PLATFORM_VAR}}CoreFeeds = [
  {
    url: 'https://example.com/feed',
    name: 'Example Feed',
    category: '{{PLATFORM_LOWER}}' as const,
  },
];
\`\`\`

Also note:
- Any keywords that should be REMOVED (deprecated products, renamed services)
- Any emerging trends to watch for future updates
- Confidence level for each addition (verified from docs vs. inferred)
```

---

## Platform-Specific Notes

### For AWS (vercel-aws)
Focus on: Bedrock, AgentCore, Strands SDK, SageMaker, Lambda, Step Functions, Cedar

### For GCP (vercel-gcp)
Focus on: Vertex AI, Agent Builder, ADK, Cloud Run, Cloud Functions, Gemini models

### For Azure (vercel-azure)
Focus on: Azure AI Agent Service, Semantic Kernel, Azure OpenAI, Azure Functions, AI Foundry

### For Cloudflare (vercel-cloudflare)
Focus on: Workers AI, Agents SDK, Durable Objects, Vectorize, AI Gateway

### For Modal (vercel-modal)
Focus on: Modal platform, GPU serverless, Python functions, container support

---

## After Running the Prompt

1. Review the suggested changes critically
2. Verify feeds actually exist and return valid RSS/Atom
3. Test with `--dry-run` to see if new keywords improve relevance
4. Update the config file in `src/reports/{{REPORT_ID}}.ts`
5. Consider if any keywords should be added to `keywords/shared.ts` (if relevant to all reports)
