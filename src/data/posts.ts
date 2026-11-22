// Server side only. Never import this file from a client component: it holds
// the full text of every post, and all of it would go to the browser.
// (src/lib/design.test.mjs checks this.)
//
// The JSON is written by scripts/build-posts.mjs before every `pnpm dev` and
// `pnpm build`. It is not in git. Posts are plain data here, so no page reads
// a file when the site runs on Cloudflare Workers.
// ponytail: one JSON file for all posts. Split it per post if the Worker gets
// too big (some hundreds of posts).
import generated from "./posts.generated.json";
import type { PostMeta } from "./blog";

const data = generated as { posts: PostMeta[]; html: Record<string, string> };

// Newest first. Drafts are in here only under `pnpm dev`.
export const posts = data.posts;
export const postHtml = data.html;
