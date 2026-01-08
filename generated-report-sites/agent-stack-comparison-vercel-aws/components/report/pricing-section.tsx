"use client"

import { DollarSign, TrendingUp, AlertTriangle, Info } from "lucide-react"

const modelPricing = [
  { model: "Claude Opus 4.5", input: "$5.00", output: "$25.00", tier: "flagship" },
  { model: "Claude Sonnet 4.5", input: "$3.00", output: "$15.00", tier: "balanced" },
  { model: "Claude Haiku 4.5", input: "$1.00", output: "$5.00", tier: "fast" },
]

const costBreakdown = {
  vercel: [
    { component: "Model (Claude Sonnet 4.5)", calc: "2M input × $3 + 0.5M output × $15", cost: "$13.50" },
    { component: "Sandbox SDK (CPU)", calc: "1,000 turns × 5s × $0.128/hr", cost: "$0.18" },
    { component: "Sandbox Memory", calc: "4 GB × 1.39 hrs × $0.0106/GB-hr", cost: "$0.06" },
    { component: "Sandbox Creations", calc: "1,000 × $0.60/1M", cost: "$0.0006" },
    { component: "Network (1 GB)", calc: "1 GB × $0.15", cost: "$0.15" },
  ],
  aws: [
    { component: "Model (Claude Sonnet 4.5)", calc: "2M input × $3 + 0.5M output × $15", cost: "$13.50" },
    { component: "Bedrock AgentCore Runtime CPU", calc: "5,000s × $0.0895/hr", cost: "$0.12" },
    { component: "Bedrock AgentCore Runtime Memory", calc: "4 GB × 1.39 hrs × $0.00945/GB-hr", cost: "$0.05" },
    { component: "Gateway Invocations", calc: "2,000 tool calls × $0.005/1K", cost: "$0.01" },
    { component: "Memory (short-term)", calc: "1,000 × $0.25/1K", cost: "$0.25" },
  ],
}

const effortLevels = [
  { level: "Low", multiplier: "~1x baseline", impact: "Minimal cost impact", color: "primary" },
  { level: "Medium", multiplier: "~2-3x output", impact: "Moderate increase", color: "chart-3" },
  { level: "High", multiplier: "~5-10x output", impact: "2-3x total cost", color: "aws" },
]

