#!/usr/bin/env bun
/**
 * check-sync.ts — Drift detector between site TS data and generated markdown reports.
 *
 * The site's TS data files (`site/data/reports/{vendor}/*.ts`) are the SOURCE OF TRUTH.
 * The sharded markdown reports (`generated-reports/{vendor}/.../*.md`) are downstream.
 *
 * This script loads the TS report objects, then searches the latest sharded markdown
 * for every mirror-field it expects to find. Missing or mismatched values are printed
 * to stdout as a drift report. It does NOT write anything; humans (or agents) fix drift
 * with normal edit tools after reading the report.
 *
 * Exit code: 0 if clean, 1 if any hard error detected. Suitable for CI.
 *
 * Usage: bun run scripts/check-sync.ts [vercel-aws|vercel-azure|all]
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { type ReportId, reports } from "@/data/reports/index.ts";

const YEAR_RE = /^\d{4}$/;
const MONTH_RE = /^\d{2}$/;
const SHARD_RE = /^\d{2}-.*\.md$/;
const CLAUSE_SPLIT_RE = /[:·.,(]/;

const repoRoot = new URL("../..", import.meta.url).pathname.replace(/\/$/, "");

interface Finding {
  detail?: string;
  message: string;
  reportId: string;
  severity: "error" | "warn";
}

const findings: Finding[] = [];

function record(f: Finding): void {
  findings.push(f);
}

function findLatestReportDir(vendor: string): string | null {
  const base = join(repoRoot, "generated-reports", vendor);
  try {
    const years = readdirSync(base)
      .filter((y) => YEAR_RE.test(y))
      .sort()
      .reverse();
    for (const year of years) {
      const months = readdirSync(join(base, year))
        .filter((m) => MONTH_RE.test(m))
        .sort()
        .reverse();
      for (const month of months) {
        const entries = readdirSync(join(base, year, month));
        const dirs = entries
          .map((e) => ({ name: e, full: join(base, year, month, e) }))
          .filter((e) => {
            try {
              return statSync(e.full).isDirectory();
            } catch {
              return false;
            }
          })
          .sort((a, b) => b.name.localeCompare(a.name));
        if (dirs[0]) {
          return dirs[0].full;
        }
      }
    }
  } catch {
    return null;
  }
  return null;
}

function readAllShards(dir: string): string {
  const files = readdirSync(dir)
    .filter((f) => SHARD_RE.test(f))
    .sort();
  return files.map((f) => readFileSync(join(dir, f), "utf8")).join("\n");
}

function checkIntraConsistency(vendor: string, report: unknown): void {
  const r = report as {
    metadata?: { version?: string };
    footer?: { reportVersion?: string };
  };
  const metaVersion = r.metadata?.version;
  const footerVersion = r.footer?.reportVersion;
  if (metaVersion && footerVersion && metaVersion !== footerVersion) {
    record({
      severity: "error",
      reportId: vendor,
      message: "Intra-TS drift: metadata.version ≠ footer.reportVersion",
      detail: `metadata.version="${metaVersion}" footer.reportVersion="${footerVersion}"`,
    });
  }
}

function checkAnalyzedVersions(
  vendor: string,
  report: unknown,
  corpus: string
): void {
  const r = report as {
    footer?: { analyzedVersions?: Record<string, unknown> };
  };
  const analyzed = r.footer?.analyzedVersions;
  if (!analyzed) {
    return;
  }
  for (const [key, val] of Object.entries(analyzed)) {
    if (typeof val !== "string") {
      continue;
    }
    if (!corpus.includes(val)) {
      record({
        severity: "warn",
        reportId: vendor,
        message: `footer.analyzedVersions.${key} not found in markdown`,
        detail: `Expected substring: "${val}"`,
      });
    }
  }
}

function checkRepos(vendor: string, report: unknown, corpus: string): void {
  const r = report as {
    adoption?: { repositories?: Array<{ name?: string }> };
  };
  const repos = r.adoption?.repositories ?? [];
  for (const repo of repos) {
    if (repo.name && !corpus.includes(repo.name)) {
      record({
        severity: "warn",
        reportId: vendor,
        message: `adoption.repositories: "${repo.name}" not referenced in markdown`,
      });
    }
  }
}

function checkDeltas(vendor: string, report: unknown, corpus: string): void {
  const r = report as {
    delta?: { deltas?: Array<{ version?: string; platform?: string }> };
  };
  const deltas = r.delta?.deltas ?? [];
  for (const d of deltas) {
    if (d.version && !corpus.includes(d.version)) {
      record({
        severity: "warn",
        reportId: vendor,
        message: `delta.deltas: version "${d.version}" (platform: ${d.platform ?? "?"}) not in markdown`,
      });
    }
  }
}

function checkHighlights(
  vendor: string,
  report: unknown,
  corpus: string
): void {
  const r = report as { metadata?: { highlights?: unknown[] } };
  const highlights = r.metadata?.highlights ?? [];
  const lowerCorpus = corpus.toLowerCase();
  for (const h of highlights) {
    const firstClause = String(h).split(CLAUSE_SPLIT_RE)[0].trim();
    if (
      firstClause.length >= 8 &&
      !lowerCorpus.includes(firstClause.toLowerCase())
    ) {
      record({
        severity: "warn",
        reportId: vendor,
        message: "metadata.highlights: no prose match in markdown",
        detail: `"${firstClause}" (from full highlight: "${h}")`,
      });
    }
  }
}

function checkReport(vendor: ReportId): void {
  const report = reports[vendor];
  if (!report) {
    record({
      severity: "error",
      reportId: vendor,
      message: `Unknown report id '${vendor}'`,
    });
    return;
  }

  const reportDir = findLatestReportDir(vendor);
  if (!reportDir) {
    record({
      severity: "error",
      reportId: vendor,
      message: `No sharded report directory found under generated-reports/${vendor}/`,
    });
    return;
  }

  const corpus = readAllShards(reportDir);
  checkIntraConsistency(vendor, report);
  checkAnalyzedVersions(vendor, report, corpus);
  checkRepos(vendor, report, corpus);
  checkDeltas(vendor, report, corpus);
  checkHighlights(vendor, report, corpus);
}

function main(): void {
  const arg = process.argv[2] ?? "all";
  const targets: ReportId[] =
    arg === "all" ? ["vercel-aws", "vercel-azure"] : [arg as ReportId];

  for (const t of targets) {
    checkReport(t);
  }

  const errors = findings.filter((f) => f.severity === "error");
  const warns = findings.filter((f) => f.severity === "warn");

  if (findings.length === 0) {
    console.log("✓ No drift detected across", targets.join(", "));
    process.exit(0);
  }

  console.log(
    `Drift report: ${errors.length} error(s), ${warns.length} warning(s)`
  );
  console.log();
  for (const f of findings) {
    const icon = f.severity === "error" ? "✗" : "⚠";
    console.log(`${icon} [${f.reportId}] ${f.message}`);
    if (f.detail) {
      console.log(`    ${f.detail}`);
    }
  }
  process.exit(errors.length > 0 ? 1 : 0);
}

main();
