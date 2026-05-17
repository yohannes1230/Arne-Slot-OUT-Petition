import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
      images: [`${SITE_URL}/og-image.png`, `${SITE_URL}/images/arne-slot-main.webp`],
    },
  ];
}
