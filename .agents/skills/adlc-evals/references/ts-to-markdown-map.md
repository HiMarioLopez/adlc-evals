# TS ↔ Markdown Mapping

Which site TS file mirrors which markdown shard. Use this during Step E to find the right shard quickly.

## vercel-aws (April 2026 report)

Markdown dir: `generated-reports/vercel-aws/2026/04/2026-04-21-Agent-Comparison-Report-Claude-Opus-4.7/`

| TS file | Markdown shard | Notes |
|---------|----------------|-------|
| `metadata.ts` | `00-header.md` + metadata table in `01-metadata-2026-delta.md` | Title, date, version, highlights |
| `hero.ts` | Synthesized from `00-header.md` + `01-metadata-2026-delta.md` | Key findings are site-only card data |
| `delta.ts` | `01-metadata-2026-delta.md` (Executive Delta table) | PURE MIRROR |
| `infrastructure.ts` | `02-infrastructure-footprint-hard-facts.md` | Capability matrix §2.1–2.4 |
| `regions.ts` | `03-regional-availability-matrix.md` | Coordinates are site-only |
| `pricing.ts` | `04-2026-unit-economics.md` | §4.1–4.8 |
| `deployment.ts` | `05-deployment-setup-comparison.md` | PURE MIRROR |
| `code.ts` | `06-code-examples.md` | PURE MIRROR, §6.1/6.2/6.3 |
| `adoption.ts` | `08-adoption-metrics-github-api-data.md` | PURE MIRROR |
| `footer.ts` | `12-cross-reference-links.md` | Links are restructured for the UI |
| `sections.ts` | (no markdown) | UI sidebar nav |
| `index.ts` | (no markdown) | Barrel module |

## vercel-azure (April 2026 report)

Markdown dir: `generated-reports/vercel-azure/2026/04/2026-04-21-Agent-Comparison-Report-Claude-Opus-4.7/`

Azure has more shards (18 vs 14 for AWS) because of the extra `04-3-1-azure-hosted-agents-vs-vercel-sandbox-head-to-head.md` and the `15-validated-citations-reference-data.md` shard. Mapping:

| TS file | Markdown shard | Notes |
|---------|----------------|-------|
| `metadata.ts` | `00-header.md` | Title, date, version, highlights |
| `hero.ts` | Synthesized from `00-header.md` + `01-architectural-framing-two-layers-one-vendor.md` | Key findings card data is site-only |
| `delta.ts` | `02-the-2026-delta-what-changed-nov-2025-april-2026.md` (§2.1 Azure Timeline + §2.2 Vercel Timeline) | PURE MIRROR |
| `infrastructure.ts` | `03-infrastructure-footprint-hard-facts.md` | §3.1–3.4 matrix |
| `regions.ts` | `05-regional-availability-matrix.md` | `05` not `03` for Azure |
| `pricing.ts` | `06-2026-unit-economics.md` | §6.1–6.12 |
| `deployment.ts` | `09-deployment-setup-comparison.md` | PURE MIRROR |
| `code.ts` | `10-code-examples.md` | PURE MIRROR |
| `adoption.ts` | `11-adoption-metrics-github-api-data-april-21-2026.md` | PURE MIRROR |
| `footer.ts` | `14-cross-reference-links.md` | |
| `sections.ts` | (no markdown) | UI sidebar; no `calculator` entry unlike AWS |
| `index.ts` | (no markdown) | Barrel module |

## How to find a shard by section number

Azure reports number sections differently from AWS (Azure: 1, 2, 3, 3.1, 4, 5, …; AWS: 1, 2, 3, …). The shard **filename prefix** is sequential regardless of the in-markdown section number. So `05-regional-availability-matrix.md` in Azure is the 5th shard, even though its heading is `## 4. Regional Availability Matrix` internally.

When in doubt: `ls -1 <report-dir>/ | grep -i keyword`.

## The AWS-centric field names gotcha

`FooterData.analyzedVersions` has fields `aiSdk` / `strands` / `agentcore`. In the Azure report these hold:
- `strands` → `agent-framework@1.0.1`
- `agentcore` → `azure-ai-projects@2.1.0`

When reading or writing `footer.ts` for Azure, remember the field names are legacy-AWS. A future refactor could rename these to `framework`/`infrastructure`, but it requires touching `site/data/report-schema.ts` and any component that reads these fields.
