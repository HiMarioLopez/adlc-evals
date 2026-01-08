"use client"

import { BarChart3, GitFork, CircleDot, Clock, ExternalLink } from "lucide-react"

const repositories = [
  {
    name: "vercel/ai",
    description: "Vercel AI SDK for TypeScript",
    latestTag: "ai@6.0.23",
    language: "TypeScript",
    forks: "~3,600",
    openIssues: "~884",
    ecosystem: "Fullstack (React, Next.js, Svelte, Vue)",
    recentOpen: 356,
    recentClosed: 366,
    ratio: "0.97",
    ratioLabel: "Healthy",
    latestCommit: "2026-01-08T17:15:16Z",
    link: "https://github.com/vercel/ai",
    color: "primary",
  },
  {
    name: "strands-agents/sdk-python",
    description: "Strands Agents SDK",
    latestTag: "v1.21.0",
    language: "Python",
    forks: "~609",
    openIssues: "~137",
    ecosystem: "Backend/ML (Python, boto3)",
    recentOpen: 137,
    recentClosed: 73,
    ratio: "1.88",
    ratioLabel: "Growing backlog",
    latestCommit: "2026-01-08T15:50:24Z",
    link: "https://github.com/strands-agents/sdk-python",
    color: "chart-2",
  },
  {
    name: "aws/bedrock-agentcore-sdk-python",
    description: "Bedrock AgentCore Infrastructure SDK",
    latestTag: "v1.1.4",
    language: "Python",
    forks: "~43",
    openIssues: "~13",
    ecosystem: "Infrastructure (Python)",
    recentOpen: 13,
    recentClosed: 3,
    ratio: "4.33",
    ratioLabel: "New project",
    latestCommit: "2026-01-08T18:28:12Z",
    link: "https://github.com/aws/bedrock-agentcore-sdk-python",
    color: "aws",
  },
]

const activitySignals = [
  {
    platform: "Vercel AI SDK",
    signals: [
      "V6 milestone active",
      "Issues for generateImage()",
      "Provider fixes (OpenAI, Anthropic)",
      "Per-step timeouts in 6.0.23",
    ],
  },
  {
    platform: "Bedrock AgentCore",
    signals: [
      "GA announced Oct 2025",
      "Policy + Evaluations in preview",
      "Browser Tool GA",
      "TypeScript SDK preview Dec 2025",
    ],
  },
]

export function AdoptionSection() {
  return (
    <section id="adoption" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary mb-4">
            <BarChart3 className="w-4 h-4" />
            Section 6
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Adoption Metrics
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            GitHub repository statistics and development velocity indicators
          </p>
        </div>

        {/* Repository cards */}
        <div className="grid gap-6 mb-12">
          {repositories.map((repo) => (
            <div
              key={repo.name}
              className={`rounded-2xl border border-border bg-card overflow-hidden hover:border-${repo.color}/30 transition-colors`}
            >
              <div className="p-6 sm:p-8">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Repo info */}
                  <div className="lg:w-1/3">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl bg-${repo.color}/10 flex items-center justify-center`}>
                        <GitFork className={`w-5 h-5 text-${repo.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold">{repo.name}</h3>
                        <p className="text-xs text-muted-foreground">{repo.description}</p>
                      </div>
                    </div>
                    <a
                      href={repo.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 text-sm text-${repo.color} hover:underline`}
                    >
                      View repository
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Stats */}
                  <div className="lg:w-1/3 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Latest Tag</p>
                      <p className="font-mono text-sm">{repo.latestTag}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Language</p>
                      <p className="text-sm">{repo.language}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Forks</p>
                      <p className="font-mono text-sm">{repo.forks}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Open Issues</p>
                      <p className="font-mono text-sm">{repo.openIssues}</p>
                    </div>
                  </div>

                  {/* Issue velocity */}
                  <div className="lg:w-1/3">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                      60-Day Issue Activity
                    </p>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <CircleDot className="w-4 h-4 text-chart-3" />
                        <span className="text-sm">{repo.recentOpen} opened</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CircleDot className="w-4 h-4 text-primary" />
                        <span className="text-sm">{repo.recentClosed} closed</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Ratio:</span>
                      <span className={`text-sm font-mono ${
                        parseFloat(repo.ratio) <= 1 ? 'text-primary' :
                        parseFloat(repo.ratio) <= 2 ? 'text-chart-3' :
                        'text-aws'
                      }`}>
                        {repo.ratio}
                      </span>
                      <span className="text-xs text-muted-foreground">({repo.ratioLabel})</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 sm:px-8 py-4 bg-muted/30 border-t border-border flex items-center gap-4 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                <span>Last commit: {new Date(repo.latestCommit).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
                <span className="text-border">•</span>
                <span>{repo.ecosystem}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Activity signals */}
        <div className="grid md:grid-cols-2 gap-6">
          {activitySignals.map((platform) => (
            <div key={platform.platform} className="p-6 rounded-2xl bg-card border border-border">
              <h4 className="font-semibold mb-4">{platform.platform}</h4>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                Active Development Signals
              </p>
              <ul className="space-y-2">
                {platform.signals.map((signal, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {signal}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Data note */}
        <div className="mt-8 p-4 rounded-xl bg-muted/50 border border-border">
          <p className="text-xs text-muted-foreground text-center">
            Issue counts based on GitHub API data filtered by created_at ≥ 2025-11-09. 
            Ratio = Open/Closed issues created in period.
          </p>
        </div>
      </div>
    </section>
  )
}
