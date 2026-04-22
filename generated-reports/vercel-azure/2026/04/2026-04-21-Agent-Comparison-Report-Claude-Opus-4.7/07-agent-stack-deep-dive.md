## 6. Agent Stack Deep-Dive

### 6a. Vercel Agent Stack

**AI SDK 6.x (stable, `ai@6.0.168`+).** The `ToolLoopAgent` class is the recommended abstraction. New since 6.0.23: `prepareStep` (per-step model / tool overrides), `callOptionsSchema` + `prepareCall` (typed call-time context), `toModelOutput` on tools (control what the parent agent sees from subagents). Stop conditions: `isStepCount(N)`, `hasToolCall('name')`, `isLoopFinished()`, or custom `({ steps }) => boolean`. Tool definition switched from `parameters` (v4/v5) to `inputSchema` (v6); execute receives `(input, { abortSignal, messages, context })`.

**AI SDK v7 beta (`ai@7.0.0-beta.111`+).** ESM-only packages, new `WorkflowAgent` primitive in `@ai-sdk/workflow` for durable agents, stable `@ai-sdk/otel` telemetry package, `toolNeedsApproval` for human-in-the-loop, `uploadFile` / `uploadSkill` provider abstractions.

**AI Gateway.** Single endpoint for 20+ providers, 100+ models including Claude Opus 4.7, GPT-5.4, Gemini 3.1, Kimi K2.6. **0% markup confirmed** — provider list price passes through for both BYOK and managed credentials. Features: fallback chains, per-provider custom timeouts (Mar 5, 2026), Custom Reporting API (Mar 25, 2026), live model performance metrics (Jan 26, 2026), team-wide ZDR (Apr 8, 2026) at $0.10/1K req routing to 13 ZDR providers. String shorthand `model: 'openai/gpt-4.1'` requires no provider import; explicit `gateway('provider/model')` import for advanced options.

**MCP story.** Client: `@ai-sdk/mcp` with stable Streamable HTTP + SSE transports, plus `Experimental_StdioMCPTransport` for local use. Server: **`mcp-handler` 1.1** — first-party MCP server with Streamable HTTP + OAuth. Endpoint: `mcp.vercel.com` serves as Vercel's managed MCP endpoint.

**Sandbox SDK (GA Jan 30, 2026).** Firecracker microVMs, Node.js 24 + Python 3.13 runtimes, 8 vCPU Pro / 32 vCPU Enterprise (Apr 8, 2026), 32 GB NVMe (Enterprise), Persistent Sandboxes beta (Mar 26, 2026), filesystem snapshots (Jan 22, 2026), CLI via `vercel sandbox`. Only in `iad1` as of April 2026 — community requests for Tokyo (`hnd1`) and others acknowledged but not shipped.

**bash-tool (Jan 7, 2026, open-source).** `just-bash` TypeScript interpreter — no shell process, no binary execution. Tools: `bash`, `readFile`, `writeFile`. Works in-memory or sandboxed (with Vercel Sandbox). Optimizes context: agents retrieve slices on demand via `find`, `grep`, `jq`, pipes instead of stuffing entire files into prompts. Skills support via `experimental_createSkillTool` (Jan 21, 2026).

**Workflow SDK (GA Apr 16, 2026).** `"use workflow"` directive transforms async functions into durable workflows. E2E encrypted by default (AES-256-GCM, per-run HKDF-SHA256 keys, Mar 17, 2026). 2× faster at GA. Event-sourced architecture, custom class serialization (Apr 2, 2026), `WorkflowAgent` primitive, Python SDK beta. **Vercel Queues (GA)** as underlying durable queue layer. Function execution is global; state / queue backend is `iad1`-only.

**Chat SDK (Feb 23, 2026).** Unified TypeScript library for Slack, Discord, Teams, WhatsApp, Telegram, and more. One codebase, multi-platform distribution.

**Computer Use Tools.** Anthropic-native via AI SDK: `bash_20250124` (real shell, requires Sandbox), `computer_20250124` (screen interaction), `textEditor_20250124` (file ops), `webSearch_20250305` (Anthropic-native web search, requires Claude 3.7+). For browser automation, **Kernel** (Vercel-native Marketplace, 500+ installs) provides CDP cloud browsers compatible with Playwright, Puppeteer, Stagehand, and Computer Use.

### 6b. Azure Agent Stack — The Blessed Path

