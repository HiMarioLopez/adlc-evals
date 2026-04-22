## METHODOLOGY: "BLESSED PATH" COMPARISON

> 🎯 **Core Principle:** On both platforms, you can build agents a billion different ways. This assessment focuses on the **recommended, out-of-the-box experience** — the "golden path" each company promotes for developer experience.

### What We're Comparing

| Criteria | Definition |
|----------|------------|
| **Officially Recommended** | The approach featured in getting-started guides, quickstarts, and official tutorials |
| **Tools Included** | SDKs, libraries, and infrastructure bundled or promoted by the platform |
| **Developer Experience First** | Minimal boilerplate, sensible defaults, batteries-included |
| **Not Custom/DIY** | Avoid comparing hand-rolled solutions or third-party alternatives unless officially endorsed |

### Blessed Path per Platform

| Platform | Agent Framework | Infrastructure | Model Access | Source of Truth |
|----------|-----------------|----------------|--------------|-----------------|
| **Vercel** | AI SDK 6.x (`ToolLoopAgent`) + `WorkflowAgent` for durable runs | Vercel Platform (Fluid Compute, Sandbox GA, Workflow GA, Chat SDK) | AI Gateway (0% markup, team-wide ZDR GA) | [Vercel AI SDK Docs](https://sdk.vercel.ai), [Vercel Changelog](https://vercel.com/changelog), [Workflow Pricing](https://vercel.com/docs/workflows/pricing) |
| **AWS** | Strands Agents SDK (`Agent`, `Swarm`, `Graph`, `AgentAsTool`, Plugin system) | BedrockAgentCoreApp (Runtime, Memory, Gateway, Identity, Policy GA, Evaluations GA, Registry preview) | Amazon Bedrock (Standard / Priority / Flex tiers) | [AgentCore Dev Guide](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/), [Strands SDK](https://github.com/strands-agents/sdk-python), [AgentCore Pricing](https://aws.amazon.com/bedrock/agentcore/pricing/) |

### What to Exclude

- ❌ Raw `boto3` or `@aws-sdk` calls (unless no higher-level abstraction exists)
- ❌ Third-party orchestration frameworks (LangChain, LlamaIndex) unless officially integrated
- ❌ Custom infrastructure setups (self-hosted Kubernetes, EC2 deployments)
- ❌ Legacy APIs or deprecated approaches

### Validation Questions

When documenting a capability, ask:

1. **Is this the official recommendation?** Check quickstart guides and "Getting Started" docs.
2. **Is there a simpler way?** If a 10-line solution exists, don't document the 100-line alternative.
3. **Would the DevRel team demo this?** If it's not demo-worthy, it's probably not the blessed path.

