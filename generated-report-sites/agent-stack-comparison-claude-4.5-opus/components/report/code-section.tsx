"use client"

import { useState } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { cn } from "@/lib/utils"

// Custom theme based on oneDark but with transparent background
const customTheme = {
  ...oneDark,
  'pre[class*="language-"]': {
    ...oneDark['pre[class*="language-"]'],
    background: "transparent",
    margin: 0,
    padding: 0,
  },
  'code[class*="language-"]': {
    ...oneDark['code[class*="language-"]'],
    background: "transparent",
  },
}

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

await sandbox.close();`,
    bashTool: `import { createBashTool } from "bash-tool";

// In-memory filesystem (no VM overhead)
const { tools } = await createBashTool({
  files: { "src/index.ts": "export const hello = 'world';" },
});

// Or with Vercel Sandbox for full VM isolation
import { Sandbox } from "@vercel/sandbox";
const sandbox = await Sandbox.create();
const { tools: sandboxTools } = await createBashTool({ sandbox });

const agent = new ToolLoopAgent({ model, tools });`,
    computerUse: `import { anthropic } from '@ai-sdk/anthropic';

const bashTool = anthropic.tools.bash_20250124({
  execute: async ({ command }) => execSync(command).toString()
});

const computerTool = anthropic.tools.computer_20250124({
  displayWidthPx: 1920,
  displayHeightPx: 1080,
  execute: async ({ action, coordinate, text }) => { /* ... */ }
});

const textEditorTool = anthropic.tools.textEditor_20250124({
  execute: async ({ command, path, content }) => { /* ... */ }
});`,
    workflow: `export async function processOrder(orderId: string) {
  "use workflow";  // Magic directive

  const order = await validateOrder(orderId);
  const payment = await processPayment(order);
  const fulfillment = await shipOrder(order);
  
  return fulfillment;
}`
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
agent = Agent()               # Agent framework layer

@app.entrypoint
def invoke(payload):
    result = agent(payload.get("prompt"))
    return {"result": result.message}

if __name__ == "__main__":
    app.run()`,
    memory: `# AgentCore Memory - Short-term & Long-term

# Short-term: within-session context
create_event(session_id, event_data)
get_event(session_id, event_id)
list_events(session_id)
delete_event(session_id, event_id)

# Long-term: cross-session learning
# Strategies define extraction, organized by actor/session
# Built-in: $0.75/1K records/month
# Built-in Override: $0.25/1K records/month
# Self-Managed: $0.25/1K + inference`,
    policy: `permit(
  principal is AgentCore::OAuthUser,
  action == AgentCore::Action::"RefundTool__process_refund",
  resource == AgentCore::Gateway::"arn:aws:..."
)
when {
  principal.hasTag("username") &&
  principal.getTag("username") == "John" &&
  context.input.amount < 500
};`
  }
}

type VercelTab = "agent" | "sandbox" | "bashTool" | "computerUse" | "workflow"
type AwsTab = "agent" | "infrastructure" | "memory" | "policy"

// Map tabs to languages for syntax highlighting
const vercelLanguages: Record<VercelTab, string> = {
  agent: "typescript",
  sandbox: "typescript",
  bashTool: "typescript",
  computerUse: "typescript",
  workflow: "typescript",
}

const awsLanguages: Record<AwsTab, string> = {
  agent: "python",
  infrastructure: "python",
  memory: "python",
  policy: "hcl", // Cedar is similar to HCL syntax
}

