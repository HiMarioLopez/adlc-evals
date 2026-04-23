## REQUIRED SECTIONS

### 1. Metadata & 2026 Delta

- Last Updated (ISO 8601), Model, and Path.
- Technical Delta: Summary of what changed between the **January 2026 baseline** and the current report date. Specifically cover:
  - **Vercel Sandbox** Beta → GA (Jan 30, 2026)
  - **Vercel Workflow** Beta → GA (Apr 16, 2026) with E2E encryption and 2× speed improvement
  - **AI SDK** version progression (`ai@6.0.23` → `6.0.168`+ stable, `7.0.0-beta.x` active)
  - **AgentCore Policy** Preview → GA (Mar 3, 2026)
  - **AgentCore Evaluations** Preview → GA (Mar 31, 2026, 4 → 9 regions)
  - **AWS Agent Registry** launched in preview (Apr 9, 2026) — 8th AgentCore service
  - **AgentCore Managed Harness (Preview Apr 22, 2026)** — **9th AgentCore service**; declarative agent config replaces orchestration code; 3-call API (`CreateHarness` → `GetHarness` → `InvokeHarness`); 4 preview regions (us-east-1, us-west-2, ap-southeast-2, eu-central-1); powered by Strands `v1.37.0`; no additional charge
  - **AgentCore CLI (Preview Apr 22, 2026)** — `@aws/agentcore` npm (`v0.9.1` stable / `v1.0.0-preview.1`); unified `agentcore create/dev/deploy/invoke`; CDK IaC under the hood, Terraform "coming soon"; available in all 14 AgentCore regions
  - **AgentCore Coding Agent Skills (Apr 22, 2026)** — pre-built best-practice skills; Kiro Power GA today; Claude Code / Codex / Cursor plugins "coming next week" (~Apr 29, 2026)
  - **AgentCore persistent agent filesystem (Preview Mar 25, 2026)** — managed session storage; 1 GB/session; 14-day idle retention; 14 regions; pricing TBD before GA
  - **AG-UI protocol** added to AgentCore Runtime (alongside MCP and A2A)
  - **Strands Python SDK** v1.21.0 → **v1.37.0** (16 releases; now powers AgentCore managed harness; `AgentAsTool`, Plugin system, `BedrockModel(service_tier=...)`, fallback trim, experimental checkpoint)
  - **bedrock-agentcore-sdk-python** v1.1.4 → v1.6.3 (22 releases)
  - **Strands TypeScript SDK** preview → `v1.0.0-rc.4` (still RC, not GA)
  - **Claude model lineup** expansion: Opus 4.6 (Feb 5), Sonnet 4.6 (Feb 17), **Opus 4.7 (Apr 16)** with new tokenizer (1.0–1.35× inflation) and `xhigh` effort level
  - **AgentCore Runtime** regional expansion from 11 → 14 regions

### 2. Infrastructure Footprint (Hard Facts)

Populate a side-by-side comparison table covering the **full agent development lifecycle**:

