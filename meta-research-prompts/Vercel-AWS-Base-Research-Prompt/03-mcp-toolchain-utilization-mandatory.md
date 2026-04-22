## MCP TOOLCHAIN UTILIZATION (MANDATORY)

To ensure "Hard Facts Only," you MUST use these tools:

1. **GitHub MCP:**
   - **Agent Frameworks:**
     - Analyze `vercel/ai` (AI SDK 6.x, TypeScript — current stable `ai@6.0.168`+; v7 beta at `7.0.0-beta.111`+) for `ToolLoopAgent`, tools, streaming, `WorkflowAgent`.
     - Analyze `strands-agents/sdk-python` (Strands SDK Python — current `v1.36.0`+) for `Agent`, `Swarm`, `Graph`, `AgentAsTool`, Plugin system, `BedrockModel(service_tier=...)`.
     - Analyze `strands-agents/sdk-typescript` (current `v1.0.0-rc.4`+, **still RC, not GA as of April 2026**).
   - **Infrastructure SDKs:**
     - Analyze Vercel Sandbox SDK (`@vercel/sandbox`) — **GA since Jan 30, 2026** — for code execution, filesystem snapshots (Jan 22, 2026), persistent sandboxes (beta Mar 26), Enterprise 32 vCPU / 64 GB configs (Apr 8).
     - Analyze Vercel Workflow SDK — **GA since Apr 16, 2026** — for durable workflow support, E2E encryption (Mar 17), custom class serialization (Apr 2), Python SDK beta.
     - Verify `aws/bedrock-agentcore-sdk-python` — current `v1.6.3`+ — for `EvaluationClient`, `ResourcePolicyClient`, `serve_a2a()`, `serve_ag_ui()`, `AgentCoreMemorySessionManager(read_only=...)`.
   - Note: `bedrock-agentcore-sdk-python` is the deployment wrapper; agent logic uses Strands SDK.
2. **AWS Documentation MCP:**
   - Fetch the GA SLAs for AgentCore (Policy GA Mar 3; Evaluations GA Mar 31).
   - Extract current **Claude 4.5/4.6/4.7 Opus/Sonnet and Haiku 4.5** pricing via Bedrock.
   - Fetch **Bedrock service tiers** (Priority / Standard / Flex / Reserved) and their multipliers.
   - Fetch the current AgentCore regional matrix (expanded since Jan 8 — see section 2b).
3. **Vercel MCP:**
   - Query current **AI Gateway** model catalog and confirm **0% markup** on all providers.
   - Query **Fast Data Transfer (FDT)** regional pricing (the "AI Units v2026" term in the Jan 8 report does NOT exist as a public SKU — use FDT and AI Gateway Credits terminology instead).
   - Fetch current Sandbox / Workflow / Fluid Compute pricing.
4. **Context7:**
   - Cross-reference the current canonical `ToolLoopAgent` and Strands `Agent` examples on the latest tags.
   - Look up the latest `BedrockAgentCoreApp` and protocol adapter patterns (`serve_a2a`, `serve_ag_ui`).

