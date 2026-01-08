"use client"

const vercelLinks = [
  { label: "AI Gateway", url: "https://vercel.com/ai-gateway" },
  { label: "AI SDK 6 Blog", url: "https://vercel.com/blog/ai-sdk-6" },
  { label: "AI SDK GitHub", url: "https://github.com/vercel/ai" },
  { label: "Sandbox SDK Docs", url: "https://vercel.com/docs/vercel-sandbox" },
  { label: "Sandbox Pricing", url: "https://vercel.com/docs/vercel-sandbox/pricing" },
  { label: "Workflow Blog", url: "https://vercel.com/blog/introducing-workflow" },
  { label: "bash-tool Changelog", url: "https://vercel.com/changelog/introducing-bash-tool-for-filesystem-based-context-retrieval" },
  { label: "Secure Compute", url: "https://vercel.com/docs/connectivity/secure-compute" }
]

const awsLinks = [
  { label: "Strands SDK Docs", url: "https://strandsagents.com/latest/documentation/docs/" },
  { label: "Strands SDK GitHub", url: "https://github.com/strands-agents/sdk-python" },
  { label: "AgentCore Overview", url: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html" },
  { label: "AgentCore Pricing", url: "https://aws.amazon.com/bedrock/agentcore/pricing/" },
  { label: "AgentCore Regions", url: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agentcore-regions.html" },
  { label: "AgentCore Runtime", url: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agents-tools-runtime.html" },
  { label: "AgentCore Policy", url: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/policy.html" },
  { label: "AgentCore Memory", url: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/memory-strategies.html" },
  { label: "Bedrock Pricing", url: "https://aws.amazon.com/bedrock/pricing/" },
  { label: "Claude in Bedrock", url: "https://aws.amazon.com/bedrock/anthropic/" }
]

export function Footer() {
  return (
    <footer className="py-24 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Cross-Reference Links</h2>
          <p className="text-muted-foreground">
            Official documentation and resources from both platforms
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Vercel Links */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded bg-foreground flex items-center justify-center">
                <svg className="w-5 h-5 text-background" viewBox="0 0 76 65" fill="currentColor">
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                </svg>
              </div>
              <h3 className="font-semibold">Vercel Documentation</h3>
            </div>
            <ul className="space-y-3">
              {vercelLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground group-hover:bg-[hsl(var(--accent))] transition-colors" />
                    {link.label}
                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* AWS Links */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded bg-[hsl(var(--aws))] flex items-center justify-center">
                <span className="text-background font-bold text-sm">A</span>
              </div>
              <h3 className="font-semibold">AWS Documentation</h3>
            </div>
            <ul className="space-y-3">
              {awsLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground group-hover:bg-[hsl(var(--aws))] transition-colors" />
                    {link.label}
                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-foreground flex items-center justify-center">
                <svg className="w-4 h-4 text-background" viewBox="0 0 76 65" fill="currentColor">
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                </svg>
              </div>
              <span className="text-sm text-muted-foreground">Agent Stack Report</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Version 1.0.0</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span>January 8, 2026</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span className="font-mono text-xs px-2 py-1 rounded bg-secondary">Claude Opus 4.5</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
