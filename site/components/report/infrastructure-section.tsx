import {
  Activity,
  Bot,
  Code2,
  Database,
  ExternalLink,
  Fingerprint,
  Globe,
  KeyRound,
  Layers,
  Network,
  Server,
  Shield,
  Workflow,
  Wrench,
  Zap,
} from "lucide-react";
import type { InfrastructureData } from "@/data/report-schema";
import { cn } from "@/lib/utils";

// Icon mapping
const iconMap: Record<string, React.ReactNode> = {
  Bot: <Bot className="h-5 w-5" />,
  Server: <Server className="h-5 w-5" />,
  Shield: <Shield className="h-5 w-5" />,
  Activity: <Activity className="h-5 w-5" />,
  Network: <Network className="h-4 w-4" />,
  Wrench: <Wrench className="h-4 w-4" />,
  Code2: <Code2 className="h-4 w-4" />,
  Workflow: <Workflow className="h-4 w-4" />,
  Globe: <Globe className="h-4 w-4" />,
  KeyRound: <KeyRound className="h-4 w-4" />,
  Fingerprint: <Fingerprint className="h-4 w-4" />,
  Database: <Database className="h-4 w-4" />,
};

const getIcon = (name: string, size: "sm" | "md" = "md") => {
  const sizeClass = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  switch (name) {
    case "Bot":
      return <Bot className={sizeClass} />;
    case "Server":
      return <Server className={sizeClass} />;
    case "Shield":
      return <Shield className={sizeClass} />;
    case "Activity":
      return <Activity className={sizeClass} />;
    case "Network":
      return <Network className={sizeClass} />;
    case "Wrench":
      return <Wrench className={sizeClass} />;
    case "Code2":
      return <Code2 className={sizeClass} />;
    case "Workflow":
      return <Workflow className={sizeClass} />;
    case "Globe":
      return <Globe className={sizeClass} />;
    case "KeyRound":
      return <KeyRound className={sizeClass} />;
    case "Fingerprint":
      return <Fingerprint className={sizeClass} />;
    case "Database":
      return <Database className={sizeClass} />;
    default:
      return <Bot className={sizeClass} />;
  }
};

interface InfrastructureSectionProps {
  data: InfrastructureData;
}

export function InfrastructureSection({ data }: InfrastructureSectionProps) {
  return (
    <section className="bg-muted/30 px-6 py-24" id="infrastructure">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16">
          <span className="mb-4 inline-flex items-center gap-2 font-mono text-primary text-xs uppercase tracking-widest">
            <Layers className="h-4 w-4" />
            Section {data.sectionNumber}
          </span>
          <h2 className="mb-4 font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl">
            {data.title}
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            {data.description}
          </p>
        </div>

        {/* Category groups */}
        <div className="space-y-8">
          {data.categoryGroups.map((category) => (
            <div
              className="overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur-sm"
              key={category.name}
            >
              {/* Category header */}
              <div
                className={cn(
                  "border-border border-b bg-gradient-to-r px-6 py-5",
                  category.colorClass
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background/80 text-foreground backdrop-blur">
                    {getIcon(category.iconName)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Scrollable table container */}
              <div className="overflow-x-auto">
                <div className="min-w-[700px]">
                  {/* Table header */}
                  <div className="grid grid-cols-[1.2fr_1fr_1fr] border-border border-b bg-muted/30">
                    <div className="p-4 font-mono text-muted-foreground text-xs uppercase tracking-widest">
                      Capability
                    </div>
                    <div className="border-border border-l p-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-5 w-5 items-center justify-center rounded-md bg-foreground">
                          <svg
                            className="h-3 w-3 text-background"
                            fill="currentColor"
                            viewBox="0 0 76 65"
                          >
                            <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                          </svg>
                        </div>
                        <span className="font-mono text-muted-foreground text-xs uppercase tracking-widest">
                          Vercel
                        </span>
                      </div>
                    </div>
                    <div className="border-border border-l p-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-5 w-5 items-center justify-center rounded-md bg-aws">
                          <span className="font-bold text-[10px] text-white">
                            A
                          </span>
                        </div>
                        <span className="font-mono text-muted-foreground text-xs uppercase tracking-widest">
                          AWS
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Table rows */}
                  {category.rows.map((row) => (
                    <div
                      className="grid grid-cols-[1.2fr_1fr_1fr] border-border border-b last:border-b-0"
                      key={row.capability}
                    >
                      {/* Capability column */}
                      <div className="p-4 sm:p-5">
                        <div className="flex items-start gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                            {getIcon(row.iconName, "sm")}
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="font-medium text-sm">
                              {row.capability}
                            </span>
                            <p className="mt-1 text-muted-foreground text-xs leading-relaxed">
                              {row.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Vercel column */}
                      <div className="border-border border-l p-4 sm:p-5">
                        <p className="font-medium text-foreground text-sm">
                          {row.vercel.text}
                        </p>
                        <div className="mt-2 space-y-2">
                          {row.vercel.detail && (
                            <p className="text-muted-foreground text-xs leading-relaxed">
                              {row.vercel.detail}
                            </p>
                          )}
                          {row.vercel.link && (
                            <a
                              className="inline-flex items-center gap-1 text-primary text-xs hover:underline"
                              href={row.vercel.link}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              Documentation <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* AWS column */}
                      <div className="border-border border-l p-4 sm:p-5">
                        <p className="font-medium text-foreground text-sm">
                          {row.aws.text}
                        </p>
                        <div className="mt-2 space-y-2">
                          {row.aws.detail && (
                            <p className="text-muted-foreground text-xs leading-relaxed">
                              {row.aws.detail}
                            </p>
                          )}
                          {row.aws.link && (
                            <a
                              className="inline-flex items-center gap-1 text-primary text-xs hover:underline"
                              href={row.aws.link}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              Documentation <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Key insight */}
        <div className="mt-4 rounded-2xl border border-border bg-card/60 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="mb-1 font-semibold">{data.keyInsight.title}</h4>
              <p className="text-muted-foreground text-sm">
                {data.keyInsight.codeHighlight && (
                  <>
                    <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                      {data.keyInsight.codeHighlight}
                    </code>{" "}
                  </>
                )}
                {data.keyInsight.description
                  .split("Strands SDK")
                  .map((part, i, arr) =>
                    i < arr.length - 1 ? (
                      <span key={i}>
                        {part.includes("infrastructure wrapper") ? (
                          <>
                            is the{" "}
                            <strong className="text-foreground">
                              infrastructure wrapper
                            </strong>
                            , NOT the agent framework. Agent logic uses{" "}
                          </>
                        ) : (
                          part
                        )}
                        <strong className="text-foreground">Strands SDK</strong>
                      </span>
                    ) : (
                      <span key={i}>{part}</span>
                    )
                  )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
