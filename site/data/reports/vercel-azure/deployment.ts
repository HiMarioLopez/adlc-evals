import type { DeploymentData } from "@/data/report-schema.ts";

export const deploymentData: DeploymentData = {
  sectionNumber: 4,
  title: "Deployment Setup Comparison",
  description:
    "The blessed path on Azure uses the Azure Developer CLI and Foundry Agent Service",
  vercel: {
    title: "Vercel Setup",
    duration: "~3 min",
    steps: [
      {
        stepNumber: 1,
        title: "Install Vercel CLI",
        description: "One global package, no other dependencies",
        iconName: "Terminal",
        command: "npm i -g vercel",
      },
      {
        stepNumber: 2,
        title: "Link & Deploy",
        description: "Connect repo and deploy in one command",
        iconName: "GitBranch",
        command: "vercel",
      },
      {
        stepNumber: 3,
        title: "Push Updates",
        description: "Auto-deploys on every push, preview URLs for PRs",
        iconName: "Cloud",
        command: "git push origin main",
      },
    ],
    summary: {
      title: "Framework-defined Infrastructure™",
      description:
        "Your code structure determines the infrastructure. No Bicep, no Terraform, no Entra RBAC to configure.",
    },
  },
  aws: {
    title: "Azure Setup",
    duration: "30-45 min",
    steps: [
      {
        stepNumber: 1,
        title: "Install Azure Developer CLI",
        description: "The azd CLI has a preview extension for Foundry agents",
        iconName: "Terminal",
        command: "brew install azd && azd extension install microsoft.ai.agent",
      },
      {
        stepNumber: 2,
        title: "Authenticate",
        description: "Sign in to Azure and set subscription",
        iconName: "Shield",
        command: "az login && az account set --subscription <SUB_ID>",
      },
      {
        stepNumber: 3,
        title: "Initialize Foundry project",
        description:
          "Create a Foundry Project resource in a supported region (e.g. eastus2, swedencentral)",
        iconName: "Database",
        command: "azd ai agent init",
      },
      {
        stepNumber: 4,
        title: "Configure Managed Identity",
        description: "Grant the agent's Managed Identity the required roles:",
        iconName: "Shield",
        notes: [
          "Cognitive Services OpenAI User (model inference)",
          "Cognitive Services User (Foundry Agent Service)",
          "Azure AI Inference Deployment Operator (if PTU)",
          "Storage Blob Data Contributor (threads / file attachments)",
          "Cosmos DB Built-in Data Contributor (thread storage)",
          "Azure AI Search Index Data Contributor (if RAG)",
        ],
      },
      {
        stepNumber: 5,
        title: "Author agent.yaml + main.py + Dockerfile",
        description:
          "Hosted Agents deployment pattern using Microsoft Agent Framework:",
        iconName: "Server",
        codeBlock: `# main.py
import asyncio, os
from agent_framework import Agent
from agent_framework.azure import AzureAIAgentClient
from azure.ai.agentserver.agentframework import from_agent_framework
from azure.identity.aio import DefaultAzureCredential

async def main():
    async with (
        DefaultAzureCredential() as credential,
        AzureAIAgentClient(
            project_endpoint=os.getenv("PROJECT_ENDPOINT"),
            model_deployment_name="gpt-4.1-mini",
            credential=credential,
        ) as client,
    ):
        agent = Agent(
            client,
            name="SeattleHotelAgent",
            instructions="You are a travel assistant.",
            tools=[get_available_hotels],
        )
        server = from_agent_framework(agent)
        await server.run_async()

asyncio.run(main())

# agent.yaml manifest + Dockerfile also required`,
        notes: [
          "+ requirements.txt (agent-framework, azure-ai-projects, azure-ai-agents)",
        ],
      },
      {
        stepNumber: 6,
        title: "Build & Publish",
        description:
          "azd extension builds the container and publishes to Foundry",
        iconName: "Layers",
        command: "azd ai agent publish",
      },
      {
        stepNumber: 7,
        title: "Verify run",
        description: "",
        iconName: "Cloud",
        command: "azd ai agent invoke --prompt 'Hello'",
      },
    ],
    summary: {
      title: "Enterprise-grade Microsoft Ecosystem",
      description:
        "Deep Entra integration, Managed Identity everywhere, BYO VNet, Copilot Studio distribution, Teams apps. Best fit for enterprises already on M365/Azure.",
    },
  },
  comparisons: [
    {
      label: "Time to First Deploy",
      vercel: { value: "3", unit: "min" },
      aws: { value: "30-45", unit: "min" },
    },
    {
      label: "Config Files Required",
      vercel: { value: "0-1", unit: "files" },
      aws: { value: "3+", unit: "files" },
    },
    {
      label: "Entra Roles to Configure",
      vercel: { value: "0" },
      aws: { value: "4-6+" },
    },
  ],
};
