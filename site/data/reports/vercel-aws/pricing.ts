import type { PricingData } from "@/data/report-schema";

export const pricingData: PricingData = {
  sectionNumber: 2,
  title: "2026 Unit Economics",
  description: "Cost analysis for 1,000 agent turns with Claude Sonnet 4.5",
  workloadAssumptions: {
    turns: 1000,
    inputTokensPerTurn: 2000,
    outputTokensPerTurn: 500,
    activeCpuPerTurn: "5s",
  },
  modelPricing: [
    {
      model: "Claude Opus 4.5",
      input: "$5.00",
      output: "$25.00",
      tier: "flagship",
    },
    {
      model: "Claude Sonnet 4.5",
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
        component: "Model (Claude Sonnet 4.5)",
        calc: "2M input × $3 + 0.5M output × $15",
        cost: "$13.50",
      },
      {
        component: "Sandbox SDK (CPU)",
        calc: "1,000 turns × 5s × $0.128/hr",
        cost: "$0.18",
      },
      {
        component: "Sandbox Memory",
        calc: "4 GB × 1.39 hrs × $0.0106/GB-hr",
        cost: "$0.06",
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
        component: "Model (Claude Sonnet 4.5)",
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
        component: "Memory (short-term)",
        calc: "1,000 × $0.25/1K",
        cost: "$0.25",
      },
    ],
    vercelTotal: "$13.89",
    awsTotal: "$13.93",
    awsRegionalNote: "+$1.35 with regional endpoints",
  },
  keyInsight: {
    title: "Key Insight",
    description:
      "Infrastructure costs are negligible compared to model costs. The primary cost driver is LLM inference.",
    modelPercent: 97,
    infraPercent: 3,
  },
  effortLevels: [
    {
      level: "Low",
      multiplier: "~1x baseline",
      impact: "Minimal cost impact",
      color: "primary",
    },
    {
      level: "Medium",
      multiplier: "~2-3x output",
      impact: "Moderate increase",
      color: "chart-3",
    },
    {
      level: "High",
      multiplier: "~5-10x output",
      impact: "2-3x total cost",
      color: "aws",
    },
  ],
  bedrockTiers: [
    {
      tier: "On-Demand",
      description: "Pay per token",
      discount: "Baseline",
      tooltip: null,
    },
    {
      tier: "Provisioned",
      description: "Reserved capacity",
      discount: "Commitment discount",
      tooltip:
        "Purchase Model Units (MUs) with 1-month or 6-month commitments for guaranteed throughput. Longer commitments = lower hourly rates.",
    },
    {
      tier: "Batch Mode",
      description: "Async processing",
      discount: "50% discount",
      tooltip:
        "Process multiple prompts asynchronously via S3. Results retrieved from bucket when complete. Not supported for provisioned models.",
    },
    {
      tier: "Prompt Caching",
      description: "Cache prompts",
      discount: "Up to 90% off",
      tooltip:
        "Cache frequently-used prompt components to skip recomputation. 5-minute TTL. Cached tokens charged at reduced rate.",
    },
  ],
  bedrockPricingNote:
    "Bedrock global endpoints match Anthropic direct pricing (shown above). Regional endpoints add a 10% premium for data residency guarantees. This applies to Claude 4.5+ models.",
};
