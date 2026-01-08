"use client"

import { Terminal, GitBranch, Cloud, Server, Shield, Database, CheckCircle2, Check, Clock, Layers, Rocket } from "lucide-react"

export function DeploymentSection() {
  return (
    <section id="deployment" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary mb-4">
            <Rocket className="w-4 h-4" />
            Section 4
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Deployment Setup Comparison
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            The infrastructure story is where these stacks diverge most dramatically
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Vercel Infrastructure */}
          <div className="rounded-2xl bg-card border border-border overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-primary/5">
              <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
                <svg className="w-5 h-5 text-background" viewBox="0 0 76 65" fill="currentColor">
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                </svg>
              </div>
              <span className="font-semibold">Vercel Setup</span>
              <span className="ml-auto text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded-full">~3 min</span>
            </div>
            <div className="p-6 space-y-4">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-sm font-bold text-primary">1</div>
                  <div className="w-0.5 h-full bg-border mt-2" />
                </div>
                <div className="pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Terminal className="w-4 h-4 text-primary" />
                    <h4 className="font-medium">Install Vercel CLI</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    One global package, no other dependencies
                  </p>
                  <code className="text-xs bg-muted px-3 py-2 rounded-lg block font-mono">
                    npm i -g vercel
                  </code>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-sm font-bold text-primary">2</div>
                  <div className="w-0.5 h-full bg-border mt-2" />
                </div>
                <div className="pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <GitBranch className="w-4 h-4 text-primary" />
                    <h4 className="font-medium">Link &amp; Deploy</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Connect repo and deploy in one command
                  </p>
                  <code className="text-xs bg-muted px-3 py-2 rounded-lg block font-mono">
                    vercel
                  </code>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-sm font-bold text-primary">3</div>
                  <div className="w-0.5 h-full bg-border mt-2" />
                </div>
                <div className="pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Cloud className="w-4 h-4 text-primary" />
                    <h4 className="font-medium">Push Updates</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Auto-deploys on every push, preview URLs for PRs
                  </p>
                  <code className="text-xs bg-muted px-3 py-2 rounded-lg block font-mono">
                    git push origin main
                  </code>
                </div>
              </div>

              {/* Done */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-muted border-2 border-muted-foreground/30 flex items-center justify-center">
                    <Check className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                    <h4 className="font-medium text-muted-foreground">Done</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Auto-provisioned: Functions, Edge, CDN, SSL, Preview Deploys
                  </p>
                </div>
              </div>

              {/* Summary */}
              <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-2 text-sm font-medium text-primary mb-2">
                  <Cloud className="w-4 h-4" />
                  Framework-defined Infrastructure™
                </div>
                <p className="text-xs text-muted-foreground">
                  Your code structure determines the infrastructure. No CloudFormation, 
                  no Terraform, no IAM policies to configure.
                </p>
              </div>
            </div>
          </div>

          {/* AWS Infrastructure */}
          <div className="rounded-2xl bg-card border border-border overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-aws/5">
              <div className="w-8 h-8 rounded-lg bg-aws flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-semibold">AWS Setup</span>
              <span className="ml-auto text-xs font-mono text-aws bg-aws/10 px-2 py-1 rounded-full">60+ min</span>
            </div>
            <div className="p-6 space-y-3">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-aws/10 border-2 border-aws flex items-center justify-center text-sm font-bold text-aws">1</div>
                  <div className="w-0.5 h-full bg-border mt-2" />
                </div>
                <div className="pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Terminal className="w-4 h-4 text-aws" />
                    <h4 className="font-medium text-sm">Install AWS CLI & CDK</h4>
                  </div>
                  <code className="text-xs bg-muted px-2 py-1 rounded block font-mono mt-2">
                    brew install awscli && npm i -g aws-cdk
                  </code>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-aws/10 border-2 border-aws flex items-center justify-center text-sm font-bold text-aws">2</div>
                  <div className="w-0.5 h-full bg-border mt-2" />
                </div>
                <div className="pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="w-4 h-4 text-aws" />
                    <h4 className="font-medium text-sm">Configure IAM Credentials</h4>
                  </div>
                  <code className="text-xs bg-muted px-2 py-1 rounded block font-mono mt-2">
                    aws configure --profile agent-deploy
                  </code>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-aws/10 border-2 border-aws flex items-center justify-center text-sm font-bold text-aws">3</div>
                  <div className="w-0.5 h-full bg-border mt-2" />
                </div>
                <div className="pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Database className="w-4 h-4 text-aws" />
                    <h4 className="font-medium text-sm">Bootstrap CDK in Account</h4>
                  </div>
                  <code className="text-xs bg-muted px-2 py-1 rounded block font-mono mt-2">
                    cdk bootstrap aws://ACCOUNT_ID/REGION
                  </code>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-aws/10 border-2 border-aws flex items-center justify-center text-sm font-bold text-aws">4</div>
                  <div className="w-0.5 h-full bg-border mt-2" />
                </div>
                <div className="pb-4 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="w-4 h-4 text-aws" />
                    <h4 className="font-medium text-sm">Configure IAM Permissions</h4>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 mb-2">
                    Your deployment role needs these permissions:
                  </p>
                  <div className="text-xs bg-muted/50 rounded-lg p-3 font-mono space-y-0.5 border border-border overflow-x-auto">
                    <p className="text-muted-foreground">iam:CreateServiceLinkedRole</p>
                    <p className="text-muted-foreground">bedrock:*</p>
                    <p className="text-muted-foreground">ecr:CreateRepository, ecr:PutImage</p>
                    <p className="text-muted-foreground">s3:CreateBucket, s3:PutObject</p>
                    <p className="text-muted-foreground">lambda:CreateFunction</p>
                    <p className="text-muted-foreground">logs:CreateLogGroup</p>
                    <p className="text-muted-foreground">... and 20+ more actions</p>
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-aws/10 border-2 border-aws flex items-center justify-center text-sm font-bold text-aws">5</div>
                  <div className="w-0.5 h-full bg-border mt-2" />
                </div>
                <div className="pb-4 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Server className="w-4 h-4 text-aws" />
                    <h4 className="font-medium text-sm">Write CDK Stack</h4>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 mb-2">
                    Define your infrastructure in TypeScript (~100+ lines):
                  </p>
                  <div className="text-xs bg-zinc-900 rounded-lg p-3 font-mono border border-zinc-700 overflow-x-auto">
                    <pre className="text-zinc-300 leading-relaxed"><code>{`import * as agentcore from '@aws-cdk/aws-bedrock-agentcore-alpha';
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
}`}</code></pre>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 italic">
                    + Dockerfile, buildspec.yml, cdk.json, tsconfig.json...
                  </p>
                </div>
              </div>

              {/* Step 6 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-aws/10 border-2 border-aws flex items-center justify-center text-sm font-bold text-aws">6</div>
                  <div className="w-0.5 h-full bg-border mt-2" />
                </div>
                <div className="pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Layers className="w-4 h-4 text-aws" />
                    <h4 className="font-medium text-sm">Build & Push Container</h4>
                  </div>
                  <code className="text-xs bg-muted px-2 py-1 rounded block font-mono mt-2">
                    docker build --platform linux/arm64 -t agent .
                  </code>
                </div>
              </div>

              {/* Step 7 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-aws/10 border-2 border-aws flex items-center justify-center text-sm font-bold text-aws">7</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Cloud className="w-4 h-4 text-aws" />
                    <h4 className="font-medium text-sm">Deploy Stack</h4>
                  </div>
                  <code className="text-xs bg-muted px-2 py-1 rounded block font-mono mt-2">
                    cdk deploy --all --require-approval never
                  </code>
                </div>
              </div>

              {/* Summary */}
              <div className="mt-4 p-4 rounded-xl bg-aws/5 border border-aws/20">
                <div className="flex items-center gap-2 text-sm font-medium text-aws mb-2">
                  <Clock className="w-4 h-4" />
                  Enterprise-grade Control
                </div>
                <p className="text-xs text-muted-foreground">
                  Full control over VPCs, IAM, encryption, and networking. 
                  Required for regulated industries and complex integrations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom comparison cards */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <div className="p-5 rounded-xl bg-card border border-border">
            <h4 className="font-semibold mb-2 text-sm">Time to First Deploy</h4>
            <div className="flex items-end gap-4">
              <div>
                <span className="text-2xl font-bold text-primary">3</span>
                <span className="text-sm text-muted-foreground ml-1">min</span>
              </div>
              <span className="text-muted-foreground">vs</span>
              <div>
                <span className="text-2xl font-bold text-aws">60+</span>
                <span className="text-sm text-muted-foreground ml-1">min</span>
              </div>
            </div>
          </div>
          <div className="p-5 rounded-xl bg-card border border-border">
            <h4 className="font-semibold mb-2 text-sm">Config Files Required</h4>
            <div className="flex items-end gap-4">
              <div>
                <span className="text-2xl font-bold text-primary">0-1</span>
                <span className="text-sm text-muted-foreground ml-1">files</span>
              </div>
              <span className="text-muted-foreground">vs</span>
              <div>
                <span className="text-2xl font-bold text-aws">5+</span>
                <span className="text-sm text-muted-foreground ml-1">files</span>
              </div>
            </div>
          </div>
          <div className="p-5 rounded-xl bg-card border border-border">
            <h4 className="font-semibold mb-2 text-sm">IAM Policies to Configure</h4>
            <div className="flex items-end gap-4">
              <div>
                <span className="text-2xl font-bold text-primary">0</span>
              </div>
              <span className="text-muted-foreground">vs</span>
              <div>
                <span className="text-2xl font-bold text-aws">3-10+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
