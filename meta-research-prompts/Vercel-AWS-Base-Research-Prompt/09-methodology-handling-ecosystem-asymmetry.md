## METHODOLOGY: HANDLING ECOSYSTEM ASYMMETRY

The comparison involves **full agent stacks** targeting different ecosystems:

| Aspect | Vercel Agent Stack | AWS Stack (Bedrock + AgentCore) |
|--------|--------------------|---------------------------------|
| **Model Layer** | AI Gateway (unified API, BYOK) | Amazon Bedrock (foundation models) |
| **Primary Language** | TypeScript | Python (TypeScript SDK in preview) |
| **Target Ecosystem** | Fullstack + Backend (Next.js, FastAPI, Flask, Express) | Backend/ML (Python, boto3, Node.js) |
| **Framework Integration** | React hooks, RSC, Svelte, Vue + Python backends (FastAPI, Flask) | Strands, LangGraph, CrewAI |
| **Code Execution** | Sandbox SDK (TS + Python) | Code Interpreter (Python) |
| **Durability** | Workflow SDK (`"use workflow"`) | Runtime (8hr microVM) |
| **Memory** | External (bring your own) | AgentCore Memory (managed) |

**Sources:**

- [Vercel Backends](https://vercel.com/docs/frameworks/backend) — FastAPI, Flask, Express support
- [Strands TypeScript SDK](https://strandsagents.com/latest/documentation/docs/user-guide/quickstart/typescript/) — Experimental, not feature-complete with Python SDK

**Recommendation for Fair Comparison:**

1. **Feature Parity:** Map equivalent capabilities across stacks:
   - AI Gateway ↔ Amazon Bedrock (model access)
   - `ToolLoopAgent` ↔ AgentCore Runtime decorator
   - Sandbox SDK ↔ AgentCore Code Interpreter
   - Workflow SDK ↔ AgentCore Runtime long-running
   - Computer Use tools ↔ AgentCore Browser
2. **Infra Comparison:** Focus on runtime characteristics, not language syntax
3. **TypeScript on AWS:** Reference Strands Agents TypeScript (preview) for TS-based AWS agent work
4. **DX Comparison:** Acknowledge that Vercel optimizes for frontend DX, AWS for infrastructure control
5. **TCO Analysis:** Include all stack components (Sandbox pricing, Workflow pricing, etc.)

---

