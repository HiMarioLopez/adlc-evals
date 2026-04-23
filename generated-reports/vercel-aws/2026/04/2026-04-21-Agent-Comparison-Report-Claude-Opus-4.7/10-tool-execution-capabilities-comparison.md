## 10. Tool Execution Capabilities Comparison

### 10.1 Available Tool Types

| Tool Type | Vercel | AWS |
|-----------|--------|-----|
| Code execution | Sandbox SDK (Firecracker) | Code Interpreter (containerized) |
| Lightweight shell | bash-tool (`just-bash`, zero overhead) | N/A |
| Browser automation | Anthropic `computer_20250124` + Kernel (Marketplace) | AgentCore Browser Tool |
| File operations | `textEditor_20250124` + Sandbox filesystem | Code Interpreter file ops |
| Web search | `webSearch_20250305` (Anthropic-native) | Third-party tools |
| Skills (agent-level) | `experimental_createSkillTool` | Strands `AgentAsTool` + Skills plugin (v1.30.0) |
| **Coding agent skills** 🆕 | AI Gateway coding agent integrations (9 agents) + `mcp.vercel.com` (12+ clients) + `ai-sdk.dev/llms.txt` | **AgentCore Coding Agent Skills** — Kiro Power GA (Apr 22); Claude Code / Codex / Cursor plugins ~Apr 29 |
| **Persistent filesystem** 🆕 | Sandbox Persistent Sandboxes (beta Mar 26, iad1-only) + Workflow durable execution | AgentCore Runtime persistent filesystem (preview Mar 25, 1 GB/session, 14-day retention, 14 regions) |
| Knowledge base / RAG | Marketplace Vector Stores (Supabase pgvector, Upstash, Pinecone, MongoDB Atlas) | **Amazon Bedrock Knowledge Bases (GA)** — native AgentCore integration |

### 10.2 Runtime & Language Support

| Aspect | Vercel Sandbox | AWS Code Interpreter |
|--------|----------------|----------------------|
| Supported languages | Node.js 24, Python 3.13 | Python, JavaScript, TypeScript |
| Isolation | Firecracker microVM | Containerized sandbox |
| Pre-installed | Common Node + Python packages | Python scientific stack + common libraries |
| File size limits | Via filesystem (local); 32 GB NVMe Enterprise | 5 GB via S3 upload |
| Internet access | Configurable per sandbox | Configurable per invocation |

### 10.3 Execution Limits

| Limit | Vercel Sandbox | AWS Code Interpreter |
|-------|----------------|----------------------|
| Default timeout | 5 min (Hobby) | Session-level (8hr max) |
| Max timeout | 5 hours (Pro/Enterprise) | 8 hours |
| Memory per vCPU | 2 GB | Configurable |
| Max vCPUs | 8 (Pro), **32 (Enterprise, Apr 8)** | Configurable |
| Concurrent instances | 10 (Hobby), 2,000 (Pro/Enterprise) | Regional limits |

### 10.4 Pricing Model

| Component | Vercel Sandbox | AWS Code Interpreter |
|-----------|----------------|----------------------|
| CPU (hourly) | $0.128/hr | $0.0895/hr |
| Memory (GB-hour) | $0.0212/GB-hr | $0.00945/GB-hr |
| Per-invocation | $0.60/1M creations | Included |
| Network | $0.15/GB | Standard AWS rates |
| Storage | $0.08/GB-month | S3 rates |

### 10.5 bash-tool vs Code Interpreter

| Aspect | Vercel `bash-tool` | AWS Code Interpreter |
|--------|-------------------|----------------------|
| Execution model | Pure TypeScript (`just-bash`) | Real Python/JS runtime |
| Shell access | Simulated (no binaries) | Full shell access |
| Use case | Token-efficient context retrieval | Full data analysis, file processing |
| Overhead | Near-zero (in-memory) | Container cold start |
| Security | No arbitrary code execution | Sandboxed but full capabilities |
| Best for | `find`, `grep`, `jq` over preloaded files | Complex computations, visualizations |
| Skills support | **Yes, via `experimental_createSkillTool`** (Jan 21, 2026) | Via Strands Skills plugin (v1.30.0) — distinct from the new AgentCore coding agent skills (Kiro Power GA Apr 22, 2026) |

---

