"use client"

import { useState } from "react"
import { Globe, Check, Minus, AlertCircle, ChevronDown, Server, Cpu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Map, MapMarker, MarkerContent, MarkerTooltip, MapControls } from "@/components/ui/map"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// AWS regions with AgentCore feature availability
// Based on: https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agentcore-regions.html
// Full AWS regions from: https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html
interface AWSRegionData {
  region: string
  name: string
  coordinates: [number, number]
  // AgentCore feature availability
  agentcore: {
    runtime: boolean
    memory: boolean
    gateway: boolean
    identity: boolean
    tools: boolean
    observability: boolean
    policy: boolean
    evaluations: boolean
  }
}

const awsRegions: AWSRegionData[] = [
  // Americas
  { region: "us-east-1", name: "N. Virginia", coordinates: [-77.0369, 38.9072], agentcore: { runtime: true, memory: true, gateway: true, identity: true, tools: true, observability: true, policy: true, evaluations: true } },
  { region: "us-east-2", name: "Ohio", coordinates: [-82.9988, 39.9612], agentcore: { runtime: true, memory: true, gateway: true, identity: true, tools: true, observability: true, policy: true, evaluations: false } },
  { region: "us-west-1", name: "N. California", coordinates: [-121.4944, 38.5816], agentcore: { runtime: false, memory: false, gateway: false, identity: false, tools: false, observability: false, policy: false, evaluations: false } },
  { region: "us-west-2", name: "Oregon", coordinates: [-123.0351, 44.9429], agentcore: { runtime: true, memory: true, gateway: true, identity: true, tools: true, observability: true, policy: true, evaluations: true } },
  { region: "ca-central-1", name: "Canada", coordinates: [-73.5673, 45.5017], agentcore: { runtime: false, memory: true, gateway: true, identity: true, tools: false, observability: false, policy: false, evaluations: false } },
  { region: "ca-west-1", name: "Calgary", coordinates: [-114.0719, 51.0447], agentcore: { runtime: false, memory: false, gateway: false, identity: false, tools: false, observability: false, policy: false, evaluations: false } },
  { region: "sa-east-1", name: "São Paulo", coordinates: [-46.6333, -23.5505], agentcore: { runtime: false, memory: true, gateway: false, identity: false, tools: false, observability: false, policy: false, evaluations: false } },
  { region: "mx-central-1", name: "Mexico", coordinates: [-99.1332, 19.4326], agentcore: { runtime: false, memory: false, gateway: false, identity: false, tools: false, observability: false, policy: false, evaluations: false } },

  // Europe
  { region: "eu-central-1", name: "Frankfurt", coordinates: [8.6821, 50.1109], agentcore: { runtime: true, memory: true, gateway: true, identity: true, tools: true, observability: true, policy: true, evaluations: true } },
  { region: "eu-central-2", name: "Zurich", coordinates: [8.5417, 47.3769], agentcore: { runtime: false, memory: false, gateway: false, identity: false, tools: false, observability: false, policy: false, evaluations: false } },
  { region: "eu-west-1", name: "Ireland", coordinates: [-6.2603, 53.3498], agentcore: { runtime: true, memory: true, gateway: true, identity: true, tools: true, observability: true, policy: true, evaluations: false } },
  { region: "eu-west-2", name: "London", coordinates: [-0.1276, 51.5074], agentcore: { runtime: false, memory: true, gateway: true, identity: true, tools: false, observability: false, policy: false, evaluations: false } },
  { region: "eu-west-3", name: "Paris", coordinates: [2.3522, 48.8566], agentcore: { runtime: false, memory: true, gateway: true, identity: true, tools: false, observability: false, policy: false, evaluations: false } },
  { region: "eu-north-1", name: "Stockholm", coordinates: [18.0686, 59.3293], agentcore: { runtime: false, memory: true, gateway: true, identity: true, tools: false, observability: false, policy: false, evaluations: false } },
  { region: "eu-south-1", name: "Milan", coordinates: [9.1900, 45.4642], agentcore: { runtime: false, memory: false, gateway: false, identity: false, tools: false, observability: false, policy: false, evaluations: false } },
  { region: "eu-south-2", name: "Spain", coordinates: [-3.7038, 40.4168], agentcore: { runtime: false, memory: false, gateway: false, identity: false, tools: false, observability: false, policy: false, evaluations: false } },

  // Middle East & Africa
  { region: "me-south-1", name: "Bahrain", coordinates: [50.5577, 26.0667], agentcore: { runtime: false, memory: false, gateway: false, identity: false, tools: false, observability: false, policy: false, evaluations: false } },
  { region: "me-central-1", name: "UAE", coordinates: [55.2708, 25.2048], agentcore: { runtime: false, memory: false, gateway: false, identity: false, tools: false, observability: false, policy: false, evaluations: false } },
  { region: "af-south-1", name: "Cape Town", coordinates: [18.4241, -33.9249], agentcore: { runtime: false, memory: false, gateway: false, identity: false, tools: false, observability: false, policy: false, evaluations: false } },
  { region: "il-central-1", name: "Tel Aviv", coordinates: [34.7818, 32.0853], agentcore: { runtime: false, memory: false, gateway: false, identity: false, tools: false, observability: false, policy: false, evaluations: false } },

  // Asia Pacific
  { region: "ap-south-1", name: "Mumbai", coordinates: [72.8777, 19.0760], agentcore: { runtime: true, memory: true, gateway: true, identity: true, tools: true, observability: true, policy: true, evaluations: false } },
  { region: "ap-south-2", name: "Hyderabad", coordinates: [78.4867, 17.3850], agentcore: { runtime: false, memory: false, gateway: false, identity: false, tools: false, observability: false, policy: false, evaluations: false } },
  { region: "ap-southeast-1", name: "Singapore", coordinates: [103.8198, 1.3521], agentcore: { runtime: true, memory: true, gateway: true, identity: true, tools: true, observability: true, policy: true, evaluations: false } },
  { region: "ap-southeast-2", name: "Sydney", coordinates: [151.2093, -33.8688], agentcore: { runtime: true, memory: true, gateway: true, identity: true, tools: true, observability: true, policy: true, evaluations: true } },
  { region: "ap-southeast-3", name: "Jakarta", coordinates: [106.8456, -6.2088], agentcore: { runtime: false, memory: false, gateway: false, identity: false, tools: false, observability: false, policy: false, evaluations: false } },
  { region: "ap-southeast-4", name: "Melbourne", coordinates: [144.9631, -37.8136], agentcore: { runtime: false, memory: false, gateway: false, identity: false, tools: false, observability: false, policy: false, evaluations: false } },
  { region: "ap-southeast-5", name: "Malaysia", coordinates: [101.6869, 3.1390], agentcore: { runtime: false, memory: false, gateway: false, identity: false, tools: false, observability: false, policy: false, evaluations: false } },
  { region: "ap-southeast-6", name: "New Zealand", coordinates: [174.7633, -36.8485], agentcore: { runtime: false, memory: false, gateway: false, identity: false, tools: false, observability: false, policy: false, evaluations: false } },
  { region: "ap-southeast-7", name: "Thailand", coordinates: [100.5018, 13.7563], agentcore: { runtime: false, memory: false, gateway: false, identity: false, tools: false, observability: false, policy: false, evaluations: false } },
  { region: "ap-northeast-1", name: "Tokyo", coordinates: [139.6917, 35.6895], agentcore: { runtime: true, memory: true, gateway: true, identity: true, tools: true, observability: true, policy: true, evaluations: false } },
  { region: "ap-northeast-2", name: "Seoul", coordinates: [126.9780, 37.5665], agentcore: { runtime: false, memory: true, gateway: true, identity: true, tools: false, observability: false, policy: false, evaluations: false } },
  { region: "ap-northeast-3", name: "Osaka", coordinates: [135.5023, 34.6937], agentcore: { runtime: false, memory: false, gateway: false, identity: false, tools: false, observability: false, policy: false, evaluations: false } },
  { region: "ap-east-1", name: "Hong Kong", coordinates: [114.1694, 22.3193], agentcore: { runtime: false, memory: false, gateway: false, identity: false, tools: false, observability: false, policy: false, evaluations: false } },
  { region: "ap-east-2", name: "Taipei", coordinates: [121.5654, 25.0330], agentcore: { runtime: false, memory: false, gateway: false, identity: false, tools: false, observability: false, policy: false, evaluations: false } },
]

