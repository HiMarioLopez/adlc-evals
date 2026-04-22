import type { PricingData } from "@/data/report-schema.ts";

export const pricingData: PricingData = {
  sectionNumber: 2,
  title: "2026 Unit Economics",
  description:
    "Cost analysis for 1,000 agent turns with GPT-4.1 Global Standard ($2/$8 per 1M tokens, the recommended Azure default for production agents as of April 2026)",
  workloadAssumptions: {
    turns: 1000,
    inputTokensPerTurn: 2000,
    outputTokensPerTurn: 500,
    activeCpuPerTurn: "5s",
  },
  modelPricing: [
    {
      model: "GPT-5",
      input: "$1.25",
      output: "$10.00",
      tier: "flagship",
    },
    {
      model: "GPT-4.1",
      input: "$2.00",
      output: "$8.00",
      tier: "balanced",
    },
    {
      model: "GPT-4.1-mini",
      input: "$0.40",
      output: "$1.60",
      tier: "fast",
    },
  ],
  costBreakdown: {
    vercel: [
      {
        component: "Model (GPT-4.1 via AI Gateway, 0% markup)",
        calc: "2M input × $2 + 0.5M output × $8",
        cost: "$8.00",
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
        component: "Model (GPT-4.1 Global Standard)",
        calc: "2M input × $2 + 0.5M output × $8",
        cost: "$8.00",
      },
      {
        component: "Foundry Agent Service orchestration",
        calc: "No orchestration charge (agent-native)",
        cost: "$0.00",
      },
      {
        component: "Code Interpreter tool (1% hit rate)",
        calc: "10 sessions × $0.03",
        cost: "$0.30",
      },
      {
        component: "File Search Storage (amortized)",
        calc: "2 GB × 30 days × $0.10/GB/day / 30 days",
        cost: "$0.20",
      },
      {
        component: "Cosmos DB thread storage",
        calc: "~6K RUs × $0.25/M + minimal storage",
        cost: "$0.002",
      },
    ],
    vercelTotal: "$8.45",
    awsTotal: "$8.50",
    awsRegionalNote:
      "Deployment tiers: Priority +75% ($15.00) · Batch −50% ($4.25) · Data Zone +10% ($8.80) · Regional +21% ($9.68)",
  },
  keyInsight: {
    title: "Key Insight",
    description:
      "Infrastructure costs remain a small fraction of total TCO (<5%). Azure OpenAI's deployment tiers (Priority +75% / Data Zone +10% / Regional +21% / Batch −50% / PTU) give a cost lever for latency-sensitive workloads (Priority) and batch/async jobs (Batch). PTU monthly reservations are ~64% off hourly PAYG at steady-state utilization. Vercel AI Gateway's 0% markup means no gateway fee is added on top of provider pricing. Foundry thread storage is $0 direct — customer pays Cosmos DB bills.",
    modelPercent: 95,
    infraPercent: 5,
  },
  effortLevels: [
    {
      level: "Global Standard",
      multiplier: "Baseline",
      impact: "Default",
      color: "chart-2",
    },
    {
      level: "Data Zone",
      multiplier: "+10%",
      impact: "Residency",
      color: "chart-3",
    },
    {
      level: "Priority",
      multiplier: "+75%",
      impact: "Latency SLA",
      color: "aws",
    },
    {
      level: "Batch",
      multiplier: "−50%",
      impact: "Async workloads",
      color: "primary",
    },
  ],
  bedrockTiers: [
    {
      tier: "Global Standard",
      description: "Default, highest throughput",
      discount: "Baseline",
      tooltip:
        "Default Azure OpenAI deployment. Traffic routes globally for best availability. No regional data residency guarantee.",
    },
    {
      tier: "Data Zone",
      description: "US or EU residency",
      discount: "+10%",
      tooltip:
        "Traffic stays within a defined data zone (US or EU). Compliance insurance for GDPR, HIPAA-adjacent workloads.",
    },
    {
      tier: "Priority",
      description: "Latency-sensitive",
      discount: "+75% premium",
      tooltip:
        "Highest priority inference for user-facing agents. Sub-2s p99 latency. Added for GPT-4.1 and GPT-5 in April 2026.",
    },
    {
      tier: "Batch API",
      description: "Async agent work",
      discount: "−50% discount",
      tooltip:
        "Half-price tier for async workloads with 24-hour SLA. Ideal for overnight reports, eval runs, offline RAG indexing.",
    },
    {
      tier: "PTU Reservation",
      description: "Reserved capacity",
      discount: "Monthly −64% · Yearly −70%",
      tooltip:
        "Provisioned Throughput Units billed hourly regardless of usage. Monthly reservations ≈ 64% off PAYG hourly; yearly ≈ 70% off. Min 15 PTU for Global, 50 PTU for Regional.",
    },
  ],
  bedrockPricingNote:
    "Azure OpenAI pricing pages are JavaScript-rendered SPAs — GPT-5.1 and GPT-5.2 sub-series per-token rates currently render as $- in static HTML (DOCUMENTATION GAP — verify via Azure Pricing Calculator). Foundry Hosted Agents vCPU/GiB-hour rates similarly unavailable in static HTML. Thread/conversation storage is $0 direct from Microsoft but customer pays Cosmos DB bills (~$0.25/M RUs serverless). GPT-4.1 launched Apr 14, 2026 at 1M context window and is 26% cheaper than GPT-4o.",
};
