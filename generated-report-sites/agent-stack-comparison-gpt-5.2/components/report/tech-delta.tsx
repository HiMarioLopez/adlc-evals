"use client"

import { ArrowRight, ExternalLink } from "lucide-react"

interface DeltaItem {
  title: string
  changes: string[]
  source?: string
}

const vercelDeltas: DeltaItem[] = [
  {
    title: "AI SDK v5 → v6",
    changes: [
      "Agent abstraction consolidated around ToolLoopAgent",
      "stopWhen defaults to stepCountIs(20)",
      "system renamed to instructions",
      "Loop control moved server-side",
      "Per-step timeouts for generateText and streamText",
    ],
    source: "https://github.com/vercel/ai/blob/main/content/docs/08-migration-guides/24-migration-guide-6-0.mdx",
  },
]

const awsDeltas: DeltaItem[] = [
  {
    title: "AgentCore Preview → GA",
    changes: [
      "Consumption-based pricing now public",
      "Runtime lifecycle settings finalized",
      "MicroVM-per-session architecture",
      "Up to 8h maxLifetime support",
    ],
    source: "https://aws.amazon.com/bedrock/agentcore/pricing/",
  },
  {
    title: "Strands Agents v1.21.0",
    changes: [
      "Agent framework SDK release",
      "Tools and model providers integration",
      "Python SDK primary interface",
    ],
    source: "https://github.com/strands-agents/sdk-python/releases/tag/v1.21.0",
  },
]

export function TechDelta() {
  return (
    <section className="py-24 px-6 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <span className="text-xs font-mono text-primary uppercase tracking-widest">Section 1</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">2026 Technical Delta</h2>
          <p className="text-muted-foreground max-w-2xl">
            Key changes since the previous comparison. What&apos;s new in each stack.
          </p>
        </div>

        {/* Delta cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Vercel */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-vercel/10 flex items-center justify-center">
                <svg viewBox="0 0 76 65" className="w-5 h-5 fill-vercel">
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-vercel">Vercel Changes</h3>
            </div>
            <div className="space-y-6">
              {vercelDeltas.map((delta) => (
                <div key={delta.title} className="border border-border rounded-lg bg-card/50 backdrop-blur-sm p-6">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    {delta.title}
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </h4>
                  <ul className="space-y-2">
                    {delta.changes.map((change, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-1">•</span>
                        {change}
                      </li>
                    ))}
                  </ul>
                  {delta.source && (
                    <a
                      href={delta.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-4"
                    >
                      Source <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* AWS */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-aws/10 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-aws">
                  <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.296.072-.583.16-.863.272a2.04 2.04 0 0 1-.248.104.39.39 0 0 1-.096.016c-.088 0-.128-.064-.128-.2v-.392c0-.104.016-.184.056-.232a.61.61 0 0 1 .216-.128c.28-.144.616-.264 1.007-.36.392-.096.807-.144 1.247-.144.95 0 1.644.216 2.091.647.44.431.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.111 0-.184-.016-.232-.056-.047-.032-.088-.12-.127-.239l-1.42-4.67a1.67 1.67 0 0 1-.064-.39c0-.152.08-.24.239-.24h.686c.12 0 .2.016.24.056.047.032.08.12.119.239l1.016 4.006 .943-4.006c.032-.127.072-.207.12-.24.047-.031.135-.055.247-.055h.558c.12 0 .2.016.248.056.047.032.088.12.12.239l.95 4.054 1.048-4.054c.04-.127.08-.207.12-.24.047-.031.127-.055.238-.055h.654c.16 0 .24.08.24.239 0 .047-.009.095-.017.151a1.15 1.15 0 0 1-.055.24l-1.46 4.67c-.04.127-.08.207-.128.24-.047.031-.135.055-.231.055h-.6c-.12 0-.2-.016-.248-.064-.047-.04-.088-.12-.12-.239l-.93-3.903-.926 3.895c-.032.127-.072.207-.12.247-.047.04-.136.056-.248.056h-.6zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.919-.32-.127-.071-.216-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.136.056-.2.152-.2a.39.39 0 0 1 .12.016c.04.008.096.032.168.064.231.103.479.184.727.24.256.055.503.08.758.08.4 0 .71-.072.926-.215.216-.144.328-.352.328-.63a.664.664 0 0 0-.183-.479c-.12-.128-.344-.24-.658-.351l-.948-.304c-.472-.152-.822-.375-1.037-.671-.215-.296-.328-.631-.328-.999 0-.288.063-.544.192-.768.128-.224.296-.415.503-.567.208-.152.447-.264.727-.344.28-.08.575-.12.886-.12.16 0 .32.008.48.032.167.024.32.056.471.088.144.04.28.08.416.128.127.048.224.096.287.144a.612.612 0 0 1 .16.192.488.488 0 0 1 .047.231v.376c0 .136-.055.2-.152.2-.055 0-.135-.024-.24-.08a5.12 5.12 0 0 0-1.229-.31c-.36 0-.647.056-.854.168-.208.112-.312.296-.312.553 0 .168.064.328.2.471.136.144.384.288.75.415l.918.296c.464.152.807.368 1.015.639.208.272.312.575.312.91 0 .296-.064.56-.184.8-.12.24-.288.448-.504.608-.216.168-.471.288-.775.368a3.67 3.67 0 0 1-.983.128z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-aws">AWS Changes</h3>
            </div>
            <div className="space-y-6">
              {awsDeltas.map((delta) => (
                <div key={delta.title} className="border border-border rounded-lg bg-card/50 backdrop-blur-sm p-6">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    {delta.title}
                    <ArrowRight className="w-4 h-4 text-aws" />
                  </h4>
                  <ul className="space-y-2">
                    {delta.changes.map((change, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-aws mt-1">•</span>
                        {change}
                      </li>
                    ))}
                  </ul>
                  {delta.source && (
                    <a
                      href={delta.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-4"
                    >
                      Source <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
