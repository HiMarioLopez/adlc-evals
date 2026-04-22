## 6. Code Examples

Side-by-side comparison of agent implementation patterns.

### 6.1 Vercel Stack (TypeScript)

#### ToolLoopAgent

```typescript
import { ToolLoopAgent, tool, isStepCount } from 'ai';
import { z } from 'zod';

// Define a tool with v6 API (inputSchema, not parameters)
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
  model: 'anthropic/claude-sonnet-4.6',
  instructions: 'You are a helpful weather assistant.',
  tools: { weather: weatherTool },
  stopWhen: isStepCount(20),
});

const result = await weatherAgent.generate({
  prompt: 'What is the weather in San Francisco?',
});
```

**Key additions since 6.0.23:**

- **`prepareStep` option** — per-step model/tool overrides
- **`callOptionsSchema` + `prepareCall`** — typed call-time context injection
- **`dynamicTool()`** — runtime-typed tools for MCP/external sources
- **`toModelOutput` on tools** — control what parent agent sees from subagent output
- **`InferAgentUIMessage<typeof agent>`** — type utility for typed chat UI
- **`isLoopFinished()`** — new third built-in stop condition (no step limit)
- **`readUIMessageStream()`** — consume UI message streams in subagents
- **`webSearch_20250305` tool** — Anthropic-native web search

**Stop conditions (three built-ins + custom):**

```typescript
import { isStepCount, hasToolCall, isLoopFinished } from 'ai';

stopWhen: isStepCount(50)                              // step limit
stopWhen: hasToolCall('finalAnswer')                   // sentinel tool pattern
stopWhen: hasToolCall('submit', 'abort')               // any of these
stopWhen: isLoopFinished()                             // no limit
stopWhen: [isStepCount(20), hasToolCall('done')]       // OR logic
stopWhen: ({ steps }) => steps.at(-1)?.text?.includes('COMPLETE') // custom
```

#### Sandbox SDK (GA Jan 30, 2026)

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

```python
# Python SDK
from vercel.sandbox import Sandbox

with Sandbox.create(runtime="python3.13") as sandbox:
    command = sandbox.run_command("python", ["-c", "print('hello world')"])
    print(command.stdout())
```

#### Workflow SDK (GA Apr 16, 2026)

```typescript
// Workflow GA as of Apr 16, 2026.
// E2E encrypted by default (AES-256-GCM, per-run HKDF keys).
// 2x faster than beta. Event-sourced architecture.
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
import { createBashTool, experimental_createSkillTool } from "bash-tool";
import { Sandbox } from "@vercel/sandbox";

// In-memory filesystem (zero VM overhead)
const { tools } = await createBashTool({
  files: { "src/index.ts": "export const hello = 'world';" },
});

// With Vercel Sandbox for full VM isolation
const sandbox = await Sandbox.create();
const { tools: vmTools } = await createBashTool({ sandbox });

// Skills support (Jan 21, 2026)
const { tools: skillsTools } = await experimental_createSkillTool({
  skillsDirectory: "./skills",
});
```

#### AI SDK v7 Beta

AI SDK v7 is in active beta at `7.0.0-beta.111` (Apr 17, 2026). Not production-ready; no migration guide yet. Breaking changes:

- **ESM-only packages** (CommonJS removed)
- **`WorkflowAgent`** primitive in `@ai-sdk/workflow` — durable/resumable agents for Vercel Workflows
- **`@ai-sdk/otel`** — dedicated OpenTelemetry package; `experimental_telemetry` promoted to stable
- **`toolNeedsApproval`** — human-in-the-loop tool approval
- **`uploadFile` / `uploadSkill`** — provider abstractions for file/skill uploads
- **`runtimeContext`** rename (from `context`)

#### Chat SDK (Feb 23, 2026)

```typescript
// npm i chat
import { Chat } from 'chat';

const chat = new Chat();
// Deploy to Slack, Discord, Teams, WhatsApp, Telegram, Google Chat, GitHub, Linear
// ... from a single codebase
```

### 6.2 AWS Stack (Python / Cedar)

#### Strands Agent

```python
from strands import Agent, tool
from strands.models import BedrockModel

@tool
def get_weather(city: str) -> str:
    """Get weather for a city."""
    return f"Weather in {city}: 72F, Sunny"

# BedrockModel with service tier (Strands v1.35.0, Apr 2026)
agent = Agent(
    model=BedrockModel(
        model_id="us.anthropic.claude-sonnet-4-6",
        service_tier="standard",  # priority | standard | flex
        streaming=True,
    ),
    tools=[get_weather],
    system_prompt="You are a helpful weather assistant.",
)

result = agent("What's the weather in Seattle?")
print(result.message)
```

**Notable Strands additions since v1.21.0 (Jan baseline):**

