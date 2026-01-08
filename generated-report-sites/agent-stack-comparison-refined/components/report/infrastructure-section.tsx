"use client"

import { useState } from "react"
import { ChevronDown, ExternalLink, Layers } from "lucide-react"
import { cn } from "@/lib/utils"

interface ComparisonRow {
  capability: string
  vercel: { text: string; detail?: string; link?: string }
  aws: { text: string; detail?: string; link?: string }
}

const comparisonData: ComparisonRow[] = [
  {
    capability: "Agent Framework",
    vercel: { 
      text: "Vercel AI SDK", 
      detail: "ToolLoopAgent, streamText, tools, stopWhen conditions",
      link: "https://sdk.vercel.ai" 
    },
    aws: { 
      text: "Strands Agents SDK", 
      detail: "Agent class, tools, model providers, multi-agent support",
      link: "https://github.com/strands-agents/sdk-python" 
    },
  },
  {
    capability: "Model Gateway/Routing",
    vercel: { 
      text: "AI Gateway", 
      detail: "Unified API, provider routing/fallbacks, BYOK, 20+ providers",
      link: "https://vercel.com/ai-gateway" 
    },
    aws: { 
      text: "Amazon Bedrock", 
      detail: "Foundation models, 10+ providers, cross-region inference",
      link: "https://aws.amazon.com/bedrock/" 
    },
  },
  {
    capability: "Infrastructure Wrapper",
    vercel: { 
      text: "Vercel Platform", 
      detail: "Edge/Serverless/Fluid Compute, 800s max duration",
      link: "https://vercel.com/docs" 
    },
    aws: { 
      text: "Bedrock AgentCore Runtime", 
      detail: "microVM-per-session, up to 8h maxLifetime",
      link: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-lifecycle-settings.html" 
    },
  },
  {
    capability: "Secure Code Execution",
    vercel: { 
      text: "Sandbox SDK", 
      detail: "Firecracker microVMs, Node.js + Python, 8 vCPUs max",
      link: "https://vercel.com/docs/vercel-sandbox" 
    },
    aws: { 
      text: "Bedrock AgentCore Code Interpreter", 
      detail: "Containerized, Python/JS/TS, 5GB files, 8h max",
      link: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/code-interpreter-tool.html" 
    },
  },
  {
    capability: "Durable Workflows",
    vercel: { 
      text: 'Workflow SDK', 
      detail: '"use workflow" directive, survives deployments',
      link: "https://vercel.com/blog/introducing-workflow" 
    },
    aws: { 
      text: "Bedrock AgentCore Runtime Sessions", 
      detail: "Up to 8 hours, configurable idle timeout",
      link: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-lifecycle-settings.html" 
    },
  },
  {
    capability: "Browser Automation",
    vercel: { 
      text: "Anthropic Computer Use", 
      detail: "computer_20250124, bash, textEditor tools",
      link: "https://github.com/vercel/ai" 
    },
    aws: { 
      text: "Bedrock AgentCore Browser Tool", 
      detail: "Cloud-based, CAPTCHA reduction via Web Bot Auth",
      link: "https://aws.amazon.com/bedrock/agentcore/pricing/" 
    },
  },
  {
    capability: "Persistent Memory",
    vercel: { 
      text: "BYO (Redis/DB)", 
      detail: "External databases, vector stores, custom implementation",
    },
    aws: { 
      text: "Bedrock AgentCore Memory", 
      detail: "Built-in short-term + long-term with strategies",
      link: "https://aws.amazon.com/bedrock/agentcore/pricing/" 
    },
  },
  {
    capability: "Tool Management / MCP",
    vercel: { 
      text: "Native tool calling", 
      detail: "MCP client (experimental), provider integrations",
    },
    aws: { 
      text: "Bedrock AgentCore Gateway", 
      detail: "Connects to MCP servers, tool indexing, priced operations",
      link: "https://aws.amazon.com/bedrock/agentcore/pricing/" 
    },
  },
  {
    capability: "Authorization",
    vercel: { 
      text: "App-layer", 
      detail: "Middleware + env vars, custom implementation",
    },
    aws: { 
      text: "Bedrock AgentCore Policy", 
      detail: "Cedar-based authorization + IAM integration",
      link: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/policy.html" 
    },
  },
  {
    capability: "Identity / OAuth",
    vercel: { 
      text: "NextAuth/Auth.js", 
      detail: "App-layer, custom implementation",
    },
    aws: { 
      text: "Bedrock AgentCore Identity", 
      detail: "OAuth, API keys, $0.010/1K requests",
      link: "https://aws.amazon.com/bedrock/agentcore/pricing/" 
    },
  },
  {
    capability: "Observability",
    vercel: { 
      text: "AI SDK telemetry", 
      detail: "OTEL-compatible spans, onStepFinish callbacks",
    },
    aws: { 
      text: "Bedrock AgentCore Observability", 
      detail: "CloudWatch-backed, step visualization, metadata tagging",
      link: "https://aws.amazon.com/bedrock/agentcore/pricing/" 
    },
  },
]

