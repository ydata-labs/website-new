# Phase 1: Fix What Is Broken — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the contact form really send email, fix the search (SEO) bugs, and add a privacy page, on the current light design.

**Architecture:** All contact logic lives in one plain TypeScript file, `src/lib/contact.ts`. It has no imports, so Node can test it directly. The Next.js route is a three-line wrapper around it. Email goes out through the Resend HTTP API with one `fetch` call. SEO fixes use Next.js built-in file conventions (`sitemap.ts`, `robots.ts`, `opengraph-image.png`, `apple-icon.png`).

**Tech Stack:** Next.js 15.5.6 (App Router), React 19, Tailwind CSS 4, pnpm, Cloudflare Workers through OpenNext, Node 24 built-in test runner (`node --test`), Resend HTTP API. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-11-21-site-upgrade-design.md` (sections 5, 6, 12, 13). This plan covers phase 1 only. Phases 2 and 3 get their own plans after phase 1 is live.

## Global Constraints

- **A push to `main` publishes the live site.** Work only on the branch `phase-1-fixes`. Never push or merge to `main` without the owner's yes in chat.
- Never push any branch without the owner's yes.
- No new npm dependencies.
- No file system access at run time. Every page must build as a static page.
- Keep the addresses `/` and `/portfolio`.
- The design stays light in this phase. Do not restyle anything.
- The API key is a Cloudflare secret. It never appears in code, in a commit, or in chat. The owner sets it.
- The form must never show "sent" when the email was not sent.
- True numbers, confirmed by the owner on 2026-11-21: **20+ years in software, 10+ years in AI and healthcare, 40+ peer-reviewed papers.**
- Recipient address: `info@ydatalabs.nl`. Site address: `https://ydatalabs.nl`.

## Review Focus

Each line names a condition and what a visitor should get. The test that pins it is in the task named at the end of the line.

1. **The email service is down, answers with an error, or the network call throws.** The visitor sees an error with the direct email address. Never "sent". (Task 1, tests `resend error gives 502` and `fetch throw gives 502`.)
2. **The API key is missing in production.** The route answers 500, logs the reason, and calls nothing. (Task 1, test `missing key gives 500`.)
3. **The body is not what we expect:** not JSON, `null`, an array, or fields that are numbers or objects. The route answers 400. It does not throw. (Task 1, tests `rejects non-object bodies` and `invalid JSON gives 400`.)
4. **Hostile text:** a subject or name with line breaks (`\r\nBcc: x`), or a very long message. Line breaks become spaces. Too-long input is rejected. (Task 1, tests `collapses line breaks` and `enforces length limits`.)
5. **A page loses its share image or gets the wrong canonical address.** `/portfolio` defines its own `openGraph` block, and in Next.js that replaces the parent block, images included. Every page must show its own canonical and an `og:image`. (Task 3, Step 6, the `curl` checks.)

---

### Task 1: Contact handler and route

**Files:**
- Create: `src/lib/contact.ts`
- Create: `src/lib/contact.test.mjs`
- Create: `src/app/api/contact/route.ts`
- Modify: `package.json` (add `test` script)
- Modify: `.dev.vars.example`, `wrangler.jsonc` (comments only), `CLAUDE.md` (Contact Form and Environment Variables sections)

**Interfaces:**
- Consumes: nothing.
- Produces, all exported from `src/lib/contact.ts`:

```ts
export interface ContactInput {
	name: string;
	email: string;
	subject: string;
	phone: string; // "" when not given
	message: string;
}

export type ParseResult =
	| { ok: true; data: ContactInput }
	| { ok: false; spam: true }
	| { ok: false; spam: false; error: string };

export interface ContactEnv {
	RESEND_API_KEY?: string;
	CONTACT_EMAIL?: string; // default "info@ydatalabs.nl"
	CONTACT_FROM?: string; // default "yDataLabs Website <website@ydatalabs.nl>"
}

export function parseContact(body: unknown): ParseResult;

export function handleContact(
	request: Request,
	env: ContactEnv,
	fetchFn?: typeof fetch, // default: global fetch
): Promise<Response>;
```

