## MCP TOOLCHAIN UTILIZATION (MANDATORY)

To ensure "Hard Facts Only," you MUST use these tools:

1. **GitHub MCP:**
   - **Agent Frameworks:**
     - Analyze `vercel/ai` (AI SDK 6.x, TypeScript — current stable `ai@6.0.168`+; v7 beta at `7.0.0-beta.111`+) for `ToolLoopAgent`, tools, streaming, `WorkflowAgent`.
     - Analyze `microsoft/agent-framework` (current `1.0.1` Python, `Microsoft.Agents.AI 1.1.0` .NET — both GA since Apr 3, 2026) for `Agent`, `SequentialBuilder`, `HandoffOrchestration`, `GraphFlow`, `ConcurrentBuilder`.
     - Analyze `microsoft/semantic-kernel` (current `dotnet-1.74.0` / `python-1.41.2`) as the **superseded** framework — cover what changed and the migration path.
     - Analyze `microsoft/autogen` (current `python-v0.7.5`) as the **superseded** orchestration framework — cover AutoGen 0.4's Core/AgentChat/Extensions architecture and how it was folded into Agent Framework.
   - **Infrastructure SDKs:**
     - Analyze Vercel Sandbox SDK (`@vercel/sandbox`) — **GA since Jan 30, 2026** — for code execution, filesystem snapshots (Jan 22, 2026), persistent sandboxes (beta Mar 26), Enterprise 32 vCPU / 64 GB configs (Apr 8).
     - Analyze Vercel Workflow SDK — **GA since Apr 16, 2026** — for durable workflow support, E2E encryption (Mar 17), custom class serialization (Apr 2), Python SDK beta.
     - Verify `Azure/azure-sdk-for-python` `azure-ai-agents` (current `azure-ai-agentserver-responses_1.0.0b4`, `azure-ai-projects_2.1.0`) for `AIProjectClient`, `create_agent`, `FunctionTool`, `McpTool`, `AzureAIAgentThread`, `runs.stream()`.
     - Verify `microsoft-foundry/foundry-samples` for the canonical Hosted Agents pattern (`from_agent_framework()` + `agent.yaml` + Dockerfile).
   - Note: `azure-ai-agents`/`azure-ai-projects` are the deployment/infrastructure wrappers; agent logic uses **Microsoft Agent Framework 1.0**.
2. **Azure / Microsoft Documentation MCP (via `aws-knowledge_aws___read_documentation` with `learn.microsoft.com` URLs, or direct fetch):**
   - Fetch the GA announcements for Foundry Agent Service (Mar 16, 2026), Agent Framework 1.0 (Apr 3, 2026), Foundry Evaluations/Tracing (Mar 16, 2026).
   - Extract current **Azure OpenAI model pricing** via `azure.microsoft.com/en-us/pricing/details/azure-openai/` — confirm GPT-4.1 ($2/$8), GPT-5 ($1.25/$10), o4-mini ($1.10/$4.40), o3 ($2/$8), GPT-5.3 Codex ($1.75/$14), Priority Processing (+75% premium).
   - Fetch **Foundry Agent Service pricing** (`azure.microsoft.com/en-us/pricing/details/foundry-agent-service/`) — agent orchestration $0, Code Interpreter $0.03/session, File Search $0.10/GB/day.
   - Fetch **Azure Container Apps dynamic sessions pricing** (`azure.microsoft.com/en-us/pricing/details/container-apps/`) — $0.03/session-hour.
   - Fetch **Foundry regional availability** (`learn.microsoft.com/en-us/azure/foundry/reference/region-support`, `…/agents/concepts/limits-quotas-regions`, `…/agents/concepts/model-region-support`) — 24 Agent Service regions.
3. **Vercel MCP:**
   - Query current **AI Gateway** model catalog and confirm **0% markup** on all providers.
   - Query **Fast Data Transfer (FDT)** regional pricing.
   - Fetch current Sandbox / Workflow / Fluid Compute pricing.
4. **Context7:**
   - Cross-reference the current canonical `ToolLoopAgent` example.
   - Look up the latest `agent-framework` `Agent` examples (Python `1.0.1`+, .NET `1.1.0`+).
   - Confirm `azure-ai-agents` tool dispatch pattern (`SubmitToolOutputsAction`, `SubmitToolApprovalAction`).

