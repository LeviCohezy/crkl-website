import type { MetadataRoute } from "next";
import { getProductSlugs } from "@/lib/catalog";
import { site, siteUrl } from "@/lib/site";

/** Cart, checkout, account and the draft legal pages are left out on purpose. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getProductSlugs();
  const now = new Date();
  const pages = [...site.nav, ...site.more, ...site.credentials];

  return [
    { url: `${siteUrl}/`, lastModified: now, priority: 1 },
    ...pages.map((page) => ({
      url: `${siteUrl}${page.href}`,
      lastModified: now,
      priority: 0.8,
    })),
    ...slugs.map((slug) => ({
      url: `${siteUrl}/shop/${slug}`,
      lastModified: now,
      priority: 0.5,
    })),
  ];
}
