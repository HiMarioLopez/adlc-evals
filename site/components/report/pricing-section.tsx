"use client";

import { AlertTriangle, DollarSign, Info, TrendingUp } from "lucide-react";

const modelPricing = [
  {
    model: "Claude Opus 4.5",
    input: "$5.00",
    output: "$25.00",
    tier: "flagship",
  },
  {
    model: "Claude Sonnet 4.5",
    input: "$3.00",
    output: "$15.00",
    tier: "balanced",
  },
  { model: "Claude Haiku 4.5", input: "$1.00", output: "$5.00", tier: "fast" },
];

const costBreakdown = {
  vercel: [
    {
      component: "Model (Claude Sonnet 4.5)",
      calc: "2M input × $3 + 0.5M output × $15",
      cost: "$13.50",
    },
    {
      component: "Sandbox SDK (CPU)",
      calc: "1,000 turns × 5s × $0.128/hr",
      cost: "$0.18",
    },
    {
      component: "Sandbox Memory",
      calc: "4 GB × 1.39 hrs × $0.0106/GB-hr",
      cost: "$0.06",
    },
    {
      component: "Sandbox Creations",
      calc: "1,000 × $0.60/1M",
      cost: "$0.0006",
    },
    { component: "Network (1 GB)", calc: "1 GB × $0.15", cost: "$0.15" },
  ],
  aws: [
    {
      component: "Model (Claude Sonnet 4.5)",
      calc: "2M input × $3 + 0.5M output × $15",
      cost: "$13.50",
    },
    {
      component: "Bedrock AgentCore Runtime CPU",
      calc: "5,000s × $0.0895/hr",
      cost: "$0.12",
    },
    {
      component: "Bedrock AgentCore Runtime Memory",
      calc: "4 GB × 1.39 hrs × $0.00945/GB-hr",
      cost: "$0.05",
    },
    {
      component: "Gateway Invocations",
      calc: "2,000 tool calls × $0.005/1K",
      cost: "$0.01",
    },
    {
      component: "Memory (short-term)",
      calc: "1,000 × $0.25/1K",
      cost: "$0.25",
    },
  ],
};

const effortLevels = [
  {
    level: "Low",
    multiplier: "~1x baseline",
    impact: "Minimal cost impact",
    color: "primary",
  },
  {
    level: "Medium",
    multiplier: "~2-3x output",
    impact: "Moderate increase",
    color: "chart-3",
  },
  {
    level: "High",
    multiplier: "~5-10x output",
    impact: "2-3x total cost",
    color: "aws",
  },
];

const bedrockTiers = [
  {
    tier: "On-Demand",
    description: "Pay per token",
    discount: "Baseline",
    tooltip: null,
  },
  {
    tier: "Provisioned",
    description: "Reserved capacity",
    discount: "Commitment discount",
    tooltip:
      "Purchase Model Units (MUs) with 1-month or 6-month commitments for guaranteed throughput. Longer commitments = lower hourly rates.",
  },
  {
    tier: "Batch Mode",
    description: "Async processing",
    discount: "50% discount",
    tooltip:
      "Process multiple prompts asynchronously via S3. Results retrieved from bucket when complete. Not supported for provisioned models.",
  },
  {
    tier: "Prompt Caching",
    description: "Cache prompts",
    discount: "Up to 90% off",
    tooltip:
      "Cache frequently-used prompt components to skip recomputation. 5-minute TTL. Cached tokens charged at reduced rate.",
  },
];

