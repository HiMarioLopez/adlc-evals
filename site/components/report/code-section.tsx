"use client";

import { Code2 } from "lucide-react";
import { useState } from "react";
import { LightCodeBlock } from "@/components/ui/code-block";
import type { CodeData } from "@/data/report-schema";
import { cn } from "@/lib/utils";

interface CodeSectionProps {
  data: CodeData;
}

export function CodeSection({ data }: CodeSectionProps) {
  const [activeVercelTab, setActiveVercelTab] = useState(
    data.vercel.examples[0]?.key || ""
  );
  const [activeAwsTab, setActiveAwsTab] = useState(
    data.aws.examples[0]?.key || ""
  );

  const activeVercelExample = data.vercel.examples.find(
    (e) => e.key === activeVercelTab
  );
  const activeAwsExample = data.aws.examples.find(
    (e) => e.key === activeAwsTab
  );

  return (
    <section className="px-6 py-24" id="code">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16">
          <span className="mb-4 inline-flex items-center gap-2 font-mono text-primary text-xs uppercase tracking-widest">
            <Code2 className="h-4 w-4" />
            Section {data.sectionNumber}
          </span>
          <h2 className="mb-4 font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl">
            {data.title}
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            {data.description}
          </p>
        </div>

        {/* Code panels */}
        <div className="mb-12 grid gap-6 lg:grid-cols-2">
          {/* Vercel */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="flex items-center gap-3 border-border border-b bg-muted/30 px-5 py-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
                <svg
                  className="h-5 w-5 text-background"
                  fill="currentColor"
                  viewBox="0 0 76 65"
                >
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                </svg>
              </div>
              <span className="font-semibold">{data.vercel.label}</span>
              <span className="ml-auto font-mono text-muted-foreground text-xs">
                {data.vercel.language}
              </span>
            </div>
            <div className="flex overflow-x-auto border-border border-b">
              {data.vercel.examples.map((example) => (
                <button
                  className={cn(
                    "whitespace-nowrap border-b-2 px-4 py-2.5 text-sm transition-all",
                    activeVercelTab === example.key
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                  key={example.key}
                  onClick={() => setActiveVercelTab(example.key)}
                >
                  {example.label}
                </button>
              ))}
            </div>
            {activeVercelExample && (
              <LightCodeBlock
                code={activeVercelExample.code}
                language={activeVercelExample.language}
              />
            )}
          </div>

          {/* AWS */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="flex items-center gap-3 border-border border-b bg-aws/5 px-5 py-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-aws">
                <span className="font-bold text-sm text-white">A</span>
              </div>
              <span className="font-semibold">{data.aws.label}</span>
              <span className="ml-auto font-mono text-muted-foreground text-xs">
                {data.aws.language}
              </span>
            </div>
            <div className="flex overflow-x-auto border-border border-b">
              {data.aws.examples.map((example) => (
                <button
                  className={cn(
                    "whitespace-nowrap border-b-2 px-4 py-2.5 text-sm transition-all",
                    activeAwsTab === example.key
                      ? "border-aws bg-aws/5 text-aws"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                  key={example.key}
                  onClick={() => setActiveAwsTab(example.key)}
                >
                  {example.label}
                </button>
              ))}
            </div>
            {activeAwsExample && (
              <LightCodeBlock
                code={activeAwsExample.code}
                language={
                  activeAwsExample.key === "policy"
                    ? "hcl"
                    : activeAwsExample.language
                }
              />
            )}
          </div>
        </div>

        {/* Pattern comparison */}
        <div className="mb-12 grid gap-4 md:grid-cols-3">
          {data.patternComparisons.map((pattern) => (
            <div
              className="rounded-2xl border border-border bg-card p-6"
              key={pattern.title}
            >
              <h4 className="mb-3 font-semibold">{pattern.title}</h4>
              <div className="space-y-2 text-muted-foreground text-sm">
                <p>
                  <span className="text-foreground">Vercel:</span>{" "}
                  {pattern.vercel.code ? (
                    <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                      {pattern.vercel.code}
                    </code>
                  ) : (
                    pattern.vercel.label
                  )}
                  {pattern.vercel.code &&
                    !pattern.vercel.label.includes(pattern.vercel.code) && (
                      <>
                        {" "}
                        {pattern.vercel.label.replace(pattern.vercel.code, "")}
                      </>
                    )}
                </p>
                <p>
                  <span className="text-foreground">AWS:</span>{" "}
                  {pattern.aws.code ? (
                    <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                      {pattern.aws.code}
                    </code>
                  ) : (
                    pattern.aws.label
                  )}
                  {pattern.aws.code &&
                    !pattern.aws.label.includes(pattern.aws.code) && (
                      <> {pattern.aws.label.replace(pattern.aws.code, "")}</>
                    )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
