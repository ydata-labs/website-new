# Phase 2: Dark Lab Look, Home Page, Research Page: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give every page the "Dark lab" look, rebuild the home page around the three readers, and add a Research page.

**Architecture:** New color tokens replace the old ones in `globals.css`. Every component is restyled to use them. One test file guards the rules of the look (contrast, no emoji, no entry animation, no old colors). It carries a shrinking list of files that are not restyled yet, so each task has a real failing test first. Page titles and share data come from one helper in `src/data/seo.ts`. Solutions and research live in data files with their own tests.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4, Node built-in test runner, `cwebp` for images. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-11-21-site-upgrade-design.md` (sections 7, 8, 9, 13, 14).
**Mockup:** `docs/superpowers/mockups/2026-11-21-visual-style.html` (option B). It shows the look only. Its words are out of date.

## Global Constraints

- Work only on the branch `phase-2-dark-lab`.
- **A push to `main` publishes the live site.** Never push or merge to `main` without the owner's yes in chat. Never push any branch without that yes.
- No new dependencies.
- Dark only. English only. No theme switch.
- Fonts stay: JetBrains Mono for headings, small labels and the menu. Libre Franklin for long text.
- Tokens: page `#0b1220`, surface `#111a2e`, border `#1e293b`, text `#e2e8f0`, heading `#f8fafc`, muted `#94a3b8`, accent `#2dd4bf`. Shades may change for contrast only.
- All icons are SVG line icons. No emoji anywhere in `src/`.
- Text and controls meet WCAG AA contrast (Web Content Accessibility Guidelines, level AA): 4.5:1 for text, 3:1 for control borders.
- Every link and button shows a keyboard focus ring.
- Motion is small and turns off for "reduced motion". Nothing starts at zero opacity. No `animate-` class and no `opacity-0` class in `src/`.
- Every page is static. No runtime image optimizer. Images are WebP with a width and a height.
- Addresses `/` and `/portfolio` do not change. Old anchors `/#solutions`, `/#products`, `/#about`, `/#contact` keep working.
- One `h1` per page. Each page has its own title, description, and canonical address.
- True numbers: 20+ years in software, 10+ years in AI, 40+ papers. The numbers 50+ clients, 100+ projects, 100+ talks stay as they are (the owner has not confirmed them yet).
- New text must not claim a project or client that does not exist. Plain words. No "cutting-edge", "revolutionize", or "seamless".
- Do not touch the logic in `src/lib/contact.ts`. The 22 contact tests must keep passing.
- Data files that tests import (`src/data/*.ts`) use no value imports and no enums. `import type` is fine. Node runs them directly.
- End every commit message with: `Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>`
- "Blog" in the menu and the "Latest posts" home section belong to phase 3. Phase 2 does not build them.

## Review Focus

These can hurt a visitor, and no automated test in this plan can fully prove them. Each has a check in the task that owns it.

1. **Phone width (375px).** The mono headline, the hero panel, or the projects table pushes the page wider than the screen. Expected: no sideways scroll on any page. Check: browser steps in Tasks 5, 6, 7, 8.
2. **Keyboard and reduced motion.** A focus ring is missing on a link, or motion ignores the system setting. Check: CSS rule test in Task 1, browser steps in Task 8.
3. **A deleted image is still used.** Task 6 deletes files. Expected: no broken image. Check: test "every image path in src exists" in Task 6.
4. **Old links from Google and other sites.** `/#about`, `/#products`, `/#solutions`, `/#contact` must still land on a section. Check: anchor test in Task 6.
5. **Dark image on a dark page.** A logo or photo made for a light page is invisible now. This happened in phase 1. Check: look at each image on the page, in Tasks 4 and 6.

## File Structure

| File | Role |
|---|---|
| `src/app/globals.css` | Tokens, base styles, focus ring, reduced motion. Old tokens and keyframes are deleted in Task 8. |
| `src/lib/design.test.mjs` | Guards the look: contrast, CSS rules, forbidden leftovers, anchors, image paths. |
| `src/components/ui/Icon.tsx` | All line icons, by name. |
| `src/components/ui/Button.tsx`, `SectionHeader.tsx`, `Header.tsx`, `Footer.tsx` | Restyled. |
| `src/data/seo.ts` + `seo.test.mjs` | Page titles, descriptions, share data, structured data. |
| `src/data/research.ts` + `research.test.mjs` | Publications and talks. |
| `src/data/solutions.ts` + `solutions.test.mjs` | Three solution groups, advice items, proof numbers. |
| `src/data/navigation.ts` | Menu, footer links, social links. |
| `src/components/sections/` | `Hero`, `Paths` (new), `Solutions`, `Advice` (new), `Healthcare` (new), `Products`, `Founder` (new), `Contact`. `About`, `PortfolioSummary`, `Partners` are deleted. |
| `src/app/research/page.tsx`, `src/app/not-found.tsx` | New pages. |
| `src/app/portfolio/page.tsx`, `src/app/privacy/page.tsx` | Restyled. |

---

### Task 1: Tokens, base styles, and the design test