- HTTP contract of `POST /api/contact` (Task 2 relies on it):
  - `200 {"ok":true}`: sent, or silently dropped as spam.
  - `400 {"error":"<sentence for the visitor>"}`: bad input.
  - `500 {"error":"send_failed"}`: server is not configured.
  - `502 {"error":"send_failed"}`: the email service failed.
- The honeypot field is named `website`.

**Rules for `parseContact`:**
- The body must be a plain object. Every field must be a string, or absent for `phone` and `website`.
- Trim all fields. In `name`, `email`, `subject`, and `phone`, replace any run of whitespace, line breaks included, with one space.
- If `website` is a non-empty string after trim, return `{ ok: false, spam: true }`. Check this before any other validation.
- Limits: `name` 1 to 100. `email` 3 to 254 and must match `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`. `subject` 1 to 150. `phone` 0 to 30. `message` 1 to 5000.
- The error sentence names the field, for example `"Please enter a valid email address."`

**Rules for `handleContact`:**
- Read JSON with `request.json()` inside `try`. On failure answer 400.
- Spam: answer `200 {"ok":true}`. Do not call `fetchFn`.
- No `RESEND_API_KEY`: `console.error`, answer 500. Do not call `fetchFn`.
- Otherwise call `fetchFn("https://api.resend.com/emails", …)` with method `POST` and this JSON body. Pass `headers` as a plain object with the keys `Authorization` (`Bearer <key>`) and `Content-Type` (`application/json`). The tests read `init.headers.Authorization`.

```json
{
  "from": "<CONTACT_FROM>",
  "to": ["<CONTACT_EMAIL>"],
  "reply_to": "<visitor email>",
  "subject": "[ydatalabs.nl] <subject>",
  "text": "Name: …\nEmail: …\nPhone: …\n\n<message>"
}
```

- A non-2xx answer or a thrown error: `console.error` with the status, answer 502.
- Build every response with the standard `Response.json(...)`. Do not import from `next/server`. The file must have no imports at all, so Node can run it.
- Use only erasable TypeScript syntax (no `enum`, no parameter properties). Node strips the types at run time.

- [ ] **Step 1: Create the branch and commit the documents**

```bash
git checkout -b phase-1-fixes
git add .gitignore docs/superpowers
git commit -m "docs: add site upgrade design and phase 1 plan"
```

- [ ] **Step 2: Add the test script**

In `package.json` scripts, add:

```json
"test": "node --test \"src/**/*.test.mjs\""
```

- [ ] **Step 3: Write the failing tests in `src/lib/contact.test.mjs`**

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { parseContact, handleContact } from "./contact.ts";

const valid = {
	name: " Ada Lovelace ",
	email: "ada@example.com",
	subject: "Hello",
	phone: "",
	message: "A real question.",
};
const env = { RESEND_API_KEY: "test-key" };
const post = (body) =>
	new Request("https://ydatalabs.nl/api/contact", {
		method: "POST",
		body: typeof body === "string" ? body : JSON.stringify(body),
	});
const fakeFetch = (status = 200) => {
	const calls = [];
	const fn = async (url, init) => {
		calls.push({ url, init });
		return new Response("{}", { status });
	};
	return { fn, calls };
};

test("accepts valid input and trims it", () => {
	const r = parseContact(valid);
	assert.equal(r.ok, true);
	assert.equal(r.data.name, "Ada Lovelace");
	assert.equal(r.data.phone, "");
});

test("phone may be absent", () => {
	const { phone, ...rest } = valid;
	assert.equal(parseContact(rest).ok, true);
});

