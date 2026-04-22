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

