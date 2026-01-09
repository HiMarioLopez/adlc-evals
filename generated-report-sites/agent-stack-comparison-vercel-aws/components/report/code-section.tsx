"use client";

import { Code2 } from "lucide-react";
import { useState } from "react";
import { LightCodeBlock } from "@/components/ui/code-block";
import { cn } from "@/lib/utils";

const codeExamples = {
  vercel: {
    agent: `import { ToolLoopAgent, stepCountIs } from 'ai';
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
    sandbox: `import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create({ 
  runtime: 'node22' 
});

const result = await sandbox.runCommand('node', [
  '-e', 
  'console.log("hello")'
]);

console.log(result.stdout);
await sandbox.close();`,
    workflow: `export async function processOrder(orderId: string) {
  "use workflow";  // Magic directive

  const order = await validateOrder(orderId);
  const payment = await processPayment(order);
  const fulfillment = await shipOrder(order);
  
  return fulfillment;
}`,
    bashTool: `import { createBashTool } from "bash-tool";
import { Sandbox } from "@vercel/sandbox";

// In-memory filesystem (no VM overhead)
const { tools } = await createBashTool({
  files: { "src/index.ts": "export const hello = 'world';" },
});

// Or with Sandbox for full VM isolation
const sandbox = await Sandbox.create();
const { tools: vmTools } = await createBashTool({ sandbox });`,
  },
  aws: {
    agent: `from strands import Agent
from strands_tools import calculator

# Create an agent with tools
agent = Agent(tools=[calculator])

# Invoke the agent
result = agent("What is the square root of 1764?")
print(result.message)`,
    infrastructure: `from bedrock_agentcore import BedrockAgentCoreApp
from strands import Agent

app = BedrockAgentCoreApp()  # Infrastructure layer
agent = Agent()               # Agent framework

@app.entrypoint
def invoke(payload):
    result = agent(payload.get("prompt"))
    return {"result": result.message}

if __name__ == "__main__":
    app.run()`,
    policy: `permit(
  principal is AgentCore::OAuthUser,
  action == AgentCore::Action::"RefundTool__process_refund",
  resource == AgentCore::Gateway::"arn:aws:bedrock-agentcore:..."
)
when {
  principal.hasTag("username") &&
  principal.getTag("username") == "John" &&
  context.input.amount < 500
};`,
    memory: `# Bedrock AgentCore Memory - Built-in strategies

# Short-term: within-session context
create_event(session_id, event_data)
get_event(session_id, event_id)
list_events(session_id)

# Long-term: cross-session learning
# Built-in: $0.75/1K records/month
# Built-in Override: $0.25/1K records/month
# Self-Managed: $0.25/1K + inference`,
  },
};

type VercelTab = keyof typeof codeExamples.vercel;
type AwsTab = keyof typeof codeExamples.aws;

const vercelTabs: { key: VercelTab; label: string }[] = [
  { key: "agent", label: "ToolLoopAgent" },
  { key: "sandbox", label: "Sandbox" },
  { key: "workflow", label: "Workflow" },
  { key: "bashTool", label: "bash-tool" },
];

const awsTabs: { key: AwsTab; label: string }[] = [
  { key: "agent", label: "Strands Agent" },
  { key: "infrastructure", label: "Bedrock AgentCoreApp" },
  { key: "policy", label: "Cedar Policy" },
  { key: "memory", label: "Memory" },
];

export function CodeSection() {
  const [activeVercelTab, setActiveVercelTab] = useState<VercelTab>("agent");
  const [activeAwsTab, setActiveAwsTab] = useState<AwsTab>("agent");

  return (
    <section className="px-6 py-24" id="code">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16">
          <span className="mb-4 inline-flex items-center gap-2 font-mono text-primary text-xs uppercase tracking-widest">
            <Code2 className="h-4 w-4" />
            Section 3
          </span>
          <h2 className="mb-4 font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl">
            Code Examples
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Side-by-side comparison of agent implementation patterns
          </p>
        </div>

        {/* Code panels */}
        <div className="mb-12 grid gap-6 lg:grid-cols-2">
          {/* Vercel */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="flex items-center gap-3 border-border border-b bg-muted/30 px-5 py-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
                <svg
                  className="h-5 w-5 text-background"
                  fill="currentColor"
                  viewBox="0 0 76 65"
                >
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                </svg>
              </div>
              <span className="font-semibold">Vercel Stack</span>
              <span className="ml-auto font-mono text-muted-foreground text-xs">
                TypeScript
              </span>
            </div>
            <div className="flex overflow-x-auto border-border border-b">
              {vercelTabs.map((tab) => (
                <button
                  className={cn(
                    "whitespace-nowrap border-b-2 px-4 py-2.5 text-sm transition-all",
                    activeVercelTab === tab.key
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                  key={tab.key}
                  onClick={() => setActiveVercelTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <LightCodeBlock
              code={codeExamples.vercel[activeVercelTab]}
              language="typescript"
            />
          </div>

          {/* AWS */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="flex items-center gap-3 border-border border-b bg-aws/5 px-5 py-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-aws">
                <span className="font-bold text-sm text-white">A</span>
              </div>
              <span className="font-semibold">AWS Stack</span>
              <span className="ml-auto font-mono text-muted-foreground text-xs">
                Python / Cedar
              </span>
            </div>
            <div className="flex overflow-x-auto border-border border-b">
              {awsTabs.map((tab) => (
                <button
                  className={cn(
                    "whitespace-nowrap border-b-2 px-4 py-2.5 text-sm transition-all",
                    activeAwsTab === tab.key
                      ? "border-aws bg-aws/5 text-aws"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                  key={tab.key}
                  onClick={() => setActiveAwsTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <LightCodeBlock
              code={codeExamples.aws[activeAwsTab]}
              language={activeAwsTab === "policy" ? "hcl" : "python"}
            />
          </div>
        </div>

        {/* Pattern comparison */}
        <div className="mb-12 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h4 className="mb-3 font-semibold">Agent Abstraction</h4>
            <div className="space-y-2 text-muted-foreground text-sm">
              <p>
                <span className="text-foreground">Vercel:</span>{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                  ToolLoopAgent
                </code>{" "}
                class
              </p>
              <p>
                <span className="text-foreground">AWS:</span>{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                  Agent
                </code>{" "}
                from Strands
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h4 className="mb-3 font-semibold">Loop Control</h4>
            <div className="space-y-2 text-muted-foreground text-sm">
              <p>
                <span className="text-foreground">Vercel:</span>{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                  stopWhen: stepCountIs(N)
                </code>
              </p>
              <p>
                <span className="text-foreground">AWS:</span> Policy-driven via
                Cedar
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h4 className="mb-3 font-semibold">Infrastructure Wrapper</h4>
            <div className="space-y-2 text-muted-foreground text-sm">
              <p>
                <span className="text-foreground">Vercel:</span> Platform
                handles deployment
              </p>
              <p>
                <span className="text-foreground">AWS:</span>{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                  @app.entrypoint
                </code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
