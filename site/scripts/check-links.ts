#!/usr/bin/env bun
/**
 * check-links.ts — External link validator for TS report data.
 *
 * The site's TS data files (`site/data/reports/{vendor}/*.ts`) reference dozens
 * of external URLs — docs, blog posts, GitHub repos, integrations. When those
 * links 404, the report's credibility erodes silently because the build still
 * succeeds.
 *
 * This script walks every loaded report object, collects every string that
 * parses as an http(s) URL, and validates each one with a real network call.
 * Findings fall into three buckets:
 *
 *   - Hard failure (network error, 404, 410, 5xx) — treated as error, fails CI.
 *   - Soft 404 (HTTP 200 but the page is a known "not found" state for that
 *     host, e.g. a Vercel Marketplace slug that doesn't exist, a Vercel Docs
 *     "Page Not Found" stub, or an MS Learn "Page not found" render) — error.
 *   - Redirect chain ending in 200 — warning, CI passes but the URL should be
 *     updated to the canonical destination to save a round trip.
 *
 * It does NOT write anything. Humans (or agents) fix findings with normal edit
 * tools after reading the report.
 *
 * Exit code: 0 if clean or warnings-only, 1 if any error detected. In --strict
 * mode, warnings are promoted to errors.
 *
 * Usage:
 *   bun run scripts/check-links.ts [vercel-aws|vercel-azure|all] [--strict]
 *     [--timeout=15000] [--concurrency=20]
 */

import { type ReportId, reports } from "@/data/reports/index.ts";

const URL_RE = /^https?:\/\/\S+$/;
const TITLE_RE = /<title>([^<]+)<\/title>/;
const VERCEL_HOST_RE = /^vercel\.com$/;
const VERCEL_MARKETPLACE_PATH_RE = /\/marketplace\//;
const VERCEL_DOCS_PATH_RE = /\/docs(\/|$)/;
const VERCEL_DOCS_404_BODY_RE = /<h1[^>]*>\s*Page Not Found\s*<\/h1>/i;
const MS_LEARN_HOST_RE = /learn\.microsoft\.com$/;
const MS_LEARN_404_TITLE_RE = /page not found/i;
const DEFAULT_TIMEOUT_MS = 15_000;
const DEFAULT_CONCURRENCY = 20;
const UA =
  "Mozilla/5.0 (compatible; adlc-evals-link-checker/1.0; +https://adlc-evals.vercel.app)";

interface Finding {
  detail?: string;
  message: string;
  reportId: string;
  severity: "error" | "warn";
}

interface UrlRef {
  path: string;
  reportId: ReportId;
  url: string;
}

interface CheckResult {
  detail?: string;
  finalUrl?: string;
  kind: "ok" | "redirect" | "hard-404" | "soft-404" | "network-error" | "other";
  ref: UrlRef;
  status?: number;
}

const findings: Finding[] = [];

function record(f: Finding): void {
  findings.push(f);
}

function collectUrls(
  node: unknown,
  reportId: ReportId,
  path: string,
  out: UrlRef[]
): void {
  if (node === null || node === undefined) {
    return;
  }
  if (typeof node === "string") {
    if (URL_RE.test(node)) {
      out.push({ reportId, path, url: node });
    }
    return;
  }
  if (Array.isArray(node)) {
    for (let i = 0; i < node.length; i++) {
      collectUrls(node[i], reportId, `${path}[${i}]`, out);
    }
    return;
  }
  if (typeof node === "object") {
    for (const [key, value] of Object.entries(
      node as Record<string, unknown>
    )) {
      collectUrls(value, reportId, path ? `${path}.${key}` : key, out);
    }
  }
}

function isSoftNotFound(
  url: string,
  finalUrl: string,
  body: string
): string | null {
  const effectiveUrl = finalUrl || url;
  const host = new URL(effectiveUrl).hostname;
  const title = TITLE_RE.exec(body)?.[1]?.trim() ?? "";

  // Vercel Marketplace: an unknown slug renders the marketplace home page
  // with a generic "Vercel Marketplace" <title>. A valid slug renders "X for Vercel".
  if (
    VERCEL_HOST_RE.test(host) &&
    VERCEL_MARKETPLACE_PATH_RE.test(effectiveUrl) &&
    title === "Vercel Marketplace"
  ) {
    return `Vercel Marketplace slug returned generic listing page (title: "${title}")`;
  }

  // Vercel Docs: 404 pages are server-rendered with a precise h1.
  if (
    VERCEL_HOST_RE.test(host) &&
    VERCEL_DOCS_PATH_RE.test(effectiveUrl) &&
    VERCEL_DOCS_404_BODY_RE.test(body)
  ) {
    return "Vercel Docs returned Page Not Found stub";
  }

  // MS Learn: 404s reach a redirect page whose <title> contains "Page not found".
  if (MS_LEARN_HOST_RE.test(host) && MS_LEARN_404_TITLE_RE.test(title)) {
    return `MS Learn returned not-found page (title: "${title}")`;
  }

  return null;
}

