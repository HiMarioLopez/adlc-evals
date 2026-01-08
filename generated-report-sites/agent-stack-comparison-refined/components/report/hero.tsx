"use client"

import { useEffect, useState } from "react"
import { ArrowDown, Sparkles } from "lucide-react"

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-aws/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-chart-2/10 rounded-full blur-[180px]" />
      
      {/* Content */}
      <div className={`relative z-10 max-w-5xl mx-auto px-6 text-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/60 backdrop-blur-sm mb-8 opacity-0 animate-fade-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-sm font-mono text-muted-foreground">
            Last Updated: January 8, 2026
          </span>
          <Sparkles className="w-3.5 h-3.5 text-primary" />
        </div>

        {/* Main heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 opacity-0 animate-fade-up delay-100">
          <span className="text-vercel">Vercel</span>
          <span className="text-muted-foreground/50 mx-3 sm:mx-4 font-light">vs</span>
          <span className="text-aws">AWS</span>
        </h1>
        
        <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-muted-foreground mb-6 opacity-0 animate-fade-up delay-200">
          Agent Stack Technical Evaluation
        </h2>

        {/* Subtitle */}
        <p className="text-muted-foreground max-w-2xl mx-auto mb-10 text-balance leading-relaxed opacity-0 animate-fade-up delay-300">
          A comprehensive comparison of{" "}
          <span className="text-foreground font-medium">Vercel + AI SDK</span>{" "}
          versus{" "}
          <span className="text-foreground font-medium">AWS Bedrock AgentCore + Strands SDK</span>{" "}
          for building production-ready AI agents.
        </p>

        {/* Stack badges - stacked vertically */}
        <div className="flex flex-col items-center gap-3 mb-16 opacity-0 animate-fade-up delay-400">
          {/* Vercel card */}
          <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-card/80 border border-border backdrop-blur-sm hover:border-foreground/20 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-foreground flex items-center justify-center shrink-0">
              <svg className="w-7 h-7 text-background" viewBox="0 0 76 65" fill="currentColor">
                <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Infra + Framework</p>
              <p className="font-semibold">Vercel + AI SDK</p>
            </div>
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-2 text-muted-foreground/40 py-1">
            <span className="text-xl">↕</span>
          </div>

          {/* AWS card */}
          <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-card/80 border border-border backdrop-blur-sm hover:border-aws/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-aws flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Infra + Framework</p>
              <p className="font-semibold">AWS Bedrock AgentCore + Strands SDK</p>
            </div>
          </div>
        </div>

        {/* Key insight */}
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-primary/5 border border-primary/20 opacity-0 animate-fade-up delay-500">
          <span className="text-xs uppercase tracking-wider text-primary font-semibold">Key Finding</span>
          <span className="w-px h-4 bg-primary/30" />
          <span className="text-sm text-muted-foreground">
            Infrastructure costs ≈ <span className="text-primary font-mono font-bold">3%</span> of total • LLM inference dominates TCO
          </span>
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center gap-2 mt-16 opacity-0 animate-fade-up delay-600">
          <span className="text-xs text-muted-foreground">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
            <ArrowDown className="w-3 h-3 text-primary animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
