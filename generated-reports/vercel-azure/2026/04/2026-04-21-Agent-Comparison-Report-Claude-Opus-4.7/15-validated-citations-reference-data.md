## 14. Validated Citations & Reference Data

> **Last Validated:** 2026-04-21

### 14.1 GitHub Repository Versions

| Platform | Repository | Language | Latest Tag (Apr 21, 2026) | Role |
|----------|------------|----------|---------------------------|------|
| Vercel | [vercel/ai](https://github.com/vercel/ai) | TypeScript | `ai@6.0.168` (stable) / `7.0.0-beta.111` (beta) | Agent framework (stable `ToolLoopAgent`, beta `WorkflowAgent`) |
| **Azure (blessed)** | [microsoft/agent-framework](https://github.com/microsoft/agent-framework) | Python + .NET | `agent-framework 1.0.1` · `Microsoft.Agents.AI 1.1.0` | Agent framework (unified SK + AutoGen successor) |
| Azure (infra) | [Azure/azure-sdk-for-python `sdk/ai/azure-ai-projects`](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/ai/azure-ai-projects) | Python | `azure-ai-projects 2.1.0` | Foundry project + agent infra SDK |
| Azure (infra) | [Azure/azure-sdk-for-python `sdk/ai/azure-ai-agents`](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/ai/azure-ai-agents) | Python | `azure-ai-agentserver-responses_1.0.0b4` | Foundry Agent Service wrapper |
| Azure (infra) | [Azure/azure-sdk-for-net](https://github.com/Azure/azure-sdk-for-net) | .NET | `Azure.AI.Projects 2.0.0-beta.2` | .NET equivalent |
| Azure (infra) | [Azure/azure-sdk-for-js](https://github.com/Azure/azure-sdk-for-js) | TypeScript | `@azure/ai-agents 2.0.0-beta.4` | JS/TS equivalent |
| Azure (superseded) | [microsoft/semantic-kernel](https://github.com/microsoft/semantic-kernel) | Python + .NET | `python-1.41.2` · `dotnet-1.74.0` | Legacy agent framework (migration target) |
| Azure (superseded) | [microsoft/autogen](https://github.com/microsoft/autogen) | Python | `python-v0.7.5` | Legacy research-origin framework (maintenance mode) |
| Azure (samples) | [microsoft-foundry/foundry-samples](https://github.com/microsoft-foundry/foundry-samples) | Multi | Rolling `main` | Canonical Hosted Agents patterns |

### 14.2 SDK Language Support Matrix

| Layer | Vercel | Azure | Language Coverage |
|-------|--------|-------|-------------------|
| **Agent Framework** | AI SDK 6.x stable (v7 beta) | **Microsoft Agent Framework 1.0** (recommended) + SK + AutoGen (both superseded) | TS/JS (Vercel) vs Python + C# (both first-class on Azure) + Java (Spring AI) + TS (`@azure/ai-agents`) |
| **Infrastructure SDK** | `@vercel/sandbox`, `@ai-sdk/workflow` | `azure-ai-agents` / `azure-ai-projects` (Python + .NET + JS + Java) | TS + Python (Workflow Python beta); Python + .NET + JS + Java |

> ⚠️ **Critical Distinction:** `azure-ai-agents` and `azure-ai-projects` are NOT for building agent logic — they're for managing agents on Foundry Agent Service infrastructure (create, thread, run lifecycle, tool dispatch). Agent logic is written with **Microsoft Agent Framework**. This is analogous to how you use AI SDK for agent logic but deploy on Vercel's platform.

---

