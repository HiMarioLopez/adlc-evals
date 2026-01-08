"use client"

const modelPricing = [
  { model: "Claude Opus 4.5", input: "$5.00", output: "$25.00" },
  { model: "Claude Sonnet 4.5", input: "$3.00", output: "$15.00" },
  { model: "Claude Haiku 4.5", input: "$0.80", output: "$4.00" }
]

const effortTax = [
  { level: "Low", multiplier: "~1x baseline", impact: "Minimal" },
  { level: "Medium", multiplier: "~2-3x output tokens", impact: "Moderate increase" },
  { level: "High", multiplier: "~5-10x output tokens", impact: "Significant (2-3x total cost)" }
]

const securityCosts = {
  vercel: { base: "$6,500", data100gb: "$180", total100gb: "$6,680", total1tb: "$8,300" },
  aws: { base: "~$1,446", data100gb: "$66", total100gb: "~$1,512", total1tb: "~$2,106" }
}

const bedrockTiers = [
  { tier: "On-Demand", description: "Pay per token, no commitment", discount: "Baseline" },
  { tier: "Provisioned Throughput", description: "Reserved capacity", discount: "Commitment discount" },
  { tier: "Batch Mode", description: "Async processing", discount: "50% discount" },
  { tier: "Prompt Caching", description: "Cache repeated prompts", discount: "Up to 90% reduction" }
]

