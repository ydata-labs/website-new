// Guards the rules of the Dark lab look. Run with `pnpm test`.
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";

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

const OLD_CLASS =
	/\b(?:bg|text|border|from|via|to|ring|fill|stroke|divide|outline|decoration|placeholder|shadow)-(?:navy|teal|slate|white|black|amber|emerald|rose|primary|secondary|background|foreground)\b/;

test("no file has emoji, entry animation, or old colors", () => {
	const files = readdirSync("src", { recursive: true })
		.map((f) => `src/${f}`)
		.filter((f) => /\.(tsx?|css)$/.test(f));
	for (const f of files) {
		const src = readFileSync(f, "utf8");
		// assert.ok keeps the failure short. doesNotMatch prints the whole file.
		assert.ok(!/\p{Extended_Pictographic}/u.test(src), `${f}: emoji`);
		if (f.endsWith(".css")) continue;
		assert.ok(!/\banimate-|\bopacity-0\b/.test(src), `${f}: entry animation`);
		assert.ok(!OLD_CLASS.test(src), `${f}: old color class`);
		// `scroll-smooth` as a utility class beats the reduced-motion rule in the
		// base layer. `outline-none` removes the global focus ring.
		assert.ok(!/\bscroll-smooth\b|\boutline-none\b/.test(src), `${f}: scroll-smooth or outline-none`);
	}
});

const allSrc = readdirSync("src", { recursive: true })
	.map((f) => `src/${f}`)
	.filter((f) => /\.tsx?$/.test(f));

// Unused images get deleted. This catches a deleted image that is still used.
test("every image path in src exists", () => {
	for (const f of allSrc) {
		const paths = readFileSync(f, "utf8").matchAll(/["'`](\/images\/[^"'`]+)["'`]/g);
		for (const [, path] of paths) {
			assert.ok(existsSync(`public${path}`), `${f}: ${path} is missing`);
		}
	}
});

// Google and other sites link to these anchors.
test("old anchor links still land on a section", () => {
	const sections = allSrc
		.filter((f) => f.startsWith("src/components/sections/"))
		.map((f) => readFileSync(f, "utf8"))
		.join("\n");
	for (const id of ["solutions", "advice", "healthcare", "products", "about", "contact"]) {
		assert.match(sections, new RegExp(`id="${id}"`), `no section with id ${id}`);
	}
});

// The post data holds the full text of every post. If a client component
// reaches it, all of it goes to the browser. The index files of
// components/ui and components/sections re-export server components that
// import the post data, so a client component must import single files.
test("no client component can reach the post data", () => {
	for (const f of allSrc) {
		const src = readFileSync(f, "utf8");
		if (!/^["']use client["']/.test(src)) continue;
		assert.ok(!/data\/posts["']/.test(src), `${f}: imports the post data`);
		assert.ok(
			!/from ["']@\/components\/(ui|sections)["']/.test(src),
			`${f}: imports a components index. Import the single file, for example "@/components/ui/Button"`,
		);
	}
});

test("post text has styles for every block a post can use", () => {
	for (const part of ["h2", "h3", "a", "ul", "ol", "blockquote", "pre", "code", "table", "img", "\\.katex-display", "\\.hljs-keyword"]) {
		assert.match(css, new RegExp(`\\.post-body [^{]*(?<![\\w-])${part}(?![\\w-])`), `.post-body has no rule for ${part}`);
	}
	// Wide blocks scroll inside their own box, not the page.
	assert.match(css, /overflow-x:\s*auto/);
});

// `dynamicParams = false` tells Next.js to serve a post only from its page
// cache. This site has no page cache on Cloudflare (open-next.config.ts), so
// every post would be a 404 on the live site, while `pnpm start` looks fine.
// The page calls notFound() for an unknown address instead.
test("the post page works without a page cache", () => {
	const page = readFileSync("src/app/blog/[slug]/page.tsx", "utf8");
	assert.ok(!/export const dynamicParams/.test(page), "dynamicParams is set");
	assert.match(page, /notFound\(\)/);
});

// The mono heading font is wide. A long word such as "Immunohistochemistry"
// in a post title must wrap, not push the phone page sideways.
test("a long word in a post title cannot widen the page", () => {
	const page = readFileSync("src/app/blog/[slug]/page.tsx", "utf8");
	const card = readFileSync("src/components/ui/PostCard.tsx", "utf8");
	assert.match(page, /<h1 className="[^"]*\bbreak-words\b/);
	assert.match(card, /<Heading className="[^"]*\bbreak-words\b/);
});
