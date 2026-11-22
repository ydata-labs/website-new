import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import {
	pages,
	fullTitle,
	pageMetadata,
	organizationSchema,
	personSchema,
	sitemapEntries,
	shareImage,
	blogMetadata,
	postMetadata,
	blogPostingSchema,
	jsonLd,
	rssXml,
} from "./seo.ts";

const keys = Object.keys(pages);

test("there are five pages", () => {
	assert.deepEqual([...keys].sort(), ["blog", "home", "portfolio", "privacy", "research"]);
});

test("every page has its own canonical address and full share data", () => {
	for (const key of keys) {
		const m = pageMetadata(key);
		const { path, description } = pages[key];
		assert.equal(m.alternates.canonical, path);
		assert.equal(m.openGraph.url, path);
		assert.equal(m.openGraph.type, "website");
		assert.equal(m.openGraph.siteName, "yDataLabs");
		assert.equal(m.openGraph.title, fullTitle(key));
		assert.equal(m.twitter.title, fullTitle(key));
		assert.equal(m.twitter.card, "summary_large_image");
		assert.equal(m.description, description);
		assert.equal(m.openGraph.images.length, 1);
		assert.equal(m.twitter.images.length, 1);
	}
});

test("titles and descriptions are unique and fit in search results", () => {
	const titles = keys.map(fullTitle);
	const descriptions = keys.map((k) => pages[k].description);
	assert.equal(new Set(titles).size, keys.length);
	assert.equal(new Set(descriptions).size, keys.length);
	for (const t of titles) assert.ok(t.length <= 60, `title too long: ${t}`);
	for (const d of descriptions) {
		assert.ok(d.length >= 70 && d.length <= 160, `description length ${d.length}: ${d}`);
	}
});

test("home names private AI and all three strengths", () => {
	const d = pages.home.description;
	assert.match(d, /LLM/);
	assert.match(d, /own servers|on-premises/i);
	for (const s of [/AI engineering/i, /platform engineering/i, /data science/i]) {
		assert.match(d, s);
	}
});

test("portfolio and research keep the healthcare terms", () => {
	assert.match(pages.portfolio.description, /healthcare/i);
	assert.match(pages.research.description, /healthcare|medical|clinical/i);
});

test("structured data names all three strengths and points to a real logo", () => {
	const text = JSON.stringify(organizationSchema);
	for (const s of [/AI engineering/i, /platform engineering/i, /data science/i]) {
		assert.match(text, s);
	}
	// Google wants a logo of at least 112x112 pixels.
	const logoPath = new URL(organizationSchema.logo).pathname;
	const file = ["public", "src/app"].map((dir) => dir + logoPath).find(existsSync);
	assert.ok(file, "logo file is missing");
	const png = readFileSync(file);
	const [width, height] = [png.readUInt32BE(16), png.readUInt32BE(20)];
	assert.ok(width >= 112 && height >= 112, `logo is ${width}x${height}`);
	assert.match(personSchema.description, /20\+ years/);
});

const post = {
	slug: "first-post",
	title: "Why <script> & friends need care",
	description: "A short text about the post.",
	date: "2026-12-01",
	audience: "leaders",
	topic: "ai-engineering",
	author: "Dr. Veysel Kocaman",
	draft: false,
	readingMinutes: 4,
};

test("the sitemap lists every page once, and the blog only when it has posts", () => {
	const empty = sitemapEntries().map((e) => e.url);
	assert.equal(empty.length, keys.length - 1);
	assert.equal(new Set(empty).size, empty.length);
	assert.ok(empty.includes("https://ydatalabs.nl"));
	assert.ok(!empty.some((u) => u.includes("/blog")));
	for (const key of keys.filter((k) => k !== "home" && k !== "blog")) {
		assert.ok(empty.includes(`https://ydatalabs.nl${pages[key].path}`), key);
	}

	const full = sitemapEntries([post]);
	assert.equal(full.length, keys.length + 1);
	assert.ok(full.some((e) => e.url === "https://ydatalabs.nl/blog"));
	const entry = full.find((e) => e.url === "https://ydatalabs.nl/blog/first-post");
	assert.equal(entry.lastModified, "2026-12-01");
	const changed = sitemapEntries([{ ...post, updated: "2027-01-15" }]);
	assert.equal(changed.at(-1).lastModified, "2027-01-15");
});

