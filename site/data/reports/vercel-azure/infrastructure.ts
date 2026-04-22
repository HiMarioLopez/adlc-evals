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
          text: "Microsoft Agent Framework 1.0",
          detail:
            "GA Apr 3, 2026 · .NET + Python (TS in dev) · AIAgent, ChatClientAgent, SequentialBuilder, GraphFlow, Magentic-One · SK + AutoGen in maintenance",
          link: "https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-version-1-0/",
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
          text: "Azure OpenAI + Foundry Models",
          detail:
            "1,900+ models · 9 deployment tiers (Global/Data Zone/Regional + PTU/Batch/Priority +75%) · GPT-5.4 GA Mar 2026",
          link: "https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/deployment-types",
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
          text: "FunctionTool + McpTool + Foundry MCP Server",
          detail:
            "FunctionTool, McpTool (OAuth passthrough), A2ATool · Foundry MCP Server preview at mcp.ai.azure.com (live since Dec 3, 2025) · azure-ai-projects 2.0 GA Mar 2026",
          link: "https://learn.microsoft.com/en-us/azure/foundry/mcp/get-started",
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
          text: "MCP + Responses API + A2A + AG-UI",
          detail:
            "Responses API GA Mar 16, 2026 (wire-compatible with OpenAI Agents SDK) · MCP GA · A2A consumer preview · AG-UI adapter in MAF (preview)",
          link: "https://devblogs.microsoft.com/foundry/foundry-agent-service-ga/",
        },
      },
      {
        capability: "Agent Discovery",
        description:
          "Centralized catalog for discovering, sharing, and governing agents",
        iconName: "Search",
        vercel: {
          text: "Marketplace + mcp.vercel.com",
          detail:
            "Marketplace: AI Agents & Services category + agent-optimized CLI (vercel integration discover/guide); mcp.vercel.com first-party MCP endpoint; no dedicated agent registry",
          link: "https://vercel.com/marketplace/category/agents",
        },
        aws: {
          text: "Foundry Tool Catalog + Projects REST",
          detail:
            "Tool Catalog GA (portal + SDK, public + private) · agent CRUD via Projects REST v1 · no standalone cross-project agent registry",
          link: "https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/tool-catalog",
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
          text: "Foundry Agent Service",
          detail:
            "Next-gen GA Mar 16, 2026 · Responses API runtime (wire-compatible w/ OpenAI Agents SDK) · prompt agents GA · hosted agents preview (ACA-backed, 25 regions) · from_agent_framework() + agent.yaml + Dockerfile",
          link: "https://learn.microsoft.com/en-us/azure/foundry/agents/overview",
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
          text: "ACA Dynamic Sessions + Foundry Code Interpreter",
          detail:
            "Hyper-V isolated sessions across 38 regions; built-in Python/Node.js/Shell + custom container pools; 1-hr active / 30-min idle timeout; managed Code Interpreter tool wraps the same runtime",
          link: "https://learn.microsoft.com/en-us/azure/container-apps/sessions",
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
          text: "Multi-agent Workflows (Preview)",
          detail:
            "Preview since Nov 25, 2025 (Ignite) · still preview Apr 2026 · drag-drop visual designer + YAML in Foundry portal & VS Code · graph-based MAF orchestration deployed via hosted agents",
          link: "https://devblogs.microsoft.com/foundry/introducing-multi-agent-workflows-in-foundry-agent-service/",
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
          text: "Azure Durable Task Scheduler",
          detail:
            "Consumption SKU GA Mar 31, 2026 (pay-per-action, no upfront); Dedicated SKU GA Nov 2025 (1 CU = 2K actions/sec, 50 GB); managed backend for Durable Functions + Durable Task SDKs; 30-day history",
          link: "https://learn.microsoft.com/en-us/azure/durable-task/scheduler/develop-with-durable-task-scheduler",
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
          text: "Browser Automation + Computer Use (Preview)",
          detail:
            "Two distinct tools: Browser Automation uses Microsoft Playwright Workspaces (BYO resource, any GPT model, DOM actions); Computer Use is screenshot-based on `computer-use-preview` (3 regions: East US 2, Sweden Central, South India)",
          link: "https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/browser-automation",
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
          text: "App-layer + AI Gateway ZDR",
          detail:
            "Middleware + env vars; AI Gateway team-wide ZDR enforcement (Apr 8, 2026)",
          link: "https://vercel.com/blog/zdr-on-ai-gateway",
        },
        aws: {
          text: "Microsoft Entra Agent ID (Preview)",
          detail:
            "Preview Apr 8, 2026 · Agent identity blueprints · OAuth 2.0 OBO · Managed Identity federation (TUAMI) · Entra directory integration",
          link: "https://techcommunity.microsoft.com/blog/microsoft-entra-blog/announcing-microsoft-entra-agent-id-secure-and-manage-your-ai-agents/3827392",
        },
      },
      {
        capability: "Identity / OAuth",
        description:
          "User authentication and identity management with social/enterprise providers",
        iconName: "Fingerprint",
        vercel: {
          text: "NextAuth/Auth.js",
          detail: "App-layer, custom implementation",
        },
        aws: {
          text: "Microsoft Entra ID",
          detail:
            "Deepest enterprise identity story of any cloud · Azure RBAC · Managed Identity per agent · Foundry Agent Identity (GA)",
          link: "https://learn.microsoft.com/en-us/entra/",
        },
      },
      {
        capability: "Content Safety / Guardrails",
        description:
          "Platform-level content moderation and policy enforcement for agent I/O",
        iconName: "Shield",
        vercel: {
          text: "Model-native + custom middleware",
          detail:
            "No platform-level guardrails; rely on Claude/OpenAI native safety + custom middleware",
        },
        aws: {
          text: "Foundry Guardrails for Agents (Preview)",
          detail:
            "Preview Feb 13, 2026 · Hate/Sexual/Violence/Self-harm/Prompt Shield/Indirect Attack · 4 intervention points (system prompt, user turn, tool call, agent output)",
          link: "https://learn.microsoft.com/en-us/azure/foundry/guardrails/guardrails-overview",
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
          text: "BYO (Redis/DB) + WorkflowAgent",
          detail:
            "External databases, vector stores; v7 WorkflowAgent for durable in-agent state",
        },
        aws: {
          text: "Conversations API + Foundry Memory (Preview)",
          detail:
            "AzureAIAgentThread — server-side persistent threads (GA) · Foundry Memory preview · Azure AI Search + Cosmos DB (customer-owned)",
          link: "https://learn.microsoft.com/en-us/azure/foundry/agents/overview",
        },
      },
      {
        capability: "Observability",
        description:
          "Tracing, logging, and metrics to debug and monitor agent behavior",
        iconName: "Activity",
        vercel: {
          text: "AI SDK telemetry + Workflow in Observability",
          detail:
            "OTEL via @ai-sdk/otel (v7 stable); Workflow queryable in Vercel Observability (Apr 7)",
        },
        aws: {
          text: "Foundry Monitoring & Tracing (GA)",
          detail:
            "GA Mar 16, 2026 · OpenTelemetry-native · configure_azure_monitor() one-call setup · Azure Monitor/App Insights: $2.30/GB Analytics, $0.50/GB Basic, $0.05/GB Auxiliary",
          link: "https://techcommunity.microsoft.com/blog/azure-ai-foundry-blog/generally-available-evaluations-monitoring-and-tracing-in-microsoft-foundry/4502760",
        },
      },
      {
        capability: "Evaluations",
        description:
          "Built-in quality measurement for agent responses, safety, task completion, and tool usage",
        iconName: "CheckCircle2",
        vercel: {
          text: "External (BYO)",
          detail: "Bring your own evaluation framework / LLM judges",
        },
        aws: {
          text: "Foundry Evaluations (GA)",
          detail:
            "GA Mar 16, 2026 · Built-in evaluators (coherence, relevance, groundedness) · Custom evaluators · Continuous production monitoring · Prompt Optimizer preview",
          link: "https://techcommunity.microsoft.com/blog/azure-ai-foundry-blog/generally-available-evaluations-monitoring-and-tracing-in-microsoft-foundry/4502760",
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
      "unifies Semantic Kernel + AutoGen into a single SDK as of April 3, 2026. Both predecessors remain maintained but are explicitly superseded. This mirrors how Vercel's AI SDK handles agent logic while Foundry Agent Service provides infrastructure.",
    codeHighlight: "Microsoft Agent Framework 1.0",
  },
};
