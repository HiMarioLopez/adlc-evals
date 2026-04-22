# ADLC Evals

AI-driven technical report generation with human validation.

## What This Is

A pipeline for creating **living technical documentation** comparing cloud platforms. Currently: **Vercel Agent Stack vs AWS Agent Stack**.

**Principles:** Hard facts only (no subjective ratings), blessed-path methodology, human-in-the-loop validation.

## Pipeline

```mermaid
flowchart LR
    A[Create Meta-Prompt] --> B[Generate Report]
    B --> C[Refine with AI]
    C --> D[Human Review]
    D --> E[Build Site]
    E --> F[Deploy]
    F --> G[Iterate Prompt]
    G --> A
```

| Step | What Happens |
|------|--------------|
| **Meta-Prompt** | Hand-crafted research prompt with MCP tools |
| **Generate** | AI model (Claude, GPT) produces markdown with citations |
| **Refine** | Claude Code polishes structure and fixes issues |
| **Review** | Human validates all claims against source docs |
| **Build** | v0.dev creates interactive Next.js visualization |
| **Deploy** | Ship to Vercel |
| **Iterate** | Update prompt based on learnings |

## Project Structure

```
meta-research-prompts/     → Master prompts for report generation
generated-reports/         → Raw markdown from AI models
site/                      → Interactive Next.js report site
```

## Current Comparisons

| Comparison | Status | Links |
|------------|--------|-------|
| Vercel vs AWS | ✅ Live | [Live Report](https://adlc-evals.vercel.app/reports/vercel-aws) · [Markdown](generated-reports/vercel-aws/2026/04/2026-04-21-Agent-Comparison-Report-Claude-Opus-4.7.md) |
| Vercel vs Azure | ✅ Live | [Live Report](https://adlc-evals.vercel.app/reports/vercel-azure) · [Markdown](generated-reports/vercel-azure/2026/04/2026-04-21-Agent-Comparison-Report-Claude-Opus-4.7.md) |
| Vercel vs Cloudflare | 🔜 Planned | — |
| Vercel vs GCP | 🔜 Planned | — |

**Browse all reports:** [adlc-evals.vercel.app](https://adlc-evals.vercel.app)

## Run Locally

```bash
cd site
bun install && bun dev
```

## Tech Stack

Next.js 16 · React 19 · Tailwind · MapLibre GL · Vercel · Claude Code · v0.dev

## Disclaimers

- **Human-validated** — All content reviewed before publication
- **Point-in-time** — Cloud platforms change; verify against official docs
- **Blessed-path** — Focuses on vendor-recommended approaches

---

MIT License · Built with AI + human validation