// Vercel's 19 compute-capable regions (from https://vercel.com/docs/regions)
interface VercelRegion {
  code: string
  awsRegion: string
  name: string
  coordinates: [number, number]
  hasSandbox: boolean // Only iad1 has Sandbox during Beta
}

const vercelRegions: VercelRegion[] = [
  { code: "arn1", awsRegion: "eu-north-1", name: "Stockholm, Sweden", coordinates: [18.0686, 59.3293], hasSandbox: false },
  { code: "bom1", awsRegion: "ap-south-1", name: "Mumbai, India", coordinates: [72.8777, 19.0760], hasSandbox: false },
  { code: "cdg1", awsRegion: "eu-west-3", name: "Paris, France", coordinates: [2.3522, 48.8566], hasSandbox: false },
  { code: "cle1", awsRegion: "us-east-2", name: "Cleveland, USA", coordinates: [-81.6944, 41.4993], hasSandbox: false },
  { code: "cpt1", awsRegion: "af-south-1", name: "Cape Town, South Africa", coordinates: [18.4241, -33.9249], hasSandbox: false },
  { code: "dub1", awsRegion: "eu-west-1", name: "Dublin, Ireland", coordinates: [-6.2603, 53.3498], hasSandbox: false },
  { code: "dxb1", awsRegion: "me-central-1", name: "Dubai, UAE", coordinates: [55.2708, 25.2048], hasSandbox: false },
  { code: "fra1", awsRegion: "eu-central-1", name: "Frankfurt, Germany", coordinates: [8.6821, 50.1109], hasSandbox: false },
  { code: "gru1", awsRegion: "sa-east-1", name: "São Paulo, Brazil", coordinates: [-46.6333, -23.5505], hasSandbox: false },
  { code: "hkg1", awsRegion: "ap-east-1", name: "Hong Kong", coordinates: [114.1694, 22.3193], hasSandbox: false },
  { code: "hnd1", awsRegion: "ap-northeast-1", name: "Tokyo, Japan", coordinates: [139.6917, 35.6895], hasSandbox: false },
  { code: "iad1", awsRegion: "us-east-1", name: "Washington, D.C., USA", coordinates: [-77.0369, 38.9072], hasSandbox: true },
  { code: "icn1", awsRegion: "ap-northeast-2", name: "Seoul, South Korea", coordinates: [126.9780, 37.5665], hasSandbox: false },
  { code: "kix1", awsRegion: "ap-northeast-3", name: "Osaka, Japan", coordinates: [135.5023, 34.6937], hasSandbox: false },
  { code: "lhr1", awsRegion: "eu-west-2", name: "London, UK", coordinates: [-0.1276, 51.5074], hasSandbox: false },
  { code: "pdx1", awsRegion: "us-west-2", name: "Portland, USA", coordinates: [-122.6765, 45.5152], hasSandbox: false },
  { code: "sfo1", awsRegion: "us-west-1", name: "San Francisco, USA", coordinates: [-122.4194, 37.7749], hasSandbox: false },
  { code: "sin1", awsRegion: "ap-southeast-1", name: "Singapore", coordinates: [103.8198, 1.3521], hasSandbox: false },
  { code: "syd1", awsRegion: "ap-southeast-2", name: "Sydney, Australia", coordinates: [151.2093, -33.8688], hasSandbox: false },
]

