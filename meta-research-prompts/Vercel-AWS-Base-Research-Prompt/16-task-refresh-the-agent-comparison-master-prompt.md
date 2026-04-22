## TASK: Refresh the Agent Comparison Master Prompt

You are updating the master research prompt at `Base-Research-Prompt.md`. Your goal is to validate all existing citations and update any stale information.

### REQUIRED MCP TOOLCHAINS

Use these MCP servers for authoritative data (DO NOT use general knowledge):

1. **GitHub MCP** — Fetch latest release tags and repository metadata
2. **AWS Documentation MCP** — Latest AgentCore, Bedrock pricing, and features
3. **Vercel MCP** — Latest AI SDK, Sandbox, Workflow, AI Gateway docs
4. **Context7 MCP** — Cross-reference documentation and code samples

### REFRESH CHECKLIST

#### 1. Version Updates
Run these GitHub MCP queries to get current versions:

- [ ] `vercel/ai` — Check latest release tag (current: `ai@6.0.168` stable / `7.0.0-beta.111` beta)
- [ ] `aws/bedrock-agentcore-sdk-python` — Check latest tag (current: `v1.6.3`)
- [ ] `strands-agents/sdk-python` — Check latest release (current: `v1.36.0`)
- [ ] `strands-agents/sdk-typescript` — Check latest release (current: `v1.0.0-rc.4`, still RC)

#### 2. Pricing Validation
Query AWS Documentation MCP for current rates:

- [ ] AgentCore Runtime (per vCPU-hour / per GB-hour)
- [ ] AgentCore Memory (per 1K events / per 1K records/month)
- [ ] AgentCore Gateway (per 1K invocations)
- [ ] AgentCore Code Interpreter (per vCPU-hour / per GB-hour)
- [ ] AgentCore Browser Tool — including S3 profile storage billing (started Apr 15, 2026)
- [ ] AgentCore Evaluations (per 1K input/output tokens + custom evaluator rate)
- [ ] Bedrock Claude 4.5/4.6/4.7 Sonnet/Opus rates
- [ ] Bedrock service tier multipliers (Priority/Standard/Flex/Reserved)

Query Vercel MCP / docs for:

- [ ] AI Gateway markup (confirm 0% on all providers)
- [ ] Sandbox SDK pricing tiers (Hobby / Pro / Enterprise)
- [ ] Workflow SDK pricing (steps + storage)
- [ ] Fluid Compute regional rates (iad1, sfo1, fra1, gru1 baseline)
- [ ] Secure Compute pricing (still $6.5K/year + $0.15/GB?)

#### 3. Feature Parity Check
Search for new announcements:

- [ ] Vercel Changelog: Any new agent-related features since last update?
- [ ] AWS What's New: Any AgentCore updates since last update?
- [ ] New MCP server support on either platform?

#### 3b. Blessed Path Validation
Confirm the recommended approach hasn't changed:

- [ ] Vercel: Is `ToolLoopAgent` still the recommended agent abstraction? Check AI SDK docs.
- [ ] AWS: Is Strands SDK + AgentCore still the recommended pattern? Check AgentCore getting-started guide.
- [ ] Has either platform deprecated or renamed key APIs?
- [ ] Are there new "Getting Started" tutorials that suggest a different approach?

#### 3c. Regional Availability Check
Use AWS Documentation MCP to verify regional availability:

- [ ] Check [AgentCore Supported Regions](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agentcore-regions.html) for updates
- [ ] Has AgentCore Runtime expanded past 14 regions (baseline as of Apr 21, 2026)?
- [ ] Has AgentCore Evaluations expanded past 9 regions (baseline as of Apr 21, 2026)?
- [ ] Has AgentCore Policy expanded past 13 regions (baseline as of Apr 21, 2026)?
- [ ] Has AWS Agent Registry expanded past 5 preview regions?
- [ ] Any new AgentCore features with limited regional availability?
- [ ] Update the Regional Availability Matrix in section 2b if changed
- [ ] Has Vercel Sandbox expanded past `iad1`?
- [ ] Has Vercel Workflow backend expanded past `iad1` (execution is already global; state/queue is iad1-only)?

#### 4. Documentation Link Validation
Verify all URLs in "CROSS-REFERENCE LINKS" section are still valid:

- [ ] Spot-check 5 random links from each platform
- [ ] Update any 404s or redirected URLs

### OUTPUT FORMAT

After validation, update the following sections in `Base-Research-Prompt.md`:

1. **VALIDATED CITATIONS & REFERENCE DATA** — Update any changed values
2. **GitHub Repositories** — Update version tags
3. **APPENDIX A: PROMPT CHANGELOG** — Add new row with today's date and changes

Example changelog entry:
| 1.7.0 | YYYY-MM-DD | Updated SDK versions; refreshed pricing tables; added [new feature] |

### VALIDATION SUMMARY

At the end, provide a summary:

---
