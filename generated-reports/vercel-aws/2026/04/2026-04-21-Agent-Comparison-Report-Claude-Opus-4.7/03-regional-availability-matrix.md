## 3. Regional Availability Matrix

> ⚠️ **Production Consideration:** Not all AgentCore features are available in all regions. This affects architecture decisions, especially for regulated industries with data residency requirements.

### AWS AgentCore Regional Availability (April 2026)

| Feature | Regions Available | Delta vs. Jan 8 |
|---------|-------------------|-----------------|
| **AWS Agent Registry** | **5 regions** — us-east-1, us-west-2, eu-west-1, ap-southeast-2, ap-northeast-1 | 🆕 **New service (Apr 9, 2026)** |
| **AgentCore Evaluations** | **9 regions** — us-east-1, us-east-2, us-west-2, eu-central-1, eu-west-1, ap-south-1, ap-southeast-1, ap-southeast-2, ap-northeast-1 | 🟢 **+5 regions** (was 4 in preview); **GA since Mar 31, 2026** |
| **Policy in AgentCore** | **13 regions** — all 14 Runtime regions except ca-central-1 | 🟢 **+2 regions** (was 11 in preview); **GA since Mar 3, 2026** |
| AgentCore Runtime | **14 regions** — all except sa-east-1 | 🟢 **+3 regions** (was 11) via Jan 26 expansion wave (+ eu-west-2, eu-west-3, eu-north-1) |
| AgentCore Built-in Tools | **14 regions** | 🟢 +3 regions (matches Runtime) |
| AgentCore Observability | **14 regions** | 🟢 +3 regions (matches Runtime) |
| AgentCore Gateway | **14 regions** — all except sa-east-1 | ✅ Unchanged |
| AgentCore Identity | **14 regions** — all except sa-east-1 | ✅ Unchanged |
| AgentCore Memory | **15 regions** — broadest availability (includes sa-east-1) | ✅ Unchanged |

**Source:** [AgentCore Supported Regions](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agentcore-regions.html)

### Vercel Regional Availability (April 2026)

| Feature | Availability | Delta vs. Jan 8 |
|---------|--------------|-----------------|
| AI SDK 6.x | Global (Edge + Serverless) | ✅ Unchanged — runs anywhere Vercel deploys |
| AI Gateway | Global | ✅ Unchanged; + team-wide ZDR (Apr 8) |
| Fluid Compute | **20 compute regions** | 🟢 **+Montréal (`yul1`)** added Jan 20, 2026 (absorbed into canonical 20-region count per [vercel.com/docs/regions](https://vercel.com/docs/regions)) |
| Sandbox SDK | **`iad1` only** (Washington, D.C.) | ⚠️ **GA since Jan 30 but still single-region** — community requests for Tokyo (hnd1) acknowledged but not shipped |
| Workflow SDK | **Execution global, state `iad1` only** | ⚠️ **Clarification vs. Jan baseline** — function execution is global (Vercel Functions run anywhere), but the persistence/queue backend is `iad1`-only; multi-region backend on roadmap |
| Vercel Queues | **GA** — durable append-only topic log; powers Workflow | 🆕 Graduated to GA |
| Chat SDK | Global | 🆕 **New (Feb 23, 2026)** |
| Edge Network PoPs | **126 PoPs** (CDN) | CDN-level global coverage beyond compute regions |

**Sources:**
- Compute Regions: [vercel.com/docs/regions](https://vercel.com/docs/regions) — *"we maintain 20 compute-capable regions where your code can run close to your data"*
- Sandbox: [Vercel Sandbox Supported Regions](https://vercel.com/docs/vercel-sandbox/pricing) — *"Currently, Vercel Sandbox is only available in the `iad1` region."*
- Workflow: [useworkflow.dev/worlds/vercel](https://useworkflow.dev/worlds/vercel) — *"Single-region deployment: The backend infrastructure is currently deployed only in `iad1`."*

### Regional Comparison Analysis

| Question | Vercel | AWS |
|----------|--------|-----|
| **Full agent stack in single region?** | Only `iad1` (Sandbox + Workflow backend limitation) | **14 regions** for Runtime + Tools + Observability + Memory + Gateway + Identity |
| **Full agent stack including governance?** | Only `iad1` | **13 regions** adding Policy (GA) |
| **Full agent stack including quality?** | Only `iad1` | **9 regions** adding Evaluations (GA) |
| **Evaluations availability?** | N/A (no built-in evaluation service; BYO Braintrust / Langfuse) | **9 regions** (2.25× expansion since Jan) |
| **Edge latency advantage?** | Yes for stateless inference — AI Gateway is edge-optimized globally; 126 CDN PoPs | No — Bedrock is region-bound |
| **Stateful agent latency?** | Degraded outside `iad1` — Workflow/Sandbox state routes to `iad1` | Native regional state in 14 regions |
| **Multi-region failover?** | Secure Compute: Active/Passive network failover | Multi-AZ, cross-region replication, global CRIS on Claude 4.5+ |

**Implication:** The January 2026 report's framing that "Vercel is more global" for stateful agent workloads is **narrower than it appeared**. Vercel's global edge is true for AI Gateway and Fluid Compute inference, but stateful primitives (Sandbox, Workflow persistence) remain `iad1`-centric. AWS's AgentCore surface, meanwhile, has expanded meaningfully — 14 regions for core agent infrastructure, 9 for Evaluations, 13 for Policy.

---