**Files:**
- Create: `src/lib/design.test.mjs`, `src/components/ui/Icon.tsx`
- Modify: `src/app/globals.css`, `src/components/ui/Button.tsx`, `src/components/ui/SectionHeader.tsx`, `src/components/ui/index.ts`, `src/app/layout.tsx` (theme color only)
- Add to git: `docs/superpowers/mockups/2026-11-21-visual-style.html`

**Interfaces:**
- Produces: color utilities `bg-page`, `bg-surface`, `border-line`, `border-line-strong`, `text-ink`, `text-bright`, `text-muted`, `text-accent`, `bg-accent`, `text-danger`.
- Produces: `Icon({ name, className }: { name: IconName; className?: string })` and the type `IconName`, exported from `@/components/ui`.
- Produces: `Button` with `variant?: "primary" | "outline"`. Other props stay as they are. `SectionHeader` keeps its props.
- Produces: the list `NOT_YET` in `design.test.mjs`. Later tasks remove their files from it.

- [ ] **Step 1: Write the failing test** in `src/lib/design.test.mjs`

```js
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
		["ink", "page"], ["ink", "surface"], ["bright", "page"],
		["muted", "page"], ["muted", "surface"],
		["accent", "page"], ["accent", "surface"],
		["page", "accent"], // button text on the accent color
		["danger", "surface"],
	];
	for (const [fg, bg] of pairs) {
		assert.ok(ratio(fg, bg) >= 4.5, `${fg} on ${bg} is ${ratio(fg, bg).toFixed(2)}`);
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

// Files that still have the old look. Each task removes its files.
// Task 8 deletes this list.
const NOT_YET = [
	"src/components/ui/Header.tsx",
	"src/components/ui/Footer.tsx",
	"src/components/sections/Hero.tsx",
	"src/components/sections/Solutions.tsx",
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
		assert.doesNotMatch(src, /\p{Extended_Pictographic}/u, `${f}: emoji`);
		if (f.endsWith(".css")) continue;
		assert.doesNotMatch(src, /\banimate-|\bopacity-0\b/, `${f}: entry animation`);
		assert.doesNotMatch(src, OLD_CLASS, `${f}: old color class`);
	}
});
```

- [ ] **Step 2: Run it to see it fail**

Run: `pnpm test`
Expected: FAIL. "token --color-ink is missing", no `:focus-visible`, and `Button.tsx: old color class`.

- [ ] **Step 3: Add the tokens and base styles to `src/app/globals.css`**

Add inside `@theme` (keep the old tokens for now, Task 8 deletes them):

```css
--color-page: #0b1220;
--color-surface: #111a2e;
--color-line: #1e293b;
--color-line-strong: #64748b; /* input borders, 3:1 on page and surface */
--color-ink: #e2e8f0;
--color-bright: #f8fafc;
--color-muted: #94a3b8;
--color-accent: #2dd4bf;
--color-danger: #fca5a5;
```

In `@layer base`:
- `body`: `bg-page text-ink font-body antialiased`, plus the faint 32px grid from the mockup (`rgba(148,163,184,.06)` lines).
- Border default color: `var(--color-line)`.
- `h1`–`h6`: `font-heading font-bold tracking-tight text-bright`.
- `::selection`: accent background at 25%, bright text.
- `:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }`
- `@media (prefers-reduced-motion: reduce)`: `scroll-behavior: auto` on `html`, and `transition: none !important; animation: none !important` on everything.

- [ ] **Step 4: Restyle `Button.tsx` and `SectionHeader.tsx`, create `Icon.tsx`**

- `Button`: mono font, `rounded-md`. `primary` = `bg-accent text-page`, lighter on hover. `outline` = `border border-line-strong text-ink`, accent border on hover. Remove the variants `secondary` and `ghost` and the `btn-glow` class. Remove the `focus:ring-*` classes (the global focus ring covers it).
- `SectionHeader`: eyebrow is a mono accent line that starts with `// `. Title `text-bright`. Description `text-muted`. Left-aligned unless `centered` is passed. The default for `centered` becomes `false`.
- `Icon.tsx`: one `paths: Record<IconName, ReactNode>` map and one `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">` wrapper. Move the 9 icon paths from `Solutions.tsx` and the 3 from `portfolio/page.tsx` as they are. Add these names, drawn from simple shapes: `plug`, `chip`, `building`, `pipeline`, `gauge`, `check`, `external`, `mail`, `arrow-right`. Export `Icon` and `IconName` from `src/components/ui/index.ts`.
- `layout.tsx`: `theme-color` becomes `#0b1220`.

- [ ] **Step 5: Run the tests and the build**

Run: `pnpm test && pnpm lint && pnpm build`
Expected: all tests pass (22 contact tests plus 4 design tests). Lint shows only the two old warnings or fewer. Build passes. If a caller still passes `variant="secondary"` or `"ghost"`, the build fails: change that caller to `primary` or `outline`.

- [ ] **Step 6: Commit**

```bash
git add src docs/superpowers/mockups docs/superpowers/plans/2026-11-22-phase-2-dark-lab.md
git commit -m "feat: add Dark lab tokens, base styles, icons, and design test"
```

---

### Task 2: Page titles, share data, and structured data in one place

