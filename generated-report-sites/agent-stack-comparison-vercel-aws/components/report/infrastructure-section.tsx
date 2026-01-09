import {
  Activity,
  Bot,
  Code2,
  Database,
  ExternalLink,
  Fingerprint,
  Globe,
  KeyRound,
  Layers,
  Network,
  Server,
  Shield,
  Workflow,
  Wrench,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonRow {
  capability: string;
  description: string;
  icon: React.ReactNode;
  vercel: { text: string; detail?: string; link?: string };
  aws: { text: string; detail?: string; link?: string };
}

interface CategoryGroup {
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  rows: ComparisonRow[];
}

const categoryGroups: CategoryGroup[] = [
  {
    name: "Agent Foundations",
    icon: <Bot className="h-5 w-5" />,
    description:
      "Core SDKs and gateways for building AI agents with reasoning and tool use",
    color: "from-violet-500/20 to-purple-500/20",
    rows: [
      {
        capability: "Agent Framework",
        description:
          "Core SDK for building agentic AI applications with tool loops and multi-step reasoning",
        icon: <Bot className="h-4 w-4" />,
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
        icon: <Network className="h-4 w-4" />,
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
        icon: <Wrench className="h-4 w-4" />,
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
    icon: <Server className="h-5 w-5" />,
    description: "Compute, execution environments, and workflow orchestration",
    color: "from-blue-500/20 to-cyan-500/20",
    rows: [
      {
        capability: "Infrastructure Wrapper",
        description:
          "Managed compute layer that handles scaling, deployments, and runtime lifecycle",
        icon: <Server className="h-4 w-4" />,
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
        icon: <Code2 className="h-4 w-4" />,
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
        icon: <Workflow className="h-4 w-4" />,
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
        icon: <Globe className="h-4 w-4" />,
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
    icon: <Shield className="h-5 w-5" />,
    description: "Authentication, authorization, and access control",
    color: "from-emerald-500/20 to-green-500/20",
    rows: [
      {
        capability: "Authorization",
        description:
          "Policy-based access control determining what actions users and agents can perform",
        icon: <KeyRound className="h-4 w-4" />,
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
        icon: <Fingerprint className="h-4 w-4" />,
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
    icon: <Activity className="h-5 w-5" />,
    description: "State management, memory, and monitoring",
    color: "from-amber-500/20 to-orange-500/20",
    rows: [
      {
        capability: "Persistent Memory",
        description:
          "Store conversation history and agent state across sessions for continuity",
        icon: <Database className="h-4 w-4" />,
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
        icon: <Activity className="h-4 w-4" />,
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

export function InfrastructureSection() {
  return (
    <section className="bg-muted/30 px-6 py-24" id="infrastructure">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16">
          <span className="mb-4 inline-flex items-center gap-2 font-mono text-primary text-xs uppercase tracking-widest">
            <Layers className="h-4 w-4" />
            Section 1
          </span>
          <h2 className="mb-4 font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl">
            Infrastructure Footprint
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Full lifecycle comparison of the "blessed path" — officially
            recommended, out-of-the-box developer experience.
          </p>
        </div>

        {/* Category groups */}
        <div className="space-y-8">
          {categoryGroups.map((category) => (
            <div
              className="overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur-sm"
              key={category.name}
            >
              {/* Category header */}
              <div
                className={cn(
                  "border-border border-b bg-gradient-to-r px-6 py-5",
                  category.color
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background/80 text-foreground backdrop-blur">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Scrollable table container */}
              <div className="overflow-x-auto">
                <div className="min-w-[700px]">
                  {/* Table header */}
                  <div className="grid grid-cols-[1.2fr_1fr_1fr] border-border border-b bg-muted/30">
                    <div className="p-4 font-mono text-muted-foreground text-xs uppercase tracking-widest">
                      Capability
                    </div>
                    <div className="border-border border-l p-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-5 w-5 items-center justify-center rounded-md bg-foreground">
                          <svg
                            className="h-3 w-3 text-background"
                            fill="currentColor"
                            viewBox="0 0 76 65"
                          >
                            <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                          </svg>
                        </div>
                        <span className="font-mono text-muted-foreground text-xs uppercase tracking-widest">
                          Vercel
                        </span>
                      </div>
                    </div>
                    <div className="border-border border-l p-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-5 w-5 items-center justify-center rounded-md bg-aws">
                          <span className="font-bold text-[10px] text-white">
                            A
                          </span>
                        </div>
                        <span className="font-mono text-muted-foreground text-xs uppercase tracking-widest">
                          AWS
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Table rows */}
                  {category.rows.map((row) => (
                    <div
                      className="grid grid-cols-[1.2fr_1fr_1fr] border-border border-b last:border-b-0"
                      key={row.capability}
                    >
                      {/* Capability column */}
                      <div className="p-4 sm:p-5">
                        <div className="flex items-start gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                            {row.icon}
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="font-medium text-sm">
                              {row.capability}
                            </span>
                            <p className="mt-1 text-muted-foreground text-xs leading-relaxed">
                              {row.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Vercel column */}
                      <div className="border-border border-l p-4 sm:p-5">
                        <p className="font-medium text-foreground text-sm">
                          {row.vercel.text}
                        </p>
                        <div className="mt-2 space-y-2">
                          {row.vercel.detail && (
                            <p className="text-muted-foreground text-xs leading-relaxed">
                              {row.vercel.detail}
                            </p>
                          )}
                          {row.vercel.link && (
                            <a
                              className="inline-flex items-center gap-1 text-primary text-xs hover:underline"
                              href={row.vercel.link}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              Documentation <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* AWS column */}
                      <div className="border-border border-l p-4 sm:p-5">
                        <p className="font-medium text-foreground text-sm">
                          {row.aws.text}
                        </p>
                        <div className="mt-2 space-y-2">
                          {row.aws.detail && (
                            <p className="text-muted-foreground text-xs leading-relaxed">
                              {row.aws.detail}
                            </p>
                          )}
                          {row.aws.link && (
                            <a
                              className="inline-flex items-center gap-1 text-primary text-xs hover:underline"
                              href={row.aws.link}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              Documentation <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Key insight */}
        <div className="mt-4 rounded-2xl border border-border bg-card/60 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="mb-1 font-semibold">Key Architecture Insight</h4>
              <p className="text-muted-foreground text-sm">
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                  bedrock-agentcore-sdk-python
                </code>{" "}
                is the{" "}
                <strong className="text-foreground">
                  infrastructure wrapper
                </strong>
                , NOT the agent framework. Agent logic uses{" "}
                <strong className="text-foreground">Strands SDK</strong>. This
                mirrors how Vercel's AI SDK handles agent logic while the Vercel
                platform provides infrastructure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
