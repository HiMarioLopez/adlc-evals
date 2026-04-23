import type { FooterData } from "@/data/report-schema.ts";

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
      label: "AgentCore Managed Harness",
      url: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/harness.html",
    },
    {
      label: "AgentCore CLI",
      url: "https://github.com/aws/agentcore-cli",
    },
    {
      label: "Persistent Filesystem",
      url: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-persistent-filesystems.html",
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
      label: "Kiro AgentCore Power",
      url: "https://kiro.dev/powers/",
    },
  ],
  complianceNote: {
    text: "Both platforms hold baseline enterprise certifications — SOC 2 Type 2, ISO 27001, HIPAA BAA, and GDPR. AWS additionally holds FedRAMP High, DoD IL5, HITRUST, and 140+ regional/vertical certs for regulated industries. Full inventories:",
    links: [
      { label: "security.vercel.com", url: "https://security.vercel.com/" },
      { label: "AWS compliance", url: "https://aws.amazon.com/compliance/" },
    ],
  },
  contributors: [{ name: "Mario Lopez Martinez", github: "HiMarioLopez" }],
  reportVersion: "2.1.0",
  generatedDate: "2026-04-22",
  analyzedVersions: {
    aiSdk: "ai@6.0.168",
    strands: "strands@1.37.0",
    agentcore: "agentcore@1.6.3 · CLI @aws/agentcore@1.0.0-preview.1",
  },
};
