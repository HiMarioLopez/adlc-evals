# Site TS File Classification

File-by-file verdict on which TS files mirror markdown (safe to auto-sync), which enrich markdown with site-only data (manual sync required), and which are purely site scaffolding (never touch markdown).

## Legend

- **PURE MIRROR** — Every non-structural field traces to markdown verbatim. `check:sync` will catch drift. Safe for aggressive automation.
- **ENRICHED** — Factual fields mirror markdown; UI/computed fields are site-only. Manual review required when markdown changes.
- **SITE-ONLY** — No markdown counterpart. Update in isolation.

## vercel-aws

| File | Verdict | Site-only fields | Markdown-provenance fields |
|------|---------|-----------------|----------------------------|
| `metadata.ts` | ENRICHED | `id`, `href`, `platforms[].color`, `platforms[].textColor`, `platforms[].icon`, `highlights[]`, `contributors[].github` | `title`, `subtitle`, `description`, `date`, `dateIso`, `version` |
| `hero.ts` | ENRICHED | `keyFindings[]`, `keyFindingsInline{}`, `highlightSecondary` | `title`, `subtitle`, `description`, `lastUpdated` |
| `delta.ts` | **PURE MIRROR** | `color` (chart token) | `platform`, `previous`, `current`, `changes[]`, `version`, `link` |
| `infrastructure.ts` | ENRICHED | `iconName`, `colorClass`, `keyInsight.codeHighlight` | `rows[].capability`, `rows[].vercel.text/detail/link`, `rows[].aws.text/detail/link` |
| `regions.ts` | ENRICHED | `coordinates[]`, `agentcoreFeatures[].required`, `vercelEdgePops: 126`, `vercelFeatures[].note` | Region flags (booleans), `description` |
| `pricing.ts` | ENRICHED | `effortLevels[].color`, `bedrockTiers[].tooltip`, `keyInsight.modelPercent/infraPercent` | Pricing rows, cost breakdown, workload assumptions |
| `deployment.ts` | **PURE MIRROR** | `iconName` | `steps[].command/codeBlock/description/notes[]`, `comparisons[]` |
| `code.ts` | **PURE MIRROR** | `key` (routing id) | `examples[].code/label/language`, `patternComparisons[]` |
| `adoption.ts` | **PURE MIRROR** | `repositories[].color` | All repo stats, ratios, activity signals |
| `footer.ts` | ENRICHED | `analyzedVersions` (field names are AWS-centric) | `vercelLinks[]`, `awsLinks[]`, `contributors[]`, `reportVersion`, `generatedDate` |
| `sections.ts` | **SITE-ONLY** | All | (none) |
| `index.ts` | **SITE-ONLY** | All (pure wiring) | (none) |

## vercel-azure

Same classification. Specifics:

| File | Verdict | Azure-specific notes |
|------|---------|---------------------|
| `metadata.ts` | ENRICHED | `platforms[].color: "bg-[#0078D4]"` is site-only; `highlights[]` is editorial |
| `hero.ts` | ENRICHED | `keyFindings[]` show 21 Vercel vs 24 Azure regions + 3 min vs 30-45 min — synthesized from markdown prose |
| `delta.ts` | PURE MIRROR | 15 delta entries mirror markdown §2.1 + §2.2 |
| `infrastructure.ts` | ENRICHED | Extra "Agent Harness" row added for Apr 22 Foundry drop |
| `regions.ts` | ENRICHED | `foundryFeatures` (Azure-specific) vs AWS's `agentcoreFeatures` |
| `pricing.ts` | ENRICHED | `bedrockTiers[]` field name is AWS-centric but holds Azure deployment tier data |
| `deployment.ts` | PURE MIRROR | 7 Azure steps match markdown §9 |
| `code.ts` | PURE MIRROR | 8 Azure code examples (MAF 1.0, Foundry Agent Service, Hosted Agents YAML, Toolbox, Memory, Agent Harness, McpTool, Foundry Tracing) |
| `adoption.ts` | PURE MIRROR | 4 repos: vercel/ai + 3 Microsoft repos |
| `footer.ts` | ENRICHED | `analyzedVersions.strands` holds `agent-framework@1.0.1`; `.agentcore` holds `azure-ai-projects@2.1.0` — see gotcha |
| `sections.ts` | SITE-ONLY | No `calculator` entry (AWS has it) |
| `index.ts` | SITE-ONLY | |

## Automation-safe subset

If we ever write a TS → markdown codegen, only these 4 files are safe to auto-write without human review:

- `code.ts` → code-examples shard
- `deployment.ts` → deployment-setup shard
- `adoption.ts` → adoption-metrics shard
- `delta.ts` → delta shard

Everything else needs human-in-the-loop.

## What `check-sync.ts` currently checks

Not exhaustive — this is the 80/20. The drift detector in `site/scripts/check-sync.ts` verifies:

1. **Intra-TS consistency**: `metadata.version === footer.reportVersion` (hard error)
2. **footer.analyzedVersions** values appear somewhere in markdown (warn)
3. **adoption.repositories[].name** each appears in markdown (warn)
4. **delta.deltas[].version** each appears in markdown (warn)
5. **metadata.highlights[]** first-clause loosely matches markdown prose (warn)

Expansion candidates (see the script's header comment):
- Pricing tier labels
- Region feature-flag counts
- Code example language labels
- Cross-reference link URLs
