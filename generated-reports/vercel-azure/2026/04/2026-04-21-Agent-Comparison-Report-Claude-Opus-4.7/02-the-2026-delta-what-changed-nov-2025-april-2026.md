## 2. The 2026 Delta — What Changed (Nov 2025 → April 2026)

Both platforms moved hard this window. Azure's story centers on **the Foundry rebrand + GA wave at Ignite 2025 → Q1 2026**. Vercel's centers on **Sandbox GA, Workflow GA, and Claude Opus 4.7**.

### 2.1 Azure Timeline (newest first)

| Date | Product | Headline |
|------|---------|----------|
| **Apr 22, 2026** | **Foundry "Complete Developer Journey" drop** | [Hub blog](https://devblogs.microsoft.com/foundry/from-local-to-production-the-complete-developer-journey-for-building-composing-and-deploying-ai-agents/) — coordinated 7-step release: **Hosted Agents refresh** (new backend, `$0.0994/vCPU-hr + $0.0118/GiB-hr`, 4 preview regions, `$HOME` persistence, <100ms cold start); **Foundry Toolbox** Public Preview (unified MCP endpoint); **Foundry Memory refresh** with native MAF + LangGraph integration; **Agent Harness** Preview (3 patterns); **Foundry Toolkit for VS Code GA**; **AI Red Teaming Agent GA**; **MAF v1.0** multi-model (Azure OpenAI + Anthropic + Gemini + Bedrock + Ollama); **M365/Teams one-click publish** Preview (Shared + Organization scopes). Launch customer: Sitecore. |
| **Apr 21, 2026** | Microsoft Agent 365 | [Frontier Suite](https://blogs.microsoft.com/blog/2026/04/21/accelerating-frontier-transformation-with-microsoft-partners/) announced; GA May 1 — unified agent control plane across Copilot Studio, Foundry, Fabric |
| **Apr 16, 2026** | Azure OpenAI | [o3 + o4-mini GA](https://azure.microsoft.com/en-us/blog/o3-and-o4-mini-unlock-enterprise-agent-workflows-with-next-level-reasoning-ai-with-azure-ai-foundry-and-github/) — reasoning + vision + Responses API; + `gpt-4o-transcribe`, `-mini-transcribe`, `-mini-tts` |
| **Apr 14, 2026** | Azure OpenAI | [GPT-4.1 series GA](https://azure.microsoft.com/en-us/blog/announcing-the-gpt-4-1-model-series-for-azure-ai-foundry-and-github-developers/) — 1M-token context, 26% cheaper than GPT-4o, SFT enabled; 15 PTU minimum for global |
| **Apr 8, 2026** | Microsoft Entra | [Entra Agent ID](https://techcommunity.microsoft.com/blog/microsoft-entra-blog/announcing-microsoft-entra-agent-id-secure-and-manage-your-ai-agents/3827392) expansion — agent identity blueprints, OAuth 2.0 OBO, Managed Identity federation (FIC/TUAMI). Originally previewed **May 19, 2025 (Build 2025)**; still in preview as of April 2026. |
| **Apr 3, 2026** | **Microsoft Agent Framework 1.0 GA** | [MAF 1.0 GA](https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-version-1-0/) — unified SK + AutoGen successor; stable APIs; `agent-framework 1.0.1` (Python) + `Microsoft.Agents.AI 1.1.0` (.NET); AutoGen officially enters maintenance mode |
| **Apr 2, 2026** | Open Source | [Agent Governance Toolkit](https://opensource.microsoft.com/blog/2026/04/02/introducing-the-agent-governance-toolkit-open-source-runtime-security-for-ai-agents/) — 7-package runtime security covering OWASP Agentic Top 10 |
| **Apr 2, 2026** | Foundry Models | [MAI-Transcribe-1, MAI-Voice-1, MAI-Image-2](https://microsoft.ai/news/today-were-announcing-3-new-world-class-mai-models-available-in-foundry/) — first-party Microsoft models |
| **Mar 31, 2026** | Durable Task Scheduler | [Consumption SKU GA](https://techcommunity.microsoft.com/blog/appsonazureblog/the-durable-task-scheduler-consumption-sku-is-now-generally-available/4506682) — pay-per-action, no upfront; 30-day orchestration history; managed backend for Durable Functions + Durable Task SDKs |
| **Mar 20, 2026** | Foundry | [Foundry MCP Server](https://learn.microsoft.com/en-us/azure/foundry/mcp/get-started) preview at `mcp.ai.azure.com` — cloud-hosted MCP, Entra auth |
| **Mar 20, 2026** | Semantic Kernel | [dotnet-1.74.0](https://github.com/microsoft/semantic-kernel/releases/tag/dotnet-1.74.0) — last major SK release before MAF 1.0; CVE-2026-26127 patched |
| **Mar 17, 2026** | Azure OpenAI | [GPT-5.4 mini ($0.75/$4.50) + GPT-5.4 nano ($0.20/$1.25)](https://techcommunity.microsoft.com/blog/azure-ai-foundry-blog/introducing-openai%E2%80%99s-gpt-5-4-mini-and-gpt-5-4-nano-for-low-latency-ai/4500569) for low-latency agentic subtasks — 400K context; agent-workhorse tier |
| **Mar 16, 2026** | **Foundry Agent Service** | [Next-gen GA](https://devblogs.microsoft.com/foundry/foundry-agent-service-ga/) — Responses API-based runtime (wire-compatible with OpenAI Agents SDK); BYO VNet; MCP auth expansion; Voice Live preview; Hosted Agents across 24 regions; old Assistants API sunsets Aug 26, 2026 |
| **Mar 16, 2026** | **Foundry Control Plane** | [Evaluations + Monitoring + Tracing GA](https://techcommunity.microsoft.com/blog/azure-ai-foundry-blog/generally-available-evaluations-monitoring-and-tracing-in-microsoft-foundry/4502760) — OTel-based distributed tracing, 30+ built-in evaluators + 9 agent-specific (Tool Call Accuracy, Task Adherence, Intent Resolution), Prompt Optimizer preview |
| **Mar 5, 2026** | Azure OpenAI | **GPT-5.4 GA** ([OpenAI launch](https://openai.com/index/introducing-gpt-5-4/)) — $2.50/$15 per 1M, 1.05M context, native computer-use; registration-gated on Azure |
| **Feb 27, 2026** | Azure OpenAI | `gpt-realtime-1.5` + `gpt-audio-1.5` for voice agent pipelines |
| **Feb 16, 2026** | Semantic Kernel | [dotnet-1.71.0](https://github.com/microsoft/semantic-kernel/releases/tag/dotnet-1.71.0) — SQL Server / Postgres hybrid search; SK → MAF migration guide |
| **Feb 13, 2026** | Foundry | [Guardrails for Agents](https://learn.microsoft.com/en-us/azure/foundry/guardrails/guardrails-overview) preview — 10 risk categories (Hate/Sexual/Violence/Self-harm/Prompt Shield/Indirect Attack/Protected Material code+text/PII/Task Adherence) at **4 intervention points** (user input, tool call, tool response, agent output) |
| **Feb 13, 2026** | Azure OpenAI (ChatGPT) | GPT-4o / GPT-4.1 / o4-mini retired from ChatGPT product; remain in API |
| **Feb 5, 2026** | Azure OpenAI | **GPT-5.3-Codex GA** — $1.75/$14 per 1M, coding + reasoning unified |
| **Jan 31, 2026** | Azure OpenAI | [o3-mini GA](https://azure.microsoft.com/en-us/blog/announcing-the-availability-of-the-o3-mini-reasoning-model-in-microsoft-azure-openai-service/) — replaces o1-mini; reasoning effort param, 200K context |
| **Jan 7, 2026** | Foundry Models | DeepSeek R1 becomes first major third-party open reasoning model in Foundry |
| **Dec 3, 2025** | Foundry | [Foundry MCP Server preview announced](https://devblogs.microsoft.com/foundry/announcing-foundry-mcp-server-preview/) |
| **Nov 25, 2025** | Agent Service | [Multi-Agent Workflows preview](https://devblogs.microsoft.com/foundry/introducing-multi-agent-workflows-in-foundry-agent-service) — visual + YAML orchestration on MAF (still preview Apr 2026) |
| **Nov 20, 2025** | Durable Task Scheduler | [Dedicated SKU GA](https://techcommunity.microsoft.com/blog/appsonazureblog/announcing-azure-functions-durable-task-scheduler-dedicated-sku-ga--consumption-/4465328) — 1 CU = **2,000 actions/sec + 50 GB** orchestration data; up to **90-day** retention on Dedicated (vs 30-day on Consumption) |
| **Nov 19, 2025** | Azure Developer CLI | [`azd ai agent`](https://devblogs.microsoft.com/azure-sdk/azure-developer-cli-foundry-agent-extension) preview — local-to-cloud agent publish in one command |
| **Nov 18, 2025** | **Microsoft Foundry rebrand** | [Ignite 2025 mega-drop](https://azure.microsoft.com/en-us/blog/microsoft-foundry-scale-innovation-on-a-modular-interoperable-and-secure-agent-stack/) — "Azure AI Foundry" → "Microsoft Foundry"; Foundry IQ, Model Router GA, Foundry Control Plane, Hosted Agents, Claude family added, Foundry Local on Android |
| **Nov 18, 2025** | Agent Service | [Ignite feature drop](https://techcommunity.microsoft.com/blog/azure-ai-foundry-blog/foundry-agent-service-at-ignite-2025-simple-to-build-powerful-to-deploy-trusted-/4469788) — built-in memory, Hosted Agents, Claude/Cohere/NVIDIA models, MCP integration, M365/Teams distribution |
| **Nov 18, 2025** | Content Safety | Task Adherence API preview — first Content Safety feature purpose-built for *agentic* (not just generative) AI |

### 2.2 Vercel Timeline (parallel, for context)

| Date | Headline |
|------|----------|
| **Apr 16, 2026** | Vercel Workflow GA (2× faster, E2E encrypted) + Claude Opus 4.7 on AI Gateway |
| **Apr 13, 2026** | Vercel Observability Plus: anomaly alerts GA |
| **Apr 9, 2026** | [Agentic Infrastructure blog](https://vercel.com/blog/agentic-infrastructure) |
| **Apr 8, 2026** | AI Gateway team-wide ZDR GA + Sandbox 32 vCPU / 64 GB Enterprise |
| **Mar 26, 2026** | Persistent Sandboxes beta |
| **Mar 17, 2026** | Workflow E2E encryption (AES-256-GCM, per-run HKDF-SHA256) + Vercel Plugin for Coding Agents |
| **Feb 23, 2026** | Vercel Chat SDK launch (Slack, Discord, Teams, WhatsApp, Telegram) |
| **Feb 17, 2026** | Claude Sonnet 4.6 on AI Gateway |
| **Feb 5, 2026** | Claude Opus 4.6 on AI Gateway |
| **Jan 30, 2026** | [Vercel Sandbox GA](https://vercel.com/blog/vercel-sandbox-is-now-generally-available) |
| **Jan 22, 2026** | Sandbox filesystem snapshots |
| **Jan 20, 2026** | Montréal `yul1` — 20th Fluid Compute region |
| **Jan 7, 2026** | [bash-tool](https://vercel.com/changelog/introducing-bash-tool-for-filesystem-based-context-retrieval) open-sourced |

### 2.3 Delta in One Sentence

**Azure went all-in on "Foundry-everything":** a rebrand, a GA-quality Responses-API runtime, a unified agent framework that explicitly kills SK+AutoGen as primary entry points, OTel-native observability, per-agent guardrails, cloud-hosted MCP, Durable Task Scheduler Consumption SKU for workflow orchestration, and a first-class identity model for agents. **Vercel doubled down on "use any workload, we'll run it durably":** Sandbox GA gave you microVMs for arbitrary code, Workflow GA gave you `"use workflow"` durability, Vercel Queues went GA under it, Chat SDK gave you multi-platform chat out of the box. Different philosophies: Azure sells you a managed agent runtime, Vercel sells you the compute + durability primitives under your own agent code.

**And on Apr 22** — one day after this report's prior refresh — Microsoft shipped the **"Complete Developer Journey"** drop: a new Hosted Agents backend with per-session hypervisor sandboxes and filesystem persistence (directly competing with Vercel Sandbox), Foundry Toolbox for unified tool management, Foundry Memory with MAF+LangGraph native integration, Agent Harness for long-running autonomous agents, AI Red Teaming Agent GA, and Foundry Toolkit for VS Code GA. See §2.5 for the 7-step mapping and §3.1 for the head-to-head against Vercel Sandbox.

### 2.5 The April 22, 2026 Foundry Drop — 7-Step Developer Journey

Microsoft packaged the Apr 22 release as a seven-step narrative. Mapped to Vercel equivalents and our matrix rows:

| # | Microsoft Step | Ships | Status | Vercel Equivalent | Our §/Row |
|---|----------------|-------|--------|-------------------|-----------|
| 1 | **Build locally** | MAF v1.0 + Foundry Toolkit for VS Code | **GA** + **GA** | AI SDK 6.x + Vercel CLI + Vercel Plugin for Coding Agents | §1 · §3 Agent Framework |
| 2 | **Agent Harness & Multi-Agent** | Local Shell / Hosted Shell / Context Compaction + GitHub Copilot SDK integration | Public Preview | `@vercel/sandbox` + bash-tool + AI SDK v7 `toolNeedsApproval` + DurableAgent | §3 Agent Harness (new row) |
| 3 | **Stateful agents** | Foundry Memory w/ native MAF + LangGraph integration | Preview (billing Jun 1) | DurableAgent state + Marketplace storage (Neon/Upstash/Supabase) | §3 Persistent Memory |
| 4 | **Tool management** | Foundry Toolbox (unified MCP endpoint) | Public Preview | `@ai-sdk/mcp` + mcp-handler + bash-tool | §3 Tool Management |
| 5 | **Host at scale** | Hosted Agents refresh | Public Preview (billing started Apr 22) | Vercel Sandbox (GA) + Fluid Compute + Workflow (GA) | §3 Infrastructure Wrapper · §3.1 head-to-head |
| 6 | **Observability** | Foundry Control Plane tracing + evals + **AI Red Teaming Agent** | Fully GA (hosted-agent tracing Preview · custom evals Preview) | AI SDK telemetry + Vercel Observability Plus + Braintrust (Marketplace) | §7 |
| 7 | **Distribute to users** | Publish to Teams + M365 Copilot (Shared + Organization scopes) | Public Preview | Vercel Chat SDK (Slack/Discord/Teams/WhatsApp/Telegram) | §3 Chat Integration |

**Launch customer:** Sitecore — SitecoreAI / Agentic Studio runs on MAF with Foundry IQ for brand-knowledge grounding.

> 📝 **What Microsoft did NOT ship:** There is no Azure equivalent to Vercel AI Gateway in this drop. MAF v1.0's multi-model support (Azure OpenAI, Anthropic, Gemini, Bedrock, Ollama) is at the **SDK layer** — it gives you code-level provider switching, not a runtime routing/fallback/BYOK gateway with 0% markup. The closest existing capability is Azure API Management with AI policies, which was not part of this announcement.

---

