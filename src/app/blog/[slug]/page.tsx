import Link from "next/link";
import { notFound } from "next/navigation";
// Styles for formulas. Imported here, so only post pages load them.
import "katex/dist/katex.min.css";
import { Header, Footer, Button, ArrowIcon } from "@/components/ui";
import { posts, postHtml } from "@/data/posts";
import { audienceLabels, topicLabels, formatDate } from "@/data/blog";
import { postMetadata, blogPostingSchema, jsonLd } from "@/data/seo";

type Props = { params: Promise<{ slug: string }> };

// Only the posts that were built into the site exist. Any other address
// under /blog/ gets notFound() below, which is a 404.
// Do not add `dynamicParams = false` here. It makes Next.js serve posts only
// from its page cache, and this site has no page cache on Cloudflare. Every
// post would then be a 404 on the live site.
export const generateStaticParams = () => posts.map(({ slug }) => ({ slug }));

const findPost = (slug: string) => posts.find((post) => post.slug === slug);

export async function generateMetadata({ params }: Props) {
	const post = findPost((await params).slug);
	return post ? postMetadata(post) : {};
}

const labelClass = "rounded border px-2 py-0.5";

export default async function PostPage({ params }: Props) {
	const post = findPost((await params).slug);
	if (!post) notFound();

	return (
		<>
			<Header />
			<main className="pt-32 pb-24">
				<article className="max-w-md mx-auto px-4 md:px-8">
					<Link
						href="/blog"
						className="mb-6 inline-block font-heading text-sm text-accent transition-colors hover:text-accent-bright"
					>
						{/* A screen reader would read the slashes out loud. */}
						<span aria-hidden="true">{"// "}</span>
						blog
					</Link>
					<p className="mb-4 flex flex-wrap gap-2 font-heading text-xs">
						<span className={`${labelClass} border-accent/40 text-accent`}>
							{audienceLabels[post.audience]}
						</span>
						<span className={`${labelClass} border-line text-muted`}>
							{topicLabels[post.topic]}
						</span>
						{post.draft && (
							<span className={`${labelClass} border-danger/40 text-danger`}>
								Draft: not on the live site
							</span>
						)}
					</p>
					<h1 className="text-h2 md:text-h1 mb-4 break-words">{post.title}</h1>
					<p className="font-heading text-sm text-muted">
						<time dateTime={post.date}>{formatDate(post.date)}</time>
						{" · "}
						{post.author}
						{" · "}
						{post.readingMinutes} min read
					</p>

					{/* The HTML was made from Markdown at build time, by
					    scripts/build-posts.mjs. Posts come from this repository. */}
					<div
						className="post-body mt-10 max-w-prose"
						dangerouslySetInnerHTML={{ __html: postHtml[post.slug] }}
					/>

					<section className="mt-16 rounded-lg border border-line bg-surface p-8">
						<h2 className="text-h4 mb-3">Want to talk about this?</h2>
						<p className="text-muted mb-6 max-w-prose">
							We build LLM and AI systems that run on your own servers. Tell
							us what you are working on.
						</p>
						<Button href="/#contact" icon={<ArrowIcon />}>
							Book a call
						</Button>
					</section>
					<Link
						href="/blog"
						className="mt-8 inline-block font-heading text-sm text-accent transition-colors hover:text-accent-bright"
					>
						All posts
					</Link>
				</article>
			</main>
			<Footer />
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: jsonLd(blogPostingSchema(post)) }}
			/>
		</>
	);
}
