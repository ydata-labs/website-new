// Page titles, descriptions, share data, and structured data.
// Keep this file free of value imports: `pnpm test` runs it with plain Node.
import type { Metadata } from "next";
import type { PostMeta } from "./blog";

const SITE = "yDataLabs";

export const shareImage = {
	url: "/og-image.png",
	width: 1200,
	height: 630,
	alt: "yDataLabs: LLMs and AI that run where your data lives.",
};

export type PageKey = "home" | "portfolio" | "research" | "blog" | "privacy";

export const pages: Record<
	PageKey,
	{ path: string; title: string; description: string }
> = {
	home: {
		path: "/",
		title: "yDataLabs: LLMs and AI that run where your data lives",
		description:
			"We build LLM and AI systems that run on your own servers. AI engineering, platform engineering, and data science, proven in healthcare.",
	},
	portfolio: {
		path: "/portfolio",
		title: "Healthcare AI, Medical NLP and MLOps Projects",
		description:
			"Healthcare AI projects by yDataLabs: medical NLP, clinical MLOps, and LLM systems for hospitals and pharma, with measured results.",
	},
	research: {
		path: "/research",
		title: "Research: Papers and Talks",
		description:
			"Selected papers and talks by Dr. Veysel Kocaman on clinical NLP, medical language models, and healthcare AI. 40+ peer-reviewed publications.",
	},
	blog: {
		path: "/blog",
		title: "Blog: Notes on Private AI and LLMs",
		description:
			"Posts from yDataLabs on LLMs, on-premises AI, platform engineering, and data science. For leaders who plan AI work and for researchers.",
	},
	privacy: {
		path: "/privacy",
		title: "Privacy",
		description:
			"How yDataLabs handles the details you send through the contact form: what we collect, why, who receives it, and how long we keep it.",
	},
};

const SITE_URL = "https://ydatalabs.nl";

const FEED_PATH = "/blog/rss.xml";
const postPath = (post: PostMeta) => `${pages.blog.path}/${post.slug}`;

// The sitemap is built from `pages`, so a new page cannot be forgotten.
// The blog page is listed only when the blog has posts. Every post is listed.
export const sitemapEntries = (
	posts: PostMeta[] = [],
): { url: string; lastModified?: string }[] => [
	...Object.values(pages)
		.filter(({ path }) => path !== pages.blog.path || posts.length > 0)
		.map(({ path }) => ({ url: path === "/" ? SITE_URL : SITE_URL + path })),
	...posts.map((post) => ({
		url: SITE_URL + postPath(post),
		lastModified: post.updated ?? post.date,
	})),
];

// The home title already carries the brand name.
export const fullTitle = (key: PageKey) =>
	key === "home" ? pages.home.title : `${pages[key].title} | ${SITE}`;

// Every page calls this. A page that builds its own `openGraph` block by hand
// loses the share image and the site name, because Next.js replaces the
// parent's block instead of merging it.
export function pageMetadata(key: PageKey): Metadata {
	const { path, description } = pages[key];
	const title = fullTitle(key);
	return {
		title: { absolute: title },
		description,
		alternates: { canonical: path },
		openGraph: {
			type: "website",
			siteName: SITE,
			locale: "en_US",
			url: path,
			title,
			description,
			images: [shareImage],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [shareImage],
		},
	};
}

// The blog list. While the blog is empty, Google is asked not to index it.
export function blogMetadata(postCount: number): Metadata {
	const base = pageMetadata("blog");
	return {
		...base,
		alternates: {
			...base.alternates,
			types: { "application/rss+xml": FEED_PATH },
		},
		...(postCount === 0 && { robots: { index: false, follow: true } }),
	};
}

// One post. Same shape as pageMetadata(), with the details of the post.
export function postMetadata(post: PostMeta): Metadata {
	const title = `${post.title} | ${SITE}`;
	const path = postPath(post);
	const images = [post.image ? { url: post.image } : shareImage];
	return {
		title: { absolute: title },
		description: post.description,
		alternates: { canonical: path },
		openGraph: {
			type: "article",
			siteName: SITE,
			locale: "en_US",
			url: path,
			title,
			description: post.description,
			publishedTime: post.date,
			...(post.updated && { modifiedTime: post.updated }),
			authors: [post.author],
			images,
		},
		twitter: {
			card: "summary_large_image",
			title,
			description: post.description,
			images,
		},
	};
}