**Files:**
- Create: `src/data/seo.test.mjs`
- Modify: `src/data/seo.ts`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/portfolio/page.tsx` (metadata only), `src/app/privacy/page.tsx` (metadata only)

**Interfaces:**
- Produces, from `src/data/seo.ts`:
  - `shareImage` (unchanged)
  - `type PageKey = "home" | "portfolio" | "research" | "privacy"`
  - `pages: Record<PageKey, { path: string; title: string; description: string }>`
  - `fullTitle(key: PageKey): string` — the home title as it is, every other title plus `" | yDataLabs"`
  - `pageMetadata(key: PageKey): Metadata` — sets `title: { absolute }`, `description`, `alternates.canonical`, `openGraph` (`type: "website"`, `siteName: "yDataLabs"`, `locale: "en_US"`, `url`, `title`, `description`, `images`), and `twitter` (`card: "summary_large_image"`, `title`, `description`, `images`)
  - `organizationSchema`, `personSchema` (moved from `layout.tsx`)

- [ ] **Step 1: Write the failing test** in `src/data/seo.test.mjs`

```js
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { pages, fullTitle, pageMetadata, organizationSchema, personSchema } from "./seo.ts";

const keys = Object.keys(pages);

test("there are four pages", () => {
	assert.deepEqual(keys.sort(), ["home", "portfolio", "privacy", "research"]);
});

test("every page has its own canonical address and full share data", () => {
	for (const key of keys) {
		const m = pageMetadata(key);
		const { path, description } = pages[key];
		assert.equal(m.alternates.canonical, path);
		assert.equal(m.openGraph.url, path);
		assert.equal(m.openGraph.type, "website");
		assert.equal(m.openGraph.siteName, "yDataLabs");
		assert.equal(m.openGraph.title, fullTitle(key));
		assert.equal(m.twitter.title, fullTitle(key));
		assert.equal(m.twitter.card, "summary_large_image");
		assert.equal(m.description, description);
		assert.equal(m.openGraph.images.length, 1);
		assert.equal(m.twitter.images.length, 1);
	}
});

test("titles and descriptions are unique and fit in search results", () => {
	const titles = keys.map(fullTitle);
	const descriptions = keys.map((k) => pages[k].description);
	assert.equal(new Set(titles).size, keys.length);
	assert.equal(new Set(descriptions).size, keys.length);
	for (const t of titles) assert.ok(t.length <= 60, `title too long: ${t}`);
	for (const d of descriptions) assert.ok(d.length >= 70 && d.length <= 160, `description length ${d.length}: ${d}`);
});

test("home names private AI and all three strengths", () => {
	const d = pages.home.description;
	assert.match(d, /LLM/);
	assert.match(d, /own servers|on-premises/i);
	for (const s of [/AI engineering/i, /platform engineering/i, /data science/i]) assert.match(d, s);
});

test("portfolio and research keep the healthcare terms", () => {
	assert.match(pages.portfolio.description, /healthcare/i);
	assert.match(pages.research.description, /healthcare|medical|clinical/i);
});

test("structured data names all three strengths and points to a real logo", () => {
	const text = JSON.stringify(organizationSchema);
	for (const s of [/AI engineering/i, /platform engineering/i, /data science/i]) assert.match(text, s);
	assert.ok(existsSync("public" + new URL(organizationSchema.logo).pathname), "logo file is missing");
	assert.match(personSchema.description, /20\+ years/);
});
```

- [ ] **Step 2: Run it to see it fail**

Run: `pnpm test`
Expected: FAIL. `pages` is not exported from `seo.ts`.

- [ ] **Step 3: Write `src/data/seo.ts`**

- `pages.home`: path `/`, title "yDataLabs: LLMs and AI that run where your data lives" (or shorter, to fit 60 characters). The description names LLMs, "your own servers", and the three strengths, and ends with "proven in healthcare".
- `pages.portfolio`: path `/portfolio`, title about healthcare AI projects. Keep the terms healthcare AI, medical NLP, clinical MLOps.
- `pages.research`: path `/research`, title "Research", description about papers and talks in healthcare AI.
- `pages.privacy`: path `/privacy`, title "Privacy", a description of at least 70 characters.
- Move `organizationSchema` and `personSchema` here from `layout.tsx`. Update the descriptions and `knowsAbout`: add LLM integration, local LLMs, on-premises AI, AI engineering, platform engineering, data science. Keep the healthcare terms. Keep 20+ years in software and 10+ years in AI. `logo` must be a file that exists in `public/`.

- [ ] **Step 4: Use it in the layout and the pages**

- `layout.tsx`: import the two schemas. Default title and description come from `pages.home`. Keep `metadataBase`, the title template, `authors`, `robots`, and `twitter.creator`. Add the private AI terms to `keywords` and keep the healthcare ones. **No canonical in the root layout.**
- `page.tsx`: `export const metadata = pageMetadata("home")`.
- `portfolio/page.tsx`: `export const metadata = pageMetadata("portfolio")`.
- `privacy/page.tsx`: `export const metadata = pageMetadata("privacy")`.

- [ ] **Step 5: Run the tests and the build, then check the tags**

Run: `pnpm test && pnpm build`
Expected: all pass.

Run: `grep -o '<link rel="canonical"[^>]*>\|<meta property="og:url"[^>]*>' .next/server/app/portfolio.html .next/server/app/privacy.html .next/server/app/index.html`
Expected: each page shows its own address in both tags.

- [ ] **Step 6: Commit**

```bash
git add src && git commit -m "feat: one helper for page titles, share data, and structured data"
```

---

### Task 3: Research page

**Files:**
- Create: `src/data/research.ts`, `src/data/research.test.mjs`, `src/app/research/page.tsx`
- Modify: `src/app/sitemap.ts`, `CLAUDE.md` (project tree)

**Interfaces:**
- Consumes: `pageMetadata("research")`, `Icon`, `Header`, `Footer`, `SectionHeader`, `founderInfo` from `@/data/portfolio`.
- Produces, from `src/data/research.ts`:
  - `interface Publication { title: string; venue: string; year: number; url: string }`
  - `interface Talk { title: string; event: string; year: number; url?: string }`
  - `scholarUrl: string`, `publications: Publication[]`, `talks: Talk[]`

- [ ] **Step 1: Write the failing test** in `src/data/research.test.mjs`

```js
import test from "node:test";
import assert from "node:assert/strict";
import { publications, talks, scholarUrl } from "./research.ts";

