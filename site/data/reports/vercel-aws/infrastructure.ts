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
          link: "https://strandsagents.com/latest/",
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
          text: "Vercel Platform",
          detail:
            "Edge/Serverless/Fluid Compute, Active CPU billing (I/O free), 21 regions, 800s max",
          link: "https://vercel.com/docs",
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
          text: "Sandbox SDK (GA)",
          detail:
            "Firecracker microVMs, 8 vCPU Pro / 32 vCPU Enterprise, persistent beta, iad1 only",
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
            '"use workflow" directive, E2E encrypted, 2× faster, event-sourced, TS + Python beta',
          link: "https://useworkflow.dev/",
        },
        aws: {
          text: "Bedrock AgentCore Runtime Sessions",
          detail:
            "Up to 8 hours, configurable idle timeout, Step Functions integration",
          link: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-lifecycle-settings.html",
        },
      },
      {
        capability: "Browser Automation",
        description:
          "Programmatic browser control for web scraping, testing, and UI automation",
        iconName: "Globe",
        vercel: {
          text: "Kernel (Marketplace) + Computer Use",
          detail:
            "Cloud browser via API/SDK; webSearch_20250305 native Anthropic tool added",
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
          text: "App-layer + AI Gateway ZDR",
          detail:
            "Middleware + env vars; AI Gateway team-wide ZDR enforcement (Apr 8, 2026)",
          link: "https://vercel.com/blog/zdr-on-ai-gateway",
        },
        aws: {
          text: "Bedrock AgentCore Policy (GA)",
          detail:
            "Cedar-based, 13 regions, ResourcePolicyClient, ENFORCE/MONITOR modes",
          link: "https://aws.amazon.com/about-aws/whats-new/2026/03/policy-amazon-bedrock-agentcore-generally-available/",
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
          text: "Bedrock AgentCore Identity",
          detail: "OAuth, API keys, M2M + USER_FEDERATION, $0.010/1K requests",
          link: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/identity.html",
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
          text: "Bedrock AgentCore Memory",
          detail:
            "Built-in STM + LTM strategies (semantic/summary/preference/episodic); Kinesis streaming; 15 regions",
          link: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/memory.html",
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
          text: "External (BYO)",
          detail: "Bring your own evaluation framework / LLM judges",
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
      "is the infrastructure wrapper, NOT the agent framework. Agent logic uses Strands SDK. This mirrors how Vercel's AI SDK handles agent logic while the Vercel platform provides infrastructure.",
    codeHighlight: "bedrock-agentcore-sdk-python",
  },
};
