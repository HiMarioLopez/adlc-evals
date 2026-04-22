## ARCHITECTURAL CLARIFICATION

Both platforms have a **two-layer architecture**. Compare like-for-like:

| Layer | Vercel | AWS |
|-------|--------|-----|
| **Agent Framework** (SDK for building agents) | AI SDK 6.x (`ToolLoopAgent`, tools, streaming) — v7 beta available | **Strands Agents SDK** (`Agent`, tools, model routing, plugins, Swarm/Graph) |
| **Infrastructure** (Runtime, memory, deployment) | Fluid Compute + Sandbox SDK (GA) + Workflow SDK (GA) + AI Gateway + Chat SDK | **BedrockAgentCoreApp** (Runtime, Memory, Gateway, Identity, Policy GA, Evaluations GA, Agent Registry preview) |

> ⚠️ **Key Insight:** `bedrock-agentcore-sdk-python` is NOT the agent framework — it's the infrastructure wrapper. The actual agent logic uses **Strands SDK**. This is analogous to how Vercel's AI SDK handles agent logic while Vercel's platform (Fluid Compute, Sandbox, Workflow) provides infrastructure.

> 🎉 **Since the January 2026 baseline:** Vercel Sandbox went GA (Jan 30, 2026), Vercel Workflow went GA (Apr 16, 2026), AgentCore Policy went GA (Mar 3, 2026), AgentCore Evaluations went GA (Mar 31, 2026), AWS Agent Registry launched in preview (Apr 9, 2026), and AgentCore Runtime added AG-UI protocol support alongside MCP and A2A.

```python
# AWS Pattern: Strands = Agent Framework, AgentCore = Infrastructure
from bedrock_agentcore import BedrockAgentCoreApp
from strands import Agent

app = BedrockAgentCoreApp()  # Infrastructure layer
agent = Agent()               # Agent framework layer

@app.entrypoint
def invoke(payload):
    result = agent(payload.get("prompt"))
    return {"result": result.message}
```

```typescript
// Vercel Pattern: AI SDK = Agent Framework, Platform = Infrastructure
import { ToolLoopAgent } from 'ai';

const agent = new ToolLoopAgent({  // Agent framework layer
  model: provider('claude-4-sonnet'),
  tools: [myTool],
});
// Deployed on Vercel Fluid Compute / Sandbox (Infrastructure layer)
```

