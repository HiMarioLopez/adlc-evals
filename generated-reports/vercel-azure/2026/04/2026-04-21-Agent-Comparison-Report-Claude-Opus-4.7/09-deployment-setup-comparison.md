## 8. Deployment Setup Comparison

The blessed path on Azure uses the **Azure Developer CLI** and **Foundry Agent Service**.

### 8.1 Vercel Setup (~3 min)

```bash
# 1. Install Vercel CLI — one global package, no other dependencies
npm i -g vercel

# 2. Link & deploy — connect repo and deploy in one command
vercel

# 3. Push updates — auto-deploys on every push, preview URLs for PRs
git push origin main
```

> **Framework-defined Infrastructure™** — your code structure determines the infrastructure. No Bicep, no Terraform, no Entra RBAC to configure.

### 8.2 Azure Setup (30–45 min)

```bash
# 1. Install Azure Developer CLI — the azd CLI has a preview extension for Foundry agents
brew install azd && azd extension install microsoft.ai.agent

# 2. Authenticate
az login && az account set --subscription <SUB_ID>

# 3. Initialize Foundry project in a supported region (e.g. eastus2, swedencentral)
azd ai agent init
```

**4. Configure Managed Identity** — grant the agent's Managed Identity the required roles:
- Cognitive Services OpenAI User (model inference)
- Cognitive Services User (Foundry Agent Service)
- Azure AI Inference Deployment Operator (if PTU)
- Storage Blob Data Contributor (threads / file attachments)
- Cosmos DB Built-in Data Contributor (thread storage)
- Azure AI Search Index Data Contributor (if RAG)

**5. Author `agent.yaml` + `main.py` + Dockerfile** — Hosted Agents deployment pattern using Microsoft Agent Framework:

```python
# main.py
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

# agent.yaml manifest + Dockerfile also required
```

+ `requirements.txt` (`agent-framework`, `azure-ai-projects`, `azure-ai-agents`)

```bash
# 6. Build & publish — azd extension builds the container and publishes to Foundry
azd ai agent publish

# 7. Verify run
azd ai agent invoke --prompt 'Hello'
```

> **Enterprise-grade Microsoft Ecosystem** — deep Entra integration, Managed Identity everywhere, BYO VNet, Copilot Studio distribution, Teams apps. Best fit for enterprises already on M365 / Azure.

### 8.3 Side-by-Side

| Label | Vercel | Azure |
|-------|--------|-------|
| **Time to First Deploy** | 3 min | 30–45 min |
| **Config Files Required** | 0–1 | 3+ |
| **Entra Roles to Configure** | 0 | 4–6+ |

---

