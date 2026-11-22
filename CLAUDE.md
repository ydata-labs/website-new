# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the yDataLabs website. yDataLabs builds LLM and AI systems that run where the customer's data lives ("private AI, proven in healthcare"). The site shows three strengths with equal weight: AI engineering, platform engineering, and data science. It has a home page, a portfolio page, a research page, a blog, and a privacy page. ModelPark and MinaMed are the company's own products.

## Technology Stack

- **Framework**: Next.js 15.5.6 with App Router
- **React**: 19.1.0
- **TypeScript**: Strict mode with proper typing
- **Styling**: Tailwind CSS 4 with custom theme configuration
- **Deployment**: Cloudflare Workers via OpenNext
- **Package Manager**: pnpm
- **Blog**: Markdown files, turned into HTML at build time with `marked`, `highlight.js`, and `katex` (all three are build-time only)

## Build & Development Commands

```bash
# Install dependencies
pnpm install

# Start development server at http://localhost:3000
# (first builds the blog posts, drafts included, and watches them)
pnpm dev

# Build for production (first builds the blog posts, without drafts)
pnpm build

# Run production build locally
pnpm start

# Lint code
pnpm lint

# Run tests (Node built-in test runner, no extra dependency)
pnpm test

# Preview on Cloudflare (local)
pnpm preview

# Deploy to Cloudflare
pnpm deploy
```

## Project Structure

```
content/blog/               # Blog posts. One Markdown file per post
scripts/build-posts.mjs     # Turns the posts into src/data/posts.generated.json
src/
├── app/
│   ├── layout.tsx          # Root layout: fonts, default metadata, JSON-LD
│   ├── page.tsx            # Home page
│   ├── globals.css         # Tailwind theme: the "Dark lab" tokens
│   ├── sitemap.ts          # Sitemap, built from `pages` in src/data/seo.ts
│   ├── robots.ts           # robots.txt
│   ├── not-found.tsx       # 404 page
│   ├── apple-icon.png      # Phone home-screen icon (source: scripts/apple-icon.html)
│   ├── portfolio/page.tsx  # Portfolio page ("Work" in the menu)
│   ├── research/page.tsx   # Research page: papers and talks
│   ├── blog/page.tsx       # Blog list. PostList.tsx holds the two filters
│   ├── blog/[slug]/page.tsx  # One post
│   ├── blog/rss.xml/route.ts # The feed
│   ├── privacy/page.tsx    # Privacy page (linked from the contact form and footer)
│   └── api/contact/route.ts  # Contact form API (sends through Resend)
├── components/
│   ├── sections/           # Home page sections, in page order:
│   │                       # Hero, Paths, Solutions, Advice, Healthcare,
│   │                       # Products, Founder, LatestPosts, Contact
│   └── ui/                 # Header (server) + HeaderNav (client), Footer,
│                           # Button, SectionHeader, Icon, PostCard
├── data/                   # Static data files (no value imports: tests run them)
│   ├── navigation.ts       # Menu and footer links (functions of "has posts"), social links
│   ├── products.ts
│   ├── solutions.ts        # Three solution groups, advice, proof numbers
│   ├── portfolio.ts        # Projects, case studies, founder, partners
│   ├── research.ts         # Publications and talks
│   ├── seo.ts              # Page titles, share data, structured data, sitemap, feed
│   ├── blog.ts             # Blog types, labels, date format (no imports)
│   ├── posts.ts            # The posts as data. Server components only
│   ├── posts.generated.json  # Written by the build script. Not in git
│   └── *.test.mjs          # Tests for the data files
└── lib/
    ├── cn.ts               # Tailwind merge utility
    ├── contact.ts          # Contact form logic (no imports, tested)
    ├── contact.test.mjs
    ├── blog.mjs            # Post logic: details block, checks, Markdown (tested)
    ├── blog.test.mjs       # Also checks every file in content/blog
    └── design.test.mjs     # Guards the rules of the look
```

## Design System: "Dark lab"

The site is dark only. There is no light theme.

### Typography
- **Headings, small labels, menu**: JetBrains Mono
- **Long text**: Libre Franklin
- Sizes: `text-display`, `text-h1` to `text-h4`, `text-body-lg`, `text-body-sm`. Each size token has its own `--line-height` token (Tailwind 4 syntax)

