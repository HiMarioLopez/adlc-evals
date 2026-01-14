"use client";

import {
  BarChart3,
  CircleDot,
  Clock,
  ExternalLink,
  GitFork,
} from "lucide-react";
import type { AdoptionData } from "@/data/report-schema";

interface AdoptionSectionProps {
  data: AdoptionData;
}

export function AdoptionSection({ data }: AdoptionSectionProps) {
  return (
    <section className="px-6 py-24" id="adoption">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16">
          <span className="mb-4 inline-flex items-center gap-2 font-mono text-primary text-xs uppercase tracking-widest">
            <BarChart3 className="h-4 w-4" />
            Section {data.sectionNumber}
          </span>
          <h2 className="mb-4 font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl">
            {data.title}
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            {data.description}
          </p>
        </div>

        {/* Repository cards */}
        <div className="mb-12 grid gap-6">
          {data.repositories.map((repo) => (
            <div
              className={`overflow-hidden rounded-2xl border border-border bg-card hover:border-${repo.color}/30 transition-colors`}
              key={repo.name}
            >
              <div className="p-6 sm:p-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                  {/* Repo info */}
                  <div className="lg:w-1/3">
                    <div className="mb-3 flex items-center gap-3">
                      <div
                        className={`h-10 w-10 rounded-xl bg-${repo.color}/10 flex items-center justify-center`}
                      >
                        <GitFork className={`h-5 w-5 text-${repo.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold">{repo.name}</h3>
                        <p className="text-muted-foreground text-xs">
                          {repo.description}
                        </p>
                      </div>
                    </div>
                    <a
                      className={`inline-flex items-center gap-1.5 text-sm text-${repo.color} hover:underline`}
                      href={repo.link}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      View repository
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 lg:w-1/3">
                    <div>
                      <p className="mb-1 text-muted-foreground text-xs uppercase tracking-widest">
                        Latest Tag
                      </p>
                      <p className="font-mono text-sm">{repo.latestTag}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-muted-foreground text-xs uppercase tracking-widest">
                        Language
                      </p>
                      <p className="text-sm">{repo.language}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-muted-foreground text-xs uppercase tracking-widest">
                        Forks
                      </p>
                      <p className="font-mono text-sm">{repo.forks}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-muted-foreground text-xs uppercase tracking-widest">
                        Open Issues
                      </p>
                      <p className="font-mono text-sm">{repo.openIssues}</p>
                    </div>
                  </div>

                  {/* Issue velocity */}
                  <div className="lg:w-1/3">
                    <p className="mb-3 text-muted-foreground text-xs uppercase tracking-widest">
                      60-Day Issue Activity
                    </p>
                    <div className="mb-3 flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <CircleDot className="h-4 w-4 text-chart-3" />
                        <span className="text-sm">
                          {repo.recentOpen} opened
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CircleDot className="h-4 w-4 text-primary" />
                        <span className="text-sm">
                          {repo.recentClosed} closed
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-xs">
                        Ratio:
                      </span>
                      <span
                        className={`font-mono text-sm ${
                          Number.parseFloat(repo.ratio) <= 1
                            ? "text-primary"
                            : Number.parseFloat(repo.ratio) <= 2
                              ? "text-chart-3"
                              : "text-aws"
                        }`}
                      >
                        {repo.ratio}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        ({repo.ratioLabel})
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center gap-4 border-border border-t bg-muted/30 px-6 py-4 text-muted-foreground text-xs sm:px-8">
                <Clock className="h-3.5 w-3.5" />
                <span>
                  Last commit:{" "}
                  {new Date(repo.latestCommit).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <span className="text-border">•</span>
                <span>{repo.ecosystem}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Activity signals */}
        <div className="grid gap-6 md:grid-cols-2">
          {data.activitySignals.map((platform) => (
            <div
              className="rounded-2xl border border-border bg-card p-6"
              key={platform.platform}
            >
              <h4 className="mb-4 font-semibold">{platform.platform}</h4>
              <p className="mb-3 text-muted-foreground text-xs uppercase tracking-widest">
                Active Development Signals
              </p>
              <ul className="space-y-2">
                {platform.signals.map((signal, i) => (
                  <li
                    className="flex items-center gap-2 text-muted-foreground text-sm"
                    key={i}
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {signal}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Data note */}
        <div className="mt-8 rounded-xl border border-border bg-muted/50 p-4">
          <p className="text-center text-muted-foreground text-xs">
            {data.dataNote}
          </p>
        </div>
      </div>
    </section>
  );
}
