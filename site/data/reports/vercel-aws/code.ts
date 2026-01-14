import type { CodeData } from "@/data/report-schema";

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
        code: `import { ToolLoopAgent, stepCountIs } from 'ai';
import { weatherTool } from '@/tools/weather';

export const weatherAgent = new ToolLoopAgent({
  model: 'anthropic/claude-sonnet-4.5',
  instructions: 'You are a helpful weather assistant.',
  tools: {
    weather: weatherTool,
  },
  stopWhen: stepCountIs(20), // Max 20 steps
});

const result = await weatherAgent.generate({
  prompt: 'What is the weather in San Francisco?',
});`,
      },
      {
        key: "sandbox",
        label: "Sandbox",
        language: "typescript",
        code: `import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create({ 
  runtime: 'node22' 
});

const result = await sandbox.runCommand('node', [
  '-e', 
  'console.log("hello")'
]);

console.log(result.stdout);
await sandbox.close();`,
      },
      {
        key: "workflow",
        label: "Workflow",
        language: "typescript",
        code: `export async function processOrder(orderId: string) {
  "use workflow";  // Magic directive

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
        code: `import { createBashTool } from "bash-tool";
import { Sandbox } from "@vercel/sandbox";

// In-memory filesystem (no VM overhead)
const { tools } = await createBashTool({
  files: { "src/index.ts": "export const hello = 'world';" },
});

// Or with Sandbox for full VM isolation
const sandbox = await Sandbox.create();
const { tools: vmTools } = await createBashTool({ sandbox });`,
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
        code: `from strands import Agent
from strands_tools import calculator

# Create an agent with tools
agent = Agent(tools=[calculator])

# Invoke the agent
result = agent("What is the square root of 1764?")
print(result.message)`,
      },
      {
        key: "infrastructure",
        label: "Bedrock AgentCoreApp",
        language: "python",
        code: `from bedrock_agentcore import BedrockAgentCoreApp
from strands import Agent

app = BedrockAgentCoreApp()  # Infrastructure layer
agent = Agent()               # Agent framework

@app.entrypoint
def invoke(payload):
    result = agent(payload.get("prompt"))
    return {"result": result.message}

if __name__ == "__main__":
    app.run()`,
      },
      {
        key: "policy",
        label: "Cedar Policy",
        language: "hcl",
        code: `permit(
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
        code: `# Bedrock AgentCore Memory - Built-in strategies

# Short-term: within-session context
create_event(session_id, event_data)
get_event(session_id, event_id)
list_events(session_id)

# Long-term: cross-session learning
# Built-in: $0.75/1K records/month
# Built-in Override: $0.25/1K records/month
# Self-Managed: $0.25/1K + inference`,
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
        label: "stopWhen: stepCountIs(N)",
        code: "stopWhen: stepCountIs(N)",
      },
      aws: { label: "Policy-driven via Cedar" },
    },
    {
      title: "Infrastructure Wrapper",
      vercel: { label: "Platform handles deployment" },
      aws: { label: "@app.entrypoint", code: "@app.entrypoint" },
    },
  ],
};
