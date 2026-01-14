# RSS Feed Monitor

Automated RSS feed monitoring for ADLC Evals. This script monitors RSS feeds for relevant updates across multiple report types and automatically creates GitHub issues when relevant content is detected.

## Features

- **Multi-report support** - Configure different feeds/keywords per report type
- **Hourly monitoring** via GitHub Actions cron job
- **Keyword-based relevance scoring** with configurable threshold
- **Automatic deduplication** - won't create duplicate issues for the same article
- **Dry run mode** for testing without creating issues
- **Configurable feeds** - core feeds always checked, extended feeds optional

## Supported Reports

| Report ID | Description |
|-----------|-------------|
| `vercel-aws` | Vercel + AI SDK vs AWS Bedrock AgentCore & Strands SDK |
| `vercel-gcp` | Vercel + AI SDK vs Google Cloud Vertex AI & ADK |
| `vercel-azure` | Vercel + AI SDK vs Azure AI Agent Service & Semantic Kernel |
| `vercel-cloudflare` | Vercel + AI SDK vs Cloudflare Workers AI & Agents SDK |
| `vercel-modal` | Vercel + AI SDK vs Modal's Python-first serverless platform |

## Usage

### Local Development

```bash
# Install dependencies
bun install

# List available reports
bun run src/index.ts --list-reports

# Run with dry run for a specific report
bun run src/index.ts --report=vercel-aws --dry-run

# Run with custom threshold
bun run src/index.ts --report=vercel-aws --dry-run --threshold=5

# Full run (requires GITHUB_TOKEN)
GITHUB_TOKEN=your_token GITHUB_REPOSITORY=owner/repo bun run src/index.ts --report=vercel-aws
```

### Command Line Arguments

| Argument | Description |
|----------|-------------|
| `--report=<id>` | Report ID to monitor (required) |
| `--list-reports` | List all available reports with details |
| `--dry-run` | Skip issue creation, just show what would be created |
| `--threshold=N` | Override relevance threshold (default: 3) |

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GITHUB_TOKEN` | Yes | GitHub token with `issues: write` permission |
| `GITHUB_REPOSITORY` | Auto | Set automatically in GitHub Actions (format: `owner/repo`) |
| `EXTENDED_FEEDS` | No | Set to `true` to include extended feeds |
| `DRY_RUN` | No | Set to `true` to skip issue creation |
| `REPORT` | No | Report ID (alternative to `--report` flag) |

### GitHub Actions

The workflow runs automatically every hour for all reports. You can also trigger it manually:

1. Go to **Actions** → **RSS Feed Monitor**
2. Click **Run workflow**
3. Select the report to monitor (or "all" for all reports)
4. Optionally enable dry run or extended feeds
5. Click **Run workflow**

## Architecture

```
scripts/rss-monitor/src/
├── index.ts                    # CLI entrypoint with --report argument
├── parser.ts                   # Generic RSS/Atom parsing logic
├── relevance-scorer.ts         # Keyword matching and scoring
├── issue-creator.ts            # GitHub issue creation
├── types.ts                    # Shared type definitions
├── keywords/
│   ├── index.ts                # Re-exports keyword utilities
│   └── shared.ts               # Common keywords (AI SDK, models, etc.)
└── reports/
    ├── index.ts                # Report registry and loader
    ├── types.ts                # ReportConfig interface
    ├── vercel-aws.ts           # Vercel vs AWS configuration
    ├── vercel-gcp.ts           # Vercel vs GCP configuration
    ├── vercel-azure.ts         # Vercel vs Azure configuration
    ├── vercel-cloudflare.ts    # Vercel vs Cloudflare configuration
    └── vercel-modal.ts         # Vercel vs Modal configuration
```

## Keyword Matching

Items are scored based on keyword matches:

| Category | Points | Examples |
|----------|--------|----------|
| Exact match (high priority) | 3 | `bedrock`, `ai sdk`, `claude`, `strands` |
| Phrase match | 2 | `extended thinking`, `tool calling`, `fluid compute` |
| SDK functions | 2 | `generateText`, `streamObject` |
| Model names | 2 | `gpt-4o`, `gemini 2`, `llama 4` |
| Framework names | 1 | `langchain`, `crewai` |
| Pricing keywords | 1 | `pricing`, `free tier` |
| Contextual (with AI context) | 1 | `lambda`, `workflow`, `gateway` |
| Broad (2+ matches needed) | 1 each | `agent`, `llm`, `serverless` |

Default threshold: **3** (configurable via `--threshold`)

## Adding a New Report

1. Create a new config file in `src/reports/` (e.g., `vercel-newplatform.ts`):

```typescript
import { mergeKeywords, sharedVercelFeeds, sharedVercelExtendedFeeds } from '../keywords/index.js';
import type { ReportConfig, ReportConfigInput } from './types.js';

const platformCoreFeeds = [
  { url: 'https://example.com/feed', name: 'Platform Blog', category: 'newplatform' as const },
];

const platformExactKeywords = ['platform specific', 'keywords here'];

const configInput: ReportConfigInput = {
  id: 'vercel-newplatform',
  name: 'Vercel vs New Platform',
  description: 'Description of what this report compares.',
  feeds: {
    core: [...sharedVercelFeeds, ...platformCoreFeeds],
    extended: [...sharedVercelExtendedFeeds],
  },
  keywords: {
    exact: platformExactKeywords,
    phrase: [],
    contextual: [],
  },
  labels: {
    base: ['rss-monitor', 'vercel-newplatform'],
    categoryMap: { newplatform: 'newplatform', vercel: 'vercel' },
  },
  issuePrefix: {
    categoryMap: { newplatform: '🆕 [Platform]', vercel: '▲ [Vercel]' },
    default: '📰 [Update]',
  },
};

export const vercelNewplatformConfig: ReportConfig = {
  ...configInput,
  keywords: mergeKeywords(configInput.keywords),
  defaultThreshold: configInput.defaultThreshold ?? 3,
};
```

2. Add the new category to `src/types.ts`:
```typescript
export type FeedCategory = ... | 'newplatform';
```

3. Register in `src/reports/index.ts`:
```typescript
import { vercelNewplatformConfig } from './vercel-newplatform.js';

export const reportConfigs: Record<string, ReportConfig> = {
  // ...existing reports
  'vercel-newplatform': vercelNewplatformConfig,
};
```

4. Add to the workflow options in `.github/workflows/rss-monitor.yml`

## Issue Format

Created issues include:
- Report name
- Source feed name
- Publication date
- Direct link to article
- Relevance score
- Matched keywords
- Article summary (first 500 chars)
- Auto-generated labels

## Troubleshooting

### No issues being created
1. Check if items meet the relevance threshold
2. Verify `GITHUB_TOKEN` has `issues: write` permission
3. Run with `--dry-run` to see what would be created

### Too many/few issues
Adjust the threshold:
- Higher threshold (e.g., 5) = fewer, more relevant issues
- Lower threshold (e.g., 2) = more issues, may include less relevant content

### Rate limiting
The script includes a 500ms delay between issue creation. For high-volume feeds, consider:
- Increasing the delay in `issue-creator.ts`
- Reducing feed count or using stricter keywords