export function InfrastructureSection() {
  const [expandedRow, setExpandedRow] = useState<number | null>(null)

  return (
    <section id="infrastructure" className="py-24 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary mb-4">
            <Layers className="w-4 h-4" />
            Section 2
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Infrastructure Footprint
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Full lifecycle comparison of the "blessed path" — officially recommended, out-of-the-box developer experience.
          </p>
        </div>

        {/* Comparison table */}
        <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-border bg-muted/50">
            <div className="p-4 sm:p-5 text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Capability
            </div>
            <div className="p-4 sm:p-5 border-l border-border">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-foreground flex items-center justify-center">
                  <svg className="w-4 h-4 text-background" viewBox="0 0 76 65" fill="currentColor">
                    <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                  </svg>
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-vercel">Vercel Stack</span>
              </div>
            </div>
            <div className="p-4 sm:p-5 border-l border-border">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-aws flex items-center justify-center">
                  <span className="text-white text-xs font-bold">A</span>
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-aws">AWS Stack</span>
              </div>
            </div>
          </div>

          {/* Table rows */}
          {comparisonData.map((row, index) => (
            <div
              key={row.capability}
              className={cn(
                "grid grid-cols-[1fr_1fr_1fr] border-b border-border last:border-b-0 cursor-pointer transition-all duration-200",
                expandedRow === index ? "bg-primary/5" : "hover:bg-muted/30"
              )}
              onClick={() => setExpandedRow(expandedRow === index ? null : index)}
            >
              <div className="p-4 sm:p-5 flex items-start gap-2">
                <ChevronDown 
                  className={cn(
                    "w-4 h-4 text-muted-foreground mt-0.5 transition-transform shrink-0",
                    expandedRow === index && "rotate-180 text-primary"
                  )} 
                />
                <span className="font-medium text-sm">{row.capability}</span>
              </div>
              <div className="p-4 sm:p-5 border-l border-border">
                <p className="text-sm font-medium text-foreground mb-1">{row.vercel.text}</p>
                {(expandedRow === index || !row.vercel.detail) && (
                  <>
                    {row.vercel.detail && (
                      <p className="text-xs text-muted-foreground mt-2">{row.vercel.detail}</p>
                    )}
                    {row.vercel.link && expandedRow === index && (
                      <a
                        href={row.vercel.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Documentation <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </>
                )}
              </div>
              <div className="p-4 sm:p-5 border-l border-border">
                <p className="text-sm font-medium text-foreground mb-1">{row.aws.text}</p>
                {(expandedRow === index || !row.aws.detail) && (
                  <>
                    {row.aws.detail && (
                      <p className="text-xs text-muted-foreground mt-2">{row.aws.detail}</p>
                    )}
                    {row.aws.link && expandedRow === index && (
                      <a
                        href={row.aws.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Documentation <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Key insight */}
        <div className="mt-8 p-6 rounded-2xl bg-card/60 border border-border">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-primary text-lg">⚡</span>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Key Architecture Insight</h4>
              <p className="text-sm text-muted-foreground">
                <code className="text-xs bg-muted px-1.5 py-0.5 rounded">bedrock-agentcore-sdk-python</code> is the <strong className="text-foreground">infrastructure wrapper</strong>, 
                NOT the agent framework. Agent logic uses <strong className="text-foreground">Strands SDK</strong>. 
                This mirrors how Vercel's AI SDK handles agent logic while the Vercel platform provides infrastructure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
