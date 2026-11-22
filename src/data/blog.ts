// Types, labels, and the date format of the blog.
// No imports on purpose: client components and `pnpm test` both use this file.
// The posts themselves are in ./posts.ts, which is for server components only.

export type Audience = "leaders" | "research";
export type Topic = "ai-engineering" | "platform-engineering" | "data-science";

// One post, without its text. scripts/build-posts.mjs writes these.
export interface PostMeta {
	slug: string;
	title: string;
	description: string;
	date: string; // YYYY-MM-DD
	updated?: string; // YYYY-MM-DD. The day of the last change, if any
	audience: Audience;
	topic: Topic;
	author: string;
	draft: boolean;
	image?: string;
	readingMinutes: number;
}

// The shape of posts.generated.json.
export interface PostData {
	posts: PostMeta[];
	html: Record<string, string>;
}

// The second guard against a draft on the live site. The build script already
// leaves drafts out. But the JSON on disk can be stale: `pnpm dev` writes it
// with drafts, and a build that skips the script would use that file.
export function withoutDrafts(data: PostData): PostData {
	const posts = data.posts.filter((post) => !post.draft);
	return {
		posts,
		html: Object.fromEntries(
			posts.map((post) => [post.slug, data.html[post.slug]]),
		),
	};
}

export const audienceLabels: Record<Audience, string> = {
	leaders: "For leaders",
	research: "Research",
};

export const topicLabels: Record<Topic, string> = {
	"ai-engineering": "AI engineering",
	"platform-engineering": "Platform engineering",
	"data-science": "Data science",
};

// "2026-12-01" becomes "1 December 2026". UTC, so the day never shifts.
export const formatDate = (date: string) =>
	new Intl.DateTimeFormat("en-GB", {
		dateStyle: "long",
		timeZone: "UTC",
	}).format(new Date(date));
