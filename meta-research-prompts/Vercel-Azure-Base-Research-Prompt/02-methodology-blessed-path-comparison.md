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

