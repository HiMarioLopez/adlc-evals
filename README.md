# ADLC Evals: AI-Driven Long-form Content Evaluation

An experiment in automated technical report generation and visualization.

---

## What This Is

A pipeline for creating **living technical documentation** that compares cloud platforms, SDKs, and infrastructure stacks. Currently focused on **Vercel Agent Stack vs AWS Agent Stack (Bedrock + AgentCore)**.

### Key Principles

- **Hard Facts Only** — No subjective ratings (no "7/10"). All claims cite MCP-sourced documentation.
- **Blessed Path Methodology** — Compare officially recommended approaches, not custom/DIY solutions.
- **Human-in-the-Loop** — All generated content is **manually validated** before publishing.
- **Iterative Refinement** — Meta-prompts evolve based on output quality.

---

## Project Structure

```
adlc-evals/
├── meta-research-prompts/          # Master prompts that guide AI report generation
│   └── Vercel-AWS-Base-Research-Prompt.md
├── generated-reports/              # Raw markdown reports from AI models
│   └── vercel-aws/
│       └── 2026/01/
│           ├── 2026-01-08-Agent-Comparison-Report-Claude-Opus-4.5.md
│           └── 2026-01-08-Agent-Comparison-Report-GPT-5.2.md
└── generated-report-sites/         # Interactive Next.js visualizations
    ├── agent-stack-comparison-vercel-aws/    # Main production site
    ├── agent-stack-comparison-refined/       # Refined iteration
    ├── agent-stack-comparison-vercel-cf/     # [Planned] Vercel vs Cloudflare
    └── agent-stack-comparison-vercel-gcp/    # [Planned] Vercel vs GCP
```

---

## The Generation Pipeline

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           GENERATION PIPELINE                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌───────────┐ │
│  │   1. CREATE  │ -> │  2. GENERATE │ -> │   3. REFINE  │ -> │ 4. HUMAN  │ │
│  │ META-PROMPT  │    │   REPORT     │    │   WITH AI    │    │  REVIEW   │ │
│  └──────────────┘    └──────────────┘    └──────────────┘    └───────────┘ │
│        │                   │                   │                   │        │
│        v                   v                   v                   v        │
│   Hand-crafted         AI model            Claude Code       Manual fact   │
│   research prompt      (Claude, GPT)       iterations        checking &    │
│   with MCP tools       generates           polish UI &       validation    │
│                        markdown            fix issues                       │
│                                                                             │
│                                                                             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                  │
│  │  5. BUILD    │ -> │  6. DEPLOY   │ -> │  7. ITERATE  │                  │
│  │    SITE      │    │  TO VERCEL   │    │   PROMPT     │                  │
│  └──────────────┘    └──────────────┘    └──────────────┘                  │
│        │                   │                   │                            │
│        v                   v                   v                            │
│   v0.dev creates       Ship to             Update meta-prompt              │
│   Next.js app          production          based on learnings              │
│   from markdown                                                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Step-by-Step Breakdown

**1. Create Meta-Prompt**

The meta-prompt (`meta-research-prompts/`) defines:
- Role and methodology ("Senior Principal Cloud Architect")
- Required MCP toolchain (GitHub MCP, AWS Docs MCP, Vercel MCP, Context7)
- Output structure and sections
- Validated citations and reference data
- Self-update instructions for keeping the prompt fresh

**2. Generate Report with AI**

Run the meta-prompt through a capable model (Claude Opus 4.5, GPT-5.2, etc.):
- Model uses MCP tools to fetch real-time data
- Outputs structured markdown with citations
- Multiple models can generate competing reports for comparison

**3. Refine with Claude Code (Cursor)**

Use Claude Code to:
- Fix factual errors or stale data
- Improve formatting and structure
- Add missing sections
- Enhance code examples

**4. Human Review & Validation**

**All information is manually validated by a human reviewer.**
- Cross-reference claims with source documentation
- Verify pricing and version numbers
- Check regional availability matrices
- Confirm code examples work

**5. Build Site with v0**

Transform the markdown report into an interactive site:
- Use [v0.dev](https://v0.dev) to generate initial Next.js components
- Creates rich visualizations (maps, calculators, comparison tables)
- Produces a modern, responsive UI

**6. Refine UI with Claude Code**

Polish the generated site:
- Fix component bugs
- Improve accessibility
- Enhance styling and interactions
- Add missing features

**7. Deploy & Iterate**

- Deploy to Vercel
- Collect feedback
- Update meta-prompt for next iteration

---

## Running a Generated Site Locally

```bash
cd generated-report-sites/agent-stack-comparison-vercel-aws
bun install  # or npm install
bun dev      # or npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Current Comparisons

| Comparison | Status | Report | Site |
|------------|--------|--------|------|
| **Vercel vs AWS** | Complete | [Claude Opus 4.5](generated-reports/vercel-aws/2026/01/2026-01-08-Agent-Comparison-Report-Claude-Opus-4.5.md) | [Site](generated-report-sites/agent-stack-comparison-vercel-aws/) |
| Vercel vs Cloudflare | Planned | — | — |
| Vercel vs GCP | Planned | — | — |

---

## Roadmap

### Phase 1: Automation (In Progress)
- [ ] **Automate report generation** — Scheduled runs with fresh MCP data
- [ ] **CI/CD for sites** — Auto-deploy when reports update
- [ ] **Version tracking** — Git-based changelog for meta-prompts and reports

### Phase 2: Meta-Prompt Refinement
- [ ] **Automated prompt scoring** — Measure output quality metrics
- [ ] **A/B testing prompts** — Compare prompt variations
- [ ] **Self-updating citations** — Meta-prompt refreshes its own reference data

### Phase 3: New Comparisons
- [ ] **Vercel vs Cloudflare Workers AI** — Edge-first agent stacks
- [ ] **Vercel vs GCP Vertex AI** — Enterprise agent platforms
- [ ] **Cross-framework** — AI SDK vs LangChain vs CrewAI

### Phase 4: Advanced Features
- [ ] **Real-time pricing updates** — Live cost calculators
- [ ] **Interactive architecture explorer** — Click-through diagrams
- [ ] **Community contributions** — Crowdsourced validation

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Reports | Markdown with Mermaid diagrams |
| Sites | Next.js 16, React 19, Tailwind CSS |
| Components | Radix UI, shadcn/ui patterns |
| Maps | MapLibre GL |
| Deployment | Vercel |
| AI Tools | Claude Code, v0.dev, MCP servers |

---

## Important Disclaimers

1. **Manual Validation Required** — Generated content is reviewed and fact-checked by a human before publication. AI can hallucinate or have stale training data.

2. **Point-in-Time Accuracy** — Cloud platforms change rapidly. Reports include timestamps; always verify against official docs.

3. **"Blessed Path" Bias** — We intentionally focus on vendor-recommended approaches. Alternative implementations exist but aren't covered.

4. **Pricing Subject to Change** — Cost calculations are estimates based on documented rates. Actual costs may vary.

---

## Contributing

This is an experimental project exploring AI-assisted documentation. Contributions welcome:

- **Report errors** — Open an issue with the correction and source
- **Suggest comparisons** — What platforms should we compare next?
- **Improve prompts** — Better meta-prompts = better outputs

---

## License

MIT — See [LICENSE](LICENSE) for details.

---

<p align="center">
  <em>Built with AI + human validation.</em>
</p>
