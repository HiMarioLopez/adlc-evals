## TECHNICAL CONSTRAINTS

- Citations: Every claim MUST link to source docs found via MCP or Web.
- If data is not in MCP or Web, write "DOCUMENTATION GAP: [Feature Name]".
- **Azure pricing gotcha:** Azure's pricing pages are JavaScript-rendered SPAs. Static HTML fetches return `$-` placeholders. When you encounter `$-` in a static fetch, flag as "DOCUMENTATION GAP — verify via Azure Pricing Calculator at `azure.microsoft.com/en-us/pricing/calculator/`" rather than guessing. The following pricing data is confirmed missing from static HTML and needs Pricing Calculator or Azure Retail Prices API verification:
  - GPT-5.1 / 5.2 / 5.3 sub-series per-token rates (beyond GPT-5.3 Codex Global confirmed at $1.75/$14 per 1M)
  - Foundry Agent Service Hosted Agents vCPU/GiB-hour rates
  - Foundry Agent Service Web Search / Custom Search / Deep Research rates
  - Llama 4 / Phi-4 per-token rates
  - Mistral text model rates
  - AI Search Agentic Retrieval beyond free tier
  - Azure Functions Durable Task Scheduler rates
  - Azure Monitor Prometheus per-sample rate