test("rejects missing and invalid fields", () => {
	for (const bad of [
		{ ...valid, name: "  " },
		{ ...valid, message: "" },
		{ ...valid, email: "a@b" },
		{ ...valid, email: "a b@c.de" },
		{ ...valid, name: 5 },
		{ ...valid, message: { x: 1 } },
	]) {
		const r = parseContact(bad);
		assert.equal(r.ok, false);
		assert.equal(r.spam, false);
		assert.equal(typeof r.error, "string");
	}
});

test("rejects non-object bodies", () => {
	for (const bad of [null, [], "text", 42, undefined]) {
		assert.equal(parseContact(bad).ok, false);
	}
});

test("enforces length limits", () => {
	assert.equal(parseContact({ ...valid, message: "x".repeat(5000) }).ok, true);
	assert.equal(parseContact({ ...valid, message: "x".repeat(5001) }).ok, false);
	assert.equal(parseContact({ ...valid, name: "x".repeat(101) }).ok, false);
	assert.equal(parseContact({ ...valid, subject: "x".repeat(151) }).ok, false);
	assert.equal(parseContact({ ...valid, phone: "1".repeat(31) }).ok, false);
});

test("collapses line breaks in single-line fields", () => {
	const r = parseContact({ ...valid, subject: "Hi\r\nBcc: evil@example.com" });
	assert.equal(r.ok, true);
	assert.equal(/[\r\n]/.test(r.data.subject), false);
});

test("honeypot marks spam before other checks", () => {
	const r = parseContact({ ...valid, email: "bad", website: "http://spam" });
	assert.deepEqual(r, { ok: false, spam: true });
});

test("sends one email with the right fields", async () => {
	const f = fakeFetch(200);
	const res = await handleContact(post(valid), env, f.fn);
	assert.equal(res.status, 200);
	assert.deepEqual(await res.json(), { ok: true });
	assert.equal(f.calls.length, 1);
	assert.equal(f.calls[0].url, "https://api.resend.com/emails");
	assert.equal(f.calls[0].init.headers.Authorization, "Bearer test-key");
	const sent = JSON.parse(f.calls[0].init.body);
	assert.deepEqual(sent.to, ["info@ydatalabs.nl"]);
	assert.equal(sent.reply_to, "ada@example.com");
	assert.equal(sent.subject, "[ydatalabs.nl] Hello");
	assert.match(sent.text, /A real question\./);
});

test("spam gives 200 and sends nothing", async () => {
	const f = fakeFetch();
	const res = await handleContact(post({ ...valid, website: "x" }), env, f.fn);
	assert.equal(res.status, 200);
	assert.equal(f.calls.length, 0);
});

test("invalid JSON gives 400", async () => {
	const f = fakeFetch();
	const res = await handleContact(post("{not json"), env, f.fn);
	assert.equal(res.status, 400);
	assert.equal(f.calls.length, 0);
});

test("bad input gives 400 with a sentence", async () => {
	const res = await handleContact(post({ ...valid, email: "nope" }), env, fakeFetch().fn);
	assert.equal(res.status, 400);
	assert.match((await res.json()).error, /email/i);
});

test("missing key gives 500", async () => {
	const f = fakeFetch();
	const res = await handleContact(post(valid), {}, f.fn);
	assert.equal(res.status, 500);
	assert.equal(f.calls.length, 0);
});

test("resend error gives 502", async () => {
	const res = await handleContact(post(valid), env, fakeFetch(500).fn);
	assert.equal(res.status, 502);
	assert.deepEqual(await res.json(), { error: "send_failed" });
});

test("fetch throw gives 502", async () => {
	const boom = async () => {
		throw new Error("network");
	};
	const res = await handleContact(post(valid), env, boom);
	assert.equal(res.status, 502);
});
```

- [ ] **Step 4: Run the tests and see them fail**

Run: `pnpm test`
Expected: FAIL. The error says `./contact.ts` cannot be found.

- [ ] **Step 5: Implement `src/lib/contact.ts`**

Write `parseContact` and `handleContact` to the Interfaces block and the two rule lists above.

- [ ] **Step 6: Run the tests and see them pass**

Run: `pnpm test`
Expected: 14 tests pass, 0 fail.

- [ ] **Step 7: Create the route `src/app/api/contact/route.ts`**

```ts
import { handleContact } from "@/lib/contact";

