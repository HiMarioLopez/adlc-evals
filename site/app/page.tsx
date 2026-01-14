"use client";

import {
  ArrowRight,
  BookOpen,
  FileText,
  Github,
  Info,
  Moon,
  Sun,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const siteContributors = [
  { name: "Mario Lopez Martinez", github: "HiMarioLopez" },
];

const reports = [
  {
    id: "vercel-aws",
    title: "Vercel vs AWS",
    subtitle: "Agent Stack Technical Evaluation",
    description:
      "Comprehensive comparison of Vercel + AI SDK versus AWS Bedrock AgentCore + Strands SDK for building production-ready AI agents.",
    href: "/reports/vercel-aws",
    date: "January 8, 2026",
    version: "1.0.0",
    platforms: [
      {
        name: "Vercel",
        color: "bg-foreground",
        textColor: "text-background",
        icon: (
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 76 65">
            <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
          </svg>
        ),
      },
      {
        name: "AWS",
        color: "bg-aws",
        textColor: "text-white",
        icon: <span className="font-bold text-sm">A</span>,
      },
    ],
    highlights: [
      "Infrastructure ≈ 3% of TCO",
      "Time-to-first-agent: 3 min vs 60+ min",
      "Detailed pricing analysis",
    ],
    contributors: [{ name: "Mario Lopez Martinez", github: "HiMarioLopez" }],
  },
];

export default function DirectoryPage() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed inset-x-0 top-0 z-50 w-full border-border border-b bg-background/85 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-lg bg-primary/20 blur-md" />
              <div className="relative flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5">
                <FileText className="h-4 w-4 text-primary" />
                <span className="font-semibold text-sm">ADLC Reports</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              className="hidden items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium text-muted-foreground text-xs transition-colors hover:bg-muted/50 hover:text-foreground sm:flex"
              href="https://github.com/HiMarioLopez/adlc-evals"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Github className="h-4 w-4" />
              View Source
            </a>

            <button
              aria-label="Toggle theme"
              className="rounded-lg bg-secondary/50 p-2 transition-colors hover:bg-secondary"
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
            >
              {mounted &&
                (resolvedTheme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                ))}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center py-8 pt-28 md:min-h-[60vh] md:py-12">
        {/* Background layers */}
        <div className="grid-pattern absolute inset-0 opacity-50" />

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] animate-pulse rounded-full bg-primary/20 blur-[150px]" />
        <div
          className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] animate-pulse rounded-full bg-chart-2/15 blur-[120px]"
          style={{ animationDelay: "1s" }}
        />

        {/* Content */}
        <div
          className={`relative z-10 mx-auto max-w-4xl px-6 text-center transition-all duration-1000 ${mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 backdrop-blur-sm">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="font-medium text-muted-foreground text-sm">
              Agent-Driven Local Compute Research
            </span>
          </div>

          <h1 className="mb-6 font-bold text-4xl tracking-tight sm:text-5xl md:text-6xl">
            <span className="gradient-text">Technical Reports</span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-balance text-lg text-muted-foreground leading-relaxed">
            In-depth technical evaluations of AI agent frameworks, cloud
            infrastructure, and development workflows. Built with reproducible
            methodology and transparent sourcing.
          </p>
        </div>
      </section>

      {/* Methodology Note */}
      <section className="relative px-6 pb-12">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Info className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="mb-2 font-semibold">About These Reports</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  All analysis follows published documentation with direct links
                  to official sources, version numbers for analyzed SDKs, and
                  clear methodology notes. The goal is to provide accurate,
                  reproducible comparisons that help developers make informed
                  decisions based on technical merit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reports Grid */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 font-semibold text-2xl">Available Reports</h2>

          <div className="grid gap-6">
            {reports.map((report) => (
              <Link
                className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-primary/5 hover:shadow-xl"
                href={report.href}
                key={report.id}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative p-6 sm:p-8">
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                    {/* Left side - Content */}
                    <div className="flex-1">
                      {/* Platform badges */}
                      <div className="mb-4 flex items-center gap-2">
                        {report.platforms.map((platform, idx) => (
                          <div
                            className="flex items-center"
                            key={platform.name}
                          >
                            <div
                              className={`flex h-7 w-7 items-center justify-center rounded-lg ${platform.color} ${platform.textColor}`}
                            >
                              {platform.icon}
                            </div>
                            {idx < report.platforms.length - 1 && (
                              <span className="mx-2 text-muted-foreground/50 text-sm">
                                vs
                              </span>
                            )}
                          </div>
                        ))}
                      </div>

                      <h3 className="mb-1 font-bold text-2xl transition-colors group-hover:text-primary">
                        {report.title}
                      </h3>
                      <p className="mb-3 font-medium text-muted-foreground">
                        {report.subtitle}
                      </p>
                      <p className="mb-4 text-muted-foreground text-sm leading-relaxed">
                        {report.description}
                      </p>

                      {/* Highlights */}
                      <div className="mb-4 flex flex-wrap gap-2">
                        {report.highlights.map((highlight) => (
                          <span
                            className="rounded-full bg-muted/50 px-3 py-1 font-medium text-muted-foreground text-xs"
                            key={highlight}
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>

                      {/* Contributors */}
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground/60 text-xs">
                          Contributors:
                        </span>
                        <div className="flex -space-x-2">
                          {report.contributors.map((contributor) => (
                            <Image
                              alt={contributor.name}
                              className="rounded-full ring-2 ring-card"
                              height={24}
                              key={contributor.github}
                              src={`https://avatars.githubusercontent.com/${contributor.github}`}
                              title={contributor.name}
                              width={24}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right side - Meta + CTA */}
                    <div className="flex flex-row items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-start">
                      <div className="text-left sm:text-right">
                        <p className="font-mono text-muted-foreground text-xs">
                          {report.date}
                        </p>
                        <p className="font-mono text-muted-foreground/60 text-xs">
                          v{report.version}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 font-medium text-primary text-sm transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                        Read Report
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-border border-t bg-card/30 px-6 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Contributors */}
          <div className="mb-8 border-border/50 border-b pb-8">
            <div className="mb-4 flex items-center gap-2">
              <Github className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-muted-foreground text-sm">
                Contributors
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {siteContributors.map((contributor) => (
                <a
                  className="group flex items-center gap-2 rounded-full bg-muted/50 px-3 py-1.5 transition-colors hover:bg-muted"
                  href={`https://github.com/${contributor.github}`}
                  key={contributor.github}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Image
                    alt={contributor.name}
                    className="rounded-full"
                    height={20}
                    src={`https://avatars.githubusercontent.com/${contributor.github}`}
                    width={20}
                  />
                  <span className="text-muted-foreground text-sm transition-colors group-hover:text-foreground">
                    {contributor.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <FileText className="h-4 w-4" />
              <span>ADLC Evals</span>
            </div>

            <div className="flex items-center gap-4 text-muted-foreground text-sm">
              <a
                className="transition-colors hover:text-foreground"
                href="https://github.com/HiMarioLopez/adlc-evals"
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub
              </a>
              <span className="text-border">•</span>
              <span>
                Built with{" "}
                <a
                  className="text-primary transition-colors hover:underline"
                  href="https://nextjs.org"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Next.js
                </a>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