| Capability | Vercel Stack | AWS Stack |
|------------|--------------|-----------|
| **Agent Framework** | AI SDK 6.x (`ToolLoopAgent`, tools, `prepareStep`, `dynamicTool`) + `WorkflowAgent` (durable) | **Strands SDK** (`Agent`, tools, `AgentAsTool`, `Swarm`, `Graph`, Plugins) |
| **Model Gateway/Routing** | AI Gateway (0% markup, fallbacks, BYOK, team-wide ZDR GA, Custom Reporting API, 20+ providers) | Amazon Bedrock (foundation models, **Priority / Standard / Flex / Reserved tiers**) |
| **Infrastructure Wrapper** | Vercel Platform (Fluid Compute, Active CPU billing, I/O wait free) | **BedrockAgentCoreApp** (`@app.entrypoint`, `@app.websocket`, `serve_a2a`, `serve_ag_ui`) |
| **Secure Code Execution** | Sandbox SDK **GA** (Firecracker microVMs, TS+Python, 8 vCPU Pro / 32 vCPU Enterprise, Persistent Sandboxes beta, filesystem snapshots) | AgentCore Code Interpreter (containerized, Python/JS/TS, 5 GB files, 8h max) |
| **Durable Workflows** | Workflow SDK **GA** (`"use workflow"` directive, E2E encrypted, 2× faster, custom class serialization, Python beta, event-sourced) | AgentCore Runtime (8h max, session persistence, `InvokeAgentRuntimeCommand` for in-container shell) |
| **Browser Automation** | Anthropic Computer Use tools (`computer_20250124`, `webSearch_20250305`) + Kernel (Marketplace) | AgentCore Browser (cloud, custom Chrome extensions, CAPTCHA reduction via Web Bot Auth) |
| **Persistent Memory** | External (Redis, DB) or `WorkflowAgent` state | AgentCore Memory (built-in STM + LTM, strategies: semantic/summary/preference/episodic, Kinesis streaming notifications, `read_only` flag) |
| **Tool Management/MCP** | `@ai-sdk/mcp` client (stable HTTP/SSE transports, `Experimental_StdioMCPTransport`) | AgentCore Gateway (MCP Server, Lambda-as-tool transform, server-side tool execution via Bedrock Responses API) |
| **Protocol Support** | MCP | MCP + A2A + **AG-UI** (AgentCore runtime supports all 3 open protocols) |
| **Authorization** | Environment Variables, middleware | AgentCore Policy **GA** (Cedar-based, IAM integration, ENFORCE/MONITOR modes, 13 regions) + `ResourcePolicyClient` |
| **Identity/OAuth** | NextAuth/Auth.js, custom | AgentCore Identity (OAuth, API keys, M2M + USER_FEDERATION flows, custom_parameters) |
| **Evaluations** | External (bring your own) | AgentCore Evaluations **GA** (13 built-in evaluators, on-demand + online modes, Ground Truth, custom Lambda evaluators, 9 regions) |
| **Agent Discovery** | N/A | AWS Agent Registry (preview, 5 regions) — 8th AgentCore service |
| **Managed Agent Harness** 🆕 | AI SDK `ToolLoopAgent` (code-first TypeScript class) | AgentCore Managed Harness (preview Apr 22, 2026) — **9th AgentCore service**; declarative config; 3-call API (`CreateHarness` → `GetHarness` → `InvokeHarness`); 4 regions; powered by Strands `v1.37.0`; swap providers mid-session |
| **Agent CLI** 🆕 | `vercel` CLI v52 (git-push-to-deploy; no CDK/Terraform) | AgentCore CLI `@aws/agentcore` (preview Apr 22, 2026) — unified `agentcore create/dev/deploy/invoke`; CDK IaC under the hood, Terraform coming soon; 14 regions |
| **Coding Agent Integration** 🆕 | AI Gateway coding agent integrations (9 agents) + Vercel MCP (12+ clients) + `ai-sdk.dev/llms.txt` | AgentCore Coding Agent Skills — Kiro Power GA (Apr 22, 2026); Claude Code / Codex / Cursor plugins ~Apr 29, 2026 |
| **Observability** | AI SDK telemetry (OTEL-compatible, `@ai-sdk/otel` package in v7, stable API), Workflow data in Vercel Observability | AgentCore Observability + CloudWatch (span ingestion, step visualization, metadata tagging) |
| **Multi-Agent** | Compose `ToolLoopAgent` + subagents via `toModelOutput` | Strands `Swarm` (autonomous handoffs), `Graph` (deterministic DAG), `AgentAsTool` (nested composition) |
| **Chat Integration** | Chat SDK (unified library for Slack, Discord, Teams, WhatsApp, Telegram) | Slack reference architecture (Strands + Gateway + Memory) |

**Deep-dive each row with:**

- **Runtime Persistence:** AWS AgentCore Runtime (8-hour microVM isolation) vs. Vercel Workflow SDK (durable functions) vs. Vercel Sandbox (ephemeral microVMs).
- **Code Execution:** Compare Sandbox SDK pricing/limits vs. AgentCore Code Interpreter pricing.
- **Context Retrieval:** Vercel `bash-tool` (in-memory/sandboxed filesystem with `just-bash` TypeScript interpreter) vs. AgentCore Browser/Code Interpreter approaches.
- **Security Primitives:** List EXACT IAM Actions vs. Vercel Environment Variables.
- **Protocol Support:** Compare Vercel's MCP Client implementation vs. AWS AgentCore Gateway's MCP Server support.
- **Regional Availability:** Document which features are available in which regions (see below).

### 2b. Regional Availability Matrix

> ⚠️ **Production Consideration:** Not all AgentCore features are available in all regions. This affects architecture decisions.

**AWS AgentCore Regional Availability (April 2026):**