export const POST = (request: Request) => handleContact(request, process.env);
```

- [ ] **Step 8: Check the route in the dev server**

Run `pnpm dev` in the background. Then run:

```bash
curl -s -o /dev/null -w '%{http_code}\n' -X POST localhost:3000/api/contact -H 'Content-Type: application/json' -d '{"name":"T","email":"bad","subject":"s","message":"m"}'
curl -s -o /dev/null -w '%{http_code}\n' -X POST localhost:3000/api/contact -H 'Content-Type: application/json' -d '{"name":"T","email":"t@example.com","subject":"s","message":"m"}'
```

Expected: `400`, then `500` (no key is set locally). Stop the dev server.

- [ ] **Step 9: Update the notes about email**

- `.dev.vars.example`: add the line `RESEND_API_KEY=` with a comment that says where the key comes from.
- `wrangler.jsonc`: delete the commented `send_email` block and the commented `vars` block. Add a short comment: the secret `RESEND_API_KEY` is set with `wrangler secret put RESEND_API_KEY`. `CONTACT_EMAIL` and `CONTACT_FROM` are optional.
- `CLAUDE.md`: in "Contact Form" and "Environment Variables", replace the Cloudflare Email Workers text. Say: the form posts to `/api/contact`, logic is in `src/lib/contact.ts`, email goes through Resend, tests run with `pnpm test`. Also add `pnpm test` to the commands list, and note that a push to `main` publishes the site.

- [ ] **Step 10: Lint, build, commit**

Run: `pnpm lint && pnpm build`
Expected: both pass. The build output lists `/api/contact` as a dynamic route.

```bash
git add package.json src/lib src/app/api .dev.vars.example wrangler.jsonc CLAUDE.md
git commit -m "feat: add working contact form route with validation and tests"
```

---

### Task 2: Contact form, privacy notice, privacy page

**Files:**
- Modify: `src/components/sections/Contact.tsx`
- Create: `src/app/privacy/page.tsx`
- Modify: `src/data/navigation.ts` (`footerNavigation.company`)

**Interfaces:**
- Consumes: the HTTP contract of `POST /api/contact` and the honeypot field name `website` from Task 1.
- Produces: the page `/privacy`. Task 3 adds it to the sitemap.

- [ ] **Step 1: Change the form in `Contact.tsx`**

- Remove the `agreed` state, the "Please agree to the terms" check, and the whole checkbox `<label>`.
- Add `website: ""` to the form state and send it in the body.
- Add the honeypot input. It must be invisible to people and skipped by keyboards and screen readers:

```tsx
<input
	type="text"
	name="website"
	value={formData.website}
	onChange={handleChange}
	tabIndex={-1}
	autoComplete="off"
	aria-hidden="true"
	className="absolute -left-[9999px] h-0 w-0 opacity-0"
/>
```

- Where the checkbox was, put this exact text. "privacy page" links to `/privacy`:

> We use your details only to answer your message. See our privacy page.

- Give each visible input an `aria-label` equal to its placeholder. The form has no labels today.
- Change the response handling:
  - `200`: success message, clear the form.
  - `400`: show the `error` sentence from the response body.
  - Anything else, or a thrown error: show `Something went wrong. Please email us directly at info@ydatalabs.nl.`

- [ ] **Step 2: Create `src/app/privacy/page.tsx`**

A static server component. It uses `Header` and `Footer` like `src/app/portfolio/page.tsx`, with one `h1`, "Privacy".

```ts
export const metadata: Metadata = {
	title: "Privacy",
	description: "How yDataLabs handles the details you send through the contact form.",
	alternates: { canonical: "/privacy" },
};
```

The text is in plain language and covers these points, each under its own `h2`:

1. **What we collect.** Name, email address, subject, message, and a phone number if you give one. Only when you send the contact form.
2. **Why.** Only to answer your message.
3. **Who receives it.** yDataLabs. Resend delivers the email to our mailbox. Cloudflare hosts the site and processes technical data such as IP addresses.
4. **How long we keep it.** As long as we need to handle your request, and at most 24 months after the last contact.
5. **Cookies and tracking.** The site sets no tracking cookies and uses no analytics.
6. **Your rights.** You can ask to see, correct, or delete your details. Write to `info@ydatalabs.nl`.
7. **Who we are.** yDataLabs, Maastricht, the Netherlands. `info@ydatalabs.nl`.

Add a visible "Last updated: 21 November 2026" line.

- [ ] **Step 3: Add the footer link**

In `src/data/navigation.ts`, add `{ label: "Privacy", href: "/privacy" }` to `footerNavigation.company`.

- [ ] **Step 4: Check in the browser**

Run `pnpm dev`. Open `http://localhost:3000/#contact` and check:

