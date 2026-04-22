## METHODOLOGY: HANDLING ECOSYSTEM ASYMMETRY

The comparison involves **full agent stacks** targeting different ecosystems:

| Aspect | Vercel Agent Stack | Azure Stack (Agent Framework + Foundry) |
|--------|--------------------|-----------------------------------------|
| **Model Layer** | AI Gateway (unified API, BYOK, 0% markup) | Azure OpenAI + Foundry Models catalog (11,000+ models) |
| **Primary Languages** | TypeScript (first-class), Python (backends) | **Python + C# (.NET) both first-class**; Java via Spring AI; JavaScript/TypeScript via `@azure/ai-agents` |
| **Target Ecosystem** | Fullstack + Backend (Next.js, FastAPI, Flask, Express) | **Enterprise Microsoft ecosystem** (Azure, Microsoft 365, Copilot Studio, Teams, Power Platform) |
| **Framework Integration** | React hooks, RSC, Svelte, Vue + Python backends | ASP.NET Core (.NET), Python (FastAPI), Copilot Studio distribution, Teams apps |
| **Code Execution** | Sandbox SDK (TS + Python) | Foundry Code Interpreter (Python) + ACA Dynamic Sessions (Python/Node.js/Shell) |
| **Durability** | Workflow SDK (`"use workflow"`) | Multi-agent Workflows (preview, visual + YAML) + Durable Task Scheduler |
| **Memory** | External (bring your own) | Foundry Memory (preview) + Conversations API (GA) + Azure AI Search + Cosmos DB |
| **Identity** | NextAuth/Auth.js, custom | **Microsoft Entra ID** (GA) + **Entra Agent ID** (preview) — deepest enterprise identity integration of any cloud |

**Sources:**

- [Vercel Backends](https://vercel.com/docs/frameworks/backend) — FastAPI, Flask, Express support
- [Microsoft Agent Framework](https://learn.microsoft.com/en-us/agent-framework/) — unified SK + AutoGen SDK

**Recommendation for Fair Comparison:**

1. **Feature Parity:** Map equivalent capabilities across stacks:
   - AI Gateway ↔ Azure OpenAI + Foundry Models (model access)
   - `ToolLoopAgent` ↔ Agent Framework `Agent`
   - Sandbox SDK ↔ Foundry Code Interpreter / ACA Dynamic Sessions
   - Workflow SDK ↔ Multi-agent Workflows (preview)
   - Computer Use tools ↔ Azure Computer Use tool / Browser Automation tool
   - @ai-sdk/mcp ↔ `McpTool` + Foundry MCP Server
2. **Language Primacy:** Acknowledge Azure's **dual Python/C# primacy** vs Vercel's TypeScript-first approach. Show the SAME hello-world in TS (Vercel) + Python (Azure) + C# (Azure) where space permits.
3. **DX Comparison:** Vercel optimizes for frontend/fullstack DX. Azure optimizes for enterprise integration (Entra, Teams, Copilot Studio, Power Platform, M365).
4. **Regional Breadth vs Latency:** Azure has **24 Agent Service regions vs Vercel's 21 compute regions**, but Vercel's edge network still wins for global static/CDN. Azure has fragmented regional availability for reasoning models (o3-pro/codex-mini in only 2 regions).
5. **TCO Analysis:** Include all stack components (Agent Service, Code Interpreter, File Search, Cosmos DB threads, AI Search for RAG, Azure Monitor for telemetry).
6. **Enterprise Bias:** Azure's pitch is enterprise-first — document the pricing cliff between PAYG and PTU (monthly reservation ≈ 64% off, yearly ≈ 70% off), as well as Entra integration, VNet isolation, Azure Policy, and compliance (FedRAMP, HIPAA, EU AI Act via Agent Governance Toolkit).

---

