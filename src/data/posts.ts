// Server side only. Never import this file from a client component: it holds
// the full text of every post, and all of it would go to the browser.
// Two guards: the "server-only" import below fails the build, and
// src/lib/design.test.mjs fails `pnpm test`.
//
// The JSON is written by scripts/build-posts.mjs before every `pnpm dev` and
// `pnpm build`. It is not in git. Posts are plain data here, so no page reads
// a file when the site runs on Cloudflare Workers.
// ponytail: one JSON file for all posts. Split it per post if the Worker gets
// too big (some hundreds of posts).
import "server-only";
import generated from "./posts.generated.json";
import { withoutDrafts, type PostData } from "./blog";

const all = generated as PostData;
// A production build never holds a draft, even when the JSON file is stale.
const data = process.env.NODE_ENV === "production" ? withoutDrafts(all) : all;

// Newest first. Drafts are in here only under `pnpm dev`.
export const posts = data.posts;
export const postHtml = data.html;
