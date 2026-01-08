"use client"

const deltas = [
  {
    platform: "Vercel AI SDK",
    previous: "SDK 5.x (generateText, streamText)",
    current: "SDK 6.x (ToolLoopAgent class)",
    changes: "New agent-first abstraction; stopWhen conditions; built-in loop management",
    color: "hsl(var(--foreground))"
  },
  {
    platform: "AWS AgentCore",
    previous: "Preview",
    current: "GA (October 2025)",
    changes: "Production SLAs; Cedar-based Policy (preview); Browser Tool + Code Interpreter GA",
    color: "hsl(var(--aws))"
  },
  {
    platform: "Strands SDK",
    previous: "Initial Release",
    current: "v1.x stable",
    changes: "TypeScript preview announced (Dec 2025); multi-agent support; model-agnostic routing",
    color: "hsl(var(--chart-2))"
  }
]

export function DeltaSection() {
  return (
    <section id="overview" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">2025 → 2026 Technical Delta</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Key changes and updates to both platforms over the past year
          </p>
        </div>

        <div className="grid gap-6">
          {deltas.map((delta, index) => (
            <div
              key={delta.platform}
              className="relative group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full" style={{ backgroundColor: delta.color }} />
              <div className="ml-6 p-6 rounded-xl bg-card border border-border hover:border-muted-foreground/30 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <h3 className="text-xl font-semibold" style={{ color: delta.color }}>
                    {delta.platform}
                  </h3>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="px-2 py-1 rounded bg-secondary text-muted-foreground font-mono">
                      {delta.previous}
                    </span>
                    <span className="text-muted-foreground">→</span>
                    <span className="px-2 py-1 rounded bg-[hsl(var(--accent))/0.15] text-[hsl(var(--accent))] font-mono">
                      {delta.current}
                    </span>
                  </div>
                </div>
                <p className="text-muted-foreground">{delta.changes}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-xl bg-[hsl(var(--accent))/0.08] border border-[hsl(var(--accent))/0.2]">
          <div className="flex items-start gap-3">
            <span className="text-[hsl(var(--accent))] text-xl">!</span>
            <div>
              <h4 className="font-semibold text-[hsl(var(--accent))] mb-1">Key Insight</h4>
              <p className="text-muted-foreground">
                <code className="px-1.5 py-0.5 rounded bg-secondary font-mono text-sm">bedrock-agentcore-sdk-python</code> is the infrastructure wrapper, NOT the agent framework. Agent logic uses <strong className="text-foreground">Strands SDK</strong>. This mirrors how Vercel's AI SDK handles agent logic while the Vercel platform provides infrastructure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
