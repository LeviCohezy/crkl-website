import type { MetadataRoute } from "next";
import { getWineSlugs } from "@/lib/catalog";
import { siteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getWineSlugs();
  const now = new Date();

  return [
    { url: `${siteUrl}/`, lastModified: now, priority: 1 },
    { url: `${siteUrl}/wines`, lastModified: now, priority: 0.9 },
    { url: `${siteUrl}/about`, lastModified: now, priority: 0.7 },
    { url: `${siteUrl}/contact`, lastModified: now, priority: 0.6 },
    ...slugs.map((slug) => ({
      url: `${siteUrl}/wines/${slug}`,
      lastModified: now,
      priority: 0.8,
    })),
  ];
}
