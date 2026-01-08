"use client"

import { useState } from "react"

export function CostCalculator() {
  const [turns, setTurns] = useState(1000)

  // AWS calculation based on report assumptions
  const awsModelInput = (turns * 1000 / 1_000_000) * 3 // Claude Sonnet 4.5 input
  const awsModelOutput = (turns * 500 / 1_000_000) * 15 // Claude Sonnet 4.5 output
  const awsRuntimeCPU = (turns * (1 / 3600)) * 0.0895
  const awsRuntimeMemory = (turns * (4 / 3600) * 1) * 0.00945
  const awsGateway = (turns * 2 / 1000) * 0.005
  const awsMemory = (turns * 4 / 1000) * 0.25
  const awsTotal = awsModelInput + awsModelOutput + awsRuntimeCPU + awsRuntimeMemory + awsGateway + awsMemory

  // Vercel Sandbox calculation
  const vercelCPU = (turns * (1 / 3600)) * 0.128
  const vercelMemory = (turns * (4 / 3600) * 2) * 0.0106
  const vercelCreations = (turns / 1_000_000) * 0.60
  const vercelSandboxTotal = vercelCPU + vercelMemory + vercelCreations

  return (
    <section className="py-24 px-6" id="calculator">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <span className="text-xs font-mono text-primary uppercase tracking-widest">Section 3c/3d</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Cost Scenario Calculator</h2>
          <p className="text-muted-foreground max-w-2xl">
            Interactive baseline scenario based on explicit workload assumptions from the report.
          </p>
        </div>

        {/* Assumptions card */}
        <div className="border border-border rounded-lg bg-card/50 backdrop-blur-sm p-6 mb-8">
          <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-4">Workload Assumptions (per turn)</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-2xl font-bold font-mono text-primary">1,000</p>
              <p className="text-xs text-muted-foreground">Input tokens</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-mono text-primary">500</p>
              <p className="text-xs text-muted-foreground">Output tokens</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-mono text-primary">4s</p>
              <p className="text-xs text-muted-foreground">Session length</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-mono text-primary">1 vCPU</p>
              <p className="text-xs text-muted-foreground">Active CPU (1s)</p>
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="mb-12">
          <label className="block text-sm font-medium mb-4">
            Number of turns: <span className="text-primary font-mono">{turns.toLocaleString()}</span>
          </label>
          <input
            type="range"
            min="100"
            max="10000"
            step="100"
            value={turns}
            onChange={(e) => setTurns(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>100</span>
            <span>10,000</span>
          </div>
        </div>

        {/* Cost breakdown */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* AWS Breakdown */}
          <div className="border border-aws/30 rounded-lg bg-card/50 backdrop-blur-sm overflow-hidden">
            <div className="p-6 border-b border-border bg-aws/5">
              <h3 className="font-semibold text-aws">AWS Total Cost</h3>
              <p className="text-4xl font-bold font-mono mt-2">${awsTotal.toFixed(2)}</p>
            </div>
            <div className="p-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Model (input)</span>
                <span className="font-mono">${awsModelInput.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Model (output)</span>
                <span className="font-mono">${awsModelOutput.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Runtime CPU</span>
                <span className="font-mono">${awsRuntimeCPU.toFixed(4)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Runtime Memory</span>
                <span className="font-mono">${awsRuntimeMemory.toFixed(4)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Gateway MCP ops</span>
                <span className="font-mono">${awsGateway.toFixed(4)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Short-term memory</span>
                <span className="font-mono">${awsMemory.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Vercel Sandbox Breakdown */}
          <div className="border border-primary/30 rounded-lg bg-card/50 backdrop-blur-sm overflow-hidden">
            <div className="p-6 border-b border-border bg-primary/5">
              <h3 className="font-semibold text-primary">Vercel Sandbox Cost</h3>
              <p className="text-4xl font-bold font-mono mt-2">${vercelSandboxTotal.toFixed(4)}</p>
              <p className="text-xs text-muted-foreground mt-1">Execution only (excludes model costs)</p>
            </div>
            <div className="p-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Active CPU</span>
                <span className="font-mono">${vercelCPU.toFixed(4)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Provisioned Memory</span>
                <span className="font-mono">${vercelMemory.toFixed(4)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sandbox Creations</span>
                <span className="font-mono">${vercelCreations.toFixed(6)}</span>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Note: Model costs via AI Gateway are pass-through at provider list prices with no markup.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
