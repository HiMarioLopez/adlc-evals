"use client";

import {
  AlertCircle,
  Check,
  ChevronDown,
  Cpu,
  Globe,
  Loader2,
  Minus,
  Server,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import type {
  AzureRegionalData,
  AzureRegionData,
  VercelAzureRegionData,
} from "@/data/report-schema.ts";
import { cn } from "@/lib/utils.ts";

type FoundryStatus = "full" | "partial" | "none";

function getFoundryStatus(region: AzureRegionData): FoundryStatus {
  const f = region.foundry;
  const hasFullStack =
    f.agentService && f.hostedAgents && f.codeInterpreter && f.fileSearch;
  const hasAny =
    f.agentService ||
    f.hostedAgents ||
    f.codeInterpreter ||
    f.fileSearch ||
    f.computerUse ||
    f.webSearch;

  if (hasFullStack) {
    return "full";
  }
  if (hasAny) {
    return "partial";
  }
  return "none";
}

function MapLoadingPlaceholder() {
  return (
    <div className="flex h-[420px] items-center justify-center bg-muted/20">
      <div className="flex flex-col items-center gap-3 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="text-sm">Loading map...</span>
      </div>
    </div>
  );
}

// Azure color used via inline style (Tailwind JIT cannot generate dynamic
// `bg-azure/20` classes at build time; inline style is the safe pattern for
// per-report platform color tokens).
const AZURE_COLOR = "#0078D4";

const STATUS_Z_INDEX: Record<FoundryStatus, string> = {
  full: "z-20",
  partial: "z-15",
  none: "z-10",
};

const STATUS_DOT_CLASS: Record<FoundryStatus, string> = {
  full: "h-4 w-4",
  partial: "h-3.5 w-3.5 bg-chart-3",
  none: "h-3 w-3 bg-muted-foreground/40",
};

const STATUS_TOOLTIP_DOT: Record<FoundryStatus, string> = {
  full: "",
  partial: "bg-chart-3",
  none: "bg-muted-foreground/40",
};

function FeaturePill({
  feature,
  enabled,
}: {
  feature: { key: string; label: string };
  enabled: boolean;
}) {
  return (
    <span
      className={cn(
        "rounded px-1.5 py-0.5 text-[10px]",
        enabled
          ? "font-medium"
          : "bg-muted text-muted-foreground/60 line-through decoration-muted-foreground/40"
      )}
      style={
        enabled
          ? { backgroundColor: `${AZURE_COLOR}26`, color: AZURE_COLOR }
          : undefined
      }
    >
      {feature.label}
    </span>
  );
}

function StatusLabel({ status }: { status: FoundryStatus }) {
  if (status === "full") {
    return (
      <p
        className="mt-2 font-medium text-[10px]"
        style={{ color: AZURE_COLOR }}
      >
        Full Foundry stack available
      </p>
    );
  }
  if (status === "partial") {
    return (
      <p className="mt-2 font-medium text-[10px] text-chart-3">
        Partial Foundry support
      </p>
    );
  }
  return null;
}

function AzureRegionMarker({
  region,
  features,
  MapMarker,
  MarkerContent,
  MarkerTooltip,
}: {
  region: AzureRegionData;
  features: { key: string; label: string; required: boolean }[];
  MapMarker: typeof import("@/components/ui/map").MapMarker;
  MarkerContent: typeof import("@/components/ui/map").MarkerContent;
  MarkerTooltip: typeof import("@/components/ui/map").MarkerTooltip;
}) {
  const status = getFoundryStatus(region);
  const isFull = status === "full";
  const fullStyle = isFull ? { backgroundColor: AZURE_COLOR } : undefined;

  return (
    <MapMarker
      latitude={region.coordinates[1]}
      longitude={region.coordinates[0]}
    >
      <MarkerContent>
        <div
          className={cn(
            "relative flex items-center justify-center transition-transform hover:scale-110",
            STATUS_Z_INDEX[status]
          )}
        >
          {isFull && (
            <div
              className="absolute h-8 w-8 animate-pulse rounded-full"
              style={{ backgroundColor: `${AZURE_COLOR}33` }}
            />
          )}
          <div
            className={cn(
              "rounded-full border-2 border-white shadow-lg",
              STATUS_DOT_CLASS[status]
            )}
            style={fullStyle}
          />
        </div>
      </MarkerContent>
      <MarkerTooltip className="min-w-[200px] rounded-lg border border-border bg-popover px-3 py-2.5 text-popover-foreground shadow-lg">
        <div className="mb-1.5 flex items-center gap-2">
          <span
            className={cn("h-2 w-2 rounded-full", STATUS_TOOLTIP_DOT[status])}
            style={fullStyle}
          />
          <span className="font-semibold text-sm">{region.name}</span>
        </div>
        <p className="mb-2 font-mono text-[11px] text-muted-foreground">
          {region.region}
        </p>

        {status === "none" ? (
          <p className="text-[10px] text-muted-foreground">
            No Foundry Agent Service in this region
          </p>
        ) : (
          <div className="flex flex-wrap gap-1">
            {features.map((f) => (
              <FeaturePill
                enabled={region.foundry[f.key as keyof typeof region.foundry]}
                feature={f}
                key={f.key}
              />
            ))}
          </div>
        )}

        <StatusLabel status={status} />
      </MarkerTooltip>
    </MapMarker>
  );
}

function AzureMapLazy({
  regions,
  features,
}: {
  regions: AzureRegionData[];
  features: { key: string; label: string; required: boolean }[];
}) {
  const [MapModule, setMapModule] = useState<
    typeof import("@/components/ui/map") | null
  >(null);

  useEffect(() => {
    import("@/components/ui/map.tsx").then(setMapModule);
  }, []);

  if (!MapModule) {
    return <MapLoadingPlaceholder />;
  }

  const { Map, MapMarker, MarkerContent, MarkerTooltip, MapControls } =
    MapModule;

  return (
    <div className="relative h-[420px]">
      <Map center={[20, 25]} maxZoom={6} minZoom={1} zoom={1.3}>
        <MapControls position="bottom-right" showZoom={true} />
        {regions.map((region) => (
          <AzureRegionMarker
            features={features}
            key={region.region}
            MapMarker={MapMarker}
            MarkerContent={MarkerContent}
            MarkerTooltip={MarkerTooltip}
            region={region}
          />
        ))}
      </Map>
    </div>
  );
}

function VercelMapLazy({ regions }: { regions: VercelAzureRegionData[] }) {
  const [MapModule, setMapModule] = useState<
    typeof import("@/components/ui/map") | null
  >(null);

  useEffect(() => {
    import("@/components/ui/map.tsx").then(setMapModule);
  }, []);

  if (!MapModule) {
    return <MapLoadingPlaceholder />;
  }

  const { Map, MapMarker, MarkerContent, MarkerTooltip, MapControls } =
    MapModule;

  return (
    <div className="relative h-[420px]">
      <Map center={[20, 25]} maxZoom={6} minZoom={1} zoom={1.3}>
        <MapControls position="bottom-right" showZoom={true} />
        {regions.map((region) => (
          <MapMarker
            key={region.code}
            latitude={region.coordinates[1]}
            longitude={region.coordinates[0]}
          >
            <MarkerContent>
              <div
                className={cn(
                  "relative flex items-center justify-center transition-transform hover:scale-110",
                  region.hasSandbox ? "z-30" : "z-10"
                )}
              >
                {region.hasSandbox && (
                  <>
                    <div className="absolute h-10 w-10 animate-pulse rounded-full bg-primary/10" />
                    <div className="absolute h-7 w-7 animate-pulse rounded-full bg-primary/20 [animation-delay:150ms]" />
                  </>
                )}
                <div
                  className={cn(
                    "flex items-center justify-center rounded-full border-2 border-white shadow-lg",
                    region.hasSandbox
                      ? "h-5 w-5 bg-primary"
                      : "h-3.5 w-3.5 bg-primary/70"
                  )}
                >
                  {region.hasSandbox && (
                    <svg
                      className="h-2.5 w-2.5 text-primary-foreground"
                      fill="currentColor"
                      viewBox="0 0 76 65"
                    >
                      <title>Vercel</title>
                      <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                    </svg>
                  )}
                </div>
              </div>
            </MarkerContent>
            <MarkerTooltip className="min-w-[180px] rounded-lg border border-border bg-popover px-3 py-2.5 text-popover-foreground shadow-lg">
              <div className="mb-1 flex items-center gap-2">
                <svg
                  className="h-3 w-3"
                  fill="currentColor"
                  viewBox="0 0 76 65"
                >
                  <title>Vercel</title>
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                </svg>
                <span className="font-semibold text-sm">{region.name}</span>
              </div>
              <p className="mb-2 font-mono text-[11px] text-muted-foreground">
                {region.code} ({region.azureRegion})
              </p>
              <div className="flex flex-wrap gap-1">
                <span className="rounded bg-muted px-1.5 py-0.5 text-[10px]">
                  Functions
                </span>
                <span className="rounded bg-muted px-1.5 py-0.5 text-[10px]">
                  Fluid Compute
                </span>
                {region.hasSandbox && (
                  <span className="rounded bg-primary/15 px-1.5 py-0.5 font-medium text-[10px] text-primary">
                    Sandbox
                  </span>
                )}
              </div>
              {region.hasSandbox && (
                <p className="mt-2 text-[10px] text-muted-foreground">
                  Only region with Sandbox (GA)
                </p>
              )}
            </MarkerTooltip>
          </MapMarker>
        ))}
      </Map>
    </div>
  );
}

interface AzureRegionalSectionProps {
  data: AzureRegionalData;
}

export function AzureRegionalSection({ data }: AzureRegionalSectionProps) {
  const [matrixOpen, setMatrixOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("azure");

  const azureFullStack = data.azureRegions.filter(
    (r) => getFoundryStatus(r) === "full"
  );
  const azurePartial = data.azureRegions.filter(
    (r) => getFoundryStatus(r) === "partial"
  );
  const azureNone = data.azureRegions.filter(
    (r) => getFoundryStatus(r) === "none"
  );

  return (
    <section className="bg-muted/30 px-6 py-24" id="regions">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <span className="mb-4 inline-flex items-center gap-2 font-mono text-primary text-xs uppercase tracking-widest">
            <Globe className="h-4 w-4" />
            Section {data.sectionNumber}
          </span>
          <h2 className="mb-4 font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl">
            {data.title}
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            {data.description}
          </p>
        </div>

        <div className="mb-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-card p-5 text-center">
            <p
              className="font-bold font-mono text-3xl"
              style={{ color: AZURE_COLOR }}
            >
              {data.azureRegions.length}
            </p>
            <p className="mt-1 text-muted-foreground text-xs">
              Azure Regions Tracked
            </p>
          </div>
          <div
            className="rounded-2xl border bg-card p-5 text-center"
            style={{ borderColor: `${AZURE_COLOR}4D` }}
          >
            <p
              className="font-bold font-mono text-3xl"
              style={{ color: AZURE_COLOR }}
            >
              {azureFullStack.length}
            </p>
            <p className="mt-1 text-muted-foreground text-xs">
              Foundry Full Stack
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 text-center">
            <p className="font-bold font-mono text-3xl text-primary">
              {data.vercelRegions.length}
            </p>
            <p className="mt-1 text-muted-foreground text-xs">
              Vercel Compute Regions
            </p>
          </div>
          <div className="rounded-2xl border border-primary/30 bg-card p-5 text-center">
            <p className="font-bold font-mono text-3xl text-primary">
              {data.vercelEdgePops}
            </p>
            <p className="mt-1 text-muted-foreground text-xs">
              Vercel Edge PoPs
            </p>
          </div>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <div
            className="rounded-xl border p-4"
            style={{
              borderColor: `${AZURE_COLOR}33`,
              backgroundColor: `${AZURE_COLOR}0D`,
            }}
          >
            <div className="mb-3 flex items-center gap-2">
              <Cpu className="h-4 w-4" style={{ color: AZURE_COLOR }} />
              <span className="font-medium text-sm">
                Azure Foundry Availability
              </span>
            </div>
            <div className="space-y-2 text-xs">
              <p className="flex items-start gap-2">
                <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-chart-3/20 text-chart-3">
                  <AlertCircle className="h-2.5 w-2.5" />
                </span>
                <span>
                  <strong className="text-chart-3">Full Stack:</strong>{" "}
                  <span className="text-muted-foreground">
                    {azureFullStack.length} of {data.azureRegions.length} Azure
                    regions tracked
                  </span>
                </span>
              </p>
              <p className="flex items-start gap-2">
                <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-muted">
                  <Minus className="h-2.5 w-2.5 text-muted-foreground" />
                </span>
                <span>
                  <strong className="text-muted-foreground">
                    Partial Support:
                  </strong>{" "}
                  <span className="text-muted-foreground">
                    {azurePartial.length} regions (missing Code Interp / File
                    Search)
                  </span>
                </span>
              </p>
              <p className="flex items-start gap-2">
                <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-destructive/20 text-destructive">
                  <AlertCircle className="h-2.5 w-2.5" />
                </span>
                <span>
                  <strong className="text-destructive">
                    No Agent Service:
                  </strong>{" "}
                  <span className="text-muted-foreground">
                    {azureNone.length} regions (North Europe, West Europe,
                    Central India)
                  </span>
                </span>
              </p>
              <p className="flex items-start gap-2">
                <span
                  className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: `${AZURE_COLOR}33`,
                    color: AZURE_COLOR,
                  }}
                >
                  <AlertCircle className="h-2.5 w-2.5" />
                </span>
                <span>
                  <strong style={{ color: AZURE_COLOR }}>
                    Computer Use (Preview):
                  </strong>{" "}
                  <span className="text-muted-foreground">
                    2 regions only (East US 2, South India)
                  </span>
                </span>
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
            <div className="mb-3 flex items-center gap-2">
              <Server className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">
                Vercel Service Availability
              </span>
            </div>
            <div className="space-y-2 text-xs">
              <p className="flex items-start gap-2">
                <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <Check className="h-2.5 w-2.5" />
                </span>
                <span>
                  <strong className="text-primary">
                    Functions & Fluid Compute:
                  </strong>{" "}
                  <span className="text-muted-foreground">
                    All {data.vercelRegions.length} regions
                  </span>
                </span>
              </p>
              <p className="flex items-start gap-2">
                <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <Check className="h-2.5 w-2.5" />
                </span>
                <span>
                  <strong className="text-primary">AI Gateway:</strong>{" "}
                  <span className="text-muted-foreground">
                    Global ({data.vercelEdgePops} PoPs)
                  </span>
                </span>
              </p>
              <p className="flex items-start gap-2">
                <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <Check className="h-2.5 w-2.5" />
                </span>
                <span>
                  <strong className="text-primary">Workflow SDK:</strong>{" "}
                  <span className="text-muted-foreground">All regions</span>
                </span>
              </p>
              <p className="flex items-start gap-2">
                <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-chart-3/20 text-chart-3">
                  <AlertCircle className="h-2.5 w-2.5" />
                </span>
                <span>
                  <strong className="text-chart-3">Sandbox SDK:</strong>{" "}
                  <span className="text-muted-foreground">iad1 only (GA)</span>
                </span>
              </p>
            </div>
          </div>
        </div>

        <Tabs className="mb-8" onValueChange={setActiveTab} value={activeTab}>
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="flex items-center justify-between border-border border-b bg-muted/30 p-4 sm:p-5">
              <TabsList className="grid w-full max-w-md grid-cols-2 bg-background/50">
                <TabsTrigger
                  className="gap-2 data-[state=active]:text-white"
                  style={
                    activeTab === "azure"
                      ? { backgroundColor: AZURE_COLOR }
                      : undefined
                  }
                  value="azure"
                >
                  <span
                    className="flex h-5 w-5 items-center justify-center rounded font-bold text-[10px]"
                    style={{
                      backgroundColor:
                        activeTab === "azure"
                          ? "#ffffff33"
                          : `${AZURE_COLOR}33`,
                    }}
                  >
                    Az
                  </span>
                  <span className="hidden sm:inline">Azure</span>
                  <span
                    className="ml-1 rounded-full px-1.5 py-0.5 text-[10px]"
                    style={{
                      backgroundColor:
                        activeTab === "azure"
                          ? "#ffffff33"
                          : `${AZURE_COLOR}33`,
                    }}
                  >
                    {data.azureRegions.length}
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  className="gap-2 data-[state=active]:bg-foreground data-[state=active]:text-background"
                  value="vercel"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 76 65"
                  >
                    <title>Vercel</title>
                    <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                  </svg>
                  <span className="hidden sm:inline">Vercel</span>
                  <span className="ml-1 rounded-full bg-primary/20 px-1.5 py-0.5 text-[10px] data-[state=active]:bg-white/20">
                    {data.vercelRegions.length}
                  </span>
                </TabsTrigger>
              </TabsList>

              <p className="hidden text-muted-foreground text-xs md:block">
                Hover over markers for details
              </p>
            </div>

            <TabsContent className="m-0" value="vercel">
              {activeTab === "vercel" && (
                <VercelMapLazy regions={data.vercelRegions} />
              )}
              <div className="flex flex-wrap items-center justify-center gap-6 border-border border-t bg-muted/20 p-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-primary shadow-sm">
                    <svg
                      className="h-2 w-2 text-primary-foreground"
                      fill="currentColor"
                      viewBox="0 0 76 65"
                    >
                      <title>Vercel</title>
                      <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                    </svg>
                  </div>
                  <span className="text-muted-foreground">
                    Sandbox + Compute (iad1)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full border-2 border-white bg-primary/70 shadow-sm" />
                  <span className="text-muted-foreground">
                    Compute Only ({data.vercelRegions.length - 1} regions)
                  </span>
                </div>
              </div>
            </TabsContent>

            <TabsContent className="m-0" value="azure">
              {activeTab === "azure" && (
                <AzureMapLazy
                  features={data.foundryFeatures}
                  regions={data.azureRegions}
                />
              )}
              <div className="flex flex-wrap items-center justify-center gap-4 border-border border-t bg-muted/20 p-4 text-xs sm:gap-6">
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: AZURE_COLOR }}
                  />
                  <span className="text-muted-foreground">
                    Full Foundry ({azureFullStack.length})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full border-2 border-white bg-chart-3 shadow-sm" />
                  <span className="text-muted-foreground">
                    Partial ({azurePartial.length})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full border-2 border-white bg-muted-foreground/40 shadow-sm" />
                  <span className="text-muted-foreground">
                    No Agent Service ({azureNone.length})
                  </span>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <Collapsible className="mb-8">
          <div className="overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur-sm">
            <CollapsibleTrigger asChild>
              <button
                className="group flex w-full items-center justify-between border-border border-b bg-primary/5 p-6 transition-colors hover:bg-primary/10"
                type="button"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
                    <svg
                      className="h-5 w-5 text-background"
                      fill="currentColor"
                      viewBox="0 0 76 65"
                    >
                      <title>Vercel</title>
                      <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">Vercel Compute Regions</h3>
                    <p className="text-muted-foreground text-xs">
                      Feature availability across all{" "}
                      {data.vercelRegions.length} compute regions
                    </p>
                  </div>
                </div>
                <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-180" />
              </button>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-border border-b bg-card">
                      <th className="relative sticky left-0 z-20 min-w-[100px] bg-card p-4 text-left font-mono text-muted-foreground text-xs uppercase tracking-wider after:absolute after:top-0 after:right-0 after:h-full after:w-px after:bg-border">
                        Region
                      </th>
                      <th className="min-w-[180px] p-4 text-left font-mono text-muted-foreground text-xs uppercase tracking-wider">
                        Location
                      </th>
                      <th className="min-w-[140px] p-4 text-left font-mono text-muted-foreground text-xs uppercase tracking-wider">
                        Closest Azure
                      </th>
                      {data.vercelFeatures.map((f) => (
                        <th
                          className="min-w-[90px] p-4 text-center font-mono text-muted-foreground text-xs uppercase tracking-wider"
                          key={f.key}
                        >
                          {f.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.vercelRegions.map((region, idx) => (
                      <tr
                        className={cn(
                          "border-border/50 border-b transition-colors last:border-b-0",
                          idx % 2 === 0 ? "bg-secondary" : "bg-card",
                          region.hasSandbox
                            ? "hover:bg-primary/10"
                            : "hover:bg-muted"
                        )}
                        key={region.code}
                      >
                        <td
                          className={cn(
                            "relative sticky left-0 z-20 p-4 after:absolute after:top-0 after:right-0 after:h-full after:w-px after:bg-border/50",
                            idx % 2 === 0 ? "bg-secondary" : "bg-card"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                "h-2 w-2 shrink-0 rounded-full",
                                region.hasSandbox
                                  ? "bg-primary"
                                  : "bg-primary/50"
                              )}
                            />
                            <span className="font-medium font-mono text-sm">
                              {region.code}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-sm">{region.name}</td>
                        <td className="p-4 font-mono text-muted-foreground text-xs">
                          {region.azureRegion}
                        </td>
                        <td className="p-4 text-center">
                          <Check className="mx-auto h-4 w-4 text-primary" />
                        </td>
                        <td className="p-4 text-center">
                          <Check className="mx-auto h-4 w-4 text-primary" />
                        </td>
                        <td className="p-4 text-center">
                          {region.hasSandbox ? (
                            <Check className="mx-auto h-4 w-4 text-primary" />
                          ) : (
                            <Minus className="mx-auto h-4 w-4 text-muted-foreground/30" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-wrap items-center gap-4 border-border border-t bg-muted/30 p-4 text-muted-foreground text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span>Sandbox enabled (iad1)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary/50" />
                  <span>
                    Compute only ({data.vercelRegions.length - 1} regions)
                  </span>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <span className="text-muted-foreground">
                    + {data.vercelEdgePops} Edge PoPs globally for CDN & AI
                    Gateway
                  </span>
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        <Collapsible onOpenChange={setMatrixOpen} open={matrixOpen}>
          <div className="overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur-sm">
            <CollapsibleTrigger asChild>
              <button
                className="group flex w-full items-center justify-between border-border border-b p-6 transition-colors"
                style={{ backgroundColor: `${AZURE_COLOR}0D` }}
                type="button"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ backgroundColor: AZURE_COLOR }}
                  >
                    <span className="font-bold text-sm text-white">Az</span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">
                      Microsoft Foundry Agent Service Regional Matrix
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      Detailed feature availability across{" "}
                      {data.azureRegions.length} Azure regions tracked
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-muted-foreground transition-transform duration-300",
                    matrixOpen && "rotate-180"
                  )}
                />
              </button>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-border border-b bg-card">
                      <th className="relative sticky left-0 z-20 min-w-[200px] bg-card p-4 text-left font-mono text-muted-foreground text-xs uppercase tracking-wider after:absolute after:top-0 after:right-0 after:h-full after:w-px after:bg-border">
                        Region
                      </th>
                      {data.foundryFeatures.map((f) => (
                        <th
                          className="min-w-[100px] p-4 text-center font-mono text-muted-foreground text-xs uppercase tracking-wider"
                          key={f.key}
                        >
                          <span className={f.required ? "text-foreground" : ""}>
                            {f.label}
                          </span>
                          {f.required && (
                            <span className="ml-1 text-primary">*</span>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.azureRegions.map((region, idx) => {
                      const status = getFoundryStatus(region);
                      return (
                        <tr
                          className={cn(
                            "border-border/50 border-b transition-colors last:border-b-0",
                            idx % 2 === 0 ? "bg-secondary" : "bg-card",
                            status === "full"
                              ? ""
                              : status === "partial"
                                ? "hover:bg-chart-3/10"
                                : "hover:bg-muted"
                          )}
                          key={region.region}
                        >
                          <td
                            className={cn(
                              "relative sticky left-0 z-20 p-4 after:absolute after:top-0 after:right-0 after:h-full after:w-px after:bg-border/50",
                              idx % 2 === 0 ? "bg-secondary" : "bg-card"
                            )}
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className={cn(
                                  "h-2 w-2 shrink-0 rounded-full",
                                  status === "full"
                                    ? ""
                                    : status === "partial"
                                      ? "bg-chart-3"
                                      : "bg-muted-foreground/30"
                                )}
                                style={
                                  status === "full"
                                    ? { backgroundColor: AZURE_COLOR }
                                    : undefined
                                }
                              />
                              <div>
                                <p className="font-mono text-sm">
                                  {region.region}
                                </p>
                                <p className="text-muted-foreground text-xs">
                                  {region.name}
                                </p>
                              </div>
                            </div>
                          </td>
                          {data.foundryFeatures.map((f) => (
                            <td className="p-4 text-center" key={f.key}>
                              {region.foundry[
                                f.key as keyof typeof region.foundry
                              ] ? (
                                <Check className="mx-auto h-4 w-4 text-primary" />
                              ) : (
                                <Minus className="mx-auto h-4 w-4 text-muted-foreground/30" />
                              )}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-wrap items-center gap-4 border-border border-t bg-muted/30 p-4 text-muted-foreground text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: AZURE_COLOR }}
                  />
                  <span>Full Foundry stack</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-chart-3" />
                  <span>Partial support</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                  <span>No Agent Service</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">*</span>
                  <span>Required for agent execution</span>
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      </div>
    </section>
  );
}