### Colors (tokens in `globals.css`)
| Class | Value | Use |
|---|---|---|
| `bg-page` | `#0b1220` | Page background |
| `bg-surface` | `#111a2e` | Cards and panels |
| `border-line` | `#1e293b` | Borders |
| `border-line-strong` | `#64748b` | Input borders |
| `text-ink` | `#e2e8f0` | Text |
| `text-bright` | `#f8fafc` | Headings |
| `text-muted` | `#94a3b8` | Secondary text |
| `text-accent` / `bg-accent` | `#2dd4bf` | The one accent color |
| `text-accent-bright` | `#5eead4` | Hover state of the accent, marked text |
| `text-danger` | `#fca5a5` | Error messages |

### Rules (checked by `src/lib/design.test.mjs`)
- No emoji. Use `<Icon name="..." />` from `src/components/ui/Icon.tsx`
- No entry animation: no `animate-` class, no `opacity-0` class. Content is visible at once
- Text meets WCAG AA contrast
- Do not add `outline-none` or `scroll-smooth`. One global `:focus-visible` ring covers every control, and smooth scrolling is set in the base layer so that "reduced motion" can turn it off
- Page container: `max-w-xl mx-auto px-4 md:px-8`. Text blocks: `max-w-prose`. Note that `max-w-sm/md/lg/xl/2xl` are overridden in the theme (40, 48, 64, 80, 90rem)
- Section anchors must keep working, because other sites link to them: `solutions`, `products`, `about`, `contact` (old), and `advice`, `healthcare` (new)

### Images
- Cloudflare Workers has no image optimizer. `next.config.ts` sets `images.unoptimized`
- Resize and convert by hand: `cwebp -q 80 -resize 1200 0 in.png -o out.webp`. Put the width and height in the data file
- Delete images that no page uses. A test fails when the code names an image that does not exist

### Copy
- Plain words. No "cutting-edge", "revolutionize", "seamless"
- Never claim a project or client that does not exist
- True numbers, confirmed by the owner: 20+ years in software, 10+ years in AI, 40+ papers, 100+ projects, 50+ clients. Not confirmed yet: 100+ talks

## Key Implementation Details

### SEO
- Every page exports `metadata = pageMetadata("<key>")` from `src/data/seo.ts`. It sets the title, description, canonical address, and share data. Do not build an `openGraph` block by hand: Next.js replaces the parent's block, and the page loses the share image
- Titles and descriptions live in `pages` in `src/data/seo.ts`. A test checks that they are unique and fit in search results
- Never set a canonical address in the root layout
- JSON-LD for Organization and Person lives in `src/data/seo.ts`
- The share image is `public/og-image.png` (source: `scripts/og-image.html`)
- The sitemap is built from `pages` in `src/data/seo.ts`. A page in that list is in the sitemap
- One `h1` per page
- The home page targets the private AI terms (LLM integration, local LLM, on-premises AI). The portfolio and research pages keep the healthcare terms

### Blog
- A post is one Markdown file in `content/blog/`. The file name is the address: `my-post.md` is `/blog/my-post`. `content/blog/writing-a-post.md` is a template (a draft) that shows every feature
- `scripts/build-posts.mjs` runs before `next dev` and `next build`. It checks every post with `src/lib/blog.mjs` and writes `src/data/posts.generated.json`. Pages import that JSON through `src/data/posts.ts`. So no page reads a file at run time, and the Markdown libraries never reach the Worker
- A bad post (missing detail, misspelled key, wrong date, a title over 48 or a description over 160 characters, a `# ` heading, a broken formula) stops `pnpm test` and `pnpm build` with a message that names the file
- Drafts (`draft: true`) show only under `pnpm dev`. `pnpm build` always writes the JSON again, without drafts
- Everything depends on the number of published posts. With zero posts: no "Blog" menu link, no "Latest posts" on the home page, `/blog` is `noindex` and not in the sitemap. The first published post turns all of it on, with no code change
- **A client component (`"use client"`) must never reach `@/data/posts`.** It holds the text of every post. Client components import single files (`@/components/ui/Button`), not the `@/components/ui` or `@/components/sections` index, because the index also exports the Header, which imports the posts. The `server-only` import in `posts.ts` fails the build on a leak, and a test in `design.test.mjs` fails `pnpm test`
- **Do not set `dynamicParams = false` on the post page.** It serves posts only from the Next.js page cache. This site has no page cache on Cloudflare (`open-next.config.ts`), so every post would be a 404 on the live site while `pnpm start` looks fine. The page calls `notFound()` instead. Check blog changes with `pnpm preview`
- Post text is styled by `.post-body` in `globals.css`. Wide blocks (code, tables, formulas) scroll inside their own box

