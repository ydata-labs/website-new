// Post logic for the blog: read the details, check them, render Markdown.
// No file access here. scripts/build-posts.mjs reads the files, and the tests
// pass text in.
// Plain JavaScript on purpose: the build runs this file, so it must not need
// a Node version that runs TypeScript directly.
// Never import this file from a page. It would pull the Markdown libraries
// into the Cloudflare Worker.
import { Marked } from "marked";
import hljs from "highlight.js/lib/common";
import katex from "katex";

const AUDIENCES = ["leaders", "research"];
const TOPICS = ["ai-engineering", "platform-engineering", "data-science"];
const REQUIRED = ["title", "description", "date", "audience", "topic", "author"];
const KEYS = [...REQUIRED, "draft", "image"];
const WORDS_PER_MINUTE = 200;

const escapeHtml = (text) =>
	text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");

// A broken formula throws. The build stops instead of publishing red error text.
const math = (tex, displayMode) =>
	katex.renderToString(tex, { displayMode, throwOnError: true });

// Raw HTML inside a post passes through unchanged. Posts come from this
// repository, so the writer is trusted.
const markdown = new Marked({
	renderer: {
		code({ text, lang }) {
			const language = (lang ?? "").trim().split(/\s+/)[0];
			const known = language && hljs.getLanguage(language);
			const html = known
				? hljs.highlight(text, { language }).value
				: escapeHtml(text);
			const name = known ? ` language-${language}` : "";
			return `<pre><code class="hljs${name}">${html}</code></pre>\n`;
		},
	},
	extensions: [
		{
			// $$ ... $$ on its own lines.
			name: "mathBlock",
			level: "block",
			start: (src) => src.match(/(^|\n)\$\$/)?.index,
			tokenizer(src) {
				const m = /^\$\$\n?([\s\S]+?)\n?\$\$(?:\n|$)/.exec(src);
				if (m) return { type: "mathBlock", raw: m[0], text: m[1] };
			},
			renderer: (token) => `${math(token.text, true)}\n`,
		},
		{
			// $...$ inside a line. The rule that keeps prices like "$5 and $10"
			// as text: no space right after the first $, no space right before
			// the last $, and no digit right after the last $. A formula also
			// never holds a backtick, so it cannot run into a code span.
			name: "mathInline",
			level: "inline",
			start: (src) => src.match(/(?<!\\)\$/)?.index,
			tokenizer(src) {
				const m = /^\$(?!\s)((?:\\[^\n]|[^\\$\n`])+?)(?<!\s)\$(?!\d)/.exec(src);
				if (m) return { type: "mathInline", raw: m[0], text: m[1] };
			},
			renderer: (token) => math(token.text, false),
		},
	],
});

export const renderMarkdown = (body) => markdown.parse(body);

function readDetails(raw, fail) {
	const lines = raw.replace(/\r\n?/g, "\n").split("\n");
	const end = lines.findIndex((line, i) => i > 0 && line.trim() === "---");
	if (lines[0].trim() !== "---" || end === -1) {
		fail("no details block. The file must start with a block between two --- lines");
	}
	const details = {};
	for (const line of lines.slice(1, end)) {
		if (!line.trim()) continue;
		const m = line.match(/^([A-Za-z]+):(.*)$/);
		if (!m) fail(`cannot read the line "${line}". Write it as "key: value"`);
		const [, key, rest] = m;
		if (!KEYS.includes(key)) {
			fail(`unknown key "${key}". Allowed keys: ${KEYS.join(", ")}`);
		}
		// A value in quotes keeps everything inside the quotes. Otherwise
		// " #" starts a comment.
		const quoted = rest.trim().match(/^(["'])(.*)\1\s*(#.*)?$/);
		details[key] = quoted
			? quoted[2]
			: rest.replace(/(^|\s)#.*$/, "").trim();
	}
	return { details, body: lines.slice(end + 1).join("\n") };
}

const isRealDay = (date) =>
	/^\d{4}-\d{2}-\d{2}$/.test(date) &&
	!Number.isNaN(Date.parse(date)) &&
	new Date(date).toISOString().slice(0, 10) === date;

// Turns the text of one file into a post. Throws when a detail is missing or
// wrong. Every message starts with the file name.
export function parsePost(slug, raw) {
	const fail = (message) => {
		throw new Error(`${slug}.md: ${message}`);
	};
	if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
		fail("the file name may only use a-z, 0-9, and single dashes");
	}
	const { details, body } = readDetails(raw, fail);

	for (const key of REQUIRED) {
		if (!details[key]) fail(`"${key}" is missing`);
	}
	if (!isRealDay(details.date)) {
		fail("date must be a real day, written as YYYY-MM-DD");
	}
	if (!AUDIENCES.includes(details.audience)) {
		fail(`audience must be one of: ${AUDIENCES.join(", ")}`);
	}
	if (!TOPICS.includes(details.topic)) {
		fail(`topic must be one of: ${TOPICS.join(", ")}`);
	}
	const draft = details.draft ?? "false";
	if (draft !== "true" && draft !== "false") fail("draft must be true or false");
	if (details.image !== undefined && !details.image.startsWith("/")) {
		fail('image must start with "/", for example /images/blog/x.webp');
	}
	if (!body.trim()) fail("the post is empty");
	// The lexer skips "#" lines inside code blocks.
	if (markdown.lexer(body).some((t) => t.type === "heading" && t.depth === 1)) {
		fail('a level 1 heading ("# ") is not allowed. The title is the page heading. Start at "##"');
	}

	return {
		slug,
		title: details.title,
		description: details.description,
		date: details.date,
		audience: details.audience,
		topic: details.topic,
		author: details.author,
		draft: draft === "true",
		...(details.image && { image: details.image }),
		readingMinutes: Math.max(
			1,
			Math.round(body.trim().split(/\s+/).length / WORDS_PER_MINUTE),
		),
		body,
	};
}

// Newest first. Posts of the same day sort by name, so the order is stable.
export const selectPosts = (posts, { drafts }) =>
	posts
		.filter((post) => drafts || !post.draft)
		.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));

// files: [{ name: "my-post.md", raw: "..." }]. Every .md file is checked,
// drafts too. Only the selected posts are rendered.
export function buildPosts(files, { drafts }) {
	const parsed = files
		.filter((file) => file.name.endsWith(".md"))
		.map((file) => parsePost(file.name.slice(0, -3), file.raw));
	const html = {};
	const posts = selectPosts(parsed, { drafts }).map((post) => {
		const { body, ...meta } = post;
		try {
			html[meta.slug] = renderMarkdown(body);
		} catch (error) {
			throw new Error(`${meta.slug}.md: ${error.message}`);
		}
		return meta;
	});
	return { posts, html };
}
