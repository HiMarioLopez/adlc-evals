"use client";

import {
  Check,
  CheckCircle2,
  Clock,
  Cloud,
  Database,
  GitBranch,
  Layers,
  Rocket,
  Server,
  Shield,
  Terminal,
} from "lucide-react";
import type { DeploymentData } from "@/data/report-schema";

const iconMap: Record<string, React.ReactNode> = {
  Terminal: <Terminal className="h-4 w-4" />,
  GitBranch: <GitBranch className="h-4 w-4" />,
  Cloud: <Cloud className="h-4 w-4" />,
  Shield: <Shield className="h-4 w-4" />,
  Database: <Database className="h-4 w-4" />,
  Server: <Server className="h-4 w-4" />,
  Layers: <Layers className="h-4 w-4" />,
};

interface DeploymentSectionProps {
  data: DeploymentData;
}

export function DeploymentSection({ data }: DeploymentSectionProps) {
  return (
    <section className="px-6 py-24" id="deployment">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16">
          <span className="mb-4 inline-flex items-center gap-2 font-mono text-primary text-xs uppercase tracking-widest">
            <Rocket className="h-4 w-4" />
            Section {data.sectionNumber}
          </span>
          <h2 className="mb-4 font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl">
            {data.title}
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            {data.description}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Vercel Infrastructure */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="flex items-center gap-3 border-border border-b bg-primary/5 px-5 py-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
                <svg
                  className="h-5 w-5 text-background"
                  fill="currentColor"
                  viewBox="0 0 76 65"
                >
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                </svg>
              </div>
              <span className="font-semibold">{data.vercel.title}</span>
              <span className="ml-auto rounded-full bg-primary/10 px-2 py-1 font-mono text-primary text-xs">
                {data.vercel.duration}
              </span>
            </div>
            <div className="space-y-4 p-6">
              {data.vercel.steps.map((step, idx) => (
                <div className="flex gap-4" key={step.stepNumber}>
                  <div className="flex flex-col items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-primary/10 font-bold text-primary text-sm">
                      {step.stepNumber}
                    </div>
                    {idx < data.vercel.steps.length - 1 && (
                      <div className="mt-2 h-full w-0.5 bg-border" />
                    )}
                  </div>
                  <div className="pb-6">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-primary">
                        {iconMap[step.iconName]}
                      </span>
                      <h4 className="font-medium">{step.title}</h4>
                    </div>
                    {step.description && (
                      <p className="mb-3 text-muted-foreground text-sm">
                        {step.description}
                      </p>
                    )}
                    {step.command && (
                      <code className="block rounded-lg bg-muted px-3 py-2 font-mono text-xs">
                        {step.command}
                      </code>
                    )}
                  </div>
                </div>
              ))}

              {/* Done */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-muted-foreground/30 bg-muted">
                    <Check className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                    <h4 className="font-medium text-muted-foreground">Done</h4>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Auto-provisioned: Functions, Edge, CDN, SSL, Preview Deploys
                  </p>
                </div>
              </div>

              {/* Summary */}
              <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
                <div className="mb-2 flex items-center gap-2 font-medium text-primary text-sm">
                  <Cloud className="h-4 w-4" />
                  {data.vercel.summary.title}
                </div>
                <p className="text-muted-foreground text-xs">
                  {data.vercel.summary.description}
                </p>
              </div>
            </div>
          </div>

          {/* AWS Infrastructure */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="flex items-center gap-3 border-border border-b bg-aws/5 px-5 py-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-aws">
                <span className="font-bold text-sm text-white">A</span>
              </div>
              <span className="font-semibold">{data.aws.title}</span>
              <span className="ml-auto rounded-full bg-aws/10 px-2 py-1 font-mono text-aws text-xs">
                {data.aws.duration}
              </span>
            </div>
            <div className="space-y-3 p-6">
              {data.aws.steps.map((step, idx) => (
                <div className="flex gap-4" key={step.stepNumber}>
                  <div className="flex flex-col items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-aws bg-aws/10 font-bold text-aws text-sm">
                      {step.stepNumber}
                    </div>
                    {idx < data.aws.steps.length - 1 && (
                      <div className="mt-2 h-full w-0.5 bg-border" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-aws">{iconMap[step.iconName]}</span>
                      <h4 className="font-medium text-sm">{step.title}</h4>
                    </div>
                    {step.description && (
                      <p className="mt-1 mb-2 text-muted-foreground text-xs">
                        {step.description}
                      </p>
                    )}
                    {step.command && (
                      <code className="mt-2 block rounded bg-muted px-2 py-1 font-mono text-xs">
                        {step.command}
                      </code>
                    )}
                    {step.notes && !step.codeBlock && (
                      <div className="space-y-0.5 overflow-x-auto rounded-lg border border-border bg-muted/50 p-3 font-mono text-xs">
                        {step.notes.map((note, i) => (
                          <p className="text-muted-foreground" key={i}>
                            {note}
                          </p>
                        ))}
                      </div>
                    )}
                    {step.codeBlock && (
                      <>
                        <div className="overflow-x-auto rounded-lg border border-zinc-700 bg-zinc-900 p-3 font-mono text-xs">
                          <pre className="text-zinc-300 leading-relaxed">
                            <code>{step.codeBlock}</code>
                          </pre>
                        </div>
                        {step.notes && (
                          <p className="mt-2 text-muted-foreground text-xs italic">
                            {step.notes[0]}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}

              {/* Summary */}
              <div className="mt-4 rounded-xl border border-aws/20 bg-aws/5 p-4">
                <div className="mb-2 flex items-center gap-2 font-medium text-aws text-sm">
                  <Clock className="h-4 w-4" />
                  {data.aws.summary.title}
                </div>
                <p className="text-muted-foreground text-xs">
                  {data.aws.summary.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom comparison cards */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {data.comparisons.map((comparison) => (
            <div
              className="rounded-xl border border-border bg-card p-5"
              key={comparison.label}
            >
              <h4 className="mb-2 font-semibold text-sm">{comparison.label}</h4>
              <div className="flex items-end gap-4">
                <div>
                  <span className="font-bold text-2xl text-primary">
                    {comparison.vercel.value}
                  </span>
                  {comparison.vercel.unit && (
                    <span className="ml-1 text-muted-foreground text-sm">
                      {comparison.vercel.unit}
                    </span>
                  )}
                </div>
                <span className="text-muted-foreground">vs</span>
                <div>
                  <span className="font-bold text-2xl text-aws">
                    {comparison.aws.value}
                  </span>
                  {comparison.aws.unit && (
                    <span className="ml-1 text-muted-foreground text-sm">
                      {comparison.aws.unit}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
