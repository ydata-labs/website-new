"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { audienceLabels, type Audience, type PostMeta } from "@/data/blog";
// Not from the "@/components/ui" index: that would pull the server-side
// Header, and with it the post data, toward the browser.
import { PostCard } from "@/components/ui/PostCard";

type Filter = Audience | "all";

const filters: { value: Filter; label: string }[] = [
	{ value: "all", label: "All" },
	{ value: "leaders", label: audienceLabels.leaders },
	{ value: "research", label: audienceLabels.research },
];

// The post list with its two audience filters. Without JavaScript the page
// still shows every post.
export function PostList({ posts }: { posts: PostMeta[] }) {
	const [filter, setFilter] = useState<Filter>("all");
	const shown = posts.filter(
		(post) => filter === "all" || post.audience === filter,
	);

	return (
		<>
			<div
				role="group"
				aria-label="Filter posts"
				className="mt-10 flex flex-wrap gap-2"
			>
				{filters.map(({ value, label }) => (
					<button
						key={value}
						type="button"
						aria-pressed={filter === value}
						onClick={() => setFilter(value)}
						className={cn(
							"rounded-md border px-4 py-2 font-heading text-sm transition-colors",
							filter === value
								? "border-accent bg-accent text-page"
								: "border-line-strong text-ink hover:border-accent hover:text-accent",
						)}
					>
						{label}
					</button>
				))}
			</div>

			<div className="mt-6 grid gap-4" aria-live="polite">
				{shown.map((post) => (
					<PostCard key={post.slug} post={post} as="h2" />
				))}
				{shown.length === 0 && (
					<p className="text-muted">No posts for this filter yet.</p>
				)}
			</div>
		</>
	);
}
