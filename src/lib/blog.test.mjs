import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import {
	parsePost,
	renderMarkdown,
	selectPosts,
	buildPosts,
	styleProblems,
} from "./blog.mjs";

const good = {
	title: "A title",
	description: "One sentence.",
	date: "2026-12-01",
	audience: "leaders",
	topic: "ai-engineering",
	author: "Dr. Veysel Kocaman",
};
const file = (details = {}, body = "First line.\n") => {
	const head = Object.entries({ ...good, ...details })
		.filter(([, v]) => v !== undefined)
		.map(([k, v]) => `${k}: ${v}`)
		.join("\n");
	return `---\n${head}\n---\n\n${body}`;
};

test("reads the details of a post", () => {
	const p = parsePost("my-post", file({ image: "/images/blog/x.webp" }));
	assert.equal(p.slug, "my-post");
	assert.equal(p.title, "A title");
	assert.equal(p.date, "2026-12-01");
	assert.equal(p.draft, false);
	assert.equal(p.image, "/images/blog/x.webp");
	assert.equal(p.body.trim(), "First line.");
	assert.equal(parsePost("a", file({ draft: "true" })).draft, true);
});

test("quote marks inside a value are kept", () => {
	const title = (value) => parsePost("a", file({ title: value })).title;
	assert.equal(title('"Private" is not "offline"'), '"Private" is not "offline"');
	assert.equal(title('"Private" is not "offline"   # a comment'), '"Private" is not "offline"');
	// A value in quotes still loses its outer quotes, and keeps a # sign.
	assert.equal(title('"It\'s a # sign"'), "It's a # sign");
});

test("the example from the spec parses: comments, colons, quotes, Windows line endings", () => {
	const raw = [
		"---",
		"title: LLMs: what they can safely do",
		'description: "A quoted text with a # sign."',
		"date: 2026-12-01",
		'audience: leaders        # "leaders" or "research"',
		"topic: platform-engineering   # one of three",
		"author: Dr. Veysel Kocaman",
		"draft: false             # optional",
		"---",
		"Text.",
	].join("\r\n");
	const p = parsePost("x", raw);
	assert.equal(p.title, "LLMs: what they can safely do");
	assert.equal(p.description, "A quoted text with a # sign.");
	assert.equal(p.audience, "leaders");
	assert.equal(p.topic, "platform-engineering");
	assert.equal(p.draft, false);
});

test("rejects a post with missing or wrong details, and names the file", () => {
	const bad = [
		[file({ title: undefined }), /title/],
		[file({ description: undefined }), /description/],
		[file({ author: undefined }), /author/],
		[file({ date: "1 December 2026" }), /date/],
		[file({ date: "2026-02-31" }), /date/],
		[file({ audience: "everyone" }), /audience/],
		[file({ topic: "healthcare" }), /topic/],
		[file({ draft: "yes" }), /draft/],
		[file({ image: "images/x.webp" }), /image/],
		[file({ audiance: "leaders" }), /audiance/], // a misspelled key
		[file({}, "# A second h1\n"), /heading/],
		[file({}, "   \n"), /empty/],
		["No details block.\n", /details/],
	];
	for (const [raw, message] of bad) {
		assert.throws(() => parsePost("my-post", raw), (e) => {
			assert.match(e.message, /^my-post\.md: /);
			assert.match(e.message, message);
			return true;
		});
	}
	assert.throws(() => parsePost("My Post", file()), /file name/);
});

test("a title or description that Google would cut stops the build", () => {
	// 48, because the page adds " | yDataLabs" to the title of a post.
	assert.equal(parsePost("a", file({ title: "t".repeat(48) })).title.length, 48);
	assert.equal(
		parsePost("a", file({ description: "d".repeat(160) })).description.length,
		160,
	);
	assert.throws(
		() => parsePost("a", file({ title: "t".repeat(49) })),
		/a\.md: title is 49 characters long. The most is 48/,
	);
	assert.throws(
		() => parsePost("a", file({ description: "d".repeat(161) })),
		/a\.md: description is 161 characters long. The most is 160/,
	);
});

