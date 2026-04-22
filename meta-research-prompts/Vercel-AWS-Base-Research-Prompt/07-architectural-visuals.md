## ARCHITECTURAL VISUALS

Generate **parallel diagrams for both platforms** to enable direct visual comparison:

### 1. Agent Lifecycle Sequence Diagrams (Both Platforms)

| Platform | Diagram Focus |
|----------|---------------|
| **Vercel** | `sequenceDiagram`: User → AI SDK `ToolLoopAgent` → AI Gateway → Model → Tool Execution → Response |
| **AWS** | `sequenceDiagram`: User → Strands `Agent` → Bedrock → AgentCore Runtime → Tool Execution → Response |

**Purpose:** Show how a single agent request flows through each stack, highlighting where orchestration, model calls, and tool execution occur.

### 2. Infrastructure Architecture Diagrams (Both Platforms)

| Platform | Diagram Focus |
|----------|---------------|
| **Vercel** | `graph TD`: Vercel Platform (Edge → Fluid Compute → Sandbox microVM → Workflow persistence) + **Secure Compute boundary** (dedicated IPs, VPC peering) |
| **AWS** | `graph TD`: AgentCore (API Gateway → Runtime microVM → Memory/Gateway/Policy services) + **VPC boundary** (IAM, Cedar policies) |

**Purpose:** Show the infrastructure layers and security boundaries for deployed agents.

**Security Boundary Comparison:**

| Aspect | Vercel Secure Compute | AWS VPC + AgentCore |
|--------|----------------------|---------------------|
| **Network Isolation** | Dedicated IP addresses per network | VPC with private subnets |
| **Peering** | VPC peering to AWS VPCs (max 50 connections) | Native VPC peering, PrivateLink |
| **Failover** | Active/Passive network failover across regions | Multi-AZ, cross-region replication |
| **Policy Layer** | Environment variables, middleware | IAM + Cedar (AgentCore Policy) |
| **Pricing** | Enterprise: $6.5K/year + $0.15/GB data transfer | VPC: Free; NAT Gateway + PrivateLink fees (expand below) |

<details>
<summary><strong>📊 AWS Network Connectivity Cost Breakdown</strong></summary>

| AWS Component | Hourly Cost | Data Processing | Annual Cost (24/7, 1 AZ) |
|---------------|-------------|-----------------|--------------------------|
| **NAT Gateway** | $0.045/hour | $0.045/GB | ~$394/year + data |
| **NAT Gateway (Regional, 3 AZ)** | $0.135/hour (3×$0.045) | $0.045/GB | ~$1,183/year + data |
| **PrivateLink Interface Endpoint** | $0.01/hour per ENI | $0.01/GB (first 1 PB) | ~$88/year per AZ + data |
| **PrivateLink (3 AZ HA)** | $0.03/hour | $0.01/GB | ~$263/year + data |
| **Cross-region data transfer** | — | $0.02/GB | Variable |

**Sources:**

- [AWS VPC Pricing](https://aws.amazon.com/vpc/pricing/) — NAT Gateway: $0.045/hour + $0.045/GB
- [AWS PrivateLink Pricing](https://aws.amazon.com/privatelink/pricing/) — Interface Endpoint: $0.01/hour + $0.01/GB

</details>

<details>
<summary><strong>💰 Cost Comparison Examples (Vercel vs AWS)</strong></summary>

**Example 1: 100 GB/month outbound**

| Scenario | Vercel Secure Compute | AWS (NAT Gateway + PrivateLink, 3 AZ) |
|----------|----------------------|---------------------------------------|
| **Annual base cost** | $6,500 | ~$1,446 (NAT: $1,183 + PrivateLink: $263) |
| **Data (100 GB × 12 mo)** | $180 ($0.15/GB) | $66 ($0.045 NAT + $0.01 PL = $0.055/GB) |
| **Total annual** | **$6,680** | **~$1,512** |

**Example 2: 1 TB/month outbound**

| Scenario | Vercel Secure Compute | AWS (NAT Gateway + PrivateLink, 3 AZ) |
|----------|----------------------|---------------------------------------|
| **Annual base cost** | $6,500 | ~$1,446 |
| **Data (1 TB × 12 mo)** | $1,800 ($0.15/GB) | $660 ($0.055/GB) |
| **Total annual** | **$8,300** | **~$2,106** |

> ⚠️ **Trade-off:** AWS is 3-4× cheaper but requires VPC configuration, IAM policies, and operational overhead. Vercel Secure Compute is a managed solution with simpler setup.

**Source:** [Vercel Secure Compute](https://vercel.com/docs/connectivity/secure-compute) — Enterprise: $6.5K/year + $0.15/GB

</details>

### 3. Tool Execution Flow (Side-by-Side)

| Platform | Diagram Focus |
|----------|---------------|
| **Vercel** | `sequenceDiagram`: Agent → `bash-tool` (in-memory) OR Agent → Sandbox SDK (microVM isolation) |
| **AWS** | `sequenceDiagram`: Agent → AgentCore Gateway → Code Interpreter/Browser Tool (containerized sandbox) |

**Purpose:** Compare how each platform handles secure code execution and tool invocation.

**Generate a detailed Tool Execution Capabilities Comparison (collapsible `<details>` section) covering:**

1. **Available Tool Types Table:** Map equivalent tools across platforms:
   - Code execution (Sandbox SDK ↔ Code Interpreter)
   - Lightweight shell (`bash-tool` ↔ N/A)
   - Browser automation (Anthropic Computer Use ↔ Browser Tool)
   - File operations (textEditor tool ↔ Code Interpreter file ops)

2. **Runtime & Language Support Table:** Compare:
   - Supported languages (Node.js, Python, TypeScript, etc.)
   - Isolation mechanism (microVM vs containerized sandbox)
   - Pre-installed libraries vs runtime install
   - File size limits (inline upload, S3 integration)
   - Internet/network access configurability

3. **Execution Limits Table:** Document hard limits:
   - Default and max timeout durations
   - Memory allocation (per vCPU, total)
   - Concurrent instance limits by plan tier

4. **Pricing Model Table:** Compare per-component costs:
   - CPU/compute hourly rates
   - Memory (GB-hour) rates
   - Per-invocation/creation fees
   - Network egress costs

5. **`bash-tool` vs Code Interpreter Analysis:** Highlight the key differentiator:
   - Execution model (pure TS interpreter vs real runtime)
   - Shell access (simulated vs full terminal)
   - Use cases (lightweight context retrieval vs full data analysis)
   - Overhead (near-zero vs container cold start)

### Optional: Combined Comparison Diagram

A single `graph LR` showing both stacks side-by-side with equivalent components aligned:

```
Vercel Stack          ↔          AWS Stack
─────────────────────────────────────────────
AI SDK 6.x            ↔    Strands SDK
AI Gateway            ↔    Amazon Bedrock
Fluid Compute         ↔    AgentCore Runtime
Sandbox SDK           ↔    Code Interpreter
Workflow SDK          ↔    Runtime (8hr max)
```