| Version | Date | Addition |
|---------|------|----------|
| v1.22.0 | 2026-01-13 | MCP resource operations; Bedrock Guardrails `guardrail_latest_message` |
| v1.23.0 | 2026-01-21 | Configurable `ModelRetryStrategy`; Model Response Steering |
| v1.24.0 | 2026-01-29 | Automatic Bedrock prompt caching; `ToolProvider` out of experimental |
| v1.25.0 | 2026-02-05 | **`A2AAgent`** — first-class A2A client |
| v1.27.0 | 2026-02-25 | `concurrent_invocation_mode`; `add_hook()` |
| v1.28.0 | 2026-03-04 | **Plugin system** (`Plugin` ABC) |
| v1.30.0 | 2026-03-19 | **Agent Skills as a plugin**; Steering moved to production |
| v1.33.0 | 2026-03-24 | ⚠️ Security: Hard-pinned `litellm<=1.82.6` (supply-chain mitigation) |
| v1.34.0 | 2026-03-31 | **`AgentAsTool`** — pass `Agent` instances directly in `tools=[]` |
| v1.35.0 | 2026-04-08 | **Bedrock service tier support** (`service_tier` on `BedrockModel`) |
| v1.36.0 | 2026-04-17 | Agent snapshot API (`take_snapshot()` / `load_snapshot()`); callable hooks |

#### Bedrock AgentCoreApp

```python
from bedrock_agentcore.runtime import BedrockAgentCoreApp
from strands import Agent
from strands.models import BedrockModel

app = BedrockAgentCoreApp()  # Infrastructure layer
agent = Agent(model=BedrockModel(model_id="us.anthropic.claude-sonnet-4-6"))

@app.entrypoint
def invoke(payload):
    result = agent(payload.get("prompt"))
    return {"result": str(result.message)}

# New protocol adapters (v1.4.7+):
# from bedrock_agentcore.runtime import serve_a2a, serve_ag_ui

if __name__ == "__main__":
    app.run()
```

**Decorators available:**

| Decorator | Purpose |
|-----------|---------|
| `@app.entrypoint` | Main invocation handler (`POST /invocations`) |
| `@app.ping` | Custom health check (`GET /ping`) |
| `@app.websocket` | WebSocket handler |
| `@app.async_task` | Mark async tasks for busy-status tracking |

#### Cedar Policy (GA Mar 3, 2026)

```hcl
// Policy in AgentCore GA as of Mar 3, 2026 (13 regions).
// Included in Runtime/Gateway pricing at GA.

permit(
  principal is AgentCore::OAuthUser,
  action == AgentCore::Action::"RefundTool__process_refund",
  resource == AgentCore::Gateway::"arn:aws:bedrock-agentcore:..."
)
when {
  principal.hasTag("username") &&
  principal.getTag("username") == "John" &&
  context.input.amount < 500
};
```

#### AgentCore Memory

```python
# Bedrock AgentCore Memory - Built-in strategies (15 regions)
# New since Jan 8: Kinesis streaming notifications + read_only flag (v1.6.1)

from bedrock_agentcore.memory.integrations.strands import (
    AgentCoreMemorySessionManager,
)

session_mgr = AgentCoreMemorySessionManager(
    memory_id="mem-abc123",
    actor_id="user-xyz",
    region_name="us-east-1",
    read_only=False,  # NEW v1.6.1
)

# Long-term strategies:
# Built-in:          $0.75/1K records/month
# Built-in Override: $0.25/1K records/month
# Self-Managed:      $0.25/1K + inference
```

**Strategy types** (added via `add_*_strategy`):
- `add_semantic_strategy` — Semantic similarity extraction
- `add_summary_strategy` — Conversation summarization
- `add_user_preference_strategy` — Preference extraction
- `add_episodic_strategy` — Episodic memory (added v1.1.5)

#### Evaluations (GA Mar 31, 2026)

```python
# AgentCore Evaluations GA as of Mar 31, 2026 (9 regions).
# 13 built-in evaluators + custom Lambda evaluators.

from bedrock_agentcore.evaluation import EvaluationClient

client = EvaluationClient(region_name="us-west-2")

results = client.run(
    evaluator_ids=["accuracy", "toxicity"],
    session_id="sess-123",
    agent_id="my-agent",
)

for r in results:
    print(f"{r['evaluatorId']}: {r.get('value')}")
```

**Pricing:**
- Built-in evaluators: $0.0024/1,000 input tokens + $0.012/1,000 output tokens
- Custom evaluators: $1.50/1,000 evaluations + separate model inference

### 6.3 Pattern Comparisons

| Pattern | Vercel | AWS |
|---------|--------|-----|
| **Agent Abstraction** | `ToolLoopAgent` | `Agent` from Strands |
| **Loop Control** | `stopWhen: isStepCount(N)` | Policy-driven via Cedar (GA) |
| **Infrastructure Wrapper** | Platform handles deployment | `@app.entrypoint` decorator |
| **Model Cost Tier** | AI Gateway 0% markup | `service_tier='priority' / 'standard' / 'flex'` |
| **Memory** | `DurableAgent` / Marketplace storage | Built-in `AgentCoreMemorySessionManager` |
| **MCP** | `@ai-sdk/mcp` client + `mcp-handler` server | `McpTool` + Gateway MCP Server |
| **Observability** | `experimental_telemetry` → Vercel Observability Plus | OTEL → CloudWatch / AgentCore Observability |

---

