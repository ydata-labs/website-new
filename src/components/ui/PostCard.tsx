import Link from "next/link";
import {
	audienceLabels,
	topicLabels,
	formatDate,
	type PostMeta,
} from "@/data/blog";

const labelClass = "rounded border px-2 py-0.5";

// One post in a list. The blog page (a client component) uses this too, so it
// imports from @/data/blog only, never from @/data/posts.
export function PostCard({
	post,
	as: Heading,
}: {
	post: PostMeta;
	as: "h2" | "h3";
}) {
	return (
		<article className="relative rounded-lg border border-line bg-surface p-6 transition-colors hover:border-accent">
			<p className="mb-3 flex flex-wrap gap-2 font-heading text-xs">
				<span className={`${labelClass} border-accent/40 text-accent`}>
					{audienceLabels[post.audience]}
				</span>
				<span className={`${labelClass} border-line text-muted`}>
					{topicLabels[post.topic]}
				</span>
				{/* Drafts show only under `pnpm dev`. */}
				{post.draft && (
					<span className={`${labelClass} border-danger/40 text-danger`}>
						Draft
					</span>
				)}
			</p>
			<Heading className="text-h4 mb-2">
				{/* The ::after layer makes the whole card a link. */}
				<Link
					href={`/blog/${post.slug}`}
					className="transition-colors hover:text-accent after:absolute after:inset-0"
				>
					{post.title}
				</Link>
			</Heading>
			<p className="text-sm text-muted">{post.description}</p>
			<time
				dateTime={post.date}
				className="mt-4 block font-heading text-xs text-muted"
			>
				{formatDate(post.date)}
			</time>
		</article>
	);
}
