"use client"

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[hsl(var(--accent))] rounded-full blur-[128px] opacity-20" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[hsl(var(--chart-2))] rounded-full blur-[128px] opacity-15" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-[hsl(var(--accent))] animate-pulse" />
            <span className="text-sm text-muted-foreground font-mono">Updated January 8, 2026</span>
          </div>
        </div>

        <h1
          className="text-5xl md:text-7xl font-bold tracking-tight text-balance mb-6 animate-fade-in-up [animation-delay:100ms]"
        >
          <span className="text-foreground">Vercel</span>
          <span className="text-muted-foreground mx-4">vs</span>
          <span className="text-[hsl(var(--aws))]">AWS</span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-4 text-balance animate-fade-in-up [animation-delay:200ms]">
          Agent Stack Technical Evaluation
        </p>

        <p className="text-lg text-muted-foreground/70 max-w-2xl mx-auto mb-12 animate-fade-in-up [animation-delay:300ms]">
          A comprehensive comparison of AI SDK 6.x and AWS AgentCore for building production-ready AI agents
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 animate-fade-in-up [animation-delay:400ms]">
          <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-card border border-border">
            <div className="w-10 h-10 rounded-lg bg-foreground flex items-center justify-center">
              <svg className="w-6 h-6 text-background" viewBox="0 0 76 65" fill="currentColor">
                <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-xs text-muted-foreground">Framework</p>
              <p className="font-semibold">AI SDK 6.x</p>
            </div>
          </div>

          <div className="text-2xl text-muted-foreground">↔</div>

          <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-card border border-border">
            <div className="w-10 h-10 rounded-lg bg-[hsl(var(--aws))] flex items-center justify-center">
              <span className="text-background font-bold text-lg">A</span>
            </div>
            <div className="text-left">
              <p className="text-xs text-muted-foreground">Framework</p>
              <p className="font-semibold">AgentCore + Strands</p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center animate-fade-in [animation-delay:600ms]">
          <p className="text-sm text-muted-foreground mb-4">Scroll to explore</p>
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent))] animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
