// Guards the rules of the Dark lab look. Run with `pnpm test`.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";

const css = readFileSync("src/app/globals.css", "utf8");
const token = (name) => {
	const m = css.match(new RegExp(`--color-${name}:\\s*(#[0-9a-f]{6})`, "i"));
	assert.ok(m, `token --color-${name} is missing`);
	return m[1];
};
const lum = (hex) => {
	const [r, g, b] = [1, 3, 5].map((i) => {
		const c = parseInt(hex.slice(i, i + 2), 16) / 255;
		return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
	});
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
	const [hi, lo] = [lum(token(a)), lum(token(b))].sort((x, y) => y - x);
	return (hi + 0.05) / (lo + 0.05);
};

test("text colors meet WCAG AA (4.5:1)", () => {
	const pairs = [
		["ink", "page"],
		["ink", "surface"],
		["bright", "page"],
		["muted", "page"],
		["muted", "surface"],
		["accent", "page"],
		["accent", "surface"],
		["page", "accent"], // button text on the accent color
		["danger", "surface"],
	];
	for (const [fg, bg] of pairs) {
		assert.ok(
			ratio(fg, bg) >= 4.5,
			`${fg} on ${bg} is ${ratio(fg, bg).toFixed(2)}`,
		);
	}
});

test("control borders meet 3:1", () => {
	for (const bg of ["page", "surface"]) {
		assert.ok(ratio("line-strong", bg) >= 3, `line-strong on ${bg}`);
	}
});

test("focus ring and reduced motion rules exist", () => {
	assert.match(css, /:focus-visible/);
	assert.match(css, /prefers-reduced-motion:\s*reduce/);
});

// "3.5rem, 1.2" is not a valid font size. The browser drops it, and every
// heading falls back to 16px. The old theme had this bug.
test("type scale tokens are valid sizes with a line height", () => {
	const sizes = [...css.matchAll(/--text-([a-z0-9-]+?):\s*([^;]+);/g)].filter(
		([, name]) => !name.includes("--"),
	);
	assert.ok(sizes.length >= 8, `only ${sizes.length} type sizes found`);
	for (const [, name, value] of sizes) {
		assert.match(value.trim(), /^[\d.]+rem$/, `--text-${name}: ${value}`);
		assert.match(css, new RegExp(`--text-${name}--line-height:`), `--text-${name} has no line height`);
	}
});

// Files that still have the old look. Each task removes its files.
// Task 8 deletes this list.
const NOT_YET = [
	"src/components/sections/About.tsx",
	"src/components/sections/Products.tsx",
	"src/components/sections/PortfolioSummary.tsx",
	"src/components/sections/Partners.tsx",
	"src/components/sections/Contact.tsx",
	"src/data/products.ts",
	"src/app/portfolio/page.tsx",
	"src/app/privacy/page.tsx",
];
const OLD_CLASS =
	/\b(?:bg|text|border|from|via|to|ring|fill|stroke|divide|outline|decoration|placeholder|shadow)-(?:navy|teal|slate|white|black|amber|emerald|rose|primary|secondary|background|foreground)\b/;

test("restyled files have no emoji, no entry animation, no old colors", () => {
	const files = readdirSync("src", { recursive: true })
		.map((f) => `src/${f}`)
		.filter((f) => /\.(tsx?|css)$/.test(f) && !NOT_YET.includes(f));
	for (const f of files) {
		const src = readFileSync(f, "utf8");
		// assert.ok keeps the failure short. doesNotMatch prints the whole file.
		assert.ok(!/\p{Extended_Pictographic}/u.test(src), `${f}: emoji`);
		if (f.endsWith(".css")) continue;
		assert.ok(!/\banimate-|\bopacity-0\b/.test(src), `${f}: entry animation`);
		assert.ok(!OLD_CLASS.test(src), `${f}: old color class`);
	}
});
