## 2. Infrastructure Footprint (Hard Facts)

> 🗂️ **Structural note:** The April 2026 refresh reorganizes the capability matrix into **four thematic groups** mirroring the site: **Agent Foundations** (how you build), **Infrastructure** (where it runs), **Security & Identity** (who can do what), and **Operations** (memory, observability, evaluation). Rows flagged **NEW** were added during the April 2026 site overhaul.

### Two-Layer Architecture Comparison

| Layer | Vercel | AWS |
|-------|--------|-----|
| **Agent Framework** (SDK for building agents) | AI SDK 6.x (`ToolLoopAgent`, tools, streaming) — v7 beta adds `WorkflowAgent` | **Strands Agents SDK** (`Agent`, `Swarm`, `Graph`, `AgentAsTool`, Plugins) |
| **Infrastructure** (Runtime, memory, deployment) | Vercel Platform (Fluid Compute, Sandbox GA, Workflow GA, Queues GA, AI Gateway, Chat SDK) | **BedrockAgentCoreApp** (Runtime, Memory, Gateway, Identity, Policy GA, Evaluations GA, Agent Registry preview, Knowledge Bases GA) |

> ⚠️ **Key Architecture Insight:** **Bedrock AgentCore** separates orchestration from hosting: Strands Agents SDK (open-source) owns agent logic; AgentCore provides the managed runtime — microVM-per-session compute, Cedar-based policy, Memory, Identity, Observability, Evaluations, Agent Registry, and the new **Managed Harness** as **nine first-class services** (as of Apr 22, 2026). The harness + AgentCore CLI add a declarative, code-free path that compresses prototype → deploy, while still compiling to Strands + CDK under the hood. Vercel's AI SDK sits at the Strands layer; Vercel has no config-only harness equivalent — its `ToolLoopAgent` is code-first and the CLI is git-push-to-deploy rather than IaC. [[Announcement — Apr 22, 2026](https://aws.amazon.com/blogs/machine-learning/get-to-your-first-working-agent-in-minutes-announcing-new-features-in-amazon-bedrock-agentcore/)]

### 2.1 Agent Foundations

Core SDKs and gateways for building AI agents with reasoning and tool use.

