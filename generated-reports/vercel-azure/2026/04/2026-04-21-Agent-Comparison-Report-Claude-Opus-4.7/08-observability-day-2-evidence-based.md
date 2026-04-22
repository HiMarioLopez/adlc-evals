## 7. Observability & Day 2 (Evidence-Based)

### 7.1 Telemetry

| Aspect | Vercel | Azure |
|--------|--------|-------|
| Protocol | OpenTelemetry-compatible spans | **OpenTelemetry native** |
| Integration | `experimental_telemetry` on `generateText` / `streamText` (OTEL GenAI semconv); `@ai-sdk/otel` package (stable in v7); Workflow data queryable in Vercel Observability (Apr 7, 2026) | **Foundry Tracing GA** Mar 16, 2026; `configure_azure_monitor()` one-call setup (Python + .NET + Node + Java); eval results linked to traces |
| Backend | Any OTEL-compatible backend; Vercel Observability Plus (anomaly alerts GA Apr 13, 2026) | Azure Monitor / Application Insights (bundled) |
| Span content | `ai.streamText`, `ai.toolCall`, `onStepFinish`, `onFinish` callbacks | Agent SDK auto-emits spans for `runs.create`, tool dispatch, `messages.list`, `threads.create` |
| Cost analytics | AI Gateway Custom Reporting API (beta, Mar 25, 2026) — cost by tag / user / model | Azure Cost Management + per-meter breakdown |
| Pricing | Included in Vercel Observability plan | $2.30/GB Analytics Logs (5 GB/month free), $0.50/GB Basic, $0.05/GB Auxiliary; interactive retention $0.10/GB/month up to 2 years |

### 7.2 Loop-Breaker

Vercel: `maxSteps` (client-side `stopWhen`), explicit — `isStepCount(20)`, `hasToolCall('x')`, `isLoopFinished()`.

Azure: Server-side run lifecycle — `requires_action` state gates each tool call (client must submit outputs to continue), configurable idle timeout, built-in retry. The dispatch loop is structurally exposed — you can't accidentally infinite-loop because the server only advances on explicit `submit_tool_outputs` calls.

**Observation:** Vercel's loop control is declarative and lives in code; Azure's is driven by the run lifecycle and lives in the wire protocol. Both prevent runaway loops; the pattern differs.

### 7.3 Evaluations

| Platform | Approach |
|----------|----------|
| **Vercel** | External — bring-your-own. **Braintrust on Marketplace** (GA Oct 2025, unified billing + trace streaming) and **Langfuse via AI Gateway** (Feb 2026). No first-party evaluation framework. |
| **Azure** | **Foundry Evaluations GA** (Mar 16, 2026) — **30+ built-in evaluators + 9 agent-specific** (Tool Call Accuracy, Task Adherence, Intent Resolution), custom LLM-as-judge + code-based evaluators (Preview), continuous production monitoring → Azure Monitor alerts, Prompt Optimizer preview. First-party story end-to-end. |

### 7.4 Guardrails / Content Safety

| Platform | Approach |
|----------|----------|
| **Vercel** | Model-native safety (Claude, OpenAI) + custom middleware. AI Gateway enforces ZDR + `disallowPromptTraining`; WAF rate-limits AI endpoints. No platform-level guardrails layer. |
| **Azure** | **Foundry Guardrails for Agents** (preview Feb 13, 2026) — per-agent content policy object applied at **4 intervention points** (user input, tool call, tool response, agent output). **10 risk categories**: Hate, Sexual, Violence, Self-harm, Prompt Shield, Indirect Attack Detection, Protected Material (code + text), PII, Task Adherence. Plus **Content Safety Task Adherence API** (preview) specifically for detecting agent misalignment with assigned task. Plus the open-source **Agent Governance Toolkit** (Apr 2, 2026) covering OWASP Agentic Top 10. |

### 7.5 Compliance & AI-SPM

| Platform | Approach |
|----------|----------|
| **Vercel** | SOC 2 Type 2, ISO 27001:2022, HIPAA BAA (Enterprise), PCI DSS v4.0, GDPR, EU-U.S. DPF, TISAX AL2. Activity Log (CLI accessible) + Log Drains for SIEM. Reports at [security.vercel.com](https://security.vercel.com). |
| **Azure** | **Defender for Cloud AI-SPM (GA)** — agentless AI discovery across Azure / AWS / GCP, attack-path analysis. **Microsoft Purview for AI (GA)** — DSPM + DLP middleware. Foundry OpenTelemetry tracing + Entra audit logs. |

**Bottom line on Day 2:** Azure's observability + evaluations + guardrails + AI-SPM story is materially more complete at the platform level than Vercel's as of April 2026. Vercel's philosophy is "bring your own tools"; Azure's is "we ship everything in the box." This is consistent with each company's positioning — Vercel as a developer platform, Microsoft as an enterprise suite vendor.

---