| Feature | Regions Available | Notes |
|---------|-------------------|-------|
| **AgentCore Evaluations** | **9 regions** (us-east-1, us-east-2, us-west-2, eu-central-1, eu-west-1, ap-south-1, ap-southeast-1, ap-southeast-2, ap-northeast-1) | **GA since Mar 31, 2026** (was 4 regions preview at Jan 8 baseline) |
| **AWS Agent Registry** | **5 regions** (us-east-1, us-west-2, eu-west-1, ap-southeast-2, ap-northeast-1) | **Preview** — new service, Apr 9, 2026 |
| AgentCore Policy | **13 regions** | **GA since Mar 3, 2026** (+us-east-2, +eu-west-2 vs Jan 8); missing only ca-central-1, sa-east-1 |
| AgentCore Runtime | **14 regions** | +3 since Jan 8: eu-west-2, eu-west-3, eu-north-1 (expansion event Jan 26, 2026); missing only sa-east-1 |
| AgentCore Built-in Tools | **14 regions** | Same as Runtime |
| AgentCore Observability | **14 regions** | Same as Runtime |
| AgentCore Gateway | **14 regions** | Unchanged; missing sa-east-1 |
| AgentCore Identity | **14 regions** | Unchanged; missing sa-east-1 |
| AgentCore Memory | **15 regions** | Unchanged; broadest availability (includes sa-east-1) |

**Source:** [AgentCore Supported Regions](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agentcore-regions.html)

**Vercel Regional Availability (April 2026):**

| Feature | Availability | Notes |
|---------|--------------|-------|
| AI SDK 6.x | Global (Edge + Serverless) | Runs anywhere Vercel deploys |
| AI Gateway | Global | Edge-optimized routing, 0% markup, team-wide ZDR GA Apr 8, 2026 |
| Fluid Compute | **21 compute regions** | +Montréal (`yul1`) Jan 20, 2026; Active CPU billing (I/O wait free) |
| Sandbox SDK | **`iad1` only** (Washington, D.C.) | **GA since Jan 30, 2026** but still single-region; community requests for Tokyo (hnd1) and other regions acknowledged but not shipped |
| Workflow SDK | **Execution global, state `iad1` only** | **GA since Apr 16, 2026**; function execution is global (Vercel Functions run anywhere) but the persistence/queue backend is `iad1`-only — multi-region backend is on roadmap but not shipped |
| Chat SDK | Global | Feb 23, 2026 launch; unified multi-platform library |

**Sources:**

