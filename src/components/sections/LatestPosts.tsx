import Link from "next/link";
import { SectionHeader, PostCard, ArrowIcon } from "@/components/ui";
import { posts } from "@/data/posts";

// The three newest posts. Hidden until the blog has its first post.
export function LatestPosts() {
	if (posts.length === 0) return null;

	return (
		<section className="border-t border-line py-16 md:py-24">
			<div className="max-w-xl mx-auto px-4 md:px-8">
				<SectionHeader eyebrow="blog" title="Latest posts" />
				<div className="mt-8 grid gap-4 md:grid-cols-3">
					{posts.slice(0, 3).map((post) => (
						<PostCard key={post.slug} post={post} as="h3" />
					))}
				</div>
				<Link
					href="/blog"
					className="mt-8 inline-flex items-center gap-2 font-heading text-sm text-accent transition-colors hover:text-accent-bright"
				>
					All posts
					<ArrowIcon />
				</Link>
			</div>
		</section>
	);
}
