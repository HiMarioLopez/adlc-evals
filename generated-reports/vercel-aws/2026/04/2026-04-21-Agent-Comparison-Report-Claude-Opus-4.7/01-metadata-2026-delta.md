## 1. Metadata & 2026 Delta

| Field | Value |
|-------|-------|
| **Last Updated** | 2026-04-21T00:00:00Z |
| **Model** | Claude Opus 4.7 |
| **Report Path** | `generated-reports/vercel-aws/2026/04/2026-04-21-Agent-Comparison-Report-Claude-Opus-4.7.md` |
| **Report Version** | 2.0.0 |
| **Methodology** | "Blessed Path" — Officially recommended, out-of-the-box developer experience |
| **Previous Version** | [2026-01-08 (Claude Opus 4.5)](../../2026/01/2026-01-08-Agent-Comparison-Report-Claude-Opus-4.5.md) |
| **Coverage Window** | 2026-01-08 → 2026-04-21 (≈3.5 months) |
| **Live Site** | [adlc-evals.vercel.app/reports/vercel-aws](https://adlc-evals.vercel.app/reports/vercel-aws) |

> 📝 **Source of Truth:** This markdown mirrors the curated, human-validated content published at the live site above. Where the two drift, **the site wins** — this file is regenerated from site data during each refresh.

### Executive Delta: January → April 2026

Both platforms advanced substantially in the first 3.5 months of 2026. This is not a cosmetic refresh — multiple previously-preview components graduated to GA, SDK versions advanced by dozens of releases, a new frontier Anthropic model (Claude Opus 4.7) launched five days before this report was generated, and both vendors materially expanded the "blessed path" surface area with new rows for RBAC, content safety, compliance, and managed knowledge bases.

| Platform | Previous (Jan 8) | Current (Apr 21) | Nature of Change |
|----------|-----------------|------------------|------------------|
| **Vercel Sandbox** | Beta (closed SDK) | **GA** (Jan 30, 2026) — open-source SDK/CLI | Platform-level — 32 vCPU / 64 GB Enterprise tier (Apr 8); Persistent Sandboxes beta (Mar 26); filesystem snapshots GA (Jan 22) |
| **Vercel Workflow** | Beta | **GA** (Apr 16, 2026) | Platform-level — 100M+ runs / 500M+ steps / 1,500+ customers in beta; E2E encryption default (Mar 17); 2× speed improvement (Mar 3); event-sourced architecture; DurableAgent for AI SDK |
| **Vercel Queues** | Did not exist | **GA** (backing Workflow SDK) | New — durable append-only topic log powering Workflow; @vercel/queue; fan-out consumer groups; automatic retries + deduplication |
| **AI SDK** | `ai@6.0.23` | `ai@6.0.168` stable + `7.0.0-beta.111` | Version — 145 patch/minor releases on v6; v7 beta adds `WorkflowAgent`, ESM-only, `@ai-sdk/otel`, `toolNeedsApproval` |
| **AI Gateway** | Unified routing, BYOK | + Team-wide ZDR (Apr 8), Custom Reporting API (Mar 25), OpenAI Responses API (Mar 6), 20+ new models | Capability — team-wide ZDR toggle ($0.10/1K req) routes to 13 ZDR providers; BYOK exempt |
| **Vercel Observability Plus** | Base plan | **Anomaly alerts GA** (Apr 13, 2026) | Capability — 30-day retention, workflow run/step queries (Apr 7) |
| **Vercel Plugin for Coding Agents** | Did not exist | GA (Mar 17, 2026) | New — Claude Code / Cursor / Codex native integration |
| **AgentCore Policy** | Preview | **GA** (Mar 3, 2026) | Status — included in Runtime/Gateway pricing at GA |
| **AgentCore Evaluations** | Preview (4 regions) | **GA** (Mar 31, 2026, 9 regions) | Status + regional — 13 built-in evaluators, Ground Truth, custom Lambda evaluators |
| **AgentCore Runtime** | 11 regions | **14 regions** | Regional — +eu-west-2, eu-west-3, eu-north-1 (Jan 26, 2026 expansion wave); +AG-UI protocol (Mar 13); +`InvokeAgentRuntimeCommand` API (Mar 17) |
| **AWS Agent Registry** | Did not exist | **Preview** (Apr 9, 2026, 5 regions) | New service — 8th AgentCore service; semantic + keyword search, approval workflows, MCP endpoint |
| **AWS Step Functions + AgentCore** | Did not exist | **GA** (Mar 26, 2026) | New — SDK service integration; invoke runtimes with built-in retries, run agents in parallel via Map states, automate agent provisioning as workflow steps |
| **Amazon Bedrock Guardrails** | Existed (models only) | **Applies to AgentCore** (via guardrail ID) | Capability — 6 content filter categories + denied topics, PII redaction, grounding checks, Automated Reasoning; Classic & Standard tiers |
| **Amazon Bedrock Knowledge Bases** | GA for RAG | + GraphRAG, multimodal parsing (BDA), NL→SQL | Capability — native AgentCore integration for managed grounding |
| **Strands SDK (Python)** | `v1.21.0` | `v1.36.0` | Version — 15 releases; `AgentAsTool`, Plugin system, `BedrockModel(service_tier=...)`, Gemini + SageMaker providers |
| **Strands SDK (TypeScript)** | Preview | `v1.0.0-rc.4` (**still RC**) | Status — feature-complete with Python but not yet GA; includes Swarm, Graph, A2A, and `VercelModel` adapter |
| **bedrock-agentcore** | `v1.1.4` | `v1.6.3` | Version — 22 releases; `EvaluationClient`, `ResourcePolicyClient`, `serve_a2a()`, `serve_ag_ui()` |
| **Spring AI AgentCore SDK** | Did not exist | **Java GA** (Apr 14, 2026) | New — third first-class language for AgentCore |
| **Claude model lineup** | Opus 4.5, Sonnet 4.5, Haiku 4.5 | + Opus 4.6 (Feb 5), Sonnet 4.6 (Feb 17), **Opus 4.7 (Apr 16)** | Model — new frontier Opus 4.7 with updated tokenizer (1.0–1.35× inflation) and `effort: 'xhigh'`; Sonnet 4.6 is the new default |

### Terminology Correction

The January 2026 report referenced **"AI Units v2026"** as a Vercel billing unit. Research for this refresh confirmed this term does **not exist** as a public Vercel SKU. This report uses the accurate current terminology: **Fast Data Transfer (FDT)** for CDN/edge traffic (regional pricing) and **AI Gateway Credits** for AI Gateway billing (zero-markup pass-through of provider list prices).

### Region Count Correction

The January 2026 report claimed Vercel operates 21 compute regions. This figure is **wrong** — [Vercel's official regions docs](https://vercel.com/docs/regions) canonically list **20 compute-capable regions** (including Montréal `yul1`, added Jan 20, 2026). `yul1` was absorbed into the 20-region count, not stacked on top of a prior 20-region baseline. This refresh uses the correct figure: **20 compute regions**.

---

