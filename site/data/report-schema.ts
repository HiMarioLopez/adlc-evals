// Report Schema Types
// Defines all TypeScript interfaces for report data structures

// =============================================================================
// Core Types
// =============================================================================

export interface Platform {
  id: string;
  name: string;
  shortName: string;
  color: string;
  textColor?: string;
  icon: "vercel" | "aws" | "gcp" | "azure" | "cloudflare" | "modal";
}

export interface Contributor {
  name: string;
  github: string;
}

export interface ReportSection {
  id: string;
  label: string;
}

export interface ExternalLink {
  label: string;
  url: string;
}

// =============================================================================
// Hero Section
// =============================================================================

export interface KeyFinding {
  label: string;
  values: {
    primary: { value: string; label?: string };
    secondary?: { value: string; label?: string };
  };
}

export interface HeroData {
  lastUpdated: string;
  title: {
    primary: string;
    secondary: string;
  };
  subtitle: string;
  description: string;
  keyFindings: KeyFinding[];
}

// =============================================================================
// Infrastructure Section
// =============================================================================

export interface PlatformValue {
  text: string;
  detail?: string;
  link?: string;
}

export interface ComparisonRow {
  capability: string;
  description: string;
  iconName: string;
  vercel: PlatformValue;
  aws: PlatformValue;
}

export interface CategoryGroup {
  name: string;
  iconName: string;
  description: string;
  colorClass: string;
  rows: ComparisonRow[];
}

export interface InfrastructureData {
  sectionNumber: number;
  title: string;
  description: string;
  categoryGroups: CategoryGroup[];
  keyInsight: {
    title: string;
    description: string;
    codeHighlight?: string;
  };
}

// =============================================================================
// Pricing Section
// =============================================================================

export interface ModelPricing {
  model: string;
  input: string;
  output: string;
  tier: "flagship" | "balanced" | "fast";
}

export interface CostBreakdownItem {
  component: string;
  calc: string;
  cost: string;
}

export interface CostBreakdown {
  vercel: CostBreakdownItem[];
  aws: CostBreakdownItem[];
  vercelTotal: string;
  awsTotal: string;
  awsRegionalNote?: string;
}

export interface EffortLevel {
  level: string;
  multiplier: string;
  impact: string;
  color: string;
}

export interface PricingTier {
  tier: string;
  description: string;
  discount: string;
  tooltip?: string | null;
}

export interface PricingData {
  sectionNumber: number;
  title: string;
  description: string;
  workloadAssumptions: {
    turns: number;
    inputTokensPerTurn: number;
    outputTokensPerTurn: number;
    activeCpuPerTurn: string;
  };
  modelPricing: ModelPricing[];
  costBreakdown: CostBreakdown;
  keyInsight: {
    title: string;
    description: string;
    modelPercent: number;
    infraPercent: number;
  };
  effortLevels: EffortLevel[];
  bedrockTiers: PricingTier[];
  bedrockPricingNote: string;
}

// =============================================================================
// Code Section
// =============================================================================

export interface CodeExample {
  key: string;
  label: string;
  code: string;
  language: string;
}

export interface CodePatternComparison {
  title: string;
  vercel: { label: string; code?: string };
  aws: { label: string; code?: string };
}

export interface CodeData {
  sectionNumber: number;
  title: string;
  description: string;
  vercel: {
    label: string;
    language: string;
    examples: CodeExample[];
  };
  aws: {
    label: string;
    language: string;
    examples: CodeExample[];
  };
  patternComparisons: CodePatternComparison[];
}

// =============================================================================
// Deployment Section
// =============================================================================

export interface DeploymentStep {
  stepNumber: number;
  title: string;
  description: string;
  iconName: string;
  command?: string;
  codeBlock?: string;
  notes?: string[];
}

export interface DeploymentData {
  sectionNumber: number;
  title: string;
  description: string;
  vercel: {
    title: string;
    duration: string;
    steps: DeploymentStep[];
    summary: {
      title: string;
      description: string;
    };
  };
  aws: {
    title: string;
    duration: string;
    steps: DeploymentStep[];
    summary: {
      title: string;
      description: string;
    };
  };
  comparisons: {
    label: string;
    vercel: { value: string; unit?: string };
    aws: { value: string; unit?: string };
  }[];
}

// =============================================================================
// Regional Section
// =============================================================================

export interface AWSAgentCoreFeatures {
  runtime: boolean;
  memory: boolean;
  gateway: boolean;
  identity: boolean;
  tools: boolean;
  observability: boolean;
  policy: boolean;
  evaluations: boolean;
}

export interface AWSRegionData {
  region: string;
  name: string;
  coordinates: [number, number];
  agentcore: AWSAgentCoreFeatures;
}

export interface VercelRegionData {
  code: string;
  awsRegion: string;
  name: string;
  coordinates: [number, number];
  hasSandbox: boolean;
}

export interface RegionalData {
  sectionNumber: number;
  title: string;
  description: string;
  awsRegions: AWSRegionData[];
  vercelRegions: VercelRegionData[];
  agentcoreFeatures: { key: string; label: string; required: boolean }[];
  vercelFeatures: { key: string; label: string; note: string }[];
  vercelEdgePops: number;
}

// =============================================================================
// Adoption Section
// =============================================================================

export interface Repository {
  name: string;
  description: string;
  latestTag: string;
  language: string;
  forks: string;
  openIssues: string;
  ecosystem: string;
  recentOpen: number;
  recentClosed: number;
  ratio: string;
  ratioLabel: string;
  latestCommit: string;
  link: string;
  color: string;
}

export interface ActivitySignal {
  platform: string;
  signals: string[];
}

export interface AdoptionData {
  sectionNumber: number;
  title: string;
  description: string;
  repositories: Repository[];
  activitySignals: ActivitySignal[];
  dataNote: string;
}

// =============================================================================
// Delta Section
// =============================================================================

export interface PlatformDelta {
  platform: string;
  previous: string;
  current: string;
  changes: string[];
  version: string;
  link: string;
  color: string;
}

export interface DeltaData {
  title: string;
  description: string;
  deltas: PlatformDelta[];
}

// =============================================================================
// Footer Section
// =============================================================================

export interface FooterData {
  vercelLinks: ExternalLink[];
  awsLinks: ExternalLink[];
  contributors: Contributor[];
  reportVersion: string;
  generatedDate: string;
  analyzedVersions: {
    aiSdk: string;
    strands: string;
    agentcore: string;
  };
}

// =============================================================================
// Report Metadata
// =============================================================================

export interface ReportMetadata {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  date: string;
  version: string;
  platforms: Platform[];
  highlights: string[];
  contributors: Contributor[];
}

// =============================================================================
// Complete Report Type
// =============================================================================

export interface Report {
  metadata: ReportMetadata;
  sections: ReportSection[];
  hero: HeroData;
  infrastructure: InfrastructureData;
  pricing: PricingData;
  code: CodeData;
  deployment: DeploymentData;
  regions: RegionalData;
  adoption: AdoptionData;
  delta: DeltaData;
  footer: FooterData;
}
