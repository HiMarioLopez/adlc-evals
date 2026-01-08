"use client"

const securityData = [
  { 
    aspect: "Network Isolation", 
    vercel: "Secure Compute: Dedicated IPs, VPC peering (max 50 connections)", 
    aws: "VPC with private subnets, PrivateLink" 
  },
  { 
    aspect: "Policy Language", 
    vercel: "N/A (middleware + environment variables)", 
    aws: "Cedar (open-source, AWS-developed)" 
  },
  { 
    aspect: "Policy Enforcement", 
    vercel: "Application-level", 
    aws: "Gateway-level intercept before tool execution" 
  },
  { 
    aspect: "IAM Integration", 
    vercel: "N/A", 
    aws: "Full IAM + Cedar hybrid" 
  },
  { 
    aspect: "Enforcement Modes", 
    vercel: "N/A", 
    aws: "ENFORCE (block) or MONITOR (log only)" 
  }
]

const protocolData = [
  { 
    protocol: "MCP (Model Context Protocol)", 
    vercel: "Client (experimental)", 
    aws: "Server (Gateway-based, production)" 
  },
  { 
    protocol: "A2A (Agent-to-Agent)", 
    vercel: "Not documented", 
    aws: "Supported via AgentCore Runtime" 
  },
  { 
    protocol: "REST/HTTP", 
    vercel: "Native", 
    aws: "Native via Gateway" 
  },
  { 
    protocol: "Lambda Integration", 
    vercel: "N/A", 
    aws: "Native (Gateway transforms Lambda → tools)" 
  }
]

export function SecuritySection() {
  return (
    <section id="security" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Security & Protocol Support</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Authorization, network isolation, and protocol capabilities
          </p>
        </div>

        {/* Security Primitives */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6">Security Primitives</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 border-b border-border text-muted-foreground font-medium">
                    Aspect
                  </th>
                  <th className="text-left p-4 border-b border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-foreground flex items-center justify-center">
                        <svg className="w-4 h-4 text-background" viewBox="0 0 76 65" fill="currentColor">
                          <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                        </svg>
                      </div>
                      <span className="font-semibold">Vercel</span>
                    </div>
                  </th>
                  <th className="text-left p-4 border-b border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-[hsl(var(--aws))] flex items-center justify-center">
                        <span className="text-background text-xs font-bold">A</span>
                      </div>
                      <span className="font-semibold">AWS</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {securityData.map((row) => (
                  <tr key={row.aspect} className="hover:bg-secondary/30 transition-colors">
                    <td className="p-4 border-b border-border font-medium text-foreground">
                      {row.aspect}
                    </td>
                    <td className="p-4 border-b border-border text-muted-foreground text-sm">
                      <span className={row.vercel === "N/A" ? "text-muted-foreground/50" : ""}>
                        {row.vercel}
                      </span>
                    </td>
                    <td className="p-4 border-b border-border text-muted-foreground text-sm">
                      {row.aws}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Protocol Support */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Protocol Support</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {protocolData.map((item) => (
              <div key={item.protocol} className="p-5 rounded-xl bg-card border border-border">
                <h4 className="font-medium mb-4 text-foreground">{item.protocol}</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded bg-foreground/10 flex items-center justify-center mt-0.5 shrink-0">
                      <div className="w-2.5 h-2.5 rounded-sm bg-foreground" />
                    </div>
                    <span className={`text-sm ${item.vercel === "Not documented" || item.vercel === "N/A" ? "text-muted-foreground/50" : "text-muted-foreground"}`}>
                      {item.vercel}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded bg-[hsl(var(--aws))/0.1] flex items-center justify-center mt-0.5 shrink-0">
                      <div className="w-2.5 h-2.5 rounded-sm bg-[hsl(var(--aws))]" />
                    </div>
                    <span className="text-sm text-muted-foreground">{item.aws}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cedar Policy Highlight */}
        <div className="p-6 rounded-xl bg-[hsl(var(--aws))/0.08] border border-[hsl(var(--aws))/0.2]">
          <div className="flex items-start gap-3">
            <span className="text-[hsl(var(--aws))] text-xl shrink-0">🔐</span>
            <div>
              <h4 className="font-semibold text-[hsl(var(--aws))] mb-2">AWS Cedar Policy: Gateway-Level Authorization</h4>
              <p className="text-muted-foreground text-sm mb-3">
                Cedar policies intercept tool calls at the Gateway before execution. Supports natural language → Cedar conversion (NL2Cedar) for easier policy authoring.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-2 py-1 rounded bg-[hsl(var(--aws))/0.15] text-[hsl(var(--aws))] text-xs font-mono">
                  Default-deny semantics
                </span>
                <span className="px-2 py-1 rounded bg-[hsl(var(--aws))/0.15] text-[hsl(var(--aws))] text-xs font-mono">
                  Forbid-wins precedence
                </span>
                <span className="px-2 py-1 rounded bg-[hsl(var(--aws))/0.15] text-[hsl(var(--aws))] text-xs font-mono">
                  ENFORCE or MONITOR modes
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
