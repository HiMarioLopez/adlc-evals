"use client"

const awsRegions = [
  { feature: "AgentCore Evaluations", regions: 4, status: "Preview", note: "Most limited availability" },
  { feature: "AgentCore Runtime", regions: 9, status: "GA", note: "us-east-1, us-west-2, eu-central-1, ap-northeast-1..." },
  { feature: "AgentCore Built-in Tools", regions: 9, status: "GA", note: "Same as Runtime" },
  { feature: "AgentCore Observability", regions: 9, status: "GA", note: "Same as Runtime" },
  { feature: "AgentCore Policy", regions: 9, status: "Preview", note: "Cedar-based authorization" },
  { feature: "AgentCore Memory", regions: 12, status: "GA", note: "Broader availability" },
  { feature: "AgentCore Gateway", regions: 12, status: "GA", note: "Broader availability" }
]

const vercelFeatures = [
  { feature: "AI SDK 6.x", availability: "Global", note: "Edge + Serverless everywhere" },
  { feature: "AI Gateway", availability: "Global", note: "Edge-optimized routing" },
  { feature: "Sandbox SDK", availability: "iad1 only", note: "Single-region during Beta", limited: true },
  { feature: "Workflow SDK", availability: "Global", note: "Durable functions in all regions" },
  { feature: "Fluid Compute", availability: "Global", note: "Extended timeout regions" }
]

export function RegionalSection() {
  return (
    <section id="regional" className="py-24 px-6 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Regional Availability</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Where you can deploy your agents around the world
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Vercel */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-foreground flex items-center justify-center">
                <svg className="w-6 h-6 text-background" viewBox="0 0 76 65" fill="currentColor">
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Vercel Regional Availability</h3>
            </div>
            <div className="space-y-3">
              {vercelFeatures.map((item) => (
                <div
                  key={item.feature}
                  className="p-4 rounded-lg bg-card border border-border"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{item.feature}</span>
                    <span className={`px-2 py-1 rounded text-xs font-mono ${
                      item.limited 
                        ? "bg-[hsl(var(--chart-3))/0.15] text-[hsl(var(--chart-3))]" 
                        : "bg-[hsl(var(--accent))/0.15] text-[hsl(var(--accent))]"
                    }`}>
                      {item.availability}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AWS */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[hsl(var(--aws))] flex items-center justify-center">
                <span className="text-background font-bold">A</span>
              </div>
              <h3 className="text-xl font-semibold">AWS AgentCore Regional Availability</h3>
            </div>
            <div className="space-y-3">
              {awsRegions.map((item) => (
                <div
                  key={item.feature}
                  className="p-4 rounded-lg bg-card border border-border"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{item.feature}</span>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-mono ${
                        item.status === "Preview" 
                          ? "bg-[hsl(var(--chart-3))/0.15] text-[hsl(var(--chart-3))]" 
                          : "bg-[hsl(var(--aws))/0.15] text-[hsl(var(--aws))]"
                      }`}>
                        {item.regions} regions
                      </span>
                      <span className={`text-xs ${
                        item.status === "Preview" ? "text-[hsl(var(--chart-3))]" : "text-muted-foreground"
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comparison Summary */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-card border border-border">
            <h4 className="font-semibold mb-4">Full Agent Stack in Single Region?</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Vercel</span>
                <span className="text-sm">Only <code className="px-1.5 py-0.5 rounded bg-secondary text-xs font-mono">iad1</code> (due to Sandbox)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">AWS</span>
                <span className="text-sm text-[hsl(var(--accent))]">9 regions for full stack</span>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-xl bg-card border border-border">
            <h4 className="font-semibold mb-4">Edge Latency Advantage?</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Vercel</span>
                <span className="text-sm text-[hsl(var(--accent))]">Yes - AI Gateway is edge-optimized</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">AWS</span>
                <span className="text-sm">No - Bedrock is region-bound</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
