import type { Report } from "@/data/report-schema";
import { adoptionData } from "./adoption";
import { codeData } from "./code";
import { deltaData } from "./delta";
import { deploymentData } from "./deployment";
import { footerData } from "./footer";
import { heroData } from "./hero";
import { infrastructureData } from "./infrastructure";
import { metadata, platforms } from "./metadata";
import { pricingData } from "./pricing";
import { regionsData } from "./regions";
import { sections } from "./sections";

export const vercelAwsReport: Report = {
  metadata,
  sections,
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

export { metadata, platforms, sections };
