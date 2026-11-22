import test from "node:test";
import assert from "node:assert/strict";
import { mainNav, footerNav } from "./navigation.ts";

test("Blog is in the menu only when the blog has posts", () => {
	assert.deepEqual(mainNav(false).map((i) => i.label), ["Solutions", "Work", "Research"]);
	assert.deepEqual(mainNav(true).map((i) => i.label), ["Solutions", "Work", "Research", "Blog"]);
	assert.equal(mainNav(true).at(-1).href, "/blog");
});

test("the footer follows the menu", () => {
	const labels = (has) => footerNav(has).site.map((i) => i.label);
	assert.deepEqual(labels(false), ["Solutions", "Work", "Research", "Contact", "Privacy"]);
	assert.deepEqual(labels(true), ["Solutions", "Work", "Research", "Blog", "Contact", "Privacy"]);
	assert.equal(footerNav(false).products.length, 2);
});
