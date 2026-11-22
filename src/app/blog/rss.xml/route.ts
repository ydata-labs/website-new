import { rssXml } from "@/data/seo";
import { posts } from "@/data/posts";

// Built once, at build time, like every page.
export const dynamic = "force-static";

export function GET() {
	return new Response(rssXml(posts), {
		headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
	});
}
