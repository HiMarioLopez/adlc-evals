"use client";

import {
  AlertTriangle,
  ArrowRight,
  Boxes,
  Layers,
  Package,
  Puzzle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function ForewordSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative overflow-hidden py-24"
      id="foreword"
      ref={sectionRef}
    >
      {/* Subtle background accent - blends with hero above */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-background" />

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        {/* Section label */}
        <div
          className={`mb-8 flex items-center gap-3 transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/10">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </div>
          <span className="font-mono text-muted-foreground text-xs uppercase tracking-widest">
            Section 0 — Foreword
          </span>
        </div>

        {/* Main message */}
        <div
          className={`space-y-8 transition-all delay-100 duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <h2 className="font-bold text-3xl tracking-tight sm:text-4xl">
            There Is No{" "}
            <span className="text-amber-500">"Batteries Included"</span>{" "}
            Solution
            <span className="text-muted-foreground/40">.</span>
            <span className="ml-2 font-light text-muted-foreground/60">
              Yet.
            </span>
          </h2>

          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed">
              As of January 2026, neither Vercel nor AWS offers a single,
              unified "agent framework + infrastructure" package that just works
              out of the box. What we see instead—on both sides—is a{" "}
              <span className="font-medium text-foreground">
                composition-based approach
              </span>
              : assembling a solution from a series of SDKs, managed services,
              and infrastructure primitives.
            </p>
          </div>

          {/* Visual: Composition diagram */}
          <div
            className={`my-10 grid gap-4 transition-all delay-200 duration-700 sm:grid-cols-2 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            {/* What people expect */}
            <div className="rounded-2xl border border-border bg-card/50 p-6">
              <div className="mb-4 flex items-center gap-2">
                <Package className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium text-muted-foreground text-sm">
                  What teams expect
                </span>
              </div>
              <div className="flex items-center justify-center py-6">
                <div className="rounded-xl border-2 border-emerald-500/30 border-dashed bg-emerald-500/10 px-6 py-4">
                  <span className="font-mono text-emerald-400 text-sm">
                    agent-platform
                  </span>
                  <p className="mt-1 text-muted-foreground text-xs">
                    One package, everything works
                  </p>
                </div>
              </div>
            </div>

            {/* What actually exists */}
            <div className="rounded-2xl border border-border bg-card/50 p-6">
              <div className="mb-4 flex items-center gap-2">
                <Boxes className="h-5 w-5 text-amber-500" />
                <span className="font-medium text-muted-foreground text-sm">
                  What actually exists
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 py-4">
                <span className="rounded-lg border border-primary/20 bg-primary/10 px-3 py-1.5 font-mono text-xs">
                  ai-sdk
                </span>
                <span className="text-muted-foreground/40">+</span>
                <span className="rounded-lg border border-border bg-muted px-3 py-1.5 font-mono text-xs">
                  functions
                </span>
                <span className="text-muted-foreground/40">+</span>
                <span className="rounded-lg border border-border bg-muted px-3 py-1.5 font-mono text-xs">
                  kv
                </span>
                <span className="text-muted-foreground/40">+</span>
                <span className="rounded-lg border border-border bg-muted px-3 py-1.5 font-mono text-xs">
                  postgres
                </span>
                <span className="text-muted-foreground/40">+</span>
                <span className="rounded-lg border border-border bg-muted px-3 py-1.5 font-mono text-xs">
                  blob
                </span>
                <span className="text-muted-foreground/40">+</span>
                <span className="rounded-lg border border-border bg-muted px-3 py-1.5 font-mono text-xs">
                  ...
                </span>
              </div>
            </div>
          </div>

          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              This isn't a value judgment—it's simply the state of the
              ecosystem. Both platforms require you to understand how pieces fit
              together, make explicit trade-offs, and own the integration
              surface area. The question isn't "which one is turnkey?" but
              rather "which composition aligns better with your team's
              constraints and priorities?"
            </p>
          </div>

          {/* Key insight callout */}
          <div
            className={`flex items-start gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-6 transition-all delay-300 duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Layers className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="mb-2 font-semibold">What This Report Does</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We examine each platform's components side-by-side: compute
                models, state management, orchestration patterns, and
                operational characteristics. The goal is to surface the
                <span className="text-foreground"> actual differences</span>—not
                marketing claims—so you can make decisions based on what each
                stack genuinely offers today.
              </p>
            </div>
          </div>

          {/* Transition to report */}
          <div
            className={`flex items-center gap-3 pt-6 text-muted-foreground text-sm transition-all delay-400 duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            <Puzzle className="h-4 w-4" />
            <span>Let's examine the components...</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-1/2 h-24 w-px -translate-x-1/2 bg-gradient-to-b from-border to-transparent" />
    </section>
  );
}
