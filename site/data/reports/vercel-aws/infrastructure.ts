import type { CategoryGroup, InfrastructureData } from "@/data/report-schema";

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
          text: "Vercel AI SDK",
          detail: "ToolLoopAgent, streamText, tools, stopWhen conditions",
          link: "https://sdk.vercel.ai",
        },
        aws: {
          text: "Strands Agents SDK",
          detail: "Agent class, tools, model providers, multi-agent support",
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
            "Provider auto-failover, model fallbacks, 0% markup, 20+ providers, 100+ global PoPs, BYOK",
          link: "https://vercel.com/ai-gateway",
        },
        aws: {
          text: "Amazon Bedrock",
          detail: "Foundation models, 10+ providers, cross-region inference",
          link: "https://aws.amazon.com/bedrock/",
        },
      },
      {
        capability: "Tool Management",
        description:
          "Connect external APIs, databases, and services as callable tools for agents",
        iconName: "Wrench",
        vercel: {
          text: "Native tool calling",
          detail: "MCP client (experimental), provider integrations",
          link: "https://ai-sdk.dev/docs/foundations/tools",
        },
        aws: {
          text: "Bedrock AgentCore Gateway",
          detail: "Connects to MCP servers, tool indexing, priced operations",
          link: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/gateway.html",
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
          detail: "Edge/Serverless/Fluid Compute, 800s max duration",
          link: "https://vercel.com/docs",
        },
        aws: {
          text: "Bedrock AgentCore Runtime",
          detail: "microVM-per-session, up to 8h maxLifetime",
          link: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-lifecycle-settings.html",
        },
      },
      {
        capability: "Secure Code Execution",
        description:
          "Sandboxed environment for running untrusted or AI-generated code safely",
        iconName: "Code2",
        vercel: {
          text: "Sandbox SDK",
          detail: "Firecracker microVMs, Node.js + Python, 8 vCPUs max",
          link: "https://vercel.com/docs/vercel-sandbox",
        },
        aws: {
          text: "Bedrock AgentCore Code Interpreter",
          detail: "Containerized, Python/JS/TS, 5GB files, 8h max",
          link: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/code-interpreter-tool.html",
        },
      },
      {
        capability: "Durable Workflows",
        description:
          "Long-running, resumable workflows that survive failures and deployments",
        iconName: "Workflow",
        vercel: {
          text: "Workflow SDK",
          detail: '"use workflow" directive, survives deployments',
          link: "https://useworkflow.dev/",
        },
        aws: {
          text: "Bedrock AgentCore Runtime Sessions",
          detail: "Up to 8 hours, configurable idle timeout",
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
            "Cloud-native browser instances via API/SDK, Puppeteer/Playwright support; native integration coming soon",
          link: "https://vercel.com/marketplace/kernel",
        },
        aws: {
          text: "Bedrock AgentCore Browser Tool",
          detail: "Cloud-based, CAPTCHA reduction via Web Bot Auth",
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
          text: "App-layer",
          detail: "Middleware + env vars, custom implementation",
        },
        aws: {
          text: "Bedrock AgentCore Policy",
          detail: "Cedar-based authorization + IAM integration",
          link: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/policy.html",
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
          detail: "OAuth, API keys, $0.010/1K requests",
          link: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/identity.html",
        },
      },
    ],
  },
  {
    name: "Operations",
    iconName: "Activity",
    description: "State management, memory, and monitoring",
    colorClass: "from-amber-500/20 to-orange-500/20",
    rows: [
      {
        capability: "Persistent Memory",
        description:
          "Store conversation history and agent state across sessions for continuity",
        iconName: "Database",
        vercel: {
          text: "BYO (Redis/DB)",
          detail: "External databases, vector stores, custom implementation",
        },
        aws: {
          text: "Bedrock AgentCore Memory",
          detail: "Built-in short-term + long-term with strategies",
          link: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/memory.html",
        },
      },
      {
        capability: "Observability",
        description:
          "Tracing, logging, and metrics to debug and monitor agent behavior",
        iconName: "Activity",
        vercel: {
          text: "AI SDK telemetry",
          detail: "OTEL-compatible spans, onStepFinish callbacks",
        },
        aws: {
          text: "Bedrock AgentCore Observability",
          detail: "CloudWatch-backed, step visualization, metadata tagging",
          link: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/observability.html",
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
