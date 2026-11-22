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
	audience: Audience;
	topic: Topic;
	author: string;
	draft: boolean;
	image?: string;
	readingMinutes: number;
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
