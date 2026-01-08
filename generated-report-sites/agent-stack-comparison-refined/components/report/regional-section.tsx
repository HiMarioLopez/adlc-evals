"use client"

import { Globe, Check, Minus, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface RegionData {
  region: string
  name: string
  runtime: boolean
  memory: boolean
  gateway: boolean
  identity: boolean
  tools: boolean
  observability: boolean
  policy: boolean
  evaluations: boolean
}

const awsRegions: RegionData[] = [
  { region: "us-east-1", name: "N. Virginia", runtime: true, memory: true, gateway: true, identity: true, tools: true, observability: true, policy: true, evaluations: true },
  { region: "us-east-2", name: "Ohio", runtime: true, memory: true, gateway: true, identity: true, tools: true, observability: true, policy: true, evaluations: false },
  { region: "us-west-2", name: "Oregon", runtime: true, memory: true, gateway: true, identity: true, tools: true, observability: true, policy: true, evaluations: true },
  { region: "eu-central-1", name: "Frankfurt", runtime: true, memory: true, gateway: true, identity: true, tools: true, observability: true, policy: true, evaluations: true },
  { region: "eu-west-1", name: "Ireland", runtime: true, memory: true, gateway: true, identity: true, tools: true, observability: true, policy: true, evaluations: false },
  { region: "eu-west-2", name: "London", runtime: false, memory: true, gateway: true, identity: true, tools: false, observability: false, policy: false, evaluations: false },
  { region: "eu-west-3", name: "Paris", runtime: false, memory: true, gateway: true, identity: true, tools: false, observability: false, policy: false, evaluations: false },
  { region: "ap-south-1", name: "Mumbai", runtime: true, memory: true, gateway: true, identity: true, tools: true, observability: true, policy: true, evaluations: false },
  { region: "ap-southeast-1", name: "Singapore", runtime: true, memory: true, gateway: true, identity: true, tools: true, observability: true, policy: true, evaluations: false },
  { region: "ap-southeast-2", name: "Sydney", runtime: true, memory: true, gateway: true, identity: true, tools: true, observability: true, policy: true, evaluations: true },
  { region: "ap-northeast-1", name: "Tokyo", runtime: true, memory: true, gateway: true, identity: true, tools: true, observability: true, policy: true, evaluations: false },
]

const features = [
  { key: "runtime", label: "Runtime", required: true },
  { key: "memory", label: "Memory", required: false },
  { key: "gateway", label: "Gateway", required: false },
  { key: "identity", label: "Identity", required: false },
  { key: "tools", label: "Tools", required: true },
  { key: "observability", label: "Observability", required: false },
  { key: "policy", label: "Policy", required: false },
  { key: "evaluations", label: "Evaluations", required: false },
]

const vercelConstraints = [
  { feature: "Sandbox Region", value: "Washington, D.C. (iad1)", note: "Single region during Beta" },
  { feature: "Functions Max Duration", value: "Hobby: 300s / Pro: 800s", note: "Fluid Compute enabled" },
  { feature: "Edge Streaming", value: "25s start / 300s max", note: "Must begin response within 25s" },
  { feature: "Sandbox Max Duration", value: "Hobby: 45m / Pro: 5h", note: "Up to 8 vCPUs, 16GB RAM" },
]

export function RegionalSection() {
  const fullStackRegions = awsRegions.filter(r => r.runtime && r.tools && r.observability && r.policy)

  return (
    <section id="regions" className="py-24 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary mb-4">
            <Globe className="w-4 h-4" />
            Section 5
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Regional Availability
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Bedrock AgentCore feature availability by region. Vercel Sandbox is currently single-region.
          </p>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          <div className="p-5 rounded-2xl bg-card border border-border text-center">
            <p className="text-3xl font-bold font-mono text-aws">{awsRegions.filter(r => r.runtime).length}</p>
            <p className="text-xs text-muted-foreground mt-1">AWS Runtime regions</p>
          </div>
          <div className="p-5 rounded-2xl bg-card border border-border text-center">
            <p className="text-3xl font-bold font-mono text-aws">{fullStackRegions.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Full stack regions</p>
          </div>
          <div className="p-5 rounded-2xl bg-card border border-border text-center">
            <p className="text-3xl font-bold font-mono text-primary">1</p>
            <p className="text-xs text-muted-foreground mt-1">Vercel Sandbox region</p>
          </div>
          <div className="p-5 rounded-2xl bg-card border border-border text-center">
            <p className="text-3xl font-bold font-mono text-primary">Global</p>
            <p className="text-xs text-muted-foreground mt-1">Vercel AI Gateway</p>
          </div>
        </div>

        {/* Vercel constraints */}
        <div className="mb-12 p-6 rounded-2xl border border-primary/30 bg-primary/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
              <svg className="w-5 h-5 text-background" viewBox="0 0 76 65" fill="currentColor">
                <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
              </svg>
            </div>
            <h3 className="font-semibold">Vercel Availability Constraints</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {vercelConstraints.map((item) => (
              <div key={item.feature}>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{item.feature}</p>
                <p className="font-mono text-sm font-medium">{item.value}</p>
                {item.note && <p className="text-xs text-muted-foreground mt-1">{item.note}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* AWS Region Matrix */}
        <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm overflow-hidden">
          <div className="flex items-center gap-3 p-6 border-b border-border bg-aws/5">
            <div className="w-8 h-8 rounded-lg bg-aws flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <h3 className="font-semibold">Bedrock AgentCore Regional Matrix</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-xs font-mono uppercase tracking-wider text-muted-foreground sticky left-0 bg-card z-10 min-w-[160px]">
                    Region
                  </th>
                  {features.map((f) => (
                    <th key={f.key} className="p-4 text-xs font-mono uppercase tracking-wider text-muted-foreground text-center min-w-[100px]">
                      <span className={f.required ? 'text-foreground' : ''}>{f.label}</span>
                      {f.required && <span className="text-primary ml-1">*</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {awsRegions.map((region, idx) => {
                  const isFullStack = region.runtime && region.tools && region.observability && region.policy
                  return (
                    <tr 
                      key={region.region} 
                      className={cn(
                        "border-b border-border/50 last:border-b-0 transition-colors",
                        idx % 2 === 0 ? "bg-muted/10" : "",
                        isFullStack ? "hover:bg-primary/5" : "hover:bg-muted/20"
                      )}
                    >
                      <td className="p-4 sticky left-0 bg-inherit z-10">
                        <div className="flex items-center gap-2">
                          {isFullStack && (
                            <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                          )}
                          <div>
                            <p className="font-mono text-sm">{region.region}</p>
                            <p className="text-xs text-muted-foreground">{region.name}</p>
                          </div>
                        </div>
                      </td>
                      {features.map((f) => (
                        <td key={f.key} className="p-4 text-center">
                          {region[f.key as keyof RegionData] ? (
                            <Check className="w-4 h-4 text-primary mx-auto" />
                          ) : (
                            <Minus className="w-4 h-4 text-muted-foreground/30 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-muted/30 border-t border-border flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span>Full stack region</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">*</span>
              <span>Required for agent execution</span>
            </div>
          </div>
        </div>

        {/* Regional comparison note */}
        <div className="mt-8 p-6 rounded-2xl bg-card border border-border">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-5 h-5 text-chart-3 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold mb-2">Regional Comparison</h4>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  <strong className="text-foreground">Full stack in single region:</strong>{" "}
                  Vercel only supports iad1 for Sandbox; AWS has 9 regions for full stack
                </p>
                <p>
                  <strong className="text-foreground">Edge latency:</strong>{" "}
                  Vercel AI Gateway is edge-optimized globally; AWS Bedrock is region-bound
                </p>
                <p>
                  <strong className="text-foreground">Evaluations:</strong>{" "}
                  AWS has 4 regions only (preview); Vercel has no built-in evaluation service
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
