## 4. 2026 Unit Economics

### 4.1 Workload Assumptions

Calculations below use the site's canonical workload:

- **Turns:** 1,000
- **Input tokens per turn:** 2,000
- **Output tokens per turn:** 500
- **Active CPU per turn:** 5 seconds

**Model:** Claude Sonnet 4.6 (the current recommended default — same `$3/$15` per MTok as 4.5).

### 4.2 Model Layer Costs

#### Vercel AI Gateway

- **Markup: 0%** (confirmed in docs — provider list price passes through)
- **BYOK vs. managed credentials:** Same per-token cost; difference is billing path only
- **Free tier:** $5/month credit included
- **Team-wide ZDR (Apr 8, 2026):** Pro / Enterprise single toggle, $0.10/1K req; routes to 13 ZDR providers; BYOK exempt
- **Top models by usage (Apr 7, 2026):** Gemini 3 Flash (30.1%), Claude Opus 4.6 (16.3%), Grok 4.1 Fast (8.4%), Claude Sonnet 4.6 (7.7%), GPT-5.4 Mini (3.8%)

#### Amazon Bedrock

Four pricing tiers + four service tiers:

**Pricing tiers:**
- **On-Demand:** Pay per token, no commitment
- **Provisioned Throughput:** Reserved capacity with commitment discounts
- **Batch Mode:** 50% discount for async processing
- **Prompt Caching:** Up to 90% cost reduction (5-minute or 1-hour TTL)

**Service tiers (accessible via Strands `BedrockModel(service_tier=...)`):**
- **Priority:** +75% premium for latency-sensitive workloads
- **Standard:** Baseline
- **Flex:** −50% discount for batch agent work
- **Reserved:** Commitment-based pricing

### 4.3 Claude 4.x Pricing — April 2026 (per 1M tokens)

| Model | Input | Output | Cache Write 5m | Cache Write 1h | Cache Read | Tier | Notes |
|-------|-------|--------|----------------|----------------|------------|------|-------|
| **Claude Opus 4.7** ⭐ (Apr 16, 2026) | $5.00 | $25.00 | $6.25 | $10.00 | $0.50 | flagship | ⚠️ New tokenizer: **1.0–1.35× inflation** vs 4.6; adds `effort: 'xhigh'`; adaptive thinking |
| Claude Opus 4.6 (Feb 5, 2026) | $5.00 | $25.00 | $6.25 | $10.00 | $0.50 | flagship | 1M-token context; adaptive thinking |
| Claude Opus 4.5 (Nov 2025) | $5.00 | $25.00 | $6.25 | $10.00 | $0.50 | flagship | — |
| **Claude Sonnet 4.6** ⭐ (Feb 17, 2026) | $3.00 | $15.00 | $3.75 | $6.00 | $0.30 | balanced | **Current recommended default**; OSWorld-Verified: 72.5%, SWE-bench Verified: 79.6% |
| Claude Sonnet 4.5 (Sep 2025) | $3.00 | $15.00 | $3.75 | — | $0.30 | balanced | Baseline from Jan 8 — unchanged |
| Claude Haiku 4.5 (Sep 2025) | $1.00 | $5.00 | $1.25 | — | $0.10 | fast | Batch: $0.50 / $2.50 |

> **Opus 4.7 Tokenizer Warning:** Claude Opus 4.7's updated tokenizer produces 1.0–1.35× more tokens for the same input vs. Opus 4.6. Per-token rate is unchanged at $5/$25 per MTok, but effective cost may be 0–35% higher for equivalent prompts. Cost calculators should model this inflation explicitly.

