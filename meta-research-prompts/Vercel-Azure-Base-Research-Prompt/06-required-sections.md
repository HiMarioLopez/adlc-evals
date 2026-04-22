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

