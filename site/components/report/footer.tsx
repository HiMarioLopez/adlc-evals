"use client";

import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import type { FooterData } from "@/data/report-schema";

interface FooterProps {
  data: FooterData;
}

export function Footer({ data }: FooterProps) {
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
              {data.vercelLinks.map((link) => (
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
              {data.awsLinks.map((link) => (
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
            {data.contributors.map((contributor) => (
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
              <span className="font-mono text-foreground">
                {data.reportVersion}
              </span>
            </span>
            <span className="hidden text-border sm:inline">•</span>
            <span>
              Generated:{" "}
              <span className="font-mono text-foreground">
                {data.generatedDate}
              </span>
            </span>
          </div>

          <div className="flex flex-col items-center gap-2 text-muted-foreground text-xs sm:flex-row sm:gap-2">
            <span>Analyzed:</span>
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
              <span className="font-mono text-primary">
                {data.analyzedVersions.aiSdk}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="font-mono text-chart-2">
                {data.analyzedVersions.strands}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="font-mono text-aws">
                {data.analyzedVersions.agentcore}
              </span>
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
