# Architecture Documentation

## System Overview

The yDataLabs website is a Next.js application deployed on Cloudflare Workers through OpenNext. It is the marketing, portfolio, and research site of yDataLabs, a firm that builds private LLM and AI systems, proven in healthcare.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Cloudflare Edge                          │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────┐│
│  │   CDN/Cache  │  │ Static Assets│  │   Workers (OpenNext)   ││
│  └──────────────┘  └──────────────┘  └────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Next.js Application                         │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                     App Router                            │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────────────┐  │  │
│  │  │  page.tsx  │  │ portfolio/ │  │   api/contact/     │  │  │
│  │  │  (Landing) │  │  page.tsx  │  │     route.ts       │  │  │
│  │  └────────────┘  └────────────┘  └────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                  │
│                              ▼                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Components                             │  │
│  │  ┌─────────────────┐    ┌─────────────────────────────┐  │  │
│  │  │   UI Components │    │      Section Components     │  │  │
│  │  │  - Header       │    │  - Hero                     │  │  │
│  │  │  - Footer       │    │  - Paths                    │  │  │
│  │  │  - Button       │    │  - Solutions                │  │  │
│  │  │  - SectionHeader│    │  - Advice                   │  │  │
│  │  │  - Icon         │    │  - Healthcare               │  │  │
│  │  └─────────────────┘    │  - Products                 │  │  │
│  │                         │  - Founder                  │  │  │
│  │                         │  - Contact                  │  │  │
│  │                         └─────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                  │
│                              ▼                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                      Data Layer                           │  │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────┐            │  │
│  │  │ navigation │ │  products  │ │  portfolio │            │  │
│  │  │    .ts     │ │    .ts     │ │    .ts     │            │  │
│  │  └────────────┘ └────────────┘ └────────────┘            │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Page Composition Pattern

Pages are composed of section components, following a modular architecture:

```tsx
// src/app/page.tsx
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Products />
        <Solutions />
        <About />
        <PortfolioSummary />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

### Component Hierarchy

```
Layout (layout.tsx)
├── Header (ui/Header.tsx)
│   └── Navigation (data/navigation.ts)
├── Page Content
│   ├── Sections (sections/*.tsx)
│   │   └── UI Components (ui/*.tsx)
│   └── Data (data/*.ts)
└── Footer (ui/Footer.tsx)
```

## Data Flow

### Static Data
All content is stored in TypeScript files under `src/data/`:

```
data/
├── navigation.ts   # Menu items, footer links, social links
├── products.ts     # ModelPark, MinaMed product info
├── solutions.ts    # Three solution groups, advice items, proof numbers
├── portfolio.ts    # Projects, case studies, founder info, partners
├── research.ts     # Selected publications and talks
└── seo.ts          # Page titles, share data, structured data
```

### Contact Form Flow

```
User Input → Contact.tsx → POST /api/contact → src/lib/contact.ts → Resend HTTP API → Inbox
                                    │
                                    ├── Bad input: 400 with a sentence for the visitor
                                    ├── Honeypot filled: 200, nothing sent, one log line
                                    └── No API key (500) or Resend failure (502): the form shows the direct email address
```

## Styling Architecture

### Tailwind CSS 4 Theme: the "Dark lab" look

The site is dark only. The tokens live in `globals.css`:

```css
@theme {
  --color-page: #0b1220;        /* page background, with a faint 32px grid */
  --color-surface: #111a2e;     /* cards and panels */
  --color-line: #1e293b;        /* borders */
  --color-line-strong: #64748b; /* input borders */
  --color-ink: #e2e8f0;         /* text */
  --color-bright: #f8fafc;      /* headings */
  --color-muted: #94a3b8;       /* secondary text */
  --color-accent: #2dd4bf;      /* the one accent color */

  --font-heading: "JetBrains Mono", monospace;
  --font-body: "Libre Franklin", sans-serif;
}
```

Use them as `bg-page`, `bg-surface`, `border-line`, `text-ink`, `text-bright`,
`text-muted`, `text-accent`.

### Rules of the look

`src/lib/design.test.mjs` checks these on every `pnpm test`:

- Text colors meet WCAG AA contrast (4.5:1). Input borders meet 3:1.
- No emoji. Icons come from `src/components/ui/Icon.tsx`.
- No entry animation: no `animate-` class and no `opacity-0` class. Content is visible at once.
- One global `:focus-visible` ring, and motion turns off for "reduced motion".
- Every `/images/...` path in the code exists in `public/`.
- The anchors `solutions`, `advice`, `healthcare`, `products`, `about`, `contact` exist.

## Deployment Architecture

### Cloudflare Pages + OpenNext

The application is deployed using OpenNext for Cloudflare:

```
Build Process:
1. pnpm build (Next.js static build)
2. opennextjs-cloudflare build (Transform for Workers)
3. opennextjs-cloudflare deploy (Deploy to Cloudflare)

Output:
.open-next/
├── worker.js        # Cloudflare Worker
└── assets/          # Static assets
```

### Wrangler Configuration

Key bindings in `wrangler.jsonc`:
- `ASSETS`: Static asset binding
- `RESEND_API_KEY` (secret, not in the file): set with `pnpm exec wrangler secret put RESEND_API_KEY`

## Performance Optimizations

1. **Static Generation**: All pages are statically generated
2. **Font Optimization**: Google Fonts with `display: swap`
3. **Images**: sized and converted to WebP by hand. `next/image` runs unoptimized, because Workers has no image optimizer
4. **No entry animations**: content is visible at once
5. **Edge Deployment**: Cloudflare global CDN

## Security Considerations

1. **Input Sanitization**: Contact form inputs are sanitized
2. **CORS**: Configured in API routes
3. **CSP**: Recommended to add via Cloudflare headers
4. **Rate Limiting**: Recommended to add via Cloudflare

## Extensibility

### Adding New Pages

1. Create route directory in `src/app/`
2. Add the page to `pages` in `src/data/seo.ts` and export `metadata = pageMetadata("<key>")` from `page.tsx`
3. Add it to `src/app/sitemap.ts`
4. Update navigation in `data/navigation.ts`

### Adding New Sections

1. Create component in `src/components/sections/`
2. Export from `index.ts`
3. Add to page composition

### Integrating External Services

The API routes support Cloudflare bindings:
- D1 Database
- KV Storage
- Email Service (not Email Routing: mail for this domain runs on Google)
- AI (Workers AI)

## Monitoring & Analytics

Configured in `wrangler.jsonc`:
```json
{
  "observability": {
    "enabled": true
  }
}
```

Additional analytics can be added via:
- Cloudflare Web Analytics
- Google Analytics 4
- Plausible/Fathom

