"use client"

import { useState } from "react"
import { ChevronDown, ExternalLink } from "lucide-react"

interface ComparisonRow {
  capability: string
  vercel: { text: string; link?: string }
  aws: { text: string; link?: string }
}

const comparisonData: ComparisonRow[] = [
  {
    capability: "Agent Framework",
    vercel: { text: "AI SDK 6.x (ToolLoopAgent, streamText, tools, stopWhen)", link: "https://sdk.vercel.ai" },
    aws: { text: "Strands Agents SDK (Agent, tools, model providers)", link: "https://github.com/strands-agents/sdk-python" },
  },
  {
    capability: "Model Gateway/Routing",
    vercel: { text: "AI Gateway (unified API, provider routing/fallbacks, BYOK)", link: "https://vercel.com/ai-gateway" },
    aws: { text: "Amazon Bedrock (model catalog + tiers)", link: "https://aws.amazon.com/bedrock/" },
  },
  {
    capability: "Infrastructure Wrapper",
    vercel: { text: "Vercel platform runtimes (Edge/Serverless/Fluid Compute)", link: "https://vercel.com/docs" },
    aws: { text: "AgentCore Runtime (microVM-per-session; up to 8h maxLifetime)", link: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-lifecycle-settings.html" },
  },
  {
    capability: "Secure Code Execution",
    vercel: { text: "Vercel Sandbox (isolated execution)", link: "https://vercel.com/docs/vercel-sandbox" },
    aws: { text: "AgentCore Code Interpreter", link: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/code-interpreter-tool.html" },
  },
  {
    capability: "Durable Workflows",
    vercel: { text: "Workflow / \"use workflow\" (durable functions)", link: "https://vercel.com/blog/introducing-workflow" },
    aws: { text: "AgentCore Runtime sessions (up to 8 hours)", link: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-lifecycle-settings.html" },
  },
  {
    capability: "Browser Automation",
    vercel: { text: "AI SDK integrations (e.g., Anthropic computer-use tools)", link: "https://github.com/vercel/ai/blob/main/content/cookbook/00-guides/05-computer-use.mdx" },
    aws: { text: "AgentCore Browser Tool", link: "https://aws.amazon.com/bedrock/agentcore/pricing/" },
  },
  {
    capability: "Persistent Memory",
    vercel: { text: "BYO (Redis/DB/vector DB)" },
    aws: { text: "AgentCore Memory (short-term + long-term)", link: "https://aws.amazon.com/bedrock/agentcore/pricing/" },
  },
  {
    capability: "Tool Management / MCP",
    vercel: { text: "Native tool calling; MCP client story varies by provider" },
    aws: { text: "AgentCore Gateway connects to MCP servers; priced operations", link: "https://aws.amazon.com/bedrock/agentcore/pricing/" },
  },
  {
    capability: "Authorization",
    vercel: { text: "App-layer (middleware + env vars)" },
    aws: { text: "AgentCore Policy (Cedar) + IAM", link: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/policy.html" },
  },
  {
    capability: "Identity / OAuth",
    vercel: { text: "App-layer (NextAuth/Auth.js/custom)" },
    aws: { text: "AgentCore Identity", link: "https://aws.amazon.com/bedrock/agentcore/pricing/" },
  },
  {
    capability: "Observability",
    vercel: { text: "AI SDK callbacks + OTEL patterns (framework-level)" },
    aws: { text: "AgentCore Observability (CloudWatch-backed)", link: "https://aws.amazon.com/bedrock/agentcore/pricing/" },
  },
]

export function ComparisonTable() {
  const [expandedRow, setExpandedRow] = useState<number | null>(null)

  return (
    <section className="py-24 px-6" id="comparison">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <span className="text-xs font-mono text-primary uppercase tracking-widest">Section 2a</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Full Lifecycle Comparison</h2>
          <p className="text-muted-foreground max-w-2xl">
            Side-by-side analysis of the blessed path (officially recommended, out-of-the-box DX) for both stacks.
          </p>
        </div>

        {/* Table */}
        <div className="border border-border rounded-lg overflow-hidden bg-card/50 backdrop-blur-sm">
          {/* Header */}
          <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-border bg-muted/30">
            <div className="p-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Capability
            </div>
            <div className="p-4 font-mono text-xs uppercase tracking-wider text-vercel border-l border-border">
              Vercel Stack
            </div>
            <div className="p-4 font-mono text-xs uppercase tracking-wider text-aws border-l border-border">
              AWS Stack
            </div>
          </div>

          {/* Rows */}
          {comparisonData.map((row, index) => (
            <div
              key={row.capability}
              className={`grid grid-cols-[1fr_1fr_1fr] border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors cursor-pointer ${expandedRow === index ? "bg-muted/30" : ""}`}
              onClick={() => setExpandedRow(expandedRow === index ? null : index)}
            >
              <div className="p-4 flex items-start gap-2">
                <ChevronDown className={`w-4 h-4 text-muted-foreground mt-0.5 transition-transform ${expandedRow === index ? "rotate-180" : ""}`} />
                <span className="font-medium text-sm">{row.capability}</span>
              </div>
              <div className="p-4 border-l border-border">
                <p className={`text-sm text-muted-foreground ${expandedRow === index ? "" : "line-clamp-2"}`}>
                  {row.vercel.text}
                </p>
                {row.vercel.link && expandedRow === index && (
                  <a
                    href={row.vercel.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Source <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <div className="p-4 border-l border-border">
                <p className={`text-sm text-muted-foreground ${expandedRow === index ? "" : "line-clamp-2"}`}>
                  {row.aws.text}
                </p>
                {row.aws.link && expandedRow === index && (
                  <a
                    href={row.aws.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Source <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