**Microsoft Agent Framework 1.0 (`agent-framework 1.0.1` Python / `Microsoft.Agents.AI 1.1.0` .NET).** The unified successor to Semantic Kernel + AutoGen. Core class: `Agent`. Any function with a docstring becomes a tool (AutoGen heritage). Multi-agent primitives:

- `SequentialBuilder(participants=[...]).build()` — chain of agents
- `ConcurrentBuilder` — fan-out / fan-in
- `HandoffOrchestration` — agents hand off based on capability descriptions (SK heritage)
- `GraphFlow` — directed graph with conditional edges (experimental — direct AutoGen `GraphFlow` successor)
- `Executor` primitives for lower-level control
- `Magentic-One` — pre-built multi-agent orchestrator

Streaming via `agent.run_stream(...)` and `workflow.run(..., stream=True)`. Migration assistants from SK and AutoGen ship as official MS Learn guides.

**Foundry Agent Service (next-gen GA Mar 16, 2026).** Responses API-based runtime — wire-compatible with OpenAI's Agents SDK. Canonical pattern:

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
    agents_client.messages.create(
        thread_id=thread.id, role="user", content="What's the weather in Seattle?"
    )
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
    messages = agents_client.messages.list(thread_id=thread.id, order=ListSortOrder.ASCENDING)
```

**Run lifecycle states:** `queued` → `in_progress` → `requires_action` (tool call) → `in_progress` → `completed` (or `failed`, `cancelled`, `expired`). Tool dispatch: `SubmitToolOutputsAction` + `ToolOutput`; approval flow via `SubmitToolApprovalAction` + `ToolApproval` for MCP tools. Streaming: `runs.stream()` with `MessageDeltaChunk` events.

**Hosted Agents (Public Preview refresh · Apr 22, 2026 · new backend).** Deploy containerized MAF, LangGraph, Semantic Kernel, Claude Agent SDK, OpenAI Agents SDK, GitHub Copilot SDK, or custom-code agents to purpose-built Foundry infra. Per-session hypervisor sandbox, `$HOME` + `/files` persistence across scale-to-zero, `<100ms` cold start, `$0.0994/vCPU-hr + $0.0118/GiB-hr` (active only), 4 preview regions (AU East, CA Central, NC US, SE Central). Requires `azd ext install azure.ai.agents` v0.1.26-preview+ (0.1.25-preview deploys to **legacy ACA backend** — being sunset). Canonical pattern:

```python
# main.py
import asyncio, os
from agent_framework import Agent
from agent_framework.azure import AzureAIAgentClient
from azure.ai.agentserver.agentframework import from_agent_framework
from azure.identity.aio import DefaultAzureCredential

async def main():
    async with (
        DefaultAzureCredential() as credential,
        AzureAIAgentClient(
            project_endpoint=os.getenv("PROJECT_ENDPOINT"),
            model_deployment_name=os.getenv("MODEL_DEPLOYMENT_NAME", "gpt-4.1-mini"),
            credential=credential,
        ) as client,
    ):
        agent = Agent(
            client,
            name="SeattleHotelAgent",
            instructions="You are a travel assistant specializing in Seattle hotels.",
            tools=[get_available_hotels],
        )
        server = from_agent_framework(agent)
        await server.run_async()

asyncio.run(main())
```

```yaml
# agent.yaml — Foundry Hosted Agents ContainerAgent v1.0 schema (Apr 22, 2026 refresh)
# yaml-language-server: $schema=https://raw.githubusercontent.com/microsoft/AgentSchema/refs/heads/main/schemas/v1.0/ContainerAgent.yaml

kind: hosted
name: seattle-hotel-agent

protocols:
  - protocol: responses
    version: 1.0.0

resources:
  cpu: '1.0'
  memory: '2Gi'
