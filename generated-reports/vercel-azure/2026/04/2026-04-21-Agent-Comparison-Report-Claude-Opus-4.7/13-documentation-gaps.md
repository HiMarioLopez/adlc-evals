## 12. Documentation Gaps

### 12.1 Identified (unresolved as of April 22, 2026)

| Feature | Status | Workaround |
|---------|--------|-----------|
| GPT-5.1 / GPT-5.2 sub-series per-token rates (beyond base GPT-5.2) | `$-` in static HTML for some cached-input rates | Azure Pricing Calculator |
| Foundry Agent Service — Web Search / Custom Search / Deep Research rates | `$-` in static HTML | Azure Pricing Calculator |
| Foundry Agent Service max run lifetime / idle session timeout | Not as prominently documented as AWS's lifecycle settings | Check Foundry SDK reference |
| Llama 4 / Phi-4 on Foundry Models per-token rates | `$-` in static HTML | Azure Pricing Calculator |
| Mistral text model rates on Foundry Models | `$-` in static HTML | Azure Pricing Calculator |
| Azure AI Search Agentic Retrieval beyond 50M free tokens/month | `$-` in static HTML | Azure Pricing Calculator |
| GPT-5.x tokenizer inflation ratio | Not publicly documented (unlike Anthropic's Opus 4.7 tokenizer disclosure of 1.0–1.35×) | — |
| **Hosted Agents isolation VMM name** | Blog says "hypervisor isolation" / "isolated execution sandbox" without naming the hypervisor; predecessor backend used Hyper-V via ACA Dynamic Sessions | Await Microsoft architecture deep-dive |
| **Hosted Agents regional-expansion roadmap** | 4 preview regions only; no public timeline for additional regions | Docs state "list will be updated" |
| **Foundry Memory storage backend** | Not disclosed — managed abstraction (embedding model + chat model for extraction, but VS not named) | Treat as opaque |
| **Foundry Toolbox pricing model** | Not published Apr 22, 2026; underlying tools billed at existing rates when invoked | Await GA pricing |

**Root cause:** Azure's pricing pages are JavaScript-rendered SPAs. Static HTML fetches return `$-` placeholders. The figures cited in §5 were sourced from search-engine-cached renders and cross-validated against OpenAI direct pricing + third-party mirrors (pricepertoken.com, cloudzero.com). For production use, always verify via the Azure Pricing Calculator or the [Azure Retail Prices API](https://learn.microsoft.com/en-us/rest/api/cost-management/retail-prices/azure-retail-prices).

### 12.2 Resolved (this baseline)

| Feature | Resolution | Source |
|---------|------------|--------|
| Foundry Agent Service GA status | Next-gen GA Mar 16, 2026 (Responses API); first GA (Assistants API-based) May 19, 2025; Assistants API sunsets Aug 26, 2026 | [Foundry Agent Service GA Blog](https://devblogs.microsoft.com/foundry/foundry-agent-service-ga/) |
| Microsoft Agent Framework 1.0 status | Python `agent-framework 1.0.1` + .NET `Microsoft.Agents.AI 1.1.0` — both GA Apr 3, 2026; unified successor to SK + AutoGen | [Agent Framework 1.0 GA Blog](https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-version-1-0/) |
| Foundry Evaluations / Monitoring / Tracing | All three GA Mar 16, 2026 via Foundry Control Plane (OTel-based) | [Foundry Evaluations GA Blog](https://techcommunity.microsoft.com/blog/azure-ai-foundry-blog/generally-available-evaluations-monitoring-and-tracing-in-microsoft-foundry/4502760) |
| **Priority Processing multiplier** | **Model-specific**: +75% (×1.75) for GPT-4.1; **≈×2 (+100%)** for GPT-5 / 5.2 / 5.4 — verified from Azure pricing page | [Azure OpenAI Pricing](https://azure.microsoft.com/en-us/pricing/details/azure-openai/) |
| **Durable Task Scheduler GA dates** | Dedicated SKU GA **Nov 20, 2025**; Consumption SKU GA **Mar 31, 2026** | [Dedicated GA Blog](https://techcommunity.microsoft.com/blog/appsonazureblog/announcing-azure-functions-durable-task-scheduler-dedicated-sku-ga--consumption-/4465328) · [Consumption GA Blog](https://techcommunity.microsoft.com/blog/appsonazureblog/the-durable-task-scheduler-consumption-sku-is-now-generally-available/4506682) |
| **Durable Task Scheduler retention** | Dedicated: up to 90 days; Consumption: up to 30 days | [MS Learn billing](https://learn.microsoft.com/en-us/azure/durable-task/scheduler/durable-task-scheduler-billing) |
| **Computer Use tool regions** | **3 regions**: East US 2, Sweden Central, South India (updated from 2) | [Tool Best Practice](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/tool-best-practice) |
| **ACA Dynamic Sessions regions** | **38 regions** with Hyper-V isolation, Python / Node / Shell + custom containers | [ACA Sessions](https://learn.microsoft.com/en-us/azure/container-apps/sessions) |
| Vercel compute region count | **20 compute regions** per [vercel.com/docs/regions](https://vercel.com/docs/regions) canonical count; `yul1` (Jan 20, 2026) absorbed into 20 | [Vercel Regions docs](https://vercel.com/docs/regions) |
| SK vs MAF recommendation | SK is a migration target; MAF is blessed for new projects | [SK → MAF Migration](https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-semantic-kernel) |
| Microsoft Foundry naming | Rebranded Nov 18, 2025 (Ignite) from "Azure AI Foundry" to "Microsoft Foundry" | [Ignite 2025 Blog](https://azure.microsoft.com/en-us/blog/microsoft-foundry-scale-innovation-on-a-modular-interoperable-and-secure-agent-stack/) |
| Foundry Agent Service regional availability | 24 regions with sub-feature variance (Code Interpreter: 20, File Search: 22, Computer Use: 3) | [Foundry Region Support](https://learn.microsoft.com/en-us/azure/foundry/reference/region-support) |
| GPT-4.1 context window | 1M tokens across all three variants (full, mini, nano) | [GPT-4.1 GA Blog](https://azure.microsoft.com/en-us/blog/announcing-the-gpt-4-1-model-series-for-azure-ai-foundry-and-github-developers/) |
| Foundry MCP Server | Cloud-hosted preview at `mcp.ai.azure.com` since Mar 20, 2026 (announced Dec 3, 2025) | [Foundry MCP Docs](https://learn.microsoft.com/en-us/azure/foundry/mcp/get-started) |
| AutoGen status | `microsoft/autogen` in maintenance mode as of April 2026; community fork is `ag2ai/ag2` | [Agent Framework 1.0 GA Blog](https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-version-1-0/) |
| **Hosted Agents compute rates** | **`$0.0994/vCPU-hour + $0.0118/GiB-hour`** (active sessions only, scale-to-zero); billing started **Apr 22, 2026** | [Foundry "Complete Developer Journey" hub blog](https://devblogs.microsoft.com/foundry/from-local-to-production-the-complete-developer-journey-for-building-composing-and-deploying-ai-agents/) |
| **Hosted Agents cold start** | **<100ms** (first-party number from hub blog) | [Hub blog](https://devblogs.microsoft.com/foundry/from-local-to-production-the-complete-developer-journey-for-building-composing-and-deploying-ai-agents/) |
| **Hosted Agents sandbox sizes** | 0.25 vCPU / 0.5 GiB → **2 vCPU / 4 GiB** ceiling (preview) | [Hosted Agents concepts](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents) |
| **Hosted Agents concurrent session limit** | **50 per subscription per region** during preview (adjustable via Support) | [Hosted Agents concepts](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents) |
| **Hosted Agents session lifecycle** | 15-min idle timeout → scale-to-zero with state persistence; 30-day max session lifetime | [Hosted Agents concepts](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents) |
| **Hosted Agents new-backend regions** | **4 preview regions** — Australia East, Canada Central, North Central US, Sweden Central; requires `azd ext install azure.ai.agents` v0.1.26-preview+ | [Hosted Agents concepts](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents) |
| **Foundry Memory pricing** | `$0.25/1K events` (short-term) + `$0.25/1K memories/month` (long-term) + `$0.50/1K retrievals`; **billing begins Jun 1, 2026** (free during preview) | [Hub blog](https://devblogs.microsoft.com/foundry/from-local-to-production-the-complete-developer-journey-for-building-composing-and-deploying-ai-agents/) |
| **Foundry Toolbox** | Public Preview Apr 22, 2026 — unified MCP endpoint bundling Web Search, File Search, Code Interp, AI Search, MCP, OpenAPI, A2A; endpoint at `{project}/toolboxes/{name}/mcp` with `Foundry-Features: Toolboxes=V1Preview` header | [Toolbox how-to](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/toolbox) |
| **AI Red Teaming Agent status** | **GA** as of Apr 22, 2026 (was Preview) | [AI Red Teaming Agent concept](https://learn.microsoft.com/en-us/azure/foundry/concepts/ai-red-teaming-agent) |
| **Foundry Toolkit for VS Code status** | **GA** as of Apr 22, 2026 (renamed from AI Toolkit for VS Code) | [Hub blog](https://devblogs.microsoft.com/foundry/from-local-to-production-the-complete-developer-journey-for-building-composing-and-deploying-ai-agents/) |
| **MAF v1.0 multi-model support** | Azure OpenAI, Anthropic, Google Gemini, Amazon Bedrock, Ollama (SDK-layer provider switching) | [Hub blog](https://devblogs.microsoft.com/foundry/from-local-to-production-the-complete-developer-journey-for-building-composing-and-deploying-ai-agents/) |

---