const agentcoreFeatures = [
  { key: "runtime", label: "Runtime", required: true },
  { key: "memory", label: "Memory", required: false },
  { key: "gateway", label: "Gateway", required: false },
  { key: "identity", label: "Identity", required: false },
  { key: "tools", label: "Tools", required: true },
  { key: "observability", label: "Observability", required: false },
  { key: "policy", label: "Policy", required: false },
  { key: "evaluations", label: "Evaluations", required: false },
]

const vercelConstraints = [
  { feature: "Sandbox Region", value: "iad1 only", note: "Single region during Beta" },
  { feature: "Compute Regions", value: "19 regions", note: "Functions & Fluid Compute" },
  { feature: "Edge PoPs", value: "126 globally", note: "CDN & AI Gateway" },
  { feature: "Functions Duration", value: "Up to 800s", note: "Pro with Fluid Compute" },
]

type AgentCoreStatus = 'full' | 'partial' | 'none'

function getAgentCoreStatus(region: AWSRegionData): AgentCoreStatus {
  const ac = region.agentcore
  const hasFullStack = ac.runtime && ac.tools && ac.observability && ac.policy
  const hasAny = ac.runtime || ac.memory || ac.gateway || ac.identity || ac.tools || ac.observability || ac.policy || ac.evaluations
  
  if (hasFullStack) return 'full'
  if (hasAny) return 'partial'
  return 'none'
}