```

> 📝 **What changed in the Apr 22 refresh:**
> - **New backend** (not ACA Dynamic Sessions) — the predecessor Ignite 2025 preview is being sunset
> - **Per-session isolation** (was: shared container pool)
> - **Filesystem persistence** — `$HOME` + `/files` survive scale-to-zero (new)
> - **4 protocols coexist** — Responses + Invocations + Activity (Teams) + A2A (was: Responses only); AG-UI via Invocations
> - **Per-agent Entra Agent ID + OBO** (was: shared service account)
> - **Docker NOT required locally** — remote ACR Tasks build
> - **Pricing published** — `$0.0994/vCPU-hr + $0.0118/GiB-hr`, billing started Apr 22, 2026

**Foundry Toolbox (Public Preview · Apr 22, 2026).** Unified MCP endpoint bundling Web Search, File Search, Code Interpreter, Azure AI Search, MCP servers, OpenAPI, and A2A tools. Framework-agnostic — consumable from MAF, LangGraph, GitHub Copilot SDK, Claude Code, or any MCP client. Versioned bundles with promotion to default — update tools without redeploying agents. Built-in OAuth identity passthrough + Entra Agent Identity. Endpoint pattern:

```
https://{project}.services.ai.azure.com/api/projects/{proj}/toolboxes/{name}/mcp?api-version=v1
# Required header: Foundry-Features: Toolboxes=V1Preview
```

Distinct from **Foundry MCP Server** at `mcp.ai.azure.com` — which exposes Foundry *management* operations (create agents, run evals, manage deployments) as MCP tools for developer IDEs, not agent runtime tools.

**Foundry Memory refresh (Public Preview · Apr 22, 2026).** Managed long-term memory with MAF + LangGraph native integration. No external database to provision. Pricing begins **Jun 1, 2026**: `$0.25/1K events` (short-term) + `$0.25/1K memories/month` (long-term) + `$0.50/1K retrievals`. Free during preview before Jun 1.

```python
from agent_framework import InMemoryHistoryProvider
from agent_framework.azure import AzureOpenAIResponsesClient, FoundryMemoryProvider
from azure.ai.projects import AIProjectClient
from azure.identity import AzureCliCredential

