# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the yDataLabs website - a modern, production-ready landing page for a healthcare AI consulting firm. The site showcases two main products (ModelPark and MinaMed) and features a comprehensive portfolio page detailing Dr. Veysel Kocaman's healthcare AI projects.

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
│   ├── layout.tsx          # Root layout with SEO metadata, fonts, JSON-LD
│   ├── page.tsx            # Landing page
│   ├── globals.css         # Tailwind theme configuration
│   ├── sitemap.ts          # Sitemap (add every new page here)
│   ├── robots.ts           # robots.txt
│   ├── apple-icon.png      # Phone home-screen icon (source: scripts/apple-icon.html)
│   ├── portfolio/
│   │   └── page.tsx        # Full portfolio page
│   ├── privacy/
│   │   └── page.tsx        # Privacy page (linked from the contact form and footer)
│   └── api/
│       └── contact/
│           └── route.ts    # Contact form API (sends through Resend)
├── components/
│   ├── sections/           # Page sections (Hero, Products, Solutions, etc.)
│   │   ├── Hero.tsx
│   │   ├── Products.tsx
│   │   ├── Solutions.tsx
│   │   ├── About.tsx
│   │   ├── PortfolioSummary.tsx
│   │   ├── Partners.tsx
│   │   ├── Contact.tsx
│   │   └── index.ts
│   └── ui/                 # Reusable UI components
│       ├── Header.tsx
│       ├── Footer.tsx
│       ├── Button.tsx
│       ├── SectionHeader.tsx
│       └── index.ts
├── data/                   # Static data files
│   ├── navigation.ts
│   ├── products.ts
│   ├── solutions.ts
│   ├── portfolio.ts
│   └── seo.ts              # Share image constant
└── lib/
    ├── cn.ts               # Tailwind merge utility
    ├── contact.ts          # Contact form logic (no imports, tested)
    └── contact.test.mjs    # Tests, run with `pnpm test`
```

## Design System

### Typography
- **Headings**: JetBrains Mono (technical, monospace feel)
- **Body**: Libre Franklin (readable, professional)

### Color Palette
- **Navy** (`#0f172a`): Primary brand color
- **Teal** (`#0d9488`): Accent/CTA color
- **Slate Background** (`#f8fafc`): Light background
- Custom semantic colors defined in `globals.css`

### Animations
All animations are CSS-only for performance:
- `animate-fade-in-up`: Staggered reveal effect
- `animate-float`: Floating elements
- `animate-pulse-slow`: Subtle pulsing
- Delay classes: `delay-100` through `delay-800`

## Key Implementation Details

### SEO
- Comprehensive metadata in `layout.tsx`
- JSON-LD structured data for Organization and Person schemas
- Open Graph and Twitter card meta tags
- The share image is `public/og-image.png` (source: `scripts/og-image.html`). A page with its own `openGraph` block must add `images: [shareImage]` from `src/data/seo.ts`, or it loses the image
- Every page sets its own `alternates.canonical`. Never set one in the root layout
- New pages must be added to `src/app/sitemap.ts`
- Semantic HTML with proper heading hierarchy

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

### Modifying Data
- Products: `src/data/products.ts`
- Solutions: `src/data/solutions.ts`
- Portfolio projects: `src/data/portfolio.ts`
- Navigation: `src/data/navigation.ts`

### Styling
- Use Tailwind utility classes
- Custom theme tokens in `src/app/globals.css`
- Use `cn()` utility from `src/lib/cn.ts` for conditional classes

## Deployment

**A push to `main` publishes the live site.** Cloudflare builds and deploys on every push.
Work on a branch. Never push or merge to `main` without the owner's yes.

`pnpm deploy` also deploys by hand. `pnpm preview` runs the Cloudflare build locally.

## Environment Variables

- `RESEND_API_KEY` (secret, required): set with `pnpm exec wrangler secret put RESEND_API_KEY`. For local use, copy `.dev.vars.example` to `.dev.vars`.
- `CONTACT_EMAIL` (optional): where form messages go. Default `info@ydatalabs.nl`.
- `CONTACT_FROM` (optional): the sender. Default `yDataLabs Website <website@ydatalabs.nl>`.

Email for `ydatalabs.nl` runs on Google Workspace, so Cloudflare Email Routing cannot be used.