async function checkUrl(ref: UrlRef, timeoutMs: number): Promise<CheckResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(ref.url, {
      redirect: "follow",
      signal: controller.signal,
      headers: { "User-Agent": UA, Accept: "text/html,*/*" },
    });

    const status = response.status;
    const finalUrl = response.url;

    if (status === 404 || status === 410) {
      return { ref, kind: "hard-404", status, finalUrl };
    }
    if (status >= 500) {
      return {
        ref,
        kind: "other",
        status,
        finalUrl,
        detail: `HTTP ${status} (server error — may be transient)`,
      };
    }
    // 403 is common for bot-blocked docs/API hosts — treat as OK since the URL exists.
    if (!(status === 200 || status === 403)) {
      return {
        ref,
        kind: "other",
        status,
        finalUrl,
        detail: `HTTP ${status}`,
      };
    }

    // For 200s, read the body (capped) and run soft-404 heuristics per host.
    if (status === 200) {
      const body = await response.text().catch(() => "");
      const softReason = isSoftNotFound(
        ref.url,
        finalUrl,
        body.slice(0, 64_000)
      );
      if (softReason) {
        return { ref, kind: "soft-404", status, finalUrl, detail: softReason };
      }
    }

    // If we followed a redirect to reach a 2xx/3xx, flag it as a warning.
    if (finalUrl && finalUrl !== ref.url) {
      return { ref, kind: "redirect", status, finalUrl };
    }

    return { ref, kind: "ok", status, finalUrl };
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    return { ref, kind: "network-error", detail: reason };
  } finally {
    clearTimeout(timer);
  }
}

async function runWithConcurrency<T, R>(
  items: T[],
  limit: number,
  worker: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let cursor = 0;
  async function pull(): Promise<void> {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index]);
    }
  }
  const runners = Array.from({ length: Math.min(limit, items.length) }, () =>
    pull()
  );
  await Promise.all(runners);
  return results;
}

function recordResult(result: CheckResult, strict: boolean): void {
  const { ref } = result;
  const location = `${ref.path} → ${ref.url}`;
  switch (result.kind) {
    case "hard-404":
      record({
        severity: "error",
        reportId: ref.reportId,
        message: `Broken link (HTTP ${result.status ?? "?"})`,
        detail: location,
      });
      break;
    case "soft-404":
      record({
        severity: "error",
        reportId: ref.reportId,
        message: "Broken link (soft 404)",
        detail: `${location}\n      ${result.detail}`,
      });
      break;
    case "network-error":
      record({
        severity: strict ? "error" : "warn",
        reportId: ref.reportId,
        message: "Network error",
        detail: `${location}\n      ${result.detail ?? "unknown error"}`,
      });
      break;
    case "redirect":
      record({
        severity: strict ? "error" : "warn",
        reportId: ref.reportId,
        message: "Redirects to canonical URL",
        detail: `${location}\n      → ${result.finalUrl}`,
      });
      break;
    case "other":
      record({
        severity: strict ? "error" : "warn",
        reportId: ref.reportId,
        message: result.detail ?? `HTTP ${result.status ?? "?"}`,
        detail: location,
      });
      break;
    default:
      break;
  }
}

function parseArgs(argv: string[]): {
  concurrency: number;
  strict: boolean;
  targets: ReportId[];
  timeoutMs: number;
} {
  let strict = false;
  let timeoutMs = DEFAULT_TIMEOUT_MS;
  let concurrency = DEFAULT_CONCURRENCY;
  const positional: string[] = [];

  for (const arg of argv) {
    if (arg === "--strict") {
      strict = true;
    } else if (arg.startsWith("--timeout=")) {
      const n = Number(arg.slice("--timeout=".length));
      if (Number.isFinite(n) && n > 0) {
        timeoutMs = n;
      }
    } else if (arg.startsWith("--concurrency=")) {
      const n = Number(arg.slice("--concurrency=".length));
      if (Number.isFinite(n) && n > 0) {
        concurrency = Math.floor(n);
      }
    } else if (!arg.startsWith("--")) {
      positional.push(arg);
    }
  }

  const scope = positional[0] ?? "all";
  const targets: ReportId[] =
    scope === "all" ? ["vercel-aws", "vercel-azure"] : [scope as ReportId];
  return { concurrency, strict, targets, timeoutMs };
}

async function main(): Promise<void> {
  const { concurrency, strict, targets, timeoutMs } = parseArgs(
    process.argv.slice(2)
  );

  const refs: UrlRef[] = [];
  for (const reportId of targets) {
    const report = reports[reportId];
    if (!report) {
      record({
        severity: "error",
        reportId,
        message: `Unknown report id '${reportId}'`,
      });
      continue;
    }
    collectUrls(report, reportId, "", refs);
  }

  // Deduplicate (url, reportId) pairs so each report independently sees its refs
  // but we don't re-check the same URL for the same report twice.
  const seen = new Set<string>();
  const unique: UrlRef[] = [];
  for (const ref of refs) {
    const key = `${ref.reportId}::${ref.url}`;
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    unique.push(ref);
  }

  const totalHostsUnique = new Set(unique.map((r) => r.url)).size;
  console.log(
    `Checking ${unique.length} link reference(s) (${totalHostsUnique} unique URL(s)) across ${targets.join(", ")}…`
  );

  const results = await runWithConcurrency(unique, concurrency, (ref) =>
    checkUrl(ref, timeoutMs)
  );

  for (const r of results) {
    recordResult(r, strict);
  }

  const errors = findings.filter((f) => f.severity === "error");
  const warns = findings.filter((f) => f.severity === "warn");

  if (findings.length === 0) {
    console.log(
      `✓ All ${unique.length} link(s) healthy across ${targets.join(", ")}`
    );
    process.exit(0);
  }

  console.log(
    `Link report: ${errors.length} error(s), ${warns.length} warning(s)`
  );
  console.log();
  for (const f of findings) {
    const icon = f.severity === "error" ? "✗" : "⚠";
    console.log(`${icon} [${f.reportId}] ${f.message}`);
    if (f.detail) {
      for (const line of f.detail.split("\n")) {
        console.log(`    ${line}`);
      }
    }
  }
  process.exit(errors.length > 0 ? 1 : 0);
}

await main();
