"use client";

import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

const vercelLinks = [
  { label: "AI SDK 6 Blog", url: "https://vercel.com/blog/ai-sdk-6" },
  { label: "AI SDK GitHub", url: "https://github.com/vercel/ai" },
  { label: "AI Gateway", url: "https://vercel.com/ai-gateway" },
  { label: "Sandbox Docs", url: "https://vercel.com/docs/vercel-sandbox" },
  {
    label: "Workflow Blog",
    url: "https://vercel.com/blog/introducing-workflow",
  },
  {
    label: "Secure Compute",
    url: "https://vercel.com/docs/connectivity/secure-compute",
  },
];

const awsLinks = [
  {
    label: "Bedrock AgentCore Overview",
    url: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html",
  },
  {
    label: "Bedrock AgentCore Pricing",
    url: "https://aws.amazon.com/bedrock/agentcore/pricing/",
  },
  {
    label: "Bedrock AgentCore Regions",
    url: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agentcore-regions.html",
  },
  { label: "Strands SDK", url: "https://github.com/strands-agents/sdk-python" },
  { label: "Bedrock Pricing", url: "https://aws.amazon.com/bedrock/pricing/" },
  {
    label: "Bedrock AgentCore Policy",
    url: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/policy.html",
  },
];

const _documentationGaps = [
  { item: "Vercel 'AI Units' v2026", status: "Not publicly documented" },
  { item: "Vercel Workflow SDK pricing details", status: "Beta pricing only" },
  {
    item: "Bedrock AgentCore GA SLA percentage",
    status: "No specific uptime % published",
  },
];

const contributors = [{ name: "Mario Lopez Martinez", github: "HiMarioLopez" }];

export function Footer() {
  return (
    <footer
      className="border-border border-t bg-card/50 px-6 py-24"
      id="sources"
    >
      <div className="mx-auto max-w-6xl">
        {/* Links grid */}
        <div className="mb-16 grid gap-12 md:grid-cols-2">
          {/* Vercel */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
                <svg
                  className="h-5 w-5 text-background"
                  fill="currentColor"
                  viewBox="0 0 76 65"
                >
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                </svg>
              </div>
              <h3 className="font-semibold">Vercel Documentation</h3>
            </div>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
              {vercelLinks.map((link) => (
                <li key={link.label}>
                  <a
                    className="inline-flex items-center gap-1.5 text-muted-foreground text-sm transition-colors hover:text-primary"
                    href={link.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {link.label}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* AWS */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-aws">
                <span className="font-bold text-sm text-white">A</span>
              </div>
              <h3 className="font-semibold">AWS Documentation</h3>
            </div>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
              {awsLinks.map((link) => (
                <li key={link.label}>
                  <a
                    className="inline-flex items-center gap-1.5 text-muted-foreground text-sm transition-colors hover:text-aws"
                    href={link.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {link.label}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contributors */}
        <div className="mb-12 border-border/50 border-t pt-8">
          <div className="mb-4 flex items-center gap-3">
            <Github className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-medium text-muted-foreground text-sm">
              Contributors
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {contributors.map((contributor) => (
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

        {/* Version info */}
        <div className="flex flex-col items-center gap-4 border-border border-t pt-8 sm:gap-6">
          <div className="flex flex-col items-center gap-2 text-muted-foreground text-sm sm:flex-row sm:gap-4">
            <span>
              Report Version:{" "}
              <span className="font-mono text-foreground">1.0.0</span>
            </span>
            <span className="hidden text-border sm:inline">•</span>
            <span>
              Generated:{" "}
              <span className="font-mono text-foreground">2026-01-08</span>
            </span>
          </div>

          <div className="flex flex-col items-center gap-2 text-muted-foreground text-xs sm:flex-row sm:gap-2">
            <span>Analyzed:</span>
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
              <span className="font-mono text-primary">ai@6.0.23</span>
              <span className="hidden sm:inline">•</span>
              <span className="font-mono text-chart-2">strands@1.21.0</span>
              <span className="hidden sm:inline">•</span>
              <span className="font-mono text-aws">agentcore@1.1.4</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 px-4 text-center sm:mt-8 sm:px-0">
          <p className="text-muted-foreground text-xs leading-relaxed">
            Data sourced from official documentation and public GitHub
            repositories.
          </p>
        </div>
      </div>
    </footer>
  );
}