const thisYear = new Date().getFullYear();

test("10 to 15 publications, each complete, newest first", () => {
	assert.ok(publications.length >= 10 && publications.length <= 15, `${publications.length} publications`);
	for (const p of publications) {
		assert.ok(p.title.trim() && p.venue.trim(), `incomplete: ${p.title}`);
		assert.ok(p.year >= 2010 && p.year <= thisYear, `year: ${p.title}`);
		assert.match(p.url, /^https:\/\//, `link: ${p.title}`);
	}
	assert.equal(new Set(publications.map((p) => p.title)).size, publications.length);
	const years = publications.map((p) => p.year);
	assert.deepEqual(years, [...years].sort((a, b) => b - a));
});

test("talks are complete", () => {
	for (const t of talks) {
		assert.ok(t.title.trim() && t.event.trim(), `incomplete: ${t.title}`);
		assert.ok(t.year >= 2010 && t.year <= thisYear);
		if (t.url) assert.match(t.url, /^https:\/\//);
	}
});

test("the Google Scholar link is set", () => {
	assert.match(scholarUrl, /^https:\/\/scholar\.google\./);
});
```

- [ ] **Step 2: Run it to see it fail**

Run: `pnpm test`
Expected: FAIL. `research.ts` does not exist.

- [ ] **Step 3: Collect the list and write `src/data/research.ts`**

- Sources, in this order: the Google Scholar profile linked in `src/data/portfolio.ts`, Semantic Scholar, DBLP, the ACL Anthology, arXiv.
- Pick 10 to 15 papers: most cited first, then recent ones. Sort newest first in the file.
- **Every entry must come from a source page that was opened. Nothing from memory.** The `url` is the paper's own page (publisher, ACL Anthology, or arXiv).
- Talks: add only talks that have a public page or a recording that was opened. If fewer than three are found, set `talks = []`. The page then hides the talks block. Record this as a ruling and tell the owner.
- `scholarUrl`: the profile address from `portfolio.ts`, on `scholar.google.com`.

- [ ] **Step 4: Check every link**

Run: `node -e 'import("./src/data/research.ts").then(async (m) => { for (const x of [...m.publications, ...m.talks]) if (x.url) { const r = await fetch(x.url, { redirect: "follow", headers: { "user-agent": "Mozilla/5.0" } }).catch(() => ({ status: "ERR" })); console.log(r.status, x.url); } })'`
Expected: every line starts with `200`. Open any other link in the browser by hand. Fix or drop an entry whose link is dead.

- [ ] **Step 5: Build `src/app/research/page.tsx`**

- `export const metadata = pageMetadata("research")`.
- One `h1`. A short intro about the founder's research (two or three sentences, from `founderInfo.bio`).
- "Selected publications": a list. Each row shows the year, the title as a link (new tab), and the venue.
- "Selected talks": the same shape. Rendered only when `talks.length > 0`.
- A link "Full list on Google Scholar".
- A closing line with a "Book a call" button to `/#contact`.
- Use only the new tokens. The file is new, so the design test covers it from the start.
- Add `/research` to `src/app/sitemap.ts`. Add the page and the data file to the tree in `CLAUDE.md`.

- [ ] **Step 6: Run the tests and the build, then look at the page**

Run: `pnpm test && pnpm lint && pnpm build`
Expected: all pass. The build output lists `○ /research`.

Browser (`pnpm dev`, `http://localhost:3000/research`), at 1280px and at 375px:
Expected: the list is readable, long titles wrap, and `document.documentElement.scrollWidth <= window.innerWidth` is `true`.

- [ ] **Step 7: Commit**

```bash
git add src CLAUDE.md && git commit -m "feat: add Research page with publications and talks"
```

---

### Task 4: Header, footer, 404 page, site icon

**Files:**
- Create: `src/app/not-found.tsx`
- Modify: `src/components/ui/Header.tsx`, `src/components/ui/Footer.tsx`, `src/data/navigation.ts`, `src/data/seo.ts` (`sameAs` links), `public/favicon.svg`, `src/lib/design.test.mjs` (remove `Header.tsx` and `Footer.tsx` from `NOT_YET`)

**Interfaces:**
- Produces, from `src/data/navigation.ts`:
  - `mainNavigation: NavItem[]` = Solutions (`/#solutions`), Work (`/portfolio`), Research (`/research`). Contact is the button, not a list item.
  - `footerNavigation: { site: NavItem[]; products: NavItem[] }`. `site` = Solutions, Work, Research, Contact, Privacy.
  - `socialLinks: NavItem[]`

- [ ] **Step 1: Make the test fail**

Remove `"src/components/ui/Header.tsx"` and `"src/components/ui/Footer.tsx"` from `NOT_YET`.
Run: `pnpm test`
Expected: FAIL with `src/components/ui/Header.tsx: entry animation` or `old color class`.

- [ ] **Step 2: Restyle `Header.tsx`**

- Fixed bar, `bg-page` at 90% with blur, a bottom `border-line`. No change of look on scroll: delete the scroll listener.
- Logo on the left. Look at `public/logo.svg` on the dark bar (Review Focus 5). If it is hard to read, use the text mark from the mockup: `y<span class="text-accent">Data</span>Labs` in mono.
- Menu in mono, lowercase, `text-muted`, `text-bright` on hover.
- The "Contact" button: `Button variant="outline"` to `/#contact`, accent border as in the mockup.
- Phone menu: keep the open state. Render the panel only when it is open (no `opacity-0`). Add `aria-controls`. The panel is `bg-surface border-line`.

- [ ] **Step 3: Restyle `Footer.tsx` and check the social links**

- `bg-page`, top `border-line`. Three columns: the brand line and email, "Site" links, "Products" links. Then the bottom bar with the year and the social icons from `socialLinks`.
- The brand line names private AI and the three strengths. No "Leading provider".
- Social links: open each address. The GitHub organisation of this repo is `ydata-labs`. Use the address that belongs to yDataLabs. Remove a link that does not exist. Use the same addresses in `sameAs` in `src/data/seo.ts`. **The owner confirms these at review** (spec section 13, item 5). Record what was changed as a ruling.
- Write the copyright sign as `&copy;`, not as the character.

- [ ] **Step 4: Add `src/app/not-found.tsx` and the new site icon**

- `not-found.tsx`: `Header`, one `h1` "Page not found", one line of text, a `Button` to `/`, `Footer`. `export const metadata = { title: "Page not found" }`.
- `public/favicon.svg`: the letters "yD" as in `scripts/apple-icon.html` (y in `#f8fafc`, D in `#2dd4bf`, on `#0b1220`, rounded square). The old file shows an "N" in an oval. This is our call. Tell the owner at review.

- [ ] **Step 5: Run the tests and the build, then look**

Run: `pnpm test && pnpm lint && pnpm build`
Expected: all pass.

Browser, at 1280px and 375px, on `/research` and on `/does-not-exist`:
- The logo is readable. The menu shows Solutions, Work, Research, and the Contact button.
- At 375px the menu button opens and closes the panel, and a link closes it.
- Press Tab: every menu link and the button show the accent ring.
- `/does-not-exist` shows the 404 page with header and footer.

- [ ] **Step 6: Commit**

```bash
git add src public && git commit -m "feat: Dark lab header, footer, 404 page, and site icon"
```

---

### Task 5: Home page, part 1: hero, three paths, solutions, advice

**Files:**
- Create: `src/data/solutions.test.mjs`, `src/components/sections/Paths.tsx`, `src/components/sections/Advice.tsx`
- Modify: `src/data/solutions.ts`, `src/components/sections/Hero.tsx`, `src/components/sections/Solutions.tsx`, `src/components/sections/index.ts`, `src/app/page.tsx`, `src/lib/design.test.mjs` (remove `Hero.tsx` and `Solutions.tsx` from `NOT_YET`)

**Interfaces:**
- Produces, from `src/data/solutions.ts`:
  - `type GroupId = "ai-engineering" | "platform-engineering" | "data-science"`
  - `interface Solution { id: string; title: string; description: string; icon: IconName }` (`import type { IconName }`)
  - `interface SolutionGroup { id: GroupId; title: string; summary: string; items: Solution[] }`
  - `solutionGroups: SolutionGroup[]`
  - `advice: { title: string; intro: string; items: { title: string; description: string }[] }`
  - `proof: { value: string; label: string }[]` (replaces `coreFeatures`)
- Produces: sections `Paths` and `Advice`. Section ids `solutions` and `advice`.

- [ ] **Step 1: Write the failing test** in `src/data/solutions.test.mjs`

```js
import test from "node:test";
import assert from "node:assert/strict";
import { solutionGroups, advice, proof } from "./solutions.ts";

test("three groups, in this order", () => {
	assert.deepEqual(solutionGroups.map((g) => g.id), ["ai-engineering", "platform-engineering", "data-science"]);
});

test("the groups have similar weight", () => {
	const sizes = solutionGroups.map((g) => g.items.length);
	assert.ok(Math.min(...sizes) >= 3 && Math.max(...sizes) <= 5, `sizes ${sizes}`);
	assert.ok(Math.max(...sizes) - Math.min(...sizes) <= 1, `sizes ${sizes}`);
});

test("the private AI items exist", () => {
	const ids = solutionGroups.flatMap((g) => g.items.map((i) => i.id));
	assert.equal(new Set(ids).size, ids.length);
	for (const id of ["llm-integration", "local-llms", "on-premises-ai", "data-pipelines"]) assert.ok(ids.includes(id), id);
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
```

- [ ] **Step 2: Run it to see it fail**

Run: `pnpm test`
Expected: FAIL. `solutionGroups` is not exported. Also remove `Hero.tsx` and `Solutions.tsx` from `NOT_YET` now, so the design test fails for them too.

- [ ] **Step 3: Rewrite `src/data/solutions.ts`**

Four items per group. Each description is one or two plain sentences that say what we do. Healthcare may appear inside a description as an example, not in a title.

| Group | id | Title | Source |
|---|---|---|---|
| AI engineering | `llm-applications` | LLM applications | reworded from `generative-ai` |
| | `llm-integration` | LLM integration | new |
| | `agentic-workflows` | Agents and workflow automation | reworded |
| | `language-vision` | Language and vision models | merges `nlp-clinical` and `medical-vision` |
| Platform engineering | `local-llms` | Local LLMs | new |
| | `on-premises-ai` | On-premises and air-gapped AI | new. Includes secure and compliant deployment |
| | `mlops-platform` | MLOps and AI platforms | reworded |
| | `data-pipelines` | Data pipelines | new |
| Data science | `predictive-modeling` | Predictive modeling | reworded from `clinical-data-science` |
| | `decision-support` | Multi-criteria decision support | reworded |
| | `simulation` | Multi-agent simulation | reworded |
| | `model-evaluation` | Model evaluation | new. Grounded in the "LLM-as-a-Judge" case study |

- `advice`: title "Get advice". Items from text that exists today: AI strategy and roadmap, feasibility studies, workshops and training, mentorship and coaching. (The old `ai-strategy` item, and `services[0]` and `services[3]` in `portfolio.ts`.)
- `proof`: `100+` "projects", `50+` "clients".
- Delete `capabilities` and `coreFeatures`.

- [ ] **Step 4: Rewrite `Hero.tsx`**

Copy that is fixed:
- Tag: `// private AI · proven in healthcare`
- `h1`: "LLMs and AI that run where your data lives." One or two words may take the accent color.
- Text under it: "We advise your team, and we build the system. AI engineering, platform engineering, and data science from a research-led team."
- Buttons: "Book a call" (primary, `/#contact`) and "See our work" (outline, `/portfolio`).
- Proof line: the `proof` numbers and "partners: John Snow Labs, Gesund.ai".
- Panel on the right, as in the mockup: bar text "clinical note → structured data", a small label "runs on your own servers", the invented note with marked words, and the output lines `age`, `condition`, `drug`, `dose`, `follow_up`. Static markup. Give the panel `role="img"` and an `aria-label` that says what it shows.
- The panel shows on phones too, below the text. No decorative circles, no wave, no floating shapes.

- [ ] **Step 5: Write `Paths.tsx`, `Solutions.tsx`, `Advice.tsx`**

- `Paths`: three cards. "Get advice" → `/#advice`. "Get it built" → `/#solutions`. "Read the research" → `/research`. One sentence each. The whole card is a link.
- `Solutions` (`id="solutions"`): one block per group with the group title, its `summary`, and its four items (icon, title, description). On desktop the three groups sit side by side or as three equal rows. The builder picks the one that reads better. All three get the same size.
- `Advice` (`id="advice"`): the intro, the items, and a "Book a call" button to `/#contact`.
- `page.tsx` order for now: `Hero`, `Paths`, `Solutions`, `Advice`, then the old `Products`, `About`, `PortfolioSummary`, `Partners`, `Contact`.

- [ ] **Step 6: Run the tests and the build, then look**

Run: `pnpm test && pnpm lint && pnpm build`
Expected: all pass.

Browser at 1280px and 375px, on `/`:
- The first screen shows the headline, "proven in healthcare", both buttons, and the panel.
- The three groups look equally important.
- At 375px, `document.documentElement.scrollWidth <= window.innerWidth` is `true`.
- The three path cards go to the right places.

- [ ] **Step 7: Commit**

```bash
git add src && git commit -m "feat: new hero, three paths, grouped solutions, and advice section"
```

---

### Task 6: Home page, part 2: healthcare, products, founder, contact, images

**Files:**
- Create: `src/components/sections/Healthcare.tsx`, `src/components/sections/Founder.tsx`, `public/images/founder.webp`, `public/images/products/modelpark.webp`, `public/images/products/minamed.webp`
- Modify: `src/components/sections/Products.tsx`, `src/components/sections/Contact.tsx`, `src/components/sections/index.ts`, `src/app/page.tsx`, `src/data/products.ts`, `src/data/portfolio.ts` (`partners`, `founderInfo`), `next.config.ts`, `src/lib/design.test.mjs`
- Delete: `src/components/sections/About.tsx`, `PortfolioSummary.tsx`, `Partners.tsx`, and every file in `public/images/` that no page uses

**Interfaces:**
- Consumes: `featuredProjects`, `partners`, `founderInfo` from `@/data/portfolio`. `products` from `@/data/products`.
- Produces: `Product.image: { src: string; width: number; height: number }`. The field `gradient` is removed.
- Produces: `partners[n].logo: { src: string; width: number; height: number }` (one logo per partner, the one that reads on dark). `founderInfo.photo` with the same shape.
- Produces: section ids `healthcare`, `products`, `about`, `contact`.

- [ ] **Step 1: Write the failing tests** (add to `src/lib/design.test.mjs`)

```js
import { existsSync } from "node:fs";

const allSrc = readdirSync("src", { recursive: true })
	.map((f) => `src/${f}`)
	.filter((f) => /\.tsx?$/.test(f));

test("every image path in src exists", () => {
	for (const f of allSrc) {
		for (const [, path] of readFileSync(f, "utf8").matchAll(/["'`](\/images\/[^"'`]+)["'`]/g)) {
			assert.ok(existsSync(`public${path}`), `${f}: ${path} is missing`);
		}
	}
});

