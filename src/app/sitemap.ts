import type { MetadataRoute } from "next";
import { sitemapEntries } from "@/data/seo";

// Every page in `pages` (src/data/seo.ts) is listed. Nothing to edit here.
export default function sitemap(): MetadataRoute.Sitemap {
	return sitemapEntries();
}
