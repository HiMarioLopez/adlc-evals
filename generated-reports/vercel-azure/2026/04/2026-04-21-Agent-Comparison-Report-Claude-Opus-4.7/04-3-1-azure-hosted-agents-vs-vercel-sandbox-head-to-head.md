## 3.1 Azure Hosted Agents vs. Vercel Sandbox — Head-to-Head

The Apr 22 Hosted Agents refresh is explicitly positioned against Vercel Sandbox (from the [launch blog](https://devblogs.microsoft.com/foundry/introducing-the-new-hosted-agents-in-foundry-agent-service-secure-scalable-compute-built-for-agents/): *"Not process isolation. Not a code execution-only sandbox. Production-proven hypervisor isolation, at cloud scale."*). Direct comparison:

| Dimension | Azure Hosted Agents (Apr 22 refresh) | Vercel Sandbox SDK |
|-----------|--------------------------------------|---------------------|
| **Status** | Public Preview (billing started Apr 22, 2026) | **GA** (Jan 30, 2026) |
| **Isolation** | Per-session hypervisor-based sandbox (VMM not disclosed; predecessor used Hyper-V via ACA) | Firecracker microVM (dedicated kernel per sandbox) |
| **Cold start** | **<100ms** (first-party number, [hub blog](https://devblogs.microsoft.com/foundry/from-local-to-production-the-complete-developer-journey-for-building-composing-and-deploying-ai-agents/)) | "Sub-second" (customer-confirmed); ~125ms Firecracker spec |
| **Max vCPU (single unit)** | **2.0 vCPU** (ceiling during preview) | **32 vCPU** (Enterprise) — **16× larger** |
| **Max memory (single unit)** | **4 GiB** | **64 GB** (Enterprise) — **16× larger** |
| **Max concurrent sessions** | **50/sub/region** (preview, adjustable by Support ticket) | **2,000** (Pro/Enterprise) — **40× more** |
| **Max session lifetime** | **30 days** | 5 hours (Pro/Enterprise) |
| **Idle timeout → state save** | 15 min → deprovision → state-preserving resume | Configurable; Persistent Sandboxes (beta) |
| **Filesystem persistence** | ✅ `$HOME` + `/files` survive scale-to-zero (preview GA) | ✅ Persistent Sandboxes (**beta**) — auto-snapshot on stop |
| **Scale to zero** | ✅ Yes (zero cost during idle) | ✅ Ephemeral by default |
| **Regions** | **4 preview** (AU East, CA Central, NC US, SE Central) | **`iad1` only** — Azure wins breadth for agent compute |
| **Languages** | Python, C# | Any (node24, python3.13, arbitrary containers) |
| **Framework agnostic** | ✅ BYO (MAF, LangGraph, SK, Claude Agent SDK, OpenAI Agents SDK, Copilot SDK, custom) | ✅ BYO (any framework, any code) |
| **Identity** | **Per-agent Entra Agent ID + OBO user delegation** | Vercel project OIDC tokens |
| **Private networking** | ✅ BYO VNet supported | ✅ Secure Compute ($6.5K/yr + $0.15/GB, Enterprise) |
| **M365 / Teams / Copilot integration** | ✅ Native one-click publish (Shared + Organization scopes) | ❌ |
| **A2A protocol** | ✅ Native | ❌ |
| **AG-UI support** | ✅ Via Invocations protocol | ❌ |
| **Durable orchestration** | Responses API conversation state (server-managed) | **Vercel Workflow** (`"use workflow"`, E2E encrypted, unlimited duration) |
| **E2E encryption default** | Not stated | ✅ Workflow AES-256-GCM + per-run HKDF-SHA256 |
| **Pricing** | `$0.0994/vCPU-hr + $0.0118/GiB-hr` (active only); XS $0.031/hr → L $0.246/hr | `$0.128/CPU-hr + $0.0212/GB-hr + $0.60/1M creations + $0.15/GB network + $0.08/GB-mo storage` |
| **I/O-free Active CPU billing** | Not stated | ✅ Pauses during AI model calls and network I/O |
| **Pricing transparency** | Published Apr 22 via hub blog | Fully published per-dimension |
| **Deploy command** | `azd deploy` (remote ACR Tasks build — no local Docker) | `vercel deploy` (no container required — serverless functions) |

### Where Azure Genuinely Wins
1. **Enterprise identity** — Per-agent Entra Agent ID with OBO user delegation is a first-class enterprise security primitive. Vercel's project-scoped OIDC is functional but not per-agent.
2. **M365/Teams/Copilot distribution** — One-click publish with Shared + Organization scopes, admin approval workflow, agent-store placement. No Vercel equivalent.
3. **A2A + AG-UI protocols** — Native support for agent-to-agent delegation and agent-UI streaming. No Vercel equivalent in-platform.
4. **Regional breadth for agent compute specifically** — 4 preview regions (AU, CA, US, EU) vs. Vercel Sandbox's single `iad1` region. For EU/APAC agent compute, Azure wins *today* (with the important caveat that Foundry Agent Service prompt-based agents cover 24 regions, while Hosted Agents itself is a narrow subset).
5. **Filesystem persistence maturity** — `$HOME` persistence is preview-GA in Azure; Vercel's Persistent Sandboxes are still in beta.

### Where Vercel Genuinely Wins
1. **Isolation quality** — Firecracker gives each sandbox a dedicated kernel. Azure's per-session sandbox isolation detail (VMM name) is not disclosed; the predecessor backend used Hyper-V. For running untrusted or user-generated code, Firecracker's documented isolation boundary is stronger.
2. **Compute ceiling** — 32 vCPU / 64 GB per sandbox (Enterprise) vs. Azure's 2 vCPU / 4 GiB ceiling. **16× advantage** for compute-intensive agent tasks (code compilation, ML inference, large builds).
3. **Concurrency ceiling** — 2,000 concurrent sandboxes vs. Azure's 50/region preview limit. **40× more** out of the box. Azure's limit is adjustable on request; Vercel's is standard plan capacity.
4. **I/O-free Active CPU billing** — Vercel pauses CPU billing during AI model calls and network I/O. For AI agent workloads where 80–95% of wall-clock is model-wait, this is a substantial TCO advantage. Azure's billing model is "active sessions" without published I/O-free semantics.
5. **Durable execution** — Vercel Workflow provides step-level retries, sleep, hooks, durable streams, and E2E encryption as a first-class primitive alongside Sandbox. Azure Hosted Agents have no built-in workflow durability — you'd compose Durable Task Scheduler separately.
6. **Language flexibility** — Vercel Sandbox runs any container / any language. Azure Hosted Agents: Python or C# only.
7. **GA maturity** — Vercel Sandbox GA since Jan 30 with 2,000 concurrent sandboxes. Azure Hosted Agents is in preview with a 50-session preview cap.

### Architect's Net Read
**Pick based on workload shape, not rack rate.**
- **Microsoft-centric enterprise, governance-first, M365 distribution, EU/APAC agent compute, per-user OBO identity** → Azure Hosted Agents
- **Compute-intensive (>2 vCPU or >4 GiB per session), high concurrency (>50/region), untrusted code execution, global edge performance, durable multi-step workflows, I/O-heavy AI workloads** → Vercel Sandbox + Fluid Compute + Workflow

For the same Claude / OpenAI model accessed on both platforms, **the model layer still dominates TCO** — agent-infrastructure choice sits at 3–11% of total. Regional fit and DX should drive the decision, not compute unit pricing.

---