test("old anchor links still land on a section", () => {
	const sections = allSrc
		.filter((f) => f.startsWith("src/components/sections/"))
		.map((f) => readFileSync(f, "utf8"))
		.join("\n");
	for (const id of ["solutions", "advice", "healthcare", "products", "about", "contact"]) {
		assert.match(sections, new RegExp(`id="${id}"`), `no section with id ${id}`);
	}
});
```

Also remove from `NOT_YET`: `About.tsx`, `Products.tsx`, `PortfolioSummary.tsx`, `Partners.tsx`, `Contact.tsx`, `src/data/products.ts`.

- [ ] **Step 2: Run it to see it fail**

Run: `pnpm test`
Expected: FAIL. `no section with id healthcare`, and old color classes in `Products.tsx` and `Contact.tsx`.

- [ ] **Step 3: Prepare the images**

```bash
cwebp -q 82 -resize 480 0 public/images/about/veysel-kocaman.png -o public/images/founder.webp
cwebp -q 80 -resize 1200 0 public/images/products/modelpark.png -o public/images/products/modelpark.webp
cwebp -q 80 -resize 1200 0 public/images/products/minamed.png -o public/images/products/minamed.webp
```

- Read the real width and height of each new file (`sips -g pixelWidth -g pixelHeight <file>`) and put them in the data.
- In `next.config.ts` add `images: { unoptimized: true }`. Use `next/image` for every picture. It adds lazy loading and reserves the space.
- Partner logos: look at each `-dark` and `-light` file on `bg-surface`. Keep the one that reads well (Review Focus 5). Delete the other.
- Delete what no page uses: `public/images/about/` (all files), the two product PNG files, and unused files in `public/images/logo/`. Keep the logo file that `organizationSchema.logo` points to.

- [ ] **Step 4: Write `Healthcare.tsx` and `Founder.tsx`, restyle `Products.tsx` and `Contact.tsx`**

- `Healthcare` (`id="healthcare"`): title "Proven in healthcare". Two or three sentences on why healthcare is the hardest test for private AI: patient data, strict rules, systems with no internet access. Use only facts that are in `portfolio.ts`. Then the four `featuredProjects` as cards (duration, title, customer, impact). A link "See all work" to `/portfolio`. Then the partners with their logos, each a link to the partner's site.
- `Products` (`id="products"`): a short line that these are products yDataLabs built and runs. Two cards: screenshot, name, tagline, description, four features with a check icon, and a link to the product site. No emoji, no gradient tile. Rewrite taglines that use banned words.
- `Founder` (`id="about"`): photo, name, role, the first bio paragraph, three achievement chips, and a button "Read the research" to `/research`. Short.
- `Contact` (`id="contact"`): change classes only. Inputs: `bg-page`, `border-line-strong`, `text-ink`, labels `text-muted`. The error message uses `text-danger`. Remove `opacity-0` from the hidden spam field (it is already off-screen). **Do not change the form logic.**
- `page.tsx` final order: `Hero`, `Paths`, `Solutions`, `Advice`, `Healthcare`, `Products`, `Founder`, `Contact`.
- Delete `About.tsx`, `PortfolioSummary.tsx`, `Partners.tsx` and their exports.

- [ ] **Step 5: Run the tests and the build, then look**

Run: `pnpm test && pnpm lint && pnpm build`
Expected: all pass.

Browser at 1280px and 375px, on `/`:
- Every image shows and is readable on the dark page.
- `/#about`, `/#products`, `/#solutions`, `/#contact` each scroll to a section.
- Send the form with no email key set (`.dev.vars` absent): the error with the email address shows. It never says "sent".
- A wrong email shows the validation message.
- At 375px, `document.documentElement.scrollWidth <= window.innerWidth` is `true`.

