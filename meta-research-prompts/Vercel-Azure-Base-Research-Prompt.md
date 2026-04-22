# ROLE

Act as a Senior Principal Cloud Architect. Produce a definitive technical evaluation of **Vercel's Agent Stack** vs. **Microsoft Azure's Agent Stack**.

> 📅 **Coverage window:** This prompt is calibrated to April 2026. Use it to produce reports dated 2026-04 or later. This is the initial baseline (v1.0.0) for the Azure comparison; sister AWS prompt (`Vercel-AWS-Base-Research-Prompt.md`) is at v3.0.0.

## ARCHITECTURAL CLARIFICATION

Both platforms have a **two-layer architecture**. Compare like-for-like:

| Layer | Vercel | Azure |
|-------|--------|-------|
| **Agent Framework** (SDK for building agents) | AI SDK 6.x (`ToolLoopAgent`, tools, streaming) — v7 beta available | **Microsoft Agent Framework 1.0** (`Agent`, tools, `SequentialBuilder`, `HandoffOrchestration`, `GraphFlow`) — unified successor to Semantic Kernel + AutoGen |
| **Infrastructure** (Runtime, memory, deployment) | Fluid Compute + Sandbox SDK (GA) + Workflow SDK (GA) + AI Gateway + Chat SDK | **Microsoft Foundry Agent Service** (next-gen GA Mar 16, 2026 on Responses API) + Foundry Models catalog + Foundry Control Plane + Foundry Evaluations + Foundry MCP Server |

> ⚠️ **Key Insight (April 2026):** Microsoft unified Semantic Kernel and AutoGen into a single SDK — **Microsoft Agent Framework 1.0** (GA Apr 3, 2026). From the GA blog: *"When we introduced Microsoft Agent Framework last October, we set out to unify the enterprise-ready foundations of Semantic Kernel with the innovative orchestrations of AutoGen into a single, open-source SDK."* Both parent SDKs remain in maintenance but all new development targets Agent Framework. This is analogous to how Vercel's AI SDK handles agent logic while Vercel's platform (Fluid Compute, Sandbox, Workflow) provides infrastructure.

