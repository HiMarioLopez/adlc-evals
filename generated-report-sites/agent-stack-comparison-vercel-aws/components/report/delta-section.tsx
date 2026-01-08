"use client"

import { ArrowRight, ExternalLink, GitBranch } from "lucide-react"

const deltas = [
  {
    platform: "Vercel AI SDK",
    previous: "SDK 5.x (generateText, streamText with maxSteps)",
    current: "SDK 6.x (ToolLoopAgent class)",
    changes: [
      "New agent-first abstraction with ToolLoopAgent",
      "stopWhen conditions for loop control",
      "Built-in loop management with 20-step default",
      "system renamed to instructions",
    ],
    version: "ai@6.0.23",
    link: "https://github.com/vercel/ai",
    color: "primary",
  },
  {
    platform: "Bedrock AgentCore",
    previous: "Preview (July 2025)",
    current: "GA (October 2025)",
    changes: [
      "Production SLAs and consumption-based pricing",
      "Cedar-based Policy (preview)",
      "Evaluations capability (preview)",
      "Browser Tool + Code Interpreter GA",
    ],
    version: "v1.1.4",
    link: "https://github.com/aws/bedrock-agentcore-sdk-python",
    color: "aws",
  },
  {
    platform: "Strands SDK",
    previous: "Initial Python Release",
    current: "v1.21.0 Stable",
    changes: [
      "TypeScript preview announced (Dec 2025)",
      "Multi-agent orchestration support",
      "Model-agnostic provider routing",
      "Extended tool ecosystem",
    ],
    version: "v1.21.0",
    link: "https://github.com/strands-agents/sdk-python",
    color: "chart-2",
  },
]

export function DeltaSection() {
  return (
    <section id="delta" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary mb-4">
            <GitBranch className="w-4 h-4" />
            Changelog
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Recent Platform Updates
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Key changes affecting agent development and infrastructure decisions.
          </p>
        </div>

        {/* Delta cards */}
        <div className="grid gap-6">
          {deltas.map((delta, idx) => (
            <div
              key={delta.platform}
              className={`group relative rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-${delta.color}/30 hover:bg-card/80`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Accent line */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 bg-${delta.color}`} />
              
              <div className="p-6 sm:p-8">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Platform info */}
                  <div className="lg:w-1/3">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-xl font-semibold">{delta.platform}</h3>
                      <a
                        href={delta.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm">
                      <span className="px-2.5 py-1 rounded-lg bg-muted text-muted-foreground font-mono text-xs">
                        {delta.previous.split(' ')[0]}
                      </span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      <span className={`px-2.5 py-1 rounded-lg bg-${delta.color}/10 text-${delta.color} font-mono text-xs font-medium`}>
                        {delta.current.split(' ')[0]}
                      </span>
                    </div>
                  </div>

                  {/* Version transition */}
                  <div className="lg:w-1/3 flex flex-col gap-2">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">Previous</p>
                    <p className="text-sm text-muted-foreground">{delta.previous}</p>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mt-2">Current</p>
                    <p className="text-sm text-foreground font-medium">{delta.current}</p>
                  </div>

                  {/* Changes */}
                  <div className="lg:w-1/3">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Key Changes</p>
                    <ul className="space-y-2">
                      {delta.changes.map((change, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-${delta.color} shrink-0`} />
                          {change}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 pt-4 border-t border-border">
                      <span className="font-mono text-xs text-muted-foreground">
                        Latest: <span className="text-foreground">{delta.version}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