test("the empty blog is hidden from Google, and the filled blog is not", () => {
	assert.deepEqual(blogMetadata(0).robots, { index: false, follow: true });
	assert.equal(blogMetadata(1).robots, undefined);
	for (const m of [blogMetadata(0), blogMetadata(1)]) {
		assert.equal(m.alternates.canonical, "/blog");
		assert.equal(m.alternates.types["application/rss+xml"], "/blog/rss.xml");
		assert.equal(m.openGraph.images.length, 1);
	}
});

test("a post has its own title, address, and share data", () => {
	const m = postMetadata(post);
	assert.equal(m.title.absolute, `${post.title} | yDataLabs`);
	assert.equal(m.description, post.description);
	assert.equal(m.alternates.canonical, "/blog/first-post");
	assert.equal(m.openGraph.type, "article");
	assert.equal(m.openGraph.url, "/blog/first-post");
	assert.equal(m.openGraph.publishedTime, "2026-12-01");
	assert.equal("modifiedTime" in m.openGraph, false);
	const changed = postMetadata({ ...post, updated: "2027-01-15" });
	assert.equal(changed.openGraph.modifiedTime, "2027-01-15");
	assert.deepEqual(m.openGraph.images, [shareImage]);
	assert.equal(m.twitter.card, "summary_large_image");
	const own = postMetadata({ ...post, image: "/images/blog/x.webp" });
	assert.deepEqual(own.openGraph.images, [{ url: "/images/blog/x.webp" }]);
	assert.deepEqual(own.twitter.images, [{ url: "/images/blog/x.webp" }]);
});

test("a post carries BlogPosting data that a title cannot break", () => {
	const s = blogPostingSchema(post);
	assert.equal(s["@type"], "BlogPosting");
	assert.equal(s.headline, post.title);
	assert.equal(s.datePublished, "2026-12-01");
	// Without an "updated" day, the post was last changed when it went live.
	assert.equal(s.dateModified, "2026-12-01");
	assert.equal(
		blogPostingSchema({ ...post, updated: "2027-01-15" }).dateModified,
		"2027-01-15",
	);
	assert.equal(s.author.name, "Dr. Veysel Kocaman");
	assert.equal(s.publisher.name, "yDataLabs");
	assert.equal(s.mainEntityOfPage, "https://ydatalabs.nl/blog/first-post");
	assert.equal(s.image, "https://ydatalabs.nl/og-image.png");
	const text = jsonLd(s);
	assert.ok(!text.includes("<"));
	assert.deepEqual(JSON.parse(text), s);
});

test("the feed is valid with zero posts and escapes titles", () => {
	const empty = rssXml([]);
	assert.match(empty, /^<\?xml version="1\.0" encoding="UTF-8"\?>\n<rss version="2\.0"/);
	assert.match(empty, /<link>https:\/\/ydatalabs\.nl\/blog<\/link>/);
	assert.doesNotMatch(empty, /<item>/);

	const xml = rssXml([post]);
	assert.match(xml, /<title>Why &lt;script&gt; &amp; friends need care<\/title>/);
	assert.match(xml, /<link>https:\/\/ydatalabs\.nl\/blog\/first-post<\/link>/);
	assert.match(xml, /<guid>https:\/\/ydatalabs\.nl\/blog\/first-post<\/guid>/);
	assert.match(xml, /<pubDate>Tue, 01 Dec 2026 00:00:00 GMT<\/pubDate>/);
});
