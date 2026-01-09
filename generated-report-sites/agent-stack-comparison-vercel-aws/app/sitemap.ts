import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://agent-stack-comparison.vercel.app",
      lastModified: new Date("2026-01-08"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
