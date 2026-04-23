## 11. Documentation Gaps

| Feature | Status | Resolution |
|---------|--------|------------|
| ~~Vercel "AI Units" v2026~~ | **CORRECTED** — term does not exist as a public SKU | Use **Fast Data Transfer (FDT)** + **AI Gateway Credits** (0% markup) |
| ~~Vercel Fluid Compute "21 regions"~~ | **CORRECTED** — canonical count is **20 compute regions** per [vercel.com/docs/regions](https://vercel.com/docs/regions); `yul1` (Jan 20) was absorbed into the 20, not stacked on top | Use **20 compute regions** |
| ~~Vercel Sandbox SDK pricing~~ | **RESOLVED (GA)** | $0.128/CPU-hr, $0.0212/GB-hr, $0.60/1M creations, $0.15/GB, $0.08/GB-mo |
| ~~Vercel Workflow SDK pricing~~ | **RESOLVED (GA)** | $2.50/100K steps + $0.00069/GB-hr storage |
| ~~AgentCore Policy pricing~~ | **RESOLVED (GA)** | Included in Runtime/Gateway pricing (no separate SKU) |
| ~~AgentCore Evaluations pricing~~ | **RESOLVED (GA)** | $0.0024/1K input + $0.012/1K output (built-in); $1.50/1K (custom) |
| ~~Step Functions + AgentCore integration~~ | **RESOLVED (GA Mar 26, 2026)** | SDK service integration — invoke runtimes with built-in retries, parallel Map states, automate provisioning |
| AgentCore GA SLA percentage | DOCUMENTATION GAP | No specific uptime % published; AWS typically offers 99.9% for managed services |
| AWS Agent Registry pricing | **PARTIAL** — pricing published | After free tier (5K records, 1M search, 2M list/get): $0.40/1K records, $0.020/1K search, $0.004/1K list/get (per [pricing page](https://aws.amazon.com/bedrock/agentcore/pricing/)) |
| Strands TypeScript GA timeline | DOCUMENTATION GAP | `v1.0.0-rc.4` RC; no firm GA date announced |
| AgentCore Managed Harness GA timeline | DOCUMENTATION GAP | Preview as of Apr 22, 2026 (4 regions); no GA date or pricing model announced |
| AgentCore Managed Harness production SLA | DOCUMENTATION GAP | Preview-only; no SLA commitment |
| AgentCore persistent filesystem pricing at GA | DOCUMENTATION GAP | Pricing page notes: "The managed session storage (currently in public preview) is an early version of the S3-backed storage; we will come out with changes including pricing to that experience before GA." Currently no charge during preview |
| AgentCore CLI Terraform support | KNOWN COMING | CDK is GA today; Terraform explicitly labeled "coming soon" in [announcement](https://aws.amazon.com/blogs/machine-learning/get-to-your-first-working-agent-in-minutes-announcing-new-features-in-amazon-bedrock-agentcore/), [What's New](https://aws.amazon.com/about-aws/whats-new/2026/04/agentcore-new-features-to-build-agents-faster/), and CLI docs |
| AgentCore coding agent skills for Claude Code / Codex / Cursor | KNOWN COMING | Kiro Power GA Apr 22, 2026; Claude Code / Codex / Cursor plugins announced as "coming next week" (~Apr 29, 2026). No dedicated docs pages exist yet |
| Harness "3 API calls" exact semantics | **PARTIAL** — documented as `CreateHarness` + `GetHarness` (status poll) + `InvokeHarness` per [harness-get-started](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/harness-get-started.html). Control plane API reference page rendered minimally during research |

---

