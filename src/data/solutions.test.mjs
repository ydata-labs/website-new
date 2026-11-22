import test from "node:test";
import assert from "node:assert/strict";
import { solutionGroups, advice, proof } from "./solutions.ts";

test("three groups, in this order", () => {
	assert.deepEqual(
		solutionGroups.map((g) => g.id),
		["ai-engineering", "platform-engineering", "data-science"],
	);
});

test("the groups have similar weight", () => {
	const sizes = solutionGroups.map((g) => g.items.length);
	assert.ok(Math.min(...sizes) >= 3 && Math.max(...sizes) <= 5, `sizes ${sizes}`);
	assert.ok(Math.max(...sizes) - Math.min(...sizes) <= 1, `sizes ${sizes}`);
});

test("the private AI items exist", () => {
	const ids = solutionGroups.flatMap((g) => g.items.map((i) => i.id));
	assert.equal(new Set(ids).size, ids.length);
	for (const id of ["llm-integration", "local-llms", "on-premises-ai", "data-pipelines"]) {
		assert.ok(ids.includes(id), id);
	}
});

test("solution text is general and plain", () => {
	for (const item of solutionGroups.flatMap((g) => g.items)) {
		const text = `${item.title} ${item.description}`;
		assert.doesNotMatch(text, /cutting-edge|revolutioni[sz]e|seamless/i, item.id);
		assert.ok(item.description.length <= 220, `${item.id} is too long`);
	}
	const titles = solutionGroups.flatMap((g) => g.items.map((i) => i.title)).join(" ");
	assert.doesNotMatch(titles, /healthcare|medical|clinical/i);
});

test("advice and proof are filled", () => {
	assert.ok(advice.items.length >= 3 && advice.items.length <= 5);
	assert.deepEqual(proof.map((p) => p.value), ["100+", "50+"]);
});
