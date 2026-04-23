import type { CodeData } from "@/data/report-schema.ts";

export const codeData: CodeData = {
  sectionNumber: 3,
  title: "Code Examples",
  description: "Side-by-side comparison of agent implementation patterns",
  vercel: {
    label: "Vercel Stack",
    language: "TypeScript",
    examples: [
      {
        key: "agent",
        label: "ToolLoopAgent",
        language: "typescript",
        code: `import { ToolLoopAgent, tool, isStepCount } from 'ai';
import { z } from 'zod';

// Define a tool with v6 API (inputSchema, not parameters)
const weatherTool = tool({
  description: 'Get the weather in a location',
  inputSchema: z.object({
    location: z.string().describe('City name'),
  }),
  execute: async ({ location }) => ({
    location,
    temperature: 72,
  }),
});

// AI Gateway string shorthand — 0% markup
export const weatherAgent = new ToolLoopAgent({
  model: 'anthropic/claude-sonnet-4.6',
  instructions: 'You are a helpful weather assistant.',
  tools: { weather: weatherTool },
  stopWhen: isStepCount(20),
});

const result = await weatherAgent.generate({
  prompt: 'What is the weather in San Francisco?',
});`,
      },
      {
        key: "sandbox",
        label: "Sandbox (GA)",
        language: "typescript",
        code: `import { Sandbox } from '@vercel/sandbox';

// Sandbox GA as of Jan 30, 2026.
// Enterprise: up to 32 vCPUs / 64 GB RAM.
const sandbox = await Sandbox.create({
  runtime: 'node22',
});

const result = await sandbox.runCommand('node', [
  '-e',
  'console.log("hello")',
]);

console.log(result.stdout);
await sandbox.close();`,
      },
      {
        key: "workflow",
        label: "Workflow (GA)",
        language: "typescript",
        code: `// Workflow GA as of Apr 16, 2026.
// E2E encrypted by default (AES-256-GCM, per-run HKDF keys).
// 2x faster than beta. Event-sourced architecture.
export async function processOrder(orderId: string) {
  "use workflow";

  const order = await validateOrder(orderId);
  const payment = await processPayment(order);
  const fulfillment = await shipOrder(order);

  return fulfillment;
}`,
      },
      {
        key: "bashTool",
        label: "bash-tool",
        language: "typescript",
        code: `import { createBashTool, experimental_createSkillTool } from "bash-tool";
import { Sandbox } from "@vercel/sandbox";

// In-memory filesystem (zero VM overhead)
const { tools } = await createBashTool({
  files: { "src/index.ts": "export const hello = 'world';" },
});

// With Vercel Sandbox for full VM isolation
const sandbox = await Sandbox.create();
const { tools: vmTools } = await createBashTool({ sandbox });

// Skills support (Jan 21, 2026)
const { tools: skillsTools } = await experimental_createSkillTool({
  skillsDirectory: "./skills",
});`,
      },
    ],
  },
  aws: {
    label: "AWS Stack",
    language: "Python / Cedar",
    examples: [
      {
        key: "agent",
        label: "Strands Agent",
        language: "python",
        code: `from strands import Agent, tool
from strands.models import BedrockModel

@tool
def get_weather(city: str) -> str:
    """Get weather for a city."""
    return f"Weather in {city}: 72F, Sunny"

# BedrockModel with service tier (Strands v1.35.0, Apr 2026)
agent = Agent(
    model=BedrockModel(
        model_id="us.anthropic.claude-sonnet-4-6",
        service_tier="standard",  # priority | standard | flex
        streaming=True,
    ),
    tools=[get_weather],
    system_prompt="You are a helpful weather assistant.",
)

result = agent("What's the weather in Seattle?")
print(result.message)`,
      },
      {
        key: "infrastructure",
        label: "Bedrock AgentCoreApp",
        language: "python",
        code: `from bedrock_agentcore.runtime import BedrockAgentCoreApp
from strands import Agent
from strands.models import BedrockModel

app = BedrockAgentCoreApp()  # Infrastructure layer
agent = Agent(model=BedrockModel(model_id="us.anthropic.claude-sonnet-4-6"))

@app.entrypoint
def invoke(payload):
    result = agent(payload.get("prompt"))
    return {"result": str(result.message)}

# New protocol adapters (v1.4.7+):
# from bedrock_agentcore.runtime import serve_a2a, serve_ag_ui

if __name__ == "__main__":
    app.run()`,
      },
      {
        key: "harness",
        label: "Managed Harness (Preview)",
        language: "bash",
        code: `# AgentCore Managed Harness — preview, Apr 22, 2026
# 4 regions: us-east-1, us-west-2, ap-southeast-2, eu-central-1
# 3-call surface replaces @app.entrypoint boilerplate — declarative, no orchestration code.

# 1. Create harness (declare model + tools + instructions)
aws bedrock-agentcore-control create-harness \\
  --harness-name "MyHarness" \\
  --execution-role-arn "arn:aws:iam::123456789012:role/MyHarnessRole" \\
  --default-model-id "anthropic.claude-sonnet-4-6-20250101-v1:0" \\
  --system-prompt "You are a helpful assistant." \\
  --tools file://tools.json

# 2. Poll until READY
aws bedrock-agentcore-control get-harness --harness-arn "$ARN"

# 3. Invoke (override model/tools/prompt at invocation time)
aws bedrock-agentcore invoke-harness \\
  --harness-arn "$ARN" \\
  --runtime-session-id "sess-42" \\
  --messages '[{"role":"user","content":"..."}]' \\
  --model-id "openai.gpt-5.4"    # swap providers mid-session

# Or via AgentCore CLI (preview):
# npm i -g @aws/agentcore@preview
# agentcore create --framework strands && agentcore deploy && agentcore invoke`,
      },
      {
        key: "policy",
        label: "Cedar Policy (GA)",
        language: "hcl",
        code: `// Policy in AgentCore GA as of Mar 3, 2026 (13 regions).
// Included in Runtime/Gateway pricing at GA.

permit(
  principal is AgentCore::OAuthUser,
  action == AgentCore::Action::"RefundTool__process_refund",
  resource == AgentCore::Gateway::"arn:aws:bedrock-agentcore:..."
)
when {
  principal.hasTag("username") &&
  principal.getTag("username") == "John" &&
  context.input.amount < 500
};`,
      },
      {
        key: "memory",
        label: "Memory",
        language: "python",
        code: `# Bedrock AgentCore Memory - Built-in strategies (15 regions)
# New since Jan 8: Kinesis streaming notifications + read_only flag (v1.6.1)

from bedrock_agentcore.memory.integrations.strands import (
    AgentCoreMemorySessionManager,
)

session_mgr = AgentCoreMemorySessionManager(
    memory_id="mem-abc123",
    actor_id="user-xyz",
    region_name="us-east-1",
    read_only=False,  # NEW v1.6.1
)

# Long-term strategies:
# Built-in:          $0.75/1K records/month
# Built-in Override: $0.25/1K records/month
# Self-Managed:      $0.25/1K + inference`,
      },
      {
        key: "evaluations",
        label: "Evaluations (GA)",
        language: "python",
        code: `# AgentCore Evaluations GA as of Mar 31, 2026 (9 regions).
# 13 built-in evaluators + custom Lambda evaluators.

from bedrock_agentcore.evaluation import EvaluationClient

client = EvaluationClient(region_name="us-west-2")

results = client.run(
    evaluator_ids=["accuracy", "toxicity"],
    session_id="sess-123",
    agent_id="my-agent",
)

for r in results:
    print(f"{r['evaluatorId']}: {r.get('value')}")`,
      },
    ],
  },
  patternComparisons: [
    {
      title: "Agent Abstraction",
      vercel: { label: "ToolLoopAgent", code: "ToolLoopAgent" },
      aws: { label: "Agent from Strands", code: "Agent" },
    },
    {
      title: "Loop Control",
      vercel: {
        label: "stopWhen: isStepCount(N)",
        code: "stopWhen: isStepCount(N)",
      },
      aws: { label: "Policy-driven via Cedar (GA)" },
    },
    {
      title: "Infrastructure Wrapper",
      vercel: { label: "Platform handles deployment" },
      aws: { label: "@app.entrypoint", code: "@app.entrypoint" },
    },
    {
      title: "Model Cost Tier",
      vercel: { label: "AI Gateway 0% markup" },
      aws: {
        label: "service_tier: priority / standard / flex",
        code: "service_tier='flex'",
      },
    },
  ],
};
