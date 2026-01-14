import type { DeploymentData } from "@/data/report-schema";

export const deploymentData: DeploymentData = {
  sectionNumber: 4,
  title: "Deployment Setup Comparison",
  description:
    "The infrastructure story is where these stacks diverge most dramatically",
  vercel: {
    title: "Vercel Setup",
    duration: "~3 min",
    steps: [
      {
        stepNumber: 1,
        title: "Install Vercel CLI",
        description: "One global package, no other dependencies",
        iconName: "Terminal",
        command: "npm i -g vercel",
      },
      {
        stepNumber: 2,
        title: "Link & Deploy",
        description: "Connect repo and deploy in one command",
        iconName: "GitBranch",
        command: "vercel",
      },
      {
        stepNumber: 3,
        title: "Push Updates",
        description: "Auto-deploys on every push, preview URLs for PRs",
        iconName: "Cloud",
        command: "git push origin main",
      },
    ],
    summary: {
      title: "Framework-defined Infrastructure™",
      description:
        "Your code structure determines the infrastructure. No CloudFormation, no Terraform, no IAM policies to configure.",
    },
  },
  aws: {
    title: "AWS Setup",
    duration: "60+ min",
    steps: [
      {
        stepNumber: 1,
        title: "Install AWS CLI & CDK",
        description: "",
        iconName: "Terminal",
        command: "brew install awscli && npm i -g aws-cdk",
      },
      {
        stepNumber: 2,
        title: "Configure IAM Credentials",
        description: "",
        iconName: "Shield",
        command: "aws configure --profile agent-deploy",
      },
      {
        stepNumber: 3,
        title: "Bootstrap CDK in Account",
        description: "",
        iconName: "Database",
        command: "cdk bootstrap aws://ACCOUNT_ID/REGION",
      },
      {
        stepNumber: 4,
        title: "Configure IAM Permissions",
        description: "Your deployment role needs these permissions:",
        iconName: "Shield",
        notes: [
          "iam:CreateServiceLinkedRole",
          "bedrock:*",
          "ecr:CreateRepository, ecr:PutImage",
          "s3:CreateBucket, s3:PutObject",
          "lambda:CreateFunction",
          "logs:CreateLogGroup",
          "... and 20+ more actions",
        ],
      },
      {
        stepNumber: 5,
        title: "Write CDK Stack",
        description: "Define your infrastructure in TypeScript (~100+ lines):",
        iconName: "Server",
        codeBlock: `import * as agentcore from '@aws-cdk/aws-bedrock-agentcore-alpha';
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
}`,
        notes: ["+ Dockerfile, buildspec.yml, cdk.json, tsconfig.json..."],
      },
      {
        stepNumber: 6,
        title: "Build & Push Container",
        description: "",
        iconName: "Layers",
        command: "docker build --platform linux/arm64 -t agent .",
      },
      {
        stepNumber: 7,
        title: "Deploy Stack",
        description: "",
        iconName: "Cloud",
        command: "cdk deploy --all --require-approval never",
      },
    ],
    summary: {
      title: "Enterprise-grade Control",
      description:
        "Full control over VPCs, IAM, encryption, and networking. Required for regulated industries and complex integrations.",
    },
  },
  comparisons: [
    {
      label: "Time to First Deploy",
      vercel: { value: "3", unit: "min" },
      aws: { value: "60+", unit: "min" },
    },
    {
      label: "Config Files Required",
      vercel: { value: "0-1", unit: "files" },
      aws: { value: "5+", unit: "files" },
    },
    {
      label: "IAM Policies to Configure",
      vercel: { value: "0" },
      aws: { value: "3-10+" },
    },
  ],
};
