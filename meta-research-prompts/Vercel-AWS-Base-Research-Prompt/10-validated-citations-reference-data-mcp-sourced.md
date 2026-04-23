## VALIDATED CITATIONS & REFERENCE DATA (MCP-Sourced)

> **Last Validated:** 2026-04-21

### GitHub Repository References

| Platform | Repository | Language | Latest Tag (Apr 21, 2026) |
|----------|------------|----------|---------------------------|
| Vercel AI SDK (stable) | [vercel/ai](https://github.com/vercel/ai) | TypeScript | `ai@6.0.168` |
| Vercel AI SDK (v7 beta) | [vercel/ai](https://github.com/vercel/ai) | TypeScript | `ai@7.0.0-beta.111` |
| Vercel Workflow | [`@ai-sdk/workflow`](https://github.com/vercel/ai) | TypeScript | Part of AI SDK v7 beta |
| AWS AgentCore SDK | [aws/bedrock-agentcore-sdk-python](https://github.com/aws/bedrock-agentcore-sdk-python) | Python | `v1.6.3` |
| Strands Agents (Python) | [strands-agents/sdk-python](https://github.com/strands-agents/sdk-python) | Python | `v1.37.0` (Apr 22, 2026 — now powers AgentCore managed harness) |
| AgentCore CLI | [aws/agentcore-cli](https://github.com/aws/agentcore-cli) | TypeScript (npm `@aws/agentcore`) | `v0.9.1` stable / `v1.0.0-preview.1` preview (Apr 22, 2026) |
| Strands Agents (TypeScript) | [strands-agents/sdk-typescript](https://github.com/strands-agents/sdk-typescript) | TypeScript | `v1.0.0-rc.4` (RC, not GA) |
| Spring AI AgentCore SDK | (AWS) | Java | GA Apr 14, 2026 |

### SDK Language Support Matrix

**Source:** [AgentCore Developer Guide](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/develop-agents.html)

| Layer | Vercel | AWS | Language |
|-------|--------|-----|----------|
| **Agent Framework** | AI SDK 6.x stable (v7 beta) | Strands Agents SDK | TS/JS vs Python + TS RC + Java GA |
| **Infrastructure SDK** | `@vercel/sandbox`, `@ai-sdk/workflow` | `bedrock-agentcore-sdk-python`, Spring AI AgentCore | TS + Python (Workflow Python beta); Python + Java |

| SDK | Primary Language | Other Languages | Role |
|-----|------------------|-----------------|------|
| **Vercel AI SDK 6.x** (stable) | TypeScript/JavaScript | — | Agent framework (`ToolLoopAgent`, tools, streaming, orchestration) |
| **Vercel AI SDK v7** (beta) | TypeScript/JavaScript | — | Next-gen: ESM-only, `WorkflowAgent`, `@ai-sdk/otel`, `toolNeedsApproval` |
| **Strands Agents SDK (Python)** | Python | — | Agent framework (`Agent`, `Swarm`, `Graph`, `AgentAsTool`, Plugins) |
| **Strands Agents SDK (TypeScript)** | TypeScript/JavaScript | — | RC (not GA); feature-complete with Python: Swarm, Graph, MCP, A2A, `VercelModel` adapter |
| **bedrock-agentcore-sdk-python** | Python | — | Infrastructure wrapper (`BedrockAgentCoreApp`, `EvaluationClient`, `ResourcePolicyClient`, `serve_a2a`, `serve_ag_ui`) |
| **Spring AI AgentCore SDK** | Java | — | Java-first AgentCore development (GA Apr 14, 2026) |

> ⚠️ **Critical Distinction:** The `bedrock-agentcore-sdk-python` is NOT for building agent logic — it's for deploying agents to AgentCore infrastructure. Agent logic is written with **Strands SDK**. This is like how you use AI SDK for agent logic but deploy on Vercel's platform.

> 📝 **Methodological Note:** Compare AI SDK 6.x ↔ Strands SDK for agent framework features. Compare Vercel Platform ↔ AgentCore for infrastructure features. Don't conflate the two layers.

### AWS Bedrock AgentCore Pricing (GA) — US East (N. Virginia)

**Source:** [AWS AgentCore Pricing](https://aws.amazon.com/bedrock/agentcore/pricing/) — validated April 2026

| Service | Resource | Price |
|---------|----------|-------|
| **Runtime** | CPU | $0.0895 per vCPU-hour (I/O wait free) |
| **Runtime** | Memory | $0.00945 per GB-hour |
| **Browser Tool** | CPU | $0.0895 per vCPU-hour |
| **Browser Tool** | Memory | $0.00945 per GB-hour |
| **Browser Tool** | S3 Profile Storage | **NEW — S3 Standard rates effective Apr 15, 2026** |
| **Code Interpreter** | CPU | $0.0895 per vCPU-hour |
| **Code Interpreter** | Memory | $0.00945 per GB-hour |
| **Gateway** | API Invocations (ListTools, InvokeTool, Ping) | $0.005 per 1,000 invocations |
| **Gateway** | Search API | $0.025 per 1,000 invocations |
| **Gateway** | Tool Indexing | $0.02 per 100 tools indexed/month |
| **Identity** | Token/API key requests (non-AWS) | $0.010 per 1,000 requests |
| **Memory** | Short-Term (events) | $0.25 per 1,000 new events |
| **Memory** | Long-Term Storage (built-in) | $0.75 per 1,000 records/month |
| **Memory** | Long-Term Storage (built-in override / self-managed) | $0.25 per 1,000 records/month |
| **Memory** | Long-Term Retrieval | $0.50 per 1,000 retrievals |
| **Policy (GA)** | Cedar-based auth | Included in Runtime/Gateway pricing (no separate SKU at GA) |
| **Evaluations (GA)** | Built-in evaluators — input tokens | $0.0024 per 1,000 input tokens |
| **Evaluations (GA)** | Built-in evaluators — output tokens | $0.012 per 1,000 output tokens |
| **Evaluations (GA)** | Custom evaluators | $1.50 per 1,000 evaluations + model inference |
| **Observability** | Spans, logs, metrics | CloudWatch pricing applies; ~$0.35/GB span ingestion |
| **AWS Agent Registry (Preview)** | Discovery + search | Preview — no published rates yet |

**Bedrock Service Tiers** (new since Jan 8 baseline; accessible via Strands `BedrockModel(service_tier=...)` in v1.35.0):

| Tier | Multiplier vs Standard | Use Case |
|------|------------------------|----------|
| **Priority** | +75% premium | Latency-sensitive user-facing agents |
| **Standard** | Baseline | Default |
| **Flex** | −50% discount | Agentic batch workflows, background tasks |

### Claude Pricing via Amazon Bedrock — April 2026

**Source:** [Claude Opus 4.7 Launch Blog](https://aws.amazon.com/blogs/aws/introducing-anthropics-claude-opus-4-7-model-in-amazon-bedrock/) + [Claude Opus 4.5 Launch Blog](https://aws.amazon.com/blogs/machine-learning/claude-opus-4-5-now-in-amazon-bedrock/) + [Anthropic Pricing Docs](https://platform.claude.com/docs/en/docs/about-claude/pricing)

| Model | Input ($/MTok) | Output ($/MTok) | Cache Write 5m | Cache Write 1h | Cache Read | Notes |
|-------|---------------|-----------------|----------------|----------------|------------|-------|
| **Claude Opus 4.7** ⭐ (Apr 16, 2026) | $5.00 | $25.00 | $6.25 | $10.00 | $0.50 | New tokenizer: 1.0–1.35× inflation vs 4.6; adds `effort: 'xhigh'`; adaptive thinking (no `budget_tokens`) |
| **Claude Opus 4.6** (Feb 5, 2026) | $5.00 | $25.00 | $6.25 | $10.00 | $0.50 | 1M-token context; adaptive thinking |
| Claude Opus 4.5 (Nov 2025) | $5.00 | $25.00 | $6.25 | $10.00 | $0.50 | |
| **Claude Sonnet 4.6** ⭐ (Feb 17, 2026) | $3.00 | $15.00 | $3.75 | $6.00 | $0.30 | Drop-in upgrade from 4.5; best computer-use (OSWorld-Verified: 72.5%, SWE-bench Verified: 79.6%) |
| Claude Sonnet 4.5 (Sep 2025) | $3.00 | $15.00 | $3.75 | — | $0.30 | Baseline from Jan 8 report — unchanged |
| Claude Haiku 4.5 (Sep 2025) | $1.00 | $5.00 | $1.25 | — | $0.10 | Batch: $0.50/$2.50 |

**Note:** The AI Gateway passes Bedrock and Anthropic-direct models through at **provider list price with 0% markup** (confirmed in Vercel AI Gateway docs). BYOK and managed-credential billing paths cost the same per token.

### Vercel Platform Pricing — April 2026

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
| **Fluid Compute** | Provisioned Memory (US East) | $0.0106/GB-hour |
| **AI Gateway** | Model token pass-through | $0 markup (provider list price) |
| **AI Gateway** | Free tier | $5/month credit included |
| **AI Gateway** | ZDR (team-wide) | $0 additional (Pro + Enterprise, Apr 8, 2026) |
| **Secure Compute** | Enterprise subscription | $6,500/year |
| **Secure Compute** | Secure Connect Data Transfer | $0.15/GB |

> ⚠️ **"AI Units v2026" clarification:** The Jan 8 baseline referenced "AI Units" which does NOT exist as a public SKU. The actual billing units are **Fast Data Transfer (FDT)** for edge/CDN traffic (regional pricing) and **AI Gateway Credits** for gateway billing (zero-markup pass-through). Use current terminology in refresh reports.

### AWS AgentCore Runtime Configuration

**Source:** [AgentCore Runtime Lifecycle Settings](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-lifecycle-settings.html)

| Parameter | Default | Range |
|-----------|---------|-------|
| `idleRuntimeSessionTimeout` | 900 seconds (15 min) | 60–28,800 seconds |
| `maxLifetime` | 28,800 seconds (8 hours) | 60–28,800 seconds |

**Key Fact:** AgentCore Runtime supports **up to 8-hour execution windows** with per-second billing based on actual CPU/memory consumption.

### AgentCore Policy (Cedar-Based Authorization)

**Source:** [AgentCore Policy Documentation](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/policy.html)

- Uses **Cedar policy language** (open-source) for declarative authorization
- Policies evaluated via Gateway intercept before tool execution
- Supports natural language → Cedar conversion via NL2Cedar
- Enforcement modes: `ENFORCE` (block violations) or `MONITOR` (log only)
- Default-deny semantics with forbid-wins precedence

**Source:** [Cedar Policy Core Concepts](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/policy-core-concepts.html)

### Vercel Agent Stack Components

#### 0. Vercel AI Gateway — Model Routing & Abstraction

**Source:** [AI Gateway Documentation](https://github.com/vercel/ai/blob/main/content/providers/01-ai-sdk-providers/00-ai-gateway.mdx)

```typescript
// Simplest — plain string model ID (uses AI Gateway automatically, no provider import)
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'anthropic/claude-sonnet-4.6',
  prompt: 'Write a TypeScript haiku',
});

// Explicit gateway import with fallbacks:
import type { GatewayProviderOptions } from '@ai-sdk/gateway';
import { generateText, gateway } from 'ai';

const { text: t2 } = await generateText({
  model: gateway('anthropic/claude-sonnet-4.6'),
  prompt: 'Write a TypeScript haiku',
  providerOptions: {
    gateway: {
      models: ['openai/gpt-5.4', 'google/gemini-3-flash'], // Fallback chain
      order: ['anthropic', 'openai', 'google'],  // Provider preference
    } satisfies GatewayProviderOptions,
  },
});
```

**Key Features (Apr 2026):**

- **Unified API:** Single endpoint for 20+ providers (OpenAI, Anthropic, Google, xAI, Moonshot, ByteDance, MiniMax, Zhipu, Qwen, etc.) — 100+ models including Claude Opus 4.7, GPT-5.4, Gemini 3.1, Kimi K2.6
- **0% Markup:** Confirmed — provider list price passes through; BYOK and managed credentials cost the same per token
- **Team-wide ZDR (Apr 8, 2026):** Single dashboard toggle routes all team requests through ZDR-compliant providers
- **OpenAI Responses API support** (Mar 6, 2026) alongside Chat Completions and Anthropic Messages
- **Per-provider custom timeouts** (Mar 5, 2026) for faster automatic failover
- **Custom Reporting API** (Mar 25, 2026) for cost breakdown by model/provider/user
- **Live model performance metrics** via API (Jan 26, 2026)
- **Video generation support:** Seedance 2.0, Veo, Kling, Grok Imagine Video — all at provider-direct pricing, no markup

**Top models on AI Gateway (Apr 7, 2026):** Gemini 3 Flash (30.1%), Claude Opus 4.6 (16.3%), Grok 4.1 Fast (8.4%), Claude Sonnet 4.6 (7.7%), GPT-5.4 Mini (3.8%).

**Source:** [Vercel AI Gateway](https://vercel.com/ai-gateway), [ZDR Announcement](https://vercel.com/blog/zdr-on-ai-gateway)

---

#### 1. AI SDK 6.x — ToolLoopAgent (canonical April 2026 example)

**Source:** [Context7 - AI SDK Agents Documentation](https://github.com/vercel/ai/blob/main/content/docs/03-agents/02-building-agents.mdx)

```typescript
import { ToolLoopAgent, tool, isStepCount } from 'ai';
import { z } from 'zod';

// Define a tool with v6 API (inputSchema, not parameters)
const weatherTool = tool({
  description: 'Get the weather in a location',
  inputSchema: z.object({
    location: z.string().describe('City name'),
  }),
  execute: async ({ location }, { abortSignal, messages, context }) => ({
    location,
    temperature: 72,
    unit: 'fahrenheit',
  }),
});

// Create agent — uses AI Gateway via string shorthand, no provider import needed
const agent = new ToolLoopAgent({
  model: 'anthropic/claude-sonnet-4.6',
  instructions: 'You are a helpful weather assistant.',  // renamed from `system` in v5→v6
  tools: { weather: weatherTool },
  stopWhen: isStepCount(20),  // default; other options: hasToolCall(...), isLoopFinished()
  // New in v6 since 6.0.23:
  prepareStep: async ({ stepNumber, messages }) => ({
    activeTools: stepNumber > 5 ? [] : undefined,  // per-step tool gating
  }),
});

const result = await agent.generate({ prompt: 'Weather in San Francisco?' });
// or: for await (const chunk of agent.stream({ prompt }).textStream) { ... }
```

**Key Abstractions (April 2026):**

- `ToolLoopAgent` — Agent class managing multi-step tool execution; stable in v6 (was `Experimental_Agent` in v5)
- `tool()` — `inputSchema` (v6) replaces `parameters` (v4/v5); execute receives `(input, { abortSignal, messages, context })`
- `dynamicTool()` — Runtime-typed tools for MCP/external sources
- **Stop conditions:** `isStepCount(N)`, `hasToolCall('tool1', 'tool2')`, `isLoopFinished()`, or custom `({ steps }) => boolean`
- `prepareStep` — Per-step model/tool overrides (new since 6.0.23)
- `callOptionsSchema` + `prepareCall` — Typed call-time context injection
- `toModelOutput` on tools — Control what parent agent sees from subagent output
- `InferAgentUIMessage<typeof agent>` — Type utility for typed chat UI
- **AI SDK v7 beta:** Adds `WorkflowAgent` (durable/resumable), ESM-only packages, `@ai-sdk/otel` telemetry, `toolNeedsApproval` for human-in-the-loop

**Source:** [AI SDK Agents Patterns](https://www.aisdkagents.com/docs/agents/agent-patterns)

#### 2. Vercel Sandbox SDK — Secure Code Execution

**Source:** [Vercel Sandbox Documentation](https://vercel.com/docs/vercel-sandbox)

```python
# Python SDK
from vercel.sandbox import Sandbox

with Sandbox.create(runtime="python3.13") as sandbox:
    command = sandbox.run_command("python", ["-c", "print('hello world')"])
    print(command.stdout())
```

```typescript
// TypeScript SDK
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create({ runtime: 'node22' });
const result = await sandbox.runCommand('node', ['-e', 'console.log("hello")']);
```

**Key Features:**

- Ephemeral microVM isolation (similar to AgentCore Code Interpreter)
- Supports TypeScript/JavaScript AND Python runtimes
- Secure execution of untrusted/AI-generated code
- Package: `@vercel/sandbox` (TypeScript), `vercel-sandbox` (Python)

#### 3. Vercel Workflow Development Kit (WDK) — Durable Workflows

**Source:** [Vercel Workflow Blog](https://vercel.com/blog/introducing-workflow)

```typescript
export async function processOrder(orderId: string) {
  "use workflow";  // Magic directive makes function durable

  const order = await validateOrder(orderId);
  const payment = await processPayment(order);
  const fulfillment = await shipOrder(order);
  
  return fulfillment;
}
```

**Key Features:**

- `"use workflow"` directive transforms async functions into durable workflows
- Survives deployments and crashes (state persistence)
- Automatic retry logic and queue management
- Long-running process support (hours/days)
- Comparable to AWS Step Functions or AgentCore Runtime long-running agents

#### 4. bash-tool — Filesystem Context Retrieval

**Source:** [Vercel Changelog - Introducing bash-tool](https://vercel.com/changelog/introducing-bash-tool-for-filesystem-based-context-retrieval)

```typescript
import { createBashTool } from "bash-tool";

// In-memory filesystem
const { tools } = await createBashTool({
  files: { "src/index.ts": "export const hello = 'world';" },
});

const agent = new ToolLoopAgent({ model, tools });
```

```typescript
// With Vercel Sandbox for full VM isolation
import { createBashTool } from "bash-tool";
import { Sandbox } from "@vercel/sandbox";

const sandbox = await Sandbox.create();
const { tools } = await createBashTool({ sandbox });

const agent = new ToolLoopAgent({ model, tools });
```

**Key Features:**

- **`just-bash` engine:** Interprets bash scripts in TypeScript without shell process or binary execution
- **Tools provided:** `bash`, `readFile`, `writeFile`
- **In-memory or sandboxed:** Works with preloaded filesystems or full VM isolation
- **Context optimization:** Keeps large context local, agents retrieve slices on demand via `find`, `grep`, `jq`, pipes
- **Token efficiency:** Avoids stuffing entire files into prompts

**Use Case:** Let agents search filesystems with Unix-style commands instead of pasting everything into context windows.

---

#### 5. Anthropic Computer Use Tools (via AI SDK)

**Source:** [AI SDK Computer Use Guide](https://github.com/vercel/ai/blob/main/content/cookbook/00-guides/05-computer-use.mdx)

```typescript
const bashTool = anthropic.tools.bash_20250124({
  execute: async ({ command }) => execSync(command).toString()
});

const computerTool = anthropic.tools.computer_20250124({ ... });
const textEditorTool = anthropic.tools.textEditor_20250124({ ... });
```

**Available Tools:**

- `bash_20250124` — Shell command execution (real shell, requires Sandbox)
- `computer_20250124` — Screen interaction (screenshots, clicks, typing)
- `textEditor_20250124` — File read/write operations

> **Note:** `bash-tool` (Vercel) vs `bash_20250124` (Anthropic) — The Vercel `bash-tool` uses a pure TypeScript interpreter without shell access, while Anthropic's bash tool requires actual shell execution (typically in a Sandbox).

---

### Strands Agents SDK — AWS Agent Framework (April 2026)

**Source:** [Strands Agents Python SDK](https://github.com/strands-agents/sdk-python) (current: `v1.37.0`, Apr 22, 2026)

```python
from strands import Agent, tool
from strands.models import BedrockModel

# Define a tool
@tool
def get_weather(city: str) -> str:
    """Get weather for a city.

    Args:
        city: The city name.
    """
    return f"Weather in {city}: 72°F, Sunny"

# Agent with Bedrock service tier selection (NEW v1.35.0)
agent = Agent(
    model=BedrockModel(
        model_id="us.anthropic.claude-sonnet-4-6",  # current default sonnet
        service_tier="standard",   # "priority" | "standard" | "flex"
        streaming=True,
    ),
    tools=[get_weather],
    system_prompt="You are a helpful weather assistant.",
)

# Sync invoke
result = agent("What's the weather in Seattle?")
print(result.message)

# Async + streaming
async for event in agent.stream_async("Tell me about Paris weather"):
    if "data" in event:
        print(event["data"], end="", flush=True)
```

**Key Features (April 2026):**

- **`Agent` class:** Core abstraction; accepts plain callables in `hooks=[...]` (v1.36.0); v1.37.0 (Apr 22, 2026) adds fallback trim, experimental checkpoint, `context_window_limit`; now powers AgentCore managed harness
- **Tool registration:** `@tool` decorator (sync, async, streaming via yield)
- **Model routing:** Bedrock (with service tiers), Anthropic, OpenAI/Responses, Gemini (new), SageMaker AI (new), LiteLLM, Mistral, Ollama, Writer, Llama API, LlamaCpp
- **Multi-agent:** `Swarm` (autonomous handoffs) + `Graph` (deterministic DAG w/ conditional edges) — both GA
- **`AgentAsTool` (v1.34.0):** Pass `Agent` instances directly in `tools=[...]` — auto-wrapped
- **Plugin system (v1.28.0):** `Plugin` ABC; Agent Skills is now a plugin (v1.30.0)
- **Languages:** Python (primary, `v1.37.0` — Apr 22, 2026), TypeScript (RC — `v1.0.0-rc.4`, **not GA** as of April 2026; includes Swarm, Graph, MCP, A2A, and `VercelModel` adapter), Java (Spring AI AgentCore SDK, GA Apr 14, 2026)

**Relationship to AgentCore (April 2026 canonical pattern):**

```python
from strands import Agent, tool
from strands.models import BedrockModel
from bedrock_agentcore.runtime import BedrockAgentCoreApp
from bedrock_agentcore.memory import MemoryClient
from bedrock_agentcore.memory.integrations.strands import AgentCoreMemorySessionManager

# Optional: session-scoped managed memory
session_mgr = AgentCoreMemorySessionManager(
    memory_id="mem-abc123",
    actor_id="user-xyz",
    region_name="us-east-1",
    read_only=False,   # NEW v1.6.1
)

agent = Agent(
    model=BedrockModel(model_id="us.anthropic.claude-sonnet-4-6", streaming=True),
    tools=[],
    system_prompt="...",
    session_manager=session_mgr,
)

app = BedrockAgentCoreApp()  # Infrastructure: handles deployment, scaling, protocol adapters

@app.entrypoint
def invoke(payload):
    result = agent(payload.get("prompt"))
    return {"result": str(result.message)}

# Optional: run as A2A server
# from bedrock_agentcore.runtime import serve_a2a; serve_a2a(agent, port=8080)

# Optional: run as AG-UI server
# from bedrock_agentcore.runtime import serve_ag_ui, AGUIApp; ...

if __name__ == "__main__":
    app.run()
```

> **Pattern:** Strands SDK handles the agent logic (tools, orchestration, streaming). `BedrockAgentCoreApp` wraps it for deployment to AgentCore infrastructure (Runtime, Memory, Gateway).
>
> **Alternative pattern (Apr 22, 2026):** The new **AgentCore Managed Harness** (preview, 4 regions) replaces `BedrockAgentCoreApp` + `@app.entrypoint` with a declarative 3-call API (`CreateHarness` → `GetHarness` → `InvokeHarness`). No Python code required; Strands `v1.37.0` powers the orchestration under the hood. See [harness docs](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/harness.html), [announcement](https://aws.amazon.com/blogs/machine-learning/get-to-your-first-working-agent-in-minutes-announcing-new-features-in-amazon-bedrock-agentcore/), and [What's New](https://aws.amazon.com/about-aws/whats-new/2026/04/agentcore-new-features-to-build-agents-faster/). Operators who need custom orchestration can export the harness to Strands code. The `BedrockAgentCoreApp` + CDK path remains the GA option for the 10 non-preview AgentCore regions.
>
> **Related: AgentCore CLI (Preview Apr 22, 2026).** `@aws/agentcore` npm package provides `agentcore create/dev/deploy/invoke` — a unified terminal experience that compiles to CDK under the hood. Terraform IaC "coming soon". Repo: [aws/agentcore-cli](https://github.com/aws/agentcore-cli). Docs: [get-started-cli](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agentcore-get-started-cli.html).
>
> **Related: Persistent agent filesystem (Preview Mar 25, 2026).** AgentCore Runtime sessions can now configure `filesystemConfigurations` for managed S3-backed session storage — 1 GB per session, 14-day idle retention, standard POSIX ops (no hard links, device files, FIFOs, or xattr). Docs: [runtime-persistent-filesystems](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-persistent-filesystems.html). Pricing TBD before GA.
>
> **Related: AgentCore Coding Agent Skills (Apr 22, 2026).** Pre-built AgentCore best-practice skills for coding assistants. Kiro Power GA today ([kirodotdev/powers/aws-agentcore](https://github.com/kirodotdev/powers/tree/main/aws-agentcore)); Claude Code / Codex / Cursor plugins "coming next week" (~Apr 29, 2026) per [What's New](https://aws.amazon.com/about-aws/whats-new/2026/04/agentcore-new-features-to-build-agents-faster/).

---

### Amazon Bedrock — Foundation Model Platform

**Source:** [Amazon Bedrock Pricing](https://aws.amazon.com/bedrock/pricing/)

**Key Features:**

- **Multi-Provider Access:** Single API for models from Anthropic, Meta, Mistral, Amazon, Cohere, AI21, Stability AI, and more
- **Pricing Tiers:**
  - **On-Demand:** Pay per token, no commitment
  - **Provisioned Throughput:** Reserved capacity with commitment discounts
  - **Batch Mode:** 50% discount for async processing
- **Customization:** Fine-tuning, continued pre-training, model distillation
- **Optimization:** Prompt caching (up to 90% cost reduction), Intelligent Prompt Routing
- **Guardrails:** Content filtering, PII detection, grounding checks
- **Knowledge Bases:** Managed RAG with vector storage

**Model Providers Available:**

- Anthropic (Claude 4.5, 4, 3.7, 3.5 family)
- Amazon (Nova, Titan)
- Meta (Llama 4, 3.3, 3.2, 3.1)
- Mistral AI
- Cohere
- AI21 Labs
- Stability AI
- Google (Gemma)
- OpenAI (GPT models)
- And more...

**Integration with AgentCore:**

- AgentCore Runtime uses Bedrock for model inference
- AgentCore agents can call any Bedrock model
- Pricing is additive: AgentCore fees + Bedrock inference fees

---

### AgentCore Gateway MCP Support

**Source:** [AgentCore Overview](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html)

> "AgentCore Gateway enables agents to securely access tools by transforming APIs and Lambda functions into agent-compatible tools and **connecting to existing MCP servers**."

**Source:** [AgentCore Runtime](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agents-tools-runtime.html)

> "Protocol support for Model Context Protocol (MCP) and Agent to Agent (A2A) communication."

### Vercel AI SDK MCP Client (Experimental)

**Source:** [Context7 - MCP Sampling Provider](https://github.com/vercel/ai/blob/main/content/providers/03-community-providers/100-mcp-sampling.mdx)

- Experimental MCP client implementation via `@mcpc-tech/mcp-sampling-ai-provider`
- Integration with `generateText` for MCP-based tool calling
- Less reliable than native tool support per documentation

### AgentCore Memory Strategies

**Source:** [AgentCore FAQs](https://aws.amazon.com/bedrock/agentcore/faqs/)

| Strategy | Description |
|----------|-------------|
| **Built-in** | Automatic memory processing, included in pricing |
| **Built-in with Override** | Custom prompts/models, reduced storage cost |
| **Self-Managed** | Full control, lowest storage cost, inference billed separately |

### Observability Comparison

| Platform | Telemetry | Tracing |
|----------|-----------|---------|
| **AWS AgentCore** | CloudWatch integration, AgentCore Observability spans | Step-by-step visualization, metadata tagging |
| **Vercel AI SDK 6** | OTEL-compatible spans, `ai.streamText`, `ai.toolCall` events | `onStepFinish`, `onFinish` callbacks |

**Source:** [AgentCore Observability](https://aws.amazon.com/bedrock/agentcore/pricing/) — "Consumption-based pricing for telemetry generated, stored, and queried."

---

