## VALIDATED CITATIONS & REFERENCE DATA (MCP-Sourced)

> **Last Validated:** 2026-04-21

### GitHub Repository References

| Platform | Repository | Language | Latest Tag (Apr 21, 2026) |
|----------|------------|----------|---------------------------|
| Vercel AI SDK (stable) | [vercel/ai](https://github.com/vercel/ai) | TypeScript | `ai@6.0.168` |
| Vercel AI SDK (v7 beta) | [vercel/ai](https://github.com/vercel/ai) | TypeScript | `ai@7.0.0-beta.111` |
| Vercel Workflow | [`@ai-sdk/workflow`](https://github.com/vercel/ai) | TypeScript | Part of AI SDK v7 beta |
| **Microsoft Agent Framework (Python)** | [microsoft/agent-framework](https://github.com/microsoft/agent-framework) | Python | `agent-framework 1.0.1` (pip), `agent-framework-core 1.0.0` |
| **Microsoft Agent Framework (.NET)** | [microsoft/agent-framework](https://github.com/microsoft/agent-framework) | .NET | `Microsoft.Agents.AI 1.1.0` (NuGet) |
| **Azure AI Projects SDK (Python)** | [Azure/azure-sdk-for-python](https://github.com/Azure/azure-sdk-for-python) | Python | `azure-ai-projects 2.1.0` |
| **Azure AI Agents SDK (Python)** | [Azure/azure-sdk-for-python](https://github.com/Azure/azure-sdk-for-python) | Python | `azure-ai-agentserver-responses_1.0.0b4` |
| Azure AI Projects SDK (.NET) | [Azure/azure-sdk-for-net](https://github.com/Azure/azure-sdk-for-net) | .NET | `Azure.AI.Projects 2.0.0-beta.2` |
| Azure AI Agents SDK (JavaScript) | [Azure/azure-sdk-for-js](https://github.com/Azure/azure-sdk-for-js) | TypeScript | `@azure/ai-agents 2.0.0-beta.4` |
| **Semantic Kernel (Python)** — superseded | [microsoft/semantic-kernel](https://github.com/microsoft/semantic-kernel) | Python | `python-1.41.2` |
| **Semantic Kernel (.NET)** — superseded | [microsoft/semantic-kernel](https://github.com/microsoft/semantic-kernel) | .NET | `dotnet-1.74.0` |
| **AutoGen (Python)** — superseded, maintenance | [microsoft/autogen](https://github.com/microsoft/autogen) | Python | `python-v0.7.5` (Sep 30, 2025) |
| Foundry Samples (canonical hosted agent patterns) | [microsoft-foundry/foundry-samples](https://github.com/microsoft-foundry/foundry-samples) | Multi | Rolling `main` |

### SDK Language Support Matrix

**Source:** [Microsoft Agent Framework Overview](https://learn.microsoft.com/en-us/agent-framework/), [Foundry Agent Service Developer Guide](https://learn.microsoft.com/en-us/azure/foundry/agents/overview)

| Layer | Vercel | Azure | Language |
|-------|--------|-------|----------|
| **Agent Framework** | AI SDK 6.x stable (v7 beta) | **Microsoft Agent Framework 1.0** (recommended) + SK + AutoGen (both superseded) | TS/JS vs Python + C# + Java (Spring AI) + TS (`@azure/ai-agents`) |
| **Infrastructure SDK** | `@vercel/sandbox`, `@ai-sdk/workflow` | `azure-ai-agents` / `azure-ai-projects` (Python + .NET + JS + Java) | TS + Python (Workflow Python beta); Python + .NET + JS + Java |

| SDK | Primary Language | Other Languages | Role |
|-----|------------------|-----------------|------|
| **Vercel AI SDK 6.x** (stable) | TypeScript/JavaScript | — | Agent framework (`ToolLoopAgent`, tools, streaming, orchestration) |
| **Vercel AI SDK v7** (beta) | TypeScript/JavaScript | — | Next-gen: ESM-only, `WorkflowAgent`, `@ai-sdk/otel`, `toolNeedsApproval` |
| **Microsoft Agent Framework 1.0** | Python + C# (co-equal) | — | Unified agent framework: `Agent`, `SequentialBuilder`, `HandoffOrchestration`, `GraphFlow`, `ConcurrentBuilder` |
| **Semantic Kernel** (superseded) | C#, Python, Java | — | Legacy agent framework (`ChatCompletionAgent`, `[KernelFunction]`, `HandoffOrchestration`) — migration target to MAF |
| **AutoGen** (superseded, maintenance) | Python | .NET (community) | Research-origin multi-agent framework — folded into MAF; community fork is **AG2** |
| **azure-ai-agents / azure-ai-projects** | Python | .NET, JS, Java | Infrastructure wrapper for Foundry Agent Service (`AIProjectClient`, `create_agent`, `FunctionTool`, `McpTool`, `AzureAIAgentThread`) |

> ⚠️ **Critical Distinction:** `azure-ai-agents` and `azure-ai-projects` are NOT for building agent logic — they're for managing agents on Foundry Agent Service infrastructure (create, thread, run lifecycle, tool dispatch). Agent logic is written with **Microsoft Agent Framework**. This is like how you use AI SDK for agent logic but deploy on Vercel's platform.

> 📝 **Methodological Note:** Compare AI SDK 6.x ↔ Microsoft Agent Framework for agent framework features. Compare Vercel Platform ↔ Foundry Agent Service for infrastructure features. Don't conflate the two layers. When showing SK or AutoGen code, always note that MAF is the current blessed path for new projects.

### Azure OpenAI Model Pricing (Regional Standard / Global Standard / Batch) — US regions

**Source:** [Azure OpenAI Pricing](https://azure.microsoft.com/en-us/pricing/details/azure-openai/) — validated April 2026 (static-HTML limitations flagged where rendered as `$-`)

**Per 1M tokens, USD:**

| Model | Deployment | Input | Cached Input | Output | Batch Input | Batch Output |
|-------|-----------|-------|--------------|--------|-------------|--------------|
| **GPT-4.1** (2025-04-14) | Global | $2.00 | $0.50 | $8.00 | $1.00 | $4.00 |
| **GPT-4.1** | Data Zone | $2.20 | $0.55 | $8.80 | — | — |
| **GPT-4.1** | Regional | $2.20 | $0.55 | $8.80 | N/A | N/A |
| **GPT-4.1-mini** | Global | $0.40 | $0.10 | $1.60 | $0.20 | $0.80 |
| **GPT-4.1-nano** | Global | $0.10 | $0.025 | $0.40 | $0.05 | $0.20 |
| **GPT-4.1 Priority** | Global | $3.50 | $0.88 | $14.00 | N/A | N/A |
| **GPT-5** (2025-08-07) | Global | $1.25 | $0.13 | $10.00 | — | — |
| **GPT-5 Priority** | Global | $2.50 | $0.25 | $20.00 | N/A | N/A |
| **GPT-5 Pro** | Global | $30.00 | — | $150.00 | — | — |
| **GPT-5-mini** | Global | $0.25 | $0.025 | $2.00 | — | — |
| **GPT-5-nano** | Global | $0.20 | $0.02 | $1.25 | — | — |
| **GPT-5.3 Codex** | Global | $1.75 | $0.18 | $14.00 | — | — |
| **GPT-5.4-mini** (Mar 2026) | Global | $0.75 | — | $4.50 | — | — |
| **GPT-5.4-nano** (Mar 2026) | Global | $0.20 | — | $1.25 | — | — |
| **o4-mini** (2025-04-16) | Global | $1.10 | $0.275 | $4.40 | $0.55 | $2.20 |
| **o4-mini** | Data Zone | $1.21 | $0.31 | $4.84 | $0.61 | $2.42 |
| **o3** (2025-04-16) | Global | $2.00 | $0.50 | $8.00 | $1.00 | $4.00 |
| **o3-mini** (2025-01-31) | Global | $1.10 | $0.275 | $4.40 | $0.55 | $2.20 |
| **o1** | Global | $15.00 | $7.50 | $60.00 | N/A | N/A |
| **GPT-4o** (2024-11-20) | Global | $2.50 | $1.25 | $10.00 | — | — |
| **GPT-4o-mini** | Global | $0.15 | $0.075 | $0.60 | — | — |
| **GPT-4.5-Preview** | Global | $75.00 | $37.50 | $150.00 | N/A | N/A |

> ⚠️ **DOCUMENTATION GAP:** GPT-5.1 and GPT-5.2 sub-series per-token rates render as `$-` in static HTML. Verify via Azure Pricing Calculator.

**Deployment tier premiums:**

| Tier | Multiplier vs Global Standard | Use Case |
|------|-------------------------------|----------|
| **Priority Processing** | +75% premium | Latency-sensitive user-facing agents |
| **Global Standard** | Baseline | Default, highest throughput |
| **Data Zone (US or EU)** | +10% | Data residency within zone |
| **Regional Standard** | +10% on Data Zone (~+21% on Global) | Hard regional data residency |
| **Batch API** | −50% discount | Async workloads, 24-hour SLA |
| **PTU Monthly Reservation** | ≈ 64% off hourly PAYG | Predictable throughput |
| **PTU Yearly Reservation** | ≈ 70% off hourly PAYG | Long-term commitment |

**Azure OpenAI Built-in Tools (via Assistants API — sunset Aug 26, 2026 — or Responses API):**

| Tool | Price |
|------|-------|
| **Code Interpreter** | $0.03/session (1-hour session; concurrent threads = multiple sessions) |
| **File Search** (vector storage) | $0.10/GB/day (1 GB free) |
| **File Search Tool Call** (Responses API) | $2.50/1K tool calls |
| **Computer Use** (Responses API) | Input: $3.00/1M tokens; Output: $12.00/1M tokens |

### Foundry Models Catalog (MaaS / Non-OpenAI Models)

**Source:** [Foundry Models Pricing](https://azure.microsoft.com/en-us/pricing/details/ai-foundry-models/) — validated April 2026

**Per 1M tokens, USD:**

| Model | Deployment | Input | Output |
|-------|-----------|-------|--------|
| **DeepSeek V3.2** | Global | $0.58 | $1.68 |
| **DeepSeek V3.2** | Data Zone | $0.64 | $1.85 |
| **DeepSeek R1** | Global | $1.35 | $5.40 |
| **DeepSeek R1** | Data Zone / Regional | $1.485 | $5.94 |
| **DeepSeek V3** | Global | $1.14 | $4.56 |
| Llama 3.3 70B | All | DOCUMENTATION GAP | DOCUMENTATION GAP |
| Llama 4 Maverick 17B | All | DOCUMENTATION GAP | DOCUMENTATION GAP |
| Phi-4 / Phi-4-mini | All | DOCUMENTATION GAP | DOCUMENTATION GAP |
| **Mistral OCR** | — | $1.00/1K pages | (single rate) |
| **mistral-document-ai-2505** | — | $3.00/1K pages | (single rate) |
| MAI-Transcribe-1 | — | $0.36/hr audio | (single rate) |
| MAI-Voice-1 (TTS) | — | $22.00/1M characters | (single rate) |
| MAI-Image-2 | — | $5.00/1M text tokens | (single rate) |

> **Model Router** (launched Oct 2025): Routes between OpenAI and DeepSeek models intelligently. No separate surcharge confirmed in public pricing; passes through underlying model costs.

### Foundry Agent Service Pricing

**Source:** [Foundry Agent Service Pricing](https://azure.microsoft.com/en-us/pricing/details/foundry-agent-service/), [FAQ](https://learn.microsoft.com/en-us/azure/ai-foundry/agents/faq)

| Component | Price | Notes |
|-----------|-------|-------|
| **Agent creation / orchestration** | **$0** | No charge for creating or running Foundry-native agents |
| **Model inference** | See Azure OpenAI rates above | Charged at underlying model rate |
| **Hosted Agents** (containerized — MAF, LangGraph) | DOCUMENTATION GAP (vCPU/GiB-hour `$-` in static HTML) | Preview; verify via Pricing Calculator |
| **Code Interpreter tool** | $0.03/session-hour | Same as Azure OpenAI built-in |
| **File Search Storage** | $0.10/GB/day (1 GB free) | Vector storage |
| **Web Search (Bing Grounding)** | DOCUMENTATION GAP (`$-/1,000 transactions`) | Separate billing via Bing |
| **Custom Search** | DOCUMENTATION GAP | Preview |
| **Deep Research** | DOCUMENTATION GAP | Billed at model + Bing rates |
| **Thread/conversation storage** | $0 direct | Stored in customer's Cosmos DB + Azure Storage |

> **Architectural note:** Thread history and file attachments are stored in the **customer's own** Azure Cosmos DB and Azure Storage accounts. You pay those bills directly, not through the Foundry SKU.

### Azure Container Apps Dynamic Sessions (Code Interpreter Alternative)

**Source:** [ACA Pricing](https://azure.microsoft.com/en-us/pricing/details/container-apps/), [Sessions Docs](https://learn.microsoft.com/en-us/azure/container-apps/sessions)

| Session Type | PAYG | 1-yr Savings | 3-yr Savings |
|-------------|------|-------------|-------------|
| **Code interpreter** (Python, Node.js, Shell) | $0.03/session-hour | $0.026/session-hour | $0.025/session-hour |
| **Custom container sessions** | Dedicated E16 instance rates | — | — |

**Max execution time per code run:** 220 seconds. Hyper-V isolated. Subsecond startup via prewarmed pools. Billed 1-hour increments from allocation to deallocation.

### Vercel Platform Pricing — April 2026 (Reference)

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
| **AI Gateway** | Model token pass-through | $0 markup (provider list price) |
| **AI Gateway** | Free tier | $5/month credit included |
| **AI Gateway** | ZDR (team-wide) | $0 additional (Pro + Enterprise, Apr 8, 2026) |
| **Secure Compute** | Enterprise subscription | $6,500/year |
| **Secure Compute** | Secure Connect Data Transfer | $0.15/GB |

### Foundry Agent Service Canonical Code Example (Python)

**Source:** [Foundry Agent Service GA Blog (Mar 16, 2026)](https://devblogs.microsoft.com/foundry/foundry-agent-service-ga/), [`azure-ai-agents` samples](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/ai/azure-ai-agents/samples/sample_agents_basics.py)

```python
# pip install azure-ai-projects azure-ai-agents azure-identity
import os, time
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.agents.models import ListSortOrder, FunctionTool

def get_weather(location: str, unit: str = "celsius") -> str:
    """Get current weather for a location."""
    return f"Weather in {location}: 22°{unit[0].upper()}, Sunny"

functions = FunctionTool(functions={get_weather})

project_client = AIProjectClient(
    endpoint=os.environ["PROJECT_ENDPOINT"],   # https://<resource>.services.ai.azure.com/api/projects/<project>
    credential=DefaultAzureCredential(),
)

with project_client:
    agents_client = project_client.agents
    agent = agents_client.create_agent(
        model=os.environ["MODEL_DEPLOYMENT_NAME"],  # e.g., "gpt-4.1-mini"
        name="weather-agent",
        instructions="You are a helpful weather assistant.",
        tools=functions.definitions,
    )
    thread = agents_client.threads.create()
    agents_client.messages.create(
        thread_id=thread.id, role="user", content="What's the weather in Seattle?"
    )
    # Polling loop with tool dispatch
    run = agents_client.runs.create(thread_id=thread.id, agent_id=agent.id)
    while run.status in ["queued", "in_progress", "requires_action"]:
        time.sleep(1)
        run = agents_client.runs.get(thread_id=thread.id, run_id=run.id)
        if run.status == "requires_action":
            tool_outputs = []
            for call in run.required_action.submit_tool_outputs.tool_calls:
                output = functions.execute(call)
                tool_outputs.append({"tool_call_id": call.id, "output": output})
            agents_client.runs.submit_tool_outputs(
                thread_id=thread.id, run_id=run.id, tool_outputs=tool_outputs
            )

    messages = agents_client.messages.list(
        thread_id=thread.id, order=ListSortOrder.ASCENDING
    )
    for msg in messages:
        if msg.text_messages:
            print(f"{msg.role}: {msg.text_messages[-1].text.value}")
```

**Key abstractions (April 2026):**

- `AIProjectClient(endpoint, credential)` — entry point to all Foundry services
- `agents_client.create_agent(model, name, instructions, tools)` — register an agent definition
- `threads.create()` — stateful conversation (server-side persistence)
- `messages.create(thread_id, role, content)` — append to thread
- `runs.create(thread_id, agent_id)` — invoke agent
- **Run lifecycle states:** `queued` → `in_progress` → `requires_action` (tool call) → `in_progress` → `completed` (or `failed`, `cancelled`, `expired`)
- `SubmitToolOutputsAction` / `ToolOutput` — dispatch function tool results back to the agent
- `SubmitToolApprovalAction` / `ToolApproval` — human approval flow for MCP tools
- **Streaming:** `runs.stream(thread_id, agent_id)` yields `MessageDeltaChunk` events for token streaming

### Microsoft Agent Framework Canonical Code Example (Python)

**Source:** [Agent Framework 1.0 GA Blog](https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-version-1-0/), [Foundry Samples](https://github.com/microsoft-foundry/foundry-samples/tree/main/samples/python/hosted-agents/agent-framework)

```python
# pip install agent-framework
import asyncio, os
from agent_framework import Agent
from agent_framework.foundry import FoundryChatClient
from azure.ai.agentserver.agentframework import from_agent_framework
from azure.identity.aio import DefaultAzureCredential

def get_available_hotels(check_in_date: str, check_out_date: str, max_price: int = 500) -> str:
    """Get available hotels in Seattle for the specified dates."""
    return "Contoso Suites: $189/night, 4.5★, Downtown"

async def main():
    async with (
        DefaultAzureCredential() as credential,
        FoundryChatClient(
            project_endpoint=os.getenv("PROJECT_ENDPOINT"),
            model=os.getenv("MODEL_DEPLOYMENT_NAME", "gpt-4.1-mini"),
            credential=credential,
        ) as client,
    ):
        agent = Agent(
            client=client,
            name="SeattleHotelAgent",
            instructions="You are a travel assistant specializing in Seattle hotels.",
            tools=[get_available_hotels],
        )
        # Deploy as a Hosted Agent (containerized)
        server = from_agent_framework(agent)
        await server.run_async()   # listens on :8088

asyncio.run(main())
```

**Accompanying `agent.yaml` manifest (declarative Foundry deployment):**

```yaml
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

### Microsoft Agent Framework — Multi-Agent Orchestration

**Source:** [Agent Framework 1.0 GA Blog](https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-version-1-0/)

```python
from agent_framework import Agent
from agent_framework.orchestrations import SequentialBuilder

writer = Agent(client=client, instructions="You are a concise copywriter.", name="writer")
reviewer = Agent(client=client, instructions="You are a thoughtful reviewer.", name="reviewer")

workflow = SequentialBuilder(participants=[writer, reviewer]).build()
async for event in workflow.run("Write a tagline for Agent Framework 1.0.", stream=True):
    if event.type == "output":
        print(event.data, end="", flush=True)
```

Also available: `ConcurrentBuilder`, `HandoffOrchestration`, `GraphFlow` (experimental — direct AutoGen `GraphFlow` successor).

### Foundry MCP Tool Integration (Native MCP Client)

**Source:** [azure-ai-agents MCP sample](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/ai/azure-ai-agents/samples/agents_tools/sample_agents_mcp.py)

```python
from azure.ai.agents.models import McpTool

mcp_tool = McpTool(
    server_label="github",
    server_url="https://gitmcp.io/Azure/azure-rest-api-specs",
    allowed_tools=[],  # empty = all tools allowed
)
mcp_tool.allow_tool("search_azure_rest_api_code")
# mcp_tool.set_approval_mode("never")  # skip human approval prompt

agent = agents_client.create_agent(
    model=os.environ["MODEL_DEPLOYMENT_NAME"],
    name="my-mcp-agent",
    instructions="Use MCP tools to answer questions.",
    tools=mcp_tool.definitions,
)

run = agents_client.runs.create(
    thread_id=thread.id,
    agent_id=agent.id,
    tool_resources=mcp_tool.resources,  # ← passes MCP server config
)
```

Plus: **Foundry MCP Server** (cloud-hosted at `mcp.ai.azure.com`, Entra ID auth) as an alternative to self-hosted MCP servers.

### Foundry Observability (OpenTelemetry → Application Insights)

**Source:** [`azure-ai-agents` telemetry sample](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/ai/azure-ai-agents/samples/agents_telemetry/sample_agents_basics_with_azure_monitor_tracing.py)

```python
from opentelemetry import trace
from azure.monitor.opentelemetry import configure_azure_monitor

# Single call enables all OTel instrumentation → Application Insights
configure_azure_monitor(
    connection_string=os.environ["APPLICATIONINSIGHTS_CONNECTION_STRING"]
)

tracer = trace.get_tracer(__name__)
with tracer.start_as_current_span("agent-scenario"):
    # All subsequent agent SDK calls are automatically traced
    ...
```

### Foundry Agent Service Lifecycle Settings

**Source:** [Foundry Agent Service — Limits & Quotas](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/limits-quotas-regions)

| Parameter | Default | Range |
|-----------|---------|-------|
| Run polling timeout | 15 min | Configurable per run |
| Max tool calls per run | Implementation-defined | Varies by tier |
| Max tokens per message | Model-dependent (1M for GPT-4.1) | Model-dependent |

> ⚠️ **DOCUMENTATION GAP:** Exact idle session timeout and max lifetime values for Foundry Agent Service are not as prominently documented as AWS's `idleRuntimeSessionTimeout` and `maxLifetime`. Verify current values via the Foundry SDK reference.

---