**Sources:**
- [Claude Opus 4.7 Launch Blog](https://aws.amazon.com/blogs/aws/introducing-anthropics-claude-opus-4-7-model-in-amazon-bedrock/)
- [Claude Opus 4.5 Launch Blog](https://aws.amazon.com/blogs/machine-learning/claude-opus-4-5-now-in-amazon-bedrock/)
- [Anthropic Pricing Docs](https://platform.claude.com/docs/en/docs/about-claude/pricing)

### 4.4 Agent Execution Cost — 1,000 Turns (Claude Sonnet 4.6)

#### Vercel Stack

| Component | Calculation | Cost |
|-----------|-------------|------|
| Model (Sonnet 4.6 via AI Gateway, 0% markup) | 2M input × $3 + 0.5M output × $15 | **$13.50** |
| Sandbox SDK — Active CPU (I/O free) | 1,000 turns × 5s × $0.128/hr | $0.18 |
| Sandbox SDK — Provisioned Memory | 4 GB × 1.39 hrs × $0.0212/GB-hr | $0.12 |
| Sandbox SDK — Creations | 1,000 × $0.60/1M | $0.0006 |
| Network (1 GB) | 1 GB × $0.15 | $0.15 |
| **Total (Sandbox path)** | | **≈ $13.95** |
| _Optional: Workflow Steps_ | 10 steps/turn × 1,000 × $2.50/100K | $0.25 |

#### AWS Stack

| Component | Calculation | Cost |
|-----------|-------------|------|
| Model (Sonnet 4.6 on Bedrock) | 2M input × $3 + 0.5M output × $15 | **$13.50** |
| AgentCore Runtime — CPU | 5,000s × $0.0895/hr | $0.12 |
| AgentCore Runtime — Memory | 4 GB × 1.39 hrs × $0.00945/GB-hr | $0.05 |
| Gateway — Invocations | 2,000 tool calls × $0.005/1K | $0.01 |
| Memory — Short-term events | 1,000 events × $0.25/1K | $0.25 |
| **Total (Standard tier)** | | **≈ $13.93** |
| _With Flex tier (−50% on model)_ | Model × 0.5 | **≈ $7.18** |
| _With Priority tier (+75% on model)_ | Model × 1.75 | **≈ $24.42** |

### 4.5 Cost Comparison Summary

| Stack | Total (1,000 turns, Sonnet 4.6) | Model % | Infrastructure % |
|-------|--------------------------------|---------|------------------|
| Vercel (Sandbox path) | $13.95 | 97% | 3% |
| AWS (Standard tier) | $13.93 | 97% | 3% |
| AWS (Flex tier, batch) | $7.18 | 94% | 6% |
| AWS (Priority tier, +75%) | $24.42 | 98% | 2% |

> **Key insight:** Infrastructure costs remain a small fraction of total TCO (≈3%), but Bedrock's new service tiers (Priority / Standard / Flex, GA via Strands v1.35.0) give AWS a meaningful cost lever for batch workloads (−50%) and a latency lever for user-facing workloads (+75%). Vercel's AI Gateway's 0% markup means no gateway fee is paid on top of provider pricing.

### 4.6 The "Effort" Tax: Anthropic Extended Thinking

Anthropic's `effort` parameter (originally beta) is **GA on Bedrock** via the `anthropic_beta: ["effort-2025-11-24"]` header. Levels have expanded since the January baseline:

| Level | Token Impact | Cost Impact (baseline: high) | Available On |
|-------|-------------|------------------------------|--------------|
| `low` | ~30–50% of high | Lowest | All Claude 4.5+ |
| `medium` | ~60–70% of high | Moderate | All Claude 4.5+ |
| `high` | Baseline | Baseline | All Claude 4.5+ |
| **`xhigh`** ⭐ | Fills gap between high and max | 1.5–2× high | **Opus 4.7 only** (Apr 16, 2026) |
| `max` | Highest | 2–3× total cost | Opus series |

**Opus 4.7 specifically** uses **adaptive thinking** — `budget_tokens` is no longer used; the model dynamically adjusts reasoning depth based on task complexity.

### 4.7 Security/Network Cost Comparison

| Scenario | Vercel Secure Compute | AWS (NAT Gateway + PrivateLink, 3 AZ) |
|----------|----------------------|---------------------------------------|
| **Annual base cost** | $6,500 | ~$1,446 (NAT: $1,183 + PrivateLink: $263) |
| **Data (100 GB/mo × 12)** | $180 ($0.15/GB) | $66 ($0.055/GB combined) |
| **Total annual (100 GB/mo)** | **$6,680** | **~$1,512** |
| **Total annual (1 TB/mo)** | **$8,300** | **~$2,106** |

> ⚠️ **Trade-off (unchanged):** AWS is 3–4× cheaper but requires VPC configuration, IAM policies, and operational overhead. Vercel Secure Compute is a managed solution with simpler setup — and is now **self-serve** from the dashboard (Jan 7, 2026) rather than requiring sales engagement.

**Pricing unchanged since Jan 8 baseline:** All AWS network rates (NAT $0.045/hr + $0.045/GB; PrivateLink $0.01/hr per ENI + $0.01/GB; cross-region transfer $0.02/GB) and Secure Compute ($6.5K/year + $0.15/GB) are unchanged.

### 4.8 New Cost Line: AgentCore Browser Profile Storage

**Effective April 15, 2026** — AgentCore Browser Profile artifacts (cookies, local storage) stored in S3 are billed at **standard S3 Standard rates**. This was free during ramp-up and is a new cost line that did not exist at the January baseline. Agents using persistent browser profiles should budget for this as a small but non-zero line item.

---