### Contact Form
- The form posts to `/api/contact` (`src/app/api/contact/route.ts`, a thin wrapper)
- All logic is in `src/lib/contact.ts`: input checks, a honeypot field named `ref_code` (a meaningless name, so browser autofill never fills it), and one HTTP call to Resend
- `src/lib/contact.ts` has no imports on purpose, so `pnpm test` can run it with plain Node
- The form must never show "sent" when the email was not sent

### Static Pages
- Every page is built as a static page. There is no file system at run time on Cloudflare Workers. The Worker may still render a page again on a request, so a page must never read a file. Blog posts are bundled as data for this reason
- The only dynamic route is `POST /api/contact`
- `pnpm test` needs Node 22.18 or newer (Node runs the TypeScript file directly)

## Common Tasks

### Adding a New Section
1. Create component in `src/components/sections/`
2. Export from `src/components/sections/index.ts`
3. Add to page composition in `src/app/page.tsx`

### Adding a New Page
1. Add the page to `pages` in `src/data/seo.ts` (and to the `PageKey` type)
2. Create `src/app/<name>/page.tsx` with `export const metadata = pageMetadata("<name>")`
3. If needed, add it to `src/data/navigation.ts`. The sitemap picks the page up from `pages` by itself

### Writing a Blog Post
Read `docs/blog-writing-guide.md` first. It covers the reader, the search phrase, the title, the text, and a checklist before publishing.

1. Copy `content/blog/writing-a-post.md` to a new file. The file name becomes the address
2. Fill in the details block: `title`, `description`, `date`, `audience` (`leaders` or `research`), `topic` (`ai-engineering`, `platform-engineering`, or `data-science`), `author`. Optional: `draft`, `image`, `updated` (the day of the last change)
3. Images go in `public/images/blog/` as WebP
4. `pnpm dev` shows the post, also as a draft. `pnpm test` checks it
5. Set `draft: false` (or remove the line) and commit. The post is live with the next deploy
6. Never invent a post. Do not write about client work without the owner's yes

### Modifying Data
- Products: `src/data/products.ts`
- Solutions and advice: `src/data/solutions.ts`
- Portfolio projects, founder, partners: `src/data/portfolio.ts`
- Publications and talks: `src/data/research.ts` (add an entry only with a link you have opened)
- Navigation and social links: `src/data/navigation.ts`

### Styling
- Use Tailwind utility classes with the tokens above
- Use `cn()` utility from `src/lib/cn.ts` for conditional classes

### Checking a change
- `pnpm test`, `pnpm lint`, `pnpm build`
- Do not run `pnpm build` while `pnpm dev` runs. Both write to `.next`, and the dev server then serves stale CSS

## Deployment

**A push to `main` publishes the live site.** Cloudflare builds and deploys on every push.
Work on a branch. Never push or merge to `main` without the owner's yes.

`pnpm deploy` also deploys by hand. `pnpm preview` runs the Cloudflare build locally.

## Environment Variables

- `RESEND_API_KEY` (secret, required): set with `pnpm exec wrangler secret put RESEND_API_KEY`. For local use, copy `.dev.vars.example` to `.dev.vars`.
- `CONTACT_EMAIL` (optional): where form messages go. Default `info@ydatalabs.nl`.
- `CONTACT_FROM` (optional): the sender. Default `yDataLabs Website <website@ydatalabs.nl>`.

Email for `ydatalabs.nl` runs on Google Workspace, so Cloudflare Email Routing cannot be used.
