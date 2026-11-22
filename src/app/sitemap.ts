import type { MetadataRoute } from "next";
import { sitemapEntries } from "@/data/seo";
import { posts } from "@/data/posts";

// Every page in `pages` (src/data/seo.ts) and every post is listed.
// Nothing to edit here.
export default function sitemap(): MetadataRoute.Sitemap {
	return sitemapEntries(posts);
}
