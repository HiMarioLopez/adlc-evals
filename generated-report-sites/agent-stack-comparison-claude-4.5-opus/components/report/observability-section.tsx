"use client"

const telemetryData = [
  { aspect: "Protocol", vercel: "OpenTelemetry (OTEL)", aws: "CloudWatch + AgentCore Observability" },
  { aspect: "Automatic Spans", vercel: "ai.streamText, ai.toolCall, ai.generate", aws: "Step-by-step visualization" },
  { aspect: "Custom Spans", vercel: "Supported", aws: "Metadata tagging" },
  { aspect: "Context Propagation", vercel: "Cross-service tracing", aws: "CloudWatch X-Ray integration" },
  { aspect: "Third-party Integration", vercel: "Lunary, LangWatch, Arize AX", aws: "CloudWatch-compatible tools" },
  { aspect: "Configuration", vercel: "experimental_telemetry: { isEnabled: true }", aws: "Automatic with AgentCore" }
]

const loopBreakerData = [
  { aspect: "Mechanism", vercel: "Static step count (stepCountIs(20))", aws: "Dynamic Cedar policy evaluation" },
  { aspect: "Customization", vercel: "Per-agent configuration", aws: "Per-gateway policy attachment" },
  { aspect: "Default Limit", vercel: "20 steps", aws: "No hard default (policy-driven)" },
  { aspect: "Override", vercel: "stopWhen condition", aws: "Cedar policy modification" },
  { aspect: "Observability", vercel: "onStepFinish callback", aws: "CloudWatch metrics + logs" }
]

export function ObservabilitySection() {
  return (
    <section id="observability" className="py-24 px-6 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Observability & Day 2</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Telemetry, monitoring, and loop control mechanisms
          </p>
        </div>

        {/* Telemetry Comparison */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6">Telemetry Comparison</h3>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Vercel Telemetry */}
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-foreground flex items-center justify-center">
                  <svg className="w-6 h-6 text-background" viewBox="0 0 76 65" fill="currentColor">
                    <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold">Vercel AI SDK Telemetry</h4>
              </div>
              <div className="space-y-4">
                {telemetryData.slice(0, 3).map((item) => (
                  <div key={item.aspect} className="flex items-start justify-between py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">{item.aspect}</span>
                    <code className="text-xs bg-secondary px-2 py-1 rounded font-mono text-right max-w-[60%]">
                      {item.vercel}
                    </code>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-lg bg-secondary/50">
                <p className="text-xs font-mono text-muted-foreground mb-2">// Example configuration</p>
                <pre className="text-sm font-mono text-foreground">
{`const result = await generateText({
  model: openai('gpt-5'),
  prompt: 'Write a haiku.',
  experimental_telemetry: {
    isEnabled: true,
  },
});`}
                </pre>
              </div>
            </div>

            {/* AWS Telemetry */}
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[hsl(var(--aws))] flex items-center justify-center">
                  <span className="text-background font-bold">A</span>
                </div>
                <h4 className="text-xl font-semibold">AWS AgentCore Observability</h4>
              </div>
              <div className="space-y-4">
                {telemetryData.slice(0, 3).map((item) => (
                  <div key={item.aspect} className="flex items-start justify-between py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">{item.aspect}</span>
                    <code className="text-xs bg-[hsl(var(--aws))/0.1] px-2 py-1 rounded font-mono text-right max-w-[60%]">
                      {item.aws}
                    </code>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-lg bg-[hsl(var(--aws))/0.05]">
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 rounded bg-[hsl(var(--aws))/0.15] text-[hsl(var(--aws))] text-xs font-mono">
                    Step visualization
                  </span>
                  <span className="px-2 py-1 rounded bg-[hsl(var(--aws))/0.15] text-[hsl(var(--aws))] text-xs font-mono">
                    X-Ray tracing
                  </span>
                  <span className="px-2 py-1 rounded bg-[hsl(var(--aws))/0.15] text-[hsl(var(--aws))] text-xs font-mono">
                    CloudWatch metrics
                  </span>
                  <span className="px-2 py-1 rounded bg-[hsl(var(--aws))/0.15] text-[hsl(var(--aws))] text-xs font-mono">
                    Automatic with AgentCore
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loop Breaker Comparison */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-2">Loop-Breaker Comparison</h3>
          <p className="text-muted-foreground mb-6">How each platform handles runaway agent loops</p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 border-b border-border text-muted-foreground font-medium">
                    Aspect
                  </th>
                  <th className="text-left p-4 border-b border-border">
                    <span className="font-semibold">Vercel (maxSteps / stopWhen)</span>
                  </th>
                  <th className="text-left p-4 border-b border-border">
                    <span className="font-semibold">AWS (Policy-based)</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {loopBreakerData.map((row) => (
                  <tr key={row.aspect} className="hover:bg-secondary/30 transition-colors">
                    <td className="p-4 border-b border-border font-medium text-foreground">
                      {row.aspect}
                    </td>
                    <td className="p-4 border-b border-border text-sm">
                      <code className="text-xs bg-secondary px-2 py-1 rounded font-mono">
                        {row.vercel}
                      </code>
                    </td>
                    <td className="p-4 border-b border-border text-sm">
                      <code className="text-xs bg-[hsl(var(--aws))/0.1] px-2 py-1 rounded font-mono">
                        {row.aws}
                      </code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Differences */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-secondary/50 border border-border">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded bg-foreground flex items-center justify-center">
                <svg className="w-4 h-4 text-background" viewBox="0 0 76 65" fill="currentColor">
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                </svg>
              </div>
              <h4 className="font-semibold">Vercel Approach</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Static step limits</strong> with declarative <code className="text-xs bg-secondary px-1 rounded">stopWhen</code> conditions. 
              Simple configuration, predictable behavior. Third-party OTEL integrations for advanced observability.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-[hsl(var(--aws))/0.08] border border-[hsl(var(--aws))/0.2]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded bg-[hsl(var(--aws))] flex items-center justify-center">
                <span className="text-background text-xs font-bold">A</span>
              </div>
              <h4 className="font-semibold">AWS Approach</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Dynamic policy evaluation</strong> via Cedar at the Gateway level. 
              More complex but allows fine-grained, context-aware control. Native CloudWatch integration.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
