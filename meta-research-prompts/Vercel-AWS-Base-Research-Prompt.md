# ROLE

Act as a Senior Principal Cloud Architect. Produce a definitive technical evaluation of **Vercel's Agent Stack** vs. **AWS Agent Stack**.

> 📅 **Coverage window:** This prompt is calibrated to April 2026. Use it to produce reports dated 2026-04 or later. The January 2026 baseline version is preserved in `APPENDIX A: PROMPT CHANGELOG`.

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
| **AWS** | Strands Agents SDK (`Agent`, `Swarm`, `Graph`, `AgentAsTool`, Plugin system) | BedrockAgentCoreApp (Runtime, Memory, Gateway, Identity, Policy GA, Evaluations GA, Registry preview) | Amazon Bedrock (Standard / Priority / Flex tiers) | [AgentCore Dev Guide](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/), [Strands SDK](https://github.com/strands-agents/sdk-python), [AgentCore Pricing](https://aws.amazon.com/bedrock/agentcore/pricing/) |

### What to Exclude

- ❌ Raw `boto3` or `@aws-sdk` calls (unless no higher-level abstraction exists)
- ❌ Third-party orchestration frameworks (LangChain, LlamaIndex) unless officially integrated
- ❌ Custom infrastructure setups (self-hosted Kubernetes, EC2 deployments)
- ❌ Legacy APIs or deprecated approaches

### Validation Questions

When documenting a capability, ask:

1. **Is this the official recommendation?** Check quickstart guides and "Getting Started" docs.
2. **Is there a simpler way?** If a 10-line solution exists, don't document the 100-line alternative.
3. **Would the DevRel team demo this?** If it's not demo-worthy, it's probably not the blessed path.

## MCP TOOLCHAIN UTILIZATION (MANDATORY)

To ensure "Hard Facts Only," you MUST use these tools:

1. **GitHub MCP:**
   - **Agent Frameworks:**
     - Analyze `vercel/ai` (AI SDK 6.x, TypeScript — current stable `ai@6.0.168`+; v7 beta at `7.0.0-beta.111`+) for `ToolLoopAgent`, tools, streaming, `WorkflowAgent`.
     - Analyze `strands-agents/sdk-python` (Strands SDK Python — current `v1.36.0`+) for `Agent`, `Swarm`, `Graph`, `AgentAsTool`, Plugin system, `BedrockModel(service_tier=...)`.
     - Analyze `strands-agents/sdk-typescript` (current `v1.0.0-rc.4`+, **still RC, not GA as of April 2026**).
   - **Infrastructure SDKs:**
     - Analyze Vercel Sandbox SDK (`@vercel/sandbox`) — **GA since Jan 30, 2026** — for code execution, filesystem snapshots (Jan 22, 2026), persistent sandboxes (beta Mar 26), Enterprise 32 vCPU / 64 GB configs (Apr 8).
     - Analyze Vercel Workflow SDK — **GA since Apr 16, 2026** — for durable workflow support, E2E encryption (Mar 17), custom class serialization (Apr 2), Python SDK beta.
     - Verify `aws/bedrock-agentcore-sdk-python` — current `v1.6.3`+ — for `EvaluationClient`, `ResourcePolicyClient`, `serve_a2a()`, `serve_ag_ui()`, `AgentCoreMemorySessionManager(read_only=...)`.
   - Note: `bedrock-agentcore-sdk-python` is the deployment wrapper; agent logic uses Strands SDK.
2. **AWS Documentation MCP:**
   - Fetch the GA SLAs for AgentCore (Policy GA Mar 3; Evaluations GA Mar 31).
   - Extract current **Claude 4.5/4.6/4.7 Opus/Sonnet and Haiku 4.5** pricing via Bedrock.
   - Fetch **Bedrock service tiers** (Priority / Standard / Flex / Reserved) and their multipliers.
   - Fetch the current AgentCore regional matrix (expanded since Jan 8 — see section 2b).
3. **Vercel MCP:**
   - Query current **AI Gateway** model catalog and confirm **0% markup** on all providers.
   - Query **Fast Data Transfer (FDT)** regional pricing (the "AI Units v2026" term in the Jan 8 report does NOT exist as a public SKU — use FDT and AI Gateway Credits terminology instead).
   - Fetch current Sandbox / Workflow / Fluid Compute pricing.
4. **Context7:**
   - Cross-reference the current canonical `ToolLoopAgent` and Strands `Agent` examples on the latest tags.
   - Look up the latest `BedrockAgentCoreApp` and protocol adapter patterns (`serve_a2a`, `serve_ag_ui`).

## OUTPUT FILENAME & PATHING

- YYYY = Current Year
- MM = Current Month
- DD = Current Day

`generated-reports/vercel-aws/{YYYY}/{MM}/{YYYY-MM-DD}-Agent-Comparison-Report-{MODEL}.md`

## STRICT INSTRUCTION: NO QUANTITATIVE RATINGS

If you include a "7/10" or any subjective score, the report is a failure.

- **Format:** Use "Max Execution Window: 8 hours (AWS) vs. 30s (Vercel)" or "Lines of Infrastructure-as-Code: [Count]".

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
  - **AG-UI protocol** added to AgentCore Runtime (alongside MCP and A2A)
  - **Strands Python SDK** v1.21.0 → v1.36.0 (15 releases; `AgentAsTool`, Plugin system, `BedrockModel(service_tier=...)`)
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

- List specific Git tags analyzed for both platforms (current: `ai@6.0.168`, `strands-agents@v1.36.0`, `bedrock-agentcore@v1.6.3`, `strands-agents-ts@v1.0.0-rc.4`).

### 5. Observability & Day 2 (Evidence-Based)

- **Telemetry:** Contrast OTEL-compatible spans (Vercel) vs. CloudWatch AgentCore dashboards.
- **Loop-Breaker:** Compare the logic of `maxSteps` (Vercel) vs. the dynamic policy-based termination in AgentCore.

### 6. Adoption Metrics (GitHub API Data)

- **Issue Ratio:** (Open / Closed) in the last 60 days.
- **Commit Frequency:** Days since last major architectural change.

## ARCHITECTURAL VISUALS

Generate **parallel diagrams for both platforms** to enable direct visual comparison:

### 1. Agent Lifecycle Sequence Diagrams (Both Platforms)

| Platform | Diagram Focus |
|----------|---------------|
| **Vercel** | `sequenceDiagram`: User → AI SDK `ToolLoopAgent` → AI Gateway → Model → Tool Execution → Response |
| **AWS** | `sequenceDiagram`: User → Strands `Agent` → Bedrock → AgentCore Runtime → Tool Execution → Response |

**Purpose:** Show how a single agent request flows through each stack, highlighting where orchestration, model calls, and tool execution occur.

### 2. Infrastructure Architecture Diagrams (Both Platforms)

| Platform | Diagram Focus |
|----------|---------------|
| **Vercel** | `graph TD`: Vercel Platform (Edge → Fluid Compute → Sandbox microVM → Workflow persistence) + **Secure Compute boundary** (dedicated IPs, VPC peering) |
| **AWS** | `graph TD`: AgentCore (API Gateway → Runtime microVM → Memory/Gateway/Policy services) + **VPC boundary** (IAM, Cedar policies) |

**Purpose:** Show the infrastructure layers and security boundaries for deployed agents.

**Security Boundary Comparison:**

| Aspect | Vercel Secure Compute | AWS VPC + AgentCore |
|--------|----------------------|---------------------|
| **Network Isolation** | Dedicated IP addresses per network | VPC with private subnets |
| **Peering** | VPC peering to AWS VPCs (max 50 connections) | Native VPC peering, PrivateLink |
| **Failover** | Active/Passive network failover across regions | Multi-AZ, cross-region replication |
| **Policy Layer** | Environment variables, middleware | IAM + Cedar (AgentCore Policy) |
| **Pricing** | Enterprise: $6.5K/year + $0.15/GB data transfer | VPC: Free; NAT Gateway + PrivateLink fees (expand below) |

<details>
<summary><strong>📊 AWS Network Connectivity Cost Breakdown</strong></summary>

| AWS Component | Hourly Cost | Data Processing | Annual Cost (24/7, 1 AZ) |
|---------------|-------------|-----------------|--------------------------|
| **NAT Gateway** | $0.045/hour | $0.045/GB | ~$394/year + data |
| **NAT Gateway (Regional, 3 AZ)** | $0.135/hour (3×$0.045) | $0.045/GB | ~$1,183/year + data |
| **PrivateLink Interface Endpoint** | $0.01/hour per ENI | $0.01/GB (first 1 PB) | ~$88/year per AZ + data |
| **PrivateLink (3 AZ HA)** | $0.03/hour | $0.01/GB | ~$263/year + data |
| **Cross-region data transfer** | — | $0.02/GB | Variable |

**Sources:**

- [AWS VPC Pricing](https://aws.amazon.com/vpc/pricing/) — NAT Gateway: $0.045/hour + $0.045/GB
- [AWS PrivateLink Pricing](https://aws.amazon.com/privatelink/pricing/) — Interface Endpoint: $0.01/hour + $0.01/GB

</details>

<details>
<summary><strong>💰 Cost Comparison Examples (Vercel vs AWS)</strong></summary>

**Example 1: 100 GB/month outbound**

| Scenario | Vercel Secure Compute | AWS (NAT Gateway + PrivateLink, 3 AZ) |
|----------|----------------------|---------------------------------------|
| **Annual base cost** | $6,500 | ~$1,446 (NAT: $1,183 + PrivateLink: $263) |
| **Data (100 GB × 12 mo)** | $180 ($0.15/GB) | $66 ($0.045 NAT + $0.01 PL = $0.055/GB) |
| **Total annual** | **$6,680** | **~$1,512** |

**Example 2: 1 TB/month outbound**

| Scenario | Vercel Secure Compute | AWS (NAT Gateway + PrivateLink, 3 AZ) |
|----------|----------------------|---------------------------------------|
| **Annual base cost** | $6,500 | ~$1,446 |
| **Data (1 TB × 12 mo)** | $1,800 ($0.15/GB) | $660 ($0.055/GB) |
| **Total annual** | **$8,300** | **~$2,106** |

> ⚠️ **Trade-off:** AWS is 3-4× cheaper but requires VPC configuration, IAM policies, and operational overhead. Vercel Secure Compute is a managed solution with simpler setup.

**Source:** [Vercel Secure Compute](https://vercel.com/docs/connectivity/secure-compute) — Enterprise: $6.5K/year + $0.15/GB

</details>

### 3. Tool Execution Flow (Side-by-Side)

| Platform | Diagram Focus |
|----------|---------------|
| **Vercel** | `sequenceDiagram`: Agent → `bash-tool` (in-memory) OR Agent → Sandbox SDK (microVM isolation) |
| **AWS** | `sequenceDiagram`: Agent → AgentCore Gateway → Code Interpreter/Browser Tool (containerized sandbox) |

**Purpose:** Compare how each platform handles secure code execution and tool invocation.

**Generate a detailed Tool Execution Capabilities Comparison (collapsible `<details>` section) covering:**

1. **Available Tool Types Table:** Map equivalent tools across platforms:
   - Code execution (Sandbox SDK ↔ Code Interpreter)
   - Lightweight shell (`bash-tool` ↔ N/A)
   - Browser automation (Anthropic Computer Use ↔ Browser Tool)
   - File operations (textEditor tool ↔ Code Interpreter file ops)

2. **Runtime & Language Support Table:** Compare:
   - Supported languages (Node.js, Python, TypeScript, etc.)
   - Isolation mechanism (microVM vs containerized sandbox)
   - Pre-installed libraries vs runtime install
   - File size limits (inline upload, S3 integration)
   - Internet/network access configurability

3. **Execution Limits Table:** Document hard limits:
   - Default and max timeout durations
   - Memory allocation (per vCPU, total)
   - Concurrent instance limits by plan tier

4. **Pricing Model Table:** Compare per-component costs:
   - CPU/compute hourly rates
   - Memory (GB-hour) rates
   - Per-invocation/creation fees
   - Network egress costs

5. **`bash-tool` vs Code Interpreter Analysis:** Highlight the key differentiator:
   - Execution model (pure TS interpreter vs real runtime)
   - Shell access (simulated vs full terminal)
   - Use cases (lightweight context retrieval vs full data analysis)
   - Overhead (near-zero vs container cold start)

### Optional: Combined Comparison Diagram

A single `graph LR` showing both stacks side-by-side with equivalent components aligned:

```
Vercel Stack          ↔          AWS Stack
─────────────────────────────────────────────
AI SDK 6.x            ↔    Strands SDK
AI Gateway            ↔    Amazon Bedrock
Fluid Compute         ↔    AgentCore Runtime
Sandbox SDK           ↔    Code Interpreter
Workflow SDK          ↔    Runtime (8hr max)
```

## TECHNICAL CONSTRAINTS

- Citations: Every claim MUST link to source docs found via MCP or Web.
- If data is not in MCP or Web, write "DOCUMENTATION GAP: [Feature Name]".

## METHODOLOGY: HANDLING ECOSYSTEM ASYMMETRY

The comparison involves **full agent stacks** targeting different ecosystems:

| Aspect | Vercel Agent Stack | AWS Stack (Bedrock + AgentCore) |
|--------|--------------------|---------------------------------|
| **Model Layer** | AI Gateway (unified API, BYOK) | Amazon Bedrock (foundation models) |
| **Primary Language** | TypeScript | Python (TypeScript SDK in preview) |
| **Target Ecosystem** | Fullstack + Backend (Next.js, FastAPI, Flask, Express) | Backend/ML (Python, boto3, Node.js) |
| **Framework Integration** | React hooks, RSC, Svelte, Vue + Python backends (FastAPI, Flask) | Strands, LangGraph, CrewAI |
| **Code Execution** | Sandbox SDK (TS + Python) | Code Interpreter (Python) |
| **Durability** | Workflow SDK (`"use workflow"`) | Runtime (8hr microVM) |
| **Memory** | External (bring your own) | AgentCore Memory (managed) |

**Sources:**

- [Vercel Backends](https://vercel.com/docs/frameworks/backend) — FastAPI, Flask, Express support
- [Strands TypeScript SDK](https://strandsagents.com/latest/documentation/docs/user-guide/quickstart/typescript/) — Experimental, not feature-complete with Python SDK

**Recommendation for Fair Comparison:**

1. **Feature Parity:** Map equivalent capabilities across stacks:
   - AI Gateway ↔ Amazon Bedrock (model access)
   - `ToolLoopAgent` ↔ AgentCore Runtime decorator
   - Sandbox SDK ↔ AgentCore Code Interpreter
   - Workflow SDK ↔ AgentCore Runtime long-running
   - Computer Use tools ↔ AgentCore Browser
2. **Infra Comparison:** Focus on runtime characteristics, not language syntax
3. **TypeScript on AWS:** Reference Strands Agents TypeScript (preview) for TS-based AWS agent work
4. **DX Comparison:** Acknowledge that Vercel optimizes for frontend DX, AWS for infrastructure control
5. **TCO Analysis:** Include all stack components (Sandbox pricing, Workflow pricing, etc.)

---

## VALIDATED CITATIONS & REFERENCE DATA (MCP-Sourced)

> **Last Validated:** 2026-04-21

### GitHub Repository References

| Platform | Repository | Language | Latest Tag (Apr 21, 2026) |
|----------|------------|----------|---------------------------|
| Vercel AI SDK (stable) | [vercel/ai](https://github.com/vercel/ai) | TypeScript | `ai@6.0.168` |
| Vercel AI SDK (v7 beta) | [vercel/ai](https://github.com/vercel/ai) | TypeScript | `ai@7.0.0-beta.111` |
| Vercel Workflow | [`@ai-sdk/workflow`](https://github.com/vercel/ai) | TypeScript | Part of AI SDK v7 beta |
| AWS AgentCore SDK | [aws/bedrock-agentcore-sdk-python](https://github.com/aws/bedrock-agentcore-sdk-python) | Python | `v1.6.3` |
| Strands Agents (Python) | [strands-agents/sdk-python](https://github.com/strands-agents/sdk-python) | Python | `v1.36.0` |
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

**Source:** [Strands Agents Python SDK](https://github.com/strands-agents/sdk-python) (current: `v1.36.0`)

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

- **`Agent` class:** Core abstraction; accepts plain callables in `hooks=[...]` (v1.36.0)
- **Tool registration:** `@tool` decorator (sync, async, streaming via yield)
- **Model routing:** Bedrock (with service tiers), Anthropic, OpenAI/Responses, Gemini (new), SageMaker AI (new), LiteLLM, Mistral, Ollama, Writer, Llama API, LlamaCpp
- **Multi-agent:** `Swarm` (autonomous handoffs) + `Graph` (deterministic DAG w/ conditional edges) — both GA
- **`AgentAsTool` (v1.34.0):** Pass `Agent` instances directly in `tools=[...]` — auto-wrapped
- **Plugin system (v1.28.0):** `Plugin` ABC; Agent Skills is now a plugin (v1.30.0)
- **Languages:** Python (primary, `v1.36.0`), TypeScript (RC — `v1.0.0-rc.4`, **not GA** as of April 2026; includes Swarm, Graph, MCP, A2A, and `VercelModel` adapter), Java (Spring AI AgentCore SDK, GA Apr 14, 2026)

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

## DOCUMENTATION GAPS IDENTIFIED

| Feature | Status |
|---------|--------|
| AgentCore GA SLA percentage | DOCUMENTATION GAP — No specific uptime % published; AWS typically offers 99.9% for managed services |
| AWS Agent Registry pricing | DOCUMENTATION GAP — Preview service (Apr 9, 2026); rates not yet published |
| AgentCore Policy GA pricing line | DOCUMENTATION GAP — At GA, Policy is included in Runtime/Gateway pricing with no separate SKU; previous $0.000025/request preview rate no longer published |

## DOCUMENTATION GAPS RESOLVED (April 2026 refresh)

| Feature | Resolution | Source |
|---------|------------|--------|
| Vercel Sandbox SDK pricing | **Resolved:** $0.128/hr CPU, $0.0212/GB-hr memory (updated from $0.0106 at Jan 8), $0.15/GB network, $0.60/1M creations, $0.08/GB-mo storage — GA | [Vercel Sandbox Pricing](https://vercel.com/docs/vercel-sandbox/pricing) |
| Vercel Workflow SDK pricing | **Resolved:** $2.50/100K steps, $0.00069/GB-hr storage — GA Apr 16, 2026; function compute billed separately at Fluid Compute rates | [Vercel Workflow Pricing](https://vercel.com/docs/workflows/pricing) |
| **"AI Units v2026"** | **Resolved:** Term does not exist as a public SKU. Use **Fast Data Transfer (FDT)** for CDN traffic and **AI Gateway Credits** for gateway billing (0% markup) | [Vercel Pricing](https://vercel.com/docs/pricing) |
| Edge Runtime max duration | **Resolved:** 30 seconds (Edge Functions), extendable with Fluid Compute | [Vercel Limits](https://vercel.com/docs/limits) |
| Claude Haiku 4.5 pricing | **Resolved:** $1.00/1M input, $5.00/1M output (on-demand, updated from $0.80/$4.00 at Jan 8) | [Anthropic Pricing](https://platform.claude.com/docs/en/docs/about-claude/pricing) |
| Claude Opus 4.6 / 4.7 pricing | **Resolved:** Both at $5.00/$25.00 per MTok (same as 4.5); Opus 4.7 has 1.0–1.35× tokenizer inflation vs 4.6 | [AWS Opus 4.7 Blog](https://aws.amazon.com/blogs/aws/introducing-anthropics-claude-opus-4-7-model-in-amazon-bedrock/) |
| Bedrock Service Tiers | **Resolved:** Priority (+75%) / Standard / Flex (−50%) / Reserved — accessible via Strands `BedrockModel(service_tier=...)` (v1.35.0, Apr 8, 2026) | [Bedrock Service Tiers](https://aws.amazon.com/bedrock/service-tiers/) |
| AgentCore Evaluations rates | **Resolved (GA):** $0.0024/1K input + $0.012/1K output (built-in, 13 evaluators), $1.50/1K custom + model inference | [AWS AgentCore Pricing](https://aws.amazon.com/bedrock/agentcore/pricing/) |
| AI Gateway markup | **Resolved:** 0% markup confirmed in docs — BYOK and managed credentials both at provider list price | [AI Gateway Pricing](https://vercel.com/docs/ai-gateway/pricing) |

---

## CROSS-REFERENCE LINKS

### AWS Documentation

**Agent Framework (Strands SDK):**

- [Strands Agents Python SDK GitHub](https://github.com/strands-agents/sdk-python) — Agent framework (tag: `v1.36.0`)
- [Strands Agents TypeScript SDK GitHub](https://github.com/strands-agents/sdk-typescript) — TS SDK (tag: `v1.0.0-rc.4`, still RC)
- [Strands SDK Documentation](https://strandsagents.com/) — Official docs

**Infrastructure (AgentCore):**

- [AgentCore Pricing](https://aws.amazon.com/bedrock/agentcore/pricing/)
- [AgentCore Overview](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html)
- [AgentCore Supported Regions](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agentcore-regions.html) — Regional availability matrix
- [AgentCore Runtime](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agents-tools-runtime.html)
- [AgentCore Policy (GA Mar 3, 2026)](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/policy.html)
- [AgentCore Evaluations (GA Mar 31, 2026)](https://aws.amazon.com/about-aws/whats-new/2026/03/agentcore-evaluations-generally-available/)
- [AWS Agent Registry (Preview)](https://aws.amazon.com/blogs/machine-learning/the-future-of-managing-agents-at-scale-aws-agent-registry-now-in-preview/)
- [AG-UI Protocol in Runtime](https://aws.amazon.com/about-aws/whats-new/2026/03/amazon-bedrock-agentcore-runtime-ag-ui-protocol/)
- [FAST Template](https://github.com/awslabs/fullstack-solution-template-for-agentcore) — Full-stack AgentCore starter

**Model Platform (Bedrock):**

- [Bedrock Pricing](https://aws.amazon.com/bedrock/pricing/)
- [Bedrock Service Tiers](https://aws.amazon.com/bedrock/service-tiers/)
- [Claude in Bedrock](https://aws.amazon.com/bedrock/anthropic/)
- [Claude Opus 4.7 Launch (Apr 16, 2026)](https://aws.amazon.com/blogs/aws/introducing-anthropics-claude-opus-4-7-model-in-amazon-bedrock/)
- [Claude Opus 4.6 Launch (Feb 5, 2026)](https://aws.amazon.com/about-aws/whats-new/2026/2/claude-opus-4.6-available-amazon-bedrock/)
- [Claude Sonnet 4.6 Launch (Feb 17, 2026)](https://aws.amazon.com/about-aws/whats-new/2026/02/claude-sonnet-4.6-available-in-amazon-bedrock/)

### Vercel Agent Stack Documentation

- [Vercel AI Gateway](https://vercel.com/ai-gateway)
- [AI Gateway Pricing (0% markup)](https://vercel.com/docs/ai-gateway/pricing)
- [AI Gateway ZDR Announcement](https://vercel.com/blog/zdr-on-ai-gateway)
- [Vercel AI SDK GitHub](https://github.com/vercel/ai) (stable: `ai@6.0.168`; beta: `ai@7.0.0-beta.111`)
- [AI SDK Agents Docs](https://github.com/vercel/ai/blob/main/content/docs/03-agents/02-building-agents.mdx)
- [bash-tool Changelog](https://vercel.com/changelog/introducing-bash-tool-for-filesystem-based-context-retrieval) — Jan 7, 2026
- [bash-tool Skills Support](https://vercel.com/changelog/use-skills-in-your-ai-sdk-agents-via-bash-tool) — Jan 21, 2026
- [Vercel Sandbox SDK Docs](https://vercel.com/docs/vercel-sandbox) — GA Jan 30, 2026
- [Vercel Sandbox Pricing](https://vercel.com/docs/vercel-sandbox/pricing)
- [Vercel Sandbox GA Blog](https://vercel.com/blog/vercel-sandbox-is-now-generally-available)
- [Persistent Sandboxes Beta](https://vercel.com/changelog/vercel-sandbox-persistent-sandboxes-beta) — Mar 26, 2026
- [Sandbox 32 vCPU / 64 GB](https://vercel.com/changelog/vercel-sandbox-now-supports-up-to-32-vcpu-64-gb-ram-configurations) — Apr 8, 2026
- [Vercel Workflow GA Blog](https://vercel.com/blog/a-new-programming-model-for-durable-execution) — Apr 16, 2026
- [Vercel Workflow Pricing](https://vercel.com/docs/workflows/pricing)
- [Workflow E2E Encryption](https://vercel.com/changelog/workflow-encryption) — Mar 17, 2026
- [useworkflow.dev](https://useworkflow.dev/) — Official Workflow docs
- [Vercel Chat SDK](https://vercel.com/changelog/chat-sdk) — Feb 23, 2026
- [Vercel Plugin for Coding Agents](https://vercel.com/changelog/introducing-vercel-plugin-for-coding-agents) — Mar 17, 2026
- [Agentic Infrastructure Blog](https://vercel.com/blog/agentic-infrastructure) — Apr 9, 2026
- [Secure Compute Self-Serve](https://vercel.com/changelog/secure-compute-is-now-self-serve) — Jan 7, 2026
- [Fluid Compute Pricing](https://vercel.com/docs/fluid-compute/pricing)

### GitHub Repositories

**Agent Frameworks:**

- [vercel/ai](https://github.com/vercel/ai) — AI SDK 6.x, TypeScript (tag: `ai@6.0.168` stable / `7.0.0-beta.111` beta) — Agent framework
- [strands-agents/sdk-python](https://github.com/strands-agents/sdk-python) — Strands Agents SDK, Python (tag: `v1.36.0`) — Agent framework
- [strands-agents/sdk-typescript](https://github.com/strands-agents/sdk-typescript) — Strands TS SDK (tag: `v1.0.0-rc.4`, RC) — Agent framework

**Infrastructure SDKs:**

- [aws/bedrock-agentcore-sdk-python](https://github.com/aws/bedrock-agentcore-sdk-python) — AgentCore, Python (tag: `v1.6.3`) — Infrastructure wrapper (`BedrockAgentCoreApp`, `EvaluationClient`, `ResourcePolicyClient`, `serve_a2a`, `serve_ag_ui`)

---

## APPENDIX A: PROMPT CHANGELOG

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-08 | Initial prompt creation with Vercel AI SDK 6.x vs AWS Bedrock AgentCore comparison framework |
| 1.1.0 | 2026-01-08 | Added validated citations from MCP servers (GitHub, AWS Docs, Context7) |
| 1.2.0 | 2026-01-08 | Added SDK Language Support Matrix; documented Python/TypeScript asymmetry |
| 1.3.0 | 2026-01-08 | Integrated Vercel Sandbox SDK & Workflow Development Kit (WDK) |
| 1.4.0 | 2026-01-08 | Added Vercel AI Gateway & Amazon Bedrock platform comparison |
| 1.5.0 | 2026-01-08 | Added bash-tool for filesystem context retrieval |
| 1.6.0 | 2026-01-08 | Added self-update prompt and changelog appendix |
| 1.7.0 | 2026-01-08 | **Major clarification:** Two-layer architecture (Agent Framework vs Infrastructure). Strands SDK = agent framework, AgentCore = infrastructure wrapper. Compare AI SDK ↔ Strands, not AI SDK ↔ AgentCore |
| 1.8.0 | 2026-01-08 | Added "Blessed Path" methodology — focus on officially recommended, out-of-the-box developer experience; exclude DIY/custom solutions |
| 1.9.0 | 2026-01-08 | Added Regional Availability Matrix — AgentCore Evaluations only in 4 regions (preview); documented feature-by-region availability |
| 2.0.0 | 2026-01-08 | **Major enhancements:** Added Vercel Sandbox iad1 region; Secure Compute comparison with AWS VPC/NAT/PrivateLink pricing; Tool Execution Flow instructions; Ecosystem corrections (Vercel backends, Strands TS preview); Resolved 3 documentation gaps (Sandbox pricing, Edge limits, Haiku pricing) |
| 2.1.0 | 2026-01-08 | Updated Vercel AI SDK version to `ai@6.0.23`; Verified AWS AgentCore pricing (no changes); Verified Bedrock pricing |
| **3.0.0** | **2026-04-21** | **Major refresh: Jan → Apr 2026 delta.** (1) Status updates: Vercel Sandbox Beta→GA (Jan 30), Vercel Workflow Beta→GA (Apr 16), AgentCore Policy Preview→GA (Mar 3), AgentCore Evaluations Preview→GA (Mar 31), Strands TS preview→RC v1.0.0-rc.4. (2) SDK version bumps: `ai@6.0.23`→`6.0.168` (+ v7 beta `7.0.0-beta.111`), `bedrock-agentcore@v1.1.4`→`v1.6.3`, `strands-agents@v1.21.0`→`v1.36.0`. (3) New models: Claude Opus 4.6 (Feb 5), Sonnet 4.6 (Feb 17), Opus 4.7 (Apr 16 — new tokenizer + `xhigh` effort), GPT-5.4, Gemini 3.1, Kimi K2.6 and 20+ others on AI Gateway. (4) Regional expansion: AgentCore Runtime 11→14 regions, Evaluations 4→9 regions, Policy 11→13 regions. (5) New AgentCore services: AWS Agent Registry (preview, 5 regions), AG-UI protocol in Runtime, `InvokeAgentRuntimeCommand` API, Browser S3 profile billing (Apr 15). (6) New Vercel capabilities: Chat SDK (Feb 23), `WorkflowAgent` primitive, AI Gateway team-wide ZDR (Apr 8), Workflow E2E encryption (Mar 17), Persistent Sandboxes beta (Mar 26), Sandbox Enterprise 32 vCPU / 64 GB (Apr 8), Montréal `yul1` 21st region (Jan 20). (7) Bedrock service tiers (Priority/Standard/Flex) via Strands `BedrockModel(service_tier=...)` (v1.35.0). (8) Terminology correction: "AI Units v2026" does not exist as a public SKU — use Fast Data Transfer (FDT) + AI Gateway Credits (0% markup). (9) Updated canonical code examples to AI SDK 6.0.168+ (`inputSchema` not `parameters`; string model IDs; `prepareStep`) and Strands v1.36.0 (`BedrockModel(service_tier=...)`; callable hooks). (10) Updated all regional availability tables and pricing tables to April 2026 rates. |

---

## APPENDIX B: SELF-UPDATE PROMPT

Use the following prompt to refresh this master document with the latest information. Run this periodically (recommended: weekly or after major announcements) to keep citations, versions, and pricing current.

---

### 🔄 Master Prompt Refresh Instructions

```markdown
## TASK: Refresh the Agent Comparison Master Prompt

You are updating the master research prompt at `Base-Research-Prompt.md`. Your goal is to validate all existing citations and update any stale information.

### REQUIRED MCP TOOLCHAINS

Use these MCP servers for authoritative data (DO NOT use general knowledge):

1. **GitHub MCP** — Fetch latest release tags and repository metadata
2. **AWS Documentation MCP** — Latest AgentCore, Bedrock pricing, and features
3. **Vercel MCP** — Latest AI SDK, Sandbox, Workflow, AI Gateway docs
4. **Context7 MCP** — Cross-reference documentation and code samples

### REFRESH CHECKLIST

#### 1. Version Updates
Run these GitHub MCP queries to get current versions:

- [ ] `vercel/ai` — Check latest release tag (current: `ai@6.0.168` stable / `7.0.0-beta.111` beta)
- [ ] `aws/bedrock-agentcore-sdk-python` — Check latest tag (current: `v1.6.3`)
- [ ] `strands-agents/sdk-python` — Check latest release (current: `v1.36.0`)
- [ ] `strands-agents/sdk-typescript` — Check latest release (current: `v1.0.0-rc.4`, still RC)

#### 2. Pricing Validation
Query AWS Documentation MCP for current rates:

- [ ] AgentCore Runtime (per vCPU-hour / per GB-hour)
- [ ] AgentCore Memory (per 1K events / per 1K records/month)
- [ ] AgentCore Gateway (per 1K invocations)
- [ ] AgentCore Code Interpreter (per vCPU-hour / per GB-hour)
- [ ] AgentCore Browser Tool — including S3 profile storage billing (started Apr 15, 2026)
- [ ] AgentCore Evaluations (per 1K input/output tokens + custom evaluator rate)
- [ ] Bedrock Claude 4.5/4.6/4.7 Sonnet/Opus rates
- [ ] Bedrock service tier multipliers (Priority/Standard/Flex/Reserved)

Query Vercel MCP / docs for:

- [ ] AI Gateway markup (confirm 0% on all providers)
- [ ] Sandbox SDK pricing tiers (Hobby / Pro / Enterprise)
- [ ] Workflow SDK pricing (steps + storage)
- [ ] Fluid Compute regional rates (iad1, sfo1, fra1, gru1 baseline)
- [ ] Secure Compute pricing (still $6.5K/year + $0.15/GB?)

#### 3. Feature Parity Check
Search for new announcements:

- [ ] Vercel Changelog: Any new agent-related features since last update?
- [ ] AWS What's New: Any AgentCore updates since last update?
- [ ] New MCP server support on either platform?

#### 3b. Blessed Path Validation
Confirm the recommended approach hasn't changed:

- [ ] Vercel: Is `ToolLoopAgent` still the recommended agent abstraction? Check AI SDK docs.
- [ ] AWS: Is Strands SDK + AgentCore still the recommended pattern? Check AgentCore getting-started guide.
- [ ] Has either platform deprecated or renamed key APIs?
- [ ] Are there new "Getting Started" tutorials that suggest a different approach?

#### 3c. Regional Availability Check
Use AWS Documentation MCP to verify regional availability:

- [ ] Check [AgentCore Supported Regions](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agentcore-regions.html) for updates
- [ ] Has AgentCore Runtime expanded past 14 regions (baseline as of Apr 21, 2026)?
- [ ] Has AgentCore Evaluations expanded past 9 regions (baseline as of Apr 21, 2026)?
- [ ] Has AgentCore Policy expanded past 13 regions (baseline as of Apr 21, 2026)?
- [ ] Has AWS Agent Registry expanded past 5 preview regions?
- [ ] Any new AgentCore features with limited regional availability?
- [ ] Update the Regional Availability Matrix in section 2b if changed
- [ ] Has Vercel Sandbox expanded past `iad1`?
- [ ] Has Vercel Workflow backend expanded past `iad1` (execution is already global; state/queue is iad1-only)?

#### 4. Documentation Link Validation
Verify all URLs in "CROSS-REFERENCE LINKS" section are still valid:

- [ ] Spot-check 5 random links from each platform
- [ ] Update any 404s or redirected URLs

### OUTPUT FORMAT

After validation, update the following sections in `Base-Research-Prompt.md`:

1. **VALIDATED CITATIONS & REFERENCE DATA** — Update any changed values
2. **GitHub Repositories** — Update version tags
3. **APPENDIX A: PROMPT CHANGELOG** — Add new row with today's date and changes

Example changelog entry:
| 1.7.0 | YYYY-MM-DD | Updated SDK versions; refreshed pricing tables; added [new feature] |

### VALIDATION SUMMARY

At the end, provide a summary:

---
## Refresh Summary

**Date:** YYYY-MM-DD
**SDK Versions:**
- Vercel AI SDK: `ai@X.X.X` (was: `ai@6.0.168` stable / `7.0.0-beta.111` beta)
- AgentCore SDK: `vX.X.X` (was: `v1.6.3`)
- Strands Agents (Python): `vX.X.X` (was: `v1.36.0`)
- Strands Agents (TypeScript): `vX.X.X` (was: `v1.0.0-rc.4`)

**Pricing Changes:**
- [List any pricing changes or "No changes detected"]

**New Features:**
- [List new features added or "No new features"]

**Broken Links Fixed:**
- [List fixed links or "All links valid"]

**Documentation Gaps Remaining:**
- [List any data still missing from official sources]
---
```

---

### 🚀 Quick Refresh Command

Copy-paste this condensed version for rapid updates:

```
@Base-Research-Prompt.md Refresh this master prompt:

1. Use GitHub MCP to check latest versions of:
   - vercel/ai (baseline: ai@6.0.168 stable / 7.0.0-beta.111 beta)
   - aws/bedrock-agentcore-sdk-python (baseline: v1.6.3)
   - strands-agents/sdk-python (baseline: v1.36.0)
   - strands-agents/sdk-typescript (baseline: v1.0.0-rc.4)

2. Use AWS Documentation MCP to validate AgentCore & Bedrock pricing
   (especially service tiers and any new Claude model releases)

3. Use Vercel MCP / changelog to check for new entries since the last refresh date

4. Update the VALIDATED CITATIONS section with any changes

5. Add a new row to APPENDIX A: PROMPT CHANGELOG

Report what changed and what stayed the same.
```

---

### 📋 Changelog Entry Template

When updating the changelog, use this format:

```markdown
| X.X.X | YYYY-MM-DD | Brief description of changes |
```

Categories for changes:

- **Version bump** — SDK/API version updates
- **Pricing update** — Rate changes
- **Feature add** — New capabilities added to comparison
- **Citation fix** — Corrected or updated documentation links
- **Scope expansion** — Added new platforms/tools to comparison
- **Methodology update** — Changed comparison approach