| Capability | Vercel Stack | AWS Stack |
|------------|--------------|-----------|
| **Agent Framework** | **Vercel AI SDK 6.x** — `ToolLoopAgent`, `Agent` interface, `stopWhen`, `prepareStep`, `dynamicTool` (stable Dec 2025); v7 beta ESM-only. [Docs](https://ai-sdk.dev/docs/agents/overview) | **Strands Agents SDK** — `Agent`, `Swarm`, `Graph`, `AgentAsTool`, Plugins; Python `v1.37.0` (Apr 22, 2026), TypeScript `v1.0.0-rc.4`. Now powers AgentCore managed harness. [Docs](https://strandsagents.com) |
| **Model Gateway** | **AI Gateway** — 0% markup · BYOK across Anthropic / OpenAI / Azure / Vertex / Bedrock · 100+ models · built-in observability. [Docs](https://vercel.com/docs/ai-gateway) | **Amazon Bedrock** — Foundation models, Priority / Standard / Flex / Reserved service tiers, cross-region inference (Global CRIS on Claude 4.5+). [Docs](https://aws.amazon.com/bedrock/) |
| **Tool Management** | **`mcp-handler` 1.1 + AI SDK tools + Sandbox** — first-party MCP server (Streamable HTTP + OAuth); `@ai-sdk/mcp` client; `tool()` + `dynamicTool`; `@vercel/sandbox` 1.10 for code exec. [Docs](https://github.com/vercel/mcp-handler) | **Bedrock AgentCore Gateway** — MCP Server, Lambda-as-tool transform, server-side tool execution via Bedrock Responses API (Feb 24, 2026). [Docs](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/gateway.html) |
| **Protocol Support** | **MCP (client + server)** — `@ai-sdk/mcp` client: Streamable HTTP + SSE stable, stdio local-only · `mcp-handler` server · A2A + AG-UI not first-party. [Docs](https://ai-sdk.dev/docs/ai-sdk-core/mcp-tools) | **MCP + A2A + AG-UI** — all three open protocols supported in Runtime (AG-UI added Mar 13, 2026). [Announcement](https://aws.amazon.com/about-aws/whats-new/2026/03/amazon-bedrock-agentcore-runtime-ag-ui-protocol/) |
| **Agent Discovery** | **Marketplace + `mcp.vercel.com`** — Marketplace "AI Agents & Services" category + agent-optimized CLI (`vercel integration discover / guide`); `mcp.vercel.com` first-party MCP endpoint; no dedicated agent registry. [Marketplace](https://vercel.com/marketplace/category/agents) | **AWS Agent Registry (Preview)** — 8th AgentCore service (Apr 9, 2026); semantic + keyword search; MCP endpoint; 5 regions. [Announcement](https://aws.amazon.com/blogs/machine-learning/the-future-of-managing-agents-at-scale-aws-agent-registry-now-in-preview/) |
| **Managed Agent Harness** 🆕 | **AI SDK `ToolLoopAgent` (code-first)** — code-first TypeScript class: `new ToolLoopAgent({ model, tools, stopWhen, prepareStep })`. No declarative / config-only mode; no Python equivalent in AI SDK. [Docs](https://ai-sdk.dev/docs/agents/overview) | **AgentCore Managed Harness (Preview Apr 22, 2026)** — 9th AgentCore service. Declarative config replaces orchestration code. 3-call API surface: `CreateHarness` → `GetHarness` (poll until READY) → `InvokeHarness`. Default model: Claude Sonnet 4.6 on Bedrock. Swap providers mid-session (Bedrock / OpenAI / Gemini) via `runtimeSessionId`. 4 preview regions: us-east-1, us-west-2, ap-southeast-2, eu-central-1. Powered by Strands Agents `v1.37`. Exportable to Strands code when custom orchestration is needed. [Docs](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/harness.html) · [Announcement](https://aws.amazon.com/about-aws/whats-new/2026/04/agentcore-new-features-to-build-agents-faster/) |
| **Agent CLI** 🆕 | **`vercel` CLI v52** — general-purpose deploy CLI: `vercel` / `vercel --prod` / `vercel dev` / `vercel logs` / `vercel env pull`; no CDK / Terraform IaC path; git-push-to-deploy model. [Docs](https://vercel.com/docs/cli) | **AgentCore CLI (Preview Apr 22, 2026)** — `@aws/agentcore` npm package (`v0.9.1` stable, `v1.0.0-preview.1` Apr 22). Unified prototype → deploy → operate: `agentcore create` / `dev` / `deploy` / `invoke`. Uses AWS CDK under the hood (auto-managed `agentcore/cdk/`); Terraform "coming soon". Supports Strands (recommended), LangChain / LangGraph, Google ADK, OpenAI Agents SDK. Available in all 14 AgentCore Runtime regions. No additional charge. Repo: [aws/agentcore-cli](https://github.com/aws/agentcore-cli) · [Docs](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agentcore-get-started-cli.html) |
| **Coding Agent Integration** 🆕 | **AI Gateway coding agent integrations + Vercel MCP + `llms.txt`** — AI Gateway routing for **9 coding agents** (Claude Code, Codex, Cursor, Cline, Roo Code, Conductor, Crush, Blackbox AI, Superset); `mcp.vercel.com` remote MCP supports 12+ clients (Claude Code, Claude Desktop, ChatGPT, Codex CLI, Cursor, VS Code + Copilot, Devin, Raycast, Goose, Windsurf, Gemini Code Assist, Gemini CLI); `ai-sdk.dev/llms.txt` machine-readable docs for agent ingestion; no IDE-embedded skill packs. [Docs](https://vercel.com/docs/agent-resources/coding-agents) | **AgentCore Coding Agent Skills** — pre-built AgentCore best-practice skills for coding assistants. Bundles `POWER.md` steering + MCP server config + steering hooks. **Kiro Power GA today** (Apr 22, [kirodotdev/powers/aws-agentcore](https://github.com/kirodotdev/powers/tree/main/aws-agentcore)); Plugins for **Claude Code, Codex, and Cursor** announced as "coming next week" (~Apr 29, 2026). No additional charge. [Kiro Powers](https://kiro.dev/powers/) |

### 2.2 Infrastructure

Compute, execution environments, and workflow orchestration.

| Capability | Vercel Stack | AWS Stack |
|------------|--------------|-----------|
| **Infrastructure Wrapper** | **Fluid Compute** — Edge + Serverless hybrid across **20 regions**; in-function concurrency; 800s max (Pro/Enterprise); Active CPU billing — I/O time is free. [Docs](https://vercel.com/docs/fluid-compute) | **Bedrock AgentCore Runtime** — microVM-per-session, 14 regions, 8h `maxLifetime`, `InvokeAgentRuntimeCommand` API (Mar 17, 2026), **managed session filesystem preview** (Mar 25, 2026): 1 GB/session, 14-day idle retention, S3-backed durable storage. [Docs](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-persistent-filesystems.html) |
| **Secure Code Execution** | **Vercel Sandbox** — Firecracker microVMs, node24 / python3.13; up to **32 vCPU / 64 GB / 32 GB NVMe** (Enterprise); 5-hr max; 2,000 concurrent; `iad1` only; snapshots GA (Jan 22), persistent beta (Mar 26). [Docs](https://vercel.com/docs/vercel-sandbox) | **Bedrock AgentCore Code Interpreter** — containerized, Python / JS / TS, 5 GB files, 8h max, 14 regions. [Docs](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/code-interpreter-tool.html) |
| **Durable Workflows** | **Workflow SDK (GA Apr 16, 2026)** — `"use workflow"` directive; event-sourced; unlimited run + sleep duration; **10K steps/run**; **100K concurrent**; **DurableAgent** for AI SDK; TypeScript GA, Python beta. [Docs](https://vercel.com/docs/workflows) | **Bedrock AgentCore Runtime Sessions** — up to 8 hours, configurable idle timeout, Step Functions integration (GA Mar 26, 2026), **persistent filesystem preview** (Mar 25, 2026) for stop/resume of session state. [Docs](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-persistent-filesystems.html) |
| **Message Queue** 🆕 | **Vercel Queues (GA)** — `@vercel/queue`: durable append-only topic log; fan-out consumer groups; automatic retries + deduplication; powers the Workflow SDK under the hood. [Docs](https://vercel.com/docs/queues) | **AWS Step Functions + AgentCore (GA Mar 26, 2026)** — Step Functions SDK service integration; durable state machines; built-in retries; parallel Map states for running agents concurrently; idempotent Lambda execution; automates agent provisioning as workflow steps. [Announcement](https://aws.amazon.com/about-aws/whats-new/2026/03/aws-step-functions-sdk-integrations/) |
| **Browser Automation** | **Kernel (Marketplace) + Sandbox DIY** — Kernel (Vercel-native Marketplace, 500+ installs): CDP cloud browsers compatible with Playwright / Puppeteer / Stagehand / Computer Use · or install Chromium directly in `@vercel/sandbox`. [Marketplace](https://vercel.com/marketplace/kernel) | **Bedrock AgentCore Browser Tool** — cloud-based, custom Chrome extensions (Jan 2026), CAPTCHA reduction via Web Bot Auth, S3 profile billing (Apr 15, 2026). [Docs](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/browser-tool.html) |

### 2.3 Security & Identity

Authentication, authorization, and access control — **four new rows** (RBAC, Identity/OAuth, Content Safety, Compliance & Audit) added in the April 2026 overhaul.

| Capability | Vercel Stack | AWS Stack |
|------------|--------------|-----------|
| **Authorization** | **AI Gateway ZDR + Deployment Protection** — AI Gateway ZDR (Pro/Enterprise): team-wide toggle (**$0.10/1K req**) or per-request flag; routes to **13 ZDR providers**; BYOK exempt. Platform Deployment Protection: Vercel Auth, Password, Trusted IPs. [Docs](https://vercel.com/docs/ai-gateway/capabilities/zdr) | **Bedrock AgentCore Policy (GA Mar 3, 2026)** — Cedar-based, 13 regions, `ResourcePolicyClient`, ENFORCE / MONITOR modes. [Announcement](https://aws.amazon.com/about-aws/whats-new/2026/03/policy-amazon-bedrock-agentcore-generally-available/) |
| **RBAC & Access Control** 🆕 | **Team Roles + Access Groups + SCIM** — 8 team roles (Owner → Contributor) + dedicated Security role for firewall / WAF; project-level Access Groups with permission groups; SCIM Directory Sync maps IdP groups to roles (Enterprise). [Docs](https://vercel.com/docs/rbac/access-groups) | **IAM + AgentCore Managed Policies** — IAM-based; AWS-managed `BedrockAgentCoreFullAccess` policy + resource-based policies on Runtime / Gateway / Memory; ABAC via tags; JWT-claim condition keys for agent invocations. [Docs](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/security-iam-awsmanpol.html) |
| **Identity / OAuth** 🆕 | **Marketplace Auth + OIDC + SAML SSO** — Marketplace-native: Clerk, Auth0, WorkOS, Stytch (auto-provisioned env vars, unified billing); Vercel OIDC IdP for keyless cloud + AI Gateway auth; SAML SSO (22+ IdPs) on Enterprise/Pro. [Docs](https://vercel.com/docs/oidc) | **Bedrock AgentCore Identity** — OAuth, API keys, M2M + `USER_FEDERATION` flows, **$0.010/1K requests**. [Docs](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/identity.html) |
| **Content Safety / Guardrails** 🆕 | **Model-native + AI Gateway policies** — no platform content filters or PII scrubbing; AI Gateway enforces ZDR + `disallowPromptTraining`; WAF rate-limits AI endpoints; Claude / OpenAI native safety + custom middleware required. [Docs](https://vercel.com/docs/ai-gateway/capabilities/disallow-prompt-training) | **Amazon Bedrock Guardrails (GA)** — 6 content filter categories (Hate / Insults / Sexual / Violence / Misconduct / Prompt Attack) + denied topics, PII redaction, grounding checks, Automated Reasoning; Classic & Standard tiers; applies to AgentCore via guardrail ID. [Docs](https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html) |
| **Compliance & Audit** 🆕 | **SOC 2 T2, ISO 27001, HIPAA BAA + Activity Log** — SOC 2 Type 2, ISO 27001:2022, HIPAA BAA (Enterprise), PCI DSS v4.0, GDPR, EU-U.S. DPF, TISAX AL2; Activity Log (CLI accessible) + Log Drains for SIEM; reports at [security.vercel.com](https://security.vercel.com). [Docs](https://vercel.com/docs/security/compliance) | **SOC 1/2/3, ISO, HIPAA + CloudTrail + Artifact** — SOC 1/2/3, ISO 27001 / 27017 / 27018, PCI DSS, HIPAA eligible (BAA), FedRAMP in progress; CloudTrail logs AgentCore management + data events (`InvokeGateway`); audit reports via AWS Artifact. [Docs](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/compliance-validation.html) |

### 2.4 Operations

State management, memory, monitoring, and evaluation — **Knowledge Base / Grounding** row is new.

| Capability | Vercel Stack | AWS Stack |
|------------|--------------|-----------|
| **Persistent Memory** | **DurableAgent + Marketplace Storage** — `DurableAgent` (`@workflow/ai/agent`) auto-persists messages / tool calls across steps; `useChat onFinish` for chat history; Neon / Upstash / Supabase via Marketplace; no first-party agent memory product. [Docs](https://workflow-sdk.dev/docs/api-reference/workflow-ai/durable-agent) | **Bedrock AgentCore Memory** — built-in short-term + long-term strategies (semantic / summary / preference / episodic); Kinesis streaming notifications; 15 regions. [Docs](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/memory.html) |
| **Knowledge Base / Grounding** 🆕 | **Marketplace Vector Stores** — Supabase pgvector, Upstash Vector, MongoDB Atlas, Pinecone via Marketplace (first-party billing, auto-provisioned env vars); AI SDK native embeddings + reranking. [Marketplace](https://vercel.com/marketplace?category=storage) | **Amazon Bedrock Knowledge Bases (GA)** — GA managed RAG for Bedrock agents; S3 / SharePoint / Confluence ingestion; GraphRAG, multimodal parsing via Bedrock Data Automation, NL→SQL for structured stores; native AgentCore integration. [Docs](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html) |
| **Observability** | **AI SDK telemetry + Vercel Observability + AI Gateway** — `experimental_telemetry` on `generateText` / `streamText` (OTEL GenAI semconv); Vercel Observability Plus: 30-day retention, workflow run / step queries (Apr 7), **anomaly alerts GA (Apr 13, 2026)**; AI Gateway Custom Reporting API (beta) for cost by tag / user / model. [Docs](https://vercel.com/docs/observability/observability-plus) | **Bedrock AgentCore Observability** — CloudWatch-backed, step visualization, metadata tagging. [Docs](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/observability.html) |
| **Evaluations** | **BYO + Braintrust on Marketplace** — no first-party eval product; **Braintrust on Marketplace** (GA Oct 2025) for evals + trace streaming with unified billing; **Langfuse via AI Gateway** integration (Feb 2026). [Changelog](https://vercel.com/changelog/braintrust-joins-the-vercel-marketplace) | **Bedrock AgentCore Evaluations (GA Mar 31, 2026)** — 13 built-in evaluators, 9 regions, Ground Truth + custom Lambda evaluators. [Announcement](https://aws.amazon.com/about-aws/whats-new/2026/03/agentcore-evaluations-generally-available/) |

### 2.5 Deep-Dive: Runtime Persistence

| Aspect | Vercel Stack | AWS Stack |
|--------|--------------|-----------|
| **Max Execution Window** | Edge: 300s (5 min); Serverless + Fluid Compute: 800s (13.3 min); Sandbox: 5 hours (Pro/Enterprise) | AgentCore Runtime: 28,800s (8 hours) |
| **Idle Timeout** | N/A (stateless by default) | Configurable: 60–28,800s (default: 900s / 15 min) |
| **Durability Mechanism** | Workflow SDK (**GA**) — `"use workflow"` directive, event-sourced, E2E encrypted; Vercel Queues as durable backing layer | Runtime session persistence with automatic state management |
| **Crash Recovery** | Deterministic replay from immutable event log (event-sourced architecture, Feb 3, 2026) | Session resume after transient failures |
| **Billing Model** | Per-invocation + Active CPU time (I/O wait **free**); Workflow steps at $2.50/100K + $0.00069/GB-hour storage | Per-second (CPU-hour + GB-hour), no charge during I/O wait |
| **Encryption at Rest** | **Default E2E encryption** (AES-256-GCM, per-run HKDF-SHA256 keys) for all workflow data | Standard AWS KMS / S3 encryption |

### 2.6 Deep-Dive: Code Execution

| Aspect | Vercel Sandbox SDK (GA) | AWS AgentCore Code Interpreter |
|--------|-------------------------|-------------------------------|
| **Isolation** | microVM (Firecracker-based) | Containerized sandbox |
| **Languages** | Node.js 24, Python 3.13 | Python, JavaScript, TypeScript |
| **Max vCPUs** | **8 vCPUs (Pro) / 32 vCPUs (Enterprise, Apr 8)** | Configurable per instance |
| **Max Memory** | 2 GB per vCPU (Pro: 16 GB max / Enterprise: 64 GB max) | Configurable |
| **Max Runtime** | 5 min (Hobby), 5 hours (Pro/Enterprise) | 8 hours |
| **Max File Size** | Via filesystem; 32 GB NVMe (Enterprise) | 5 GB (S3 upload) |
| **Filesystem Snapshots** | **GA (Jan 22, 2026)** — save/restore entire sandbox state, 30-day default expiry | **Persistent agent filesystem (Preview Mar 25, 2026)** — 1 GB per session, 14-day idle retention, S3-backed, standard POSIX ops (no hard links / device files / FIFOs / xattr) |
| **Persistent Mode** | **Beta (Mar 26, 2026)** — auto-save on stop, auto-resume | **Session resume with persistent filesystem** (preview) — stop/resume preserves session state via `filesystemConfigurations` on `create-agent-runtime` |
| **CLI Integration** | `vercel sandbox` commands (Apr 8, 2026) | AWS CLI / CDK / **AgentCore CLI** (`@aws/agentcore`, preview Apr 22, 2026) |
| **Concurrency** | 10 (Hobby), 2,000 (Pro/Enterprise) | Regional limits apply |
| **Regional Availability** | **`iad1` only** (unchanged since beta) | 14 regions |

### 2.7 Deep-Dive: Security Primitives

| Aspect | Vercel | AWS |
|--------|--------|-----|
| **Network Isolation** | Secure Compute — dedicated IPs, VPC peering (max 50 connections); **self-serve since Jan 7, 2026** | VPC with private subnets, PrivateLink, Transit Gateway |
| **Policy Language** | Application-layer (middleware + env vars) | **Cedar (GA)** — open-source, AWS-developed |
| **Policy Enforcement** | Application-level | Gateway-level intercept before tool execution |
| **IAM Integration** | N/A on agent layer; SAML SSO / OIDC / SCIM at platform layer | Full IAM + Cedar hybrid |
| **Enforcement Modes** | N/A | `ENFORCE` (block) or `MONITOR` (log only) |
| **Zero Data Retention** | **AI Gateway team-wide ZDR (Apr 8, 2026)** — single toggle routes all team requests through 13 ZDR-compliant providers; BYOK exempt; $0.10/1K req | Via private endpoints + model provider terms |
| **Data Classification** | Per-provider ZDR flags + `disallowPromptTraining` controls | AWS Config + Bedrock Guardrails |
| **Platform Compliance** | SOC 2 T2 · ISO 27001:2022 · HIPAA BAA · PCI DSS v4.0 · GDPR · EU-U.S. DPF · TISAX AL2 | SOC 1/2/3 · ISO 27001/27017/27018 · PCI DSS · HIPAA eligible (BAA) · FedRAMP in progress |

### 2.8 Deep-Dive: Protocol Support

| Protocol | Vercel | AWS |
|----------|--------|-----|
| **MCP (Model Context Protocol)** | Client (`@ai-sdk/mcp`, stable HTTP/SSE; `Experimental_StdioMCPTransport` for local) + Server (`mcp-handler` 1.1, Streamable HTTP + OAuth) + Endpoint (`mcp.vercel.com`) | **Server** (Gateway-based, production; server-side tool execution via Bedrock Responses API Feb 24, 2026) |
| **A2A (Agent-to-Agent)** | Not natively supported | **GA via `serve_a2a()`** in `bedrock-agentcore` v1.4.7 (`pip install bedrock-agentcore[a2a]`) |
| **AG-UI (Agent-User Interaction)** | Not natively supported | **GA in AgentCore Runtime (Mar 13, 2026)** — `serve_ag_ui()` + `AGUIApp`; first managed runtime with first-class AG-UI support |
| **REST/HTTP** | Native | Native via Gateway |
| **Lambda Integration** | N/A | Native (Gateway transforms Lambda → tools) |

### 2.9 Bedrock Service Tiers (new since Jan baseline)

Starting with Claude Sonnet 4.5 and all newer models, Bedrock offers four inference tiers accessible via Strands' new `BedrockModel(service_tier=...)` parameter (added in v1.35.0, Apr 8, 2026):

| Tier | Multiplier vs. Standard | Use Case |
|------|-------------------------|----------|
| **Priority** | +75% premium | Latency-sensitive user-facing agents |
| **Standard** | Baseline | Default — balanced latency / cost |
| **Flex** | −50% discount | Agentic batch workflows, background tasks |
| **Reserved** | Commitment-based | Predictable long-running workloads |

```python
# Strands v1.35.0+ syntax
from strands.models import BedrockModel

model = BedrockModel(
    model_id="us.anthropic.claude-sonnet-4-6",
    service_tier="flex",  # 50% off for batch agent work
)
```

### 2.10 Bedrock Routing Modes

Three routing modes for Claude 4.5+ models on Bedrock:

- **In-Region:** Strict single-region routing (e.g., `anthropic.claude-opus-4-7`)
- **Geo:** Cross-region within US / EU / JP / AU / APAC (e.g., `us.anthropic.claude-opus-4-7`)
- **Global:** Any commercial region worldwide (e.g., `global.anthropic.claude-opus-4-7`)

Geo and Global carry **no surcharge** over in-region rates.

---

