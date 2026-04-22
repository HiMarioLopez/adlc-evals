## ARCHITECTURAL VISUALS

Generate **parallel diagrams for both platforms** to enable direct visual comparison:

### 1. Agent Lifecycle Sequence Diagrams (Both Platforms)

| Platform | Diagram Focus |
|----------|---------------|
| **Vercel** | `sequenceDiagram`: User → AI SDK `ToolLoopAgent` → AI Gateway → Model → Tool Execution → Response |
| **Azure** | `sequenceDiagram`: User → `AIProjectClient.create_agent` → Thread → Run (`create_and_process` OR manual poll loop) → Tool dispatch (`SubmitToolOutputsAction` → `ToolOutput`) → Response via `MessageDeltaChunk` stream |

**Purpose:** Show how a single agent request flows through each stack, highlighting where orchestration, model calls, and tool execution occur. Emphasize the difference between Vercel's client-driven loop vs. Azure's server-driven run lifecycle.

### 2. Infrastructure Architecture Diagrams (Both Platforms)

| Platform | Diagram Focus |
|----------|---------------|
| **Vercel** | `graph TD`: Vercel Platform (Edge → Fluid Compute → Sandbox microVM → Workflow persistence) + **Secure Compute boundary** (dedicated IPs, VPC peering) |
| **Azure** | `graph TD`: Foundry Agent Service (API Gateway → Agent runtime → tools: Code Interpreter / File Search / Browser / MCP) + **BYO VNet boundary** (private endpoints, Managed Identity, Entra Agent ID) |

**Purpose:** Show the infrastructure layers and security boundaries for deployed agents.

**Security Boundary Comparison:**

| Aspect | Vercel Secure Compute | Azure BYO VNet + Foundry |
|--------|----------------------|--------------------------|
| **Network Isolation** | Dedicated IP addresses per network | VNet with private endpoints + Private Link |
| **Peering** | VPC peering to AWS VPCs (max 50 connections) | VNet peering (any region), ExpressRoute, Azure Virtual WAN |
| **Failover** | Active/Passive network failover across regions | Availability Zones + cross-region DR (Azure Front Door / Traffic Manager) |
| **Policy Layer** | Environment variables, middleware | **Microsoft Entra ID** + **Azure RBAC** + **Entra Agent ID** (preview) + **Foundry Guardrails** (preview) |
| **Pricing** | Enterprise: $6.5K/year + $0.15/GB data transfer | VNet: Free; Private Link: $0.01/hr per endpoint + $0.01/GB; ExpressRoute: varies by tier |

### 3. Tool Execution Flow (Side-by-Side)

| Platform | Diagram Focus |
|----------|---------------|
| **Vercel** | `sequenceDiagram`: Agent → `bash-tool` (in-memory) OR Agent → Sandbox SDK (microVM isolation) |
| **Azure** | `sequenceDiagram`: Agent → Foundry Agent Service runtime → `Code Interpreter` OR `File Search` OR `McpTool` (external MCP server) OR `FunctionTool` (user callback via `SubmitToolOutputsAction` dispatch loop) |

**Purpose:** Compare how each platform handles secure code execution and tool invocation.

**Generate a detailed Tool Execution Capabilities Comparison (collapsible `<details>` section) covering:**

1. **Available Tool Types Table:**
   - Code execution (Sandbox SDK ↔ Foundry Code Interpreter / ACA Dynamic Sessions)
   - Lightweight shell (`bash-tool` ↔ N/A — Azure has no in-process shell interpreter; ACA Dynamic Sessions closest but container-based)
   - Browser automation (Anthropic Computer Use ↔ Azure Browser Automation tool / Computer Use tool)
   - File operations (textEditor tool ↔ Foundry File Search)
   - External tools (@ai-sdk/mcp ↔ `McpTool` + Foundry MCP Server)

2. **Runtime & Language Support Table:**
   - Supported languages (Vercel: Node.js + Python; Azure Code Interpreter: Python + Node.js + Shell via ACA Dynamic Sessions)
   - Isolation mechanism (Firecracker microVM vs Hyper-V container)
   - Pre-installed libraries vs runtime install
   - File size limits (inline upload, Azure Storage integration)
   - Internet/network access configurability

3. **Execution Limits Table:**
   - Default and max timeout durations (Vercel Sandbox: plan-dependent; Azure Code Interpreter: 1-hour session; ACA Dynamic Sessions: 220s max per code run)
   - Memory allocation (per vCPU, total)
   - Concurrent instance limits by plan tier

4. **Pricing Model Table:**
   - CPU/compute hourly rates (Sandbox SDK $0.128/CPU-hr vs ACA $0.000024/vCPU-s ≈ $0.086/vCPU-hr)
   - Memory (GB-hour) rates
   - Per-invocation/creation fees (Sandbox $0.60/1M creations vs ACA ~$0.03/session-hour)
   - Network egress costs

5. **`bash-tool` vs Foundry Code Interpreter Analysis:** Highlight the key differentiator:
   - Execution model (pure TS interpreter vs real Python runtime)
   - Shell access (simulated via `just-bash` vs full Python/Node interpreter)
   - Use cases (lightweight context retrieval vs full data analysis)
   - Overhead (near-zero vs container warm-start ~subsecond)

### Optional: Combined Comparison Diagram

A single `graph LR` showing both stacks side-by-side with equivalent components aligned:

```
Vercel Stack                ↔           Azure Stack
────────────────────────────────────────────────────────
AI SDK 6.x                  ↔    Microsoft Agent Framework 1.0
AI Gateway                  ↔    Azure OpenAI + Foundry Models
Fluid Compute               ↔    Foundry Agent Service Runtime
Sandbox SDK                 ↔    Code Interpreter / ACA Dynamic Sessions
Workflow SDK                ↔    Multi-agent Workflows (preview)
@ai-sdk/mcp                 ↔    McpTool + Foundry MCP Server
AI SDK telemetry            ↔    Foundry Tracing GA + Azure Monitor
External evals              ↔    Foundry Evaluations GA
```

