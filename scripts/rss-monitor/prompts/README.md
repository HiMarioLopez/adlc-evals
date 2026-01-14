# RSS Monitor Prompts

This directory contains prompts to help maintain and evolve the RSS monitor configuration.

## Available Prompts

| Prompt | Purpose | Frequency |
|--------|---------|-----------|
| [update-platform-keywords.md](./update-platform-keywords.md) | Research and update keywords/feeds for a platform | Weekly or as needed |

## Usage

1. Open the prompt file
2. Follow the instructions to customize for your target platform
3. Run with an AI assistant that has web search (Claude, ChatGPT, etc.)
4. Review and apply the suggested changes
5. Test with `bun run src/index.ts --report=<id> --dry-run`

## When to Update

- **Weekly**: Quick check for new SDK releases or product announcements
- **After major conferences**: AWS re:Invent, Google I/O, Microsoft Build, etc.
- **When relevance drops**: If you're not seeing expected updates, keywords may be stale
- **New platform launch**: When a platform introduces a new AI agent offering
