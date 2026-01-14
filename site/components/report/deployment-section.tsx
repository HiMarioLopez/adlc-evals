"use client";

import {
  Check,
  CheckCircle2,
  Clock,
  Cloud,
  Database,
  GitBranch,
  Layers,
  Rocket,
  Server,
  Shield,
  Terminal,
} from "lucide-react";

export function DeploymentSection() {
  return (
    <section className="px-6 py-24" id="deployment">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16">
          <span className="mb-4 inline-flex items-center gap-2 font-mono text-primary text-xs uppercase tracking-widest">
            <Rocket className="h-4 w-4" />
            Section 4
          </span>
          <h2 className="mb-4 font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl">
            Deployment Setup Comparison
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            The infrastructure story is where these stacks diverge most
            dramatically
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Vercel Infrastructure */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="flex items-center gap-3 border-border border-b bg-primary/5 px-5 py-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
                <svg
                  className="h-5 w-5 text-background"
                  fill="currentColor"
                  viewBox="0 0 76 65"
                >
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                </svg>
              </div>
              <span className="font-semibold">Vercel Setup</span>
              <span className="ml-auto rounded-full bg-primary/10 px-2 py-1 font-mono text-primary text-xs">
                ~3 min
              </span>
            </div>
            <div className="space-y-4 p-6">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-primary/10 font-bold text-primary text-sm">
                    1
                  </div>
                  <div className="mt-2 h-full w-0.5 bg-border" />
                </div>
                <div className="pb-6">
                  <div className="mb-2 flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-primary" />
                    <h4 className="font-medium">Install Vercel CLI</h4>
                  </div>
                  <p className="mb-3 text-muted-foreground text-sm">
                    One global package, no other dependencies
                  </p>
                  <code className="block rounded-lg bg-muted px-3 py-2 font-mono text-xs">
                    npm i -g vercel
                  </code>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-primary/10 font-bold text-primary text-sm">
                    2
                  </div>
                  <div className="mt-2 h-full w-0.5 bg-border" />
                </div>
                <div className="pb-6">
                  <div className="mb-2 flex items-center gap-2">
                    <GitBranch className="h-4 w-4 text-primary" />
                    <h4 className="font-medium">Link &amp; Deploy</h4>
                  </div>
                  <p className="mb-3 text-muted-foreground text-sm">
                    Connect repo and deploy in one command
                  </p>
                  <code className="block rounded-lg bg-muted px-3 py-2 font-mono text-xs">
                    vercel
                  </code>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-primary/10 font-bold text-primary text-sm">
                    3
                  </div>
                  <div className="mt-2 h-full w-0.5 bg-border" />
                </div>
                <div className="pb-6">
                  <div className="mb-2 flex items-center gap-2">
                    <Cloud className="h-4 w-4 text-primary" />
                    <h4 className="font-medium">Push Updates</h4>
                  </div>
                  <p className="mb-3 text-muted-foreground text-sm">
                    Auto-deploys on every push, preview URLs for PRs
                  </p>
                  <code className="block rounded-lg bg-muted px-3 py-2 font-mono text-xs">
                    git push origin main
                  </code>
                </div>
              </div>

              {/* Done */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-muted-foreground/30 bg-muted">
                    <Check className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                    <h4 className="font-medium text-muted-foreground">Done</h4>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Auto-provisioned: Functions, Edge, CDN, SSL, Preview Deploys
                  </p>
                </div>
              </div>

              {/* Summary */}
              <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
                <div className="mb-2 flex items-center gap-2 font-medium text-primary text-sm">
                  <Cloud className="h-4 w-4" />
                  Framework-defined Infrastructure™
                </div>
                <p className="text-muted-foreground text-xs">
                  Your code structure determines the infrastructure. No
                  CloudFormation, no Terraform, no IAM policies to configure.
                </p>
              </div>
            </div>
          </div>

          {/* AWS Infrastructure */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="flex items-center gap-3 border-border border-b bg-aws/5 px-5 py-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-aws">
                <span className="font-bold text-sm text-white">A</span>
              </div>
              <span className="font-semibold">AWS Setup</span>
              <span className="ml-auto rounded-full bg-aws/10 px-2 py-1 font-mono text-aws text-xs">
                60+ min
              </span>
            </div>
            <div className="space-y-3 p-6">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-aws bg-aws/10 font-bold text-aws text-sm">
                    1
                  </div>
                  <div className="mt-2 h-full w-0.5 bg-border" />
                </div>
                <div className="pb-4">
                  <div className="mb-1 flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-aws" />
                    <h4 className="font-medium text-sm">
                      Install AWS CLI & CDK
                    </h4>
                  </div>
                  <code className="mt-2 block rounded bg-muted px-2 py-1 font-mono text-xs">
                    brew install awscli && npm i -g aws-cdk
                  </code>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-aws bg-aws/10 font-bold text-aws text-sm">
                    2
                  </div>
                  <div className="mt-2 h-full w-0.5 bg-border" />
                </div>
                <div className="pb-4">
                  <div className="mb-1 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-aws" />
                    <h4 className="font-medium text-sm">
                      Configure IAM Credentials
                    </h4>
                  </div>
                  <code className="mt-2 block rounded bg-muted px-2 py-1 font-mono text-xs">
                    aws configure --profile agent-deploy
                  </code>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-aws bg-aws/10 font-bold text-aws text-sm">
                    3
                  </div>
                  <div className="mt-2 h-full w-0.5 bg-border" />
                </div>
                <div className="pb-4">
                  <div className="mb-1 flex items-center gap-2">
                    <Database className="h-4 w-4 text-aws" />
                    <h4 className="font-medium text-sm">
                      Bootstrap CDK in Account
                    </h4>
                  </div>
                  <code className="mt-2 block rounded bg-muted px-2 py-1 font-mono text-xs">
                    cdk bootstrap aws://ACCOUNT_ID/REGION
                  </code>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-aws bg-aws/10 font-bold text-aws text-sm">
                    4
                  </div>
                  <div className="mt-2 h-full w-0.5 bg-border" />
                </div>
                <div className="flex-1 pb-4">
                  <div className="mb-1 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-aws" />
                    <h4 className="font-medium text-sm">
                      Configure IAM Permissions
                    </h4>
                  </div>
                  <p className="mt-1 mb-2 text-muted-foreground text-xs">
                    Your deployment role needs these permissions:
                  </p>
                  <div className="space-y-0.5 overflow-x-auto rounded-lg border border-border bg-muted/50 p-3 font-mono text-xs">
                    <p className="text-muted-foreground">
                      iam:CreateServiceLinkedRole
                    </p>
                    <p className="text-muted-foreground">bedrock:*</p>
                    <p className="text-muted-foreground">
                      ecr:CreateRepository, ecr:PutImage
                    </p>
                    <p className="text-muted-foreground">
                      s3:CreateBucket, s3:PutObject
                    </p>
                    <p className="text-muted-foreground">
                      lambda:CreateFunction
                    </p>
                    <p className="text-muted-foreground">logs:CreateLogGroup</p>
                    <p className="text-muted-foreground">
                      ... and 20+ more actions
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-aws bg-aws/10 font-bold text-aws text-sm">
                    5
                  </div>
                  <div className="mt-2 h-full w-0.5 bg-border" />
                </div>
                <div className="flex-1 pb-4">
                  <div className="mb-1 flex items-center gap-2">
                    <Server className="h-4 w-4 text-aws" />
                    <h4 className="font-medium text-sm">Write CDK Stack</h4>
                  </div>
                  <p className="mt-1 mb-2 text-muted-foreground text-xs">
                    Define your infrastructure in TypeScript (~100+ lines):
                  </p>
                  <div className="overflow-x-auto rounded-lg border border-zinc-700 bg-zinc-900 p-3 font-mono text-xs">
                    <pre className="text-zinc-300 leading-relaxed">
                      <code>{`import * as agentcore from '@aws-cdk/aws-bedrock-agentcore-alpha';
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

    // Grant model access
    runtime.grantInvokeModel(
      BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_4
    );

    // Add memory, gateway, code interpreter...
  }
}`}</code>
                    </pre>
                  </div>
                  <p className="mt-2 text-muted-foreground text-xs italic">
                    + Dockerfile, buildspec.yml, cdk.json, tsconfig.json...
                  </p>
                </div>
              </div>

              {/* Step 6 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-aws bg-aws/10 font-bold text-aws text-sm">
                    6
                  </div>
                  <div className="mt-2 h-full w-0.5 bg-border" />
                </div>
                <div className="pb-4">
                  <div className="mb-1 flex items-center gap-2">
                    <Layers className="h-4 w-4 text-aws" />
                    <h4 className="font-medium text-sm">
                      Build & Push Container
                    </h4>
                  </div>
                  <code className="mt-2 block rounded bg-muted px-2 py-1 font-mono text-xs">
                    docker build --platform linux/arm64 -t agent .
                  </code>
                </div>
              </div>

              {/* Step 7 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-aws bg-aws/10 font-bold text-aws text-sm">
                    7
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <Cloud className="h-4 w-4 text-aws" />
                    <h4 className="font-medium text-sm">Deploy Stack</h4>
                  </div>
                  <code className="mt-2 block rounded bg-muted px-2 py-1 font-mono text-xs">
                    cdk deploy --all --require-approval never
                  </code>
                </div>
              </div>

              {/* Summary */}
              <div className="mt-4 rounded-xl border border-aws/20 bg-aws/5 p-4">
                <div className="mb-2 flex items-center gap-2 font-medium text-aws text-sm">
                  <Clock className="h-4 w-4" />
                  Enterprise-grade Control
                </div>
                <p className="text-muted-foreground text-xs">
                  Full control over VPCs, IAM, encryption, and networking.
                  Required for regulated industries and complex integrations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom comparison cards */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5">
            <h4 className="mb-2 font-semibold text-sm">Time to First Deploy</h4>
            <div className="flex items-end gap-4">
              <div>
                <span className="font-bold text-2xl text-primary">3</span>
                <span className="ml-1 text-muted-foreground text-sm">min</span>
              </div>
              <span className="text-muted-foreground">vs</span>
              <div>
                <span className="font-bold text-2xl text-aws">60+</span>
                <span className="ml-1 text-muted-foreground text-sm">min</span>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <h4 className="mb-2 font-semibold text-sm">
              Config Files Required
            </h4>
            <div className="flex items-end gap-4">
              <div>
                <span className="font-bold text-2xl text-primary">0-1</span>
                <span className="ml-1 text-muted-foreground text-sm">
                  files
                </span>
              </div>
              <span className="text-muted-foreground">vs</span>
              <div>
                <span className="font-bold text-2xl text-aws">5+</span>
                <span className="ml-1 text-muted-foreground text-sm">
                  files
                </span>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <h4 className="mb-2 font-semibold text-sm">
              IAM Policies to Configure
            </h4>
            <div className="flex items-end gap-4">
              <div>
                <span className="font-bold text-2xl text-primary">0</span>
              </div>
              <span className="text-muted-foreground">vs</span>
              <div>
                <span className="font-bold text-2xl text-aws">3-10+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
