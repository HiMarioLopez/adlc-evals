## 7. Observability & Day 2 (Evidence-Based)

### 7.1 Telemetry Comparison

| Aspect | Vercel AI SDK 6 (v7 beta) | AWS AgentCore |
|--------|----------------------------|---------------|
| **Standard** | OTEL-compatible spans (`ai.streamText`, `ai.toolCall` events); OTEL GenAI semconv | OTEL-compatible via AgentCore Observability |
| **Dedicated package** | `@ai-sdk/otel` (v7) — stable API; `experimental_telemetry` on `generateText` / `streamText` | CloudWatch SDK |
| **Callbacks** | `onStepFinish`, `onFinish` | Hooks via Strands (`BeforeInvocationEvent`, `AfterToolCallEvent`, etc.) |
| **Live metrics** | AI Gateway live model performance API (Jan 26, 2026) | CloudWatch metrics + AgentCore Observability dashboards |
| **Cost breakdown** | **Custom Reporting API (beta, Mar 25, 2026)** — cost by tag / user / model / provider | AWS Cost Explorer + CloudWatch |
| **Workflow observability** | Queryable in Vercel Observability (Apr 7, 2026); log filtering by Run/Step ID (Apr 14, 2026) | N/A (agent-only) |
| **Anomaly alerts** | **GA Apr 13, 2026** on Vercel Observability Plus | CloudWatch Alarms (standard) |
| **Retention** | 30 days (Observability Plus) | Plan-dependent; CloudWatch Logs retention configurable |
| **Span ingestion cost** | Included in Vercel plan | ~$0.35/GB via CloudWatch |

### 7.2 Loop-Breaker Comparison

| Aspect | Vercel AI SDK | AWS AgentCore |
|--------|--------------|---------------|
| **Built-in stop conditions** | 3 (`isStepCount`, `hasToolCall`, `isLoopFinished`) + custom functions | Policy-based termination via Cedar rules |
| **Maximum steps default** | 20 | No hard default; controlled via policy + timeout |
| **Termination semantics** | Checked after each step with tool results | Runtime-level policy intercept |
| **Dynamic limits** | `prepareStep` can adjust `activeTools` per step | Cedar `when` clauses can enforce conditional limits |

### 7.3 Evaluation Approach

| Platform | Approach |
|----------|----------|
| **Vercel** | External — bring-your-own. Marketplace-native options: **Braintrust** (GA Oct 2025, unified billing + trace streaming) and **Langfuse via AI Gateway** (Feb 2026). No first-party evaluation framework. |
| **AWS** | **AgentCore Evaluations (GA Mar 31, 2026)** — 13 built-in evaluators, 9 regions, Ground Truth support, custom Lambda evaluators. First-party story end-to-end. |

### 7.4 Content Safety / Guardrails

| Platform | Approach |
|----------|----------|
| **Vercel** | Model-native safety (Claude, OpenAI) + custom middleware. AI Gateway enforces ZDR + `disallowPromptTraining`. No platform-level content filter layer. |
| **AWS** | **Amazon Bedrock Guardrails (GA)** — 6 content filter categories (Hate / Insults / Sexual / Violence / Misconduct / Prompt Attack) + denied topics, PII redaction, grounding checks, Automated Reasoning. Classic & Standard tiers. Applies to AgentCore via guardrail ID. |

---

