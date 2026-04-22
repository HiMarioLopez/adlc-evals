import type { PricingData } from "@/data/report-schema.ts";

export const pricingData: PricingData = {
  sectionNumber: 2,
  title: "2026 Unit Economics",
  description:
    "Cost analysis for 1,000 agent turns with GPT-5.4 mini Global Standard ($0.75/$4.50 per 1M tokens, the pragmatic Azure default for production agents as of April 2026 — the full-fat gpt-5.4 is registration-gated and 3.3× the price).",
  workloadAssumptions: {
    turns: 1000,
    inputTokensPerTurn: 2000,
    outputTokensPerTurn: 500,
    activeCpuPerTurn: "5s",
  },
  modelPricingHeading: "GPT-5.4 Pricing (per 1M tokens)",
  modelPricing: [
    {
      model: "GPT-5.4",
      input: "$2.50",
      output: "$15.00",
      tier: "flagship",
    },
    {
      model: "GPT-5.4 mini",
      input: "$0.75",
      output: "$4.50",
      tier: "balanced",
    },
    {
      model: "GPT-5.4 nano",
      input: "$0.20",
      output: "$1.25",
      tier: "fast",
    },
  ],
  costBreakdown: {
    vercel: [
      {
        component: "Model (GPT-5.4 mini via AI Gateway, 0% markup)",
        calc: "2M input × $0.75 + 0.5M output × $4.50",
        cost: "$3.75",
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
        component: "Model (GPT-5.4 mini Global Standard)",
        calc: "2M input × $0.75 + 0.5M output × $4.50",
        cost: "$3.75",
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
    vercelTotal: "$4.20",
    awsTotal: "$4.25",
    awsRegionalNote:
      "Deployment tiers on GPT-5.4 mini model cost: Priority ≈ ×2 ($7.50) · Batch −50% ($1.88) · Data Zone +10% ($4.13) · PTU hourly reservation. Full-fat GPT-5.4 model baseline: $12.50/1K turns ($25 Priority · $6.25 Batch).",
  },
  keyInsight: {
    title: "Key Insight",
    description:
      "With GPT-5.4 mini, the cheap-but-capable agent-optimized tier, model cost drops to ~$3.75 per 1,000 turns — infrastructure is now ~10% of TCO, not the 3–5% you see with premium flagships. Azure OpenAI's deployment tiers (Priority ~2× · Data Zone +10% · Batch −50% · PTU reservations) give cost levers for latency-sensitive workloads (Priority) and async jobs (Batch, 24-hour SLA). PTU yearly reservations are ~70% off hourly PAYG at steady-state utilization. Vercel AI Gateway's 0% markup means no gateway fee is added on top of provider pricing. Foundry thread storage is $0 direct — the customer pays Cosmos DB bills.",
    modelPercent: 89,
    infraPercent: 11,
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
      impact: "Residency (US/EU)",
      color: "chart-3",
    },
    {
      level: "Priority",
      multiplier: "≈ ×2",
      impact: "Latency SLA",
      color: "azure",
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
        "Default Azure OpenAI deployment. Traffic routes globally for best availability. Matches OpenAI direct per-token pricing. No regional data residency guarantee.",
    },
    {
      tier: "Data Zone",
      description: "US or EU residency",
      discount: "+10%",
      tooltip:
        "Traffic stays within a defined data zone (US or EU). Compliance insurance for GDPR and HIPAA-adjacent workloads. GPT-5.4 nano and GPT-5.3-Codex both support Data Zone Standard on Azure.",
    },
    {
      tier: "Priority",
      description: "Latency-sensitive",
      discount: "≈ ×2 premium",
      tooltip:
        "Highest-priority inference for user-facing agents (confirmed ~2× Global Standard, e.g. GPT-5 Global $1.25 → Priority $2.50). Sub-2s p99 latency. Available on GPT-5.4, GPT-5.2, GPT-5 (not mini/nano).",
    },
    {
      tier: "Batch API",
      description: "Async agent work",
      discount: "−50% discount",
      tooltip:
        "Half-price tier for async workloads with a 24-hour SLA. Ideal for overnight reports, eval runs, offline RAG indexing. Available on GPT-5.4, GPT-5, o3, o4-mini.",
    },
    {
      tier: "PTU Reservation",
      description: "Reserved capacity",
      discount: "Monthly −64% · Yearly −70%",
      tooltip:
        "Provisioned Throughput Units billed hourly regardless of usage ($1/hr). Monthly reservations ≈ 64% off PAYG hourly; yearly ≈ 70% off ($2,652/yr per PTU). Min 15 PTU for Global deployments.",
    },
  ],
  bedrockPricingNote:
    "GPT-5.4 is the current OpenAI flagship (GA Mar 5, 2026) and is registration-gated on Azure — matches OpenAI direct pricing of $2.50/$15.00 at Global Standard, with a long-context tier of $5.00/$22.50 kicking in above 272K tokens (1.05M total context window). GPT-5.4 mini (Mar 17, 2026) is the agent-workhorse: 400K context, native computer-use, 2× faster than full GPT-5.4. GPT-5.4 nano is the cheapest in the family at $0.20/$1.25. Azure's pricing page still renders most values as $- in static HTML because it's JavaScript-rendered — numbers here are confirmed via OpenAI's direct pricing page and Microsoft Learn Q&A #5841927. **Foundry Hosted Agents pricing published Apr 22, 2026**: $0.0994/vCPU-hour + $0.0118/GiB-hour, active sessions only (scale-to-zero). Derived size matrix: XS (0.25 vCPU / 0.5 GiB) ~$0.031/hr · S (0.5/1) ~$0.062/hr · M (1.0/2) ~$0.123/hr · L (2.0/4) ~$0.246/hr. Agent Commit Units (ACU) pre-purchase tiers: 20K/100K/500K ACUs at 5/10/15% off. **Foundry Memory billing begins Jun 1, 2026**: $0.25/1K events (short-term) + $0.25/1K memories/mo (long-term) + $0.50/1K retrievals — free during preview. Thread/conversation storage is $0 direct from Microsoft but customer pays Cosmos DB bills (~$0.25/M RUs serverless).",
};