> 🎉 **The April 2026 Azure story in one paragraph:** The next-generation **Foundry Agent Service** (GA Mar 16, 2026) replaced the Assistants API-based runtime with a **Responses API-based runtime** (wire-compatible with OpenAI's Agents SDK). The old Assistants API sunsets **August 26, 2026**. **Microsoft Agent Framework 1.0** (GA Apr 3, 2026) is the blessed framework, with migration guides from both Semantic Kernel and AutoGen. **Foundry Evaluations, Monitoring & Tracing** reached GA on Mar 16, 2026 with OTel-based distributed tracing. **Hosted Agents** (managed container runtime for external frameworks like LangGraph and MAF) are in public preview in 24 regions. The umbrella brand was renamed from "Azure AI Foundry" to "Microsoft Foundry" at Ignite 2025 (Nov 18, 2025).

```python
# Azure Pattern: Agent Framework = Agent SDK, Foundry Agent Service = Infrastructure
from agent_framework import Agent
from agent_framework.foundry import FoundryChatClient
from azure.ai.agentserver.agentframework import from_agent_framework
from azure.identity.aio import DefaultAzureCredential

agent = Agent(                                    # Agent framework layer
    client=FoundryChatClient(
        project_endpoint="https://<project>.services.ai.azure.com",
        model="gpt-4.1-mini",
        credential=DefaultAzureCredential(),
    ),
    name="HelloAgent",
    instructions="You are a friendly assistant.",
)

# Deploy as a hosted agent on Foundry Agent Service (infrastructure layer)
server = from_agent_framework(agent)
await server.run_async()
```

```typescript
// Vercel Pattern: AI SDK = Agent Framework, Platform = Infrastructure
import { ToolLoopAgent } from 'ai';

const agent = new ToolLoopAgent({  // Agent framework layer
  model: 'anthropic/claude-sonnet-4.6',
  tools: { weather: weatherTool },
});
// Deployed on Vercel Fluid Compute / Sandbox (Infrastructure layer)
```

## METHODOLOGY: "BLESSED PATH" COMPARISON

> 🎯 **Core Principle:** On both platforms, you can build agents a billion different ways. This assessment focuses on the **recommended, out-of-the-box experience** — the "golden path" each company promotes for developer experience.

### What We're Comparing

| Criteria | Definition |
|----------|------------|
| **Officially Recommended** | The approach featured in getting-started guides, quickstarts, and official tutorials |
| **Tools Included** | SDKs, libraries, and infrastructure bundled or promoted by the platform |
| **Developer Experience First** | Minimal boilerplate, sensible defaults, batteries-included |
| **Not Custom/DIY** | Avoid comparing hand-rolled solutions or third-party alternatives unless officially endorsed |

### Blessed Path per Platform

| Platform | Agent Framework | Infrastructure | Model Access | Source of Truth |
|----------|-----------------|----------------|--------------|-----------------|
| **Vercel** | AI SDK 6.x (`ToolLoopAgent`) + `WorkflowAgent` for durable runs | Vercel Platform (Fluid Compute, Sandbox GA, Workflow GA, Chat SDK) | AI Gateway (0% markup, team-wide ZDR GA) | [Vercel AI SDK Docs](https://sdk.vercel.ai), [Vercel Changelog](https://vercel.com/changelog), [Workflow Pricing](https://vercel.com/docs/workflows/pricing) |
| **Azure** | **Microsoft Agent Framework 1.0** (`Agent`, `SequentialBuilder`, `HandoffOrchestration`, `GraphFlow`) — unified SK+AutoGen successor | **Microsoft Foundry Agent Service** (next-gen Responses API, Hosted Agents preview, Evaluations GA, Tracing GA) + Foundry MCP Server + Foundry Control Plane | **Azure OpenAI** (Global / Data Zone / Regional / PTU / Batch) + **Foundry Models** catalog (DeepSeek, Llama, Mistral, MAI-\*, Phi, 11,000+ models) | [Microsoft Foundry Docs](https://learn.microsoft.com/en-us/azure/foundry/), [Agent Framework Docs](https://learn.microsoft.com/en-us/agent-framework/), [Foundry Pricing](https://azure.microsoft.com/en-us/pricing/details/foundry-agent-service/) |

### What to Exclude

- ❌ Raw `azure-openai` Python client calls (unless no higher-level abstraction exists)
- ❌ Third-party orchestration frameworks (LangChain, LlamaIndex, CrewAI) unless officially integrated
- ❌ Custom infrastructure setups (self-hosted AKS, raw VMs, ACI)
- ❌ Legacy APIs: **Assistants API** (sunset Aug 26, 2026), classic Azure OpenAI Assistants, `azure-ai-inference` package (retires May 30, 2026 — migrate to `openai` package)
- ❌ Semantic Kernel standalone and AutoGen standalone for new projects — both are now recommended migration targets to Microsoft Agent Framework

### Validation Questions

When documenting a capability, ask:

1. **Is this the official recommendation?** Check MS Learn quickstart guides and "Getting Started" docs at `learn.microsoft.com/en-us/azure/foundry/` and `learn.microsoft.com/en-us/agent-framework/`.
2. **Is there a simpler way?** If a 10-line solution exists, don't document the 100-line alternative.
3. **Would the Microsoft DevRel / Foundry team demo this?** If it's not demo-worthy at Build/Ignite, it's probably not the blessed path.
4. **Is this on Agent Framework 1.0+?** If the sample uses Semantic Kernel alone or AutoGen alone, check if Agent Framework has superseded it.

## MCP TOOLCHAIN UTILIZATION (MANDATORY)

To ensure "Hard Facts Only," you MUST use these tools:

1. **GitHub MCP:**
   - **Agent Frameworks:**
     - Analyze `vercel/ai` (AI SDK 6.x, TypeScript — current stable `ai@6.0.168`+; v7 beta at `7.0.0-beta.111`+) for `ToolLoopAgent`, tools, streaming, `WorkflowAgent`.
     - Analyze `microsoft/agent-framework` (current `1.0.1` Python, `Microsoft.Agents.AI 1.1.0` .NET — both GA since Apr 3, 2026) for `Agent`, `SequentialBuilder`, `HandoffOrchestration`, `GraphFlow`, `ConcurrentBuilder`.
     - Analyze `microsoft/semantic-kernel` (current `dotnet-1.74.0` / `python-1.41.2`) as the **superseded** framework — cover what changed and the migration path.
     - Analyze `microsoft/autogen` (current `python-v0.7.5`) as the **superseded** orchestration framework — cover AutoGen 0.4's Core/AgentChat/Extensions architecture and how it was folded into Agent Framework.
   - **Infrastructure SDKs:**
     - Analyze Vercel Sandbox SDK (`@vercel/sandbox`) — **GA since Jan 30, 2026** — for code execution, filesystem snapshots (Jan 22, 2026), persistent sandboxes (beta Mar 26), Enterprise 32 vCPU / 64 GB configs (Apr 8).
     - Analyze Vercel Workflow SDK — **GA since Apr 16, 2026** — for durable workflow support, E2E encryption (Mar 17), custom class serialization (Apr 2), Python SDK beta.
     - Verify `Azure/azure-sdk-for-python` `azure-ai-agents` (current `azure-ai-agentserver-responses_1.0.0b4`, `azure-ai-projects_2.1.0`) for `AIProjectClient`, `create_agent`, `FunctionTool`, `McpTool`, `AzureAIAgentThread`, `runs.stream()`.
     - Verify `microsoft-foundry/foundry-samples` for the canonical Hosted Agents pattern (`from_agent_framework()` + `agent.yaml` + Dockerfile).
   - Note: `azure-ai-agents`/`azure-ai-projects` are the deployment/infrastructure wrappers; agent logic uses **Microsoft Agent Framework 1.0**.
2. **Azure / Microsoft Documentation MCP (via `aws-knowledge_aws___read_documentation` with `learn.microsoft.com` URLs, or direct fetch):**
   - Fetch the GA announcements for Foundry Agent Service (Mar 16, 2026), Agent Framework 1.0 (Apr 3, 2026), Foundry Evaluations/Tracing (Mar 16, 2026).
   - Extract current **Azure OpenAI model pricing** via `azure.microsoft.com/en-us/pricing/details/azure-openai/` — confirm GPT-4.1 ($2/$8), GPT-5 ($1.25/$10), o4-mini ($1.10/$4.40), o3 ($2/$8), GPT-5.3 Codex ($1.75/$14), Priority Processing (+75% premium).
   - Fetch **Foundry Agent Service pricing** (`azure.microsoft.com/en-us/pricing/details/foundry-agent-service/`) — agent orchestration $0, Code Interpreter $0.03/session, File Search $0.10/GB/day.
   - Fetch **Azure Container Apps dynamic sessions pricing** (`azure.microsoft.com/en-us/pricing/details/container-apps/`) — $0.03/session-hour.
   - Fetch **Foundry regional availability** (`learn.microsoft.com/en-us/azure/foundry/reference/region-support`, `…/agents/concepts/limits-quotas-regions`, `…/agents/concepts/model-region-support`) — 24 Agent Service regions.
3. **Vercel MCP:**
   - Query current **AI Gateway** model catalog and confirm **0% markup** on all providers.
   - Query **Fast Data Transfer (FDT)** regional pricing.
   - Fetch current Sandbox / Workflow / Fluid Compute pricing.
4. **Context7:**
   - Cross-reference the current canonical `ToolLoopAgent` example.
   - Look up the latest `agent-framework` `Agent` examples (Python `1.0.1`+, .NET `1.1.0`+).
   - Confirm `azure-ai-agents` tool dispatch pattern (`SubmitToolOutputsAction`, `SubmitToolApprovalAction`).

## OUTPUT FILENAME & PATHING

- YYYY = Current Year
- MM = Current Month
- DD = Current Day

`generated-reports/vercel-azure/{YYYY}/{MM}/{YYYY-MM-DD}-Agent-Comparison-Report-{MODEL}.md`

## STRICT INSTRUCTION: NO QUANTITATIVE RATINGS

If you include a "7/10" or any subjective score, the report is a failure.

- **Format:** Use "Agent Service Regions: 24 (Azure) vs 21 compute regions (Vercel)" or "Lines of Infrastructure-as-Code: [Count]".

## REQUIRED SECTIONS

### 1. Metadata & 2026 Delta

- Last Updated (ISO 8601), Model, and Path.
- Technical Delta: Summary of what's material for Azure in the Nov 2025 → Apr 2026 window. Specifically cover:
  - **Microsoft Foundry rebrand** (Nov 18, 2025, Ignite): "Azure AI Foundry" → "Microsoft Foundry"
  - **Foundry Agent Service next-gen GA** (Mar 16, 2026) — Responses API, BYO VNet, MCP auth expansion, Voice Live preview
  - **Microsoft Agent Framework 1.0 GA** (Apr 3, 2026) — unified SK + AutoGen successor
  - **Foundry Evaluations, Monitoring & Tracing GA** (Mar 16, 2026) — OTel-based distributed tracing
  - **Assistants API sunset** announced for Aug 26, 2026
  - **GPT-5 series GA** (expanded with GPT-5.1/5.2/5.3/5.4 sub-versions through Q1 2026)
  - **GPT-4.1 series** (gpt-4.1, -mini, -nano) fully GA with 1M context, $2/$8 per 1M in/out
  - **o4-mini and o3 GA** (Apr 16, 2026) — reasoning models with Responses API support
  - **Priority Processing** tier (+75% premium) added for GPT-4.1 and GPT-5
  - **MAI models** (MAI-Transcribe-1, MAI-Voice-1, MAI-Image-2) launched Apr 2, 2026
  - **Microsoft Entra Agent ID preview** (Apr 8, 2026) — first-class agent identities with OAuth 2.0 OBO
  - **Foundry MCP Server preview** (Mar 20, 2026) — cloud-hosted MCP endpoint at `mcp.ai.azure.com`
  - **Agent Governance Toolkit OSS release** (Apr 2, 2026) — 7-package runtime security
  - **Multi-agent workflows preview in Agent Service** (Nov 25, 2025) — visual + YAML orchestration
  - **Foundry Guardrails for Agents preview** (Feb 13, 2026) — per-agent content policy
  - **Content Safety Task Adherence API preview** (Nov 18, 2025) — agent-specific misalignment detection
  - **`azd ai agent` CLI preview** (Nov 19, 2025) — local-to-cloud agent publish workflow
  - **Hosted Agents in Agent Service** — preview across 24 regions; blessed deployment uses `from_agent_framework()` + `agent.yaml` + Dockerfile
  - **Mirror Vercel side:** Vercel Sandbox Beta → GA (Jan 30), Vercel Workflow Beta → GA (Apr 16), AI SDK `ai@6.0.23` → `6.0.168`+ (stable) / `7.0.0-beta.111`+ (beta), Claude Opus 4.6 (Feb 5), Sonnet 4.6 (Feb 17), Opus 4.7 (Apr 16), AI Gateway team-wide ZDR (Apr 8), Chat SDK (Feb 23)

### 2. Infrastructure Footprint (Hard Facts)

Populate a side-by-side comparison table covering the **full agent development lifecycle**:

| Capability | Vercel Stack | Azure Stack |
|------------|--------------|-------------|
| **Agent Framework** | AI SDK 6.x (`ToolLoopAgent`, tools, `prepareStep`, `dynamicTool`) + `WorkflowAgent` (durable) | **Microsoft Agent Framework 1.0** (`Agent`, `SequentialBuilder`, `HandoffOrchestration`, `GraphFlow`, `ConcurrentBuilder`, `Executor` primitives) |
| **Model Gateway/Routing** | AI Gateway (0% markup, fallbacks, BYOK, team-wide ZDR GA, Custom Reporting API, 20+ providers) | **Foundry Models** catalog (11,000+ models via MaaS/PAYG + PTU) + **Model Router** (OpenAI ↔ DeepSeek routing, Oct 2025) + Azure OpenAI (Global / Data Zone / Regional / Priority / Batch tiers) |
| **Infrastructure Wrapper** | Vercel Platform (Fluid Compute, Active CPU billing, I/O wait free) | **Foundry Agent Service** (Responses API-based runtime, Hosted Agents preview, `from_agent_framework()` deployment pattern, `agent.yaml` manifest) |
| **Secure Code Execution** | Sandbox SDK **GA** (Firecracker microVMs, TS+Python, 8 vCPU Pro / 32 vCPU Enterprise, Persistent Sandboxes beta, filesystem snapshots) | **Code Interpreter** tool (GA, $0.03/session-hour) + **Azure Container Apps Dynamic Sessions** (GA, Hyper-V isolated, Python/Node.js/Shell, 220s max exec, 37 regions) |
| **Durable Workflows** | Workflow SDK **GA** (`"use workflow"` directive, E2E encrypted, 2× faster, custom class serialization, Python beta, event-sourced) | **Multi-agent Workflows in Agent Service** (preview since Nov 25, 2025 — visual + YAML orchestration on MAF) + **Azure Durable Task Scheduler** (for Functions) |
| **Browser Automation** | Anthropic Computer Use tools (`computer_20250124`, `webSearch_20250305`) + Kernel (Marketplace) | **Browser Automation tool** (preview) + **Computer Use tool** (preview, limited to East US 2 and South India) |
| **Persistent Memory** | External (Redis, DB) or `WorkflowAgent` state | **Foundry Memory** (preview) + **Conversations API** (GA, stateful threads) + **Azure AI Search** (vector + agentic retrieval) + **Cosmos DB** (vector search, customer-owned) |
| **Tool Management/MCP** | `@ai-sdk/mcp` client (stable HTTP/SSE transports, `Experimental_StdioMCPTransport`) | **`McpTool`** (native MCP client in `azure-ai-agents`) + **Foundry MCP Server** (cloud-hosted at `mcp.ai.azure.com`, preview since Mar 20, 2026) + Foundry Tool Catalog (MCP/OpenAPI) |
| **Protocol Support** | MCP | MCP + A2A (preview) + OpenAI Responses API (wire-compatible) |
| **Authorization** | Environment Variables, middleware | **Microsoft Entra Agent ID** (preview Apr 8, 2026) — OAuth 2.0 OBO, Managed Identity federation (TUAMI), agent identity blueprints |
| **Identity/OAuth** | NextAuth/Auth.js, custom | Microsoft Entra ID (GA) + **Foundry Agent Identity** (GA) + **Managed Identity** per agent |
| **Evaluations** | External (bring your own) | **Foundry Evaluations** **GA** (Mar 16, 2026) — OTel tracing, out-of-box evaluators (coherence, relevance, groundedness), custom evaluators, continuous production monitoring |
| **Agent Discovery** | N/A | **Foundry Agent Catalog** (portal + SDK listing for all project agents) |
| **Observability** | AI SDK telemetry (OTEL-compatible, `@ai-sdk/otel` package in v7, stable API), Workflow data in Vercel Observability | **Foundry Monitoring & Tracing** **GA** (Mar 16, 2026, OTel-based) + **Azure Monitor / Application Insights** ($2.30/GB Analytics Logs, $0.50/GB Basic, $0.05/GB Auxiliary) |
| **Multi-Agent** | Compose `ToolLoopAgent` + subagents via `toModelOutput` | MAF `SequentialBuilder`, `ConcurrentBuilder`, `HandoffOrchestration`, `GraphFlow` (all GA in 1.0); AutoGen `Swarm` / `GraphFlow` (legacy path); Foundry Agent Service Multi-agent Workflows (preview) |
| **Chat Integration** | Chat SDK (unified library for Slack, Discord, Teams, WhatsApp, Telegram) | **Microsoft 365 Agents Toolkit** + Teams integration + Copilot Studio distribution channels |
| **Content Safety / Guardrails** | Model-native safety (Claude, OpenAI) + custom middleware | **Foundry Guardrails for Agents** (preview Feb 13, 2026) — Hate/Sexual/Violence/Self-harm/Prompt Shield/Indirect Attack Detection at 4 intervention points + **Content Safety Task Adherence API** (preview, agent misalignment detection) |

**Deep-dive each row with:**

- **Runtime Persistence:** Azure Foundry Agent Service (stateful Conversations API, server-side threads via `AzureAIAgentThread`) vs. Vercel Workflow SDK (durable functions) vs. Vercel Sandbox (ephemeral microVMs).
- **Code Execution:** Compare Sandbox SDK pricing/limits vs. Foundry Code Interpreter ($0.03/session) and ACA Dynamic Sessions ($0.03/session-hour).
- **Context Retrieval:** Vercel `bash-tool` (in-memory/sandboxed filesystem with `just-bash` TypeScript interpreter) vs. Foundry File Search tool ($0.10/GB/day storage, $2.50/1K tool calls).
- **Security Primitives:** List EXACT Microsoft Entra ID scopes and Managed Identity roles vs. Vercel Environment Variables.
- **Protocol Support:** Compare Vercel's MCP Client implementation vs. Azure's **native `McpTool`** in `azure-ai-agents` + Foundry MCP Server (cloud-hosted).
- **Regional Availability:** Document which features are available in which regions (see below).

### 2b. Regional Availability Matrix

> ⚠️ **Production Consideration:** Not all Azure features are available in all regions. Azure has broader agent-region coverage than AWS (24 vs 14) but has sharp gaps — North Europe, West Europe, Central India, East Asia all have Foundry projects but no Agent Service.

**Microsoft Foundry Agent Service Regional Availability (April 2026):**

| Feature | Regions Available | Notes |
|---------|-------------------|-------|
| **Foundry Agent Service (Prompt agents)** | **24 regions** | GA: australiaeast, brazilsouth, canadacentral, canadaeast, eastus, eastus2, francecentral, germanywestcentral, italynorth, japaneast, koreacentral, northcentralus, norwayeast, polandcentral, southafricanorth, southcentralus, southeastasia, southindia, spaincentral, swedencentral, switzerlandnorth, uaenorth, uksouth, westus, westus3 |
| **Hosted Agents** (LangGraph, MAF containers) | **Preview** across 24 Agent Service regions | Deployed via `from_agent_framework()` + `agent.yaml` + Dockerfile |
| **Workflow Agents** (visual/YAML multi-agent) | **Preview** — subset | Since Nov 25, 2025 (Ignite) |
| **Code Interpreter tool** | **20 regions** (subset) | NOT in: Japan East, South Central US, Southeast Asia, Spain Central |
| **File Search tool** | **22 regions** (subset) | NOT in: Italy North, Brazil South |
| **Computer Use tool** | **2 regions** — East US 2 and South India | Limited preview |
| **Browser Automation tool** | **Preview** — subset | Expanded in Apr 2026 update |
| **Foundry Evaluations / Monitoring / Tracing** | **GA** via Foundry Control Plane | Available wherever Agent Service is GA |
| **Foundry MCP Server (cloud-hosted)** | Global endpoint `mcp.ai.azure.com` | Preview since Mar 20, 2026 |
| **Web Search tool** (Bing Grounding) | **All 24** Agent Service regions | ⚠️ Data sent to Bing Search transfers **outside** compliance/geographic boundaries (MS DPA does NOT apply) |

**Azure OpenAI Model Regional Availability (April 2026):**

| Model | Regional Standard Regions | Notes |
|-------|--------------------------|-------|
| **GPT-5** family | Broad regional coverage via Global Standard; 24 Agent Service regions | GPT-5, -mini, -nano GA; registration required |
| **GPT-5.4** | **4 regions** only (East US 2, Sweden Central, South Central US, Poland Central) | Frontier series, Mar 2026 |
| **GPT-4.1** family | Broad regional; 1M context | $2/$8 per 1M in/out (Global) |
| **GPT-4o** | Widest regional footprint | Still supported |
| **o4-mini** / **o3** | Broad regional in full-stack regions | GA Apr 16, 2026 |
| **o3-pro / codex-mini** | Global Standard only — **East US 2 and Sweden Central** exclusively | |
| **o1** | 10 regions (East US, East US 2, West US 3, Canada East, Sweden Central, France Central, Switzerland North, UK South, Australia East, Japan East) | |
| **text-embedding-3-large / -small** | Broad DataZone + Regional Standard | |

**Source:** [Foundry Region Support](https://learn.microsoft.com/en-us/azure/foundry/reference/region-support), [Agent Service Regions](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/limits-quotas-regions), [Model Region Support](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/model-region-support)

**Azure Sovereign Cloud Availability:**

| Cloud | Foundry Portal | Agent Service | AI Search | Notes |
|-------|---------------|--------------|-----------|-------|
| **Azure Commercial** | `ai.azure.com` — GA | ✅ Full | ✅ Full | Primary target |
| **Azure Government (US)** | `ai.azure.us` | ❌ Not supported | ✅ Limited | US Gov Virginia, US Gov Arizona; no Agents playground, no fine-tuning, no serverless endpoints |
| **Azure China (21Vianet)** | Separate portal | ❌ Not supported | ✅ Limited | AI Search available (China North 3 has semantic ranker); no Foundry Agent Service |

**Vercel Regional Availability (April 2026) — Reference:**

| Feature | Availability | Notes |
|---------|--------------|-------|
| AI SDK 6.x | Global (Edge + Serverless) | Runs anywhere Vercel deploys |
| AI Gateway | Global | Edge-optimized routing, 0% markup, team-wide ZDR GA Apr 8, 2026 |
| Fluid Compute | **21 compute regions** | +Montréal (`yul1`) Jan 20, 2026; Active CPU billing (I/O wait free) |
| Sandbox SDK | **`iad1` only** (Washington, D.C.) | GA since Jan 30, 2026; still single-region |
| Workflow SDK | **Execution global, state `iad1` only** | GA since Apr 16, 2026; function execution global, persistence/queue backend `iad1`-only |
| Chat SDK | Global | Feb 23, 2026 launch |

**Critical Deployment Gaps (Azure):**

🔴 **Hard Blockers:**
1. **West US 2** — Has ACA Dynamic Sessions and AI Search, but **no Agent Service and no Foundry project**
2. **North Europe / West Europe** — Foundry projects + AI Search, but **no Agent Service**. Major gap for EU customers who want to avoid Sweden Central
3. **Central India / East Asia / Qatar Central** — Foundry projects available, but **no Agent Service**

🟡 **Partial Coverage:**
4. **Japan East / South Central US / Southeast Asia / Spain Central** — Agent Service GA, but **Code Interpreter tool not available**
5. **Brazil South / Italy North / Spain Central / South India** — Agent Service available but **o3/o4-mini/o1 are Global Standard only** (no regional data residency for reasoning models)

🟢 **Fully-Stacked Regions** (Agent Service + full model catalog + Code Interpreter + AI Search full + ACA Sessions):
**East US 2** (only region with Computer Use), **Sweden Central** (best EU option), **Australia East** (best APAC), **UK South**, **France Central**, **Germany West Central**, **Switzerland North**, **Canada East**, **Korea Central**, **UAE North**, **South Africa North**

**Comparison Questions:**

- Which regions support the full agent stack on each platform?
- What's the latency impact of routing agents to East US 2 / Sweden Central for reasoning models?
- Does Vercel's edge deployment provide lower latency for global users given Azure's fragmented regional coverage?
- How does "Data Zone" (Azure's US/EU routing) compare to Vercel's Fast Data Transfer (FDT) regional pricing?

### 3. 2026 Unit Economics

**Model Layer Costs:**

- **Vercel AI Gateway:** Document **0% markup** (confirmed in docs — provider list price passes through). BYOK and managed credentials both pay provider list price; difference is billing path only.
- **Azure OpenAI — Deployment Tiers:** Global Standard (baseline), Data Zone Standard (+10%), Regional Standard (+~10% on top), Batch API (−50%), **Priority Processing (+75%)** for latency-sensitive agents. PTU (Provisioned Throughput Units) — reserved capacity: monthly ≈ 64% off hourly PAYG, yearly ≈ 70% off.
- **Foundry Models catalog:** MaaS/PAYG billing per 1K tokens; DeepSeek V3.2 ($0.58/$1.68 per 1M), DeepSeek R1 ($1.35/$5.40 per 1M), Llama 4 / Phi-4 / Mistral (DOCUMENTATION GAP — prices render as `$-` in static HTML; verify via Azure Pricing Calculator).

**Agent Execution Costs:**

- **Vercel:** Calculate cost for 1,000 turns using **AI Gateway pass-through** (at provider list price, 0% markup) + **Sandbox SDK** (if used: $0.128/CPU-hr, $0.0212/GB-hr, $0.60/1M creations, $0.15/GB) + **Workflow SDK** ($2.50/100K steps, $0.00069/GB-hr storage) + **Fluid Compute** ($0.128/CPU-hr in US East, I/O wait free).
- **Azure:** Calculate cost for 1,000 turns using **GPT-4.1 Global Standard** ($2/$8 per 1M) OR **GPT-5 Global Standard** ($1.25/$10 per 1M) OR **o4-mini Global** ($1.10/$4.40) + **Foundry Agent Service** ($0 orchestration) + **Code Interpreter** ($0.03/session × 1% hit rate) + **File Search** ($0.10/GB/day) + **Hosted Agents** compute (DOCUMENTATION GAP — vCPU/GiB rates `$-` in static HTML) OR **ACA Dynamic Sessions** ($0.03/session-hour). Add **Cosmos DB** for thread storage (~$0.25/M RU serverless) and **Azure AI Search** ($245.28/SU/month S1 baseline) if RAG is used.

**The "Tier" Tax:** Document how Azure OpenAI deployment tiers affect TCO. Priority Processing adds 75% for latency-sensitive agents; Batch API cuts 50% for async workloads; Data Zone adds ~10% for compliance residency.

**GPT-5.x Tokenizer Note:** GPT-5.3 Codex and GPT-5.4 use updated tokenizers that may produce different token counts vs GPT-4.1. Exact inflation ratios are not publicly documented (DOCUMENTATION GAP). Compare to Vercel side: Claude Opus 4.7 has 1.0–1.35× tokenizer inflation vs Opus 4.6.

**Cosmos DB Thread Storage:** Foundry Agent Service stores thread history in **the customer's own Cosmos DB** — not billed through the Foundry SKU. Each thread message = RU consumption (1 RU for point read, ~5 RUs for 1 KB write). Document as a separate cost line.

**Azure AI Search Pricing:**

| Tier | Monthly Rate/SU | Storage/Partition | Max Indexes |
|------|----------------|-------------------|-------------|
| Free | $0 | 50 MB | 3 |
| Basic | $73.73 | 15 GB (max 45 GB) | 15 |
| Standard S1 | $245.28 | 160 GB (max 1.9 TB) | 50 |
| Standard S2 | $981.12 | 512 GB (max 6 TB) | 200 |
| Standard S3 | $1,962.24 | 1 TB (max 12 TB) | 200/1K HD |

Vector search is **no extra charge** (bundled in SU price). Semantic Ranker: first 1,000 requests/month free, then $5/1K requests. Agentic Retrieval: 50M tokens/month free, then per-token (DOCUMENTATION GAP beyond free tier).

### 4. Agent Stack Deep-Dive

**Vercel Agent Stack:**

- **AI SDK 6.x:** Analyze the `ToolLoopAgent` abstraction with the new `prepareStep`, `callOptionsSchema`, and `prepareCall` options. Cover all three `stopWhen` conditions: `isStepCount(N)`, `hasToolCall(...)`, `isLoopFinished()`.
- **AI SDK v7 beta:** Call out the new `WorkflowAgent` primitive in `@ai-sdk/workflow` for durable/resumable agents, the stable `@ai-sdk/otel` telemetry package, `toolNeedsApproval` for human-in-the-loop, and `uploadFile`/`uploadSkill` provider abstractions.
- **AI Gateway integration:** Document the string shorthand `model: 'openai/gpt-4.1'` (no explicit provider import needed) vs. `gateway('provider/model')` explicit import. Confirm **0% markup** on all providers.
- **Sandbox SDK (GA):** Compare microVM isolation to Foundry Code Interpreter / ACA Dynamic Sessions. Cover Enterprise 32 vCPU / 64 GB, Persistent Sandboxes beta, filesystem snapshots, CLI integration via `vercel sandbox`.
- **bash-tool:** Open-sourced Jan 7, 2026. Analyze filesystem context retrieval; the `just-bash` TS interpreter engine; `experimental_createSkillTool` for Skills support (Jan 21).
- **Workflow SDK (GA):** Compare `"use workflow"` durability to Foundry Multi-agent Workflows. Cover: E2E encryption by default (AES-256-GCM, per-run HKDF-SHA256 keys), event-sourced architecture, custom class serialization, `WorkflowAgent` primitive, Python beta, Vercel Queues as underlying durable queue layer.
- **Chat SDK:** Feb 23, 2026 — unified TS library for Slack, Discord, Teams, WhatsApp, Telegram, and more.
- **Computer Use Tools:** Document `bash_20250124`, `computer_20250124`, `textEditor_20250124`, and the new `webSearch_20250305` Anthropic-native web search tool.

**Azure Agent Stack (Microsoft Agent Framework + Foundry Agent Service):**

- **Microsoft Agent Framework 1.0 (Python `1.0.1`, .NET `Microsoft.Agents.AI 1.1.0`):** Analyze the `Agent` class and its convergence of SK's enterprise plugin model with AutoGen's multi-agent orchestration. Cover:
  - `Agent(client=..., name=..., instructions=..., tools=[...])` — the minimal shape
  - `FoundryChatClient` (Azure) vs. OpenAI/Anthropic clients via adapters
  - **Multi-agent primitives:** `SequentialBuilder(participants=[...]).build()`, `ConcurrentBuilder`, `HandoffOrchestration`, `GraphFlow` (experimental — direct successor to AutoGen's GraphFlow)
  - Streaming via `agent.run_stream(...)` and `workflow.run(..., stream=True)`
  - Migration assistants from Semantic Kernel and AutoGen (official MS Learn guides)
- **Legacy but maintained — Semantic Kernel (`dotnet-1.74.0` / `python-1.41.2`):** The enterprise-grade predecessor. Covers `ChatCompletionAgent`, `[KernelFunction]` / `@kernel_function`, `HandoffOrchestration`, `ChatHistoryAgentThread`. Still shipping, still supported — but all new projects should use Agent Framework.
- **Legacy but maintained — AutoGen 0.4 (`python-v0.7.5`):** The research-origin multi-agent framework. Covers `AssistantAgent`, `Swarm`, `GraphFlow`, `DiGraphBuilder`. AutoGen v0.4 rewrote the API around `autogen-core` + `autogen-agentchat` + `autogen-ext`. Microsoft's fork (this one) is in maintenance mode as of April 2026; the community fork is **AG2** (`ag2ai/ag2` — MIT, backward-compatible with 0.2, forked Nov 11, 2024).
- **Foundry Agent Service (GA):** Analyze the Responses API-based runtime:
  - Canonical deployment pattern: `AIProjectClient` + `create_agent` + `thread` + `message` + `run` + poll loop
  - `FunctionTool` for user-defined functions with auto-generated JSON schema
  - `McpTool` for native MCP client connectivity (no adapter layer needed)
  - `AzureAIAgentThread` — **server-side** persistent threads (survive process restarts)
  - Tool call dispatch: `SubmitToolOutputsAction` + `ToolOutput`; approval flow via `SubmitToolApprovalAction` + `ToolApproval` for MCP tools
  - Streaming: `runs.stream()` with `MessageDeltaChunk` events
  - Hosted Agents preview: `from_agent_framework(agent)` server + `agent.yaml` manifest + Dockerfile → deploy to Foundry-managed container runtime
- **Foundry Evaluations (GA Mar 16, 2026):** Out-of-box evaluators (coherence, relevance, groundedness) + custom evaluators + continuous production monitoring + Prompt Optimizer preview.
- **Foundry Monitoring & Tracing (GA Mar 16, 2026):** OpenTelemetry-based distributed tracing. Wire up via `configure_azure_monitor(connection_string=APPINSIGHTS_CONNECTION_STRING)` — all agent SDK calls auto-traced.
- **Foundry MCP Server (preview Mar 20, 2026):** Cloud-hosted MCP at `mcp.ai.azure.com` with Entra ID auth; no infrastructure to deploy; works with VS Code and any MCP-compliant client.
- **Foundry Guardrails for Agents (preview Feb 13, 2026):** Per-agent content policy — Hate/Sexual/Violence/Self-harm/Prompt Shield/Indirect Attack Detection at 4 intervention points (system prompt, user turn, tool call, agent output).
- **Microsoft Entra Agent ID (preview Apr 8, 2026):** First-class agent identities — agent identity blueprints, OAuth 2.0 OBO flows, Managed Identity federation (TUAMI), unified directory across Copilot Studio and Foundry.
- **Computer Use tool (preview):** Limited to East US 2 and South India regions. Compare against Anthropic Computer Use tools on Vercel.
- **Browser Automation tool (preview):** Azure-native browser automation — compare coverage against Kernel-on-Vercel.
- **MAI Models (Apr 2, 2026):** Microsoft's first-party models — `MAI-Transcribe-1` (SOTA STT, 2.5× faster than Azure Fast, $0.36/hr), `MAI-Voice-1` (TTS, $22/1M chars), `MAI-Image-2` (image gen, $5/1M text tokens).

- List specific Git tags/versions analyzed for both platforms (current: `ai@6.0.168`, Agent Framework Python `1.0.1`, Agent Framework .NET `Microsoft.Agents.AI 1.1.0`, `azure-ai-agents 1.0.0b4`, `azure-ai-projects 2.1.0`, SK `dotnet-1.74.0` / `python-1.41.2`, AutoGen `python-v0.7.5`).

### 5. Observability & Day 2 (Evidence-Based)

- **Telemetry:** Contrast OTEL-compatible spans (Vercel) vs. **Foundry Tracing GA** (OTel-based, pipes to Azure Monitor / Application Insights).
- **Loop-Breaker:** Compare the logic of `maxSteps` (Vercel) vs. Foundry Agent Service's run lifecycle (`requires_action` states, tool approval gates, idle timeout).
- **Evaluations:** Contrast Vercel's external eval approach (bring-your-own, often via Braintrust/Langfuse/custom) vs. **Foundry Evaluations GA** (built-in evaluators + custom evaluators + continuous production monitoring).
- **Guardrails:** External (middleware) on Vercel vs. **Foundry Guardrails for Agents** (preview) on Azure.

### 6. Adoption Metrics (GitHub API Data)

- **Issue Ratio:** (Open / Closed) in the last 60 days.
- **Commit Frequency:** Days since last major architectural change.
- Target repositories:
  - **Vercel side:** `vercel/ai`, `vercel/workflow`, `@vercel/sandbox`
  - **Azure side:** `microsoft/agent-framework`, `microsoft/semantic-kernel`, `microsoft/autogen`, `Azure/azure-sdk-for-python` (filter to `sdk/ai/azure-ai-agents` and `sdk/ai/azure-ai-projects`), `microsoft-foundry/foundry-samples`

## ARCHITECTURAL VISUALS

Generate **parallel diagrams for both platforms** to enable direct visual comparison:

### 1. Agent Lifecycle Sequence Diagrams (Both Platforms)

| Platform | Diagram Focus |
|----------|---------------|
| **Vercel** | `sequenceDiagram`: User → AI SDK `ToolLoopAgent` → AI Gateway → Model → Tool Execution → Response |
| **Azure** | `sequenceDiagram`: User → `AIProjectClient.create_agent` → Thread → Run (`create_and_process` OR manual poll loop) → Tool dispatch (`SubmitToolOutputsAction` → `ToolOutput`) → Response via `MessageDeltaChunk` stream |

**Purpose:** Show how a single agent request flows through each stack, highlighting where orchestration, model calls, and tool execution occur. Emphasize the difference between Vercel's client-driven loop vs. Azure's server-driven run lifecycle.

### 2. Infrastructure Architecture Diagrams (Both Platforms)

| Platform | Diagram Focus |
|----------|---------------|
| **Vercel** | `graph TD`: Vercel Platform (Edge → Fluid Compute → Sandbox microVM → Workflow persistence) + **Secure Compute boundary** (dedicated IPs, VPC peering) |
| **Azure** | `graph TD`: Foundry Agent Service (API Gateway → Agent runtime → tools: Code Interpreter / File Search / Browser / MCP) + **BYO VNet boundary** (private endpoints, Managed Identity, Entra Agent ID) |

**Purpose:** Show the infrastructure layers and security boundaries for deployed agents.

**Security Boundary Comparison:**

| Aspect | Vercel Secure Compute | Azure BYO VNet + Foundry |
|--------|----------------------|--------------------------|
| **Network Isolation** | Dedicated IP addresses per network | VNet with private endpoints + Private Link |
| **Peering** | VPC peering to AWS VPCs (max 50 connections) | VNet peering (any region), ExpressRoute, Azure Virtual WAN |
| **Failover** | Active/Passive network failover across regions | Availability Zones + cross-region DR (Azure Front Door / Traffic Manager) |
| **Policy Layer** | Environment variables, middleware | **Microsoft Entra ID** + **Azure RBAC** + **Entra Agent ID** (preview) + **Foundry Guardrails** (preview) |
| **Pricing** | Enterprise: $6.5K/year + $0.15/GB data transfer | VNet: Free; Private Link: $0.01/hr per endpoint + $0.01/GB; ExpressRoute: varies by tier |

### 3. Tool Execution Flow (Side-by-Side)

| Platform | Diagram Focus |
|----------|---------------|
| **Vercel** | `sequenceDiagram`: Agent → `bash-tool` (in-memory) OR Agent → Sandbox SDK (microVM isolation) |
| **Azure** | `sequenceDiagram`: Agent → Foundry Agent Service runtime → `Code Interpreter` OR `File Search` OR `McpTool` (external MCP server) OR `FunctionTool` (user callback via `SubmitToolOutputsAction` dispatch loop) |

**Purpose:** Compare how each platform handles secure code execution and tool invocation.

**Generate a detailed Tool Execution Capabilities Comparison (collapsible `<details>` section) covering:**

1. **Available Tool Types Table:**
   - Code execution (Sandbox SDK ↔ Foundry Code Interpreter / ACA Dynamic Sessions)
   - Lightweight shell (`bash-tool` ↔ N/A — Azure has no in-process shell interpreter; ACA Dynamic Sessions closest but container-based)
   - Browser automation (Anthropic Computer Use ↔ Azure Browser Automation tool / Computer Use tool)
   - File operations (textEditor tool ↔ Foundry File Search)
   - External tools (@ai-sdk/mcp ↔ `McpTool` + Foundry MCP Server)

2. **Runtime & Language Support Table:**
   - Supported languages (Vercel: Node.js + Python; Azure Code Interpreter: Python + Node.js + Shell via ACA Dynamic Sessions)
   - Isolation mechanism (Firecracker microVM vs Hyper-V container)
   - Pre-installed libraries vs runtime install
   - File size limits (inline upload, Azure Storage integration)
   - Internet/network access configurability

3. **Execution Limits Table:**
   - Default and max timeout durations (Vercel Sandbox: plan-dependent; Azure Code Interpreter: 1-hour session; ACA Dynamic Sessions: 220s max per code run)
   - Memory allocation (per vCPU, total)
   - Concurrent instance limits by plan tier

4. **Pricing Model Table:**
   - CPU/compute hourly rates (Sandbox SDK $0.128/CPU-hr vs ACA $0.000024/vCPU-s ≈ $0.086/vCPU-hr)
   - Memory (GB-hour) rates
   - Per-invocation/creation fees (Sandbox $0.60/1M creations vs ACA ~$0.03/session-hour)
   - Network egress costs

5. **`bash-tool` vs Foundry Code Interpreter Analysis:** Highlight the key differentiator:
   - Execution model (pure TS interpreter vs real Python runtime)
   - Shell access (simulated via `just-bash` vs full Python/Node interpreter)
   - Use cases (lightweight context retrieval vs full data analysis)
   - Overhead (near-zero vs container warm-start ~subsecond)

### Optional: Combined Comparison Diagram

A single `graph LR` showing both stacks side-by-side with equivalent components aligned:

```
Vercel Stack                ↔           Azure Stack
────────────────────────────────────────────────────────
AI SDK 6.x                  ↔    Microsoft Agent Framework 1.0
AI Gateway                  ↔    Azure OpenAI + Foundry Models
Fluid Compute               ↔    Foundry Agent Service Runtime
Sandbox SDK                 ↔    Code Interpreter / ACA Dynamic Sessions
Workflow SDK                ↔    Multi-agent Workflows (preview)
@ai-sdk/mcp                 ↔    McpTool + Foundry MCP Server
AI SDK telemetry            ↔    Foundry Tracing GA + Azure Monitor
External evals              ↔    Foundry Evaluations GA
```

## TECHNICAL CONSTRAINTS

- Citations: Every claim MUST link to source docs found via MCP or Web.
- If data is not in MCP or Web, write "DOCUMENTATION GAP: [Feature Name]".
- **Azure pricing gotcha:** Azure's pricing pages are JavaScript-rendered SPAs. Static HTML fetches return `$-` placeholders. When you encounter `$-` in a static fetch, flag as "DOCUMENTATION GAP — verify via Azure Pricing Calculator at `azure.microsoft.com/en-us/pricing/calculator/`" rather than guessing. The following pricing data is confirmed missing from static HTML and needs Pricing Calculator or Azure Retail Prices API verification:
  - GPT-5.1 / 5.2 / 5.3 sub-series per-token rates (beyond GPT-5.3 Codex Global confirmed at $1.75/$14 per 1M)
  - Foundry Agent Service Hosted Agents vCPU/GiB-hour rates
  - Foundry Agent Service Web Search / Custom Search / Deep Research rates
  - Llama 4 / Phi-4 per-token rates
  - Mistral text model rates
  - AI Search Agentic Retrieval beyond free tier
  - Azure Functions Durable Task Scheduler rates
  - Azure Monitor Prometheus per-sample rate

## METHODOLOGY: HANDLING ECOSYSTEM ASYMMETRY

The comparison involves **full agent stacks** targeting different ecosystems:

| Aspect | Vercel Agent Stack | Azure Stack (Agent Framework + Foundry) |
|--------|--------------------|-----------------------------------------|
| **Model Layer** | AI Gateway (unified API, BYOK, 0% markup) | Azure OpenAI + Foundry Models catalog (11,000+ models) |
| **Primary Languages** | TypeScript (first-class), Python (backends) | **Python + C# (.NET) both first-class**; Java via Spring AI; JavaScript/TypeScript via `@azure/ai-agents` |
| **Target Ecosystem** | Fullstack + Backend (Next.js, FastAPI, Flask, Express) | **Enterprise Microsoft ecosystem** (Azure, Microsoft 365, Copilot Studio, Teams, Power Platform) |
| **Framework Integration** | React hooks, RSC, Svelte, Vue + Python backends | ASP.NET Core (.NET), Python (FastAPI), Copilot Studio distribution, Teams apps |
| **Code Execution** | Sandbox SDK (TS + Python) | Foundry Code Interpreter (Python) + ACA Dynamic Sessions (Python/Node.js/Shell) |
| **Durability** | Workflow SDK (`"use workflow"`) | Multi-agent Workflows (preview, visual + YAML) + Durable Task Scheduler |
| **Memory** | External (bring your own) | Foundry Memory (preview) + Conversations API (GA) + Azure AI Search + Cosmos DB |
| **Identity** | NextAuth/Auth.js, custom | **Microsoft Entra ID** (GA) + **Entra Agent ID** (preview) — deepest enterprise identity integration of any cloud |

**Sources:**

- [Vercel Backends](https://vercel.com/docs/frameworks/backend) — FastAPI, Flask, Express support
- [Microsoft Agent Framework](https://learn.microsoft.com/en-us/agent-framework/) — unified SK + AutoGen SDK

**Recommendation for Fair Comparison:**

1. **Feature Parity:** Map equivalent capabilities across stacks:
   - AI Gateway ↔ Azure OpenAI + Foundry Models (model access)
   - `ToolLoopAgent` ↔ Agent Framework `Agent`
   - Sandbox SDK ↔ Foundry Code Interpreter / ACA Dynamic Sessions
   - Workflow SDK ↔ Multi-agent Workflows (preview)
   - Computer Use tools ↔ Azure Computer Use tool / Browser Automation tool
   - @ai-sdk/mcp ↔ `McpTool` + Foundry MCP Server
2. **Language Primacy:** Acknowledge Azure's **dual Python/C# primacy** vs Vercel's TypeScript-first approach. Show the SAME hello-world in TS (Vercel) + Python (Azure) + C# (Azure) where space permits.
3. **DX Comparison:** Vercel optimizes for frontend/fullstack DX. Azure optimizes for enterprise integration (Entra, Teams, Copilot Studio, Power Platform, M365).
4. **Regional Breadth vs Latency:** Azure has **24 Agent Service regions vs Vercel's 21 compute regions**, but Vercel's edge network still wins for global static/CDN. Azure has fragmented regional availability for reasoning models (o3-pro/codex-mini in only 2 regions).
5. **TCO Analysis:** Include all stack components (Agent Service, Code Interpreter, File Search, Cosmos DB threads, AI Search for RAG, Azure Monitor for telemetry).
6. **Enterprise Bias:** Azure's pitch is enterprise-first — document the pricing cliff between PAYG and PTU (monthly reservation ≈ 64% off, yearly ≈ 70% off), as well as Entra integration, VNet isolation, Azure Policy, and compliance (FedRAMP, HIPAA, EU AI Act via Agent Governance Toolkit).

---

## VALIDATED CITATIONS & REFERENCE DATA (MCP-Sourced)

> **Last Validated:** 2026-04-21

### GitHub Repository References

| Platform | Repository | Language | Latest Tag (Apr 21, 2026) |
|----------|------------|----------|---------------------------|
| Vercel AI SDK (stable) | [vercel/ai](https://github.com/vercel/ai) | TypeScript | `ai@6.0.168` |
| Vercel AI SDK (v7 beta) | [vercel/ai](https://github.com/vercel/ai) | TypeScript | `ai@7.0.0-beta.111` |
| Vercel Workflow | [`@ai-sdk/workflow`](https://github.com/vercel/ai) | TypeScript | Part of AI SDK v7 beta |
| **Microsoft Agent Framework (Python)** | [microsoft/agent-framework](https://github.com/microsoft/agent-framework) | Python | `agent-framework 1.0.1` (pip), `agent-framework-core 1.0.0` |
| **Microsoft Agent Framework (.NET)** | [microsoft/agent-framework](https://github.com/microsoft/agent-framework) | .NET | `Microsoft.Agents.AI 1.1.0` (NuGet) |
| **Azure AI Projects SDK (Python)** | [Azure/azure-sdk-for-python](https://github.com/Azure/azure-sdk-for-python) | Python | `azure-ai-projects 2.1.0` |
| **Azure AI Agents SDK (Python)** | [Azure/azure-sdk-for-python](https://github.com/Azure/azure-sdk-for-python) | Python | `azure-ai-agentserver-responses_1.0.0b4` |
| Azure AI Projects SDK (.NET) | [Azure/azure-sdk-for-net](https://github.com/Azure/azure-sdk-for-net) | .NET | `Azure.AI.Projects 2.0.0-beta.2` |
| Azure AI Agents SDK (JavaScript) | [Azure/azure-sdk-for-js](https://github.com/Azure/azure-sdk-for-js) | TypeScript | `@azure/ai-agents 2.0.0-beta.4` |
| **Semantic Kernel (Python)** — superseded | [microsoft/semantic-kernel](https://github.com/microsoft/semantic-kernel) | Python | `python-1.41.2` |
| **Semantic Kernel (.NET)** — superseded | [microsoft/semantic-kernel](https://github.com/microsoft/semantic-kernel) | .NET | `dotnet-1.74.0` |
| **AutoGen (Python)** — superseded, maintenance | [microsoft/autogen](https://github.com/microsoft/autogen) | Python | `python-v0.7.5` (Sep 30, 2025) |
| Foundry Samples (canonical hosted agent patterns) | [microsoft-foundry/foundry-samples](https://github.com/microsoft-foundry/foundry-samples) | Multi | Rolling `main` |

### SDK Language Support Matrix

**Source:** [Microsoft Agent Framework Overview](https://learn.microsoft.com/en-us/agent-framework/), [Foundry Agent Service Developer Guide](https://learn.microsoft.com/en-us/azure/foundry/agents/overview)

| Layer | Vercel | Azure | Language |
|-------|--------|-------|----------|
| **Agent Framework** | AI SDK 6.x stable (v7 beta) | **Microsoft Agent Framework 1.0** (recommended) + SK + AutoGen (both superseded) | TS/JS vs Python + C# + Java (Spring AI) + TS (`@azure/ai-agents`) |
| **Infrastructure SDK** | `@vercel/sandbox`, `@ai-sdk/workflow` | `azure-ai-agents` / `azure-ai-projects` (Python + .NET + JS + Java) | TS + Python (Workflow Python beta); Python + .NET + JS + Java |

| SDK | Primary Language | Other Languages | Role |
|-----|------------------|-----------------|------|
| **Vercel AI SDK 6.x** (stable) | TypeScript/JavaScript | — | Agent framework (`ToolLoopAgent`, tools, streaming, orchestration) |
| **Vercel AI SDK v7** (beta) | TypeScript/JavaScript | — | Next-gen: ESM-only, `WorkflowAgent`, `@ai-sdk/otel`, `toolNeedsApproval` |
| **Microsoft Agent Framework 1.0** | Python + C# (co-equal) | — | Unified agent framework: `Agent`, `SequentialBuilder`, `HandoffOrchestration`, `GraphFlow`, `ConcurrentBuilder` |
| **Semantic Kernel** (superseded) | C#, Python, Java | — | Legacy agent framework (`ChatCompletionAgent`, `[KernelFunction]`, `HandoffOrchestration`) — migration target to MAF |
| **AutoGen** (superseded, maintenance) | Python | .NET (community) | Research-origin multi-agent framework — folded into MAF; community fork is **AG2** |
| **azure-ai-agents / azure-ai-projects** | Python | .NET, JS, Java | Infrastructure wrapper for Foundry Agent Service (`AIProjectClient`, `create_agent`, `FunctionTool`, `McpTool`, `AzureAIAgentThread`) |

> ⚠️ **Critical Distinction:** `azure-ai-agents` and `azure-ai-projects` are NOT for building agent logic — they're for managing agents on Foundry Agent Service infrastructure (create, thread, run lifecycle, tool dispatch). Agent logic is written with **Microsoft Agent Framework**. This is like how you use AI SDK for agent logic but deploy on Vercel's platform.

> 📝 **Methodological Note:** Compare AI SDK 6.x ↔ Microsoft Agent Framework for agent framework features. Compare Vercel Platform ↔ Foundry Agent Service for infrastructure features. Don't conflate the two layers. When showing SK or AutoGen code, always note that MAF is the current blessed path for new projects.

### Azure OpenAI Model Pricing (Regional Standard / Global Standard / Batch) — US regions

**Source:** [Azure OpenAI Pricing](https://azure.microsoft.com/en-us/pricing/details/azure-openai/) — validated April 2026 (static-HTML limitations flagged where rendered as `$-`)

**Per 1M tokens, USD:**

| Model | Deployment | Input | Cached Input | Output | Batch Input | Batch Output |
|-------|-----------|-------|--------------|--------|-------------|--------------|
| **GPT-4.1** (2025-04-14) | Global | $2.00 | $0.50 | $8.00 | $1.00 | $4.00 |
| **GPT-4.1** | Data Zone | $2.20 | $0.55 | $8.80 | — | — |
| **GPT-4.1** | Regional | $2.20 | $0.55 | $8.80 | N/A | N/A |
| **GPT-4.1-mini** | Global | $0.40 | $0.10 | $1.60 | $0.20 | $0.80 |
| **GPT-4.1-nano** | Global | $0.10 | $0.025 | $0.40 | $0.05 | $0.20 |
| **GPT-4.1 Priority** | Global | $3.50 | $0.88 | $14.00 | N/A | N/A |
| **GPT-5** (2025-08-07) | Global | $1.25 | $0.13 | $10.00 | — | — |
| **GPT-5 Priority** | Global | $2.50 | $0.25 | $20.00 | N/A | N/A |
| **GPT-5 Pro** | Global | $30.00 | — | $150.00 | — | — |
| **GPT-5-mini** | Global | $0.25 | $0.025 | $2.00 | — | — |
| **GPT-5-nano** | Global | $0.20 | $0.02 | $1.25 | — | — |
| **GPT-5.3 Codex** | Global | $1.75 | $0.18 | $14.00 | — | — |
| **GPT-5.4-mini** (Mar 2026) | Global | $0.75 | — | $4.50 | — | — |
| **GPT-5.4-nano** (Mar 2026) | Global | $0.20 | — | $1.25 | — | — |
| **o4-mini** (2025-04-16) | Global | $1.10 | $0.275 | $4.40 | $0.55 | $2.20 |
| **o4-mini** | Data Zone | $1.21 | $0.31 | $4.84 | $0.61 | $2.42 |
| **o3** (2025-04-16) | Global | $2.00 | $0.50 | $8.00 | $1.00 | $4.00 |
| **o3-mini** (2025-01-31) | Global | $1.10 | $0.275 | $4.40 | $0.55 | $2.20 |
| **o1** | Global | $15.00 | $7.50 | $60.00 | N/A | N/A |
| **GPT-4o** (2024-11-20) | Global | $2.50 | $1.25 | $10.00 | — | — |
| **GPT-4o-mini** | Global | $0.15 | $0.075 | $0.60 | — | — |
| **GPT-4.5-Preview** | Global | $75.00 | $37.50 | $150.00 | N/A | N/A |

> ⚠️ **DOCUMENTATION GAP:** GPT-5.1 and GPT-5.2 sub-series per-token rates render as `$-` in static HTML. Verify via Azure Pricing Calculator.

**Deployment tier premiums:**

| Tier | Multiplier vs Global Standard | Use Case |
|------|-------------------------------|----------|
| **Priority Processing** | +75% premium | Latency-sensitive user-facing agents |
| **Global Standard** | Baseline | Default, highest throughput |
| **Data Zone (US or EU)** | +10% | Data residency within zone |
| **Regional Standard** | +10% on Data Zone (~+21% on Global) | Hard regional data residency |
| **Batch API** | −50% discount | Async workloads, 24-hour SLA |
| **PTU Monthly Reservation** | ≈ 64% off hourly PAYG | Predictable throughput |
| **PTU Yearly Reservation** | ≈ 70% off hourly PAYG | Long-term commitment |

**Azure OpenAI Built-in Tools (via Assistants API — sunset Aug 26, 2026 — or Responses API):**

| Tool | Price |
|------|-------|
| **Code Interpreter** | $0.03/session (1-hour session; concurrent threads = multiple sessions) |
| **File Search** (vector storage) | $0.10/GB/day (1 GB free) |
| **File Search Tool Call** (Responses API) | $2.50/1K tool calls |
| **Computer Use** (Responses API) | Input: $3.00/1M tokens; Output: $12.00/1M tokens |

### Foundry Models Catalog (MaaS / Non-OpenAI Models)

**Source:** [Foundry Models Pricing](https://azure.microsoft.com/en-us/pricing/details/ai-foundry-models/) — validated April 2026

**Per 1M tokens, USD:**

| Model | Deployment | Input | Output |
|-------|-----------|-------|--------|
| **DeepSeek V3.2** | Global | $0.58 | $1.68 |
| **DeepSeek V3.2** | Data Zone | $0.64 | $1.85 |
| **DeepSeek R1** | Global | $1.35 | $5.40 |
| **DeepSeek R1** | Data Zone / Regional | $1.485 | $5.94 |
| **DeepSeek V3** | Global | $1.14 | $4.56 |
| Llama 3.3 70B | All | DOCUMENTATION GAP | DOCUMENTATION GAP |
| Llama 4 Maverick 17B | All | DOCUMENTATION GAP | DOCUMENTATION GAP |
| Phi-4 / Phi-4-mini | All | DOCUMENTATION GAP | DOCUMENTATION GAP |
| **Mistral OCR** | — | $1.00/1K pages | (single rate) |
| **mistral-document-ai-2505** | — | $3.00/1K pages | (single rate) |
| MAI-Transcribe-1 | — | $0.36/hr audio | (single rate) |
| MAI-Voice-1 (TTS) | — | $22.00/1M characters | (single rate) |
| MAI-Image-2 | — | $5.00/1M text tokens | (single rate) |

> **Model Router** (launched Oct 2025): Routes between OpenAI and DeepSeek models intelligently. No separate surcharge confirmed in public pricing; passes through underlying model costs.

### Foundry Agent Service Pricing

**Source:** [Foundry Agent Service Pricing](https://azure.microsoft.com/en-us/pricing/details/foundry-agent-service/), [FAQ](https://learn.microsoft.com/en-us/azure/ai-foundry/agents/faq)

| Component | Price | Notes |
|-----------|-------|-------|
| **Agent creation / orchestration** | **$0** | No charge for creating or running Foundry-native agents |
| **Model inference** | See Azure OpenAI rates above | Charged at underlying model rate |
| **Hosted Agents** (containerized — MAF, LangGraph) | DOCUMENTATION GAP (vCPU/GiB-hour `$-` in static HTML) | Preview; verify via Pricing Calculator |
| **Code Interpreter tool** | $0.03/session-hour | Same as Azure OpenAI built-in |
| **File Search Storage** | $0.10/GB/day (1 GB free) | Vector storage |
| **Web Search (Bing Grounding)** | DOCUMENTATION GAP (`$-/1,000 transactions`) | Separate billing via Bing |
| **Custom Search** | DOCUMENTATION GAP | Preview |
| **Deep Research** | DOCUMENTATION GAP | Billed at model + Bing rates |
| **Thread/conversation storage** | $0 direct | Stored in customer's Cosmos DB + Azure Storage |

> **Architectural note:** Thread history and file attachments are stored in the **customer's own** Azure Cosmos DB and Azure Storage accounts. You pay those bills directly, not through the Foundry SKU.

### Azure Container Apps Dynamic Sessions (Code Interpreter Alternative)

**Source:** [ACA Pricing](https://azure.microsoft.com/en-us/pricing/details/container-apps/), [Sessions Docs](https://learn.microsoft.com/en-us/azure/container-apps/sessions)

| Session Type | PAYG | 1-yr Savings | 3-yr Savings |
|-------------|------|-------------|-------------|
| **Code interpreter** (Python, Node.js, Shell) | $0.03/session-hour | $0.026/session-hour | $0.025/session-hour |
| **Custom container sessions** | Dedicated E16 instance rates | — | — |

**Max execution time per code run:** 220 seconds. Hyper-V isolated. Subsecond startup via prewarmed pools. Billed 1-hour increments from allocation to deallocation.

### Vercel Platform Pricing — April 2026 (Reference)

**Source:** [Vercel Sandbox Pricing](https://vercel.com/docs/vercel-sandbox/pricing), [Vercel Workflow Pricing](https://vercel.com/docs/workflows/pricing), [Fluid Compute Pricing](https://vercel.com/docs/fluid-compute/pricing)

| Service | Resource | Price |
|---------|----------|-------|
| **Sandbox SDK** (GA) | Active CPU | $0.128/hour (Pro/Enterprise) |
| **Sandbox SDK** (GA) | Provisioned Memory | $0.0212/GB-hour |
| **Sandbox SDK** (GA) | Creations | $0.60 per 1M |
| **Sandbox SDK** (GA) | Data Transfer | $0.15/GB |
| **Sandbox SDK** (GA) | Storage | $0.08/GB-month |
| **Workflow SDK** (GA) | Steps (on-demand) | $2.50 per 100,000 steps |
| **Workflow SDK** (GA) | Storage | $0.00069/GB-hour |
| **Fluid Compute** | Active CPU (US East — iad1/cle1/pdx1) | $0.128/hour (I/O wait free) |
| **Fluid Compute** | Active CPU (US West — sfo1) | $0.177/hour |
| **Fluid Compute** | Active CPU (EU — fra1) | $0.184/hour |
| **Fluid Compute** | Active CPU (São Paulo — gru1) | $0.221/hour |
| **AI Gateway** | Model token pass-through | $0 markup (provider list price) |
| **AI Gateway** | Free tier | $5/month credit included |
| **AI Gateway** | ZDR (team-wide) | $0 additional (Pro + Enterprise, Apr 8, 2026) |
| **Secure Compute** | Enterprise subscription | $6,500/year |
| **Secure Compute** | Secure Connect Data Transfer | $0.15/GB |

### Foundry Agent Service Canonical Code Example (Python)

**Source:** [Foundry Agent Service GA Blog (Mar 16, 2026)](https://devblogs.microsoft.com/foundry/foundry-agent-service-ga/), [`azure-ai-agents` samples](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/ai/azure-ai-agents/samples/sample_agents_basics.py)

```python
# pip install azure-ai-projects azure-ai-agents azure-identity
import os, time
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.agents.models import ListSortOrder, FunctionTool

def get_weather(location: str, unit: str = "celsius") -> str:
    """Get current weather for a location."""
    return f"Weather in {location}: 22°{unit[0].upper()}, Sunny"

functions = FunctionTool(functions={get_weather})

project_client = AIProjectClient(
    endpoint=os.environ["PROJECT_ENDPOINT"],   # https://<resource>.services.ai.azure.com/api/projects/<project>
    credential=DefaultAzureCredential(),
)

with project_client:
    agents_client = project_client.agents
    agent = agents_client.create_agent(
        model=os.environ["MODEL_DEPLOYMENT_NAME"],  # e.g., "gpt-4.1-mini"
        name="weather-agent",
        instructions="You are a helpful weather assistant.",
        tools=functions.definitions,
    )
    thread = agents_client.threads.create()
    agents_client.messages.create(
        thread_id=thread.id, role="user", content="What's the weather in Seattle?"
    )
    # Polling loop with tool dispatch
    run = agents_client.runs.create(thread_id=thread.id, agent_id=agent.id)
    while run.status in ["queued", "in_progress", "requires_action"]:
        time.sleep(1)
        run = agents_client.runs.get(thread_id=thread.id, run_id=run.id)
        if run.status == "requires_action":
            tool_outputs = []
            for call in run.required_action.submit_tool_outputs.tool_calls:
                output = functions.execute(call)
                tool_outputs.append({"tool_call_id": call.id, "output": output})
            agents_client.runs.submit_tool_outputs(
                thread_id=thread.id, run_id=run.id, tool_outputs=tool_outputs
            )

    messages = agents_client.messages.list(
        thread_id=thread.id, order=ListSortOrder.ASCENDING
    )
    for msg in messages:
        if msg.text_messages:
            print(f"{msg.role}: {msg.text_messages[-1].text.value}")
```

**Key abstractions (April 2026):**

- `AIProjectClient(endpoint, credential)` — entry point to all Foundry services
- `agents_client.create_agent(model, name, instructions, tools)` — register an agent definition
- `threads.create()` — stateful conversation (server-side persistence)
- `messages.create(thread_id, role, content)` — append to thread
- `runs.create(thread_id, agent_id)` — invoke agent
- **Run lifecycle states:** `queued` → `in_progress` → `requires_action` (tool call) → `in_progress` → `completed` (or `failed`, `cancelled`, `expired`)
- `SubmitToolOutputsAction` / `ToolOutput` — dispatch function tool results back to the agent
- `SubmitToolApprovalAction` / `ToolApproval` — human approval flow for MCP tools
- **Streaming:** `runs.stream(thread_id, agent_id)` yields `MessageDeltaChunk` events for token streaming

### Microsoft Agent Framework Canonical Code Example (Python)

**Source:** [Agent Framework 1.0 GA Blog](https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-version-1-0/), [Foundry Samples](https://github.com/microsoft-foundry/foundry-samples/tree/main/samples/python/hosted-agents/agent-framework)

```python
# pip install agent-framework
import asyncio, os
from agent_framework import Agent
from agent_framework.foundry import FoundryChatClient
from azure.ai.agentserver.agentframework import from_agent_framework
from azure.identity.aio import DefaultAzureCredential

def get_available_hotels(check_in_date: str, check_out_date: str, max_price: int = 500) -> str:
    """Get available hotels in Seattle for the specified dates."""
    return "Contoso Suites: $189/night, 4.5★, Downtown"

async def main():
    async with (
        DefaultAzureCredential() as credential,
        FoundryChatClient(
            project_endpoint=os.getenv("PROJECT_ENDPOINT"),
            model=os.getenv("MODEL_DEPLOYMENT_NAME", "gpt-4.1-mini"),
            credential=credential,
        ) as client,
    ):
        agent = Agent(
            client=client,
            name="SeattleHotelAgent",
            instructions="You are a travel assistant specializing in Seattle hotels.",
            tools=[get_available_hotels],
        )
        # Deploy as a Hosted Agent (containerized)
        server = from_agent_framework(agent)
        await server.run_async()   # listens on :8088

asyncio.run(main())
```

**Accompanying `agent.yaml` manifest (declarative Foundry deployment):**

```yaml
name: seattle-hotel-agent
description: A travel assistant that finds hotels in Seattle.
template:
  name: seattle-hotel-agent
  kind: hosted
  protocols:
    - protocol: responses
  environment_variables:
    - name: PROJECT_ENDPOINT
      value: ${AZURE_AI_PROJECT_ENDPOINT}
    - name: MODEL_DEPLOYMENT_NAME
      value: "{{chat}}"
resources:
  - kind: model
    id: gpt-4.1-mini
    name: chat
```

### Microsoft Agent Framework — Multi-Agent Orchestration

**Source:** [Agent Framework 1.0 GA Blog](https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-version-1-0/)

```python
from agent_framework import Agent
from agent_framework.orchestrations import SequentialBuilder

writer = Agent(client=client, instructions="You are a concise copywriter.", name="writer")
reviewer = Agent(client=client, instructions="You are a thoughtful reviewer.", name="reviewer")

workflow = SequentialBuilder(participants=[writer, reviewer]).build()
async for event in workflow.run("Write a tagline for Agent Framework 1.0.", stream=True):
    if event.type == "output":
        print(event.data, end="", flush=True)
```

Also available: `ConcurrentBuilder`, `HandoffOrchestration`, `GraphFlow` (experimental — direct AutoGen `GraphFlow` successor).

### Foundry MCP Tool Integration (Native MCP Client)

**Source:** [azure-ai-agents MCP sample](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/ai/azure-ai-agents/samples/agents_tools/sample_agents_mcp.py)

```python
from azure.ai.agents.models import McpTool

mcp_tool = McpTool(
    server_label="github",
    server_url="https://gitmcp.io/Azure/azure-rest-api-specs",
    allowed_tools=[],  # empty = all tools allowed
)
mcp_tool.allow_tool("search_azure_rest_api_code")
# mcp_tool.set_approval_mode("never")  # skip human approval prompt

agent = agents_client.create_agent(
    model=os.environ["MODEL_DEPLOYMENT_NAME"],
    name="my-mcp-agent",
    instructions="Use MCP tools to answer questions.",
    tools=mcp_tool.definitions,
)

run = agents_client.runs.create(
    thread_id=thread.id,
    agent_id=agent.id,
    tool_resources=mcp_tool.resources,  # ← passes MCP server config
)
```

Plus: **Foundry MCP Server** (cloud-hosted at `mcp.ai.azure.com`, Entra ID auth) as an alternative to self-hosted MCP servers.

### Foundry Observability (OpenTelemetry → Application Insights)

**Source:** [`azure-ai-agents` telemetry sample](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/ai/azure-ai-agents/samples/agents_telemetry/sample_agents_basics_with_azure_monitor_tracing.py)

```python
from opentelemetry import trace
from azure.monitor.opentelemetry import configure_azure_monitor

# Single call enables all OTel instrumentation → Application Insights
configure_azure_monitor(
    connection_string=os.environ["APPLICATIONINSIGHTS_CONNECTION_STRING"]
)

tracer = trace.get_tracer(__name__)
with tracer.start_as_current_span("agent-scenario"):
    # All subsequent agent SDK calls are automatically traced
    ...
```

### Foundry Agent Service Lifecycle Settings

**Source:** [Foundry Agent Service — Limits & Quotas](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/limits-quotas-regions)

| Parameter | Default | Range |
|-----------|---------|-------|
| Run polling timeout | 15 min | Configurable per run |
| Max tool calls per run | Implementation-defined | Varies by tier |
| Max tokens per message | Model-dependent (1M for GPT-4.1) | Model-dependent |

> ⚠️ **DOCUMENTATION GAP:** Exact idle session timeout and max lifetime values for Foundry Agent Service are not as prominently documented as AWS's `idleRuntimeSessionTimeout` and `maxLifetime`. Verify current values via the Foundry SDK reference.

---

## DOCUMENTATION GAPS IDENTIFIED

| Feature | Status |
|---------|--------|
| GPT-5.1 / 5.2 per-token rates | DOCUMENTATION GAP — Static HTML renders `$-`; verify via Pricing Calculator |
| Foundry Agent Service Hosted Agents compute rates | DOCUMENTATION GAP — vCPU/GiB-hour `$-`; verify via Pricing Calculator |
| Foundry Web Search / Custom Search / Deep Research rates | DOCUMENTATION GAP — `$-` in static HTML |
| Foundry Agent Service max run lifetime / idle timeout | DOCUMENTATION GAP — Not as prominent as AWS's lifecycle settings |
| Llama 4 / Phi-4 on Foundry Models per-token rates | DOCUMENTATION GAP — `$-` in static HTML |
| Mistral text model rates on Foundry Models | DOCUMENTATION GAP |
| Azure AI Search Agentic Retrieval beyond 50M free tokens/month | DOCUMENTATION GAP |
| Azure Functions Durable Task Scheduler rates | DOCUMENTATION GAP — See `aka.ms/dts-billing` |
| GPT-5.x tokenizer inflation ratio | DOCUMENTATION GAP — not publicly documented like Anthropic's Opus 4.7 tokenizer disclosure |
| Agent Framework 1.0 issue ratio benchmarks | May need direct GitHub API calls — repo only GA'd Apr 3, 2026 |

## DOCUMENTATION GAPS RESOLVED (April 2026 baseline)

| Feature | Resolution | Source |
|---------|------------|--------|
| Foundry Agent Service GA status | **Resolved:** Next-gen Foundry Agent Service GA Mar 16, 2026 (Responses API-based); first GA (Assistants API-based) was May 19, 2025; Assistants API sunsets Aug 26, 2026 | [Foundry Agent Service GA Blog](https://devblogs.microsoft.com/foundry/foundry-agent-service-ga/) |
| Microsoft Agent Framework 1.0 status | **Resolved:** Python `agent-framework 1.0.1` + .NET `Microsoft.Agents.AI 1.1.0` both GA Apr 3, 2026 — unified successor to Semantic Kernel + AutoGen | [Agent Framework 1.0 GA Blog](https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-version-1-0/) |
| Foundry Evaluations / Monitoring / Tracing | **Resolved:** All three GA Mar 16, 2026 via Foundry Control Plane (OTel-based) | [Foundry Evaluations GA Blog](https://techcommunity.microsoft.com/blog/azure-ai-foundry-blog/generally-available-evaluations-monitoring-and-tracing-in-microsoft-foundry/4502760) |
| Semantic Kernel vs Agent Framework recommendation | **Resolved:** SK is now a migration target; Agent Framework is the blessed path for new projects (official migration guides published) | [SK → MAF Migration](https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-semantic-kernel) |
| Microsoft Foundry vs Azure AI Foundry naming | **Resolved:** Rebranded Nov 18, 2025 (Ignite) from "Azure AI Foundry" to "Microsoft Foundry" | [Ignite 2025 Blog](https://azure.microsoft.com/en-us/blog/microsoft-foundry-scale-innovation-on-a-modular-interoperable-and-secure-agent-stack/) |
| Foundry Agent Service regional availability | **Resolved:** 24 regions (Agent Service) with sub-feature variance (Code Interpreter: 20, File Search: 22, Computer Use: 2) | [Foundry Region Support](https://learn.microsoft.com/en-us/azure/foundry/reference/region-support) |
| Azure OpenAI Priority Processing tier | **Resolved:** +75% premium over Global Standard (April 2026); added for GPT-4.1 and GPT-5 series | [Azure OpenAI Pricing](https://azure.microsoft.com/en-us/pricing/details/azure-openai/) |
| GPT-4.1 context window | **Resolved:** 1M tokens (all three variants — full, mini, nano) | [GPT-4.1 GA Blog](https://azure.microsoft.com/en-us/blog/announcing-the-gpt-4-1-model-series-for-azure-ai-foundry-and-github-developers/) |
| Foundry MCP Server status | **Resolved:** Cloud-hosted preview at `mcp.ai.azure.com` since Mar 20, 2026 (announced Dec 3, 2025) | [Foundry MCP Server Docs](https://learn.microsoft.com/en-us/azure/foundry/mcp/get-started) |

---

## CROSS-REFERENCE LINKS

### Azure / Microsoft Documentation

**Agent Framework (Microsoft Agent Framework 1.0):**

- [Microsoft Agent Framework GA Blog (Apr 3, 2026)](https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-version-1-0/)
- [Agent Framework Docs](https://learn.microsoft.com/en-us/agent-framework/)
- [Agent Framework GitHub](https://github.com/microsoft/agent-framework)
- [Migration from Semantic Kernel](https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-semantic-kernel)
- [Migration from AutoGen](https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-autogen)
- [Semantic Kernel (superseded)](https://github.com/microsoft/semantic-kernel) — Python `1.41.2`, .NET `1.74.0`
- [AutoGen (superseded, maintenance)](https://github.com/microsoft/autogen) — Python `v0.7.5`

**Infrastructure (Microsoft Foundry):**

- [Foundry Agent Service GA (Mar 16, 2026)](https://devblogs.microsoft.com/foundry/foundry-agent-service-ga/)
- [Foundry Agent Service Overview](https://learn.microsoft.com/en-us/azure/foundry/agents/overview)
- [Foundry Agent Service Pricing](https://azure.microsoft.com/en-us/pricing/details/foundry-agent-service/)
- [Foundry Agent Service FAQ](https://learn.microsoft.com/en-us/azure/ai-foundry/agents/faq)
- [Foundry Agent Service Tool Catalog](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/tool-catalog)
- [Foundry Region Support](https://learn.microsoft.com/en-us/azure/foundry/reference/region-support)
- [Foundry Agent Service Limits & Regions](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/limits-quotas-regions)
- [Foundry Model Region Support](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/model-region-support)
- [Foundry Hosted Agents](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents)
- [Foundry Evaluations / Monitoring / Tracing GA (Mar 16, 2026)](https://techcommunity.microsoft.com/blog/azure-ai-foundry-blog/generally-available-evaluations-monitoring-and-tracing-in-microsoft-foundry/4502760)
- [Foundry MCP Server](https://learn.microsoft.com/en-us/azure/foundry/mcp/get-started)
- [Foundry Guardrails for Agents (preview)](https://learn.microsoft.com/en-us/azure/foundry/guardrails/guardrails-overview)
- [Foundry What's New](https://learn.microsoft.com/en-us/azure/foundry/whats-new-foundry)
- [Agent Governance Toolkit (OSS, Apr 2, 2026)](https://opensource.microsoft.com/blog/2026/04/02/introducing-the-agent-governance-toolkit-open-source-runtime-security-for-ai-agents/)
- [Ignite 2025 Foundry Announcements](https://azure.microsoft.com/en-us/blog/microsoft-foundry-scale-innovation-on-a-modular-interoperable-and-secure-agent-stack/)

**Model Platform (Azure OpenAI + Foundry Models):**

- [Azure OpenAI Pricing](https://azure.microsoft.com/en-us/pricing/details/azure-openai/)
- [Foundry Models Pricing](https://azure.microsoft.com/en-us/pricing/details/ai-foundry-models/)
- [GPT-4.1 Launch Blog](https://azure.microsoft.com/en-us/blog/announcing-the-gpt-4-1-model-series-for-azure-ai-foundry-and-github-developers/)
- [o3 & o4-mini Launch Blog (Apr 16, 2026)](https://azure.microsoft.com/en-us/blog/o3-and-o4-mini-unlock-enterprise-agent-workflows-with-next-level-reasoning-ai-with-azure-ai-foundry-and-github/)
- [MAI Models Launch (Apr 2, 2026)](https://microsoft.ai/news/today-were-announcing-3-new-world-class-mai-models-available-in-foundry/)

**Identity / Security:**

- [Microsoft Entra Agent ID (preview Apr 8, 2026)](https://techcommunity.microsoft.com/blog/microsoft-entra-blog/announcing-microsoft-entra-agent-id-secure-and-manage-your-ai-agents/3827392)
- [Content Safety Task Adherence API](https://learn.microsoft.com/en-us/azure/ai-services/content-safety/whats-new)

**Infrastructure alternatives:**

- [Azure Container Apps Dynamic Sessions](https://learn.microsoft.com/en-us/azure/container-apps/sessions)
- [Azure Container Apps Pricing](https://azure.microsoft.com/en-us/pricing/details/container-apps/)
- [Azure Functions Pricing](https://azure.microsoft.com/en-us/pricing/details/functions/)
- [Azure AI Search Pricing](https://azure.microsoft.com/en-us/pricing/details/search/)
- [Azure AI Search Region Support](https://learn.microsoft.com/en-us/azure/search/search-region-support)
- [Cosmos DB Serverless Pricing](https://azure.microsoft.com/en-us/pricing/details/cosmos-db/serverless/)
- [Azure Monitor Pricing](https://azure.microsoft.com/en-us/pricing/details/monitor/)

### Vercel Agent Stack Documentation

- [Vercel AI Gateway](https://vercel.com/ai-gateway)
- [AI Gateway Pricing (0% markup)](https://vercel.com/docs/ai-gateway/pricing)
- [AI Gateway ZDR Announcement](https://vercel.com/blog/zdr-on-ai-gateway)
- [Vercel AI SDK GitHub](https://github.com/vercel/ai) (stable: `ai@6.0.168`; beta: `ai@7.0.0-beta.111`)
- [AI SDK Agents Docs](https://github.com/vercel/ai/blob/main/content/docs/03-agents/02-building-agents.mdx)
- [bash-tool Changelog](https://vercel.com/changelog/introducing-bash-tool-for-filesystem-based-context-retrieval) — Jan 7, 2026
- [Vercel Sandbox SDK Docs](https://vercel.com/docs/vercel-sandbox) — GA Jan 30, 2026
- [Vercel Sandbox Pricing](https://vercel.com/docs/vercel-sandbox/pricing)
- [Vercel Sandbox GA Blog](https://vercel.com/blog/vercel-sandbox-is-now-generally-available)
- [Vercel Workflow GA Blog](https://vercel.com/blog/a-new-programming-model-for-durable-execution) — Apr 16, 2026
- [Vercel Workflow Pricing](https://vercel.com/docs/workflows/pricing)
- [useworkflow.dev](https://useworkflow.dev/) — Official Workflow docs
- [Vercel Chat SDK](https://vercel.com/changelog/chat-sdk) — Feb 23, 2026
- [Agentic Infrastructure Blog](https://vercel.com/blog/agentic-infrastructure) — Apr 9, 2026
- [Fluid Compute Pricing](https://vercel.com/docs/fluid-compute/pricing)

### GitHub Repositories

**Agent Frameworks:**

- [vercel/ai](https://github.com/vercel/ai) — AI SDK 6.x, TypeScript (tag: `ai@6.0.168` stable / `7.0.0-beta.111` beta) — Agent framework
- [microsoft/agent-framework](https://github.com/microsoft/agent-framework) — Microsoft Agent Framework 1.0, Python + .NET (Python `1.0.1`, .NET `Microsoft.Agents.AI 1.1.0`) — **blessed** agent framework
- [microsoft/semantic-kernel](https://github.com/microsoft/semantic-kernel) — Semantic Kernel, Python + .NET + Java (tags: `python-1.41.2`, `dotnet-1.74.0`) — **superseded**; migration target to MAF
- [microsoft/autogen](https://github.com/microsoft/autogen) — AutoGen, Python (tag: `python-v0.7.5`) — **superseded, maintenance**; community fork is `ag2ai/ag2`

**Infrastructure SDKs:**

- [Azure/azure-sdk-for-python `sdk/ai/azure-ai-projects`](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/ai/azure-ai-projects) — Foundry project + agent infra, Python (`azure-ai-projects 2.1.0`)
- [Azure/azure-sdk-for-python `sdk/ai/azure-ai-agents`](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/ai/azure-ai-agents) — Foundry Agent Service SDK, Python (`azure-ai-agentserver-responses_1.0.0b4`)
- [Azure/azure-sdk-for-net](https://github.com/Azure/azure-sdk-for-net) — `Azure.AI.Projects 2.0.0-beta.2`
- [Azure/azure-sdk-for-js](https://github.com/Azure/azure-sdk-for-js) — `@azure/ai-agents 2.0.0-beta.4`
- [microsoft-foundry/foundry-samples](https://github.com/microsoft-foundry/foundry-samples) — canonical Hosted Agents patterns

---

## APPENDIX A: PROMPT CHANGELOG

| Version | Date | Changes |
|---------|------|---------|
| **1.0.0** | **2026-04-21** | **Initial baseline for Vercel vs Azure comparison.** Forked structure from `Vercel-AWS-Base-Research-Prompt.md` v3.0.0. Key Azure framing: (1) Two-layer architecture with **Microsoft Agent Framework 1.0** (GA Apr 3, 2026) as blessed agent framework — unified successor to Semantic Kernel + AutoGen; (2) **Microsoft Foundry Agent Service** (next-gen GA Mar 16, 2026 on Responses API) as blessed infrastructure; (3) 24 Agent Service regions with sub-feature variance (Code Interpreter: 20, File Search: 22, Computer Use: 2); (4) Azure OpenAI pricing tiers (Global / Data Zone / Regional / Priority +75% / Batch −50% / PTU); (5) Foundry Models catalog (11,000+ models via MaaS/PAYG); (6) Dual Python/C# language primacy (vs Vercel TypeScript-first); (7) Microsoft Foundry rebrand from "Azure AI Foundry" at Ignite 2025 (Nov 18, 2025); (8) Assistants API sunset Aug 26, 2026 — migrate to Responses API; (9) Foundry Evaluations / Monitoring / Tracing GA Mar 16, 2026 (OTel-based); (10) Microsoft Entra Agent ID preview Apr 8, 2026; (11) Foundry MCP Server preview at `mcp.ai.azure.com` (Mar 20, 2026); (12) Legacy SK (`python-1.41.2` / `dotnet-1.74.0`) and AutoGen (`python-v0.7.5`) documented as superseded with migration paths. |

---

## APPENDIX B: SELF-UPDATE PROMPT

Use the following prompt to refresh this master document with the latest information. Run this periodically (recommended: monthly, or after Build/Ignite keynotes) to keep citations, versions, and pricing current.

---

### 🔄 Master Prompt Refresh Instructions

```markdown
## TASK: Refresh the Agent Comparison Master Prompt (Vercel vs Azure)

You are updating the master research prompt at `Vercel-Azure-Base-Research-Prompt.md`. Your goal is to validate all existing citations and update any stale information.

### REQUIRED MCP TOOLCHAINS

Use these MCP servers for authoritative data (DO NOT use general knowledge):

1. **GitHub MCP** — Fetch latest release tags and repository metadata
2. **Microsoft Learn / Azure Documentation** — Latest Foundry, Agent Framework, Azure OpenAI pricing and features (via `aws-knowledge_aws___read_documentation` with `learn.microsoft.com` URLs or direct webfetch)
3. **Vercel MCP** — Latest AI SDK, Sandbox, Workflow, AI Gateway docs
4. **Context7 MCP** — Cross-reference documentation and code samples

### REFRESH CHECKLIST

#### 1. Version Updates
Run these GitHub MCP queries to get current versions:

- [ ] `vercel/ai` — Check latest release tag (current: `ai@6.0.168` stable / `7.0.0-beta.111` beta)
- [ ] `microsoft/agent-framework` — Check latest Python tag (current: `agent-framework 1.0.1`) and .NET (`Microsoft.Agents.AI 1.1.0`)
- [ ] `Azure/azure-sdk-for-python` `sdk/ai/azure-ai-projects` — Check latest tag (current: `azure-ai-projects 2.1.0`)
- [ ] `Azure/azure-sdk-for-python` `sdk/ai/azure-ai-agents` — Check latest tag (current: `azure-ai-agentserver-responses_1.0.0b4`)
- [ ] `microsoft/semantic-kernel` — Latest Python + .NET tags (baseline: `python-1.41.2`, `dotnet-1.74.0`) — note whether SK is still maintained or deprecated
- [ ] `microsoft/autogen` — Latest tag (baseline: `python-v0.7.5`) — note whether officially deprecated in favor of Agent Framework

#### 2. Pricing Validation
Query the Azure pricing pages for current rates (cache-verified via search engine if `$-` rendered):

- [ ] Azure OpenAI GPT-4.1 / GPT-5 / GPT-5.3 Codex / o3 / o4-mini rates
- [ ] GPT-5.1 / 5.2 / 5.4 sub-series (currently `$-` in static HTML)
- [ ] Priority Processing multipliers (baseline: +75%)
- [ ] Batch API discount (baseline: −50%)
- [ ] PTU monthly/yearly reservation rates (baseline: ~64%/~70% off hourly)
- [ ] Foundry Agent Service Hosted Agents compute rates (currently DOCUMENTATION GAP)
- [ ] Foundry Models catalog: DeepSeek V3.2 / R1 / V3 rates; Llama / Phi / Mistral (currently DOCUMENTATION GAP)
- [ ] Azure Container Apps Dynamic Sessions rate (baseline: $0.03/session-hour)
- [ ] Azure AI Search tier rates (Free / Basic / S1–S3 / L1–L2)
- [ ] Azure Monitor ingestion rates (Analytics / Basic / Auxiliary)

Query Vercel MCP / docs for:

- [ ] AI Gateway markup (confirm 0% on all providers)
- [ ] Sandbox SDK pricing tiers (Hobby / Pro / Enterprise)
- [ ] Workflow SDK pricing (steps + storage)
- [ ] Fluid Compute regional rates (iad1, sfo1, fra1, gru1 baseline)

#### 3. Feature Parity Check

- [ ] Vercel Changelog: Any new agent-related features since last update?
- [ ] Azure Foundry What's New: Any Foundry Agent Service / Agent Framework updates?
- [ ] Microsoft Build keynote (June 2-3, 2026) — any major announcements?
- [ ] New MCP server support on either platform?
- [ ] Hosted Agents status — still preview or GA?
- [ ] Computer Use tool regional expansion beyond East US 2 / South India?

#### 3b. Blessed Path Validation
Confirm the recommended approach hasn't changed:

- [ ] Vercel: Is `ToolLoopAgent` still the recommended agent abstraction? Check AI SDK docs.
- [ ] Azure: Is Microsoft Agent Framework still the blessed path? Check Agent Framework docs front page.
- [ ] Has SK or AutoGen been officially deprecated (not just superseded)?
- [ ] Is Foundry Agent Service Responses API still the canonical runtime? (Assistants API sunsets Aug 26, 2026)
- [ ] Has Agent Framework 1.0 had a 1.1 / 2.0 major release that changes the API?

#### 3c. Regional Availability Check
Use Azure documentation to verify regional availability:

- [ ] Check [Foundry Region Support](https://learn.microsoft.com/en-us/azure/foundry/reference/region-support) for updates
- [ ] Has Agent Service expanded beyond 24 regions?
- [ ] Has Computer Use tool expanded beyond East US 2 + South India?
- [ ] Has Code Interpreter tool filled the gaps (Japan East, South Central US, Southeast Asia, Spain Central)?
- [ ] Has o3-pro / codex-mini expanded beyond East US 2 + Sweden Central?
- [ ] Update the Regional Availability Matrix in section 2b if changed
- [ ] Has Vercel Sandbox expanded past `iad1`?
- [ ] Has Vercel Workflow backend expanded past `iad1`?

#### 4. Documentation Link Validation
Verify all URLs in "CROSS-REFERENCE LINKS" section are still valid:

- [ ] Spot-check 5 random links from each platform
- [ ] Update any 404s or redirected URLs
- [ ] Microsoft commonly renames/restructures `learn.microsoft.com` URLs — the `foundry-classic/` vs `foundry/` split is particularly fragile

### OUTPUT FORMAT

After validation, update the following sections in `Vercel-Azure-Base-Research-Prompt.md`:

1. **VALIDATED CITATIONS & REFERENCE DATA** — Update any changed values
2. **GitHub Repositories** — Update version tags
3. **APPENDIX A: PROMPT CHANGELOG** — Add new row with today's date and changes

Example changelog entry:
| 1.1.0 | YYYY-MM-DD | Updated SDK versions; refreshed pricing tables; added [new feature] |

### VALIDATION SUMMARY

At the end, provide a summary:

---
## Refresh Summary

**Date:** YYYY-MM-DD
**SDK Versions:**
- Vercel AI SDK: `ai@X.X.X` (was: `ai@6.0.168` stable / `7.0.0-beta.111` beta)
- Microsoft Agent Framework (Python): `agent-framework X.X.X` (was: `1.0.1`)
- Microsoft Agent Framework (.NET): `Microsoft.Agents.AI X.X.X` (was: `1.1.0`)
- Azure AI Projects: `azure-ai-projects X.X.X` (was: `2.1.0`)
- Azure AI Agents: `azure-ai-agents X.X.X` (was: `1.0.0b4`)
- Semantic Kernel: Python `X.X.X` / .NET `X.X.X` (was: `python-1.41.2` / `dotnet-1.74.0`)

**Pricing Changes:**
- [List any pricing changes or "No changes detected"]

**New Features:**
- [List new features added or "No new features"]

**Broken Links Fixed:**
- [List fixed links or "All links valid"]

**Documentation Gaps Remaining:**
- [List any data still missing from official sources]
---
```

---

### 🚀 Quick Refresh Command

Copy-paste this condensed version for rapid updates:

```
@Vercel-Azure-Base-Research-Prompt.md Refresh this master prompt:

1. Use GitHub MCP to check latest versions of:
   - vercel/ai (baseline: ai@6.0.168 stable / 7.0.0-beta.111 beta)
   - microsoft/agent-framework (baseline: Python 1.0.1, .NET Microsoft.Agents.AI 1.1.0)
   - Azure/azure-sdk-for-python sdk/ai/azure-ai-projects (baseline: 2.1.0)
   - Azure/azure-sdk-for-python sdk/ai/azure-ai-agents (baseline: 1.0.0b4)
   - microsoft/semantic-kernel (baseline: python-1.41.2, dotnet-1.74.0)
   - microsoft/autogen (baseline: python-v0.7.5)

2. Fetch learn.microsoft.com/en-us/azure/foundry/whats-new-foundry for any post-Apr-21 2026 announcements

3. Fetch azure.microsoft.com/en-us/pricing/details/azure-openai/ and /foundry-agent-service/ and /ai-foundry-models/ to validate pricing (cache-verify if $- rendered)

4. Use Vercel MCP / changelog to check for new entries since the last refresh date

5. Update the VALIDATED CITATIONS section with any changes

6. Add a new row to APPENDIX A: PROMPT CHANGELOG

Report what changed and what stayed the same.
```

---

### 📋 Changelog Entry Template

When updating the changelog, use this format:

```markdown
| X.X.X | YYYY-MM-DD | Brief description of changes |
```

Categories for changes:

- **Version bump** — SDK/API version updates
- **Pricing update** — Rate changes
- **Feature add** — New capabilities added to comparison
- **Citation fix** — Corrected or updated documentation links
- **Scope expansion** — Added new platforms/tools to comparison
- **Methodology update** — Changed comparison approach
- **GA transition** — Preview → GA status changes (relevant for MAF 1.x, Foundry Hosted Agents, Entra Agent ID, etc.)

