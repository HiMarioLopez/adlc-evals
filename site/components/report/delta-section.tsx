"use client";

import { ArrowRight, ExternalLink, GitBranch } from "lucide-react";
import type { DeltaData } from "@/data/report-schema";

interface DeltaSectionProps {
  data: DeltaData;
}

export function DeltaSection({ data }: DeltaSectionProps) {
  return (
    <section className="px-6 py-24" id="delta">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16">
          <span className="mb-4 inline-flex items-center gap-2 font-mono text-primary text-xs uppercase tracking-widest">
            <GitBranch className="h-4 w-4" />
            Changelog
          </span>
          <h2 className="mb-4 font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl">
            {data.title}
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            {data.description}
          </p>
        </div>

        {/* Delta cards */}
        <div className="grid gap-6">
          {data.deltas.map((delta, idx) => (
            <div
              className={`group relative overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-${delta.color}/30 hover:bg-card/80`}
              key={delta.platform}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Accent line */}
              <div
                className={`absolute top-0 bottom-0 left-0 w-1 bg-${delta.color}`}
              />

              <div className="p-6 sm:p-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                  {/* Platform info */}
                  <div className="lg:w-1/3">
                    <div className="mb-4 flex items-center gap-3">
                      <h3 className="font-semibold text-xl">
                        {delta.platform}
                      </h3>
                      <a
                        className="rounded-lg bg-secondary/50 p-1.5 transition-colors hover:bg-secondary"
                        href={delta.link}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                      </a>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <span className="rounded-lg bg-muted px-2.5 py-1 font-mono text-muted-foreground text-xs">
                        {delta.previous.split(" ")[0]}
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      <span
                        className={`rounded-lg px-2.5 py-1 bg-${delta.color}/10 text-${delta.color} font-medium font-mono text-xs`}
                      >
                        {delta.current.split(" ")[0]}
                      </span>
                    </div>
                  </div>

                  {/* Version transition */}
                  <div className="flex flex-col gap-2 lg:w-1/3">
                    <p className="text-muted-foreground text-xs uppercase tracking-widest">
                      Previous
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {delta.previous}
                    </p>
                    <p className="mt-2 text-muted-foreground text-xs uppercase tracking-widest">
                      Current
                    </p>
                    <p className="font-medium text-foreground text-sm">
                      {delta.current}
                    </p>
                  </div>

                  {/* Changes */}
                  <div className="lg:w-1/3">
                    <p className="mb-3 text-muted-foreground text-xs uppercase tracking-widest">
                      Key Changes
                    </p>
                    <ul className="space-y-2">
                      {delta.changes.map((change, i) => (
                        <li
                          className="flex items-start gap-2 text-muted-foreground text-sm"
                          key={i}
                        >
                          <span
                            className={`mt-1.5 h-1.5 w-1.5 rounded-full bg-${delta.color} shrink-0`}
                          />
                          {change}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 border-border border-t pt-4">
                      <span className="font-mono text-muted-foreground text-xs">
                        Latest:{" "}
                        <span className="text-foreground">{delta.version}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