- [ ] **Step 6: Commit**

```bash
git add -A src public next.config.ts && git commit -m "feat: healthcare, products, founder, and contact sections in the new look"
```

---

### Task 7: Portfolio page and privacy page

**Files:**
- Modify: `src/app/portfolio/page.tsx`, `src/app/privacy/page.tsx`, `src/data/portfolio.ts`, `src/lib/design.test.mjs` (remove both pages from `NOT_YET`)

**Interfaces:**
- Consumes: `solutionGroups`, `advice` from `@/data/solutions`. `Icon`. `founderInfo.photo`.
- Produces: `services` is removed from `src/data/portfolio.ts`. `activities[n].icon` is typed as `IconName`.

- [ ] **Step 1: Make the test fail**

Remove `"src/app/portfolio/page.tsx"` and `"src/app/privacy/page.tsx"` from `NOT_YET`.
Run: `pnpm test`
Expected: FAIL with `src/app/portfolio/page.tsx: entry animation`.

- [ ] **Step 2: Restyle `portfolio/page.tsx`**

Same sections, same order, same address. New look only, with these changes:
- Hero: plain dark, one `h1`, tag line `// healthcare AI work`. No gradient, no circles. Headline and text keep the healthcare terms.
- Founder block: add the photo. Add a link to `/research`.
- Services block: show the three `solutionGroups` (group title and the four item titles) and one card for `advice`. Delete `services` from `portfolio.ts`.
- Projects table: `bg-surface`, `border-line`, header row in mono. It scrolls sideways inside its own box on phones. The page itself does not.
- Activities: icons through `Icon`. The publications card links to `/research`.
- Closing block: `bg-surface` with an accent border, not a teal gradient.