- Sandbox: [Vercel Sandbox Supported Regions](https://vercel.com/docs/vercel-sandbox/pricing) — "Currently, Vercel Sandbox is only available in the iad1 region"
- Workflow: [Vercel World Deploy Docs](https://useworkflow.dev/worlds/vercel) — "Single-region deployment: The backend infrastructure is currently deployed only in `iad1`. Applications in other regions will route workflow requests to `iad1`, which may result in higher latency."

**Comparison Questions:**

- Which regions support the full agent stack on each platform?
- What's the latency impact of cross-region inference for Evaluations?
- Does Vercel's edge deployment provide lower latency for global users?

### 3. 2026 Unit Economics

**Model Layer Costs:**

- **Vercel AI Gateway:** Document **0% markup** (confirmed in docs — provider list price passes through). BYOK and managed credentials both pay provider list price; difference is billing path only.
- **Amazon Bedrock:** On-Demand vs. Provisioned Throughput vs. Batch (50% off) vs. **Service Tiers** (Priority +75%, Standard, Flex −50%) — new since baseline via Strands v1.35.0 `BedrockModel(service_tier=...)`.

**Agent Execution Costs:**

- **Vercel:** Calculate cost for 1,000 turns using **AI Gateway pass-through** (at provider list price, 0% markup) + **Sandbox SDK** (if used: $0.128/CPU-hr, $0.0212/GB-hr, $0.60/1M creations, $0.15/GB) + **Workflow SDK** ($2.50/100K steps, $0.00069/GB-hr storage) + **Fluid Compute** ($0.128/CPU-hr in US East, I/O wait free). Do NOT use the term "AI Units v2026" — that was an internal/proposed name that did not ship as a public SKU. Use "Fast Data Transfer (FDT)" for edge traffic and "AI Gateway Credits" for gateway billing.
- **AWS:** Calculate cost for 1,000 turns using **Claude Sonnet 4.6** rates ($3/$15 per MTok, same as 4.5, but improved perf; this is the current recommended Sonnet) + AgentCore Runtime ($0.0895/vCPU-hr, $0.00945/GB-hr) + Memory ($0.25/1K short-term events) + Gateway ($0.005/1K invocations).

**The "Effort" Tax:** Document how Anthropic's `effort` parameter impacts TCO on both platforms. Levels are now **low / medium / high / xhigh** (xhigh is Opus 4.7 only, Apr 16, 2026). Effort is **GA on Bedrock** via `anthropic_beta: ["effort-2025-11-24"]` header. Opus 4.7 uses **adaptive thinking** — no `budget_tokens` anymore; the model dynamically adjusts reasoning depth.

**Opus 4.7 Tokenizer Warning:** Claude Opus 4.7 (Apr 16, 2026) uses an updated tokenizer that produces **1.0–1.35× more tokens for the same input** vs. Opus 4.6. Per-token rate is unchanged at $5/$25 per MTok, but effective cost may be 0–35% higher for equivalent prompts. Calculators should expose a tokenizer-inflation slider when Opus 4.7 is selected.

**Browser Profile S3 Storage:** New cost dimension effective April 15, 2026 — AgentCore Browser Profile artifacts (cookies, local storage) in S3 are billed at standard S3 rates. This was free during ramp-up and is a new line item to model.

### 4. Agent Stack Deep-Dive

**Vercel Agent Stack:**

- **AI SDK 6.x:** Analyze the `ToolLoopAgent` abstraction with the new `prepareStep`, `callOptionsSchema`, and `prepareCall` options. Cover all three `stopWhen` conditions: `isStepCount(N)`, `hasToolCall(...)`, `isLoopFinished()`.
- **AI SDK v7 beta:** Call out the new `WorkflowAgent` primitive in `@ai-sdk/workflow` for durable/resumable agents, the stable `@ai-sdk/otel` telemetry package, `toolNeedsApproval` for human-in-the-loop, and `uploadFile`/`uploadSkill` provider abstractions.
- **AI Gateway integration:** Document the string shorthand `model: 'anthropic/claude-sonnet-4.6'` (no explicit provider import needed) vs. `gateway('provider/model')` explicit import. Confirm **0% markup** on all providers.
- **Sandbox SDK (GA):** Compare microVM isolation to AgentCore Code Interpreter. Cover Enterprise 32 vCPU / 64 GB, Persistent Sandboxes beta, filesystem snapshots, CLI integration via `vercel sandbox`.
- **AgentCore Managed Harness (Preview Apr 22, 2026):** Analyze declarative config vs. `BedrockAgentCoreApp` + CDK stack. Cover the 3-call API (`CreateHarness` / `GetHarness` / `InvokeHarness`), 4 preview regions, Strands `v1.37.0` as underlying framework, mid-session provider swapping, export-to-Strands-code escape hatch. Cite [harness docs](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/harness.html), [harness get-started](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/harness-get-started.html), [Apr 22 announcement](https://aws.amazon.com/blogs/machine-learning/get-to-your-first-working-agent-in-minutes-announcing-new-features-in-amazon-bedrock-agentcore/), and [What's New](https://aws.amazon.com/about-aws/whats-new/2026/04/agentcore-new-features-to-build-agents-faster/).
- **AgentCore CLI (Preview Apr 22, 2026):** Compare `@aws/agentcore` (`v0.9.1` stable, `v1.0.0-preview.1`) to `vercel` CLI. Cover CDK IaC (auto-managed `agentcore/cdk/`), Terraform "coming soon" caveat, framework support (Strands, LangChain/LangGraph, Google ADK, OpenAI Agents SDK), 14-region availability. Cite [aws/agentcore-cli](https://github.com/aws/agentcore-cli) and [CLI docs](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agentcore-get-started-cli.html).
- **AgentCore Coding Agent Skills (Apr 22, 2026):** Contrast with Vercel's AI Gateway coding agent integrations + `mcp.vercel.com` + `ai-sdk.dev/llms.txt`. Cover Kiro Power GA today, Claude Code / Codex / Cursor plugins "coming next week" (~Apr 29, 2026), and the "IDE-embedded skill pack" paradigm vs. Vercel's "gateway + MCP" paradigm. Cite [kiro.dev/powers](https://kiro.dev/powers/) and [kirodotdev/powers/aws-agentcore](https://github.com/kirodotdev/powers/tree/main/aws-agentcore).
- **AgentCore persistent agent filesystem (Preview Mar 25, 2026):** Compare to Vercel Sandbox Persistent Sandboxes (beta, iad1-only) and Vercel Workflow durable execution. Cover 1 GB/session, 14-day idle retention, S3-backed, 14 regions, POSIX limitations (no hard links / device files / FIFOs / xattr), pricing TBD before GA. Cite [persistent filesystems docs](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-persistent-filesystems.html) and [Mar 25 What's New](https://aws.amazon.com/about-aws/whats-new/2026/03/bedrock-agentcore-runtime-session-storage/).
- **bash-tool:** Open-sourced Jan 7, 2026. Analyze filesystem context retrieval; the `just-bash` TS interpreter engine; `experimental_createSkillTool` for Skills support (Jan 21).
- **Workflow SDK (GA):** Compare `"use workflow"` durability to AgentCore 8-hour runtime. Cover: E2E encryption by default (AES-256-GCM, per-run HKDF-SHA256 keys), event-sourced architecture, custom class serialization, `WorkflowAgent` primitive, Python beta, Vercel Queues as underlying durable queue layer.
- **Chat SDK:** New Feb 23, 2026 — unified TS library for Slack, Discord, Teams, WhatsApp, Telegram, and more.
- **Computer Use Tools:** Document `bash_20250124`, `computer_20250124`, `textEditor_20250124`, and the new `webSearch_20250305` Anthropic-native web search tool (requires Claude 3.7+).

**AWS Agent Stack (Strands + AgentCore):**

- **Strands SDK (Python v1.36.0+):** Analyze the `Agent` class with the new `plugins=[...]` and callable-accepting `hooks=[...]` parameters. Cover tool registration via `@tool`, the `Agent`-in-`tools` auto-wrap pattern (`AgentAsTool`, v1.34.0), and the full model provider lineup (Bedrock, Anthropic, OpenAI/Responses, Gemini, SageMaker AI, LiteLLM, Mistral, Ollama, Writer, Llama API, LlamaCpp).
- **Bedrock service tiers:** Cover `BedrockModel(service_tier="priority" | "default" | "flex")` (Strands v1.35.0, Apr 8, 2026) — Priority +75%, Standard baseline, Flex −50%.
- **Multi-agent orchestration:** Both `Swarm` (autonomous handoffs) and `Graph` (deterministic DAG with conditional edges) are GA in Python. The TypeScript RC also has both.
- **BedrockAgentCoreApp:** Analyze `@app.entrypoint`, `@app.ping`, `@app.websocket`, `@app.async_task`. Cover the new protocol adapters: `serve_a2a()` (pip install `bedrock-agentcore[a2a]`), `serve_ag_ui()` with `AGUIApp`.
- Analyze the **Memory strategies** (semantic, summary, user_preference, episodic) and memory lifecycle. Cover the new `AgentCoreMemorySessionManager(read_only=False)` flag (v1.6.1).
- Analyze **Policy in AgentCore (GA)** — Cedar-based runtime guardrails + `ResourcePolicyClient` for resource-based IAM-style policies on Runtime/Endpoint/Gateway ARNs.
- Analyze **Evaluations (GA)** — `EvaluationClient.run()` for on-demand session evaluation, 13 built-in evaluators, online (continuous) + on-demand modes, Ground Truth support, and `@custom_code_based_evaluator()` for Lambda-deployed custom evaluators (v1.6.0).
- Compare **Code Interpreter** sandbox to Vercel Sandbox SDK.
- Compare **Browser Tool** to Anthropic Computer Use integration. Cover S3 profile storage (new billing line Apr 15, 2026) and custom Chrome extensions (Jan 2026).
- Cover **`InvokeAgentRuntimeCommand` API** (Mar 17, 2026) for running shell commands inside a running Runtime session.
- Cover **AWS Agent Registry** (preview, Apr 9, 2026) as the 8th AgentCore service.
- Cover **Strands TypeScript SDK** status — `v1.0.0-rc.4`, still RC; includes Swarm, Graph, MCP, streaming, hooks, A2A, and a `VercelModel` adapter for Vercel AI SDK v3 Language Model Spec.
- Cover **Spring AI AgentCore SDK** (Java GA, Apr 14, 2026) — AgentCore now has GA-quality SDKs for Python, TypeScript (RC), and Java.

- List specific Git tags analyzed for both platforms (current: `ai@6.0.168`, `strands-agents@v1.37.0`, `bedrock-agentcore@v1.6.3`, `strands-agents-ts@v1.0.0-rc.4`, `@aws/agentcore@1.0.0-preview.1` / `v0.9.1` stable).

### 5. Observability & Day 2 (Evidence-Based)

- **Telemetry:** Contrast OTEL-compatible spans (Vercel) vs. CloudWatch AgentCore dashboards.
- **Loop-Breaker:** Compare the logic of `maxSteps` (Vercel) vs. the dynamic policy-based termination in AgentCore.

### 6. Adoption Metrics (GitHub API Data)

- **Issue Ratio:** (Open / Closed) in the last 60 days.
- **Commit Frequency:** Days since last major architectural change.