- The checkbox is gone. The notice line shows, and its link opens `/privacy`.
- Pressing Tab through the form never lands on the hidden field.
- Send the form with a valid email. Expected: the error message with `info@ydatalabs.nl` (the local server has no key, so it answers 500). It must not say "sent".
- Open `/privacy` at desktop width and at 375 px width. The text is readable, and the footer link works.

- [ ] **Step 5: Lint, build, commit**

Run: `pnpm lint && pnpm build`
Expected: both pass. `/privacy` is listed as a static page.

```bash
git add src/components/sections/Contact.tsx src/app/privacy src/data/navigation.ts
git commit -m "feat: replace false consent checkbox with privacy notice and page"
```

---

### Task 3: Search fixes

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/portfolio/page.tsx` (metadata only)
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Modify: `src/data/portfolio.ts` (two strings)
- Delete: `public/next.svg`, `public/globe.svg`, `public/file.svg`, `public/window.svg`

**Interfaces:**
- Consumes: the page `/privacy` from Task 2.
- Produces: nothing other tasks use.

- [ ] **Step 1: Fix the root metadata in `src/app/layout.tsx`**

- Delete the `alternates` block. A canonical in the root layout is inherited by every page. That is the bug.
- Delete the `verification` block. The domain is already verified by a DNS record.
- Delete `openGraph.images` and `twitter.images`. Task 4 adds the image as a file, which applies to every page.
- Delete the `<link rel="apple-touch-icon" …>` line. Task 4 adds the icon as a file.
- Line 25, description: change `PhD with 20+ years experience in healthcare AI` to `PhD, with 10+ years in healthcare AI`.
- Line 103, founder description: change to `PhD in Computer Vision, 20+ years in software, 10+ years in healthcare AI and machine learning`.

- [ ] **Step 2: Give each page its own canonical**

- `src/app/page.tsx`: add `export const metadata: Metadata = { alternates: { canonical: "/" } };`
- `src/app/portfolio/page.tsx`: add `alternates: { canonical: "/portfolio" }` to the existing metadata. In its `openGraph` block add `url: "/portfolio"`.

- [ ] **Step 3: Create `src/app/sitemap.ts`**

Default export of type `MetadataRoute.Sitemap`. Three entries: `https://ydatalabs.nl`, `https://ydatalabs.nl/portfolio`, `https://ydatalabs.nl/privacy`. No `lastModified`.

- [ ] **Step 4: Create `src/app/robots.ts`**

Default export of type `MetadataRoute.Robots`: allow everything for all user agents, and `sitemap: "https://ydatalabs.nl/sitemap.xml"`.

- [ ] **Step 5: Fix the numbers and delete unused files**

- `src/data/portfolio.ts`: in the two strings that say `more than 30 peer-reviewed publications`, change `30` to `40`.
- Run `grep -rn 'next.svg\|globe.svg\|file.svg\|window.svg' src`. Expected: no output. Then delete the four files with `git rm`.
- Run `grep -rn 'more than 30\|20+ years experience' src`. Expected: no output.

