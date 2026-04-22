## 10. Adoption Metrics (GitHub API Data — April 21, 2026)

> 📝 **Methodological Note:** Metrics are point-in-time. Issue ratios are (Open / Closed) in the last 60 days (Feb 20 – Apr 21, 2026) unless marked. Microsoft Agent Framework 1.0 shipped Apr 3, 2026 — its metrics are early and not yet statistically stable.

### 10.1 Agent Frameworks

| Repository | Latest Tag | Language | Forks | Open Issues | Open/Closed 60d | Signal |
|------------|-----------|----------|:-----:|:-----------:|:---------------:|--------|
| [vercel/ai](https://github.com/vercel/ai) | `ai@6.0.168` (stable) / `7.0.0-beta.111` (beta) | TypeScript | ~3,900 | ~950 | 420 / 448 = **0.94** (Healthy) | Vercel AI SDK — primary agent framework |
| [microsoft/agent-framework](https://github.com/microsoft/agent-framework) | Python `1.0.1` · .NET `Microsoft.Agents.AI 1.1.0` | Python + C# | new (GA Apr 3, 2026) | ~60 | 80 / 45 = **1.78** (Early GA) | **Primary Azure agent framework** — unified SK + AutoGen |
| [microsoft/semantic-kernel](https://github.com/microsoft/semantic-kernel) | `python-1.41.2` · `dotnet-1.74.0` | Python + C# + Java | ~4,200 | ~410 | 180 / 230 = **0.78** (Maintained) | Superseded by MAF — still shipping |
| [microsoft/autogen](https://github.com/microsoft/autogen) | `python-v0.7.5` (Sep 30, 2025) | Python | ~5,800 | ~720 | 95 / 40 = **2.38** (Slowing) | **Maintenance mode** — community fork is AG2 |
| [ag2ai/ag2](https://github.com/ag2ai/ag2) | `v0.4.4` | Python | ~2k | n/a | — | Community AutoGen fork (MIT) |

### 10.2 Infrastructure / SDK

| Repo | Latest Version | Role |
|------|----------------|------|
| [Azure/azure-sdk-for-python `sdk/ai/azure-ai-projects`](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/ai/azure-ai-projects) | `azure-ai-projects 2.1.0` | Foundry project + agent infra SDK |
| [Azure/azure-sdk-for-python `sdk/ai/azure-ai-agents`](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/ai/azure-ai-agents) | `azure-ai-agentserver-responses_1.0.0b4` | Foundry Agent Service wrapper |
| [Azure/azure-sdk-for-net](https://github.com/Azure/azure-sdk-for-net) | `Azure.AI.Projects 2.0.0-beta.2` | .NET equivalent |
| [Azure/azure-sdk-for-js](https://github.com/Azure/azure-sdk-for-js) | `@azure/ai-agents 2.0.0-beta.4` | TypeScript equivalent |
| [microsoft-foundry/foundry-samples](https://github.com/microsoft-foundry/foundry-samples) | Rolling `main` | Canonical Hosted Agents patterns |
| [vercel/ai](https://github.com/vercel/ai) (also houses Workflow) | `ai@6.0.168` / `7.0.0-beta.111` | AI SDK + Workflow SDK |
| [vercel/sandbox](https://github.com/vercel/sandbox) (via `@vercel/sandbox` npm) | GA package | Sandbox SDK |

### 10.3 Activity Signals

**Vercel Agent Stack:**
- Sandbox GA (Jan 30, 2026) — open-source SDK/CLI
- Workflow GA (Apr 16) — 100M+ runs in beta
- AI SDK v7 beta active with `WorkflowAgent`
- Chat SDK launch (Feb 23) — unified multi-platform
- 30%+ of deploys now agent-initiated (Apr 9 blog)

**Microsoft Foundry:**
- Foundry Agent Service next-gen GA (Mar 16, 2026) — Responses API
- Agent Framework 1.0 GA (Apr 3) — unified SK + AutoGen
- Foundry Evaluations + Monitoring + Tracing GA (Mar 16)
- Foundry MCP Server preview (Mar 20) at `mcp.ai.azure.com`
- Microsoft Entra Agent ID (Apr 8 expansion) — first-class agent identity
- Durable Task Scheduler Consumption SKU GA (Mar 31)

**Azure OpenAI + Foundry Models:**
- GPT-5.4 GA (Mar 5) — $2.50 / $15 per 1M, 1.05M context, native computer-use
- GPT-5.4 mini + nano GA (Mar 17) — $0.75 / $4.50 mini, $0.20 / $1.25 nano, agent-workhorse tier
- GPT-5.3-Codex GA (Feb 5) — $1.75 / $14 per 1M, coding + reasoning unified
- MAI-Transcribe-1, MAI-Voice-1, MAI-Image-2 in Foundry (Apr 2)
- 11,000+ models in Foundry Models catalog (up from ~1,900 mid-2025)

### 10.4 Ecosystem Health Observations

- **MAF 1.0 launched 3 weeks ago** — too early for a meaningful issue-ratio read. Release cadence on the repo (GA + 1.0.1 + active PRs within 8 days) suggests an engaged team.
- **AutoGen velocity has dropped** since November 2025 as Microsoft shifted effort to MAF. Community users are migrating to either AG2 (backward-compat) or MAF (forward-compat).
- **SK still shipping monthly** — `dotnet-1.71.0` (Feb 16), `dotnet-1.74.0` (Mar 20), `python-1.41.2` (Apr 8). Migration is recommended, not required. Existing SK customers won't hit a wall.
- **AI SDK 6.x** has the highest per-commit delta of any agent framework in the comparison set — reflects Vercel's faster iteration cycle.

---

