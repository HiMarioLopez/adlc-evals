import type { PricingData } from "@/data/report-schema.ts";

export const pricingData: PricingData = {
  sectionNumber: 2,
  title: "2026 Unit Economics",
  description:
    "Cost analysis for 1,000 agent turns with Claude Sonnet 4.6 (the current recommended default, same $3/$15 per MTok as 4.5)",
  workloadAssumptions: {
    turns: 1000,
    inputTokensPerTurn: 2000,
    outputTokensPerTurn: 500,
    activeCpuPerTurn: "5s",
  },
  modelPricing: [
    {
      model: "Claude Opus 4.7",
      input: "$5.00",
      output: "$25.00",
      tier: "flagship",
    },
    {
      model: "Claude Sonnet 4.6",
      input: "$3.00",
      output: "$15.00",
      tier: "balanced",
    },
    {
      model: "Claude Haiku 4.5",
      input: "$1.00",
      output: "$5.00",
      tier: "fast",
    },
  ],
  costBreakdown: {
    vercel: [
      {
        component: "Model (Claude Sonnet 4.6 via AI Gateway, 0% markup)",
        calc: "2M input × $3 + 0.5M output × $15",
        cost: "$13.50",
      },
      {
        component: "Sandbox SDK (Active CPU, I/O free)",
        calc: "1,000 turns × 5s × $0.128/hr",
        cost: "$0.18",
      },
      {
        component: "Sandbox Provisioned Memory",
        calc: "4 GB × 1.39 hrs × $0.0212/GB-hr",
        cost: "$0.12",
      },
      {
        component: "Sandbox Creations",
        calc: "1,000 × $0.60/1M",
        cost: "$0.0006",
      },
      {
        component: "Network (1 GB)",
        calc: "1 GB × $0.15",
        cost: "$0.15",
      },
    ],
    aws: [
      {
        component: "Model (Claude Sonnet 4.6)",
        calc: "2M input × $3 + 0.5M output × $15",
        cost: "$13.50",
      },
      {
        component: "Bedrock AgentCore Runtime CPU",
        calc: "5,000s × $0.0895/hr",
        cost: "$0.12",
      },
      {
        component: "Bedrock AgentCore Runtime Memory",
        calc: "4 GB × 1.39 hrs × $0.00945/GB-hr",
        cost: "$0.05",
      },
      {
        component: "Gateway Invocations",
        calc: "2,000 tool calls × $0.005/1K",
        cost: "$0.01",
      },
      {
        component: "Memory (short-term events)",
        calc: "1,000 × $0.25/1K",
        cost: "$0.25",
      },
    ],
    vercelTotal: "$13.95",
    awsTotal: "$13.93",
    awsRegionalNote:
      "Service tiers: Priority +75% ($24.42) · Flex −50% ($7.18) — new via Strands v1.35.0",
  },
  keyInsight: {
    title: "Key Insight",
    description:
      "Infrastructure costs remain a small fraction of total TCO (< 5%). Bedrock's new service tiers (Priority/Standard/Flex, GA via Strands v1.35.0) give AWS a cost lever for batch workloads (−50%) and a latency lever for user-facing workloads (+75%). Vercel AI Gateway's 0% markup means no gateway fee is added on top of provider pricing.",
    modelPercent: 97,
    infraPercent: 3,
  },
  effortLevels: [
    {
      level: "Low",
      multiplier: "~30-50% of high",
      impact: "Lowest cost",
      color: "primary",
    },
    {
      level: "Medium",
      multiplier: "~60-70% of high",
      impact: "Moderate",
      color: "chart-3",
    },
    {
      level: "High",
      multiplier: "Baseline (default)",
      impact: "Baseline",
      color: "aws",
    },
    {
      level: "xHigh (Opus 4.7)",
      multiplier: "~1.5-2x high",
      impact: "Extended reasoning",
      color: "chart-2",
    },
  ],
  bedrockTiers: [
    {
      tier: "Priority",
      description: "Latency-sensitive",
      discount: "+75% premium",
      tooltip:
        "New in 2026. Highest priority inference for latency-sensitive user-facing agents. Available via Strands v1.35.0 BedrockModel(service_tier='priority').",
    },
    {
      tier: "Standard",
      description: "Default tier",
      discount: "Baseline",
      tooltip:
        "Default on-demand pricing. Pay per token with no commitment. Balanced latency and cost.",
    },
    {
      tier: "Flex",
      description: "Batch agent work",
      discount: "−50% discount",
      tooltip:
        "New in 2026. Half-price tier explicitly recommended for agentic batch workflows and background tasks. Available via Strands v1.35.0 BedrockModel(service_tier='flex').",
    },
    {
      tier: "Prompt Caching",
      description: "Cache prompts",
      discount: "Up to 90% off",
      tooltip:
        "Cache frequently-used prompt components to skip recomputation. 5-minute or 1-hour TTL (1h added on Opus 4.6+/Sonnet 4.6). Cached tokens charged at reduced rate.",
    },
  ],
  bedrockPricingNote:
    "Bedrock global endpoints match Anthropic direct pricing with 0% AI Gateway markup. Claude Opus 4.7 (Apr 16, 2026) uses an updated tokenizer producing 1.0–1.35× more tokens for the same input vs. Opus 4.6 — per-token rate is unchanged but effective cost may be 0-35% higher for equivalent prompts. Browser profile S3 storage began billing April 15, 2026.",
};
