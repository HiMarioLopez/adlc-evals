"use client"

import { useState } from "react"
import { Calculator, Info } from "lucide-react"

export function CostCalculator() {
  const [turns, setTurns] = useState(1000)
  const [model, setModel] = useState<'sonnet' | 'opus' | 'haiku'>('sonnet')

  // Model pricing
  const pricing = {
    sonnet: { input: 3, output: 15, name: 'Claude Sonnet 4.5' },
    opus: { input: 5, output: 25, name: 'Claude Opus 4.5' },
    haiku: { input: 0.8, output: 4, name: 'Claude Haiku 4.5' },
  }

  const selectedModel = pricing[model]

  // AWS calculation
  const awsModelInput = (turns * 1000 / 1_000_000) * selectedModel.input
  const awsModelOutput = (turns * 500 / 1_000_000) * selectedModel.output
  const awsRuntimeCPU = (turns * (1 / 3600)) * 0.0895
  const awsRuntimeMemory = (turns * (4 / 3600) * 1) * 0.00945
  const awsGateway = (turns * 2 / 1000) * 0.005
  const awsMemory = (turns * 4 / 1000) * 0.25
  const awsInfraTotal = awsRuntimeCPU + awsRuntimeMemory + awsGateway + awsMemory
  const awsModelTotal = awsModelInput + awsModelOutput
  const awsTotal = awsModelTotal + awsInfraTotal

  // Vercel calculation
  const vercelCPU = (turns * (1 / 3600)) * 0.128
  const vercelMemory = (turns * (4 / 3600) * 2) * 0.0106
  const vercelCreations = (turns / 1_000_000) * 0.60
  const vercelNetwork = 0.15 // Assuming 1GB
  const vercelInfraTotal = vercelCPU + vercelMemory + vercelCreations + vercelNetwork
  const vercelModelTotal = awsModelTotal // Same model costs
  const vercelTotal = vercelModelTotal + vercelInfraTotal

  const formatCost = (cost: number) => {
    if (cost < 0.01) return `$${cost.toFixed(4)}`
    return `$${cost.toFixed(2)}`
  }

  const infraPercent = (infra: number, total: number) => {
    return ((infra / total) * 100).toFixed(1)
  }

  return (
    <section id="calculator" className="py-24 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary mb-4">
            <Calculator className="w-4 h-4" />
            Interactive Tool
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Cost Scenario Calculator
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Adjust parameters to explore cost implications across different workloads.
          </p>
        </div>

        {/* Controls */}
        <div className="mb-12 p-8 rounded-2xl bg-card border border-border">
          <div className="grid sm:grid-cols-2 gap-8">
            {/* Turns slider */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium">Number of Agent Turns</label>
                <span className="text-2xl font-mono font-bold text-primary">
                  {turns.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={turns}
                onChange={(e) => setTurns(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>100</span>
                <span>10,000</span>
              </div>
            </div>

            {/* Model selector */}
            <div>
              <label className="text-sm font-medium block mb-4">Model Selection</label>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(pricing) as Array<keyof typeof pricing>).map((key) => (
                  <button
                    key={key}
                    onClick={() => setModel(key)}
                    className={`p-3 rounded-xl border transition-all ${
                      model === key
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-muted/50 text-muted-foreground hover:border-primary/50'
                    }`}
                  >
                    <p className="text-xs font-medium">{pricing[key].name.split(' ')[1]}</p>
                    <p className="text-[10px] font-mono mt-1">${pricing[key].input}/M in</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Assumptions */}
          <div className="mt-8 pt-8 border-t border-border">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Per-turn assumptions</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
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
        <div className="grid lg:grid-cols-2 gap-6">
          {/* AWS */}
          <div className="rounded-2xl border border-aws/30 bg-card overflow-hidden">
            <div className="p-6 border-b border-border bg-aws/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-aws flex items-center justify-center">
                    <span className="text-white font-bold">A</span>
                  </div>
                  <h3 className="font-semibold">AWS Total Cost</h3>
                </div>
                <p className="text-3xl font-bold font-mono text-aws">{formatCost(awsTotal)}</p>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Model Costs</span>
                  <span className="font-mono">{formatCost(awsModelTotal)}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full bg-aws/80 transition-all duration-500"
                    style={{ width: `${100 - parseFloat(infraPercent(awsInfraTotal, awsTotal))}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Infrastructure</span>
                  <span className="font-mono">{formatCost(awsInfraTotal)}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full bg-aws/40 transition-all duration-500"
                    style={{ width: `${infraPercent(awsInfraTotal, awsTotal)}%` }}
                  />
                </div>
              </div>
              <div className="pt-4 border-t border-border grid grid-cols-2 gap-4 text-xs">
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
          <div className="rounded-2xl border border-primary/30 bg-card overflow-hidden">
            <div className="p-6 border-b border-border bg-primary/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-foreground flex items-center justify-center">
                    <svg className="w-6 h-6 text-background" viewBox="0 0 76 65" fill="currentColor">
                      <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold">Vercel Total Cost</h3>
                </div>
                <p className="text-3xl font-bold font-mono text-primary">{formatCost(vercelTotal)}</p>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Model Costs</span>
                  <span className="font-mono">{formatCost(vercelModelTotal)}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full bg-primary/80 transition-all duration-500"
                    style={{ width: `${100 - parseFloat(infraPercent(vercelInfraTotal, vercelTotal))}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Infrastructure</span>
                  <span className="font-mono">{formatCost(vercelInfraTotal)}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full bg-primary/40 transition-all duration-500"
                    style={{ width: `${infraPercent(vercelInfraTotal, vercelTotal)}%` }}
                  />
                </div>
              </div>
              <div className="pt-4 border-t border-border grid grid-cols-2 gap-4 text-xs">
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

        {/* Note */}
        <div className="mt-8 p-4 rounded-xl bg-muted/50 border border-border">
          <p className="text-xs text-muted-foreground text-center">
            Model costs via AI Gateway are pass-through at provider list prices with no markup. 
            All calculations use published pricing as of January 2026.
          </p>
        </div>
      </div>
    </section>
  )
}
