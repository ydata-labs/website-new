# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the yDataLabs website. yDataLabs builds LLM and AI systems that run where the customer's data lives ("private AI, proven in healthcare"). The site shows three strengths with equal weight: AI engineering, platform engineering, and data science. It has a home page, a portfolio page, a research page, and a privacy page. ModelPark and MinaMed are the company's own products.

## Technology Stack

- **Framework**: Next.js 15.5.6 with App Router
- **React**: 19.1.0
- **TypeScript**: Strict mode with proper typing
- **Styling**: Tailwind CSS 4 with custom theme configuration
- **Deployment**: Cloudflare Workers via OpenNext
- **Package Manager**: pnpm

## Build & Development Commands

```bash
# Install dependencies
pnpm install

# Start development server at http://localhost:3000
pnpm dev

# Build for production
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
src/
├── app/
│   ├── layout.tsx          # Root layout: fonts, default metadata, JSON-LD
│   ├── page.tsx            # Home page
│   ├── globals.css         # Tailwind theme: the "Dark lab" tokens
│   ├── sitemap.ts          # Sitemap (add every new page here)
│   ├── robots.ts           # robots.txt
│   ├── not-found.tsx       # 404 page
│   ├── apple-icon.png      # Phone home-screen icon (source: scripts/apple-icon.html)
│   ├── portfolio/page.tsx  # Portfolio page ("Work" in the menu)
│   ├── research/page.tsx   # Research page: papers and talks
│   ├── privacy/page.tsx    # Privacy page (linked from the contact form and footer)
│   └── api/contact/route.ts  # Contact form API (sends through Resend)
├── components/
│   ├── sections/           # Home page sections, in page order:
│   │                       # Hero, Paths, Solutions, Advice, Healthcare,
│   │                       # Products, Founder, Contact
│   └── ui/                 # Header, Footer, Button, SectionHeader, Icon
├── data/                   # Static data files (no value imports: tests run them)
│   ├── navigation.ts       # Menu, footer links, social links
│   ├── products.ts
│   ├── solutions.ts        # Three solution groups, advice, proof numbers
│   ├── portfolio.ts        # Projects, case studies, founder, partners
│   ├── research.ts         # Publications and talks
│   ├── seo.ts              # Page titles, share data, structured data
│   └── *.test.mjs          # Tests for the data files
└── lib/
    ├── cn.ts               # Tailwind merge utility
    ├── contact.ts          # Contact form logic (no imports, tested)
    ├── contact.test.mjs
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

### Rules (checked by `src/lib/design.test.mjs`)
- No emoji. Use `<Icon name="..." />` from `src/components/ui/Icon.tsx`
- No entry animation: no `animate-` class, no `opacity-0` class. Content is visible at once
- Text meets WCAG AA contrast
- Do not add `focus:outline-none`. One global `:focus-visible` ring covers every control
- Page container: `max-w-xl mx-auto px-4 md:px-8`. Text blocks: `max-w-prose`. Note that `max-w-sm/md/lg/xl/2xl` are overridden in the theme (40, 48, 64, 80, 90rem)
- Old anchors must keep working: `solutions`, `advice`, `healthcare`, `products`, `about`, `contact`

### Images
- Cloudflare Workers has no image optimizer. `next.config.ts` sets `images.unoptimized`
- Resize and convert by hand: `cwebp -q 80 -resize 1200 0 in.png -o out.webp`. Put the width and height in the data file
- Delete images that no page uses. A test fails when the code names an image that does not exist

### Copy
- Plain words. No "cutting-edge", "revolutionize", "seamless"
- Never claim a project or client that does not exist
- True numbers: 20+ years in software, 10+ years in AI, 40+ papers

## Key Implementation Details

### SEO
- Every page exports `metadata = pageMetadata("<key>")` from `src/data/seo.ts`. It sets the title, description, canonical address, and share data. Do not build an `openGraph` block by hand: Next.js replaces the parent's block, and the page loses the share image
- Titles and descriptions live in `pages` in `src/data/seo.ts`. A test checks that they are unique and fit in search results
- Never set a canonical address in the root layout
- JSON-LD for Organization and Person lives in `src/data/seo.ts`
- The share image is `public/og-image.png` (source: `scripts/og-image.html`)
- New pages must be added to `src/app/sitemap.ts`
- One `h1` per page
- The home page targets the private AI terms (LLM integration, local LLM, on-premises AI). The portfolio and research pages keep the healthcare terms

### Contact Form
- The form posts to `/api/contact` (`src/app/api/contact/route.ts`, a thin wrapper)
- All logic is in `src/lib/contact.ts`: input checks, a honeypot field named `ref_code` (a meaningless name, so browser autofill never fills it), and one HTTP call to Resend
- `src/lib/contact.ts` has no imports on purpose, so `pnpm test` can run it with plain Node
- The form must never show "sent" when the email was not sent

### Static Pages
- Every page is built as a static page. There is no file system at run time on Cloudflare Workers
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
3. Add it to `src/app/sitemap.ts` and, if needed, to `src/data/navigation.ts`

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
