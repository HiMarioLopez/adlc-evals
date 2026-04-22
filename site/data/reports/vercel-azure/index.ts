import type { AzureReport } from "@/data/report-schema.ts";
import { adoptionData } from "./adoption.ts";
import { codeData } from "./code.ts";
import { deltaData } from "./delta.ts";
import { deploymentData } from "./deployment.ts";
import { footerData } from "./footer.ts";
import { heroData } from "./hero.ts";
import { infrastructureData } from "./infrastructure.ts";
import { metadata as reportMetadata } from "./metadata.ts";
import { pricingData } from "./pricing.ts";
import { regionsData } from "./regions.ts";
import { sections as reportSections } from "./sections.ts";

export const vercelAzureReport: AzureReport = {
  metadata: reportMetadata,
  sections: reportSections,
  hero: heroData,
  infrastructure: infrastructureData,
  pricing: pricingData,
  code: codeData,
  deployment: deploymentData,
  regions: regionsData,
  adoption: adoptionData,
  delta: deltaData,
  footer: footerData,
};

export { metadata, platforms } from "./metadata.ts";
export { sections } from "./sections.ts";