function AWSRegionMarker({ region }: { region: AWSRegionData }) {
  const status = getAgentCoreStatus(region)
  const enabledFeatures = agentcoreFeatures.filter(f => region.agentcore[f.key as keyof typeof region.agentcore])

  return (
    <MapMarker longitude={region.coordinates[0]} latitude={region.coordinates[1]}>
      <MarkerContent>
        <div
          className={cn(
            "relative flex items-center justify-center transition-transform hover:scale-110",
            status === 'full' ? "z-20" : status === 'partial' ? "z-15" : "z-10"
          )}
        >
          {status === 'full' && (
            <div className="absolute w-8 h-8 rounded-full bg-aws/20 animate-pulse" />
          )}
          <div
            className={cn(
              "rounded-full border-2 border-white shadow-lg",
              status === 'full' ? "w-4 h-4 bg-aws" : 
              status === 'partial' ? "w-3.5 h-3.5 bg-chart-3" : 
              "w-3 h-3 bg-muted-foreground/40"
            )}
          />
        </div>
      </MarkerContent>
      <MarkerTooltip className="min-w-[200px] px-3 py-2.5">
        <div className="flex items-center gap-2 mb-1.5">
          <span className={cn(
            "w-2 h-2 rounded-full",
            status === 'full' ? "bg-aws" : status === 'partial' ? "bg-chart-3" : "bg-muted-foreground/40"
          )} />
          <span className="font-semibold text-sm">{region.name}</span>
        </div>
        <p className="text-[11px] opacity-70 font-mono mb-2">{region.region}</p>
        
        {status === 'none' ? (
          <p className="text-[10px] opacity-50">No AgentCore services available</p>
        ) : (
          <div className="flex flex-wrap gap-1">
            {enabledFeatures.map(f => (
              <span
                key={f.key}
                className={cn(
                  "px-1.5 py-0.5 text-[10px] rounded",
                  f.required ? "bg-aws/30 text-aws" : "bg-background/20"
                )}
              >
                {f.label}
              </span>
            ))}
          </div>
        )}
        
        {status === 'full' && (
          <p className="text-[10px] text-aws mt-1.5">Full AgentCore stack available</p>
        )}
        {status === 'partial' && (
          <p className="text-[10px] text-chart-3 mt-1.5">Partial AgentCore support</p>
        )}
      </MarkerTooltip>
    </MapMarker>
  )
}

function VercelRegionMarker({ region }: { region: VercelRegion }) {
  return (
    <MapMarker longitude={region.coordinates[0]} latitude={region.coordinates[1]}>
      <MarkerContent>
        <div className={cn(
          "relative flex items-center justify-center transition-transform hover:scale-110",
          region.hasSandbox ? "z-30" : "z-10"
        )}>
          {region.hasSandbox && (
            <>
              <div className="absolute w-10 h-10 rounded-full bg-primary/10 animate-pulse" />
              <div className="absolute w-7 h-7 rounded-full bg-primary/20 animate-pulse [animation-delay:150ms]" />
            </>
          )}
          <div className={cn(
            "rounded-full border-2 border-white shadow-lg flex items-center justify-center",
            region.hasSandbox 
              ? "w-5 h-5 bg-primary" 
              : "w-3.5 h-3.5 bg-primary/70"
          )}>
            {region.hasSandbox && (
              <svg className="w-2.5 h-2.5 text-primary-foreground" viewBox="0 0 76 65" fill="currentColor">
                <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
              </svg>
            )}
          </div>
        </div>
      </MarkerContent>
      <MarkerTooltip className="min-w-[180px] px-3 py-2.5">
        <div className="flex items-center gap-2 mb-1">
          <svg className="w-3 h-3" viewBox="0 0 76 65" fill="currentColor">
            <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
          </svg>
          <span className="font-semibold text-sm">{region.name}</span>
        </div>
        <p className="text-[11px] opacity-70 font-mono mb-2">{region.code} ({region.awsRegion})</p>
        <div className="flex flex-wrap gap-1">
          <span className="px-1.5 py-0.5 text-[10px] rounded bg-background/20">Functions</span>
          <span className="px-1.5 py-0.5 text-[10px] rounded bg-background/20">Fluid Compute</span>
          {region.hasSandbox && (
            <span className="px-1.5 py-0.5 text-[10px] rounded bg-primary/30 text-primary">Sandbox</span>
          )}
        </div>
        {region.hasSandbox && (
          <p className="text-[10px] opacity-50 mt-1.5">Only region with Sandbox (Beta)</p>
        )}
      </MarkerTooltip>
    </MapMarker>
  )
}

