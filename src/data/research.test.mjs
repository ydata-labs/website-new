import test from "node:test";
import assert from "node:assert/strict";
import { publications, talks, scholarUrl } from "./research.ts";

const thisYear = new Date().getFullYear();

test("10 to 15 publications, each complete, newest first", () => {
	assert.ok(
		publications.length >= 10 && publications.length <= 15,
		`${publications.length} publications`,
	);
	for (const p of publications) {
		assert.ok(p.title.trim() && p.venue.trim(), `incomplete: ${p.title}`);
		assert.ok(p.year >= 2010 && p.year <= thisYear, `year: ${p.title}`);
		assert.match(p.url, /^https:\/\//, `link: ${p.title}`);
	}
	assert.equal(new Set(publications.map((p) => p.title)).size, publications.length);
	const years = publications.map((p) => p.year);
	assert.deepEqual(years, [...years].sort((a, b) => b - a));
});

test("talks are complete", () => {
	for (const t of talks) {
		assert.ok(t.title.trim() && t.event.trim(), `incomplete: ${t.title}`);
		assert.ok(t.year >= 2010 && t.year <= thisYear);
		if (t.url) assert.match(t.url, /^https:\/\//);
	}
});

test("the Google Scholar link is set", () => {
	assert.match(scholarUrl, /^https:\/\/scholar\.google\./);
});
