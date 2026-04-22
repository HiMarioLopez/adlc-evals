## 8. Adoption Metrics (GitHub API Data)

### 8.1 Repository Statistics — April 2026

| Repository | Latest Tag | Ecosystem | Signal |
|------------|-----------|-----------|--------|
| `vercel/ai` | `ai@6.0.168` (stable) · `7.0.0-beta.111` (beta) | Fullstack (React, Next.js, Svelte, Vue) | ~3,900 forks · ~950 open issues · 420 opened / 448 closed in trailing 60d (ratio **0.94**, healthy) · 145 patch/minor releases since Jan 8; v7 beta actively shipping |
| `strands-agents/sdk-python` | `v1.36.0` | Backend/ML (Python, boto3) | ~780 forks · ~155 open issues · 180 opened / 140 closed in 60d (ratio **1.29**, active) · 15 releases; Plugins, AgentAsTool, service tiers |
| `strands-agents/sdk-typescript` | `v1.0.0-rc.4` | Backend/ML (TypeScript) | ~120 forks · ~40 open issues · 65 opened / 42 closed in 60d (ratio **1.55**, pre-GA) · 13 releases; **still RC, not GA** |
| `aws/bedrock-agentcore-sdk-python` | `v1.6.3` | Infrastructure (Python) | ~85 forks · ~22 open issues · 48 opened / 31 closed in 60d (ratio **1.55**, growing) · 22 releases; Evaluations, ResourcePolicy, A2A, AG-UI |

> 📝 Ratio = Open/Closed issues created in trailing 60-day period. Metrics approximated as of April 21, 2026.

### 8.2 Activity Signals

**Vercel Agent Stack:**
- Sandbox GA (Jan 30, 2026) — open-source SDK/CLI
- Workflow GA (Apr 16) — 100M+ runs in beta
- AI SDK v7 beta active with `WorkflowAgent`
- Chat SDK launch (Feb 23) — unified multi-platform
- 30%+ of deploys now agent-initiated (Apr 9 blog)

**AWS Bedrock AgentCore:**
- Policy GA (Mar 3, 2026) — 13 regions
- Evaluations GA (Mar 31) — 9 regions, 13 evaluators
- AWS Agent Registry preview (Apr 9) — 8th service
- AG-UI protocol in Runtime (Mar 13)
- Spring AI Java SDK GA (Apr 14)
- Step Functions + AgentCore SDK integration GA (Mar 26)

**Strands Agents:**
- Python v1.36 — `AgentAsTool`, Plugins, service tiers
- TypeScript still RC (v1.0.0-rc.4) as of Apr 21
- `VercelModel` adapter in TS — Language Model Spec v3
- Security: litellm supply-chain pin in v1.33.0

### 8.3 Production Adoption Signals

| Customer | Stack | What it proves |
|----------|-------|----------------|
| **FLORA** (Mar 31) | AI SDK + Workflow `DurableAgent` + Fluid Compute | Full Vercel AI Stack viable for orchestrating 50+ image models without separate queue infra |
| **Durable** (Mar 18) | Vercel Workflows | 3M customers / 6 engineers; 3–4× infra cost reduction vs. self-hosted; parallel AI steps in < 30s |
| **Notion Workers** (Mar 12) | Vercel Sandbox | Untrusted code execution at scale with hard VM isolation and dynamic network policies |
| **Zo Computer** (Apr 17) | Vercel AI Gateway | 20× retry reduction; 99.93% chat success; 38% P99 latency reduction |
| **Southwest Airlines** (Apr 13, AWS Weekly Roundup) | AWS Agent Registry | Named early preview adopter |

**Ecosystem signal (Apr 9, 2026):** Vercel reported 30%+ of deployments are now agent-initiated (up 1,000% in 6 months), with Claude Code at 75% of agent deployments. Projects deployed by agents are 20× more likely to call AI inference providers than human-deployed projects.

### 8.4 Git Tags Analyzed

| Repository | Tag | Date |
|------------|-----|------|
| `vercel/ai` (stable) | `ai@6.0.168` | 2026-04-16 |
| `vercel/ai` (beta) | `ai@7.0.0-beta.111` | 2026-04-17 |
| `aws/bedrock-agentcore-sdk-python` | `v1.6.3` | 2026-04-16 |
| `strands-agents/sdk-python` | `v1.36.0` | 2026-04-17 |
| `strands-agents/sdk-typescript` | `v1.0.0-rc.4` | 2026-04-17 |

---

