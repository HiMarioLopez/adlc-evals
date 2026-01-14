"use client";

import { AlertTriangle, DollarSign, Info, TrendingUp } from "lucide-react";
import type { PricingData } from "@/data/report-schema";

interface PricingSectionProps {
  data: PricingData;
}

export function PricingSection({ data }: PricingSectionProps) {
  return (
    <section className="px-6 py-24" id="pricing">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16">
          <span className="mb-4 inline-flex items-center gap-2 font-mono text-primary text-xs uppercase tracking-widest">
            <DollarSign className="h-4 w-4" />
            Section {data.sectionNumber}
          </span>
          <h2 className="mb-4 font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl">
            {data.title}
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            {data.description}
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
                {data.workloadAssumptions.turns.toLocaleString()}
              </p>
              <p className="text-muted-foreground text-xs">Agent turns</p>
            </div>
            <div>
              <p className="font-bold font-mono text-3xl text-foreground">
                {data.workloadAssumptions.inputTokensPerTurn.toLocaleString()}
              </p>
              <p className="text-muted-foreground text-xs">Input tokens/turn</p>
            </div>
            <div>
              <p className="font-bold font-mono text-3xl text-foreground">
                {data.workloadAssumptions.outputTokensPerTurn}
              </p>
              <p className="text-muted-foreground text-xs">
                Output tokens/turn
              </p>
            </div>
            <div>
              <p className="font-bold font-mono text-3xl text-foreground">
                {data.workloadAssumptions.activeCpuPerTurn}
              </p>
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
            {data.modelPricing.map((model) => (
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
                  {data.bedrockPricingNote}
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
              {data.costBreakdown.vercel.map((item) => (
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
                  {data.costBreakdown.vercelTotal}
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
              {data.costBreakdown.aws.map((item) => (
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
                  {data.costBreakdown.awsRegionalNote && (
                    <p className="text-[10px] text-muted-foreground">
                      {data.costBreakdown.awsRegionalNote}
                    </p>
                  )}
                </div>
                <span className="font-bold font-mono text-2xl text-aws">
                  {data.costBreakdown.awsTotal}
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
                <h4 className="mb-1 font-semibold">{data.keyInsight.title}</h4>
                <p className="text-muted-foreground text-sm">
                  {data.keyInsight.description
                    .split("LLM inference")
                    .map((part, i, arr) =>
                      i < arr.length - 1 ? (
                        <span key={i}>
                          {part}
                          <strong className="text-foreground">
                            LLM inference
                          </strong>
                        </span>
                      ) : (
                        <span key={i}>{part}</span>
                      )
                    )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="font-bold font-mono text-4xl text-primary">
                  {data.keyInsight.modelPercent}%
                </p>
                <p className="text-muted-foreground text-xs">Model costs</p>
              </div>
              <div className="text-center">
                <p className="font-bold font-mono text-4xl text-muted-foreground">
                  {data.keyInsight.infraPercent}%
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
            {data.effortLevels.map((effort) => (
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
            {data.bedrockTiers.map((tier) => (
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
