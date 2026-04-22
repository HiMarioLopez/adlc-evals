## TASK: Refresh the Agent Comparison Master Prompt (Vercel vs Azure)

You are updating the master research prompt at `Vercel-Azure-Base-Research-Prompt.md`. Your goal is to validate all existing citations and update any stale information.

### REQUIRED MCP TOOLCHAINS

Use these MCP servers for authoritative data (DO NOT use general knowledge):

1. **GitHub MCP** — Fetch latest release tags and repository metadata
2. **Microsoft Learn / Azure Documentation** — Latest Foundry, Agent Framework, Azure OpenAI pricing and features (via `aws-knowledge_aws___read_documentation` with `learn.microsoft.com` URLs or direct webfetch)
3. **Vercel MCP** — Latest AI SDK, Sandbox, Workflow, AI Gateway docs
4. **Context7 MCP** — Cross-reference documentation and code samples

### REFRESH CHECKLIST

#### 1. Version Updates
Run these GitHub MCP queries to get current versions:

- [ ] `vercel/ai` — Check latest release tag (current: `ai@6.0.168` stable / `7.0.0-beta.111` beta)
- [ ] `microsoft/agent-framework` — Check latest Python tag (current: `agent-framework 1.0.1`) and .NET (`Microsoft.Agents.AI 1.1.0`)
- [ ] `Azure/azure-sdk-for-python` `sdk/ai/azure-ai-projects` — Check latest tag (current: `azure-ai-projects 2.1.0`)
- [ ] `Azure/azure-sdk-for-python` `sdk/ai/azure-ai-agents` — Check latest tag (current: `azure-ai-agentserver-responses_1.0.0b4`)
- [ ] `microsoft/semantic-kernel` — Latest Python + .NET tags (baseline: `python-1.41.2`, `dotnet-1.74.0`) — note whether SK is still maintained or deprecated
- [ ] `microsoft/autogen` — Latest tag (baseline: `python-v0.7.5`) — note whether officially deprecated in favor of Agent Framework

#### 2. Pricing Validation
Query the Azure pricing pages for current rates (cache-verified via search engine if `$-` rendered):

- [ ] Azure OpenAI GPT-4.1 / GPT-5 / GPT-5.3 Codex / o3 / o4-mini rates
- [ ] GPT-5.1 / 5.2 / 5.4 sub-series (currently `$-` in static HTML)
- [ ] Priority Processing multipliers (baseline: +75%)
- [ ] Batch API discount (baseline: −50%)
- [ ] PTU monthly/yearly reservation rates (baseline: ~64%/~70% off hourly)
- [ ] Foundry Agent Service Hosted Agents compute rates (currently DOCUMENTATION GAP)
- [ ] Foundry Models catalog: DeepSeek V3.2 / R1 / V3 rates; Llama / Phi / Mistral (currently DOCUMENTATION GAP)
- [ ] Azure Container Apps Dynamic Sessions rate (baseline: $0.03/session-hour)
- [ ] Azure AI Search tier rates (Free / Basic / S1–S3 / L1–L2)
- [ ] Azure Monitor ingestion rates (Analytics / Basic / Auxiliary)

Query Vercel MCP / docs for:

- [ ] AI Gateway markup (confirm 0% on all providers)
- [ ] Sandbox SDK pricing tiers (Hobby / Pro / Enterprise)
- [ ] Workflow SDK pricing (steps + storage)
- [ ] Fluid Compute regional rates (iad1, sfo1, fra1, gru1 baseline)

#### 3. Feature Parity Check

- [ ] Vercel Changelog: Any new agent-related features since last update?
- [ ] Azure Foundry What's New: Any Foundry Agent Service / Agent Framework updates?
- [ ] Microsoft Build keynote (June 2-3, 2026) — any major announcements?
- [ ] New MCP server support on either platform?
- [ ] Hosted Agents status — still preview or GA?
- [ ] Computer Use tool regional expansion beyond East US 2 / South India?

#### 3b. Blessed Path Validation
Confirm the recommended approach hasn't changed:

- [ ] Vercel: Is `ToolLoopAgent` still the recommended agent abstraction? Check AI SDK docs.
- [ ] Azure: Is Microsoft Agent Framework still the blessed path? Check Agent Framework docs front page.
- [ ] Has SK or AutoGen been officially deprecated (not just superseded)?
- [ ] Is Foundry Agent Service Responses API still the canonical runtime? (Assistants API sunsets Aug 26, 2026)
- [ ] Has Agent Framework 1.0 had a 1.1 / 2.0 major release that changes the API?

#### 3c. Regional Availability Check
Use Azure documentation to verify regional availability:

- [ ] Check [Foundry Region Support](https://learn.microsoft.com/en-us/azure/foundry/reference/region-support) for updates
- [ ] Has Agent Service expanded beyond 24 regions?
- [ ] Has Computer Use tool expanded beyond East US 2 + South India?
- [ ] Has Code Interpreter tool filled the gaps (Japan East, South Central US, Southeast Asia, Spain Central)?
- [ ] Has o3-pro / codex-mini expanded beyond East US 2 + Sweden Central?
- [ ] Update the Regional Availability Matrix in section 2b if changed
- [ ] Has Vercel Sandbox expanded past `iad1`?
- [ ] Has Vercel Workflow backend expanded past `iad1`?

#### 4. Documentation Link Validation
Verify all URLs in "CROSS-REFERENCE LINKS" section are still valid:

- [ ] Spot-check 5 random links from each platform
- [ ] Update any 404s or redirected URLs
- [ ] Microsoft commonly renames/restructures `learn.microsoft.com` URLs — the `foundry-classic/` vs `foundry/` split is particularly fragile

### OUTPUT FORMAT

After validation, update the following sections in `Vercel-Azure-Base-Research-Prompt.md`:

1. **VALIDATED CITATIONS & REFERENCE DATA** — Update any changed values
2. **GitHub Repositories** — Update version tags
3. **APPENDIX A: PROMPT CHANGELOG** — Add new row with today's date and changes

Example changelog entry:
| 1.1.0 | YYYY-MM-DD | Updated SDK versions; refreshed pricing tables; added [new feature] |

### VALIDATION SUMMARY

At the end, provide a summary:

---