export const blogPostingSchema = (post: PostMeta) => ({
	"@context": "https://schema.org",
	"@type": "BlogPosting",
	headline: post.title,
	description: post.description,
	datePublished: post.date,
	dateModified: post.updated ?? post.date,
	// A post signed with the company name has the company as its author.
	author:
		post.author === SITE
			? { "@type": "Organization", name: SITE, url: SITE_URL }
			: { "@type": "Person", name: post.author },
	publisher: {
		"@type": "Organization",
		name: SITE,
		logo: { "@type": "ImageObject", url: `${SITE_URL}/apple-icon.png` },
	},
	mainEntityOfPage: SITE_URL + postPath(post),
	image: SITE_URL + (post.image ?? shareImage.url),
});

// Text for a <script type="application/ld+json"> tag. A "<" in a post title
// (for example "</script>") must not end the tag early.
export const jsonLd = (data: object) =>
	JSON.stringify(data).replace(/</g, "\\u003c");

const xml = (text: string) =>
	text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");

// The feed at /blog/rss.xml (RSS 2.0). Valid with zero posts.
export function rssXml(posts: PostMeta[]): string {
	const items = posts.map((post) => {
		const url = SITE_URL + postPath(post);
		return [
			"<item>",
			`<title>${xml(post.title)}</title>`,
			`<link>${url}</link>`,
			`<guid>${url}</guid>`,
			`<pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
			`<description>${xml(post.description)}</description>`,
			"</item>",
		].join("\n");
	});
	return [
		`<?xml version="1.0" encoding="UTF-8"?>`,
		`<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">`,
		"<channel>",
		`<title>${SITE} Blog</title>`,
		`<link>${SITE_URL}${pages.blog.path}</link>`,
		`<description>${xml(pages.blog.description)}</description>`,
		"<language>en</language>",
		`<atom:link href="${SITE_URL}${FEED_PATH}" rel="self" type="application/rss+xml" />`,
		...items,
		"</channel>",
		"</rss>",
		"",
	].join("\n");
}

const founderFacts =
	"PhD in Computer Vision, 20+ years in software, 10+ years in healthcare AI and machine learning";

export const organizationSchema = {
	"@context": "https://schema.org",
	"@type": "Organization",
	name: SITE,
	alternateName: "yData Labs",
	url: "https://ydatalabs.nl",
	// Served by src/app/apple-icon.png. Google wants at least 112x112.
	logo: "https://ydatalabs.nl/apple-icon.png",
	description:
		"yDataLabs builds LLM and AI systems that run where the customer's data lives: LLM integration, local LLMs, and on-premises AI. AI engineering, platform engineering, and data science, proven in healthcare and life sciences.",
	foundingDate: "2020",
	founder: {
		"@type": "Person",
		name: "Dr. Veysel Kocaman",
		jobTitle: "Founder & Director",
		description: founderFacts,
		alumniOf: "Leiden University",
		knowsAbout: [
			"Large Language Models",
			"Healthcare AI",
			"Medical NLP",
			"Clinical MLOps",
			"Machine Learning",
		],
	},
	address: {
		"@type": "PostalAddress",
		addressLocality: "Maastricht",
		addressCountry: "NL",
	},
	contactPoint: {
		"@type": "ContactPoint",
		email: "info@ydatalabs.nl",
		contactType: "business inquiries",
	},
	sameAs: [
		"https://linkedin.com/company/ydatalabs",
		"https://twitter.com/ydatalabs",
		"https://github.com/ydata-labs",
	],
	areaServed: "Global",
	knowsAbout: [
		"LLM Integration",
		"Local LLMs",
		"On-Premises AI",
		"AI Engineering",
		"Platform Engineering",
		"MLOps",
		"Data Science",
		"Healthcare AI",
		"Medical Natural Language Processing",
		"Clinical MLOps",
		"Generative AI",
		"Medical Computer Vision",
		"Clinical Decision Support Systems",
	],
};

export const personSchema = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: "Dr. Veysel Kocaman",
	alternateName: "Veysel Kocaman",
	jobTitle: "Founder & Director of yDataLabs",
	description:
		"PhD in Computer Vision. Data scientist and ML engineer with 20+ years in software development and architecture, and 10+ years in healthcare AI.",
	alumniOf: {
		"@type": "Organization",
		name: "Leiden University",
	},
	hasCredential: {
		"@type": "EducationalOccupationalCredential",
		credentialCategory: "degree",
		educationalLevel: "PhD",
		about: "Computer Vision",
	},
	knowsAbout: [
		"Large Language Models",
		"Healthcare AI",
		"Medical Natural Language Processing",
		"Clinical MLOps",
		"Generative AI",
		"Machine Learning",
		"Computer Vision",
		"Data Science",
	],
	award: "Google ML Developer Expert",
	memberOf: {
		"@type": "Organization",
		name: SITE,
	},
	email: "info@ydatalabs.nl",
	sameAs: [
		"https://linkedin.com/in/veyselkocaman",
		"https://twitter.com/veyselkocaman",
	],
};
