"use client";

import { ArrowUpDown, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import type { HeroData, Platform } from "@/data/report-schema";

interface HeroProps {
  data: HeroData;
  platforms: Platform[];
}

export function Hero({ data, platforms }: HeroProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const primary = platforms[0];
  const secondary = platforms[1];

  return (
    <section className="relative flex items-center justify-center py-8 md:min-h-[calc(100vh-7rem)] md:py-12">
      {/* Background layers */}
      <div className="grid-pattern absolute inset-0 opacity-50" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] animate-pulse rounded-full bg-primary/20 blur-[150px]" />
      <div
        className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] animate-pulse rounded-full bg-aws/15 blur-[120px]"
        style={{ animationDelay: "1s" }}
      />
      <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-chart-2/10 blur-[180px]" />

      {/* Content */}
      <div
        className={`relative z-10 mx-auto max-w-5xl px-6 text-center transition-all duration-1000 ${mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      >
        {/* Status badge */}
        <div className="mb-8 inline-flex animate-fade-up items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 opacity-0 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="font-mono text-muted-foreground text-sm">
            Last Updated: {data.lastUpdated}
          </span>
          <Sparkles className="h-3.5 w-3.5 text-primary" />
        </div>

        {/* Main heading */}
        <h1 className="mb-6 animate-fade-up font-bold text-5xl tracking-tight opacity-0 delay-100 sm:text-6xl md:text-7xl lg:text-8xl">
          <span className="text-vercel">{data.title.primary}</span>
          <span className="mx-3 font-light text-muted-foreground/50 sm:mx-4">
            vs
          </span>
          <span className="text-aws">{data.title.secondary}</span>
        </h1>

        <h2 className="mb-6 animate-fade-up font-light text-muted-foreground text-xl opacity-0 delay-200 sm:text-2xl md:text-3xl">
          {data.subtitle}
        </h2>

        {/* Subtitle */}
        <p className="mx-auto mb-10 max-w-2xl animate-fade-up text-balance text-muted-foreground leading-relaxed opacity-0 delay-300">
          {data.description}
        </p>

        {/* Stack badges - stacked vertically */}
        <div className="mb-16 flex animate-fade-up flex-col items-center gap-3 opacity-0 delay-400">
          {/* Primary platform card */}
          <div className="flex items-center gap-4 rounded-2xl border border-border bg-card/80 px-6 py-4 backdrop-blur-sm transition-colors hover:border-foreground/20">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-foreground">
              <svg
                className="h-7 w-7 text-background"
                fill="currentColor"
                viewBox="0 0 76 65"
              >
                <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                Infra + Framework
              </p>
              <p className="font-semibold">Vercel + AI SDK</p>
            </div>
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-2 py-1 text-muted-foreground/40">
            <ArrowUpDown className="h-5 w-5" />
          </div>

          {/* Secondary platform card */}
          <div className="flex items-center gap-4 rounded-2xl border border-border bg-card/80 px-6 py-4 backdrop-blur-sm transition-colors hover:border-aws/30">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-aws">
              <span className="font-bold text-white text-xl">A</span>
            </div>
            <div className="text-left">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                Infra + Framework
              </p>
              <p className="font-semibold">
                AWS Bedrock AgentCore + Strands SDK
              </p>
            </div>
          </div>
        </div>

        {/* Key insights - combined */}
        <div className="inline-flex animate-fade-up flex-col items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-5 py-3 opacity-0 delay-500 sm:flex-row sm:gap-3">
          <span className="font-semibold text-primary text-xs uppercase tracking-wider">
            Key Findings
          </span>
          <span className="hidden h-4 w-px bg-primary/30 sm:block" />
          <span className="text-center text-muted-foreground text-sm sm:text-left">
            Infra ≈ <span className="font-bold font-mono text-primary">3%</span>{" "}
            of TCO
            <span className="mx-2 text-primary/40">•</span>
            Time-to-first-agent:{" "}
            <span className="font-bold font-mono text-primary">3 min</span> vs{" "}
            <span className="font-bold font-mono text-aws">60+ min</span>
          </span>
        </div>
      </div>
    </section>
  );
}
