## DOCUMENTATION GAPS RESOLVED (April 2026 refresh)

| Feature | Resolution | Source |
|---------|------------|--------|
| Vercel Sandbox SDK pricing | **Resolved:** $0.128/hr CPU, $0.0212/GB-hr memory (updated from $0.0106 at Jan 8), $0.15/GB network, $0.60/1M creations, $0.08/GB-mo storage — GA | [Vercel Sandbox Pricing](https://vercel.com/docs/vercel-sandbox/pricing) |
| Vercel Workflow SDK pricing | **Resolved:** $2.50/100K steps, $0.00069/GB-hr storage — GA Apr 16, 2026; function compute billed separately at Fluid Compute rates | [Vercel Workflow Pricing](https://vercel.com/docs/workflows/pricing) |
| **"AI Units v2026"** | **Resolved:** Term does not exist as a public SKU. Use **Fast Data Transfer (FDT)** for CDN traffic and **AI Gateway Credits** for gateway billing (0% markup) | [Vercel Pricing](https://vercel.com/docs/pricing) |
| Edge Runtime max duration | **Resolved:** 30 seconds (Edge Functions), extendable with Fluid Compute | [Vercel Limits](https://vercel.com/docs/limits) |
| Claude Haiku 4.5 pricing | **Resolved:** $1.00/1M input, $5.00/1M output (on-demand, updated from $0.80/$4.00 at Jan 8) | [Anthropic Pricing](https://platform.claude.com/docs/en/docs/about-claude/pricing) |
| Claude Opus 4.6 / 4.7 pricing | **Resolved:** Both at $5.00/$25.00 per MTok (same as 4.5); Opus 4.7 has 1.0–1.35× tokenizer inflation vs 4.6 | [AWS Opus 4.7 Blog](https://aws.amazon.com/blogs/aws/introducing-anthropics-claude-opus-4-7-model-in-amazon-bedrock/) |
| Bedrock Service Tiers | **Resolved:** Priority (+75%) / Standard / Flex (−50%) / Reserved — accessible via Strands `BedrockModel(service_tier=...)` (v1.35.0, Apr 8, 2026) | [Bedrock Service Tiers](https://aws.amazon.com/bedrock/service-tiers/) |
| AgentCore Evaluations rates | **Resolved (GA):** $0.0024/1K input + $0.012/1K output (built-in, 13 evaluators), $1.50/1K custom + model inference | [AWS AgentCore Pricing](https://aws.amazon.com/bedrock/agentcore/pricing/) |
| AI Gateway markup | **Resolved:** 0% markup confirmed in docs — BYOK and managed credentials both at provider list price | [AI Gateway Pricing](https://vercel.com/docs/ai-gateway/pricing) |

---

