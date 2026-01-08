"use client"

import { useState } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Code2, Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"

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
}

type VercelTab = keyof typeof codeExamples.vercel
type AwsTab = keyof typeof codeExamples.aws

const vercelTabs: { key: VercelTab; label: string }[] = [
  { key: "agent", label: "ToolLoopAgent" },
  { key: "sandbox", label: "Sandbox" },
  { key: "workflow", label: "Workflow" },
  { key: "bashTool", label: "bash-tool" },
]

const awsTabs: { key: AwsTab; label: string }[] = [
  { key: "agent", label: "Strands Agent" },
  { key: "infrastructure", label: "Bedrock AgentCoreApp" },
  { key: "policy", label: "Cedar Policy" },
  { key: "memory", label: "Memory" },
]

function CodeBlock({ 
  code, 
  language 
}: { 
  code: string
  language: string 
}) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      <button
        onClick={copyToClipboard}
        className="absolute top-3 right-3 p-2 rounded-lg bg-muted/80 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="w-4 h-4 text-primary" />
        ) : (
          <Copy className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={customTheme}
          customStyle={{
            margin: 0,
            padding: "1.25rem",
            background: "transparent",
            fontSize: "0.8125rem",
            lineHeight: 1.7,
          }}
          codeTagProps={{
            style: {
              fontFamily: "var(--font-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
            }
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

export function CodeSection() {
  const [activeVercelTab, setActiveVercelTab] = useState<VercelTab>("agent")
  const [activeAwsTab, setActiveAwsTab] = useState<AwsTab>("agent")

  return (
    <section id="code" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary mb-4">
            <Code2 className="w-4 h-4" />
            Section 3
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Code Examples
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Side-by-side comparison of agent implementation patterns
          </p>
        </div>

        {/* Code panels */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {/* Vercel */}
          <div className="rounded-2xl bg-card border border-border overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-muted/30">
              <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
                <svg className="w-5 h-5 text-background" viewBox="0 0 76 65" fill="currentColor">
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                </svg>
              </div>
              <span className="font-semibold">Vercel Stack</span>
              <span className="ml-auto text-xs font-mono text-muted-foreground">TypeScript</span>
            </div>
            <div className="flex border-b border-border overflow-x-auto">
              {vercelTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveVercelTab(tab.key)}
                  className={cn(
                    "px-4 py-2.5 text-sm whitespace-nowrap transition-all border-b-2",
                    activeVercelTab === tab.key
                      ? "border-primary text-primary bg-primary/5"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <CodeBlock 
              code={codeExamples.vercel[activeVercelTab]} 
              language="typescript" 
            />
          </div>

          {/* AWS */}
          <div className="rounded-2xl bg-card border border-border overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-aws/5">
              <div className="w-8 h-8 rounded-lg bg-aws flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-semibold">AWS Stack</span>
              <span className="ml-auto text-xs font-mono text-muted-foreground">Python / Cedar</span>
            </div>
            <div className="flex border-b border-border overflow-x-auto">
              {awsTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveAwsTab(tab.key)}
                  className={cn(
                    "px-4 py-2.5 text-sm whitespace-nowrap transition-all border-b-2",
                    activeAwsTab === tab.key
                      ? "border-aws text-aws bg-aws/5"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <CodeBlock 
              code={codeExamples.aws[activeAwsTab]} 
              language={activeAwsTab === 'policy' ? 'hcl' : 'python'} 
            />
          </div>
        </div>

        {/* Pattern comparison */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <div className="p-6 rounded-2xl bg-card border border-border">
            <h4 className="font-semibold mb-3">Agent Abstraction</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <span className="text-foreground">Vercel:</span>{" "}
                <code className="text-xs bg-muted px-1.5 py-0.5 rounded">ToolLoopAgent</code> class
              </p>
              <p>
                <span className="text-foreground">AWS:</span>{" "}
                <code className="text-xs bg-muted px-1.5 py-0.5 rounded">Agent</code> from Strands
              </p>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-card border border-border">
            <h4 className="font-semibold mb-3">Loop Control</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <span className="text-foreground">Vercel:</span>{" "}
                <code className="text-xs bg-muted px-1.5 py-0.5 rounded">stopWhen: stepCountIs(N)</code>
              </p>
              <p>
                <span className="text-foreground">AWS:</span>{" "}
                Policy-driven via Cedar
              </p>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-card border border-border">
            <h4 className="font-semibold mb-3">Infrastructure Wrapper</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <span className="text-foreground">Vercel:</span>{" "}
                Platform handles deployment
              </p>
              <p>
                <span className="text-foreground">AWS:</span>{" "}
                <code className="text-xs bg-muted px-1.5 py-0.5 rounded">@app.entrypoint</code>
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
