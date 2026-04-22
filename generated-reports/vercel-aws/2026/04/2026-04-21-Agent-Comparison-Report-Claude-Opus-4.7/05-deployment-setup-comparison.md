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

### 5.3 Side-by-Side

| Label | Vercel | AWS |
|-------|--------|-----|
| **Time to First Deploy** | 3 min | 60+ min |
| **Config Files Required** | 0–1 | 5+ |
| **IAM Policies to Configure** | 0 | 3–10+ |

---

