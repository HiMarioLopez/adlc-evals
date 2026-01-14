import type { MetadataRoute } from "next";

const BASE_URL = "https://adlc-evals.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/reports/vercel-aws`,
      lastModified: new Date("2026-01-08"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