test("a post can carry the day it was last changed", () => {
	assert.equal("updated" in parsePost("a", file()), false);
	assert.equal(parsePost("a", file({ updated: "2027-01-15" })).updated, "2027-01-15");
	// The same day as the post is fine.
	assert.equal(parsePost("a", file({ updated: "2026-12-01" })).updated, "2026-12-01");
	for (const updated of ["15 January 2027", "2027-02-31", "2026-11-30"]) {
		assert.throws(
			() => parsePost("a", file({ updated })),
			/a\.md: updated must be/,
			updated,
		);
	}
	const built = buildPosts(
		[{ name: "a.md", raw: file({ updated: "2027-01-15" }) }],
		{ drafts: false },
	);
	assert.equal(built.posts[0].updated, "2027-01-15");
});

test("reading time is words divided by 200, at least 1 minute", () => {
	assert.equal(parsePost("a", file({}, "word ".repeat(10))).readingMinutes, 1);
	assert.equal(parsePost("a", file({}, "word ".repeat(900))).readingMinutes, 5);
});

test("newest first, same day by name, drafts left out", () => {
	const posts = [
		{ slug: "b", date: "2026-01-01", draft: false },
		{ slug: "d", date: "2026-03-01", draft: true },
		{ slug: "c", date: "2026-02-01", draft: false },
		{ slug: "a", date: "2026-01-01", draft: false },
	];
	assert.deepEqual(selectPosts(posts, { drafts: false }).map((p) => p.slug), ["c", "a", "b"]);
	assert.deepEqual(selectPosts(posts, { drafts: true }).map((p) => p.slug), ["d", "c", "a", "b"]);
});

test("buildPosts skips other files and drafts, and keeps the body out of the list", () => {
	const files = [
		{ name: "one.md", raw: file({ date: "2026-01-01" }) },
		{ name: "two.md", raw: file({ date: "2026-02-01", draft: "true" }) },
		{ name: ".DS_Store", raw: "junk" },
	];
	const out = buildPosts(files, { drafts: false });
	assert.deepEqual(out.posts.map((p) => p.slug), ["one"]);
	assert.equal(out.posts[0].body, undefined);
	assert.deepEqual(Object.keys(out.html), ["one"]);
	assert.match(out.html.one, /<p>First line\.<\/p>/);
	assert.equal(buildPosts(files, { drafts: true }).posts.length, 2);
});

test("renders headings, links, images, and tables", () => {
	const html = renderMarkdown("## Part\n\n[a](https://example.com) ![alt](/images/blog/x.webp)\n\n| a | b |\n|---|---|\n| 1 | 2 |\n");
	assert.match(html, /<h2>Part<\/h2>/);
	assert.match(html, /<a href="https:\/\/example\.com">a<\/a>/);
	assert.match(html, /<img src="\/images\/blog\/x\.webp" alt="alt">/);
	assert.match(html, /<table>[\s\S]*<td>2<\/td>/);
});

test("colors code, and escapes code in an unknown language", () => {
	const py = renderMarkdown("```python\ndef f(x):\n    return x\n```\n");
	assert.match(py, /<pre><code class="hljs language-python">/);
	assert.match(py, /class="hljs-keyword">def</);
	const plain = renderMarkdown("```nolang\n<b>&</b>\n```\n");
	assert.match(plain, /&lt;b&gt;&amp;&lt;\/b&gt;/);
	assert.doesNotMatch(plain, /<b>/);
});

test("renders math, inline and as a block", () => {
	assert.match(renderMarkdown("Energy is $E = mc^2$ here."), /<p>Energy is <span class="katex">/);
	assert.match(renderMarkdown("$$\n\\frac{a}{b}\n$$\n"), /class="katex-display"/);
});

test("text that looks like math stays text", () => {
	assert.doesNotMatch(renderMarkdown("It costs $5 and $10 per user."), /katex/);
	assert.doesNotMatch(renderMarkdown("A price of \\$5 or \\$x\\$."), /katex/);
	assert.doesNotMatch(renderMarkdown("Run `echo $HOME $PATH` now."), /katex/);
	assert.doesNotMatch(renderMarkdown("```\n$a$\n```\n"), /katex/);
	// A formula never starts before a code span and ends inside it.
	for (const text of ["Set $HOME and `$PATH` first.", "It costs $5 to run `$HOME/bin` here."]) {
		const html = renderMarkdown(text);
		assert.doesNotMatch(html, /katex/);
		assert.match(html, /<code>\$(PATH|HOME\/bin)<\/code>/);
	}
});