- [ ] **Step 3: Restyle `privacy/page.tsx`**

Classes only. The text does not change, so the "Last updated" date stays.

- [ ] **Step 4: Run the tests and the build, then look**

Run: `pnpm test && pnpm lint && pnpm build`
Expected: all pass.

Browser at 1280px and 375px, on `/portfolio` and `/privacy`:
- All sections are readable. The table scrolls inside its box.
- At 375px, `document.documentElement.scrollWidth <= window.innerWidth` is `true` on both pages.

- [ ] **Step 5: Commit**

```bash
git add src && git commit -m "feat: portfolio and privacy pages in the new look"
```

---

### Task 8: Clean up, full check, go-live

**Files:**
- Modify: `src/app/globals.css`, `src/lib/design.test.mjs`, `CLAUDE.md`, `ARCHITECTURE.md`, `README.md` (if it describes the look)

- [ ] **Step 1: Close the list**

In `design.test.mjs`, delete `NOT_YET` and the filter that uses it.
Run: `pnpm test`
Expected: PASS. If a file fails, restyle it now.

- [ ] **Step 2: Delete the old look from `globals.css`**

Delete: the old color tokens (`navy`, `teal`, `slate-*`, `white`, `black`, `amber`, `emerald`, `rose`, `primary`, `secondary`, `background`, `foreground`, and the old `muted` and `border` aliases), all `--animate-*` tokens and `@keyframes`, the `.delay-*` classes, `.animate-on-scroll`, `.text-gradient`, `.bg-gradient-mesh`, `.bg-grid-pattern`, `.bg-dot-pattern`, `.btn-glow`, `.link-underline`, `.card-hover`, `--shadow-glow`, and the scrollbar block if nothing uses it.