export function CodeSection() {
  const [activeVercelTab, setActiveVercelTab] = useState<VercelTab>("agent")
  const [activeAwsTab, setActiveAwsTab] = useState<AwsTab>("agent")

  return (
    <section id="code" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Code Examples</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Side-by-side comparison of agent implementation patterns
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Vercel Code */}
          <div className="rounded-xl bg-card border border-border overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-secondary/30">
              <div className="w-8 h-8 rounded bg-foreground flex items-center justify-center">
                <svg className="w-5 h-5 text-background" viewBox="0 0 76 65" fill="currentColor">
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                </svg>
              </div>
              <span className="font-semibold">Vercel Stack</span>
              <span className="ml-auto text-xs font-mono text-muted-foreground">TypeScript</span>
            </div>
            <div className="flex border-b border-border overflow-x-auto">
              {(["agent", "sandbox", "bashTool", "computerUse", "workflow"] as const).map((tab) => (
                <button
                  type="button"
                  key={tab}
                  onClick={() => setActiveVercelTab(tab)}
                  className={cn(
                    "px-3 py-2 text-sm whitespace-nowrap transition-colors",
                    activeVercelTab === tab
                      ? "bg-background text-foreground border-b-2 border-[hsl(var(--accent))]"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab === "agent" ? "ToolLoopAgent" : 
                   tab === "sandbox" ? "Sandbox" : 
                   tab === "bashTool" ? "bash-tool" :
                   tab === "computerUse" ? "Computer Use" :
                   "Workflow"}
                </button>
              ))}
            </div>
            <div className="overflow-x-auto">
              <SyntaxHighlighter
                language={vercelLanguages[activeVercelTab]}
                style={customTheme}
                customStyle={{
                  margin: 0,
                  padding: "1rem",
                  background: "transparent",
                  fontSize: "0.8125rem",
                  lineHeight: 1.7,
                }}
                codeTagProps={{
                  style: {
                    fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace",
                  }
                }}
              >
                {codeExamples.vercel[activeVercelTab]}
              </SyntaxHighlighter>
            </div>
          </div>

          {/* AWS Code */}
          <div className="rounded-xl bg-card border border-border overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-[hsl(var(--aws))/0.05]">
              <div className="w-8 h-8 rounded bg-[hsl(var(--aws))] flex items-center justify-center">
                <span className="text-background font-bold text-sm">A</span>
              </div>
              <span className="font-semibold">AWS Stack</span>
              <span className="ml-auto text-xs font-mono text-muted-foreground">Python / Cedar</span>
            </div>
            <div className="flex border-b border-border overflow-x-auto">
              {(["agent", "infrastructure", "memory", "policy"] as const).map((tab) => (
                <button
                  type="button"
                  key={tab}
                  onClick={() => setActiveAwsTab(tab)}
                  className={cn(
                    "px-3 py-2 text-sm whitespace-nowrap transition-colors",
                    activeAwsTab === tab
                      ? "bg-background text-foreground border-b-2 border-[hsl(var(--aws))]"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab === "agent" ? "Strands Agent" : 
                   tab === "infrastructure" ? "AgentCoreApp" : 
                   tab === "memory" ? "Memory" :
                   "Cedar Policy"}
                </button>
              ))}
            </div>
            <div className="overflow-x-auto">
              <SyntaxHighlighter
                language={awsLanguages[activeAwsTab]}
                style={customTheme}
                customStyle={{
                  margin: 0,
                  padding: "1rem",
                  background: "transparent",
                  fontSize: "0.8125rem",
                  lineHeight: 1.7,
                }}
                codeTagProps={{
                  style: {
                    fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace",
                  }
                }}
              >
                {codeExamples.aws[activeAwsTab]}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>

        {/* Pattern Comparison */}
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-card border border-border">
            <h4 className="font-semibold mb-2">Agent Abstraction</h4>
            <p className="text-sm text-muted-foreground">
              Vercel: <code className="text-xs bg-secondary px-1 rounded">ToolLoopAgent</code> class<br />
              AWS: <code className="text-xs bg-secondary px-1 rounded">Agent</code> from Strands SDK
            </p>
          </div>
          <div className="p-5 rounded-xl bg-card border border-border">
            <h4 className="font-semibold mb-2">Loop Control</h4>
            <p className="text-sm text-muted-foreground">
              Vercel: <code className="text-xs bg-secondary px-1 rounded">stopWhen: stepCountIs(N)</code><br />
              AWS: Policy-driven via Cedar
            </p>
          </div>
          <div className="p-5 rounded-xl bg-card border border-border">
            <h4 className="font-semibold mb-2">Infrastructure Wrapper</h4>
            <p className="text-sm text-muted-foreground">
              Vercel: Platform handles deployment<br />
              AWS: <code className="text-xs bg-secondary px-1 rounded">@app.entrypoint</code> decorator
            </p>
          </div>
        </div>

        {/* bash-tool vs Code Interpreter */}
        <div className="mt-8 p-6 rounded-xl bg-[hsl(var(--accent))/0.08] border border-[hsl(var(--accent))/0.2]">
          <h4 className="font-semibold text-[hsl(var(--accent))] mb-4">bash-tool vs Code Interpreter Analysis</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium mb-2 flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-foreground" />
                Vercel <code className="text-xs bg-secondary px-1 rounded">bash-tool</code>
              </h5>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Pure TypeScript interpreter (<code className="text-xs">just-bash</code>)</li>
                <li>• Simulated shell (no binary execution)</li>
                <li>• Near-zero overhead (in-memory)</li>
                <li>• Best for: <code className="text-xs">find</code>, <code className="text-xs">grep</code>, <code className="text-xs">jq</code> over preloaded files</li>
                <li>• Token-efficient context retrieval</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-2 flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[hsl(var(--aws))]" />
                AWS Code Interpreter
              </h5>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Real Python/JS runtime</li>
                <li>• Full shell access</li>
                <li>• Container cold start overhead</li>
                <li>• Best for: Complex computations, visualizations</li>
                <li>• Full data analysis, file processing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
