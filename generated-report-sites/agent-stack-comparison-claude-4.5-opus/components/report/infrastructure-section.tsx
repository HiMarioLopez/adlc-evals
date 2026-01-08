"use client"

const capabilities = [
  {
    category: "Agent Framework",
    vercel: "AI SDK 6.x (ToolLoopAgent, stopWhen, tools)",
    aws: "Strands SDK (Agent, tools, model routing)"
  },
  {
    category: "Model Gateway",
    vercel: "AI Gateway (unified API, fallbacks, BYOK, 20+ providers)",
    aws: "Amazon Bedrock (foundation models, 10+ providers)"
  },
  {
    category: "Infrastructure",
    vercel: "Vercel Platform (Fluid Compute)",
    aws: "BedrockAgentCoreApp (@app.entrypoint decorator)"
  },
  {
    category: "Code Execution",
    vercel: "Sandbox SDK (microVMs, Node.js + Python, 8 vCPUs)",
    aws: "AgentCore Code Interpreter (containerized, Python/JS/TS, 5GB files)"
  },
  {
    category: "Durable Workflows",
    vercel: "Workflow SDK (\"use workflow\" directive)",
    aws: "AgentCore Runtime (8-hour max lifetime)"
  },
  {
    category: "Browser Automation",
    vercel: "Anthropic Computer Use tools (computer_20250124)",
    aws: "AgentCore Browser Tool (CAPTCHA reduction via Web Bot Auth)"
  },
  {
    category: "Persistent Memory",
    vercel: "External (Redis, databases, BYOM)",
    aws: "AgentCore Memory (built-in short + long term with strategies)"
  },
  {
    category: "Tool Management/MCP",
    vercel: "MCP Client (experimental via @mcpc-tech/mcp-sampling-ai-provider)",
    aws: "AgentCore Gateway (MCP Server support, tool indexing)"
  },
  {
    category: "Identity/OAuth",
    vercel: "NextAuth, Auth.js, custom implementation",
    aws: "AgentCore Identity (OAuth, API keys, $0.010/1K requests)"
  },
  {
    category: "Authorization",
    vercel: "Environment variables, middleware, custom",
    aws: "AgentCore Policy (Cedar-based, NL2Cedar)"
  },
  {
    category: "Observability",
    vercel: "AI SDK telemetry (OTEL-compatible spans)",
    aws: "AgentCore Observability + CloudWatch (step visualization)"
  }
]

export function InfrastructureSection() {
  return (
    <section id="infrastructure" className="py-24 px-6 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Infrastructure Footprint</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Full capability matrix comparing both stacks across all major features
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-4 border-b border-border text-muted-foreground font-medium">
                  Capability
                </th>
                <th className="text-left p-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-foreground flex items-center justify-center">
                      <svg className="w-4 h-4 text-background" viewBox="0 0 76 65" fill="currentColor">
                        <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                      </svg>
                    </div>
                    <span className="font-semibold">Vercel Stack</span>
                  </div>
                </th>
                <th className="text-left p-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[hsl(var(--aws))] flex items-center justify-center">
                      <span className="text-background text-xs font-bold">A</span>
                    </div>
                    <span className="font-semibold">AWS Stack</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {capabilities.map((cap) => (
                <tr
                  key={cap.category}
                  className="group hover:bg-secondary/30 transition-colors align-top"
                >
                  <td className="p-4 border-b border-border font-medium text-foreground align-top">
                    {cap.category}
                  </td>
                  <td className="p-4 border-b border-border text-muted-foreground text-sm align-top">
                    <span className="inline-block px-2 py-1 rounded bg-secondary/50 font-mono text-xs leading-relaxed">
                      {cap.vercel}
                    </span>
                  </td>
                  <td className="p-4 border-b border-border text-muted-foreground text-sm align-top">
                    <span className="inline-block px-2 py-1 rounded bg-[hsl(var(--aws))/0.1] font-mono text-xs leading-relaxed">
                      {cap.aws}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
