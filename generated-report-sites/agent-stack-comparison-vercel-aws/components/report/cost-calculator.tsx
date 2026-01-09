"use client"

import { useState, useEffect } from "react"
import { Calculator, Info, AlertCircle, Network, ExternalLink, ChevronDown } from "lucide-react"

export function CostCalculator() {
  const [turns, setTurns] = useState(1000)
  const [model, setModel] = useState<'sonnet' | 'opus' | 'haiku'>('sonnet')
  const [useBedrockRegional, setUseBedrockRegional] = useState(true)
  const [showFloatingBar, setShowFloatingBar] = useState(false)

  // Track scroll position to show floating bar when controls are visible but results aren't
  useEffect(() => {
    const handleScroll = () => {
      const controlsEl = document.getElementById('calculator-controls')
      const resultsEl = document.getElementById('calculator-results')
      
      if (!controlsEl || !resultsEl) return
      
      const controlsRect = controlsEl.getBoundingClientRect()
      const resultsRect = resultsEl.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Show floating bar when:
      // - Controls are at least partially visible (top is above viewport bottom)
      // - Results are not visible (top is below viewport)
      const controlsInView = controlsRect.top < windowHeight && controlsRect.bottom > 0
      const resultsNotVisible = resultsRect.top > windowHeight - 80
      
      setShowFloatingBar(controlsInView && resultsNotVisible && window.innerWidth < 1024)
    }
    
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  // Model pricing (Anthropic direct / Vercel AI Gateway passthrough pricing per MTok)
  const pricing = {
    sonnet: { input: 3, output: 15, name: 'Claude Sonnet 4.5' },
    opus: { input: 5, output: 25, name: 'Claude Opus 4.5' },
    haiku: { input: 1, output: 5, name: 'Claude Haiku 4.5' },
  }
  
  // Bedrock regional endpoint premium (10% markup for Claude 4.5+ models)
  const bedrockRegionalPremium = 1.10

  const selectedModel = pricing[model]

  // AWS calculation (with optional regional endpoint 10% premium)
  const awsPremium = useBedrockRegional ? bedrockRegionalPremium : 1.0
  const awsModelInput = (turns * 1000 / 1_000_000) * selectedModel.input * awsPremium
  const awsModelOutput = (turns * 500 / 1_000_000) * selectedModel.output * awsPremium
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
        <div id="calculator-controls" className="mb-12 p-8 rounded-2xl bg-card border border-border">
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
                {(['haiku', 'sonnet', 'opus'] as const).map((key) => (
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

          {/* Bedrock Regional Toggle */}
          <div className="mt-8 pt-8 border-t border-border">
            <div className="flex items-start gap-4">
              <button
                onClick={() => setUseBedrockRegional(!useBedrockRegional)}
                className={`shrink-0 w-11 h-6 rounded-full transition-colors relative ${
                  useBedrockRegional ? 'bg-aws' : 'bg-muted'
                }`}
              >
                <span 
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                    useBedrockRegional ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Use Bedrock Regional Endpoints</span>
                  {useBedrockRegional && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-aws/10 text-aws">
                      +10% premium
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Regional endpoints guarantee data routing within specific AWS regions. 
                  Global endpoints (default) route dynamically for maximum availability.
                </p>
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
        <div id="calculator-results" className="grid lg:grid-cols-2 gap-6">
          {/* AWS */}
          <div className="rounded-2xl border border-aws/30 bg-card overflow-hidden">
            <div className="p-6 border-b border-border bg-aws/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-aws flex items-center justify-center">
                    <span className="text-white font-bold">A</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">AWS Total Cost</h3>
                    {useBedrockRegional && (
                      <p className="text-[10px] text-aws font-medium">Regional endpoints (+10%)</p>
                    )}
                  </div>
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

        {/* AI Gateway Resilience Callout */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
              <Network className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-2">Vercel AI Gateway: Built-in Resilience</h4>
              <p className="text-sm text-muted-foreground mb-4">
                AI Gateway provides <strong className="text-foreground">automatic provider failover</strong> and <strong className="text-foreground">model fallbacks</strong> out of the box. 
                If a provider is down or a model fails (context limits, unsupported inputs, outages), requests automatically route to backup providers or fallback models.
              </p>
              
              <div className="grid sm:grid-cols-3 gap-4 mb-4">
                <div className="p-3 rounded-lg bg-background/60 border border-border">
                  <p className="text-2xl font-bold font-mono text-primary">10-14%</p>
                  <p className="text-xs text-muted-foreground">P99 latency improvement</p>
                </div>
                <div className="p-3 rounded-lg bg-background/60 border border-border">
                  <p className="text-2xl font-bold font-mono text-primary">24.3%</p>
                  <p className="text-xs text-muted-foreground">Error rate reduction</p>
                </div>
                <div className="p-3 rounded-lg bg-background/60 border border-border">
                  <p className="text-2xl font-bold font-mono text-primary">0%</p>
                  <p className="text-xs text-muted-foreground">Markup on inference</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 text-xs">
                <a
                  href="https://vercel.com/changelog/model-fallbacks-now-available-in-vercel-ai-gateway"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:underline"
                >
                  Model Fallbacks Changelog <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://cline.bot/blog/cline-provider-now-runs-on-vercel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:underline"
                >
                  Cline Production Metrics <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Floating Mobile Cost Summary */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden transition-all duration-300 ${
          showFloatingBar 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-card/95 backdrop-blur-lg border-t border-border shadow-2xl">
          <div className="px-4 py-3">
            {/* Cost comparison row */}
            <div className="flex items-center justify-between gap-3">
              {/* AWS */}
              <div className="flex items-center gap-2 flex-1">
                <div className="w-7 h-7 rounded-lg bg-aws flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-bold">A</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-muted-foreground truncate">AWS</p>
                  <p className="text-lg font-bold font-mono text-aws leading-none">{formatCost(awsTotal)}</p>
                </div>
              </div>
              
              {/* VS divider */}
              <div className="text-xs text-muted-foreground font-medium">vs</div>
              
              {/* Vercel */}
              <div className="flex items-center gap-2 flex-1 justify-end">
                <div className="min-w-0 text-right">
                  <p className="text-[10px] text-muted-foreground truncate">Vercel</p>
                  <p className="text-lg font-bold font-mono text-primary leading-none">{formatCost(vercelTotal)}</p>
                </div>
                <div className="w-7 h-7 rounded-lg bg-foreground flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-background" viewBox="0 0 76 65" fill="currentColor">
                    <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Scroll hint */}
            <button
              onClick={() => {
                document.getElementById('calculator-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className="w-full mt-2 flex items-center justify-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>Scroll for details</span>
              <ChevronDown className="w-3 h-3 animate-bounce" />
            </button>
          </div>
          
          {/* Drag handle indicator */}
          <div className="flex justify-center pb-2">
            <div className="w-12 h-1 rounded-full bg-muted-foreground/30" />
          </div>
        </div>
      </div>
    </section>
  )
}
