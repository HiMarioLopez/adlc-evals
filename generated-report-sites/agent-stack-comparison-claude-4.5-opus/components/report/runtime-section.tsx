"use client"

const codeExecData = [
  { aspect: "Isolation", vercel: "microVM (Firecracker-based)", aws: "Containerized sandbox" },
  { aspect: "Languages", vercel: "Node.js (22), Python (3.13)", aws: "Python, JavaScript, TypeScript" },
  { aspect: "Max vCPUs", vercel: "8 vCPUs (2 GB per vCPU)", aws: "Configurable per instance" },
  { aspect: "Max Runtime", vercel: "5 min (Hobby), 5 hours (Pro/Enterprise)", aws: "8 hours" },
  { aspect: "Max File Size", vercel: "Via filesystem", aws: "5 GB (S3 upload)" },
  { aspect: "Cold Start", vercel: "microVM initialization", aws: "Container startup" }
]

export function RuntimeSection() {
  return (
    <section id="capabilities" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Runtime & Execution</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Deep dive into runtime persistence and code execution capabilities
          </p>
        </div>

        {/* Runtime Persistence Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-foreground flex items-center justify-center">
                <svg className="w-6 h-6 text-background" viewBox="0 0 76 65" fill="currentColor">
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Vercel Runtime</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Edge Functions</span>
                <span className="font-mono text-[hsl(var(--accent))]">300s max</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Serverless + Fluid</span>
                <span className="font-mono text-[hsl(var(--accent))]">800s max</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Sandbox (Pro)</span>
                <span className="font-mono text-[hsl(var(--accent))]">5 hours</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-muted-foreground">Workflow SDK</span>
                <span className="px-2 py-1 rounded bg-[hsl(var(--accent))/0.15] text-[hsl(var(--accent))] text-xs font-mono">
                  Durable
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[hsl(var(--aws))] flex items-center justify-center">
                <span className="text-background font-bold">A</span>
              </div>
              <h3 className="text-xl font-semibold">AWS AgentCore Runtime</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Max Lifetime</span>
                <span className="font-mono text-[hsl(var(--aws))]">8 hours</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Idle Timeout</span>
                <span className="font-mono text-[hsl(var(--aws))]">60s - 8hr</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Session Persistence</span>
                <span className="px-2 py-1 rounded bg-[hsl(var(--aws))/0.15] text-[hsl(var(--aws))] text-xs font-mono">
                  Auto-managed
                </span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-muted-foreground">Billing</span>
                <span className="text-sm text-muted-foreground">Per-second, no I/O charge</span>
              </div>
            </div>
          </div>
        </div>

        {/* Code Execution Comparison */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-2">Code Execution Deep-Dive</h3>
          <p className="text-muted-foreground">Comparing Vercel Sandbox SDK vs AWS AgentCore Code Interpreter</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {codeExecData.map((item) => (
            <div
              key={item.aspect}
              className="p-5 rounded-xl bg-card border border-border"
            >
              <h4 className="text-sm text-muted-foreground mb-3">{item.aspect}</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded bg-foreground/10 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-sm bg-foreground" />
                  </div>
                  <span className="text-sm">{item.vercel}</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded bg-[hsl(var(--aws))/0.1] flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-sm bg-[hsl(var(--aws))]" />
                  </div>
                  <span className="text-sm">{item.aws}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
