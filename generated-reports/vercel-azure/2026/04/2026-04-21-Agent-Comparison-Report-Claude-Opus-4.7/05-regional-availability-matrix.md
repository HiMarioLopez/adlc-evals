## 4. Regional Availability Matrix

> ⚠️ **Production Consideration:** Azure has broader agent-region coverage than AWS (24 vs 14 Agent Service regions), but narrower than you'd expect — six regions (North Europe, West Europe, Central India, East Asia, Qatar Central, West US 2) have Foundry projects but NO Agent Service. Tool support is also heterogeneous within the 24.

### 4.1 Azure Foundry Agent Service — Feature by Region (April 2026)

**Source:** [Foundry Region Support](https://learn.microsoft.com/en-us/azure/foundry/reference/region-support), [Agent Service Limits & Regions](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/limits-quotas-regions), [Tool Best Practice](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/tool-best-practice)

| Feature | Regions | Notes |
|---------|---------|-------|
| **Agent Service (Prompt agents)** | **24 GA regions** | australiaeast, brazilsouth, canadacentral, canadaeast, eastus, eastus2, francecentral, germanywestcentral, italynorth, japaneast, koreacentral, northcentralus, norwayeast, polandcentral, southafricanorth, southcentralus, southeastasia, southindia, spaincentral, swedencentral, switzerlandnorth, uaenorth, uksouth, westus, westus3 |
| **Hosted Agents (new backend, Apr 22 refresh)** | **4 preview regions** | Australia East · Canada Central · North Central US · Sweden Central · requires `azd ext install azure.ai.agents` v0.1.26-preview+ · per-session hypervisor sandbox · `$HOME`/files persistence |
| **Hosted Agents (legacy ACA backend)** | Broader preview footprint | Requires `azd ext` v0.1.25-preview; **being sunset** — migrate to new backend |
| **Workflow Agents** (multi-agent visual/YAML) | Preview subset | Announced Nov 25, 2025 — still preview Apr 2026 |
| **Code Interpreter tool** | **20 of 24** | NOT in Japan East, South Central US, Southeast Asia, Spain Central |
| **File Search tool** | **22 of 24** | NOT in Italy North, Brazil South |
| **Computer Use tool** | **3 of 24** — East US 2, Sweden Central, South India | Limited preview |
| **Browser Automation tool** | Preview, expanded subset (Playwright Workspaces-backed) | Expanded in Apr 2026 update |
| **ACA Dynamic Sessions** | **38 regions** | Hyper-V isolated; Python / Node / Shell + custom container pools |
| **Foundry Evaluations / Monitoring / Tracing** | Wherever Agent Service is GA | GA Mar 16, 2026 via Foundry Control Plane |
| **Foundry MCP Server** | Global endpoint `mcp.ai.azure.com` | Preview since Mar 20, 2026 |
| **Web Search tool (Bing Grounding)** | All 24 Agent Service regions | ⚠️ Data transfers **outside** compliance boundaries — MS DPA does NOT apply |

### 4.2 Azure OpenAI Model Regional Availability (Regional Standard)

> ✅ Regional Standard · 🌐 Global Standard only (no regional residency) · — Not available

| Region | GPT-5 family | GPT-4.1 | GPT-4o | o4-mini | o3 | o3-mini | o1 | Whisper |
|--------|:------------:|:-------:|:------:|:-------:|:--:|:-------:|:--:|:-------:|
| **East US** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **East US 2** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **South Central US** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | — |
| **West US** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | — |
| **West US 3** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| **Canada East** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| **Brazil South** | ✅ | ✅ | ✅ | 🌐 | 🌐 | 🌐 | — | — |
| **Sweden Central** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **France Central** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| **Germany West Central** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | — |
| **Switzerland North** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| **UK South** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| **Norway East** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | — |
| **Poland Central** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | — |
| **Spain Central** | ✅ | ✅ | ✅ | 🌐 | 🌐 | 🌐 | — | — |
| **Italy North** | ✅ | ✅ | ✅ | 🌐 | 🌐 | 🌐 | — | — |
| **Australia East** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| **Japan East** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| **Korea Central** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | — |
| **Southeast Asia** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | — |
| **South India** | ✅ | ✅ | ✅ | 🌐 | 🌐 | 🌐 | — | — |
| **UAE North** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | — |
| **South Africa North** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | — |

> **GPT-5.4 (frontier, Mar 2026):** Regional Standard ONLY in East US 2, Sweden Central, South Central US, Poland Central.
> **o3-pro / codex-mini:** Global Standard ONLY in East US 2 + Sweden Central.
> **o1 footprint:** Only 10 regions with Regional Standard.

### 4.3 Azure Sovereign Cloud Availability

| Cloud | Portal | Agent Service | AI Search | Notes |
|-------|--------|---------------|-----------|-------|
| **Azure Commercial** | `ai.azure.com` (GA) | ✅ Full | ✅ Full | Primary target |
| **Azure Government (US)** | `ai.azure.us` | ❌ NOT supported | ✅ Limited | US Gov Virginia, US Gov Arizona; no Agents playground, no fine-tuning, no serverless endpoints |
| **Azure China (21Vianet)** | Separate portal | ❌ NOT supported | ✅ Limited | AI Search available (China North 3 has semantic ranker); no Foundry Agent Service |

### 4.4 Vercel Regional Availability (April 2026)

| Feature | Availability | Notes |
|---------|--------------|-------|
| AI SDK 6.x | Global (Edge + Serverless) | Runs anywhere Vercel deploys |
| AI Gateway | Global | Edge-optimized routing, 0% markup, team-wide ZDR GA Apr 8 |
| Fluid Compute | **20 compute regions** | Canonical count per [vercel.com/docs/regions](https://vercel.com/docs/regions); Montréal `yul1` added Jan 20, 2026 |
| Sandbox SDK | **`iad1` only** (Washington, D.C.) | GA Jan 30, 2026; still single-region |
| Workflow SDK | **Execution global, state `iad1` only** | GA Apr 16, 2026 |
| Vercel Queues | **GA** — backing layer for Workflow SDK | Durable append-only topic log |
| Chat SDK | Global | Feb 23, 2026 launch |
| Edge CDN PoPs | **126 PoPs** | Global static/edge reach beyond compute regions |

### 4.5 Critical Deployment Gaps (Azure)

🔴 **Hard Blockers:**
1. **West US 2** — ACA Dynamic Sessions + AI Search available, but **no Agent Service, no Foundry project**
2. **North Europe / West Europe** — Foundry projects + AI Search, but **no Agent Service**. Major gap for EU customers who want to avoid Sweden Central
3. **Central India / East Asia / Qatar Central** — Foundry projects available, **no Agent Service**
4. **Hosted Agents new-backend preview** — Limited to **4 regions** (AU East, CA Central, NC US, SE Central). EU outside Sweden, APAC outside Australia, and all of LATAM have **no Hosted Agents access** during preview. Fortune 500 customers with hard regional residency requirements in these zones cannot use the Apr 22 Hosted Agents refresh today.

🟡 **Partial Coverage:**
5. **Japan East / South Central US / Southeast Asia / Spain Central** — Agent Service GA, but **Code Interpreter tool not available**
6. **Brazil South / Italy North / Spain Central / South India** — Agent Service available but **o3 / o4-mini / o1 are Global Standard only** (no regional data residency for reasoning models)

🟢 **Fully-Stacked Regions** (Agent Service + full model catalog + Code Interpreter + AI Search full + ACA Sessions):
**East US 2** (only region with Computer Use + Sweden Central + South India), **Sweden Central** (best EU option), **Australia East** (best APAC), **UK South**, **France Central**, **Germany West Central**, **Switzerland North**, **Canada East**, **Korea Central**, **UAE North**, **South Africa North**

### 4.6 Comparison Questions

- **Regional breadth:** Azure (24) > Vercel (20 compute + global edge / 126 PoPs) for compute count, but Vercel's edge network wins for global static/CDN latency.
- **Reasoning model geography:** If you need o3-pro or codex-mini in Europe, you're pinned to Sweden Central. GPT-5.4 needs East US 2 / Sweden Central / South Central US / Poland Central. Vercel + AI Gateway routes to whichever upstream has capacity — no regional gating on the Vercel side.
- **Sovereign cloud:** If you're on Azure Gov or 21Vianet, **Agent Service simply doesn't exist** — you drop back to raw Azure OpenAI + your own agent loop.
- **Sandbox latency:** If your agent uses Vercel Sandbox, all code-execution traffic goes to `iad1` regardless of where the agent is deployed. For EU-primary workloads this adds 80–120 ms per code call. Azure's ACA Dynamic Sessions exists in **38 regions** and co-locates with your agent.

---