Run: `grep -nE "navy|teal|keyframes|--animate|animate-on-scroll" src/app/globals.css`
Expected: no output.

- [ ] **Step 3: Check the rules by hand**

Run: `grep -c "<h1" src/app/portfolio/page.tsx src/app/privacy/page.tsx src/app/research/page.tsx src/app/not-found.tsx src/components/sections/*.tsx`
Expected: `1` for each page file and for `Hero.tsx`, `0` for every other section.

Run: `pnpm test && pnpm lint && pnpm build`
Expected: all pass. The build lists `/`, `/portfolio`, `/privacy`, `/research` as static.

- [ ] **Step 4: Browser check of every page**

Pages: `/`, `/portfolio`, `/research`, `/privacy`, `/does-not-exist`. Widths: 1280px and 375px.
- No sideways scroll (`scrollWidth <= innerWidth`).
- No console errors.
- Tab through the home page: every link, button, and form field shows the accent ring.
- Turn on "reduced motion" in the browser: hover effects change at once, and anchor links jump without smooth scroll.
- Turn JavaScript off and reload `/`: all text and images are visible.

- [ ] **Step 5: Check the Cloudflare build**

Run: `pnpm exec opennextjs-cloudflare build && pnpm exec opennextjs-cloudflare preview --port 8788` (stop the dev server first)
Expected: `/`, `/portfolio`, `/research`, `/privacy` answer 200. `/sitemap.xml` lists four addresses. `/images/founder.webp` answers 200. A wrong email posted to `/api/contact` answers 400.

- [ ] **Step 6: Update the docs and commit**

- `CLAUDE.md`: the Design System part (tokens, no entry animations, focus ring), the project tree, "Adding a new page: use `pageMetadata`", images are WebP with `next/image` unoptimized.
- `ARCHITECTURE.md`: replace the old tokens and the animation notes.

```bash
git add -A && git commit -m "chore: remove the old look and update docs"
```

- [ ] **Step 7: Owner review**

Start `pnpm dev` and ask the owner to look at all four pages. Ask the owner to check:
1. The new solution text (spec section 13, item 6).
2. The research list (item 3).
3. The social links (item 5).
4. The new site icon.

Apply the changes the owner asks for. Commit them.

- [ ] **Step 8: Go live. Only after the owner says yes in chat.**

```bash
git checkout main && git merge --ff-only phase-2-dark-lab && git push origin main
```

- [ ] **Step 9: Check the live site**

Wait until `https://ydatalabs.nl/research` answers 200. Then check: all four pages answer 200, the sitemap lists four addresses, each page has its own canonical address and share image, and a wrong email posted to `/api/contact` answers 400.
