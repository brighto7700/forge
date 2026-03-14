import { MetadataRoute } from "next";
import { getAllGuides } from "../lib/guides";
import { createStaticClient } from "../lib/supabase/static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://forge.brgt.site";

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/vault`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/guides`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/configurator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  // Guide routes from MDX files
  const guides = getAllGuides();
  const guideRoutes: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: new Date(guide.updatedAt ?? guide.publishedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Script routes from Supabase
  let scriptRoutes: MetadataRoute.Sitemap = [];
  try {
    const supabase = createStaticClient();
    const { data } = await supabase.from("scripts").select("slug, created_at");
    if (data) {
      scriptRoutes = data.map((script: { slug: string; created_at: string }) => ({
        url: `${baseUrl}/vault/${script.slug}`,
        lastModified: new Date(script.created_at),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
    }
  } catch {
    console.error("Sitemap: failed to fetch scripts");
  }

  return [...staticRoutes, ...guideRoutes, ...scriptRoutes];
      }
          