function AWSMap() {
  return (
    <div className="h-[420px] relative">
      <Map
        center={[20, 25]}
        zoom={1.3}
        minZoom={1}
        maxZoom={6}
      >
        <MapControls position="bottom-right" showZoom={true} />
        {awsRegions.map(region => (
          <AWSRegionMarker key={region.region} region={region} />
        ))}
      </Map>
    </div>
  )
}

function VercelMap() {
  return (
    <div className="h-[420px] relative">
      <Map
        center={[20, 25]}
        zoom={1.3}
        minZoom={1}
        maxZoom={6}
      >
        <MapControls position="bottom-right" showZoom={true} />
        {vercelRegions.map(region => (
          <VercelRegionMarker key={region.code} region={region} />
        ))}
      </Map>
    </div>
  )
}

export function RegionalSection() {
  const [matrixOpen, setMatrixOpen] = useState(false)
  
  // Calculate stats
  const awsFullStackRegions = awsRegions.filter(r => getAgentCoreStatus(r) === 'full')
  const awsPartialRegions = awsRegions.filter(r => getAgentCoreStatus(r) === 'partial')
  const awsNoAgentCoreRegions = awsRegions.filter(r => getAgentCoreStatus(r) === 'none')
  const agentCoreRegionsWithRuntime = awsRegions.filter(r => r.agentcore.runtime)

  return (
    <section id="regions" className="py-24 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary mb-4">
            <Globe className="w-4 h-4" />
            Section 5
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Regional Availability
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Both platforms have global infrastructure. Service availability varies by region and feature set.
          </p>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="p-5 rounded-2xl bg-card border border-border text-center">
            <p className="text-3xl font-bold font-mono text-aws">{awsRegions.length}</p>
            <p className="text-xs text-muted-foreground mt-1">AWS Global Regions</p>
          </div>
          <div className="p-5 rounded-2xl bg-card border border-aws/30 text-center">
            <p className="text-3xl font-bold font-mono text-aws">{awsFullStackRegions.length}</p>
            <p className="text-xs text-muted-foreground mt-1">AgentCore Full Stack</p>
          </div>
          <div className="p-5 rounded-2xl bg-card border border-border text-center">
            <p className="text-3xl font-bold font-mono text-primary">{vercelRegions.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Vercel Compute Regions</p>
          </div>
          <div className="p-5 rounded-2xl bg-card border border-primary/30 text-center">
            <p className="text-3xl font-bold font-mono text-primary">126</p>
            <p className="text-xs text-muted-foreground mt-1">Vercel Edge PoPs</p>
          </div>
        </div>

        {/* Service availability note */}
        <div className="mb-8 grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-aws/5 border border-aws/20">
            <div className="flex items-center gap-2 mb-3">
              <Cpu className="w-4 h-4 text-aws" />
              <span className="text-sm font-medium">AWS AgentCore Availability</span>
            </div>
            <div className="text-xs space-y-2">
              <p className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-chart-3/20 text-chart-3 shrink-0 mt-0.5">
                  <AlertCircle className="w-2.5 h-2.5" />
                </span>
                <span><strong className="text-chart-3">Full Stack:</strong> <span className="text-muted-foreground">{awsFullStackRegions.length} of {awsRegions.length} AWS regions ({Math.round(awsFullStackRegions.length / awsRegions.length * 100)}%)</span></span>
              </p>
              <p className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-muted shrink-0 mt-0.5">
                  <Minus className="w-2.5 h-2.5 text-muted-foreground" />
                </span>
                <span><strong className="text-muted-foreground">Partial Support:</strong> <span className="text-muted-foreground">{awsPartialRegions.length} regions (Memory/Gateway/Identity)</span></span>
              </p>
              <p className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-destructive/20 text-destructive shrink-0 mt-0.5">
                  <AlertCircle className="w-2.5 h-2.5" />
                </span>
                <span><strong className="text-destructive">No AgentCore:</strong> <span className="text-muted-foreground">{awsNoAgentCoreRegions.length} regions</span></span>
              </p>
              <p className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-aws/20 text-aws shrink-0 mt-0.5">
                  <AlertCircle className="w-2.5 h-2.5" />
                </span>
                <span><strong className="text-aws">Evaluations (Preview):</strong> <span className="text-muted-foreground">4 regions only</span></span>
              </p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <Server className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Vercel Service Availability</span>
            </div>
            <div className="text-xs space-y-2">
              <p className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-primary/20 text-primary shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5" />
                </span>
                <span><strong className="text-primary">Functions & Fluid Compute:</strong> <span className="text-muted-foreground">All 19 regions</span></span>
              </p>
              <p className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-primary/20 text-primary shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5" />
                </span>
                <span><strong className="text-primary">AI Gateway:</strong> <span className="text-muted-foreground">Global (126 PoPs)</span></span>
              </p>
              <p className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-primary/20 text-primary shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5" />
                </span>
                <span><strong className="text-primary">Workflow SDK:</strong> <span className="text-muted-foreground">All regions</span></span>
              </p>
              <p className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-chart-3/20 text-chart-3 shrink-0 mt-0.5">
                  <AlertCircle className="w-2.5 h-2.5" />
                </span>
                <span><strong className="text-chart-3">Sandbox SDK:</strong> <span className="text-muted-foreground">iad1 only (Beta)</span></span>
              </p>
            </div>
          </div>
        </div>

        {/* Tabbed Maps */}
        <Tabs defaultValue="aws" className="mb-8">
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-border bg-muted/30">
              <TabsList className="grid w-full max-w-md grid-cols-2 bg-background/50">
                <TabsTrigger 
                  value="aws" 
                  className="data-[state=active]:bg-aws data-[state=active]:text-white gap-2"
                >
                  <span className="w-5 h-5 rounded bg-aws/20 flex items-center justify-center text-[10px] font-bold data-[state=active]:bg-white/20">
                    A
                  </span>
                  <span className="hidden sm:inline">AWS</span>
                  <span className="ml-1 px-1.5 py-0.5 text-[10px] rounded-full bg-aws/20 data-[state=active]:bg-white/20">
                    {awsRegions.length}
                  </span>
                </TabsTrigger>
                <TabsTrigger 
                  value="vercel" 
                  className="data-[state=active]:bg-foreground data-[state=active]:text-background gap-2"
                >
                  <svg className="w-4 h-4" viewBox="0 0 76 65" fill="currentColor">
                    <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                  </svg>
                  <span className="hidden sm:inline">Vercel</span>
                  <span className="ml-1 px-1.5 py-0.5 text-[10px] rounded-full bg-primary/20 data-[state=active]:bg-white/20">
                    {vercelRegions.length}
                  </span>
                </TabsTrigger>
              </TabsList>

              <p className="hidden md:block text-xs text-muted-foreground">
                Hover over markers for details
              </p>
            </div>

            <TabsContent value="vercel" className="m-0">
              <VercelMap />
              <div className="p-4 border-t border-border bg-muted/20 flex flex-wrap items-center justify-center gap-6 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-primary border-2 border-white shadow-sm flex items-center justify-center">
                    <svg className="w-2 h-2 text-primary-foreground" viewBox="0 0 76 65" fill="currentColor">
                      <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                    </svg>
                  </div>
                  <span className="text-muted-foreground">Sandbox + Compute (iad1)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary/70 border-2 border-white shadow-sm" />
                  <span className="text-muted-foreground">Compute Only ({vercelRegions.length - 1} regions)</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="aws" className="m-0">
              <AWSMap />
              <div className="p-4 border-t border-border bg-muted/20 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-aws border-2 border-white shadow-sm" />
                  <span className="text-muted-foreground">Full AgentCore ({awsFullStackRegions.length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-chart-3 border-2 border-white shadow-sm" />
                  <span className="text-muted-foreground">Partial ({awsPartialRegions.length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/40 border-2 border-white shadow-sm" />
                  <span className="text-muted-foreground">No AgentCore ({awsNoAgentCoreRegions.length})</span>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        {/* Vercel constraints - updated */}
        <div className="mb-8 p-6 rounded-2xl border border-primary/30 bg-primary/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
              <svg className="w-5 h-5 text-background" viewBox="0 0 76 65" fill="currentColor">
                <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
              </svg>
            </div>
            <h3 className="font-semibold">Vercel Infrastructure Overview</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {vercelConstraints.map((item) => (
              <div key={item.feature}>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{item.feature}</p>
                <p className="font-mono text-sm font-medium">{item.value}</p>
                {item.note && <p className="text-xs text-muted-foreground mt-1">{item.note}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Collapsible AWS Region Matrix */}
        <Collapsible open={matrixOpen} onOpenChange={setMatrixOpen}>
          <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm overflow-hidden">
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between p-6 border-b border-border bg-aws/5 hover:bg-aws/10 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-aws flex items-center justify-center">
                    <span className="text-white font-bold text-sm">A</span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">Bedrock AgentCore Regional Matrix</h3>
                    <p className="text-xs text-muted-foreground">Detailed feature availability across all {awsRegions.length} AWS regions</p>
                  </div>
                </div>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-muted-foreground transition-transform duration-300",
                    matrixOpen && "rotate-180"
                  )}
                />
              </button>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-card">
                      <th className="relative text-left p-4 text-xs font-mono uppercase tracking-wider text-muted-foreground sticky left-0 bg-card z-20 min-w-[160px] after:absolute after:right-0 after:top-0 after:h-full after:w-px after:bg-border">
                        Region
                      </th>
                      {agentcoreFeatures.map((f) => (
                        <th key={f.key} className="p-4 text-xs font-mono uppercase tracking-wider text-muted-foreground text-center min-w-[90px]">
                          <span className={f.required ? 'text-foreground' : ''}>{f.label}</span>
                          {f.required && <span className="text-primary ml-1">*</span>}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {awsRegions.map((region, idx) => {
                      const status = getAgentCoreStatus(region)
                      return (
                        <tr
                          key={region.region}
                          className={cn(
                            "border-b border-border/50 last:border-b-0 transition-colors",
                            idx % 2 === 0 ? "bg-secondary" : "bg-card",
                            status === 'full' ? "hover:bg-aws/10" : 
                            status === 'partial' ? "hover:bg-chart-3/10" : "hover:bg-muted"
                          )}
                        >
                          <td className={cn(
                            "relative p-4 sticky left-0 z-20 after:absolute after:right-0 after:top-0 after:h-full after:w-px after:bg-border/50",
                            idx % 2 === 0 ? "bg-secondary" : "bg-card"
                          )}>
                            <div className="flex items-center gap-2">
                              <span className={cn(
                                "w-2 h-2 rounded-full shrink-0",
                                status === 'full' ? "bg-aws" : 
                                status === 'partial' ? "bg-chart-3" : "bg-muted-foreground/30"
                              )} />
                              <div>
                                <p className="font-mono text-sm">{region.region}</p>
                                <p className="text-xs text-muted-foreground">{region.name}</p>
                              </div>
                            </div>
                          </td>
                          {agentcoreFeatures.map((f) => (
                            <td key={f.key} className="p-4 text-center">
                              {region.agentcore[f.key as keyof typeof region.agentcore] ? (
                                <Check className="w-4 h-4 text-primary mx-auto" />
                              ) : (
                                <Minus className="w-4 h-4 text-muted-foreground/30 mx-auto" />
                              )}
                            </td>
                          ))}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-muted/30 border-t border-border flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-aws" />
                  <span>Full AgentCore stack</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-chart-3" />
                  <span>Partial support</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                  <span>No AgentCore</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">*</span>
                  <span>Required for agent execution</span>
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Regional comparison note */}
        <div className="mt-8 p-6 rounded-2xl bg-card border border-border">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-5 h-5 text-chart-3 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold mb-2">Key Regional Insights</h4>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  <strong className="text-foreground">AWS global reach:</strong>{" "}
                  {awsRegions.length} regions worldwide, but only {awsFullStackRegions.length} have full AgentCore support
                </p>
                <p>
                  <strong className="text-foreground">Vercel compute:</strong>{" "}
                  All {vercelRegions.length} regions support Functions & Fluid Compute; Sandbox limited to iad1 (Beta)
                </p>
                <p>
                  <strong className="text-foreground">Edge distribution:</strong>{" "}
                  Vercel has 126 PoPs for AI Gateway & CDN; AWS Bedrock is region-bound
                </p>
                <p>
                  <strong className="text-foreground">Coverage gaps:</strong>{" "}
                  AgentCore Evaluations in 4 regions only (preview); Many AWS regions have no AgentCore yet
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