- [ ] **Step 6: Build and check the real output**

Run `pnpm build`, then `pnpm start` in the background. Then:

```bash
for p in / /portfolio /privacy; do curl -s localhost:3000$p | grep -o '<link rel="canonical"[^>]*>'; done
curl -s localhost:3000/sitemap.xml | grep -c '<loc>'
curl -s localhost:3000/robots.txt
curl -s localhost:3000/ | grep -c 'google-site-verification'
```

Expected:

- Three canonical tags: the home address (with or without a final slash), then one ending in `/portfolio"`, then one ending in `/privacy"`.
- `3`.
- A robots file with `Allow: /` and the `Sitemap:` line.
- `0`.

Stop the server.

- [ ] **Step 7: Lint and commit**

Run: `pnpm lint`
Expected: pass.

```bash
git add -A src public
git commit -m "fix: per-page canonical, sitemap, robots, and consistent facts"
```

---

### Task 4: Share image and touch icon

**Files:**
- Create: `scripts/og-image.html`, `scripts/apple-icon.html` (sources, so the images can be made again)
- Create: `src/app/opengraph-image.png` (1200x630)
- Create: `src/app/opengraph-image.alt.txt`
- Create: `src/app/apple-icon.png` (180x180)

**Interfaces:**
- Consumes: Task 3 removed the old image and icon references from `layout.tsx`.
- Produces: nothing other tasks use.

The share image uses the "Dark lab" look from the spec, section 7, because phase 2 moves the site to that look. Tokens: background `#0b1220` with a faint 32px grid, text `#f8fafc`, muted `#94a3b8`, accent `#2dd4bf`, font JetBrains Mono.

- [ ] **Step 1: Write `scripts/og-image.html`**

A full HTML page with a body of exactly 1200x630 px and no margin. Content:

- Top left: the name `yDataLabs`, with `Data` in the accent color.
- Middle: the headline `LLMs and AI that run where your data lives.` Large, at most three lines.
- Bottom left: `Proven in healthcare`. Bottom right: `ydatalabs.nl`. Both muted.
- Keep 64 px of empty space on every side.

- [ ] **Step 2: Render it**

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --hide-scrollbars --force-device-scale-factor=1 --virtual-time-budget=5000 --window-size=1200,630 --screenshot=src/app/opengraph-image.png "file://$PWD/scripts/og-image.html"
sips -g pixelWidth -g pixelHeight src/app/opengraph-image.png
```

Expected: `pixelWidth: 1200` and `pixelHeight: 630`. Open the PNG and look at it. The font is JetBrains Mono, not a fallback, and no text is cut off.

- [ ] **Step 3: Write the alt text**

`src/app/opengraph-image.alt.txt` holds one line: `yDataLabs: LLMs and AI that run where your data lives.`

- [ ] **Step 4: Make the touch icon**

`scripts/apple-icon.html`: a 180x180 px page, background `#0b1220`, with `public/images/logo/only-logo.png` centered at 120 px wide. Render it with the same Chrome command, with `--window-size=180,180` and `--screenshot=src/app/apple-icon.png`.

Run: `sips -g pixelWidth -g pixelHeight src/app/apple-icon.png`
Expected: 180 and 180. Open the PNG. The logo is clear on the dark background.

- [ ] **Step 5: Build and check that every page has the image**

Run `pnpm build`, then `pnpm start` in the background. Then:

```bash
for p in / /portfolio /privacy; do curl -s localhost:3000$p | grep -o '<meta property="og:image" content="[^"]*"' ; done
curl -s localhost:3000/ | grep -o '<link rel="apple-touch-icon"[^>]*>'
curl -s -o /dev/null -w '%{http_code}\n' "$(curl -s localhost:3000/portfolio | grep -o 'property="og:image" content="[^"]*"' | cut -d'"' -f4 | sed 's#https://ydatalabs.nl#http://localhost:3000#;s#&amp;#\&#g')"
```

Expected:

