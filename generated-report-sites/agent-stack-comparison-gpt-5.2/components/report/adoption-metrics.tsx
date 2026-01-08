"use client"

import { ExternalLink, GitBranch, AlertCircle, CheckCircle } from "lucide-react"

interface RepoMetric {
  repo: string
  openIssues: number
  closedIssues: number
  ratio: number
  latestCommit: string
  commitUrl: string
}

const metrics: RepoMetric[] = [
  {
    repo: "vercel/ai",
    openIssues: 356,
    closedIssues: 366,
    ratio: 0.9727,
    latestCommit: "2026-01-08T17:15:16Z",
    commitUrl: "https://github.com/vercel/ai/commit/00dc198191c2c5a6b6a48cd02ea43f0ad6132ba2",
  },
  {
    repo: "strands-agents/sdk-python",
    openIssues: 137,
    closedIssues: 73,
    ratio: 1.8767,
    latestCommit: "2026-01-08T15:50:24Z",
    commitUrl: "https://github.com/strands-agents/sdk-python/commit/2f04bc0f9c786e6afa0837819d55accaa68b6896",
  },
  {
    repo: "aws/bedrock-agentcore-sdk-python",
    openIssues: 13,
    closedIssues: 3,
    ratio: 4.3333,
    latestCommit: "2026-01-08T18:28:12Z",
    commitUrl: "https://github.com/aws/bedrock-agentcore-sdk-python/commit/b3e4b4bbea8e41e1b73c7844e45b079d28b110ef",
  },
]

const versionTags = [
  { name: "Vercel AI SDK", tag: "ai@6.0.23", url: "https://github.com/vercel/ai/releases/tag/ai%406.0.23" },
  { name: "Strands Agents SDK", tag: "v1.21.0", url: "https://github.com/strands-agents/sdk-python/releases/tag/v1.21.0" },
  { name: "Bedrock AgentCore SDK", tag: "v1.1.4", url: "https://github.com/aws/bedrock-agentcore-sdk-python/releases/tag/v1.1.4" },
]

export function AdoptionMetrics() {
  return (
    <section className="py-24 px-6" id="adoption">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <span className="text-xs font-mono text-primary uppercase tracking-widest">Section 6</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Adoption Metrics</h2>
          <p className="text-muted-foreground max-w-2xl">
            GitHub issue activity from the last 60 days, grouped by current state. Lower open/closed ratio indicates better issue resolution velocity.
          </p>
        </div>

        {/* Metrics cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {metrics.map((m) => (
            <div key={m.repo} className="border border-border rounded-lg bg-card/50 backdrop-blur-sm overflow-hidden">
              <div className="p-6 border-b border-border">
                <div className="flex items-center gap-2 mb-2">
                  <GitBranch className="w-4 h-4 text-muted-foreground" />
                  <a
                    href={`https://github.com/${m.repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm hover:text-primary transition-colors"
                  >
                    {m.repo}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  {m.ratio < 1.5 ? (
                    <CheckCircle className="w-4 h-4 text-primary" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-aws" />
                  )}
                  <span className={`text-2xl font-bold font-mono ${m.ratio < 1.5 ? "text-primary" : "text-aws"}`}>
                    {m.ratio.toFixed(2)}
                  </span>
                  <span className="text-xs text-muted-foreground">open/closed ratio</span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Open issues</span>
                  <span className="font-mono text-sm text-destructive">{m.openIssues}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Closed issues</span>
                  <span className="font-mono text-sm text-primary">{m.closedIssues}</span>
                </div>
                {/* Visual bar */}
                <div className="h-2 bg-muted rounded-full overflow-hidden flex">
                  <div
                    className="bg-destructive/70 h-full"
                    style={{ width: `${(m.openIssues / (m.openIssues + m.closedIssues)) * 100}%` }}
                  />
                  <div
                    className="bg-primary h-full"
                    style={{ width: `${(m.closedIssues / (m.openIssues + m.closedIssues)) * 100}%` }}
                  />
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-1">Latest commit</p>
                  <a
                    href={m.commitUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                  >
                    {new Date(m.latestCommit).toLocaleString()}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Version tags */}
        <div className="border border-border rounded-lg bg-card/50 backdrop-blur-sm p-6">
          <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-4">Git Tags Analyzed</h3>
          <div className="flex flex-wrap gap-4">
            {versionTags.map((v) => (
              <a
                key={v.tag}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <span className="text-sm text-muted-foreground">{v.name}</span>
                <span className="font-mono text-sm text-primary">{v.tag}</span>
                <ExternalLink className="w-3 h-3 text-muted-foreground" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
