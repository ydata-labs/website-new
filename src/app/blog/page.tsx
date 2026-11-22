import Link from "next/link";
import { Header, Footer } from "@/components/ui";
import { blogMetadata } from "@/data/seo";
import { posts } from "@/data/posts";
import { PostList } from "./PostList";

// With zero posts this page is marked "noindex" and is not in the sitemap.
export const metadata = blogMetadata(posts.length);

const linkClass =
	"text-accent underline underline-offset-4 transition-colors hover:text-accent-bright";

export default function BlogPage() {
	return (
		<>
			<Header />
			<main className="pt-32 pb-24">
				<div className="max-w-lg mx-auto px-4 md:px-8">
					<p className="mb-3 font-heading text-sm text-accent">{"// blog"}</p>
					<h1 className="text-h2 md:text-h1 mb-6">Blog</h1>
					<p className="text-body-lg text-muted max-w-prose">
						Notes on building AI that runs where your data lives.
					</p>

					{posts.length === 0 ? (
						<p className="mt-10 max-w-prose">
							No posts yet. Until the first one is here, you can{" "}
							<Link href="/portfolio" className={linkClass}>
								see our work
							</Link>{" "}
							or{" "}
							<Link href="/research" className={linkClass}>
								read the research
							</Link>
							.
						</p>
					) : (
						<PostList posts={posts} />
					)}
				</div>
			</main>
			<Footer />
		</>
	);
}
