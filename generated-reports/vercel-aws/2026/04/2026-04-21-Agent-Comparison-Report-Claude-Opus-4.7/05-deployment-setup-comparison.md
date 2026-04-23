## 5. Deployment Setup Comparison

The infrastructure story is where these stacks diverge most dramatically.

### 5.1 Vercel Setup (~3 min)

```bash
# 1. Install Vercel CLI — one global package, no other dependencies
npm i -g vercel

# 2. Link & deploy — connect repo and deploy in one command
vercel

# 3. Push updates — auto-deploys on every push, preview URLs for PRs
git push origin main
```

> **Framework-defined Infrastructure™** — your code structure determines the infrastructure. No CloudFormation, no Terraform, no IAM policies to configure.

### 5.2 AWS Setup (60+ min)

```bash
# 1. Install AWS CLI & CDK
brew install awscli && npm i -g aws-cdk

# 2. Configure IAM credentials
aws configure --profile agent-deploy

# 3. Bootstrap CDK in account
cdk bootstrap aws://ACCOUNT_ID/REGION
```

**4. Configure IAM Permissions** — your deployment role needs:
- `iam:CreateServiceLinkedRole`
- `bedrock:*`
- `ecr:CreateRepository`, `ecr:PutImage`
- `s3:CreateBucket`, `s3:PutObject`
- `lambda:CreateFunction`
- `logs:CreateLogGroup`
- … and 20+ more actions

**5. Write CDK Stack** — define your infrastructure in TypeScript (~100+ lines):

```typescript
import * as agentcore from '@aws-cdk/aws-bedrock-agentcore-alpha';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as iam from 'aws-cdk-lib/aws-iam';

export class AgentStack extends cdk.Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // ECR repository for agent container
    const repo = new ecr.Repository(this, 'AgentRepo');

    // Agent runtime from Docker image
    const artifact = agentcore.AgentRuntimeArtifact
      .fromEcrRepository(repo, 'latest');

    const runtime = new agentcore.Runtime(this, 'Runtime', {
      runtimeName: 'my-agent',
      agentRuntimeArtifact: artifact,
    });

    // Grant model access (Sonnet 4.6 — current default)
    runtime.grantInvokeModel(
      BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_4_6
    );

    // Add memory, gateway, code interpreter,
    // policy (GA), evaluations (GA), registry (preview)...
  }
}
```

+ Dockerfile, `buildspec.yml`, `cdk.json`, `tsconfig.json`, …

```bash
# 6. Build & push container
docker build --platform linux/arm64 -t agent .

# 7. Deploy stack
cdk deploy --all --require-approval never
```

> **Enterprise-grade Control** — full control over VPCs, IAM, encryption, and networking. Required for regulated industries and complex integrations.

### 5.2b AWS Setup with AgentCore CLI + Managed Harness (Preview Apr 22, 2026)

The April 22, 2026 announcement introduced a preview alternative path that targets the "time-to-first-agent" gap. The CLI still compiles to **CDK under the hood**, so the GA production story remains §5.2 above — but for the **4 preview regions** (us-east-1, us-west-2, ap-southeast-2, eu-central-1), the harness path is substantially faster.

```bash
# 1. Install AgentCore CLI (npm @aws/agentcore)
npm install -g @aws/agentcore@preview    # v1.0.0-preview.1 (stable: v0.9.1)

# 2. Create a project (scaffolds agentcore.json + agentcore/cdk/ + app/<AgentName>/)
agentcore create --framework strands

# 3. Dev → Deploy → Invoke
agentcore dev
agentcore deploy
agentcore invoke --prompt "What is the weather in Seattle?"
```

Or go direct to the harness API without the CLI — **3 API calls**, no orchestration code:

```bash
# 1. Create harness (declare model + tools + instructions)
aws bedrock-agentcore-control create-harness \
  --harness-name "MyHarness" \
  --execution-role-arn "arn:aws:iam::123456789012:role/MyHarnessRole" \
  --default-model-id "anthropic.claude-sonnet-4-6-20250101-v1:0" \
  --system-prompt "You are a helpful assistant." \
  --tools file://tools.json

# 2. Poll until READY
aws bedrock-agentcore-control get-harness --harness-arn "$ARN"

# 3. Invoke (model/tools/prompt overridable per invocation)
aws bedrock-agentcore invoke-harness \
  --harness-arn "$ARN" \
  --runtime-session-id "sess-42" \
  --messages '[{"role":"user","content":"..."}]'
```

**What the harness delivers:**
- Declarative config replaces `BedrockAgentCoreApp` + `@app.entrypoint` boilerplate
- Powered by Strands Agents `v1.37.0` (open-source, released same day as announcement)
- Swap providers **mid-session** (Bedrock / OpenAI / Gemini) via `runtimeSessionId` without losing context
- Session state + filesystem persisted by default via `filesystemConfigurations` (preview, 1 GB/session, 14-day idle retention)
- Export to Strands code when custom orchestration is needed
- No additional charge for the harness, CLI, or coding agent skills — pay only for consumed AgentCore resources

**What the harness does *not* change:**
- Production GA deploys still use the §5.2 CDK path for the 10 non-preview AgentCore regions
- IAM role + `bedrock-agentcore` permissions are still required (the CLI provisions them via its managed CDK stack)
- Terraform IaC support is "coming soon" — only CDK is GA today

Sources: [Announcement (Apr 22, 2026)](https://aws.amazon.com/blogs/machine-learning/get-to-your-first-working-agent-in-minutes-announcing-new-features-in-amazon-bedrock-agentcore/) · [Harness docs](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/harness.html) · [CLI docs](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agentcore-get-started-cli.html) · [What's New](https://aws.amazon.com/about-aws/whats-new/2026/04/agentcore-new-features-to-build-agents-faster/) · [aws/agentcore-cli GitHub](https://github.com/aws/agentcore-cli)

### 5.3 Side-by-Side

| Label | Vercel | AWS (CDK path, GA) | AWS (Harness + CLI path, Preview, 4 regions) |
|-------|--------|--------------------|-----------------------------------------------|
| **Time to First Deploy** | 3 min | 60+ min | minutes (per [announcement](https://aws.amazon.com/blogs/machine-learning/get-to-your-first-working-agent-in-minutes-announcing-new-features-in-amazon-bedrock-agentcore/); not independently timed) |
| **Config Files Required** | 0–1 | 5+ | 1 (`agentcore.json`) + auto-managed `agentcore/cdk/` |
| **IAM Policies to Configure** | 0 | 3–10+ | 1 execution role (CLI provisions supporting CDK stack) |
| **Orchestration Code** | AI SDK `ToolLoopAgent` class | `BedrockAgentCoreApp` + `@app.entrypoint` + CDK stack | **None** — declarative harness config |
| **Regions Available** | 20 compute | 14 Runtime | 4 (us-east-1, us-west-2, ap-southeast-2, eu-central-1) |

> ℹ️ **Caveat on the harness path:** Preview-only, 4 regions, still compiles to CDK underneath. For production workloads in 10 of the 14 AgentCore Runtime regions, the CDK path in §5.2 remains the blessed approach today.

---