export function PricingSection() {
  return (
    <section className="px-6 py-24" id="pricing">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16">
          <span className="mb-4 inline-flex items-center gap-2 font-mono text-primary text-xs uppercase tracking-widest">
            <DollarSign className="h-4 w-4" />
            Section 2
          </span>
          <h2 className="mb-4 font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl">
            2026 Unit Economics
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Cost analysis for 1,000 agent turns with Claude Sonnet 4.5
          </p>
        </div>

        {/* Assumptions banner */}
        <div className="mb-12 rounded-2xl border border-primary/20 bg-primary/5 p-6">
          <p className="mb-4 font-medium text-primary text-xs uppercase tracking-widest">
            Workload Assumptions
          </p>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div>
              <p className="font-bold font-mono text-3xl text-foreground">
                1,000
              </p>
              <p className="text-muted-foreground text-xs">Agent turns</p>
            </div>
            <div>
              <p className="font-bold font-mono text-3xl text-foreground">
                2,000
              </p>
              <p className="text-muted-foreground text-xs">Input tokens/turn</p>
            </div>
            <div>
              <p className="font-bold font-mono text-3xl text-foreground">
                500
              </p>
              <p className="text-muted-foreground text-xs">
                Output tokens/turn
              </p>
            </div>
            <div>
              <p className="font-bold font-mono text-3xl text-foreground">5s</p>
              <p className="text-muted-foreground text-xs">Active CPU/turn</p>
            </div>
          </div>
        </div>

        {/* Model Pricing */}
        <div className="mb-12">
          <h3 className="mb-6 font-semibold text-xl">
            Claude 4.5 Pricing (per 1M tokens)
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {modelPricing.map((model) => (
              <div
                className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/30"
                key={model.model}
              >
                <div className="mb-4 flex items-center gap-2">
                  <span
                    className={`rounded px-2 py-0.5 font-medium text-[10px] uppercase tracking-widest ${
                      model.tier === "flagship"
                        ? "bg-aws/10 text-aws"
                        : model.tier === "balanced"
                          ? "bg-primary/10 text-primary"
                          : "bg-chart-2/10 text-chart-2"
                    }`}
                  >
                    {model.tier}
                  </span>
                </div>
                <h4 className="mb-4 font-medium">{model.model}</h4>
                <div className="flex justify-between gap-4">
                  <div>
                    <p className="mb-1 text-[10px] text-muted-foreground uppercase tracking-widest">
                      Input
                    </p>
                    <p className="font-bold font-mono text-primary text-xl">
                      {model.input}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-[10px] text-muted-foreground uppercase tracking-widest">
                      Output
                    </p>
                    <p className="font-bold font-mono text-chart-2 text-xl">
                      {model.output}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Source Comparison */}
          <div className="mt-6 rounded-xl border border-aws/20 bg-aws/5 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-aws" />
              <div className="text-sm">
                <p className="mb-1 font-medium text-foreground">
                  AWS Bedrock Pricing Note
                </p>
                <p className="text-muted-foreground text-xs">
                  Bedrock{" "}
                  <strong className="text-foreground">global endpoints</strong>{" "}
                  match Anthropic direct pricing (shown above).
                  <strong className="text-aws"> Regional endpoints</strong> add
                  a 10% premium for data residency guarantees. This applies to
                  Claude 4.5+ models.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cost Comparison */}
        <div className="mb-12 grid gap-6 lg:grid-cols-2">
          {/* Vercel */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="flex items-center gap-3 border-border border-b bg-muted/30 px-6 py-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
                <svg
                  className="h-5 w-5 text-background"
                  fill="currentColor"
                  viewBox="0 0 76 65"
                >
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Vercel Stack</h3>
                <p className="text-[10px] text-muted-foreground">
                  AI Gateway passthrough pricing
                </p>
              </div>
            </div>
            <div className="space-y-4 p-6">
              {costBreakdown.vercel.map((item) => (
                <div
                  className="flex items-start justify-between gap-4"
                  key={item.component}
                >
                  <div>
                    <p className="font-medium text-sm">{item.component}</p>
                    <p className="font-mono text-muted-foreground text-xs">
                      {item.calc}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-sm">
                    {item.cost}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between border-border border-t pt-4">
                <span className="font-semibold">Total</span>
                <span className="font-bold font-mono text-2xl text-primary">
                  $13.89
                </span>
              </div>
            </div>
          </div>

          {/* AWS */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="flex items-center gap-3 border-border border-b bg-aws/5 px-6 py-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-aws">
                <span className="font-bold text-white">A</span>
              </div>
              <div>
                <h3 className="font-semibold">AWS Stack</h3>
                <p className="text-[10px] text-muted-foreground">
                  Global endpoint pricing
                </p>
              </div>
            </div>
            <div className="space-y-4 p-6">
              {costBreakdown.aws.map((item) => (
                <div
                  className="flex items-start justify-between gap-4"
                  key={item.component}
                >
                  <div>
                    <p className="font-medium text-sm">{item.component}</p>
                    <p className="font-mono text-muted-foreground text-xs">
                      {item.calc}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-sm">
                    {item.cost}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between border-border border-t pt-4">
                <div>
                  <span className="font-semibold">Total</span>
                  <p className="text-[10px] text-muted-foreground">
                    +$1.35 with regional endpoints
                  </p>
                </div>
                <span className="font-bold font-mono text-2xl text-aws">
                  $13.93
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Insight */}
        <div className="mb-12 rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-transparent to-chart-2/10 p-6">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="mb-1 font-semibold">Key Insight</h4>
                <p className="text-muted-foreground text-sm">
                  Infrastructure costs are negligible compared to model costs.
                  The primary cost driver is{" "}
                  <strong className="text-foreground">LLM inference</strong>.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="font-bold font-mono text-4xl text-primary">97%</p>
                <p className="text-muted-foreground text-xs">Model costs</p>
              </div>
              <div className="text-center">
                <p className="font-bold font-mono text-4xl text-muted-foreground">
                  3%
                </p>
                <p className="text-muted-foreground text-xs">Infrastructure</p>
              </div>
            </div>
          </div>
        </div>

        {/* Effort Tax */}
        <div className="mb-12">
          <div className="mb-6 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-aws" />
            <h3 className="font-semibold text-xl">
              The "Effort" Tax: Extended Thinking
            </h3>
          </div>
          <p className="mb-6 text-muted-foreground text-sm">
            Extended thinking tokens are billed as output tokens on both
            platforms
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {effortLevels.map((effort) => (
              <div
                className={`rounded-2xl border border-border bg-card p-5 hover:border-${effort.color}/30 transition-colors`}
                key={effort.level}
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full bg-${effort.color}`} />
                  <span className="font-medium">{effort.level} Effort</span>
                </div>
                <p className="mb-2 font-mono text-muted-foreground text-sm">
                  {effort.multiplier}
                </p>
                <p className="text-muted-foreground text-xs">{effort.impact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Vercel Tiers */}
        <div className="mb-8">
          <h3 className="mb-6 font-semibold text-xl">Vercel Pricing Tiers</h3>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="rounded-2xl border border-primary/30 bg-card p-5">
              <h4 className="mb-2 font-medium text-primary">On-Demand</h4>
              <p className="mb-3 text-muted-foreground text-xs">
                Pay per token
              </p>
              <span className="inline-block rounded-lg bg-primary/10 px-2 py-1 font-mono text-primary text-xs">
                Baseline
              </span>
            </div>
          </div>
        </div>

        {/* Bedrock Tiers */}
        <div>
          <h3 className="mb-6 font-semibold text-xl">
            Amazon Bedrock Pricing Tiers
          </h3>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {bedrockTiers.map((tier) => (
              <div
                className="group relative rounded-2xl border border-border bg-card p-5"
                key={tier.tier}
              >
                <div className="mb-2 flex items-center gap-1.5">
                  <h4 className="font-medium text-aws">{tier.tier}</h4>
                  {tier.tooltip && (
                    <div className="relative">
                      <Info className="h-3.5 w-3.5 cursor-help text-muted-foreground/50 transition-colors hover:text-aws" />
                      <div className="invisible fixed top-1/2 right-4 bottom-auto left-4 z-50 -translate-y-1/2 rounded-lg border border-border bg-popover px-3 py-2 text-popover-foreground text-xs opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100 sm:absolute sm:top-auto sm:right-auto sm:bottom-full sm:left-1/2 sm:mb-2 sm:w-56 sm:-translate-x-1/2 sm:translate-y-0">
                        {tier.tooltip}
                        <div className="absolute top-full left-1/2 -mt-px hidden -translate-x-1/2 border-4 border-transparent border-t-border sm:block" />
                      </div>
                    </div>
                  )}
                </div>
                <p className="mb-3 text-muted-foreground text-xs">
                  {tier.description}
                </p>
                <span className="inline-block rounded-lg bg-aws/10 px-2 py-1 font-mono text-aws text-xs">
                  {tier.discount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
