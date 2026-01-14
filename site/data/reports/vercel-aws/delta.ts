import type { DeltaData } from "@/data/report-schema";

export const deltaData: DeltaData = {
  title: "Recent Platform Updates",
  description:
    "Key changes affecting agent development and infrastructure decisions.",
  deltas: [
    {
      platform: "Vercel AI SDK",
      previous: "SDK 5.x (generateText, streamText with maxSteps)",
      current: "SDK 6.x (ToolLoopAgent class)",
      changes: [
        "New agent-first abstraction with ToolLoopAgent",
        "stopWhen conditions for loop control",
        "Built-in loop management with 20-step default",
        "system renamed to instructions",
      ],
      version: "ai@6.0.23",
      link: "https://github.com/vercel/ai",
      color: "primary",
    },
    {
      platform: "Bedrock AgentCore",
      previous: "Preview (July 2025)",
      current: "GA (October 2025)",
      changes: [
        "Production SLAs and consumption-based pricing",
        "Cedar-based Policy (preview)",
        "Evaluations capability (preview)",
        "Browser Tool + Code Interpreter GA",
      ],
      version: "v1.1.4",
      link: "https://github.com/aws/bedrock-agentcore-sdk-python",
      color: "aws",
    },
    {
      platform: "Strands SDK",
      previous: "Initial Python Release",
      current: "v1.21.0 Stable",
      changes: [
        "TypeScript preview announced (Dec 2025)",
        "Multi-agent orchestration support",
        "Model-agnostic provider routing",
        "Extended tool ecosystem",
      ],
      version: "v1.21.0",
      link: "https://github.com/strands-agents/sdk-python",
      color: "chart-2",
    },
  ],
};