agent = AzureOpenAIResponsesClient(credential=AzureCliCredential()).as_agent(
    name="CustomerSuccessAgent",
    instructions="You are a proactive customer success agent.",
    context_providers=[
        InMemoryHistoryProvider(),          # short-term (per session)
        FoundryMemoryProvider(              # long-term (cross-session, persistent)
            project_client=AIProjectClient(
                endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
                credential=AzureCliCredential(),
            ),
            memory_store_name=memory_store.name,
            scope="user_123",  # or "{{$userId}}" for auto-resolution
        ),
    ],
)
```

New in the Apr 22 refresh: memory item CRUD API (inspect/edit/delete specific facts), custom `x-memory-user-id` header to decouple scope from Entra identity, 10,000 memories/scope × 100 scopes/store.

**Agent Harness (Public Preview · Apr 22, 2026).** Three MAF patterns for long-running autonomous agents:

1. **Local Shell Harness with approval flows** — `@tool(approval_mode="always_require")` gates every shell command behind human-in-the-loop approval
2. **Hosted Shell Harness** — one-line change (`client.get_shell_tool()`) runs execution in the same provider-managed sandbox that powers Hosted Agents
3. **Context Compaction** — `CompactionProvider(before_strategy=SlidingWindowStrategy(keep_last_groups=3))` keeps long-running sessions within token budget without losing critical context

Plus **GitHub Copilot SDK integration** (Public Preview) — MAF as orchestration backbone, Copilot SDK as agent harness layer (MCP, skills, shell execution, file ops). Any agent in an MAF workflow can delegate to a Copilot-SDK-powered sub-agent.

**MAF v1.0 multi-model** — Azure OpenAI, Anthropic, Google Gemini, Amazon Bedrock, Ollama (SDK-layer provider switching). *Note: not equivalent to Vercel AI Gateway — MAF gives you code-level provider selection, not a runtime routing/fallback/BYOK gateway with 0% markup.*

```dockerfile
# Dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY main.py .
EXPOSE 8088
CMD ["python", "main.py"]
```

**Foundry Evaluations (GA Mar 16, 2026).** 30+ built-in evaluators + 9 agent-specific (Tool Call Accuracy, Task Adherence, Intent Resolution). Custom evaluators: LLM-as-judge + code-based (Preview). Continuous production monitoring piped into Azure Monitor. Prompt Optimizer preview.

**Foundry Monitoring & Tracing (GA Mar 16, 2026).** OpenTelemetry-based distributed tracing. One-call setup across Python, .NET, Node, and Java:

```python
from azure.monitor.opentelemetry import configure_azure_monitor
configure_azure_monitor(
    connection_string=os.environ["APPLICATIONINSIGHTS_CONNECTION_STRING"]
)
# All subsequent Agent SDK calls auto-traced
```

**Foundry MCP Server (preview Mar 20, 2026).** Cloud-hosted MCP at `mcp.ai.azure.com`. Entra ID auth. No infrastructure to deploy. Works with VS Code and any MCP-compliant client.

**McpTool (native MCP client in `azure-ai-agents`).** Connect Foundry agents to any MCP server URL:

```python
from azure.ai.agents.models import McpTool
mcp_tool = McpTool(
    server_label="github",
    server_url="https://gitmcp.io/Azure/azure-rest-api-specs",
    allowed_tools=[],
)
mcp_tool.allow_tool("search_azure_rest_api_code")
# mcp_tool.set_approval_mode("never")  # skip human approval
```

**Foundry Guardrails for Agents (preview Feb 13, 2026).** Per-agent content policy. **10 risk categories**: Hate / Sexual / Violence / Self-harm / Prompt Shield / Indirect Attack Detection / Protected Material (code + text) / PII / Task Adherence applied at **4 intervention points**: user input, tool call, tool response, agent output. Single object attached to both models and agents.

**Microsoft Entra Agent ID (preview, originally May 19, 2025 at Build; expansion Apr 8, 2026).** First-class agent identities. Agent identity blueprints as Entra objects. OAuth 2.0 OBO flows + `client_credentials`. Managed Identity federation (FIC / TUAMI). Conditional Access. Unified directory across Copilot Studio and Foundry. The most mature enterprise identity model of any agent platform.

**Computer Use tool (preview).** Available in **3 regions**: East US 2, Sweden Central, South India. Model cost: $3 / 1M input, $12 / 1M output.

**Browser Automation tool (preview).** Uses **Microsoft Playwright Workspaces** (BYO resource, any GPT model, DOM actions). Distinct from Computer Use (screenshot-based).

**MAI Models (Apr 2, 2026).** Microsoft's first-party models: MAI-Transcribe-1 (STT, 2.5× Azure Fast speed, $0.36/hr), MAI-Voice-1 (TTS, $22/1M chars), MAI-Image-2 (image gen, $5/1M text tokens).

**Azure Durable Task Scheduler.** Managed backend for Durable Functions + Durable Task SDKs. **Dedicated SKU GA Nov 20, 2025** — 1 CU = 2,000 actions/sec + 50 GB, up to **90-day** retention. **Consumption SKU GA Mar 31, 2026** — pay-per-action, no upfront cost, up to **30-day** retention.

### 6c. Legacy Azure Frameworks (Superseded by MAF 1.0)

Both remain maintained but are **explicitly migration targets**, not primary tools for new projects.

**Semantic Kernel (Python `1.41.2` / .NET `1.74.0`).** Enterprise plugin model, the C#/.NET-first heritage. `ChatCompletionAgent`, `[KernelFunction]` / `@kernel_function`, `HandoffOrchestration`, `ChatHistoryAgentThread`. Active development continues (SK `dotnet-1.74.0` shipped Mar 20, 2026 with CVE-2026-26127 patched). **Migration path:** [SK → MAF guide](https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-semantic-kernel) ships as part of MAF 1.0.

```python
# Semantic Kernel — legacy example (still works, but MAF is blessed)
from semantic_kernel.agents import ChatCompletionAgent
agent = ChatCompletionAgent(
    service=AzureChatCompletion(credential=AzureCliCredential()),
    name="Assistant",
    instructions="Answer questions.",
    plugins=[MenuPlugin()],
)
```

**AutoGen (`python-v0.7.5`).** Research-origin multi-agent framework. AutoGen v0.4 rewrote around `autogen-core` + `autogen-agentchat` + `autogen-ext`. As of April 2026: **Microsoft's `microsoft/autogen` fork is in maintenance mode**. The community fork is **AG2** (`ag2ai/ag2`, MIT, backward-compatible with 0.2, forked Nov 11, 2024). Microsoft's official recommendation: migrate to Agent Framework.

```python
# AutoGen — legacy example
from autogen_agentchat.agents import AssistantAgent
from autogen_ext.models.openai import OpenAIChatCompletionClient
agent = AssistantAgent(
    name="weather_agent",
    model_client=OpenAIChatCompletionClient(model="gpt-4o"),
    tools=[get_weather],
    reflect_on_tool_use=True,
    model_client_stream=True,
)
```

> 📝 **If you already have an SK or AutoGen codebase:** keep it running. Both SDKs are stable and maintained. But any NEW code should be MAF 1.0. The migration guides are explicit, and MAF's multi-agent primitives are a strict superset of both predecessors.

---

