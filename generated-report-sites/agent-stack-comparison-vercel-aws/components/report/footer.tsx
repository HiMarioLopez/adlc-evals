"use client"

import { ExternalLink, FileText, Github } from "lucide-react"

const vercelLinks = [
  { label: "AI SDK 6 Blog", url: "https://vercel.com/blog/ai-sdk-6" },
  { label: "AI SDK GitHub", url: "https://github.com/vercel/ai" },
  { label: "AI Gateway", url: "https://vercel.com/ai-gateway" },
  { label: "Sandbox Docs", url: "https://vercel.com/docs/vercel-sandbox" },
  { label: "Workflow Blog", url: "https://vercel.com/blog/introducing-workflow" },
  { label: "Secure Compute", url: "https://vercel.com/docs/connectivity/secure-compute" },
]

const awsLinks = [
  { label: "Bedrock AgentCore Overview", url: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html" },
  { label: "Bedrock AgentCore Pricing", url: "https://aws.amazon.com/bedrock/agentcore/pricing/" },
  { label: "Bedrock AgentCore Regions", url: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agentcore-regions.html" },
  { label: "Strands SDK", url: "https://github.com/strands-agents/sdk-python" },
  { label: "Bedrock Pricing", url: "https://aws.amazon.com/bedrock/pricing/" },
  { label: "Bedrock AgentCore Policy", url: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/policy.html" },
]

const documentationGaps = [
  { item: "Vercel 'AI Units' v2026", status: "Not publicly documented" },
  { item: "Vercel Workflow SDK pricing details", status: "Beta pricing only" },
  { item: "Bedrock AgentCore GA SLA percentage", status: "No specific uptime % published" },
]

const contributors = [
  { name: "Mario Lopez Martinez", github: "HiMarioLopez" },
]

export function Footer() {
  return (
    <footer id="sources" className="py-24 px-6 bg-card/50 border-t border-border">
      <div className="max-w-6xl mx-auto">
        {/* Links grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Vercel */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
                <svg className="w-5 h-5 text-background" viewBox="0 0 76 65" fill="currentColor">
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                </svg>
              </div>
              <h3 className="font-semibold">Vercel Documentation</h3>
            </div>
            <ul className="grid grid-cols-2 gap-3">
              {vercelLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* AWS */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-aws flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <h3 className="font-semibold">AWS Documentation</h3>
            </div>
            <ul className="grid grid-cols-2 gap-3">
              {awsLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-aws transition-colors"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contributors */}
        <div className="mb-12 pt-8 border-t border-border/50">
          <div className="flex items-center gap-3 mb-4">
            <Github className="w-5 h-5 text-muted-foreground" />
            <h3 className="text-sm font-medium text-muted-foreground">Contributors</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {contributors.map((contributor) => (
              <a
                key={contributor.github}
                href={`https://github.com/${contributor.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 hover:bg-muted transition-colors"
              >
                <img
                  src={`https://github.com/${contributor.github}.png`}
                  alt={contributor.name}
                  className="w-5 h-5 rounded-full"
                />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {contributor.name}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Version info */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-border">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Report Version: <span className="font-mono text-foreground">1.0.0</span></span>
            <span className="text-border">•</span>
            <span>Generated: <span className="font-mono text-foreground">2026-01-08</span></span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Analyzed:</span>
              <span className="font-mono text-primary">ai@6.0.23</span>
              <span>•</span>
              <span className="font-mono text-chart-2">strands@1.21.0</span>
              <span>•</span>
              <span className="font-mono text-aws">agentcore@1.1.4</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Data sourced from official documentation and public GitHub repositories.
          </p>
        </div>
      </div>
    </footer>
  )
}
