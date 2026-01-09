"use client"

import { useEffect, useState, useRef } from "react"
import { Puzzle, Layers, AlertTriangle, ArrowRight, Package, Boxes } from "lucide-react"

export function ForewordSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="foreword" className="relative py-24 overflow-hidden">
      {/* Subtle background accent - blends with hero above */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-background" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Section label */}
        <div className={`flex items-center gap-3 mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Section 0 — Foreword</span>
        </div>

        {/* Main message */}
        <div className={`space-y-8 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            There Is No <span className="text-amber-500">"Batteries Included"</span> Solution
            <span className="text-muted-foreground/40">.</span>
            <span className="text-muted-foreground/60 font-light ml-2">Yet.</span>
          </h2>

          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed">
              As of January 2026, neither Vercel nor AWS offers a single, unified "agent framework + infrastructure" 
              package that just works out of the box. What we see instead—on both sides—is a{" "}
              <span className="text-foreground font-medium">composition-based approach</span>: 
              assembling a solution from a series of SDKs, managed services, and infrastructure primitives.
            </p>
          </div>

          {/* Visual: Composition diagram */}
          <div className={`grid sm:grid-cols-2 gap-4 my-10 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {/* What people expect */}
            <div className="p-6 rounded-2xl bg-card/50 border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">What teams expect</span>
              </div>
              <div className="flex items-center justify-center py-6">
                <div className="px-6 py-4 rounded-xl bg-emerald-500/10 border-2 border-dashed border-emerald-500/30">
                  <span className="font-mono text-sm text-emerald-400">agent-platform</span>
                  <p className="text-xs text-muted-foreground mt-1">One package, everything works</p>
                </div>
              </div>
            </div>

            {/* What actually exists */}
            <div className="p-6 rounded-2xl bg-card/50 border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Boxes className="w-5 h-5 text-amber-500" />
                <span className="text-sm font-medium text-muted-foreground">What actually exists</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 py-4">
                <span className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 font-mono text-xs">ai-sdk</span>
                <span className="text-muted-foreground/40">+</span>
                <span className="px-3 py-1.5 rounded-lg bg-muted border border-border font-mono text-xs">functions</span>
                <span className="text-muted-foreground/40">+</span>
                <span className="px-3 py-1.5 rounded-lg bg-muted border border-border font-mono text-xs">kv</span>
                <span className="text-muted-foreground/40">+</span>
                <span className="px-3 py-1.5 rounded-lg bg-muted border border-border font-mono text-xs">postgres</span>
                <span className="text-muted-foreground/40">+</span>
                <span className="px-3 py-1.5 rounded-lg bg-muted border border-border font-mono text-xs">blob</span>
                <span className="text-muted-foreground/40">+</span>
                <span className="px-3 py-1.5 rounded-lg bg-muted border border-border font-mono text-xs">...</span>
              </div>
            </div>
          </div>

          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              This reality is precisely why this report is extensive. To make informed platform decisions, we need to 
              understand not just individual components, but how they compose together—their integration points, 
              operational characteristics, and total cost of ownership.
            </p>
          </div>

          {/* Key insight callout */}
          <div className={`flex items-start gap-4 p-6 rounded-2xl bg-primary/5 border border-primary/20 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Why This Matters for the Vercel Narrative</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                When we pitch Vercel for AI agents, we're not pitching a single SDK or a single service. 
                We're pitching <span className="text-foreground">a platform</span>—a curated composition of 
                infrastructure primitives (Functions, KV, Postgres, Blob) combined with a best-in-class 
                developer experience. Understanding the full solution space lets us craft this narrative authentically.
              </p>
            </div>
          </div>

          {/* Transition to report */}
          <div className={`flex items-center gap-3 pt-6 text-sm text-muted-foreground transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Puzzle className="w-4 h-4" />
            <span>With that context, let's dive into the components...</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-border to-transparent" />
    </section>
  )
}
