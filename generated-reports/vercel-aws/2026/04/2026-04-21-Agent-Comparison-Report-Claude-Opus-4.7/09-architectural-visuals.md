## 9. Architectural Visuals

### 9.1 Vercel Agent Lifecycle (AI SDK 6.x)

```mermaid
sequenceDiagram
    participant U as User
    participant F as Vercel Function
    participant A as ToolLoopAgent
    participant G as AI Gateway
    participant M as Model (Sonnet 4.6)
    participant T as Tool
    U->>F: HTTP Request
    F->>A: agent.generate({ prompt })
    A->>G: chat completion (anthropic/claude-sonnet-4.6)
    G->>M: provider list price, 0% markup
    M-->>G: tool_use response
    G-->>A: streamed chunks
    A->>T: execute tool with (input, { abortSignal, context })
    T-->>A: tool result
    A->>G: continue conversation
    G->>M: final inference
    M-->>G: text response
    G-->>A: streamed text
    A-->>F: { text, steps }
    F-->>U: streamed response
```

### 9.2 AWS Agent Lifecycle (Strands + AgentCore)

```mermaid
sequenceDiagram
    participant U as User
    participant R as AgentCore Runtime
    participant P as Policy (Cedar GA)
    participant A as Strands Agent
    participant B as Bedrock (Sonnet 4.6)
    participant G as AgentCore Gateway
    participant T as Tool (via MCP / Lambda)
    U->>R: InvokeAgentRuntime
    R->>P: evaluate entry policy
    P-->>R: ENFORCE / MONITOR
    R->>A: invoke(payload)
    A->>B: converse (service_tier=standard)
    B-->>A: tool_use
    A->>G: InvokeTool (MCP)
    G->>P: evaluate tool policy
    P-->>G: permit
    G->>T: execute
    T-->>G: result
    G-->>A: tool result
    A->>B: continue
    B-->>A: final text
    A-->>R: response
    R-->>U: streamed response
```

### 9.3 Vercel Infrastructure

```mermaid
graph TD
    Edge[Edge Network<br/>300s max, 126 PoPs]
    Serverless[Serverless + Fluid Compute<br/>800s max, Active CPU billing, 20 regions]
    Sandbox[Sandbox microVMs<br/>5hr max, 8/32 vCPU, iad1 only<br/>GA Jan 30, 2026]
    Workflow[Workflow SDK<br/>E2E encrypted, 2x faster, event-sourced<br/>GA Apr 16, 2026]
    Queues[Vercel Queues GA<br/>durable append-only topic log]
    AIGateway[AI Gateway<br/>0% markup, team-wide ZDR]
    SecureCompute[Secure Compute<br/>Dedicated IPs, VPC peering<br/>Self-serve Jan 7, 2026]

    Edge --> Serverless
    Serverless --> Sandbox
    Serverless --> Workflow
    Workflow --> Queues
    Workflow --> Sandbox
    Serverless --> AIGateway
    Sandbox --> AIGateway
    Serverless --> SecureCompute
    SecureCompute -.VPC Peering.-> ExternalAWS[External AWS VPCs]
```

### 9.4 AWS Infrastructure

```mermaid
graph TD
    AR[AWS Agent Registry<br/>Preview Apr 9, 2026]
    Runtime[AgentCore Runtime<br/>8hr microVM, 14 regions<br/>AG-UI + A2A + MCP support]
    Memory[AgentCore Memory<br/>Built-in LTM, 15 regions<br/>Kinesis streaming]
    Gateway[AgentCore Gateway<br/>MCP Server, Lambda tools, 14 regions]
    Policy[Policy<br/>Cedar, 13 regions<br/>GA Mar 3, 2026]
    Identity[Identity<br/>OAuth, 14 regions]
    Evals[Evaluations<br/>13 built-in, 9 regions<br/>GA Mar 31, 2026]
    Tools[Built-in Tools<br/>Browser, Code Interpreter]
    KB[Bedrock Knowledge Bases<br/>GA · GraphRAG · BDA · NL→SQL]
    Bedrock[Amazon Bedrock<br/>Priority/Standard/Flex tiers]
    StepFn[Step Functions + AgentCore<br/>SDK integration GA Mar 26, 2026]
    CloudWatch[Observability<br/>CloudWatch + spans]

    AR --> Runtime
    Runtime --> Bedrock
    Runtime --> Gateway
    Runtime --> Memory
    Runtime --> Tools
    Runtime --> KB
    Runtime --> Policy
    Runtime --> Identity
    Runtime --> CloudWatch
    Evals --> Runtime
    StepFn --> Runtime
    Gateway -.MCP / Lambda-as-tool.-> External[External Tools]
```

### 9.5 Tool Execution Flow (Side-by-Side)

#### Vercel

```mermaid
sequenceDiagram
    participant A as ToolLoopAgent
    participant B as bash-tool (just-bash, in-memory)
    participant S as Sandbox SDK (Firecracker)
    A->>B: bash/readFile/writeFile (fast path)
    B-->>A: result (no VM overhead)
    A->>S: runCommand (isolated path)
    S->>S: Firecracker microVM boot
    S-->>A: stdout/stderr
```

#### AWS

```mermaid
sequenceDiagram
    participant A as Strands Agent
    participant G as AgentCore Gateway
    participant P as Policy (Cedar GA)
    participant CI as Code Interpreter
    participant Br as Browser Tool
    A->>G: InvokeTool request
    G->>P: evaluate policy
    P-->>G: permit / deny
    G->>CI: execute (containerized)
    CI-->>G: result
    G->>Br: execute (cloud browser + extensions)
    Br-->>G: result + S3 profile (billed)
    G-->>A: aggregated result
```

### 9.6 Combined Stack Comparison

```
Vercel Stack                          ↔    AWS Stack
────────────────────────────────────────────────────────────────────────
AI SDK 6.x (ToolLoopAgent)            ↔    Strands SDK (Agent)
`WorkflowAgent` (v7 beta)             ↔    BedrockAgentCoreApp (@app.entrypoint)
AI Gateway (0% markup)                ↔    Amazon Bedrock (Priority/Standard/Flex)
Fluid Compute                         ↔    AgentCore Runtime
(800s max, 20 regions)                     (8hr max, 14 regions)
Sandbox SDK (GA, iad1 only)           ↔    Code Interpreter (14 regions)
Workflow SDK (GA, state iad1)         ↔    AgentCore Runtime Sessions (14 regions)
Vercel Queues (GA)                    ↔    Step Functions + AgentCore (GA Mar 26)
Computer Use tools + Kernel           ↔    AgentCore Browser Tool
mcp-handler + @ai-sdk/mcp client      ↔    AgentCore Gateway (MCP Server)
DurableAgent + Marketplace storage    ↔    AgentCore Memory (15 regions)
Team Roles + SCIM + Access Groups     ↔    IAM + AgentCore Managed Policies
Marketplace Auth (Clerk/Auth0/WorkOS) ↔    AgentCore Identity ($0.010/1K req)
Marketplace Vector Stores (BYO)       ↔    Amazon Bedrock Knowledge Bases (GA)
Model-native safety (BYO middleware)  ↔    Amazon Bedrock Guardrails (GA)
AI Gateway team-wide ZDR              ↔    VPC + IAM + Cedar
External evaluation (Braintrust)      ↔    AgentCore Evaluations (GA, 9 regions)
N/A                                   ↔    AWS Agent Registry (preview, 5 regions)
MCP only                              ↔    MCP + A2A + AG-UI
Chat SDK (Slack/Discord/Teams)        ↔    Reference architectures (per-platform)
```

---

