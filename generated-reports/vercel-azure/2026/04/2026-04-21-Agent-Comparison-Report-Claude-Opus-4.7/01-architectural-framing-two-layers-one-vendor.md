## 1. Architectural Framing — Two Layers, One Vendor

Every managed agent stack in 2026 has two layers. Compare them like-for-like or you'll compare the wrong things.

| Layer | Vercel | Azure (April 2026) |
|-------|--------|--------------------|
| **Agent Framework** (SDK for agent logic) | **AI SDK 6.x** — `ToolLoopAgent`, tools, `prepareStep`, streaming (stable); `WorkflowAgent` in v7 beta | **Microsoft Agent Framework 1.0** — `Agent`, `AIAgent`, `ChatClientAgent`, `SequentialBuilder`, `ConcurrentBuilder`, `HandoffOrchestration`, `GraphFlow`, `Magentic-One` (GA Apr 3, 2026) — unified successor to Semantic Kernel + AutoGen |
| **Infrastructure** (runtime, memory, deployment) | **Vercel Platform** — Fluid Compute (20 regions) + Sandbox SDK (GA) + Workflow SDK (GA) + Vercel Queues (GA) + AI Gateway + Chat SDK | **Microsoft Foundry Agent Service** — Responses API-based runtime (next-gen GA Mar 16, 2026); **Hosted Agents refresh (Public Preview · Apr 22, 2026)** — new backend (not ACA), per-session hypervisor sandbox, `$HOME`/files persistence, <100ms cold start, `$0.0994/vCPU-hr + $0.0118/GiB-hr`, 4 preview regions; Conversations API; Foundry Evaluations GA; Foundry Tracing GA (fully GA + hosted-agent tracing Preview); Foundry Toolbox Preview; Foundry Memory refresh Preview; AI Red Teaming Agent GA; Foundry MCP Server preview |
| **Model Layer** | AI Gateway (0% markup, 20+ providers, 100+ models, team-wide ZDR GA) | **Azure OpenAI** (Global / Data Zone / Regional / Priority / Batch / PTU — **9 deployment tiers total**) + **Foundry Models** catalog (DeepSeek, Llama, Mistral, Phi, MAI-*, 11,000+ total models) |

> ⚠️ **The single most important Azure fact of April 2026:** Microsoft shipped **Agent Framework 1.0 on April 3, 2026**. This SDK *explicitly unifies* Semantic Kernel and AutoGen. From the [GA announcement](https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-version-1-0/):
>
> > *"When we introduced Microsoft Agent Framework last October, we set out to unify the enterprise-ready foundations of Semantic Kernel with the innovative orchestrations of AutoGen into a single, open-source SDK… Coming from AutoGen or Semantic Kernel? Now is the time to migrate to Microsoft Agent Framework."*
>
> If you're starting a new Azure agent project in April 2026, **do not use Semantic Kernel or AutoGen directly**. Use Microsoft Agent Framework. Both predecessors remain maintained but are explicitly superseded. Official migration guides exist for [SK → MAF](https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-semantic-kernel) and [AutoGen → MAF](https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-autogen).

### Canonical Hello-World — Both Platforms Side by Side

```typescript
// ── Vercel ────────────────────────────────────────────────────
import { ToolLoopAgent, tool, isStepCount } from 'ai';
import { z } from 'zod';

const weatherTool = tool({
  description: 'Get weather for a city',
  inputSchema: z.object({ city: z.string() }),
  execute: async ({ city }) => `${city}: 72°F, Sunny`,
});

const agent = new ToolLoopAgent({
  model: 'openai/gpt-4.1',   // AI Gateway string shorthand
  instructions: 'You are a helpful weather assistant.',
  tools: { weather: weatherTool },
  stopWhen: isStepCount(20),
});

const result = await agent.generate({ prompt: 'Weather in SF?' });
```

```python
# ── Azure (Microsoft Agent Framework 1.0) ────────────────────
from agent_framework import Agent
from agent_framework.foundry import FoundryChatClient
from azure.identity.aio import DefaultAzureCredential

def get_weather(city: str) -> str:
    """Get weather for a city."""
    return f"{city}: 72°F, Sunny"

agent = Agent(
    client=FoundryChatClient(
        project_endpoint="https://<project>.services.ai.azure.com",
        model="gpt-4.1-mini",
        credential=DefaultAzureCredential(),
    ),
    name="WeatherAgent",
    instructions="You are a helpful weather assistant.",
    tools=[get_weather],
)

result = await agent.run("Weather in SF?")
```

> 📝 **Observation:** The Azure code is ~25% shorter than the AWS Strands equivalent because MAF took the Pythonic "any function with a docstring is a tool" pattern from AutoGen and dropped decorators. AI SDK's `tool()` builder is more explicit (Zod schemas) but produces richer type-safety on the TypeScript side. Trade-off, not a winner.

---

