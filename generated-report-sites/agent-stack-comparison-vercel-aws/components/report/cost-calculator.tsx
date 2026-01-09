"use client";

import {
  Calculator,
  ChevronDown,
  ExternalLink,
  Info,
  Network,
} from "lucide-react";
import { useEffect, useState } from "react";

export function CostCalculator() {
  const [turns, setTurns] = useState(1000);
  const [model, setModel] = useState<"sonnet" | "opus" | "haiku">("sonnet");
  const [useBedrockRegional, setUseBedrockRegional] = useState(true);
  const [showFloatingBar, setShowFloatingBar] = useState(false);

  // Track scroll position to show floating bar when controls are visible but results aren't
  useEffect(() => {
    const handleScroll = () => {
      const controlsEl = document.getElementById("calculator-controls");
      const resultsEl = document.getElementById("calculator-results");

      if (!(controlsEl && resultsEl)) {
        return;
      }

      const controlsRect = controlsEl.getBoundingClientRect();
      const resultsRect = resultsEl.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Show floating bar when:
      // - Controls are at least partially visible (top is above viewport bottom)
      // - Results are not visible (top is below viewport)
      const controlsInView =
        controlsRect.top < windowHeight && controlsRect.bottom > 0;
      const resultsNotVisible = resultsRect.top > windowHeight - 80;

      setShowFloatingBar(
        controlsInView && resultsNotVisible && window.innerWidth < 1024
      );
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Model pricing (Anthropic direct / Vercel AI Gateway passthrough pricing per MTok)
  const pricing = {
    sonnet: { input: 3, output: 15, name: "Claude Sonnet 4.5" },
    opus: { input: 5, output: 25, name: "Claude Opus 4.5" },
    haiku: { input: 1, output: 5, name: "Claude Haiku 4.5" },
  };

  // Bedrock regional endpoint premium (10% markup for Claude 4.5+ models)
  const bedrockRegionalPremium = 1.1;

  const selectedModel = pricing[model];

  // AWS calculation (with optional regional endpoint 10% premium)
  const awsPremium = useBedrockRegional ? bedrockRegionalPremium : 1.0;
  const awsModelInput =
    ((turns * 1000) / 1_000_000) * selectedModel.input * awsPremium;
  const awsModelOutput =
    ((turns * 500) / 1_000_000) * selectedModel.output * awsPremium;
  const awsRuntimeCPU = turns * (1 / 3600) * 0.0895;
  const awsRuntimeMemory = turns * (4 / 3600) * 1 * 0.009_45;
  const awsGateway = ((turns * 2) / 1000) * 0.005;
  const awsMemory = ((turns * 4) / 1000) * 0.25;
  const awsInfraTotal =
    awsRuntimeCPU + awsRuntimeMemory + awsGateway + awsMemory;
  const awsModelTotal = awsModelInput + awsModelOutput;
  const awsTotal = awsModelTotal + awsInfraTotal;

  // Vercel calculation
  const vercelCPU = turns * (1 / 3600) * 0.128;
  const vercelMemory = turns * (4 / 3600) * 2 * 0.0106;
  const vercelCreations = (turns / 1_000_000) * 0.6;
  const vercelNetwork = 0.15; // Assuming 1GB
  const vercelInfraTotal =
    vercelCPU + vercelMemory + vercelCreations + vercelNetwork;
  const vercelModelTotal = awsModelTotal; // Same model costs
  const vercelTotal = vercelModelTotal + vercelInfraTotal;

  const formatCost = (cost: number) => {
    if (cost < 0.01) {
      return `$${cost.toFixed(4)}`;
    }
    return `$${cost.toFixed(2)}`;
  };

  const infraPercent = (infra: number, total: number) => {
    return ((infra / total) * 100).toFixed(1);
  };

  return (
    <section className="bg-muted/30 px-6 py-24" id="calculator">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16">
          <span className="mb-4 inline-flex items-center gap-2 font-mono text-primary text-xs uppercase tracking-widest">
            <Calculator className="h-4 w-4" />
            Interactive Tool
          </span>
          <h2 className="mb-4 font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl">
            Cost Scenario Calculator
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Adjust parameters to explore cost implications across different
            workloads.
          </p>
        </div>

        {/* Controls */}
        <div
          className="mb-12 rounded-2xl border border-border bg-card p-8"
          id="calculator-controls"
        >
          <div className="grid gap-8 sm:grid-cols-2">
            {/* Turns slider */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <label className="font-medium text-sm">
                  Number of Agent Turns
                </label>
                <span className="font-bold font-mono text-2xl text-primary">
                  {turns.toLocaleString()}
                </span>
              </div>
              <input
                className="w-full"
                max="10000"
                min="100"
                onChange={(e) => setTurns(Number(e.target.value))}
                step="100"
                type="range"
                value={turns}
              />
              <div className="mt-2 flex justify-between text-muted-foreground text-xs">
                <span>100</span>
                <span>10,000</span>
              </div>
            </div>

            {/* Model selector */}
            <div>
              <label className="mb-4 block font-medium text-sm">
                Model Selection
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["haiku", "sonnet", "opus"] as const).map((key) => (
                  <button
                    className={`rounded-xl border p-3 transition-all ${
                      model === key
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-muted/50 text-muted-foreground hover:border-primary/50"
                    }`}
                    key={key}
                    onClick={() => setModel(key)}
                  >
                    <p className="font-medium text-xs">
                      {pricing[key].name.split(" ")[1]}
                    </p>
                    <p className="mt-1 font-mono text-[10px]">
                      ${pricing[key].input}/M in
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bedrock Regional Toggle */}
          <div className="mt-8 border-border border-t pt-8">
            <div className="flex items-start gap-4">
              <button
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  useBedrockRegional ? "bg-aws" : "bg-muted"
                }`}
                onClick={() => setUseBedrockRegional(!useBedrockRegional)}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                    useBedrockRegional ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">
                    Use Bedrock Regional Endpoints
                  </span>
                  {useBedrockRegional && (
                    <span className="rounded bg-aws/10 px-2 py-0.5 font-mono text-[10px] text-aws">
                      +10% premium
                    </span>
                  )}
                </div>
                <p className="mt-1 text-muted-foreground text-xs">
                  Regional endpoints guarantee data routing within specific AWS
                  regions. Global endpoints (default) route dynamically for
                  maximum availability.
                </p>
              </div>
            </div>
          </div>

          {/* Assumptions */}
          <div className="mt-8 border-border border-t pt-8">
            <div className="mb-4 flex items-center gap-2">
              <Info className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground text-xs">
                Per-turn assumptions
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
              <div>
                <span className="text-muted-foreground">Input tokens:</span>
                <span className="ml-2 font-mono">1,000</span>
              </div>
              <div>
                <span className="text-muted-foreground">Output tokens:</span>
                <span className="ml-2 font-mono">500</span>
              </div>
              <div>
                <span className="text-muted-foreground">Active CPU:</span>
                <span className="ml-2 font-mono">1 second</span>
              </div>
              <div>
                <span className="text-muted-foreground">Memory:</span>
                <span className="ml-2 font-mono">1-2 GB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid gap-6 lg:grid-cols-2" id="calculator-results">
          {/* AWS */}
          <div className="overflow-hidden rounded-2xl border border-aws/30 bg-card">
            <div className="border-border border-b bg-aws/5 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-aws">
                    <span className="font-bold text-white">A</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">AWS Total Cost</h3>
                    {useBedrockRegional && (
                      <p className="font-medium text-[10px] text-aws">
                        Regional endpoints (+10%)
                      </p>
                    )}
                  </div>
                </div>
                <p className="font-bold font-mono text-3xl text-aws">
                  {formatCost(awsTotal)}
                </p>
              </div>
            </div>
            <div className="space-y-4 p-6">
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-muted-foreground">Model Costs</span>
                  <span className="font-mono">{formatCost(awsModelTotal)}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-aws/80 transition-all duration-500"
                    style={{
                      width: `${100 - Number.parseFloat(infraPercent(awsInfraTotal, awsTotal))}%`,
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-muted-foreground">Infrastructure</span>
                  <span className="font-mono">{formatCost(awsInfraTotal)}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-aws/40 transition-all duration-500"
                    style={{
                      width: `${infraPercent(awsInfraTotal, awsTotal)}%`,
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 border-border border-t pt-4 text-xs">
                <div className="space-y-1">
                  <p className="text-muted-foreground">Runtime CPU</p>
                  <p className="font-mono">{formatCost(awsRuntimeCPU)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Runtime Memory</p>
                  <p className="font-mono">{formatCost(awsRuntimeMemory)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Gateway Ops</p>
                  <p className="font-mono">{formatCost(awsGateway)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Short-term Memory</p>
                  <p className="font-mono">{formatCost(awsMemory)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Vercel */}
          <div className="overflow-hidden rounded-2xl border border-primary/30 bg-card">
            <div className="border-border border-b bg-primary/5 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground">
                    <svg
                      className="h-6 w-6 text-background"
                      fill="currentColor"
                      viewBox="0 0 76 65"
                    >
                      <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold">Vercel Total Cost</h3>
                </div>
                <p className="font-bold font-mono text-3xl text-primary">
                  {formatCost(vercelTotal)}
                </p>
              </div>
            </div>
            <div className="space-y-4 p-6">
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-muted-foreground">Model Costs</span>
                  <span className="font-mono">
                    {formatCost(vercelModelTotal)}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-primary/80 transition-all duration-500"
                    style={{
                      width: `${100 - Number.parseFloat(infraPercent(vercelInfraTotal, vercelTotal))}%`,
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-muted-foreground">Infrastructure</span>
                  <span className="font-mono">
                    {formatCost(vercelInfraTotal)}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-primary/40 transition-all duration-500"
                    style={{
                      width: `${infraPercent(vercelInfraTotal, vercelTotal)}%`,
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 border-border border-t pt-4 text-xs">
                <div className="space-y-1">
                  <p className="text-muted-foreground">Active CPU</p>
                  <p className="font-mono">{formatCost(vercelCPU)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Provisioned Memory</p>
                  <p className="font-mono">{formatCost(vercelMemory)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Sandbox Creations</p>
                  <p className="font-mono">{formatCost(vercelCreations)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Network (1GB est.)</p>
                  <p className="font-mono">{formatCost(vercelNetwork)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Gateway Resilience Callout */}
        <div className="mt-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15">
              <Network className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="mb-2 font-semibold">
                Vercel AI Gateway: Built-in Resilience
              </h4>
              <p className="mb-4 text-muted-foreground text-sm">
                AI Gateway provides{" "}
                <strong className="text-foreground">
                  automatic provider failover
                </strong>{" "}
                and <strong className="text-foreground">model fallbacks</strong>{" "}
                out of the box. If a provider is down or a model fails (context
                limits, unsupported inputs, outages), requests automatically
                route to backup providers or fallback models.
              </p>

              <div className="mb-4 grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-border bg-background/60 p-3">
                  <p className="font-bold font-mono text-2xl text-primary">
                    10-14%
                  </p>
                  <p className="text-muted-foreground text-xs">
                    P99 latency improvement
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-background/60 p-3">
                  <p className="font-bold font-mono text-2xl text-primary">
                    24.3%
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Error rate reduction
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-background/60 p-3">
                  <p className="font-bold font-mono text-2xl text-primary">
                    0%
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Markup on inference
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 text-xs">
                <a
                  className="inline-flex items-center gap-1 text-primary hover:underline"
                  href="https://vercel.com/changelog/model-fallbacks-now-available-in-vercel-ai-gateway"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Model Fallbacks Changelog <ExternalLink className="h-3 w-3" />
                </a>
                <a
                  className="inline-flex items-center gap-1 text-primary hover:underline"
                  href="https://cline.bot/blog/cline-provider-now-runs-on-vercel"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Cline Production Metrics <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Mobile Cost Summary */}
      <div
        className={`fixed right-0 bottom-0 left-0 z-50 transition-all duration-300 lg:hidden ${
          showFloatingBar
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-full opacity-0"
        }`}
      >
        <div className="border-border border-t bg-card/95 shadow-2xl backdrop-blur-lg">
          <div className="px-4 py-3">
            {/* Cost comparison row */}
            <div className="flex items-center justify-between gap-3">
              {/* AWS */}
              <div className="flex flex-1 items-center gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-aws">
                  <span className="font-bold text-white text-xs">A</span>
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[10px] text-muted-foreground">
                    AWS
                  </p>
                  <p className="font-bold font-mono text-aws text-lg leading-none">
                    {formatCost(awsTotal)}
                  </p>
                </div>
              </div>

              {/* VS divider */}
              <div className="font-medium text-muted-foreground text-xs">
                vs
              </div>

              {/* Vercel */}
              <div className="flex flex-1 items-center justify-end gap-2">
                <div className="min-w-0 text-right">
                  <p className="truncate text-[10px] text-muted-foreground">
                    Vercel
                  </p>
                  <p className="font-bold font-mono text-lg text-primary leading-none">
                    {formatCost(vercelTotal)}
                  </p>
                </div>
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-foreground">
                  <svg
                    className="h-4 w-4 text-background"
                    fill="currentColor"
                    viewBox="0 0 76 65"
                  >
                    <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Scroll hint */}
            <button
              className="mt-2 flex w-full items-center justify-center gap-1 text-[10px] text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => {
                document
                  .getElementById("calculator-results")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              <span>Scroll for details</span>
              <ChevronDown className="h-3 w-3 animate-bounce" />
            </button>
          </div>

          {/* Drag handle indicator */}
          <div className="flex justify-center pb-2">
            <div className="h-1 w-12 rounded-full bg-muted-foreground/30" />
          </div>
        </div>
      </div>
    </section>
  );
}
