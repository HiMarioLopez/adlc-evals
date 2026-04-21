// Report Schema Types
// Defines all TypeScript interfaces for report data structures

// =============================================================================
// Core Types
// =============================================================================

export interface Platform {
  color: string;
  icon:
    | "vercel"
    | "aws"
    | "gcp"
    | "azure"
    | "cloudflare"
    | "modal"
    | "openai"
    | "databricks"
    | "snowflake";
  id: string;
  name: string;
  shortName: string;
  textColor?: string;
}

export interface Contributor {
  github: string;
  name: string;
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
  description: string;
  keyFindings: KeyFinding[];
  lastUpdated: string;
  subtitle: string;
  title: {
    primary: string;
    secondary: string;
  };
}

// =============================================================================
// Infrastructure Section
// =============================================================================

export interface PlatformValue {
  detail?: string;
  link?: string;
  text: string;
}

export interface ComparisonRow {
  aws: PlatformValue;
  capability: string;
  description: string;
  iconName: string;
  vercel: PlatformValue;
}

export interface CategoryGroup {
  colorClass: string;
  description: string;
  iconName: string;
  name: string;
  rows: ComparisonRow[];
}

export interface InfrastructureData {
  categoryGroups: CategoryGroup[];
  description: string;
  keyInsight: {
    title: string;
    description: string;
    codeHighlight?: string;
  };
  sectionNumber: number;
  title: string;
}

// =============================================================================
// Pricing Section
// =============================================================================

export interface ModelPricing {
  input: string;
  model: string;
  output: string;
  tier: "flagship" | "balanced" | "fast";
}

export interface CostBreakdownItem {
  calc: string;
  component: string;
  cost: string;
}

export interface CostBreakdown {
  aws: CostBreakdownItem[];
  awsRegionalNote?: string;
  awsTotal: string;
  vercel: CostBreakdownItem[];
  vercelTotal: string;
}

export interface EffortLevel {
  color: string;
  impact: string;
  level: string;
  multiplier: string;
}

export interface PricingTier {
  description: string;
  discount: string;
  tier: string;
  tooltip?: string | null;
}

export interface PricingData {
  bedrockPricingNote: string;
  bedrockTiers: PricingTier[];
  costBreakdown: CostBreakdown;
  description: string;
  effortLevels: EffortLevel[];
  keyInsight: {
    title: string;
    description: string;
    modelPercent: number;
    infraPercent: number;
  };
  modelPricing: ModelPricing[];
  sectionNumber: number;
  title: string;
  workloadAssumptions: {
    turns: number;
    inputTokensPerTurn: number;
    outputTokensPerTurn: number;
    activeCpuPerTurn: string;
  };
}

// =============================================================================
// Code Section
// =============================================================================

export interface CodeExample {
  code: string;
  key: string;
  label: string;
  language: string;
}

export interface CodePatternComparison {
  aws: { label: string; code?: string };
  title: string;
  vercel: { label: string; code?: string };
}

export interface CodeData {
  aws: {
    label: string;
    language: string;
    examples: CodeExample[];
  };
  description: string;
  patternComparisons: CodePatternComparison[];
  sectionNumber: number;
  title: string;
  vercel: {
    label: string;
    language: string;
    examples: CodeExample[];
  };
}

// =============================================================================
// Deployment Section
// =============================================================================

export interface DeploymentStep {
  codeBlock?: string;
  command?: string;
  description: string;
  iconName: string;
  notes?: string[];
  stepNumber: number;
  title: string;
}

export interface DeploymentData {
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
  description: string;
  sectionNumber: number;
  title: string;
  vercel: {
    title: string;
    duration: string;
    steps: DeploymentStep[];
    summary: {
      title: string;
      description: string;
    };
  };
}

// =============================================================================
// Regional Section
// =============================================================================

export interface AWSAgentCoreFeatures {
  evaluations: boolean;
  gateway: boolean;
  identity: boolean;
  memory: boolean;
  observability: boolean;
  policy: boolean;
  runtime: boolean;
  tools: boolean;
}

export interface AWSRegionData {
  agentcore: AWSAgentCoreFeatures;
  coordinates: [number, number];
  name: string;
  region: string;
}

export interface VercelRegionData {
  awsRegion: string;
  code: string;
  coordinates: [number, number];
  hasSandbox: boolean;
  name: string;
}

export interface RegionalData {
  agentcoreFeatures: { key: string; label: string; required: boolean }[];
  awsRegions: AWSRegionData[];
  description: string;
  sectionNumber: number;
  title: string;
  vercelEdgePops: number;
  vercelFeatures: { key: string; label: string; note: string }[];
  vercelRegions: VercelRegionData[];
}

// =============================================================================
// Adoption Section
// =============================================================================

export interface Repository {
  color: string;
  description: string;
  ecosystem: string;
  forks: string;
  language: string;
  latestCommit: string;
  latestTag: string;
  link: string;
  name: string;
  openIssues: string;
  ratio: string;
  ratioLabel: string;
  recentClosed: number;
  recentOpen: number;
}

export interface ActivitySignal {
  platform: string;
  signals: string[];
}

export interface AdoptionData {
  activitySignals: ActivitySignal[];
  dataNote: string;
  description: string;
  repositories: Repository[];
  sectionNumber: number;
  title: string;
}

// =============================================================================
// Delta Section
// =============================================================================

export interface PlatformDelta {
  changes: string[];
  color: string;
  current: string;
  link: string;
  platform: string;
  previous: string;
  version: string;
}

export interface DeltaData {
  deltas: PlatformDelta[];
  description: string;
  title: string;
}

// =============================================================================
// Footer Section
// =============================================================================

export interface FooterData {
  analyzedVersions: {
    aiSdk: string;
    strands: string;
    agentcore: string;
  };
  awsLinks: ExternalLink[];
  contributors: Contributor[];
  generatedDate: string;
  reportVersion: string;
  vercelLinks: ExternalLink[];
}

// =============================================================================
// Report Metadata
// =============================================================================

export interface ReportMetadata {
  contributors: Contributor[];
  date: string;
  dateIso: string;
  description: string;
  highlights: string[];
  href: string;
  id: string;
  platforms: Platform[];
  subtitle: string;
  title: string;
  version: string;
}

// =============================================================================
// Complete Report Type
// =============================================================================

export interface Report {
  adoption: AdoptionData;
  code: CodeData;
  delta: DeltaData;
  deployment: DeploymentData;
  footer: FooterData;
  hero: HeroData;
  infrastructure: InfrastructureData;
  metadata: ReportMetadata;
  pricing: PricingData;
  regions: RegionalData;
  sections: ReportSection[];
}
