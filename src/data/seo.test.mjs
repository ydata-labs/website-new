import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import {
	pages,
	fullTitle,
	pageMetadata,
	organizationSchema,
	personSchema,
} from "./seo.ts";

const keys = Object.keys(pages);

test("there are four pages", () => {
	assert.deepEqual([...keys].sort(), ["home", "portfolio", "privacy", "research"]);
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
