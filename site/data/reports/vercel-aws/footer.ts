import type { FooterData } from "@/data/report-schema";

export const footerData: FooterData = {
  vercelLinks: [
    { label: "AI SDK 6 Blog", url: "https://vercel.com/blog/ai-sdk-6" },
    { label: "AI SDK GitHub", url: "https://github.com/vercel/ai" },
    { label: "AI Gateway", url: "https://vercel.com/ai-gateway" },
    { label: "Sandbox Docs", url: "https://vercel.com/docs/vercel-sandbox" },
    {
      label: "Workflow Blog",
      url: "https://vercel.com/blog/introducing-workflow",
    },
    {
      label: "Secure Compute",
      url: "https://vercel.com/docs/connectivity/secure-compute",
    },
  ],
  awsLinks: [
    {
      label: "Bedrock AgentCore Overview",
      url: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html",
    },
    {
      label: "Bedrock AgentCore Pricing",
      url: "https://aws.amazon.com/bedrock/agentcore/pricing/",
    },
    {
      label: "Bedrock AgentCore Regions",
      url: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agentcore-regions.html",
    },
    {
      label: "Strands SDK",
      url: "https://github.com/strands-agents/sdk-python",
    },
    {
      label: "Bedrock Pricing",
      url: "https://aws.amazon.com/bedrock/pricing/",
    },
    {
      label: "Bedrock AgentCore Policy",
      url: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/policy.html",
    },
  ],
  contributors: [{ name: "Mario Lopez Martinez", github: "HiMarioLopez" }],
  reportVersion: "1.0.0",
  generatedDate: "2026-01-08",
  analyzedVersions: {
    aiSdk: "ai@6.0.23",
    strands: "strands@1.21.0",
    agentcore: "agentcore@1.1.4",
  },
};
