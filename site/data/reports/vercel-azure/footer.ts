import type { FooterData } from "@/data/report-schema.ts";

export const footerData: FooterData = {
  vercelLinks: [
    { label: "AI SDK 6 Blog", url: "https://vercel.com/blog/ai-sdk-6" },
    { label: "AI SDK GitHub", url: "https://github.com/vercel/ai" },
    { label: "AI Gateway", url: "https://vercel.com/ai-gateway" },
    { label: "Sandbox Docs", url: "https://vercel.com/docs/vercel-sandbox" },
    {
      label: "Workflow GA Blog",
      url: "https://vercel.com/blog/a-new-programming-model-for-durable-execution",
    },
    {
      label: "Secure Compute",
      url: "https://vercel.com/docs/connectivity/secure-compute",
    },
  ],
  awsLinks: [
    {
      label: "Foundry Agent Service GA",
      url: "https://devblogs.microsoft.com/foundry/foundry-agent-service-ga/",
    },
    {
      label: "Microsoft Agent Framework 1.0 GA",
      url: "https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-version-1-0/",
    },
    {
      label: "Foundry Agent Service Overview",
      url: "https://learn.microsoft.com/en-us/azure/foundry/agents/overview",
    },
    {
      label: "Foundry Region Support",
      url: "https://learn.microsoft.com/en-us/azure/foundry/reference/region-support",
    },
    {
      label: "Azure OpenAI Pricing",
      url: "https://azure.microsoft.com/en-us/pricing/details/azure-openai/",
    },
    {
      label: "Foundry Evaluations + Tracing GA",
      url: "https://techcommunity.microsoft.com/blog/azure-ai-foundry-blog/generally-available-evaluations-monitoring-and-tracing-in-microsoft-foundry/4502760",
    },
  ],
  contributors: [{ name: "Mario Lopez Martinez", github: "HiMarioLopez" }],
  reportVersion: "1.0.0",
  generatedDate: "2026-04-21",
  analyzedVersions: {
    aiSdk: "ai@6.0.168",
    strands: "agent-framework@1.0.1",
    agentcore: "azure-ai-projects@2.1.0",
  },
};
