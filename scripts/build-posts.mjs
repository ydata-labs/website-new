// Turns content/blog/*.md into src/data/posts.generated.json.
// `pnpm dev` and `pnpm build` run this first. The pages import the JSON, so
// nothing reads a file when the site runs on Cloudflare Workers.
//
//   --drafts   keep posts with `draft: true` (local development only)
//   --watch    run again when a post changes
import { existsSync, readdirSync, readFileSync, watch, writeFileSync } from "node:fs";
import { buildPosts } from "../src/lib/blog.mjs";

const DIR = "content/blog";
const OUT = "src/data/posts.generated.json";
const drafts = process.argv.includes("--drafts");

function build() {
	// A missing folder means no posts.
	const names = existsSync(DIR) ? readdirSync(DIR) : [];
	const files = names
		.filter((name) => name.endsWith(".md"))
		.map((name) => ({ name, raw: readFileSync(`${DIR}/${name}`, "utf8") }));
	const data = buildPosts(files, { drafts });
	writeFileSync(OUT, `${JSON.stringify(data, null, "\t")}\n`);
	const count = data.posts.length;
	const draftCount = data.posts.filter((post) => post.draft).length;
	console.log(
		`blog: ${count} ${count === 1 ? "post" : "posts"}` +
			(draftCount ? ` (${draftCount} ${draftCount === 1 ? "draft" : "drafts"})` : ""),
	);
}

// A bad post throws here. The script exits with code 1, so `next build` does
// not start and nothing half-right is published.
build();

if (process.argv.includes("--watch") && existsSync(DIR)) {
	// `pnpm dev` starts this watcher in the background, next to `next dev`.
	// When the dev server is gone, the shell that started both is gone too,
	// and this process gets a new parent. Stop then, so no watcher is left over.
	const parent = process.ppid;
	setInterval(() => {
		if (process.ppid !== parent) process.exit(0);
	}, 2000);

	watch(DIR, () => {
		try {
			build();
		} catch (error) {
			// Keep watching: the writer is in the middle of an edit.
			console.error(`blog: ${error.message}`);
		}
	});
}