- Three `og:image` tags, one per page. `/portfolio` must have one. This is Review Focus item 5.
- One `apple-touch-icon` tag.
- `200`.

Then run `curl -s localhost:3000/ | grep -c 'twitter:image'`. Expected: `1` or more. If it is `0`, copy the two files to `src/app/twitter-image.png` and `src/app/twitter-image.alt.txt`, rebuild, and check again.

Stop the server.

- [ ] **Step 6: Commit**

```bash
git add scripts src/app/opengraph-image.png src/app/opengraph-image.alt.txt src/app/apple-icon.png
git commit -m "feat: add share image and touch icon"
```

---

### Task 5: Full check and go-live

**Files:** none. This task runs checks and waits for the owner.

**Interfaces:**
- Consumes: everything from Tasks 1 to 4.
- Produces: phase 1 live on `https://ydatalabs.nl`.

- [ ] **Step 1: Run every check on the branch**

Run: `pnpm test && pnpm lint && pnpm build`
Expected: all pass.

- [ ] **Step 2: Check the Cloudflare build**

Run: `pnpm preview`
Expected: the OpenNext build finishes and the local worker starts. Repeat the two `curl` commands from Task 1, Step 8, against the preview address. Expected: `400`, then `500`. This proves the route runs on the Workers runtime.

Then prove that the worker can read the key. Create `.dev.vars` (it is ignored by Git) with the line `RESEND_API_KEY=not-a-real-key`. Restart the preview and repeat the second `curl`. Expected: `502`, because Resend rejects the fake key. A `500` here means the worker cannot see the variable: stop and fix that first. Delete the line from `.dev.vars` afterwards. Stop the preview.

- [ ] **Step 3: Owner sets up the email service**

Stop and ask the owner to do these. Do not do them yourself, and never ask for the key in chat.

1. Create a Resend account and add the domain `ydatalabs.nl`.
2. Add the DNS records that Resend shows, in the Cloudflare DNS page. They do not touch the Google mail records.
3. Wait until Resend shows the domain as verified.
4. Create an API key with "sending access" only.
5. Run `pnpm exec wrangler secret put RESEND_API_KEY` and paste the key at the prompt.

- [ ] **Step 4: Owner reviews**

Start `pnpm dev`. Ask the owner to look at `/`, `/#contact`, `/portfolio`, and `/privacy`, and to read the privacy text. Apply their changes and commit them.

- [ ] **Step 5: Go live, only after the owner says yes in chat**

```bash
git checkout main
git merge --ff-only phase-1-fixes
git push origin main
```

The push starts the Cloudflare build. Wait until the owner confirms that the build is green in the Cloudflare dashboard.

- [ ] **Step 6: Check the live site**

```bash
curl -s -o /dev/null -w '%{http_code}\n' https://ydatalabs.nl/sitemap.xml
curl -s https://ydatalabs.nl/robots.txt | grep -i sitemap
curl -s https://ydatalabs.nl/portfolio | grep -o '<link rel="canonical"[^>]*>'
curl -s -o /dev/null -w '%{http_code}\n' -X POST https://ydatalabs.nl/api/contact -H 'Content-Type: application/json' -d '{"name":"T","email":"bad","subject":"s","message":"m"}'
```

Expected: `200`. A `Sitemap:` line. A canonical that ends in `/portfolio"`. `400`.

If the `Sitemap:` line is missing, Cloudflare's managed `robots.txt` is replacing ours. Tell the owner. The setting is in the Cloudflare dashboard under AI crawl control.

- [ ] **Step 7: Owner sends one real message**

Ask the owner to send a real message through the live form and to confirm that it arrives at `info@ydatalabs.nl`, and that "Reply" goes to the sender's address. If it shows the error, read the Worker logs in the Cloudflare dashboard. The handler logs the Resend status code.

- [ ] **Step 8: Owner submits the sitemap**

Ask the owner to add `https://ydatalabs.nl/sitemap.xml` in Google Search Console, under Sitemaps.
