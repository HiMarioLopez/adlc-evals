# Pipeline Playbook

Detailed procedures for each pipeline phase. Load this when executing a specific step.

## A. Create/Update Meta-Prompt

**When:** New platform comparison, or editing prompt structure (not data refresh — see G for that).

**Files:** `meta-research-prompts/{Vendor}-Base-Research-Prompt/` (sharded, 18 files).

**Procedure:**
1. `ls meta-research-prompts/{Vendor}-Base-Research-Prompt/` to see shard list.
2. Locate the relevant shard from its filename (e.g. `06-required-sections.md`, `03-mcp-toolchain-utilization-mandatory.md`).
3. Edit that shard directly.
4. If editing prompt structure (adding/removing sections), update `index.md` too — but easier: just re-run `scripts/shard-report.sh` after reconstructing.

**Rule from `.cursorrules`:** If you add a new prompt file under any `prompts/` directory, also update the adjacent `prompts/README.md`.

## B. Generate Report

**When:** First generation for a new platform OR periodic refresh (quarterly).

**Prerequisites:** MCP tools active — GitHub, AWS Docs (or platform-specific docs MCP), Vercel, Context7.

**Output path** (from shard `04-output-filename-pathing.md`):
```
generated-reports/{vendor}/{YYYY}/{MM}/{YYYY-MM-DD}-Agent-Comparison-Report-{MODEL}.md
```
where `{MODEL}` = `Claude-Opus-4.7`, `GPT-5.2`, etc.

**Procedure:**
1. Reconstruct the full meta-prompt into a flat file:
   ```bash
   scripts/reconstruct-report.sh meta-research-prompts/Vercel-AWS-Base-Research-Prompt /tmp/prompt.md
   ```
2. Paste into a Claude or GPT session with MCP tools configured.
3. Save the model's output to the path convention above (as a flat `.md`).
4. Shard the output immediately:
   ```bash
   scripts/shard-report.sh \
     generated-reports/vercel-aws/2026/05/2026-05-15-Agent-Comparison-Report-Claude-Opus-4.7.md \
     generated-reports/vercel-aws/2026/05/2026-05-15-Agent-Comparison-Report-Claude-Opus-4.7
   rm generated-reports/vercel-aws/2026/05/2026-05-15-Agent-Comparison-Report-Claude-Opus-4.7.md
   ```
5. Confirm byte-identity is logged by the shard script.

## C. Refine with AI

**Tool:** Claude Code or equivalent agentic coding assistant. No pre-baked refine prompt exists.

**What "refine" means in practice:**
- Enforce NO quantitative/subjective ratings (`7/10`, `excellent`) — hard-banned by the prompt
- Verify section order matches REQUIRED SECTIONS in the meta-prompt
- Fix broken Mermaid diagrams
- Ensure every factual claim has a citation link
- Consolidate duplicate findings
- Reconcile against newly available data (e.g. a SDK version bump since generation)

**Procedure:**
1. Work shard-by-shard. Do not reconstruct unless you need cross-section editing.
2. For each shard, Read → identify issues → Edit in place.
3. After any structural change (section added/removed), re-shard from scratch:
   ```bash
   scripts/reconstruct-report.sh <dir> /tmp/rebuilt.md
   # edit /tmp/rebuilt.md
   rm -rf <dir>
   scripts/shard-report.sh /tmp/rebuilt.md <dir>
   ```

## D. Human Review

**No automation. No script. Do not skip.**

Checklist reviewers follow:
- [ ] Every pricing number traces to an official vendor URL (not a blog post, not a model's memory)
- [ ] Every SDK version number matches the current GitHub release tag
- [ ] Every regional availability claim matches the vendor's regions page
- [ ] Cross-reference links resolve (no 404s)
- [ ] No subjective ratings present
- [ ] Deltas table matches vendor changelogs for the covered window
- [ ] Mermaid diagrams render (paste into mermaid.live)

Only after sign-off should data move into site TS files (step E).

## E. Update Site

**When:** After a refreshed report lands and has been human-reviewed.

**Files:** `site/data/reports/{vendor}/*.ts` (12 files per vendor).

**Procedure:**
1. Map the markdown shards to TS files using `references/ts-to-markdown-map.md`.
2. For PURE MIRROR files (code, deployment, adoption, delta), copy the content verbatim into the TS structure.
3. For ENRICHED files (infrastructure, pricing, regions, metadata, hero, footer), merge new markdown facts into the existing structure while preserving site-only fields (iconName, colorClass, coordinates, highlights).
4. Bump `metadata.version` AND `footer.reportVersion` together.
5. Update `metadata.date` and `metadata.dateIso`.
6. Add a new entry to `delta.ts` if material changes happened.
7. Run:
   ```bash
   cd site && bun run check:sync
   cd site && bun run check
   cd site && bun run build
   ```
8. Fix any errors / triage warnings before committing.

## F. Deploy

Push to `main`. Vercel's GitHub integration auto-deploys.

Preview deployments happen on every PR — review the preview URL before merging.

## G. Iterate Prompt (RSS Monitor)

**Purpose:** Surface platform announcements as GitHub Issues so refresh cycles are driven by real signals, not vibes.

**Status:** Workflow is currently disabled (`.github/workflows/rss-monitor.yml.disabled`).

**Enable:**
```bash
mv .github/workflows/rss-monitor.yml.disabled .github/workflows/rss-monitor.yml
```
Requires `GITHUB_TOKEN` with `issues: write` (the built-in GitHub Actions token has this).

**Run locally:**
```bash
cd scripts/rss-monitor
bun install
bun run src/index.ts --report=vercel-aws --dry-run
```

**Update keywords for a platform:** Fill in `scripts/rss-monitor/prompts/update-platform-keywords.md` placeholders, run it through an AI assistant with web search, paste output into `src/reports/{report-id}.ts`.

## Quick Commands Reference

| Goal | Command |
|------|---------|
| Shard a flat .md | `scripts/shard-report.sh <src.md> <dest-dir>` |
| Reconstruct shards | `scripts/reconstruct-report.sh <dir> [output.md]` |
| Check drift | `cd site && bun run check:sync [vendor]` |
| Site dev | `cd site && bun dev` |
| Site build | `cd site && bun run build` |
| Lint | `cd site && bun run check` |
| RSS monitor (local) | `cd scripts/rss-monitor && bun run src/index.ts --report=<id> --dry-run` |