test("a broken formula stops the build, and the message names the file", () => {
	assert.throws(() => renderMarkdown("$\\frac{a$"));
	const files = [{ name: "bad-math.md", raw: file({}, "A formula: $\\frac{a$\n") }];
	assert.throws(() => buildPosts(files, { drafts: true }), /^Error: bad-math\.md: /);
});


// A bad post fails here, before the build.
test("finds a sentence that is written twice, and stock phrases", () => {
	assert.deepEqual(
		styleProblems("A local model keeps your data inside.\n\nIt costs more at the start."),
		[],
	);
	const twice = [
		"A local model keeps your data inside your walls.",
		"## Next",
		"More text here. A local  model keeps your data inside your walls!",
	].join("\n\n");
	const found = styleProblems(twice);
	assert.equal(found.length, 1);
	assert.match(found[0], /same sentence appears twice: "A local  model keeps/);
	// Short sentences may repeat. Code, tables, and headings are not prose.
	assert.deepEqual(styleProblems("It works. Really.\n\nIt works. Yes."), []);
	const line = "const a = 1; // one two three four five six.";
	assert.deepEqual(styleProblems(`\`\`\`js\n${line}\n${line}\n\`\`\`\n`), []);
	const row = "| one two three four five six. | b |";
	assert.deepEqual(styleProblems(`${row}\n${row}\n`), []);
	for (const phrase of [
		"cutting-edge",
		"Seamlessly",
		"revolutionise",
		"In today's fast-paced world",
		"delve into",
		"It is important to note",
	]) {
		assert.match(styleProblems(`We ${phrase} things.`).join(), /stock phrase/, phrase);
	}
	// Two sentences that differ only in their code are not the same sentence.
	assert.deepEqual(
		styleProblems(
			"- Set `temperature` to zero for this test run.\n- Set `top_p` to zero for this test run.\n",
		),
		[],
	);
	assert.equal(
		styleProblems(
			"Set `top_p` to zero for this test run.\n\nSet `top_p` to zero for this test run.\n",
		).length,
		1,
	);
	// A word in code is not a word in the text.
	assert.deepEqual(styleProblems("Call `seamless()` first."), []);
});

test("every file in content/blog is a valid post", () => {
	const names = readdirSync("content/blog").filter((n) => n.endsWith(".md"));
	assert.ok(names.includes("writing-a-post.md"), "the sample post is missing");
	for (const name of names) {
		const raw = readFileSync(`content/blog/${name}`, "utf8");
		const post = parsePost(name.slice(0, -3), raw);
		// buildPosts renders the post. Its errors name the file.
		buildPosts([{ name, raw }], { drafts: true });
		assert.ok(!/\p{Extended_Pictographic}/u.test(raw), `${name}: emoji`);
		assert.deepEqual(styleProblems(post.body), [], name);
		const images = [...raw.matchAll(/\]\((\/[^)\s]+)/g)].map((m) => m[1]);
		if (post.image) images.push(post.image);
		for (const path of images.filter((p) => p.startsWith("/images/"))) {
			assert.ok(existsSync(`public${path}`), `${name}: ${path} is missing`);
		}
	}
});

test("the sample post is a draft", () => {
	const raw = readFileSync("content/blog/writing-a-post.md", "utf8");
	assert.equal(parsePost("writing-a-post", raw).draft, true);
});

// The second guard against a draft on the live site. The first one is the
// build script, which leaves drafts out of the JSON.
test("a production build drops drafts, even from a stale JSON file", async () => {
	const { withoutDrafts } = await import("../data/blog.ts");
	const data = {
		posts: [
			{ slug: "live", draft: false },
			{ slug: "wip", draft: true },
		],
		html: { live: "<p>live</p>", wip: "<p>wip</p>" },
	};
	assert.deepEqual(withoutDrafts(data), {
		posts: [{ slug: "live", draft: false }],
		html: { live: "<p>live</p>" },
	});
	assert.match(readFileSync("src/data/posts.ts", "utf8"), /NODE_ENV === "production" \? withoutDrafts\(/);
});

test("pnpm build builds the posts first, without drafts", () => {
	const { scripts } = JSON.parse(readFileSync("package.json", "utf8"));
	assert.match(scripts.build, /^node scripts\/build-posts\.mjs && next build$/);
	assert.match(scripts.dev, /build-posts\.mjs --drafts --watch/);
});

test("dates read well", async () => {
	const { formatDate } = await import("../data/blog.ts");
	assert.equal(formatDate("2026-12-01"), "1 December 2026");
});