const bedrockTiers = [
  { tier: "On-Demand", description: "Pay per token", discount: "Baseline", tooltip: null },
  { tier: "Provisioned", description: "Reserved capacity", discount: "Commitment discount", tooltip: "Purchase Model Units (MUs) with 1-month or 6-month commitments for guaranteed throughput. Longer commitments = lower hourly rates." },
  { tier: "Batch Mode", description: "Async processing", discount: "50% discount", tooltip: "Process multiple prompts asynchronously via S3. Results retrieved from bucket when complete. Not supported for provisioned models." },
  { tier: "Prompt Caching", description: "Cache prompts", discount: "Up to 90% off", tooltip: "Cache frequently-used prompt components to skip recomputation. 5-minute TTL. Cached tokens charged at reduced rate." },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary mb-4">
            <DollarSign className="w-4 h-4" />
            Section 2
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            2026 Unit Economics
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Cost analysis for 1,000 agent turns with Claude Sonnet 4.5
          </p>
        </div>

        {/* Assumptions banner */}
        <div className="mb-12 p-6 rounded-2xl border border-primary/20 bg-primary/5">
          <p className="text-xs uppercase tracking-widest text-primary mb-4 font-medium">Workload Assumptions</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <p className="text-3xl font-bold font-mono text-foreground">1,000</p>
              <p className="text-xs text-muted-foreground">Agent turns</p>
            </div>
            <div>
              <p className="text-3xl font-bold font-mono text-foreground">2,000</p>
              <p className="text-xs text-muted-foreground">Input tokens/turn</p>
            </div>
            <div>
              <p className="text-3xl font-bold font-mono text-foreground">500</p>
              <p className="text-xs text-muted-foreground">Output tokens/turn</p>
            </div>
            <div>
              <p className="text-3xl font-bold font-mono text-foreground">5s</p>
              <p className="text-xs text-muted-foreground">Active CPU/turn</p>
            </div>
          </div>
        </div>

        {/* Model Pricing */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6">Claude 4.5 Pricing (per 1M tokens)</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {modelPricing.map((model) => (
              <div
                key={model.model}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-widest font-medium ${
                    model.tier === 'flagship' ? 'bg-aws/10 text-aws' :
                    model.tier === 'balanced' ? 'bg-primary/10 text-primary' :
                    'bg-chart-2/10 text-chart-2'
                  }`}>
                    {model.tier}
                  </span>
                </div>
                <h4 className="font-medium mb-4">{model.model}</h4>
                <div className="flex justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Input</p>
                    <p className="text-xl font-mono font-bold text-primary">{model.input}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Output</p>
                    <p className="text-xl font-mono font-bold text-chart-2">{model.output}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pricing Source Comparison */}
          <div className="mt-6 p-4 rounded-xl border border-aws/20 bg-aws/5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-aws shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-foreground mb-1">AWS Bedrock Pricing Note</p>
                <p className="text-muted-foreground text-xs">
                  Bedrock <strong className="text-foreground">global endpoints</strong> match Anthropic direct pricing (shown above).
                  <strong className="text-aws"> Regional endpoints</strong> add a 10% premium for data residency guarantees.
                  This applies to Claude 4.5+ models.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cost Comparison */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {/* Vercel */}
          <div className="rounded-2xl bg-card border border-border overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-muted/30">
              <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
                <svg className="w-5 h-5 text-background" viewBox="0 0 76 65" fill="currentColor">
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Vercel Stack</h3>
                <p className="text-[10px] text-muted-foreground">AI Gateway passthrough pricing</p>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {costBreakdown.vercel.map((item) => (
                <div key={item.component} className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">{item.component}</p>
                    <p className="text-xs text-muted-foreground font-mono">{item.calc}</p>
                  </div>
                  <span className="font-mono text-sm shrink-0">{item.cost}</span>
                </div>
              ))}
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-2xl font-mono font-bold text-primary">$13.89</span>
              </div>
            </div>
          </div>

          {/* AWS */}
          <div className="rounded-2xl bg-card border border-border overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-aws/5">
              <div className="w-8 h-8 rounded-lg bg-aws flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <div>
                <h3 className="font-semibold">AWS Stack</h3>
                <p className="text-[10px] text-muted-foreground">Global endpoint pricing</p>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {costBreakdown.aws.map((item) => (
                <div key={item.component} className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">{item.component}</p>
                    <p className="text-xs text-muted-foreground font-mono">{item.calc}</p>
                  </div>
                  <span className="font-mono text-sm shrink-0">{item.cost}</span>
                </div>
              ))}
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <span className="font-semibold">Total</span>
                  <p className="text-[10px] text-muted-foreground">+$1.35 with regional endpoints</p>
                </div>
                <span className="text-2xl font-mono font-bold text-aws">$13.93</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Insight */}
        <div className="mb-12 p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-chart-2/10 border border-border">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Key Insight</h4>
                <p className="text-sm text-muted-foreground">
                  Infrastructure costs are negligible compared to model costs. 
                  The primary cost driver is <strong className="text-foreground">LLM inference</strong>.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-4xl font-bold font-mono text-primary">97%</p>
                <p className="text-xs text-muted-foreground">Model costs</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold font-mono text-muted-foreground">3%</p>
                <p className="text-xs text-muted-foreground">Infrastructure</p>
              </div>
            </div>
          </div>
        </div>

        {/* Effort Tax */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-5 h-5 text-aws" />
            <h3 className="text-xl font-semibold">The "Effort" Tax: Extended Thinking</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Extended thinking tokens are billed as output tokens on both platforms
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {effortLevels.map((effort) => (
              <div
                key={effort.level}
                className={`p-5 rounded-2xl bg-card border border-border hover:border-${effort.color}/30 transition-colors`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={`w-2 h-2 rounded-full bg-${effort.color}`} />
                  <span className="font-medium">{effort.level} Effort</span>
                </div>
                <p className="text-sm font-mono text-muted-foreground mb-2">{effort.multiplier}</p>
                <p className="text-xs text-muted-foreground">{effort.impact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Vercel Tiers */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-6">Vercel Pricing Tiers</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-card border border-primary/30">
              <h4 className="font-medium text-primary mb-2">On-Demand</h4>
              <p className="text-xs text-muted-foreground mb-3">Pay per token</p>
              <span className="inline-block px-2 py-1 rounded-lg bg-primary/10 text-xs font-mono text-primary">
                Baseline
              </span>
            </div>
          </div>
        </div>

        {/* Bedrock Tiers */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Amazon Bedrock Pricing Tiers</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {bedrockTiers.map((tier) => (
              <div key={tier.tier} className="p-5 rounded-2xl bg-card border border-border relative group">
                <div className="flex items-center gap-1.5 mb-2">
                  <h4 className="font-medium text-aws">{tier.tier}</h4>
                  {tier.tooltip && (
                    <div className="relative">
                      <Info className="w-3.5 h-3.5 text-muted-foreground/50 hover:text-aws cursor-help transition-colors" />
                      <div className="fixed sm:absolute bottom-auto sm:bottom-full left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 top-1/2 sm:top-auto -translate-y-1/2 sm:translate-y-0 sm:mb-2 px-3 py-2 bg-popover border border-border rounded-lg shadow-lg text-xs text-popover-foreground sm:w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        {tier.tooltip}
                        <div className="hidden sm:block absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-border" />
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-3">{tier.description}</p>
                <span className="inline-block px-2 py-1 rounded-lg bg-aws/10 text-xs font-mono text-aws">
                  {tier.discount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
