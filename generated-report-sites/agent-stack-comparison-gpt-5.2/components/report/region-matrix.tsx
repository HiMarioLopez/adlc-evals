"use client"

import { Check, Minus } from "lucide-react"

interface RegionData {
  region: string
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
  { region: "us-east-1", runtime: true, memory: true, gateway: true, identity: true, tools: true, observability: true, policy: true, evaluations: true },
  { region: "us-east-2", runtime: true, memory: true, gateway: true, identity: true, tools: true, observability: true, policy: true, evaluations: false },
  { region: "us-west-2", runtime: true, memory: true, gateway: true, identity: true, tools: true, observability: true, policy: true, evaluations: true },
  { region: "eu-central-1", runtime: true, memory: true, gateway: true, identity: true, tools: true, observability: true, policy: true, evaluations: true },
  { region: "eu-west-1", runtime: true, memory: true, gateway: true, identity: true, tools: true, observability: true, policy: true, evaluations: false },
  { region: "eu-west-2", runtime: false, memory: true, gateway: true, identity: true, tools: false, observability: false, policy: false, evaluations: false },
  { region: "eu-west-3", runtime: false, memory: true, gateway: true, identity: true, tools: false, observability: false, policy: false, evaluations: false },
  { region: "eu-north-1", runtime: false, memory: true, gateway: true, identity: true, tools: false, observability: false, policy: false, evaluations: false },
  { region: "ap-south-1", runtime: true, memory: true, gateway: true, identity: true, tools: true, observability: true, policy: true, evaluations: false },
  { region: "ap-southeast-1", runtime: true, memory: true, gateway: true, identity: true, tools: true, observability: true, policy: true, evaluations: false },
  { region: "ap-southeast-2", runtime: true, memory: true, gateway: true, identity: true, tools: true, observability: true, policy: true, evaluations: true },
  { region: "ap-northeast-1", runtime: true, memory: true, gateway: true, identity: true, tools: true, observability: true, policy: true, evaluations: false },
  { region: "ap-northeast-2", runtime: false, memory: true, gateway: true, identity: true, tools: false, observability: false, policy: false, evaluations: false },
  { region: "ca-central-1", runtime: false, memory: true, gateway: true, identity: true, tools: false, observability: false, policy: false, evaluations: false },
  { region: "sa-east-1", runtime: false, memory: true, gateway: false, identity: false, tools: false, observability: false, policy: false, evaluations: false },
]

const features = [
  { key: "runtime", label: "Runtime" },
  { key: "memory", label: "Memory" },
  { key: "gateway", label: "Gateway" },
  { key: "identity", label: "Identity" },
  { key: "tools", label: "Tools" },
  { key: "observability", label: "Observability" },
  { key: "policy", label: "Policy" },
  { key: "evaluations", label: "Evaluations" },
]

export function RegionMatrix() {
  return (
    <section className="py-24 px-6 bg-muted/20" id="regions">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <span className="text-xs font-mono text-primary uppercase tracking-widest">Section 2b</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Regional Availability</h2>
          <p className="text-muted-foreground max-w-2xl">
            AWS AgentCore feature availability by region. Vercel Sandbox is currently only available in Washington, D.C. (iad1).
          </p>
        </div>

        {/* Vercel constraints callout */}
        <div className="border border-primary/30 rounded-lg bg-primary/5 p-6 mb-8">
          <h3 className="font-semibold text-primary mb-4">Vercel Availability Constraints</h3>
          <div className="grid sm:grid-cols-3 gap-6">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Sandbox Region</p>
              <p className="font-mono text-sm">Washington, D.C. (iad1)</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Functions Max Duration</p>
              <p className="font-mono text-sm">Hobby: 300s / Pro: 800s</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Edge Streaming</p>
              <p className="font-mono text-sm">25s start / 300s max</p>
            </div>
          </div>
        </div>

        {/* AWS Region Matrix */}
        <div className="border border-border rounded-lg bg-card/50 backdrop-blur-sm overflow-hidden">
          <div className="p-6 border-b border-border bg-aws/5">
            <h3 className="font-semibold text-aws">AWS AgentCore Regional Matrix</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-xs font-mono uppercase tracking-wider text-muted-foreground sticky left-0 bg-card">
                    Region
                  </th>
                  {features.map((f) => (
                    <th key={f.key} className="p-4 text-xs font-mono uppercase tracking-wider text-muted-foreground text-center">
                      {f.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {awsRegions.map((region, idx) => (
                  <tr key={region.region} className={`border-b border-border/50 last:border-b-0 ${idx % 2 === 0 ? "bg-muted/10" : ""}`}>
                    <td className="p-4 font-mono text-sm sticky left-0 bg-inherit">
                      {region.region}
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
