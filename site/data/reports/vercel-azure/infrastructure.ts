import type {
  CategoryGroup,
  InfrastructureData,
} from "@/data/report-schema.ts";

export const categoryGroups: CategoryGroup[] = [
  {
    name: "Agent Foundations",
    iconName: "Bot",
    description:
      "Core SDKs and gateways for building AI agents with reasoning and tool use",
    colorClass: "from-violet-500/20 to-purple-500/20",
    rows: [
      {
        capability: "Agent Framework",
        description:
          "Core SDK for building agentic AI applications with tool loops and multi-step reasoning",
        iconName: "Bot",
        vercel: {
          text: "Vercel AI SDK 6.x",
          detail:
            "ToolLoopAgent, Agent interface, stopWhen, prepareStep, dynamicTool (stable Dec 2025); v7 beta ESM-only",
          link: "https://ai-sdk.dev/docs/agents/overview",
          links: [
            {
              label: "Agents overview",
              url: "https://ai-sdk.dev/docs/agents/overview",
            },
            {
              label: "Agent reference",
              url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/agent",
            },
            {
              label: "AI SDK 6 announcement",
              url: "https://vercel.com/blog/ai-sdk-6",
            },
          ],
        },
        aws: {
          text: "Microsoft Agent Framework 1.0",
          detail:
            "GA Apr 3, 2026 · .NET + Python (TS in dev) · AIAgent, ChatClientAgent, SequentialBuilder, GraphFlow, Magentic-One · SK + AutoGen in maintenance",
          link: "https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-version-1-0/",
          links: [
            {
              label: "MAF 1.0 release",
              url: "https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-version-1-0/",
            },
            {
              label: "MAF overview",
              url: "https://learn.microsoft.com/en-us/agent-framework/overview/",
            },
            {
              label: "Magentic pattern",
              url: "https://learn.microsoft.com/en-us/agent-framework/workflows/orchestrations/magentic",
            },
          ],
        },
      },
      {
        capability: "Model Gateway",
        description:
          "Unified API to route requests across multiple LLM providers with automatic failover",
        iconName: "Network",
        vercel: {
          text: "AI Gateway",
          detail:
            "0% markup · BYOK across Anthropic/OpenAI/Azure/Vertex/Bedrock · 100+ models · built-in observability",
          link: "https://vercel.com/docs/ai-gateway",
          links: [
            {
              label: "AI Gateway",
              url: "https://vercel.com/docs/ai-gateway",
            },
            {
              label: "BYOK",
              url: "https://vercel.com/docs/ai-gateway/authentication-and-byok/byok",
            },
            {
              label: "Models & providers",
              url: "https://vercel.com/docs/ai-gateway/models-and-providers",
            },
          ],
        },
        aws: {
          text: "Azure OpenAI + Foundry Models",
          detail:
            "1,900+ models · 9 deployment tiers (Global/Data Zone/Regional + PTU/Batch/Priority +75%) · GPT-5.4 GA Mar 2026",
          link: "https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/deployment-types",
          links: [
            {
              label: "Azure OpenAI",
              url: "https://learn.microsoft.com/en-us/azure/foundry/",
            },
            {
              label: "Deployment tiers",
              url: "https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/deployment-types",
            },
            {
              label: "Models catalog",
              url: "https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure",
            },
          ],
        },
      },
      {
        capability: "Tool Management",
        description:
          "Connect external APIs, databases, and services as callable tools for agents",
        iconName: "Wrench",
        vercel: {
          text: "mcp-handler + AI SDK tools + Sandbox",
          detail:
            "mcp-handler 1.1 (first-party MCP server, Streamable HTTP + OAuth); @ai-sdk/mcp client; tool() + dynamicTool; @vercel/sandbox 1.10 for code exec",
          link: "https://github.com/vercel/mcp-handler",
          links: [
            {
              label: "mcp-handler",
              url: "https://github.com/vercel/mcp-handler",
            },
            {
              label: "AI SDK tools",
              url: "https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling",
            },
            {
              label: "Vercel Sandbox",
              url: "https://vercel.com/docs/vercel-sandbox",
            },
          ],
        },
        aws: {
          text: "Foundry Toolbox + McpTool + Foundry MCP Server",
          detail:
            "**Toolbox (Public Preview · Apr 22, 2026)** — unified MCP endpoint bundling Web Search / AI Search / Code Interp / File Search / MCP / OpenAPI / A2A; versioned, OAuth passthrough; `{project}/toolboxes/{name}/mcp` · McpTool (OAuth passthrough), A2ATool · Foundry MCP Server preview at mcp.ai.azure.com (live since Dec 3, 2025)",
          link: "https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/toolbox",
          links: [
            {
              label: "Toolbox",
              url: "https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/toolbox",
            },
            {
              label: "McpTool",
              url: "https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/model-context-protocol",
            },
            {
              label: "Foundry MCP Server",
              url: "https://learn.microsoft.com/en-us/azure/foundry/mcp/get-started",
            },
          ],
        },
      },
      {
        capability: "Protocol Support",
        description:
          "Open agent interoperability protocols supported natively by the platform",
        iconName: "Network",
        vercel: {
          text: "MCP (client + server)",
          detail:
            "@ai-sdk/mcp client: Streamable HTTP + SSE stable, stdio local-only · mcp-handler server · A2A + AG-UI not first-party",
          link: "https://ai-sdk.dev/docs/ai-sdk-core/mcp-tools",
        },
        aws: {
          text: "MCP + Responses API + A2A + AG-UI",
          detail:
            "Responses API GA Mar 16, 2026 (wire-compatible with OpenAI Agents SDK) · MCP GA · A2A consumer preview · AG-UI adapter in MAF (preview)",
          link: "https://devblogs.microsoft.com/foundry/foundry-agent-service-ga/",
          links: [
            {
              label: "Responses API",
              url: "https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/responses",
            },
            {
              label: "MCP tool",
              url: "https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/model-context-protocol",
            },
            {
              label: "A2A tool",
              url: "https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/agent-to-agent",
            },
          ],
        },
      },
      {
        capability: "Agent Discovery",
        description:
          "Centralized catalog for discovering, sharing, and governing agents",
        iconName: "Search",
        vercel: {
          text: "Marketplace + mcp.vercel.com",
          detail:
            "Marketplace: AI Agents & Services category + agent-optimized CLI (vercel integration discover/guide); mcp.vercel.com first-party MCP endpoint; no dedicated agent registry",
          link: "https://vercel.com/marketplace/category/agents",
          links: [
            {
              label: "Agents Marketplace",
              url: "https://vercel.com/marketplace/category/agents",
            },
            {
              label: "Vercel MCP",
              url: "https://vercel.com/docs/mcp",
            },
          ],
        },
        aws: {
          text: "Foundry Tool Catalog + Projects REST",
          detail:
            "Tool Catalog GA (portal + SDK, public + private) · agent CRUD via Projects REST v1 · no standalone cross-project agent registry",
          link: "https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/tool-catalog",
          links: [
            {
              label: "Tool Catalog",
              url: "https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/tool-catalog",
            },
            {
              label: "Foundry Agent Service",
              url: "https://learn.microsoft.com/en-us/azure/foundry/agents/overview",
            },
          ],
        },
      },
    ],
  },
  {
    name: "Infrastructure",
    iconName: "Server",
    description: "Compute, execution environments, and workflow orchestration",
    colorClass: "from-blue-500/20 to-cyan-500/20",
    rows: [
      {
        capability: "Infrastructure Wrapper",
        description:
          "Managed compute layer that handles scaling, deployments, and runtime lifecycle",
        iconName: "Server",
        vercel: {
          text: "Fluid Compute",
          detail:
            "Edge + Serverless hybrid across 20 regions; in-function concurrency; 800s max (Pro/Enterprise); Active CPU billing — I/O time is free",
          link: "https://vercel.com/docs/fluid-compute",
        },
        aws: {
          text: "Foundry Agent Service",
          detail:
            "Next-gen GA Mar 16, 2026 · Responses API runtime (wire-compatible w/ OpenAI Agents SDK) · prompt agents GA · **Hosted Agents refresh (Public Preview · Apr 22, 2026)** — new backend (not ACA), per-session hypervisor sandbox, $HOME + /files persistence across scale-to-zero, <100ms cold start, $0.0994/vCPU-hr + $0.0118/GiB-hr, 0.25–2 vCPU / 0.5–4 GiB, 4 preview regions (AU East, CA Central, NC US, SE Central) · `azd ai agent init/deploy` (ext v0.1.26-preview+) · Responses + Invocations + Activity + A2A protocols coexist",
          link: "https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents",
          links: [
            {
              label: "Hosted Agents",
              url: "https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents",
            },
            {
              label: "Responses API",
              url: "https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/responses",
            },
            {
              label: "azd ai agent",
              url: "https://learn.microsoft.com/en-us/azure/developer/azure-developer-cli/extensions/azure-ai-foundry-extension",
            },
          ],
        },
      },
      {
        capability: "Secure Code Execution",
        description:
          "Sandboxed environment for running untrusted or AI-generated code safely",
        iconName: "Code2",
        vercel: {
          text: "Vercel Sandbox",
          detail:
            "Firecracker microVMs, node24/python3.13; up to 32 vCPU / 64 GB / 32 GB NVMe (Enterprise); 5-hr max; 2,000 concurrent; iad1 only; snapshots GA, persistent beta",
          link: "https://vercel.com/docs/vercel-sandbox",
          links: [
            {
              label: "Vercel Sandbox",
              url: "https://vercel.com/docs/vercel-sandbox",
            },
            {
              label: "Pricing & limits",
              url: "https://vercel.com/docs/vercel-sandbox/pricing",
            },
          ],
        },
        aws: {
          text: "ACA Dynamic Sessions + Foundry Code Interpreter",
          detail:
            "Hyper-V isolated sessions across 38 regions; built-in Python/Node.js/Shell + custom container pools; 1-hr active / 30-min idle timeout; managed Code Interpreter tool wraps the same runtime",
          link: "https://learn.microsoft.com/en-us/azure/container-apps/sessions",
          links: [
            {
              label: "ACA Dynamic Sessions",
              url: "https://learn.microsoft.com/en-us/azure/container-apps/sessions",
            },
            {
              label: "Code Interpreter",
              url: "https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/code-interpreter",
            },
          ],
        },
      },
      {
        capability: "Durable Workflows",
        description:
          "Long-running, resumable workflows that survive failures and deployments",
        iconName: "Workflow",
        vercel: {
          text: "Workflow SDK (GA)",
          detail:
            '`"use workflow"` directive; event-sourced, unlimited run + sleep duration; 10K steps/run; 100K concurrent; DurableAgent for AI SDK; TS GA, Python beta',
          link: "https://vercel.com/docs/workflows",
          links: [
            {
              label: "Vercel Workflows",
              url: "https://vercel.com/docs/workflows",
            },
            {
              label: "Getting started",
              url: "https://workflow-sdk.dev/docs/getting-started",
            },
            {
              label: "DurableAgent",
              url: "https://workflow-sdk.dev/docs/api-reference/workflow-ai/durable-agent",
            },
          ],
        },
        aws: {
          text: "Multi-agent Workflows (Preview)",
          detail:
            "Preview since Nov 25, 2025 (Ignite) · still preview Apr 2026 · drag-drop visual designer + YAML in Foundry portal & VS Code · graph-based MAF orchestration deployed via hosted agents",
          link: "https://devblogs.microsoft.com/foundry/introducing-multi-agent-workflows-in-foundry-agent-service/",
          links: [
            {
              label: "Multi-agent Workflows",
              url: "https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/workflow",
            },
            {
              label: "Announcement",
              url: "https://devblogs.microsoft.com/foundry/introducing-multi-agent-workflows-in-foundry-agent-service/",
            },
          ],
        },
      },
      {
        capability: "Message Queue",
        description:
          "Durable event streaming and task scheduling primitive underlying long-running agent workloads",
        iconName: "Inbox",
        vercel: {
          text: "Vercel Queues (GA)",
          detail:
            "@vercel/queue: durable append-only topic log; fan-out consumer groups; automatic retries + deduplication; powers the Workflow SDK under the hood",
          link: "https://vercel.com/docs/queues",
          links: [
            {
              label: "Vercel Queues",
              url: "https://vercel.com/docs/queues",
            },
            {
              label: "Queue concepts",
              url: "https://vercel.com/docs/queues/concepts",
            },
          ],
        },
        aws: {
          text: "Azure Durable Task Scheduler",
          detail:
            "Consumption SKU GA Mar 31, 2026 (pay-per-action, no upfront); Dedicated SKU GA Nov 2025 (1 CU = 2K actions/sec, 50 GB); managed backend for Durable Functions + Durable Task SDKs; 30-day history",
          link: "https://learn.microsoft.com/en-us/azure/durable-task/scheduler/develop-with-durable-task-scheduler",
          links: [
            {
              label: "Durable Task Scheduler",
              url: "https://learn.microsoft.com/en-us/azure/durable-task/scheduler/durable-task-scheduler",
            },
            {
              label: "Developer guide",
              url: "https://learn.microsoft.com/en-us/azure/durable-task/scheduler/develop-with-durable-task-scheduler",
            },
            {
              label: "Durable Functions",
              url: "https://learn.microsoft.com/en-us/azure/azure-functions/durable-functions/durable-functions-overview",
            },
          ],
        },
      },
      {
        capability: "Agent Harness",
        description:
          "Primitives for long-running autonomous agents: shell execution with approval gates and context compaction for extended sessions",
        iconName: "Terminal",
        vercel: {
          text: "@vercel/sandbox + bash-tool + AI SDK toolNeedsApproval",
          detail:
            "@vercel/sandbox 1.10 (Firecracker microVM, node24/python3.13, 32 vCPU/64 GB Enterprise); bash-tool (just-bash TS interpreter, lightweight context retrieval); AI SDK v7 `toolNeedsApproval` for human-in-the-loop; DurableAgent for long-running sessions via Workflow",
          link: "https://vercel.com/docs/vercel-sandbox",
          links: [
            {
              label: "Vercel Sandbox",
              url: "https://vercel.com/docs/vercel-sandbox",
            },
            {
              label: "bash-tool",
              url: "https://github.com/vercel-labs/bash-tool",
            },
            {
              label: "Tool approval",
              url: "https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling#human-in-the-loop",
            },
            {
              label: "DurableAgent",
              url: "https://workflow-sdk.dev/docs/api-reference/workflow-ai/durable-agent",
            },
          ],
        },
        aws: {
          text: "MAF Agent Harness (Preview · Apr 22, 2026)",
          detail:
            'Three patterns: (1) Local Shell Harness with `@tool(approval_mode="always_require")` approval flows, (2) Hosted Shell Harness (one-line change — runs in same provider-managed sandbox as Hosted Agents), (3) Context Compaction via `CompactionProvider` + `SlidingWindowStrategy`; Python + .NET; GitHub Copilot SDK integration (Preview) for multi-agent composition',
          link: "https://devblogs.microsoft.com/agent-framework/agent-harness-in-agent-framework/",
          links: [
            {
              label: "Agent Harness",
              url: "https://devblogs.microsoft.com/agent-framework/agent-harness-in-agent-framework/",
            },
            {
              label: "Hosted Agents",
              url: "https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents",
            },
            {
              label: "Context Compaction",
              url: "https://learn.microsoft.com/en-us/agent-framework/agents/conversations/compaction",
            },
          ],
        },
      },
      {
        capability: "Browser Automation",
        description:
          "Programmatic browser control for web scraping, testing, and UI automation",
        iconName: "Globe",
        vercel: {
          text: "Kernel (Marketplace) + Sandbox DIY",
          detail:
            "Kernel (Vercel-native Marketplace, 500+ installs): CDP cloud browsers compatible with Playwright/Puppeteer/Stagehand/Computer Use · or install Chromium directly in @vercel/sandbox",
          link: "https://vercel.com/marketplace/kernel",
          links: [
            {
              label: "Kernel",
              url: "https://vercel.com/marketplace/kernel",
            },
            {
              label: "Vercel Sandbox",
              url: "https://vercel.com/docs/vercel-sandbox",
            },
          ],
        },
        aws: {
          text: "Browser Automation + Computer Use (Preview)",
          detail:
            "Two distinct tools: Browser Automation uses Microsoft Playwright Workspaces (BYO resource, any GPT model, DOM actions); Computer Use is screenshot-based on `computer-use-preview` (3 regions: East US 2, Sweden Central, South India)",
          link: "https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/browser-automation",
          links: [
            {
              label: "Browser Automation",
              url: "https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/browser-automation",
            },
            {
              label: "Computer Use",
              url: "https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/computer-use",
            },
            {
              label: "Playwright Workspaces",
              url: "https://learn.microsoft.com/en-us/azure/app-testing/playwright-workspaces/overview-what-is-microsoft-playwright-workspaces",
            },
          ],
        },
      },
    ],
  },
  {
    name: "Security & Identity",
    iconName: "Shield",
    description: "Authentication, authorization, and access control",
    colorClass: "from-emerald-500/20 to-green-500/20",
    rows: [
      {
        capability: "Authorization",
        description:
          "Policy-based access control determining what actions users and agents can perform",
        iconName: "KeyRound",
        vercel: {
          text: "AI Gateway ZDR + Deployment Protection",
          detail:
            "AI Gateway ZDR (Pro/Enterprise): team-wide toggle ($0.10/1K req) or per-request flag; routes to 13 ZDR providers; BYOK exempt. Platform Deployment Protection: Vercel Auth, Password, Trusted IPs.",
          link: "https://vercel.com/docs/ai-gateway/capabilities/zdr",
          links: [
            {
              label: "AI Gateway ZDR",
              url: "https://vercel.com/docs/ai-gateway/capabilities/zdr",
            },
            {
              label: "Deployment Protection",
              url: "https://vercel.com/docs/deployment-protection",
            },
          ],
        },
        aws: {
          text: "Microsoft Entra Agent ID (Preview)",
          detail:
            "Preview since May 19, 2025 (Build 2025); still preview Apr 2026 · agent identity blueprints · OAuth 2.0 OBO + client_credentials · Managed Identity federation (FIC/TUAMI) · Conditional Access",
          link: "https://learn.microsoft.com/en-us/entra/agent-id/agent-blueprint",
          links: [
            {
              label: "Entra Agent ID",
              url: "https://learn.microsoft.com/en-us/entra/agent-id/agent-blueprint",
            },
            {
              label: "OAuth OBO flow",
              url: "https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-on-behalf-of-flow",
            },
          ],
        },
      },
      {
        capability: "RBAC & Access Control",
        description:
          "Granular team, project, and resource-level permissions with directory sync",
        iconName: "Users",
        vercel: {
          text: "Team Roles + Access Groups + SCIM",
          detail:
            "8 team roles (Owner → Contributor) + dedicated Security role for firewall/WAF; project-level Access Groups with permission groups; SCIM Directory Sync maps IdP groups to roles (Enterprise)",
          link: "https://vercel.com/docs/rbac/access-groups",
          links: [
            {
              label: "Access Roles",
              url: "https://vercel.com/docs/rbac/access-roles",
            },
            {
              label: "Access Groups",
              url: "https://vercel.com/docs/rbac/access-groups",
            },
            {
              label: "Directory Sync",
              url: "https://vercel.com/docs/directory-sync",
            },
          ],
        },
        aws: {
          text: "Azure RBAC + Foundry Roles",
          detail:
            "Built-in Foundry roles (GA): Azure AI Account Owner, Administrator, Developer, User + Cognitive Services OpenAI Contributor/User; RBAC assigned to agent identity for tool access",
          link: "https://learn.microsoft.com/en-us/azure/foundry/concepts/rbac-foundry",
          links: [
            {
              label: "Foundry RBAC",
              url: "https://learn.microsoft.com/en-us/azure/foundry/concepts/rbac-foundry",
            },
            {
              label: "AI built-in roles",
              url: "https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/ai-machine-learning",
            },
          ],
        },
      },
      {
        capability: "Identity / OAuth",
        description:
          "User authentication and identity management with social/enterprise providers",
        iconName: "Fingerprint",
        vercel: {
          text: "Marketplace Auth + OIDC + SAML SSO",
          detail:
            "Marketplace-native: Clerk, Auth0, WorkOS, Stytch (auto-provisioned env vars, unified billing); Vercel OIDC IdP for keyless cloud + AI Gateway auth; SAML SSO (22+ IdPs) on Enterprise/Pro",
          link: "https://vercel.com/docs/oidc",
          links: [
            {
              label: "Marketplace Auth",
              url: "https://vercel.com/marketplace/category/authentication",
            },
            {
              label: "OIDC",
              url: "https://vercel.com/docs/oidc",
            },
            {
              label: "SAML SSO",
              url: "https://vercel.com/docs/saml",
            },
          ],
        },
        aws: {
          text: "Microsoft Entra ID",
          detail:
            "900M+ MAU; Foundry auto-provisions distinct service principal per published agent; FIC-based managed identity federation; Azure RBAC + Conditional Access; Entra Agent ID framework still Preview",
          link: "https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agent-identity",
          links: [
            {
              label: "Agent identity",
              url: "https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agent-identity",
            },
            {
              label: "Workload ID federation",
              url: "https://learn.microsoft.com/en-us/entra/workload-id/workload-identity-federation",
            },
            {
              label: "Conditional Access",
              url: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview",
            },
          ],
        },
      },
      {
        capability: "Content Safety / Guardrails",
        description:
          "Platform-level content moderation and policy enforcement for agent I/O",
        iconName: "Shield",
        vercel: {
          text: "Model-native + AI Gateway policies",
          detail:
            "No platform content filters or PII scrubbing; AI Gateway enforces ZDR + disallow-training; WAF rate-limits AI endpoints; Claude/OpenAI native safety + custom middleware required",
          link: "https://vercel.com/docs/ai-gateway/capabilities/disallow-prompt-training",
          links: [
            {
              label: "Disallow training",
              url: "https://vercel.com/docs/ai-gateway/capabilities/disallow-prompt-training",
            },
            {
              label: "AI Gateway ZDR",
              url: "https://vercel.com/docs/ai-gateway/capabilities/zdr",
            },
            {
              label: "Vercel Firewall",
              url: "https://vercel.com/docs/vercel-firewall",
            },
          ],
        },
        aws: {
          text: "Foundry Guardrails for Agents (Preview)",
          detail:
            "Preview for agents (model layer GA) · 10 risk categories: Hate/Sexual/Violence/Self-harm/Prompt Shield/Indirect Attack/Protected Material (code+text)/PII/Task Adherence · 4 intervention points: user input, tool call, tool response, output",
          link: "https://learn.microsoft.com/en-us/azure/foundry/guardrails/guardrails-overview",
          links: [
            {
              label: "Guardrails",
              url: "https://learn.microsoft.com/en-us/azure/foundry/guardrails/guardrails-overview",
            },
            {
              label: "Prompt Shields",
              url: "https://learn.microsoft.com/en-us/azure/ai-services/content-safety/concepts/jailbreak-detection",
            },
            {
              label: "PII filter",
              url: "https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/content-filter-personal-information",
            },
          ],
        },
      },
      {
        capability: "Agent Auditability & Observability",
        description:
          "What you can trace, log, and audit about agent execution — tool calls, prompts, outputs, token usage, and policy decisions",
        iconName: "FileCheck",
        vercel: {
          text: "OTel spans + AI Gateway logs + Log Drains",
          detail:
            "AI SDK emits OpenTelemetry spans per generation (model, prompt, tool calls, tokens, latency); AI Gateway logs every request with ZDR + disallow-training enforcement; Activity Log captures team/project changes; Log Drains stream to any SIEM (Datadog, Splunk, Axiom). BYO-DSPM model — plug into existing security tooling rather than a first-party posture product.",
          link: "https://vercel.com/docs/ai-gateway/capabilities/observability",
          links: [
            {
              label: "AI Gateway observability",
              url: "https://vercel.com/docs/ai-gateway/capabilities/observability",
            },
            {
              label: "AI SDK telemetry",
              url: "https://ai-sdk.dev/docs/ai-sdk-core/telemetry",
            },
            {
              label: "Log Drains",
              url: "https://vercel.com/docs/drains",
            },
            {
              label: "Activity Log",
              url: "https://vercel.com/docs/activity-log",
            },
          ],
        },
        aws: {
          text: "Defender AI-SPM + Purview for AI + Foundry tracing",
          detail:
            "First-party bundle: Defender for Cloud AI-SPM (GA) does agentless AI discovery + attack-path analysis across Azure/AWS/GCP; Microsoft Purview for AI (GA) captures prompts/responses with DSPM + DLP middleware; Foundry OpenTelemetry tracing + Entra audit logs. Out-of-box posture, tightly coupled to the Microsoft Security stack.",
          link: "https://learn.microsoft.com/en-us/azure/defender-for-cloud/ai-security-posture",
          links: [
            {
              label: "Defender AI-SPM",
              url: "https://learn.microsoft.com/en-us/azure/defender-for-cloud/ai-security-posture",
            },
            {
              label: "Purview for AI",
              url: "https://learn.microsoft.com/en-us/purview/ai-microsoft-purview",
            },
            {
              label: "Foundry tracing",
              url: "https://learn.microsoft.com/en-us/azure/foundry/concepts/observability",
            },
          ],
        },
      },
    ],
  },
  {
    name: "Operations",
    iconName: "Activity",
    description: "State management, memory, monitoring, and evaluation",
    colorClass: "from-amber-500/20 to-orange-500/20",
    rows: [
      {
        capability: "Persistent Memory",
        description:
          "Store conversation history and agent state across sessions for continuity",
        iconName: "Database",
        vercel: {
          text: "DurableAgent + Marketplace Storage",
          detail:
            "DurableAgent (@workflow/ai/agent) auto-persists messages/tool calls across steps; useChat onFinish for chat history; Neon/Upstash/Supabase via Marketplace; no first-party agent memory product",
          link: "https://workflow-sdk.dev/docs/api-reference/workflow-ai/durable-agent",
          links: [
            {
              label: "DurableAgent",
              url: "https://workflow-sdk.dev/docs/api-reference/workflow-ai/durable-agent",
            },
            {
              label: "useChat",
              url: "https://ai-sdk.dev/docs/reference/ai-sdk-ui/use-chat",
            },
            {
              label: "Marketplace storage",
              url: "https://vercel.com/marketplace/category/storage",
            },
          ],
        },
        aws: {
          text: "Responses API Conversations + Foundry Memory (refreshed)",
          detail:
            "Responses API Conversations (GA Mar 16, 2026) — indefinite retention, 100K items/convo · **Foundry Memory refresh (Apr 22, 2026)**: native MAF `FoundryMemoryProvider` + LangGraph integration, memory item CRUD API, custom `x-memory-user-id` scope header; **pricing starts Jun 1, 2026**: $0.25/1K events + $0.25/1K memories/mo + $0.50/1K retrievals; 10K memories/scope, 100 scopes/store · Assistants API sunsets Aug 26, 2026",
          link: "https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/what-is-memory",
          links: [
            {
              label: "Foundry Memory",
              url: "https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/what-is-memory",
            },
            {
              label: "Responses API",
              url: "https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/responses",
            },
            {
              label: "Assistants migration",
              url: "https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/migrate",
            },
          ],
        },
      },
      {
        capability: "Knowledge Base / Grounding",
        description:
          "Managed retrieval layer for grounding agents on curated documents and vector data",
        iconName: "BookOpen",
        vercel: {
          text: "Marketplace Vector Stores",
          detail:
            "Supabase pgvector, Upstash Vector, MongoDB Atlas, Pinecone via Marketplace (first-party billing, auto-provisioned env vars); AI SDK native embeddings + reranking",
          link: "https://vercel.com/marketplace/category/storage",
          links: [
            {
              label: "Marketplace storage",
              url: "https://vercel.com/marketplace/category/storage",
            },
            {
              label: "AI SDK embeddings",
              url: "https://ai-sdk.dev/docs/ai-sdk-core/embeddings",
            },
          ],
        },
        aws: {
          text: "Foundry IQ (Preview)",
          detail:
            "Managed Azure AI Search knowledge base for agents; MCP tool (knowledge_base_retrieve); semantic reranking + permission-aware retrieval; distinct from Memory (org content vs user context)",
          link: "https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/foundry-iq-connect",
        },
      },
      {
        capability: "Observability",
        description:
          "Tracing, logging, and metrics to debug and monitor agent behavior",
        iconName: "Activity",
        vercel: {
          text: "AI SDK telemetry + Vercel Observability + AI Gateway",
          detail:
            "experimental_telemetry on generateText/streamText (OTEL GenAI semconv); Vercel Observability Plus: 30-day retention, workflow run/step queries (Apr 7), anomaly alerts GA (Apr 13, 2026); AI Gateway Custom Reporting API (beta) for cost by tag/user/model",
          link: "https://vercel.com/docs/observability/observability-plus",
          links: [
            {
              label: "AI SDK telemetry",
              url: "https://ai-sdk.dev/docs/ai-sdk-core/telemetry",
            },
            {
              label: "Observability Plus",
              url: "https://vercel.com/docs/observability/observability-plus",
            },
            {
              label: "AI Gateway observability",
              url: "https://vercel.com/docs/ai-gateway/capabilities/observability",
            },
          ],
        },
        aws: {
          text: "Foundry Monitoring & Tracing (Fully GA)",
          detail:
            "Fully GA as of Apr 22, 2026 (GA Mar 16 · hosted agent tracing rolling out in Preview) · OpenTelemetry-native · configure_azure_monitor() (Python + .NET + Node + Java) · **evaluation-to-trace linkage** — click from a low-quality score directly to the exact trace that produced it · Azure Monitor: $2.30/GB Analytics, $0.50/GB Basic, $0.05/GB Auxiliary (East US PAYG, 5 GB/mo free)",
          link: "https://techcommunity.microsoft.com/blog/azure-ai-foundry-blog/generally-available-evaluations-monitoring-and-tracing-in-microsoft-foundry/4502760",
          links: [
            {
              label: "Monitoring & Tracing",
              url: "https://learn.microsoft.com/en-us/azure/foundry/observability/how-to/how-to-monitor-agents-dashboard",
            },
            {
              label: "OpenTelemetry setup",
              url: "https://learn.microsoft.com/en-us/azure/azure-monitor/app/opentelemetry-enable",
            },
            {
              label: "Azure Monitor pricing",
              url: "https://azure.microsoft.com/en-us/pricing/details/monitor/",
            },
          ],
        },
      },
      {
        capability: "Evaluations",
        description:
          "Built-in quality measurement for agent responses, safety, task completion, and tool usage",
        iconName: "CheckCircle2",
        vercel: {
          text: "BYO + Braintrust on Marketplace",
          detail:
            "No first-party eval product; Braintrust on Marketplace (GA Oct 2025) for evals + trace streaming with unified billing; Langfuse via AI Gateway integration (Feb 2026)",
          link: "https://vercel.com/changelog/braintrust-joins-the-vercel-marketplace",
          links: [
            {
              label: "Braintrust",
              url: "https://vercel.com/marketplace/braintrust",
            },
            {
              label: "Langfuse",
              url: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/langfuse",
            },
            {
              label: "Announcement",
              url: "https://vercel.com/changelog/braintrust-joins-the-vercel-marketplace",
            },
          ],
        },
        aws: {
          text: "Foundry Evaluations + AI Red Teaming Agent (GA)",
          detail:
            "Evaluations GA Mar 16, 2026 · 30+ built-in evaluators + 9 agent-specific (Tool Call Accuracy, Task Adherence, Intent Resolution) · custom evaluators: LLM-as-judge + code-based (Public Preview) · **AI Red Teaming Agent GA (Apr 22, 2026)** — automated adversarial scanning of models + hosted agents, covers content safety / prohibited actions / data leakage / task adherence / XPIA; built on open-source PyRIT; no-code UI + CI/CD via SDK · Prompt Optimizer Preview",
          link: "https://learn.microsoft.com/en-us/azure/foundry/concepts/ai-red-teaming-agent",
          links: [
            {
              label: "Foundry Evaluations",
              url: "https://learn.microsoft.com/en-us/azure/foundry/concepts/built-in-evaluators",
            },
            {
              label: "AI Red Teaming",
              url: "https://learn.microsoft.com/en-us/azure/foundry/concepts/ai-red-teaming-agent",
            },
            {
              label: "Prompt Optimizer",
              url: "https://learn.microsoft.com/en-us/azure/foundry/observability/how-to/prompt-optimizer",
            },
          ],
        },
      },
    ],
  },
];

export const infrastructureData: InfrastructureData = {
  sectionNumber: 1,
  title: "Infrastructure Footprint",
  description:
    'Full lifecycle comparison of the "blessed path" — officially recommended, out-of-the-box developer experience.',
  categoryGroups,
  keyInsight: {
    title: "Key Architecture Insight",
    description:
      "Microsoft Agent Framework 1.0 (open-source, MIT, GA Apr 3, 2026) owns orchestration logic and is framework-portable across Azure OpenAI, Anthropic, Gemini, Bedrock, and Ollama; Foundry Agent Service (GA Mar 16, 2026) owns the managed runtime — now refreshed Apr 22 with per-session hypervisor sandboxes, $HOME persistence, Toolbox, and Memory. The Responses API binds both layers, keeping agents portable between Foundry and OpenAI. Vercel's AI SDK sits at the MAF layer; Foundry's managed runtime maps to Vercel Sandbox + Fluid Compute + Workflow — see §3.1 head-to-head.",
    codeHighlight: "Microsoft Agent Framework 1.0",
  },
};
