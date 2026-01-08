"use client"

const repoStats = [
  { metric: "Latest Tag", vercel: "ai@6.0.22", aws: "v1.1.3" },
  { metric: "Primary Language", vercel: "TypeScript", aws: "Python" },
  { metric: "Forks", vercel: "~3,600", aws: "~609" },
  { metric: "Open Issues", vercel: "~884", aws: "~43" },
  { metric: "Ecosystem", vercel: "Fullstack (React, Next.js, Svelte, Vue)", aws: "Backend/ML (Python, boto3)" }
]

const activitySignals = [
  { 
    platform: "Vercel AI SDK",
    signals: ["V6 milestone active", "Issues for generateImage()", "Provider fixes (OpenAI, Anthropic)"]
  },
  {
    platform: "AWS AgentCore",
    signals: ["GA announced Oct 2025", "Policy + Evaluations in preview (Dec 2025)", "TypeScript SDK preview announced"]
  }
]

const documentationGaps = [
  { feature: "Vercel \"AI Units\" v2026", status: "DOCUMENTATION GAP", note: "Not publicly documented; check Vercel Pricing" },
  { feature: "Vercel Workflow SDK pricing", status: "DOCUMENTATION GAP", note: "WDK pricing not publicly documented" },
  { feature: "AgentCore GA SLA percentage", status: "DOCUMENTATION GAP", note: "No specific uptime % published" }
]

const memoryStrategies = [
  { 
    strategy: "Built-in", 
    description: "Automatic memory processing", 
    pricing: "$0.75/1K records/month" 
  },
  { 
    strategy: "Built-in Override", 
    description: "Custom prompts, managed extraction", 
    pricing: "$0.25/1K records/month" 
  },
  { 
    strategy: "Self-Managed", 
    description: "Full control, external integration", 
    pricing: "$0.25/1K records/month + inference" 
  }
]

const browserToolFeatures = [
  { feature: "Environment", value: "Cloud-based browser" },
  { feature: "Capabilities", value: "Web navigation, form filling, data extraction" },
  { feature: "CAPTCHA", value: "Reduction via Web Bot Auth (IETF draft)" },
  { feature: "Scalability", value: "Multi-region deployment" },
  { feature: "Pricing", value: "$0.0895/vCPU-hour + $0.00945/GB-hour" }
]

export function AdoptionSection() {
  return (
    <section id="adoption" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Adoption & Ecosystem</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            GitHub metrics, development activity, and ecosystem maturity
          </p>
        </div>

        {/* Repository Stats */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6">Repository Statistics</h3>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Vercel */}
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-foreground flex items-center justify-center">
                  <svg className="w-6 h-6 text-background" viewBox="0 0 76 65" fill="currentColor">
                    <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">vercel/ai</h4>
                  <p className="text-xs text-muted-foreground font-mono">Vercel AI SDK</p>
                </div>
              </div>
              <div className="space-y-3">
                {repoStats.map((stat) => (
                  <div key={stat.metric} className="flex items-center justify-between py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">{stat.metric}</span>
                    <span className="text-sm font-mono">{stat.vercel}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AWS */}
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[hsl(var(--aws))] flex items-center justify-center">
                  <span className="text-background font-bold">A</span>
                </div>
                <div>
                  <h4 className="font-semibold">bedrock-agentcore-sdk-python</h4>
                  <p className="text-xs text-muted-foreground font-mono">AWS AgentCore SDK</p>
                </div>
              </div>
              <div className="space-y-3">
                {repoStats.map((stat) => (
                  <div key={stat.metric} className="flex items-center justify-between py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">{stat.metric}</span>
                    <span className="text-sm font-mono">{stat.aws}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Development Activity */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6">Development Activity Signals</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {activitySignals.map((item) => (
              <div key={item.platform} className="p-5 rounded-xl bg-card border border-border">
                <h4 className="font-medium mb-4">{item.platform}</h4>
                <ul className="space-y-2">
                  {item.signals.map((signal) => (
                    <li key={signal} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent))] mt-2 shrink-0" />
                      <span className="text-sm text-muted-foreground">{signal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* AgentCore Memory Strategies */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-2">AWS AgentCore Memory Strategies</h3>
          <p className="text-muted-foreground mb-6">Built-in memory management with flexible pricing tiers</p>
          <div className="grid md:grid-cols-3 gap-4">
            {memoryStrategies.map((item) => (
              <div key={item.strategy} className="p-5 rounded-xl bg-card border border-border">
                <h4 className="font-semibold mb-2 text-[hsl(var(--aws))]">{item.strategy}</h4>
                <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                <div className="px-3 py-2 rounded bg-[hsl(var(--aws))/0.1]">
                  <span className="font-mono text-sm">{item.pricing}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 rounded-lg bg-secondary/50">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Memory Types:</strong> Short-Term (within-session context) and Long-Term (cross-session learning). 
              Operations include CreateEvent, GetEvent, ListEvents, DeleteEvent, organized by actor/session.
            </p>
          </div>
        </div>

        {/* AgentCore Browser Tool */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-2">AWS AgentCore Browser Tool</h3>
          <p className="text-muted-foreground mb-6">Cloud-based web automation with CAPTCHA mitigation</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {browserToolFeatures.map((item) => (
              <div key={item.feature} className="p-4 rounded-lg bg-card border border-border">
                <p className="text-xs text-muted-foreground mb-1">{item.feature}</p>
                <p className="text-sm font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Documentation Gaps */}
        <div>
          <h3 className="text-2xl font-bold mb-2">Documentation Gaps</h3>
          <p className="text-muted-foreground mb-6">Known gaps in publicly available documentation</p>
          <div className="space-y-3">
            {documentationGaps.map((gap) => (
              <div
                key={gap.feature}
                className="p-4 rounded-lg bg-[hsl(var(--chart-3))/0.08] border border-[hsl(var(--chart-3))/0.2] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 rounded bg-[hsl(var(--chart-3))/0.2] text-[hsl(var(--chart-3))] text-xs font-mono shrink-0">
                    {gap.status}
                  </span>
                  <span className="font-medium">{gap.feature}</span>
                </div>
                <span className="text-sm text-muted-foreground">{gap.note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
