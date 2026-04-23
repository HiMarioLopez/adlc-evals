import type {
  CategoryGroup,
  InfrastructureData,
} from "@/data/report-schema.ts";

export const categoryGroups: CategoryGroup[] = [
  {
    name: "Agent Foundations",
    iconName: "Bot",
    description:
      "Core SDKs and gateways for building AI agents with reasoning and tool use",
    colorClass: "from-violet-500/20 to-purple-500/20",
    rows: [
      {
        capability: "Agent Framework",
        description:
          "Core SDK for building agentic AI applications with tool loops and multi-step reasoning",
        iconName: "Bot",
        vercel: {
          text: "Vercel AI SDK 6.x",
          detail:
            "ToolLoopAgent, Agent interface, stopWhen, prepareStep, dynamicTool (stable Dec 2025); v7 beta ESM-only",
          link: "https://ai-sdk.dev/docs/agents/overview",
        },
        aws: {
          text: "Strands Agents SDK",
          detail:
            "Agent, Swarm, Graph, AgentAsTool, Plugins; Python v1.36, TS RC v1.0.0-rc.4",
          link: "https://strandsagents.com/",
        },
      },
      {
        capability: "Model Gateway",
        description:
          "Unified API to route requests across multiple LLM providers with automatic failover",
        iconName: "Network",
        vercel: {
          text: "AI Gateway",
          detail:
            "0% markup · BYOK across Anthropic/OpenAI/Azure/Vertex/Bedrock · 100+ models · built-in observability",
          link: "https://vercel.com/docs/ai-gateway",
        },
        aws: {
          text: "Amazon Bedrock",
          detail:
            "Foundation models, Priority/Standard/Flex service tiers, cross-region inference",
          link: "https://aws.amazon.com/bedrock/",
        },
      },
      {
        capability: "Tool Management",
        description:
          "Connect external APIs, databases, and services as callable tools for agents",
        iconName: "Wrench",
        vercel: {
          text: "mcp-handler + AI SDK tools + Sandbox",
          detail:
            "mcp-handler 1.1 (first-party MCP server, Streamable HTTP + OAuth); @ai-sdk/mcp client; tool() + dynamicTool; @vercel/sandbox 1.10 for code exec",
          link: "https://github.com/vercel/mcp-handler",
        },
        aws: {
          text: "Bedrock AgentCore Gateway",
          detail:
            "MCP Server, Lambda-as-tool, server-side tool execution via Bedrock Responses API",
          link: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/gateway.html",
        },
      },
      {
        capability: "Protocol Support",
        description:
          "Open agent interoperability protocols supported natively by the platform",
        iconName: "Network",
        vercel: {
          text: "MCP (client + server)",
          detail:
            "@ai-sdk/mcp client: Streamable HTTP + SSE stable, stdio local-only · mcp-handler server · A2A + AG-UI not first-party",
          link: "https://ai-sdk.dev/docs/ai-sdk-core/mcp-tools",
        },
        aws: {
          text: "MCP + A2A + AG-UI",
          detail:
            "All three open protocols supported in Runtime (AG-UI added Mar 13, 2026)",
          link: "https://aws.amazon.com/about-aws/whats-new/2026/03/amazon-bedrock-agentcore-runtime-ag-ui-protocol/",
        },
      },
      {
        capability: "Agent Discovery",
        description:
          "Centralized catalog for discovering, sharing, and governing agents and tools",
        iconName: "Search",
        vercel: {
          text: "Marketplace + mcp.vercel.com",
          detail:
            "Marketplace: AI Agents & Services category + agent-optimized CLI (vercel integration discover/guide); mcp.vercel.com first-party MCP endpoint; no dedicated agent registry",
          link: "https://vercel.com/marketplace/category/agents",
        },
        aws: {
          text: "AWS Agent Registry (Preview)",
          detail:
            "New 8th AgentCore service; semantic + keyword search; MCP endpoint; 5 regions",
          link: "https://aws.amazon.com/blogs/machine-learning/the-future-of-managing-agents-at-scale-aws-agent-registry-now-in-preview/",
        },
      },
    ],
  },
  {
    name: "Infrastructure",
    iconName: "Server",
    description: "Compute, execution environments, and workflow orchestration",
    colorClass: "from-blue-500/20 to-cyan-500/20",
    rows: [
      {
        capability: "Infrastructure Wrapper",
        description:
          "Managed compute layer that handles scaling, deployments, and runtime lifecycle",
        iconName: "Server",
        vercel: {
          text: "Fluid Compute",
          detail:
            "Edge + Serverless hybrid across 20 regions; in-function concurrency; 800s max (Pro/Enterprise); Active CPU billing — I/O time is free",
          link: "https://vercel.com/docs/fluid-compute",
        },
        aws: {
          text: "Bedrock AgentCore Runtime",
          detail:
            "microVM-per-session, 14 regions, 8h maxLifetime, InvokeAgentRuntimeCommand API",
          link: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-lifecycle-settings.html",
        },
      },
      {
        capability: "Secure Code Execution",
        description:
          "Sandboxed environment for running untrusted or AI-generated code safely",
        iconName: "Code2",
        vercel: {
          text: "Vercel Sandbox",
          detail:
            "Firecracker microVMs, node24/python3.13; up to 32 vCPU / 64 GB / 32 GB NVMe (Enterprise); 5-hr max; 2,000 concurrent; iad1 only; snapshots GA, persistent beta",
          link: "https://vercel.com/docs/vercel-sandbox",
        },
        aws: {
          text: "Bedrock AgentCore Code Interpreter",
          detail: "Containerized, Python/JS/TS, 5GB files, 8h max, 14 regions",
          link: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/code-interpreter-tool.html",
        },
      },
      {
        capability: "Durable Workflows",
        description:
          "Long-running, resumable workflows that survive failures and deployments",
        iconName: "Workflow",
        vercel: {
          text: "Workflow SDK (GA)",
          detail:
            '`"use workflow"` directive; event-sourced, unlimited run + sleep duration; 10K steps/run; 100K concurrent; DurableAgent for AI SDK; TS GA, Python beta',
          link: "https://vercel.com/docs/workflows",
        },
        aws: {
          text: "Bedrock AgentCore Runtime Sessions",
          detail:
            "Up to 8 hours, configurable idle timeout, Step Functions integration",
          link: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-lifecycle-settings.html",
        },
      },
      {
        capability: "Message Queue",
        description:
          "Durable event streaming and task scheduling primitive underlying long-running agent workloads",
        iconName: "Inbox",
        vercel: {
          text: "Vercel Queues (GA)",
          detail:
            "@vercel/queue: durable append-only topic log; fan-out consumer groups; automatic retries + deduplication; powers the Workflow SDK under the hood",
          link: "https://vercel.com/docs/queues",
        },
        aws: {
          text: "AWS Step Functions + AgentCore",
          detail:
            "Step Functions SDK integration with Bedrock AgentCore (GA Mar 26, 2026); durable state machines, built-in retries, parallel Map states, idempotent Lambda execution",
          link: "https://aws.amazon.com/about-aws/whats-new/2026/03/aws-step-functions-sdk-integrations/",
        },
      },
      {
        capability: "Browser Automation",
        description:
          "Programmatic browser control for web scraping, testing, and UI automation",
        iconName: "Globe",
        vercel: {
          text: "Kernel (Marketplace) + Sandbox DIY",
          detail:
            "Kernel (Vercel-native Marketplace, 500+ installs): CDP cloud browsers compatible with Playwright/Puppeteer/Stagehand/Computer Use · or install Chromium directly in @vercel/sandbox",
          link: "https://vercel.com/marketplace/kernel",
        },
        aws: {
          text: "Bedrock AgentCore Browser Tool",
          detail:
            "Cloud-based, custom Chrome extensions, CAPTCHA reduction, S3 profile billing (Apr 15)",
          link: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/browser-tool.html",
        },
      },
    ],
  },
  {
    name: "Security & Identity",
    iconName: "Shield",
    description: "Authentication, authorization, and access control",
    colorClass: "from-emerald-500/20 to-green-500/20",
    rows: [
      {
        capability: "Authorization",
        description:
          "Policy-based access control determining what actions users and agents can perform",
        iconName: "KeyRound",
        vercel: {
          text: "AI Gateway ZDR + Deployment Protection",
          detail:
            "AI Gateway ZDR (Pro/Enterprise): team-wide toggle ($0.10/1K req) or per-request flag; routes to 13 ZDR providers; BYOK exempt. Platform Deployment Protection: Vercel Auth, Password, Trusted IPs.",
          link: "https://vercel.com/docs/ai-gateway/capabilities/zdr",
        },
        aws: {
          text: "Bedrock AgentCore Policy (GA)",
          detail:
            "Cedar-based, 13 regions, ResourcePolicyClient, ENFORCE/MONITOR modes",
          link: "https://aws.amazon.com/about-aws/whats-new/2026/03/policy-amazon-bedrock-agentcore-generally-available/",
        },
      },
      {
        capability: "RBAC & Access Control",
        description:
          "Granular team, project, and resource-level permissions with directory sync",
        iconName: "Users",
        vercel: {
          text: "Team Roles + Access Groups + SCIM",
          detail:
            "8 team roles (Owner → Contributor) + dedicated Security role for firewall/WAF; project-level Access Groups with permission groups; SCIM Directory Sync maps IdP groups to roles (Enterprise)",
          link: "https://vercel.com/docs/rbac/access-groups",
        },
        aws: {
          text: "IAM + AgentCore Managed Policies",
          detail:
            "IAM-based; AWS-managed BedrockAgentCoreFullAccess policy + resource-based policies on Runtime/Gateway/Memory; ABAC via tags; JWT-claim condition keys for agent invocations",
          link: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/security-iam-awsmanpol.html",
        },
      },
      {
        capability: "Identity / OAuth",
        description:
          "User authentication and identity management with social/enterprise providers",
        iconName: "Fingerprint",
        vercel: {
          text: "Marketplace Auth + OIDC + SAML SSO",
          detail:
            "Marketplace-native: Clerk, Auth0, WorkOS, Stytch (auto-provisioned env vars, unified billing); Vercel OIDC IdP for keyless cloud + AI Gateway auth; SAML SSO (22+ IdPs) on Enterprise/Pro",
          link: "https://vercel.com/docs/oidc",
        },
        aws: {
          text: "Bedrock AgentCore Identity",
          detail: "OAuth, API keys, M2M + USER_FEDERATION, $0.010/1K requests",
          link: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/identity.html",
        },
      },
      {
        capability: "Content Safety / Guardrails",
        description:
          "Platform-level content moderation and policy enforcement for agent I/O",
        iconName: "Shield",
        vercel: {
          text: "Model-native + AI Gateway policies",
          detail:
            "No platform content filters or PII scrubbing; AI Gateway enforces ZDR + disallow-training; WAF rate-limits AI endpoints; Claude/OpenAI native safety + custom middleware required",
          link: "https://vercel.com/docs/ai-gateway/capabilities/disallow-prompt-training",
        },
        aws: {
          text: "Amazon Bedrock Guardrails (GA)",
          detail:
            "6 content filter categories (Hate/Insults/Sexual/Violence/Misconduct/Prompt Attack) + denied topics, PII redaction, grounding checks, Automated Reasoning; Classic & Standard tiers; applies to AgentCore via guardrail ID",
          link: "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
        },
      },
      {
        capability: "Agent Auditability & Observability",
        description:
          "What you can trace, log, and audit about agent execution — tool calls, prompts, outputs, token usage, and policy decisions",
        iconName: "FileCheck",
        vercel: {
          text: "OTel spans + AI Gateway logs + Log Drains",
          detail:
            "AI SDK emits OpenTelemetry spans per generation (model, prompt, tool calls, tokens, latency); AI Gateway logs every request with ZDR + disallow-training enforcement; Activity Log captures team/project changes; Log Drains stream to any SIEM (Datadog, Splunk, Axiom). BYO-DSPM model — plug into existing security tooling rather than a first-party posture product.",
          link: "https://vercel.com/docs/ai-gateway/observability",
        },
        aws: {
          text: "AgentCore Observability + CloudTrail + GuardDuty",
          detail:
            "AgentCore Observability emits OTel-compatible traces/spans/metrics (session count, latency, token usage, error rates) into CloudWatch with a built-in agent dashboard; CloudTrail logs AgentCore management + data events (InvokeGateway, tool calls); GuardDuty adds anomaly detection. AWS-native stack — tightly integrated with the AWS security and observability ecosystem.",
          link: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/observability.html",
        },
      },
    ],
  },
  {
    name: "Operations",
    iconName: "Activity",
    description: "State management, memory, monitoring, and evaluation",
    colorClass: "from-amber-500/20 to-orange-500/20",
    rows: [
      {
        capability: "Persistent Memory",
        description:
          "Store conversation history and agent state across sessions for continuity",
        iconName: "Database",
        vercel: {
          text: "DurableAgent + Marketplace Storage",
          detail:
            "DurableAgent (@workflow/ai/agent) auto-persists messages/tool calls across steps; useChat onFinish for chat history; Neon/Upstash/Supabase via Marketplace; no first-party agent memory product",
          link: "https://workflow-sdk.dev/docs/api-reference/workflow-ai/durable-agent",
        },
        aws: {
          text: "Bedrock AgentCore Memory",
          detail:
            "Built-in STM + LTM strategies (semantic/summary/preference/episodic); Kinesis streaming; 15 regions",
          link: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/memory.html",
        },
      },
      {
        capability: "Knowledge Base / Grounding",
        description:
          "Managed retrieval layer for grounding agents on curated documents and vector data",
        iconName: "BookOpen",
        vercel: {
          text: "Marketplace Vector Stores",
          detail:
            "Supabase pgvector, Upstash Vector, MongoDB Atlas, Pinecone via Marketplace (first-party billing, auto-provisioned env vars); AI SDK native embeddings + reranking",
          link: "https://vercel.com/marketplace?category=storage",
        },
        aws: {
          text: "Amazon Bedrock Knowledge Bases (GA)",
          detail:
            "GA managed RAG for Bedrock agents; S3/SharePoint/Confluence ingestion; GraphRAG, multimodal parsing via Bedrock Data Automation, NL→SQL for structured stores; native AgentCore integration",
          link: "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html",
        },
      },
      {
        capability: "Observability",
        description:
          "Tracing, logging, and metrics to debug and monitor agent behavior",
        iconName: "Activity",
        vercel: {
          text: "AI SDK telemetry + Vercel Observability + AI Gateway",
          detail:
            "experimental_telemetry on generateText/streamText (OTEL GenAI semconv); Vercel Observability Plus: 30-day retention, workflow run/step queries (Apr 7), anomaly alerts GA (Apr 13, 2026); AI Gateway Custom Reporting API (beta) for cost by tag/user/model",
          link: "https://vercel.com/docs/observability/observability-plus",
        },
        aws: {
          text: "Bedrock AgentCore Observability",
          detail: "CloudWatch-backed, step visualization, metadata tagging",
          link: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/observability.html",
        },
      },
      {
        capability: "Evaluations",
        description:
          "Built-in quality measurement for agent responses, safety, task completion, and tool usage",
        iconName: "CheckCircle2",
        vercel: {
          text: "BYO + Braintrust on Marketplace",
          detail:
            "No first-party eval product; Braintrust on Marketplace (GA Oct 2025) for evals + trace streaming with unified billing; Langfuse via AI Gateway integration (Feb 2026)",
          link: "https://vercel.com/changelog/braintrust-joins-the-vercel-marketplace",
        },
        aws: {
          text: "Bedrock AgentCore Evaluations (GA)",
          detail:
            "13 built-in evaluators, 9 regions, Ground Truth + custom Lambda evaluators",
          link: "https://aws.amazon.com/about-aws/whats-new/2026/03/agentcore-evaluations-generally-available/",
        },
      },
    ],
  },
];

export const infrastructureData: InfrastructureData = {
  sectionNumber: 1,
  title: "Infrastructure Footprint",
  description:
    'Full lifecycle comparison of the "blessed path" — officially recommended, out-of-the-box developer experience.',
  categoryGroups,
  keyInsight: {
    title: "Key Architecture Insight",
    description:
      " separates orchestration from hosting: Strands Agents SDK (open-source) owns agent logic; AgentCore provides the managed runtime — microVM-per-session compute, Cedar-based policy, Memory, Identity, Observability, and Evaluations as eight first-class services. Vercel's AI SDK sits at the Strands layer; AgentCore's hosted-agent story has no direct Vercel equivalent — you compose it from Marketplace integrations.",
    codeHighlight: "Bedrock AgentCore",
  },
};
