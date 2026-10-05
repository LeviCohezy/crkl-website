import type { MetadataRoute } from "next";
import { getWineSlugs } from "@/lib/catalog";
import { siteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getWineSlugs();
  const now = new Date();

  return [
    { url: `${siteUrl}/`, lastModified: now, priority: 1 },
    { url: `${siteUrl}/menu`, lastModified: now, priority: 0.9 },
    { url: `${siteUrl}/reserveren`, lastModified: now, priority: 0.9 },
    { url: `${siteUrl}/verhaal`, lastModified: now, priority: 0.7 },
    { url: `${siteUrl}/leveranciers`, lastModified: now, priority: 0.6 },
    { url: `${siteUrl}/wijn`, lastModified: now, priority: 0.6 },
    { url: `${siteUrl}/galerij`, lastModified: now, priority: 0.5 },
    { url: `${siteUrl}/contact`, lastModified: now, priority: 0.7 },
    ...slugs.map((slug) => ({
      url: `${siteUrl}/wijn/${slug}`,
      lastModified: now,
      priority: 0.4,
    })),
  ];
}
