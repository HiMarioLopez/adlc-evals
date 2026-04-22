## 9. Code Examples

Side-by-side comparison of agent implementation patterns on the blessed path.

### 9.1 Vercel Stack (TypeScript)

#### ToolLoopAgent

```typescript
import { ToolLoopAgent, tool, isStepCount } from 'ai';
import { z } from 'zod';

const weatherTool = tool({
  description: 'Get the weather in a location',
  inputSchema: z.object({
    location: z.string().describe('City name'),
  }),
  execute: async ({ location }) => ({
    location,
    temperature: 72,
  }),
});

// AI Gateway string shorthand — 0% markup
export const weatherAgent = new ToolLoopAgent({
  model: 'openai/gpt-4.1',
  instructions: 'You are a helpful weather assistant.',
  tools: { weather: weatherTool },
  stopWhen: isStepCount(20),
});

const result = await weatherAgent.generate({
  prompt: 'What is the weather in San Francisco?',
});
```

#### Sandbox (GA)

```typescript
import { Sandbox } from '@vercel/sandbox';

// Sandbox GA as of Jan 30, 2026.
// Enterprise: up to 32 vCPUs / 64 GB RAM.
const sandbox = await Sandbox.create({
  runtime: 'node22',
});

const result = await sandbox.runCommand('node', [
  '-e',
  'console.log("hello")',
]);

console.log(result.stdout);
await sandbox.close();
```

#### Workflow (GA)

```typescript
// Workflow GA as of Apr 16, 2026.
// E2E encrypted by default (AES-256-GCM, per-run HKDF keys).
export async function processOrder(orderId: string) {
  "use workflow";

  const order = await validateOrder(orderId);
  const payment = await processPayment(order);
  const fulfillment = await shipOrder(order);

  return fulfillment;
}
```

#### bash-tool

```typescript
import { createBashTool } from "bash-tool";
import { Sandbox } from "@vercel/sandbox";

// In-memory filesystem (zero VM overhead)
const { tools } = await createBashTool({
  files: { "src/index.ts": "export const hello = 'world';" },
});

// With Vercel Sandbox for full VM isolation
const sandbox = await Sandbox.create();
const { tools: vmTools } = await createBashTool({ sandbox });
```

### 9.2 Azure Stack (Python / C#)

#### Agent Framework 1.0

```python
# pip install agent-framework
from agent_framework import Agent
from agent_framework.foundry import FoundryChatClient
from azure.identity.aio import DefaultAzureCredential

def get_weather(city: str) -> str:
    """Get weather for a city."""
    return f"Weather in {city}: 72F, Sunny"

# Microsoft Agent Framework 1.0 (GA Apr 3, 2026)
# Unified successor to Semantic Kernel + AutoGen
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

result = await agent.run("What's the weather in Seattle?")
print(result)
```

#### Foundry Agent Service

```python
# pip install azure-ai-projects azure-ai-agents azure-identity
import os, time
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.agents.models import ListSortOrder, FunctionTool

def get_weather(location: str) -> str:
    """Get current weather for a location."""
    return f"Weather in {location}: 22C, Sunny"

functions = FunctionTool(functions={get_weather})

project_client = AIProjectClient(
    endpoint=os.environ["PROJECT_ENDPOINT"],
    credential=DefaultAzureCredential(),
)

with project_client:
    agents_client = project_client.agents
    agent = agents_client.create_agent(
        model=os.environ["MODEL_DEPLOYMENT_NAME"],
        name="weather-agent",
        instructions="You are a helpful weather assistant.",
        tools=functions.definitions,
    )
    thread = agents_client.threads.create()
    # ... message, run, poll loop with SubmitToolOutputsAction dispatch ...
```

#### Hosted Agents + agent.yaml

```yaml
# agent.yaml — Foundry Hosted Agents manifest (Preview)
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

#### McpTool (Native MCP)

```python
from azure.ai.agents.models import McpTool

# Native MCP client in azure-ai-agents
mcp_tool = McpTool(
    server_label="github",
    server_url="https://gitmcp.io/Azure/azure-rest-api-specs",
    allowed_tools=[],
)
mcp_tool.allow_tool("search_azure_rest_api_code")

# Foundry MCP Server (cloud-hosted, preview Mar 20, 2026):
# https://mcp.ai.azure.com — Entra ID auth, no infra to deploy

agent = agents_client.create_agent(
    model=os.environ["MODEL_DEPLOYMENT_NAME"],
    name="my-mcp-agent",
    tools=mcp_tool.definitions,
)
```

#### Foundry Tracing (GA)

```python
# Foundry Monitoring & Tracing GA as of Mar 16, 2026.
# OpenTelemetry-native, one-call setup.

from opentelemetry import trace
from azure.monitor.opentelemetry import configure_azure_monitor

configure_azure_monitor(
    connection_string=os.environ["APPLICATIONINSIGHTS_CONNECTION_STRING"]
)

tracer = trace.get_tracer(__name__)
with tracer.start_as_current_span("agent-scenario"):
    # All subsequent Agent SDK calls auto-traced
    run = project_client.agents.runs.create_and_process(
        thread_id=thread.id, agent_id=agent.id
    )
```

### 9.3 Pattern Comparisons

| Pattern | Vercel | Azure |
|---------|--------|-------|
| **Agent Abstraction** | `ToolLoopAgent` | `Agent` from `agent_framework` |
| **Loop Control** | `stopWhen: isStepCount(N)` | Server-driven run lifecycle (`requires_action` → `submit_tool_outputs`) |
| **Infrastructure Wrapper** | Platform handles deployment | `from_agent_framework()` + `agent.yaml` |
| **Model Cost Tier** | AI Gateway 0% markup | Global / Data Zone / Regional / Priority / Batch / PTU (priority: ×1.75 GPT-4.1, ×2 GPT-5 series · batch: −50%) |
| **MCP** | `@ai-sdk/mcp` client + `mcp-handler` server | `McpTool` + Foundry MCP Server |
| **Observability** | `experimental_telemetry` → Vercel Observability Plus | OTEL → Azure Monitor via `configure_azure_monitor()` |

---