const costBreakdown = {
  vercel: [
    { component: "Model (Claude Sonnet 4.5)", calc: "2M input × $3 + 0.5M output × $15", cost: "$13.50" },
    { component: "Sandbox SDK CPU", calc: "1,000 turns × 5s × $0.128/hr", cost: "$0.18" },
    { component: "Sandbox Memory", calc: "4 GB × 1.39 hrs × $0.0106/GB-hr", cost: "$0.06" },
    { component: "Sandbox Creations", calc: "1,000 × $0.60/1M", cost: "$0.0006" },
    { component: "Network (1 GB)", calc: "1 GB × $0.15", cost: "$0.15" }
  ],
  aws: [
    { component: "Model (Claude Sonnet 4.5)", calc: "2M input × $3 + 0.5M output × $15", cost: "$13.50" },
    { component: "AgentCore Runtime CPU", calc: "5,000s × $0.0895/hr", cost: "$0.12" },
    { component: "AgentCore Runtime Memory", calc: "4 GB × 1.39 hrs × $0.00945/GB-hr", cost: "$0.05" },
    { component: "Gateway Invocations", calc: "2,000 tool calls × $0.005/1K", cost: "$0.01" },
    { component: "Memory (short-term)", calc: "1,000 × $0.25/1K", cost: "$0.25" }
  ]
}

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-6 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">2026 Unit Economics</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Cost analysis for 1,000 agent turns with Claude Sonnet 4.5
          </p>
        </div>

        {/* Model Pricing */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4">Claude 4.5 Pricing (per 1M tokens)</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {modelPricing.map((model) => (
              <div
                key={model.model}
                className="p-5 rounded-xl bg-card border border-border text-center"
              >
                <h4 className="font-medium mb-3">{model.model}</h4>
                <div className="flex justify-center gap-6">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Input</p>
                    <p className="text-lg font-mono text-[hsl(var(--accent))]">{model.input}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Output</p>
                    <p className="text-lg font-mono text-[hsl(var(--chart-2))]">{model.output}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cost Comparison */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {/* Vercel Stack */}
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-foreground flex items-center justify-center">
                <svg className="w-6 h-6 text-background" viewBox="0 0 76 65" fill="currentColor">
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Vercel Stack Costs</h3>
            </div>
            <div className="space-y-3">
              {costBreakdown.vercel.map((item) => (
                <div key={item.component} className="flex items-center justify-between py-2 border-b border-border/50">
                  <div>
                    <p className="text-sm font-medium">{item.component}</p>
                    <p className="text-xs text-muted-foreground font-mono">{item.calc}</p>
                  </div>
                  <span className="font-mono text-foreground">{item.cost}</span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-4">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-mono font-bold text-[hsl(var(--accent))]">$13.89</span>
              </div>
            </div>
          </div>

          {/* AWS Stack */}
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[hsl(var(--aws))] flex items-center justify-center">
                <span className="text-background font-bold">A</span>
              </div>
              <h3 className="text-xl font-semibold">AWS Stack Costs</h3>
            </div>
            <div className="space-y-3">
              {costBreakdown.aws.map((item) => (
                <div key={item.component} className="flex items-center justify-between py-2 border-b border-border/50">
                  <div>
                    <p className="text-sm font-medium">{item.component}</p>
                    <p className="text-xs text-muted-foreground font-mono">{item.calc}</p>
                  </div>
                  <span className="font-mono text-foreground">{item.cost}</span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-4">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-mono font-bold text-[hsl(var(--aws))]">$13.93</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Insight */}
        <div className="p-6 rounded-xl bg-secondary/50 border border-border mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h4 className="font-semibold mb-1">Key Insight</h4>
              <p className="text-muted-foreground">
                Infrastructure costs are negligible compared to model costs (~3%). The primary cost driver is <strong className="text-foreground">LLM inference</strong>.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold font-mono">97%</p>
                <p className="text-xs text-muted-foreground">Model costs</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold font-mono text-muted-foreground">3%</p>
                <p className="text-xs text-muted-foreground">Infrastructure</p>
              </div>
            </div>
          </div>
        </div>

        {/* Extended Thinking / Effort Tax */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-2">The &quot;Effort&quot; Tax: Anthropic Extended Thinking</h3>
          <p className="text-muted-foreground text-sm mb-4">Extended thinking tokens are billed as output tokens on both platforms</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {effortTax.map((item) => (
              <div key={item.level} className="p-5 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`w-2 h-2 rounded-full ${
                    item.level === "Low" ? "bg-[hsl(var(--accent))]" : 
                    item.level === "Medium" ? "bg-[hsl(var(--chart-3))]" : 
                    "bg-[hsl(var(--chart-2))]"
                  }`} />
                  <span className="font-medium">{item.level} Effort</span>
                </div>
                <p className="text-sm font-mono text-muted-foreground mb-2">{item.multiplier}</p>
                <p className="text-xs text-muted-foreground">{item.impact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bedrock Pricing Tiers */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4">Amazon Bedrock Pricing Tiers</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {bedrockTiers.map((tier) => (
              <div key={tier.tier} className="p-4 rounded-xl bg-card border border-border">
                <h4 className="font-medium mb-2 text-[hsl(var(--aws))]">{tier.tier}</h4>
                <p className="text-sm text-muted-foreground mb-3">{tier.description}</p>
                <span className="px-2 py-1 rounded bg-[hsl(var(--aws))/0.1] text-xs font-mono">
                  {tier.discount}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Security/Network Cost Comparison */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Security/Network Cost Comparison</h3>
          <p className="text-muted-foreground text-sm mb-6">Annual costs for network isolation infrastructure</p>
          
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 border-b border-border text-muted-foreground font-medium">Scenario</th>
                  <th className="text-left p-4 border-b border-border font-medium">Vercel Secure Compute</th>
                  <th className="text-left p-4 border-b border-border font-medium">AWS (NAT Gateway + PrivateLink, 3 AZ)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-secondary/30">
                  <td className="p-4 border-b border-border text-muted-foreground">Annual base cost</td>
                  <td className="p-4 border-b border-border font-mono">{securityCosts.vercel.base}</td>
                  <td className="p-4 border-b border-border font-mono">{securityCosts.aws.base}</td>
                </tr>
                <tr className="hover:bg-secondary/30">
                  <td className="p-4 border-b border-border text-muted-foreground">Data (100 GB/mo × 12)</td>
                  <td className="p-4 border-b border-border font-mono">{securityCosts.vercel.data100gb} <span className="text-xs text-muted-foreground">($0.15/GB)</span></td>
                  <td className="p-4 border-b border-border font-mono">{securityCosts.aws.data100gb} <span className="text-xs text-muted-foreground">($0.055/GB)</span></td>
                </tr>
                <tr className="hover:bg-secondary/30">
                  <td className="p-4 border-b border-border text-muted-foreground">Total annual (100 GB/mo)</td>
                  <td className="p-4 border-b border-border font-mono font-semibold">{securityCosts.vercel.total100gb}</td>
                  <td className="p-4 border-b border-border font-mono font-semibold text-[hsl(var(--accent))]">{securityCosts.aws.total100gb}</td>
                </tr>
                <tr className="hover:bg-secondary/30">
                  <td className="p-4 border-b border-border text-muted-foreground">Total annual (1 TB/mo)</td>
                  <td className="p-4 border-b border-border font-mono font-semibold">{securityCosts.vercel.total1tb}</td>
                  <td className="p-4 border-b border-border font-mono font-semibold text-[hsl(var(--accent))]">{securityCosts.aws.total1tb}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-lg bg-[hsl(var(--chart-3))/0.08] border border-[hsl(var(--chart-3))/0.2]">
            <div className="flex items-start gap-3">
              <span className="text-[hsl(var(--chart-3))]">⚠️</span>
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Trade-off:</strong> AWS is 3-4× cheaper for network isolation but requires VPC configuration, IAM policies, and operational overhead. Vercel Secure Compute is fully managed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
