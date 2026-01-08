# ROLE

Act as a Senior Principal Cloud Architect. Produce a definitive technical evaluation of **Vercel's Agent Stack** vs. **AWS Agent Stack**.

## ARCHITECTURAL CLARIFICATION

Both platforms have a **two-layer architecture**. Compare like-for-like:

| Layer | Vercel | AWS |
|-------|--------|-----|
| **Agent Framework** (SDK for building agents) | AI SDK 6.x (`ToolLoopAgent`, tools, streaming) | **Strands Agents SDK** (`Agent`, tools, model routing) |
| **Infrastructure** (Runtime, memory, deployment) | Fluid Compute + Sandbox SDK + Workflow SDK | **BedrockAgentCoreApp** (Runtime, Memory, Gateway, Policy) |

> ⚠️ **Key Insight:** `bedrock-agentcore-sdk-python` is NOT the agent framework — it's the infrastructure wrapper. The actual agent logic uses **Strands SDK**. This is analogous to how Vercel's AI SDK handles agent logic while Vercel's platform (Fluid Compute, Sandbox) provides infrastructure.

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
| **Vercel** | AI SDK 6.x (`ToolLoopAgent`) | Vercel Platform (Fluid Compute, Sandbox, Workflow) | AI Gateway | [Vercel AI SDK Docs](https://sdk.vercel.ai), [Vercel Changelog](https://vercel.com/changelog) |
| **AWS** | Strands Agents SDK (`Agent`) | BedrockAgentCoreApp (Runtime, Memory, Gateway) | Amazon Bedrock | [AgentCore Dev Guide](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/), [Strands SDK](https://github.com/awslabs/strands-agents) |

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
     - Analyze `vercel/ai` (AI SDK 6.x, TypeScript) for `ToolLoopAgent`, tools, streaming.
     - Analyze `awslabs/strands-agents` (Strands SDK, Python + TS preview) for `Agent`, tools, model routing.
   - **Infrastructure SDKs:**
     - Analyze Vercel Sandbox SDK (`@vercel/sandbox`) for code execution capabilities.
     - Analyze Vercel Workflow Development Kit (WDK) for durable workflow support.
     - Verify `aws/bedrock-agentcore-sdk-python` (infrastructure wrapper, v1.1.3+).
   - Note: `bedrock-agentcore-sdk-python` is the deployment wrapper; agent logic uses Strands SDK.
2. **AWS Documentation MCP:**
   - Fetch the GA SLAs for AgentCore.
   - Extract current **Claude 4.5 Opus/Sonnet** pricing via Bedrock.
3. **Vercel MCP:**
   - Query the current definition of "AI Units" (v2026).
   - Fetch limits for the new `bash-tool` and Edge Runtime durations.
4. **Context7:**
   - Search for "AgentCore GA vs. Vercel AI SDK 6" production post-mortems.

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
- Technical Delta: Summary of what changed between SDK 5->6 and AgentCore Preview->GA.

### 2. Infrastructure Footprint (Hard Facts)

Populate a side-by-side comparison table covering the **full agent development lifecycle**:

| Capability | Vercel Stack | AWS Stack |
|------------|--------------|-----------|
| **Agent Framework** | AI SDK 6.x (`ToolLoopAgent`, tools) | **Strands SDK** (`Agent`, tools) |
| **Model Gateway/Routing** | AI Gateway (unified API, fallbacks, BYOK) | Amazon Bedrock (foundation models) |
| **Infrastructure Wrapper** | Vercel Platform (Fluid Compute) | **BedrockAgentCoreApp** (entrypoint decorator) |
| **Secure Code Execution** | Sandbox SDK (microVMs, TS+Python) | AgentCore Code Interpreter |
| **Durable Workflows** | Workflow SDK (`"use workflow"`) | AgentCore Runtime (8hr max) |
| **Browser Automation** | Anthropic Computer Use tools | AgentCore Browser |
| **Persistent Memory** | External (Redis, DB) | AgentCore Memory (built-in) |
| **Tool Management/MCP** | MCP Client (experimental) | AgentCore Gateway (MCP Server) |
| **Authorization** | Environment Variables, middleware | AgentCore Policy (Cedar) |
| **Identity/OAuth** | NextAuth, custom | AgentCore Identity |
| **Observability** | AI SDK telemetry (OTEL) | AgentCore Observability + CloudWatch |

**Deep-dive each row with:**

- **Runtime Persistence:** AWS AgentCore Runtime (8-hour microVM isolation) vs. Vercel Workflow SDK (durable functions) vs. Vercel Sandbox (ephemeral microVMs).
- **Code Execution:** Compare Sandbox SDK pricing/limits vs. AgentCore Code Interpreter pricing.
- **Context Retrieval:** Vercel `bash-tool` (in-memory/sandboxed filesystem with `just-bash` TypeScript interpreter) vs. AgentCore Browser/Code Interpreter approaches.
- **Security Primitives:** List EXACT IAM Actions vs. Vercel Environment Variables.
- **Protocol Support:** Compare Vercel's MCP Client implementation vs. AWS AgentCore Gateway's MCP Server support.
- **Regional Availability:** Document which features are available in which regions (see below).

### 2b. Regional Availability Matrix

> ⚠️ **Production Consideration:** Not all AgentCore features are available in all regions. This affects architecture decisions.

**AWS AgentCore Regional Availability:**

| Feature | Regions Available | Notes |
|---------|-------------------|-------|
| **AgentCore Evaluations** | **4 regions only** (us-east-1, us-west-2, eu-central-1, ap-southeast-2) | Preview — most limited availability |
| AgentCore Runtime | 11 regions | Missing: eu-west-2, eu-west-3, eu-north-1, ap-northeast-2, ca-central-1, sa-east-1 |
| AgentCore Built-in Tools | 11 regions | Same as Runtime |
| AgentCore Observability | 11 regions | Same as Runtime |
| AgentCore Policy | 11 regions | Same as Runtime |
| AgentCore Memory | 15 regions | Broadest availability |
| AgentCore Gateway | 14 regions | Missing: sa-east-1 |
| AgentCore Identity | 14 regions | Missing: sa-east-1 |

**Source:** [AgentCore Supported Regions](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agentcore-regions.html)

**Vercel Regional Availability:**

| Feature | Availability | Notes |
|---------|--------------|-------|
| AI SDK 6.x | Global (Edge + Serverless) | Runs anywhere Vercel deploys |
| AI Gateway | Global | Edge-optimized routing |
| Sandbox SDK | iad1 only (Washington, D.C.) | Currently single-region during Beta |
| Workflow SDK | Global (Serverless) | Durable functions in all Vercel regions |

**Sources:**

- Sandbox: [Vercel Sandbox Supported Regions](https://vercel.com/docs/vercel-sandbox/pricing) — "Currently, Vercel Sandbox is only available in the iad1 region"
- Workflow: [Vercel World (Sandbox SDK's Infra Layer) Supported Regions](https://useworkflow.dev/docs/deploying/world/vercel-world) — "Global distribution - Works with Vercel's global edge network"

**Comparison Questions:**

- Which regions support the full agent stack on each platform?
- What's the latency impact of cross-region inference for Evaluations?
- Does Vercel's edge deployment provide lower latency for global users?

### 3. 2026 Unit Economics

**Model Layer Costs:**

- **Vercel AI Gateway:** Document any gateway fees + pass-through model costs (BYOK vs. Vercel-managed)
- **Amazon Bedrock:** On-Demand vs. Provisioned Throughput vs. Batch pricing

**Agent Execution Costs:**

- **Vercel:** Calculate cost for 1,000 turns using **AI Units** + Sandbox SDK + Workflow SDK fees
- **AWS:** Calculate cost for 1,000 turns using **Claude 4.5 Sonnet** rates ($3/$15) + AgentCore Runtime/Memory/Gateway fees

**The "Effort" Tax:** Document how Anthropic's new `effort` parameter (low/med/high) impacts TCO on both platforms.

### 4. Agent Stack Deep-Dive

**Vercel Agent Stack:**

- **AI SDK 6.x:** Analyze the `ToolLoopAgent` abstraction and `stopWhen` conditions.
- **Sandbox SDK:** Compare microVM isolation to AgentCore Code Interpreter.
- **bash-tool:** Analyze filesystem context retrieval with `just-bash` engine for token-efficient agent workflows.
- **Workflow SDK:** Compare `"use workflow"` durability to AgentCore 8-hour runtime.
- **Computer Use Tools:** Document `bash`, `computer`, `textEditor` tool capabilities.

**AWS Agent Stack (Strands + AgentCore):**

- **Strands SDK:** Analyze the `Agent` class, tool registration, and model routing.
- **BedrockAgentCoreApp:** Analyze the infrastructure wrapper and `@app.entrypoint` pattern.
- Analyze the **Self-Managed Memory Strategy** and memory lifecycle.
- Analyze **Policy in AgentCore** (Cedar-based permissions).
- Compare **Code Interpreter** sandbox to Vercel Sandbox SDK.
- Compare **Browser Tool** to Anthropic Computer Use integration.

- List specific Git tags analyzed for both platforms.

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

> **Last Validated:** 2026-01-08T18:00:00Z

### GitHub Repository References

| Platform | Repository | Language | Latest Tag | Stars | Open Issues |
|----------|------------|----------|------------|-------|-------------|
| Vercel AI SDK | [vercel/ai](https://github.com/vercel/ai) | TypeScript | `ai@6.0.23` | N/A | 884 |
| AWS AgentCore SDK | [aws/bedrock-agentcore-sdk-python](https://github.com/aws/bedrock-agentcore-sdk-python) | Python | `v1.1.3` | 609 | 43 |

### SDK Language Support Matrix

**Source:** [AgentCore Developer Guide](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/develop-agents.html)

| Layer | Vercel | AWS | Language |
|-------|--------|-----|----------|
| **Agent Framework** | AI SDK 6.x | Strands Agents SDK | TS/JS vs Python (TS preview) |
| **Infrastructure SDK** | `@vercel/sdk` | `bedrock-agentcore-sdk-python` | TS/JS vs Python only |

| SDK | Primary Language | Other Languages | Role |
|-----|------------------|-----------------|------|
| **Vercel AI SDK 6.x** | TypeScript/JavaScript | — | Agent framework (tools, streaming, orchestration) |
| **Strands Agents SDK** | Python | TypeScript (Preview) | Agent framework (tools, model routing) |
| **bedrock-agentcore-sdk-python** | Python | — | Infrastructure wrapper (`BedrockAgentCoreApp`) |

> ⚠️ **Critical Distinction:** The `bedrock-agentcore-sdk-python` is NOT for building agent logic — it's for deploying agents to AgentCore infrastructure. Agent logic is written with **Strands SDK**. This is like how you use AI SDK for agent logic but deploy on Vercel's platform.

> 📝 **Methodological Note:** Compare AI SDK 6.x ↔ Strands SDK for agent framework features. Compare Vercel Platform ↔ AgentCore for infrastructure features. Don't conflate the two layers.

### AWS Bedrock AgentCore Pricing (GA) — US East (N. Virginia)

**Source:** [AWS AgentCore Pricing](https://aws.amazon.com/bedrock/agentcore/pricing/)

| Service | Resource | Price |
|---------|----------|-------|
| **Runtime** | CPU | $0.0895 per vCPU-hour |
| **Runtime** | Memory | $0.00945 per GB-hour |
| **Browser Tool** | CPU | $0.0895 per vCPU-hour |
| **Browser Tool** | Memory | $0.00945 per GB-hour |
| **Code Interpreter** | CPU | $0.0895 per vCPU-hour |
| **Code Interpreter** | Memory | $0.00945 per GB-hour |
| **Gateway** | API Invocations (ListTools, InvokeTool, Ping) | $0.005 per 1,000 invocations |
| **Gateway** | Search API | $0.025 per 1,000 invocations |
| **Gateway** | Tool Indexing | $0.02 per 100 tools indexed/month |
| **Identity** | Token/API key requests (non-AWS) | $0.010 per 1,000 requests |
| **Memory** | Short-Term (events) | $0.25 per 1,000 new events |
| **Memory** | Long-Term Storage (built-in) | $0.75 per 1,000 records/month |
| **Memory** | Long-Term Retrieval | $0.50 per 1,000 retrievals |
| **Policy (Preview)** | Authorization Request | $0.000025 per request |
| **Observability** | Spans, logs, metrics | CloudWatch pricing applies |

### Claude 4.5 Pricing via Amazon Bedrock

**Source:** [Claude Opus 4.5 Launch Blog](https://aws.amazon.com/blogs/machine-learning/claude-opus-4-5-now-in-amazon-bedrock/)

| Model | Input (per 1M tokens) | Output (per 1M tokens) |
|-------|----------------------|------------------------|
| Claude Opus 4.5 | $5.00 | $25.00 |
| Claude Sonnet 4.5 | $3.00 | $15.00 |
| Claude Haiku 4.5 | $0.80 | $4.00 |

**Note:** The prompt states "$3/$15" for Claude 4.5 Sonnet which aligns with documented Sonnet-tier pricing.

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
import type { GatewayProviderOptions } from '@ai-sdk/gateway';
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'openai/gpt-4o', // Primary model
  prompt: 'Write a TypeScript haiku',
  providerOptions: {
    gateway: {
      models: ['openai/gpt-5-nano', 'gemini-2.0-flash'], // Fallbacks
      order: ['vertex', 'anthropic'],  // Provider preference
      only: ['vertex', 'anthropic'],   // Restrict to these
    } satisfies GatewayProviderOptions,
  },
});
```

**Key Features:**

- **Unified API:** Single endpoint for multiple AI providers (OpenAI, Anthropic, Google, etc.)
- **Automatic Fallbacks:** Sequential model retry on failure
- **BYOK (Bring Your Own Key):** Use your own provider credentials
- **Provider Routing:** `order` (preference) and `only` (restriction) options
- **Spend Monitoring:** Track usage and costs across providers
- **High Reliability:** Automatic retries and failover

**Source:** [Vercel AI Gateway](https://vercel.com/ai-gateway)

---

#### 1. AI SDK 6.x — ToolLoopAgent

**Source:** [Context7 - AI SDK Agents Documentation](https://github.com/vercel/ai/blob/main/content/docs/03-agents/02-building-agents.mdx)

```typescript
import { ToolLoopAgent, stepCountIs } from 'ai';

const agent = new ToolLoopAgent({
  model: provider('model-name'),
  stopWhen: stepCountIs(20), // Max 20 steps before termination
});
```

**Key Abstractions:**

- `ToolLoopAgent` — Agent class managing multi-step tool execution
- `stopWhen: stepCountIs(N)` — Loop-breaker condition (max steps)
- `streamText` / `generateText` — Core generation functions with `maxSteps` parameter
- `onStepFinish` / `onFinish` callbacks for observability

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

### Strands Agents SDK — AWS Agent Framework

**Source:** [Strands Agents SDK GitHub](https://github.com/awslabs/strands-agents)

```python
from strands import Agent

# Create an agent with tools
agent = Agent()

# Invoke the agent
result = agent("What's the weather in Seattle?")
print(result.message)
```

**Key Features:**

- **`Agent` class:** Core abstraction for building agents (similar to `ToolLoopAgent`)
- **Tool registration:** Define and register custom tools
- **Model routing:** Connect to multiple model providers
- **Languages:** Python (primary), TypeScript (preview, Dec 2025)

**Relationship to AgentCore:**

```python
from bedrock_agentcore import BedrockAgentCoreApp
from strands import Agent

app = BedrockAgentCoreApp()  # Infrastructure: handles deployment, scaling
agent = Agent()               # Framework: handles agent logic, tools

@app.entrypoint
def invoke(payload):
    result = agent(payload.get("prompt"))
    return {"result": result.message}

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
| Vercel "AI Units" v2026 definition | DOCUMENTATION GAP — Not publicly documented; use [Vercel Pricing Page](https://vercel.com/pricing) |
| Vercel Workflow SDK pricing/limits | DOCUMENTATION GAP — WDK pricing not publicly documented; check [Vercel Pricing](https://vercel.com/pricing) |
| AgentCore GA SLA percentage | DOCUMENTATION GAP — No specific uptime % published; AWS typically offers 99.9% for managed services |

## DOCUMENTATION GAPS RESOLVED

| Feature | Resolution | Source |
|---------|------------|--------|
| Vercel Sandbox SDK pricing | **Resolved:** $0.128/hr CPU, $0.0106/GB-hr memory, $0.15/GB network, $0.60/1M creations | [Vercel Sandbox Pricing](https://vercel.com/docs/vercel-sandbox/pricing) |
| Edge Runtime max duration | **Resolved:** 30 seconds (Edge Functions), extendable with Fluid Compute | [Vercel Limits](https://vercel.com/docs/limits) |
| Claude Haiku 4.5 pricing | **Resolved:** $0.80/1M input, $4.00/1M output (on-demand, US regions) | [AWS Bedrock Pricing](https://aws.amazon.com/bedrock/pricing/) — check Anthropic tab |

---

## CROSS-REFERENCE LINKS

### AWS Documentation

**Agent Framework (Strands SDK):**

- [Strands Agents SDK GitHub](https://github.com/awslabs/strands-agents) — Agent framework (Python + TS preview)
- [Strands SDK Documentation](https://strandsagents.com/) — Official docs (if available)

**Infrastructure (AgentCore):**

- [AgentCore Pricing](https://aws.amazon.com/bedrock/agentcore/pricing/)
- [AgentCore Overview](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html)
- [AgentCore Supported Regions](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agentcore-regions.html) — Regional availability matrix
- [AgentCore Runtime](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agents-tools-runtime.html)
- [AgentCore Policy](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/policy.html)
- [AgentCore Evaluations Cross-Region](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/evaluations-cross-region-inference.html)

**Model Platform (Bedrock):**

- [Bedrock Pricing](https://aws.amazon.com/bedrock/pricing/)
- [Claude in Bedrock](https://aws.amazon.com/bedrock/anthropic/)

### Vercel Agent Stack Documentation

- [Vercel AI Gateway](https://vercel.com/ai-gateway)
- [AI Gateway Provider Docs](https://github.com/vercel/ai/blob/main/content/providers/01-ai-sdk-providers/00-ai-gateway.mdx)
- [Vercel AI SDK GitHub](https://github.com/vercel/ai)
- [AI SDK Agents (Context7)](https://github.com/vercel/ai/blob/main/content/docs/03-agents/02-building-agents.mdx)
- [AI SDK Agents Patterns](https://www.aisdkagents.com/docs/agents/agent-patterns)
- [bash-tool Changelog](https://vercel.com/changelog/introducing-bash-tool-for-filesystem-based-context-retrieval) — Filesystem context retrieval (Jan 7, 2026)
- [Vercel Sandbox SDK Docs](https://vercel.com/docs/vercel-sandbox)
- [Vercel Workflow (WDK) Blog](https://vercel.com/blog/introducing-workflow)
- [AI SDK Computer Use Guide](https://github.com/vercel/ai/blob/main/content/cookbook/00-guides/05-computer-use.mdx)

### GitHub Repositories

**Agent Frameworks:**

- [vercel/ai](https://github.com/vercel/ai) — AI SDK 6.x, TypeScript (tag: `ai@6.0.22`) — Agent framework
- [awslabs/strands-agents](https://github.com/awslabs/strands-agents) — Strands Agents SDK, Python + TypeScript preview — Agent framework

**Infrastructure SDKs:**

- [aws/bedrock-agentcore-sdk-python](https://github.com/aws/bedrock-agentcore-sdk-python) — AgentCore, Python (tag: `v1.1.3`) — Infrastructure wrapper (`BedrockAgentCoreApp`)

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

- [ ] `vercel/ai` — Check latest release tag (current: `ai@6.0.22`)
- [ ] `aws/bedrock-agentcore-sdk-python` — Check latest tag (current: `v1.1.3`)
- [ ] `awslabs/strands-agents` — Check latest release

#### 2. Pricing Validation
Query AWS Documentation MCP for current rates:

- [ ] AgentCore Runtime (per hour)
- [ ] AgentCore Memory (per GB-month)
- [ ] AgentCore Gateway (per 1K requests)
- [ ] AgentCore Code Interpreter (per hour)
- [ ] Bedrock Claude 4.5 Sonnet/Opus rates
- [ ] Bedrock Claude Haiku rates (if available)

Query Vercel MCP for:

- [ ] AI Units pricing (if publicly available)
- [ ] Sandbox SDK pricing tiers
- [ ] AI Gateway fees

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
- [ ] Has AgentCore Evaluations expanded beyond 4 regions (us-east-1, us-west-2, eu-central-1, ap-southeast-2)?
- [ ] Any new AgentCore features with limited regional availability?
- [ ] Update the Regional Availability Matrix in section 2b if changed

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
- Vercel AI SDK: `ai@X.X.X` (was: `ai@6.0.22`)
- AgentCore SDK: `vX.X.X` (was: `v1.1.3`)

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
   - vercel/ai (current: ai@6.0.22)
   - aws/bedrock-agentcore-sdk-python (current: v1.1.3)
   - awslabs/strands-agents

2. Use AWS Documentation MCP to validate AgentCore & Bedrock pricing

3. Use Vercel MCP to check for new changelog entries since 2026-01-08

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
