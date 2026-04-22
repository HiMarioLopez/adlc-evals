## 5. 2026 Unit Economics

> 🎯 **Methodological Note:** All per-token prices below are per 1 million tokens, USD, confirmed from Azure's pricing pages as of April 21, 2026. **Azure's pricing pages render token prices via JavaScript** — static HTML fetches return `$-` placeholders. Figures below were sourced from search-engine-cached renders and cross-validated against OpenAI direct pricing + third-party mirrors; any figure rendered as `$-` in static HTML is marked **DOCUMENTATION GAP** and needs verification via the [Azure Pricing Calculator](https://azure.microsoft.com/en-us/pricing/calculator/) or the Azure Retail Prices API.

### 5.1 Workload Assumptions

Calculations below use the site's canonical workload:

- **Turns:** 1,000
- **Input tokens per turn:** 2,000
- **Output tokens per turn:** 500
- **Active CPU per turn:** 5 seconds

**Default model:** **GPT-5.4 mini** Global Standard ($0.75 / $4.50 per 1M tokens) — the pragmatic Azure default for production agents as of April 2026. Full-fat GPT-5.4 is registration-gated and 3.3× the price.

### 5.2 GPT-5.4 Pricing (per 1M tokens)

| Model | Input | Output | Tier | Notes |
|-------|-------|--------|------|-------|
| **GPT-5.4** (Mar 5, 2026) | $2.50 | $15.00 | flagship | 1.05M context, native computer-use, registration-gated on Azure; long-context tier $5.00 / $22.50 above 272K tokens |
| **GPT-5.4 mini** (Mar 17, 2026) | $0.75 | $4.50 | balanced | 400K context, 2× faster than full GPT-5.4, agent-workhorse tier |
| **GPT-5.4 nano** (Mar 17, 2026) | $0.20 | $1.25 | fast | Cheapest in family |

### 5.3 Model Layer — Azure OpenAI (Per 1M Tokens, USD)

**Source:** [Azure OpenAI Pricing](https://azure.microsoft.com/en-us/pricing/details/azure-openai/)

#### GPT-4.1 Series (previous primary agent model)

| Model | Deployment | Input | Cached Input | Output | Batch Input | Batch Output |
|-------|-----------|-------|--------------|--------|-------------|--------------|
| **GPT-4.1** | Global | $2.00 | $0.50 | $8.00 | $1.00 | $4.00 |
| **GPT-4.1** | Data Zone | $2.20 | $0.55 | $8.80 | — | — |
| **GPT-4.1** | Regional | $2.20 | $0.55 | $8.80 | N/A | N/A |
| **GPT-4.1 Priority** | Global | $3.50 | $0.88 | $14.00 | N/A | N/A |
| **GPT-4.1-mini** | Global | $0.40 | $0.10 | $1.60 | $0.20 | $0.80 |
| **GPT-4.1-nano** | Global | $0.10 | $0.025 | $0.40 | $0.05 | $0.20 |

Context window: **1M tokens**. Knowledge cutoff: June 2024.

#### GPT-5 Series

| Model | Deployment | Input | Cached Input | Output |
|-------|-----------|-------|--------------|--------|
| **GPT-5** | Global | $1.25 | $0.13 | $10.00 |
| **GPT-5 Priority** | Global | $2.50 | $0.25 | $20.00 |
| **GPT-5 Pro** | Global | $30.00 | — | $150.00 |
| **GPT-5-mini** | Global | $0.25 | $0.025 | $2.00 |
| **GPT-5-nano** | Global | $0.20 | $0.02 | $1.25 |
| **GPT-5.2** | Global | $1.75 | $0.18 | $14.00 |
| **GPT-5.2 Priority** | Global | $3.50 | $0.35 | $28.00 |
| **GPT-5.3-Codex** | Global | $1.75 | $0.18 | $14.00 |
| **GPT-5.4** | Global | $2.50 | — | $15.00 |
| **GPT-5.4 Priority** | Global | $5.00 | — | $30.00 |
| **GPT-5.4-mini** | Global | $0.75 | — | $4.50 |
| **GPT-5.4-nano** | Global | $0.20 | — | $1.25 |

#### o-Series Reasoning Models

| Model | Deployment | Input | Cached Input | Output | Batch Input | Batch Output |
|-------|-----------|-------|--------------|--------|-------------|--------------|
| **o4-mini** | Global | $1.10 | $0.275 | $4.40 | $0.55 | $2.20 |
| **o4-mini** | Data Zone | $1.21 | $0.31 | $4.84 | $0.61 | $2.42 |
| **o3** | Global | $2.00 | $0.50 | $8.00 | $1.00 | $4.00 |
| **o3-mini** | Global | $1.10 | $0.275 | $4.40 | $0.55 | $2.20 |
| **o1** | Global | $15.00 | $7.50 | $60.00 | N/A | N/A |

#### GPT-4o (legacy, still supported)

| Model | Deployment | Input | Cached Input | Output |
|-------|-----------|-------|--------------|--------|
| **GPT-4o** | Global | $2.50 | $1.25 | $10.00 |
| **GPT-4o-mini** | Global | $0.15 | $0.075 | $0.60 |

### 5.4 Deployment Tier Multipliers (**Model-Specific**)

> ⚠️ **Important correction vs January baseline:** The Priority Processing multiplier is **not** a flat +75%. It varies by model family.

| Tier | GPT-4.1 | GPT-5 / 5.2 / 5.4 | Use Case |
|------|:-------:|:-----------------:|----------|
| **Priority Processing** | +75% (×1.75) | **≈ ×2 (+100%)** | Latency-sensitive user-facing agents |
| **Global Standard** | Baseline | Baseline | Default, highest throughput |
| **Data Zone (US or EU)** | +10% | +10% | Data residency within zone |
| **Regional Standard** | +~21% over Global | +~21% over Global | Hard regional data residency |
| **Batch API** | −50% | −50% | Async workloads, 24-hour SLA |

**Verified examples:** GPT-4.1 Global $2.00 → Priority $3.50 input (×1.75) · GPT-5 Global $1.25 → Priority $2.50 input (×2.0) · GPT-5.4 Global $2.50 → Priority $5.00 input (×2.0) · GPT-5.2 Global $1.75 → Priority $3.50 input (×2.0).

### 5.5 Provisioned Throughput Units (PTU)

| Model | Min PTU | Hourly $/PTU | Monthly Reservation $/PTU | Yearly Reservation $/PTU |
|-------|:-------:|:------------:|:-------------------------:|:-----------------------:|
| GPT-5 Global | 15 | $1.00 | $260 | $2,652 |
| GPT-5 Data Zone | 15 | $1.10 | $286 | $2,916 |
| GPT-5 Regional | 50 | $2.00 | $286 | $2,916 |
| GPT-4.1 Global | 15 | $1.00 | $260 | $2,652 |
| o4-mini Global | 15 | $1.00 | $260 | $2,652 |
| GPT-4o Global | 15 | $1.00 | $260 | $2,652 |

**PTU economics:** Monthly reservation ≈ **64% off** hourly PAYG (at 730 hrs/month). Yearly reservation ≈ **70% off**. For steady-state agent traffic above ~30% average utilization on a single model, PTU beats PAYG.

### 5.6 Built-in Tools (Assistants API — sunset Aug 26, 2026 — or Responses API)

| Tool | Price |
|------|-------|
| **Code Interpreter** | **$0.03/session** (1-hour session window) |
| **File Search** (vector storage) | **$0.10/GB/day** (1 GB free) |
| **File Search Tool Call** (Responses API) | **$2.50/1K tool calls** |
| **Computer Use** (Responses API) | Input: $3.00/1M · Output: $12.00/1M |

### 5.7 Foundry Models Catalog (MaaS, Per 1M Tokens)

| Model | Deployment | Input | Output |
|-------|-----------|-------|--------|
| **DeepSeek V3.2** | Global | $0.58 | $1.68 |
| **DeepSeek V3.2** | Data Zone | $0.64 | $1.85 |
| **DeepSeek R1** | Global | $1.35 | $5.40 |
| **DeepSeek R1** | Data Zone / Regional | $1.485 | $5.94 |
| **DeepSeek V3** | Global | $1.14 | $4.56 |
| **Mistral OCR** | — | $1.00 / 1K pages | (flat) |
| **mistral-document-ai-2505** | — | $3.00 / 1K pages | (flat) |
| **MAI-Transcribe-1** | — | $0.36 / hr audio | (flat) |
| **MAI-Voice-1** (TTS) | — | $22 / 1M characters | (flat) |
| **MAI-Image-2** | — | $5 / 1M text tokens | (flat) |
| Llama 4 / Phi-4 / Mistral text | All | **DOCUMENTATION GAP** | DOCUMENTATION GAP |

### 5.8 Infrastructure Layer (Foundry Agent Service + Azure primitives)

| Component | Price | Notes |
|-----------|-------|-------|
| **Agent orchestration** | **$0** | Foundry-native agents incur no orchestration charge |
| **Thread / conversation storage** | **$0 direct** | Stored in customer's Cosmos DB + Azure Storage (customer pays directly) |
| **Hosted Agents compute** | **$0.0994/vCPU-hour + $0.0118/GiB-hour** | Active sessions only (scale-to-zero); billing started **Apr 22, 2026**; see §5.8.1 cost matrix for sandbox-size rollup |
| **Foundry Memory (short-term)** | $0.25 / 1K events | Billing begins **Jun 1, 2026** (free during preview) |
| **Foundry Memory (long-term)** | $0.25 / 1K memories / month | Billing begins Jun 1, 2026 |
| **Foundry Memory retrieval** | $0.50 / 1K retrievals | Billing begins Jun 1, 2026 |
| **Code Interpreter tool** | $0.03 / session-hour | (same as Azure OpenAI built-in) |
| **File Search Storage** | $0.10 / GB / day (1 GB free) | Vector storage |
| **Web Search (Bing Grounding)** | DOCUMENTATION GAP | Separate Bing billing |
| **Custom Search** | DOCUMENTATION GAP | Preview |
| **Deep Research** | DOCUMENTATION GAP | Billed at model + Bing rates |
| **ACA Dynamic Sessions** — Code interpreter | $0.03 / session-hour PAYG ($0.026 1yr, $0.025 3yr savings) | 1-hr active / 30-min idle timeout; **38 regions** |
| **Azure Durable Task Scheduler — Dedicated** | Per-CU billing | 1 CU = 2,000 actions/sec + 50 GB; up to 90-day retention |
| **Azure Durable Task Scheduler — Consumption** | Pay-per-action | Up to 30-day retention; GA Mar 31, 2026 |
| **Azure Functions (Flex Consumption)** | $0.000026 / GB-s + $0.40 / M executions | 100K GB-s + 250K exec/month free |
| **Azure AI Search S1** | $245.28 / SU / month | 160 GB/partition, 50 indexes; vector bundled |
| **Azure AI Search Semantic Ranker** | 1K req/mo free, then $5 / 1K | — |
| **Azure AI Search Agentic Retrieval** | 50M tokens/mo free, then DOCUMENTATION GAP | — |
| **Cosmos DB Serverless** | $0.25 / M RUs | + $0.25 / GB / mo storage (+25% for AZ redundancy) |
| **Azure Monitor — Analytics Logs** | $2.30 / GB ingestion, 5 GB/mo free | 31 days retention included |
| **Azure Monitor — Basic Logs** | $0.50 / GB | 30 days |
| **Azure Monitor — Auxiliary Logs** | $0.05 / GB | 30 days |

### 5.8.1 Hosted Agents Cost Matrix (Apr 22, 2026)

Dimensional rates published Apr 22, 2026 via the [Foundry "Complete Developer Journey" hub blog](https://devblogs.microsoft.com/foundry/from-local-to-production-the-complete-developer-journey-for-building-composing-and-deploying-ai-agents/):

- **Compute**: `$0.0994 per vCPU-hour`
- **Memory**: `$0.0118 per GiB-hour`
- **Active sessions only** — zero cost during 15-min idle window and scale-to-zero periods. Model inference, Foundry Memory, and Toolbox tools billed separately.

Rollup per sandbox size (derived):

| Size | vCPU | Memory | CPU $/hr | Mem $/hr | **Total $/hr** |
|------|-----:|-------:|---------:|---------:|----:|
| **XS** (default) | 0.25 | 0.5 GiB | $0.02485 | $0.00590 | **~$0.031** |
| **S** | 0.5 | 1.0 GiB | $0.04970 | $0.01180 | **~$0.062** |
| **M** | 1.0 | 2.0 GiB | $0.09940 | $0.02360 | **~$0.123** |
| **L** (max) | 2.0 | 4.0 GiB | $0.19880 | $0.04720 | **~$0.246** |

**Agent Commit Units (ACUs)** — volume discount pre-purchase:
- 20,000 ACUs → $19,000 (**5% off**)
- 100,000 ACUs → $90,000 (**10% off**)
- 500,000 ACUs → $425,000 (**15% off**)

> 📝 **Sandbox ceiling comparison.** Hosted Agents caps at **2 vCPU / 4 GiB**. Vercel Sandbox Enterprise caps at **32 vCPU / 64 GB** — a **16× per-unit ceiling difference**. For compute-intensive agent tasks (compilation, ML inference, large builds), this is a hard architectural constraint in Azure's preview. Compare with §3.1 head-to-head.

### 5.9 Worked Example — 1,000 Agent Turns

**Assumptions:** 1 turn = 2,000 input tokens + 500 output tokens + 5s Active CPU + 1% Code Interpreter hit rate + 0.5 AI Search queries amortized.

| Stack Configuration | Model Cost | Code Interp | AI Search (S1 amortized) | **Total / 1K turns** |
|---|---|---|---|---|
| **GPT-5.4 mini Global** (Azure, site default) | $0.75×2 + $4.50×0.5 = $3.75 | $0.30 | $0.20 (+ $0.002 Cosmos) | **~$4.25** |
| **GPT-5.4 mini + Hosted Agents M (1 vCPU / 2 GiB, avg 10s active per turn)** | $3.75 | Hosted Agents: 1K × 10/3600 × $0.123 = **~$0.34** | $0.20 | **~$4.29** |
| **GPT-4.1-mini Global** (Azure) | $0.40×2 + $1.60×0.5 = $1.60 | $0.03 | ~$0.01 | **~$1.64** |
| **GPT-5-mini Global** (Azure) | $0.25×2 + $2.00×0.5 = $1.50 | $0.03 | ~$0.01 | **~$1.54** |
| **GPT-4.1 Global** (Azure) | $2.00×2 + $8.00×0.5 = $8.00 | $0.03 | ~$0.01 | **~$8.04** |
| **GPT-5 Global** (Azure) | $1.25×2 + $10.00×0.5 = $7.50 | $0.03 | ~$0.01 | **~$7.54** |
| **o4-mini Global** (Azure) | $1.10×2 + $4.40×0.5 = $4.40 | $0.03 | ~$0.01 | **~$4.44** |
| **DeepSeek V3.2** (Foundry Models) | $0.58×2 + $1.68×0.5 = $1.96 | $0.03 | ~$0.01 | **~$2.00** |
| **DeepSeek R1** (Foundry Models) | $1.35×2 + $5.40×0.5 = $5.40 | $0.03 | ~$0.01 | **~$5.44** |
| **GPT-5.4 mini via Vercel AI Gateway** (0% markup, Sandbox path) | $0.75×2 + $4.50×0.5 = $3.75 | Vercel Sandbox (~$0.30) | BYO | **~$4.20** |
| **Claude Sonnet 4.6 via Vercel AI Gateway** | $3×2 + $15×0.5 = $13.50 | Vercel Sandbox (~$0.30) | BYO | **~$13.80** (+ Fluid Compute) |
| **Claude Opus 4.7 via Vercel AI Gateway** | $5×2 + $25×0.5 = $22.50 | Vercel Sandbox (~$0.30) | BYO | **~$22.80** (+ Fluid Compute) |

> 📝 **The pricing delta is the model, not the infrastructure.** For the same model accessed on both platforms, Vercel charges 0% markup and Azure charges whatever deployment tier you picked. With GPT-5.4 mini (the cheap-but-capable agent-workhorse tier), model cost drops to ~$3.75 per 1K turns — infrastructure rises to ~10–11% of TCO instead of the 3–5% you see with premium flagships. **Pick based on DX and regional fit, not rack rate — the model layer still dominates TCO.**

### 5.10 The "Tier" Tax (Azure-Specific)

Azure OpenAI's deployment tier choice is a **hidden TCO lever**:

- **Priority Processing** — User-facing agents that need <2s p99 latency. Multiplier is **model-specific**: **×1.75 (+75%) for GPT-4.1**, **≈×2 (+100%) for GPT-5 / 5.2 / 5.4**. Typical for customer support, real-time voice. Budget this as "premium SKU for latency SLA."
- **Batch API (−50%)** — Async workloads: overnight report generation, eval runs, offline RAG indexing. If your agent can tolerate 24h SLA, you're leaving 50% on the table by not using Batch.
- **Data Zone (+10%)** — Compliance insurance: GDPR, HIPAA-adjacent. Pay 10% to guarantee EU-only or US-only processing path.
- **Regional (+~21%)** — Hardest residency guarantee. Required for some regulated EU sectors (finance, healthcare).
- **PTU** — Payback threshold ≈ 30% steady-state utilization. Below that, stick with PAYG.

### 5.11 Cosmos DB Thread Storage — The Hidden Line Item

Foundry Agent Service stores thread / conversation history in **your own Cosmos DB** — not Microsoft's. This is a **$0 charge from Microsoft** but a **real charge from your Cosmos DB bill**. Each thread operation:

- Point read (message by ID): **~1 RU**
- Write (1 KB message): **~5 RUs**
- Vector search query (diskANN, >1,000 vectors): lower RU than full scan

**For a 1,000-turn agent:** ~5K RUs writes + ~1K RUs reads = 6K RUs → **$0.0015** at $0.25/M RUs. Trivial at this scale, but a 1M-turn/day production agent accumulates ~6M RUs/day ≈ $45/month + storage. **Model this separately; it's easy to miss.**

### 5.12 Vercel Platform Pricing — Reference

**Source:** [Vercel Sandbox Pricing](https://vercel.com/docs/vercel-sandbox/pricing), [Vercel Workflow Pricing](https://vercel.com/docs/workflows/pricing), [Fluid Compute Pricing](https://vercel.com/docs/fluid-compute/pricing)

| Service | Price |
|---------|-------|
| **AI Gateway** — model pass-through | **$0 markup** (provider list price) |
| **AI Gateway** — free tier | $5/month credit |
| **AI Gateway** — team-wide ZDR | $0.10 / 1K req (Pro + Enterprise, Apr 8, 2026); BYOK exempt |
| **Sandbox SDK** — Active CPU | $0.128 / hour (Pro / Enterprise) |
| **Sandbox SDK** — Memory | $0.0212 / GB-hour |
| **Sandbox SDK** — Creations | $0.60 per 1M |
| **Sandbox SDK** — Data Transfer | $0.15 / GB |
| **Sandbox SDK** — Storage | $0.08 / GB-month |
| **Workflow SDK** — Steps | $2.50 per 100K steps |
| **Workflow SDK** — Storage | $0.00069 / GB-hour |
| **Fluid Compute** — US East (`iad1` / `cle1` / `pdx1`) | $0.128 / CPU-hour (I/O wait free) |
| **Fluid Compute** — US West (`sfo1`) | $0.177 / CPU-hour |
| **Fluid Compute** — EU (`fra1`) | $0.184 / CPU-hour |
| **Secure Compute** | $6,500 / year + $0.15 / GB |

---

