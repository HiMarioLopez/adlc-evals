"use client"

import React from "react"

import { useState } from "react"
import { Code, Globe, Terminal, Database, ChevronRight } from "lucide-react"

interface ToolCapability {
  capability: string
  icon: React.ReactNode
  vercel: { name: string; details: string }
  aws: { name: string; details: string }
}

const toolCapabilities: ToolCapability[] = [
  {
    capability: "Secure Code Execution",
    icon: <Code className="w-5 h-5" />,
    vercel: { 
      name: "Vercel Sandbox", 
      details: "Max 8 vCPUs, 2GB/vCPU. Hobby: 45min / Pro: 5hr runtime. Node.js or Python." 
    },
    aws: { 
      name: "AgentCore Code Interpreter", 
      details: "Containerized. Python/JS/TS. 100MB inline, 5GB via S3. Default 15min, up to 8hr." 
    },
  },
  {
    capability: "Filesystem Context",
    icon: <Terminal className="w-5 h-5" />,
    vercel: { 
      name: "bash-tool", 
      details: "Runs on just-bash (TypeScript interpreter). No shell process or binary execution." 
    },
    aws: { 
      name: "Code Interpreter", 
      details: "File handling via S3. Large file workflows supported up to 5GB." 
    },
  },
  {
    capability: "Browser Automation",
    icon: <Globe className="w-5 h-5" />,
    vercel: { 
      name: "AI SDK Integrations", 
      details: "Anthropic computer-use tools via AI SDK cookbook patterns." 
    },
    aws: { 
      name: "AgentCore Browser Tool", 
      details: "First-party browser automation. Priced via AgentCore consumption." 
    },
  },
  {
    capability: "MCP Tool Mediation",
    icon: <Database className="w-5 h-5" />,
    vercel: { 
      name: "Native Tool Calling", 
      details: "MCP client story varies by provider integration." 
    },
    aws: { 
      name: "AgentCore Gateway", 
      details: "Connects to MCP servers. ListTools/InvokeTool/Ping priced at $0.005/1K." 
    },
  },
]

const executionLimits = {
  vercel: [
    { label: "Max Runtime", hobby: "45 minutes", pro: "5 hours" },
    { label: "CPU Ceiling", hobby: "8 vCPUs", pro: "8 vCPUs" },
    { label: "Memory/vCPU", hobby: "2 GB", pro: "2 GB" },
    { label: "Concurrency", hobby: "10", pro: "2,000 (Beta)" },
  ],
  aws: [
    { label: "Default Runtime", value: "15 minutes" },
    { label: "Max Runtime", value: "8 hours" },
    { label: "CPU Ceiling", value: "Not published" },
    { label: "Concurrency", value: "Not published" },
  ],
}

export function ToolExecution() {
  const [activeCapability, setActiveCapability] = useState(0)

  return (
    <section className="py-24 px-6 bg-muted/20" id="tools">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <span className="text-xs font-mono text-primary uppercase tracking-widest">Deep Dive</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Tool Execution Capabilities</h2>
          <p className="text-muted-foreground max-w-2xl">
            Detailed comparison of tool execution environments, runtime limits, and pricing models.
          </p>
        </div>

        {/* Tool capability selector */}
        <div className="grid lg:grid-cols-[300px_1fr] gap-8 mb-12">
          {/* Selector */}
          <div className="space-y-2">
            {toolCapabilities.map((tool, idx) => (
              <button
                key={tool.capability}
                onClick={() => setActiveCapability(idx)}
                className={`w-full flex items-center gap-3 p-4 rounded-lg border transition-all text-left ${
                  activeCapability === idx
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card/50 hover:bg-muted/50"
                }`}
              >
                <div className={`p-2 rounded-lg ${activeCapability === idx ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                  {tool.icon}
                </div>
                <span className={`font-medium text-sm ${activeCapability === idx ? "text-foreground" : "text-muted-foreground"}`}>
                  {tool.capability}
                </span>
                <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${activeCapability === idx ? "rotate-90 text-primary" : "text-muted-foreground"}`} />
              </button>
            ))}
          </div>

          {/* Detail cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Vercel */}
            <div className="border border-primary/30 rounded-lg bg-card/50 backdrop-blur-sm overflow-hidden">
              <div className="p-6 border-b border-border bg-primary/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-vercel/10 flex items-center justify-center">
                    <svg viewBox="0 0 76 65" className="w-5 h-5 fill-vercel">
                      <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-vercel">{toolCapabilities[activeCapability].vercel.name}</h3>
                    <p className="text-xs text-muted-foreground">Vercel Stack</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {toolCapabilities[activeCapability].vercel.details}
                </p>
              </div>
            </div>

            {/* AWS */}
            <div className="border border-aws/30 rounded-lg bg-card/50 backdrop-blur-sm overflow-hidden">
              <div className="p-6 border-b border-border bg-aws/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-aws/10 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-aws">
                      <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.296.072-.583.16-.863.272a2.04 2.04 0 0 1-.248.104.39.39 0 0 1-.096.016c-.088 0-.128-.064-.128-.2v-.392c0-.104.016-.184.056-.232a.61.61 0 0 1 .216-.128c.28-.144.616-.264 1.007-.36.392-.096.807-.144 1.247-.144.95 0 1.644.216 2.091.647.44.431.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-aws">{toolCapabilities[activeCapability].aws.name}</h3>
                    <p className="text-xs text-muted-foreground">AWS Stack</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {toolCapabilities[activeCapability].aws.details}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Execution limits */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Vercel limits */}
          <div className="border border-border rounded-lg bg-card/50 backdrop-blur-sm overflow-hidden">
            <div className="p-6 border-b border-border">
              <h3 className="font-semibold">Vercel Sandbox Limits</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-xs font-mono uppercase tracking-wider text-muted-foreground">Limit</th>
                    <th className="text-left p-4 text-xs font-mono uppercase tracking-wider text-muted-foreground">Hobby</th>
                    <th className="text-left p-4 text-xs font-mono uppercase tracking-wider text-muted-foreground">Pro/Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {executionLimits.vercel.map((limit, idx) => (
                    <tr key={limit.label} className={`border-b border-border/50 last:border-b-0 ${idx % 2 === 0 ? "bg-muted/10" : ""}`}>
                      <td className="p-4 text-sm">{limit.label}</td>
                      <td className="p-4 font-mono text-sm text-muted-foreground">{limit.hobby}</td>
                      <td className="p-4 font-mono text-sm text-primary">{limit.pro}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AWS limits */}
          <div className="border border-border rounded-lg bg-card/50 backdrop-blur-sm overflow-hidden">
            <div className="p-6 border-b border-border">
              <h3 className="font-semibold">AgentCore Code Interpreter Limits</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-xs font-mono uppercase tracking-wider text-muted-foreground">Limit</th>
                    <th className="text-left p-4 text-xs font-mono uppercase tracking-wider text-muted-foreground">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {executionLimits.aws.map((limit, idx) => (
                    <tr key={limit.label} className={`border-b border-border/50 last:border-b-0 ${idx % 2 === 0 ? "bg-muted/10" : ""}`}>
                      <td className="p-4 text-sm">{limit.label}</td>
                      <td className="p-4 font-mono text-sm text-aws">{limit.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
