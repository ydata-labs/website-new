# Architecture Documentation

## System Overview

The yDataLabs website is a modern Next.js application deployed on Cloudflare Pages. It serves as a marketing and portfolio site for a healthcare AI consulting firm.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Cloudflare Edge                          │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────┐│
│  │   CDN/Cache  │  │ Email Workers│  │    Pages (OpenNext)    ││
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
│  │  │  - Footer       │    │  - Products                 │  │  │
│  │  │  - Button       │    │  - Solutions                │  │  │
│  │  │  - SectionHeader│    │  - About                    │  │  │
│  │  └─────────────────┘    │  - PortfolioSummary         │  │  │
│  │                         │  - Partners                 │  │  │
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
├── navigation.ts   # Menu items, footer links
├── products.ts     # ModelPark, MinaMed product info
├── solutions.ts    # AI/ML capabilities, features
└── portfolio.ts    # Projects, case studies, founder info
```

### Contact Form Flow

```
User Input → Contact.tsx → POST /api/contact → Cloudflare Email Workers → Inbox
                                    │
                                    └── Fallback: Console log (dev mode)
```

## Styling Architecture

### Tailwind CSS 4 Theme

Custom theme tokens defined in `globals.css`:

```css
@theme {
  /* Colors */
  --color-navy: #0f172a;
  --color-teal: #0d9488;
  --color-slate-bg: #f8fafc;

  /* Typography */
  --font-heading: "JetBrains Mono", monospace;
  --font-body: "Libre Franklin", sans-serif;

  /* Animations */
  --animate-fade-in-up: fade-in-up 0.6s ease-out forwards;
}
```

### CSS Utility Patterns

```css
/* Custom utilities in globals.css */
.text-gradient       /* Gradient text effect */
.bg-gradient-mesh    /* Decorative background */
.bg-grid-pattern     /* Grid pattern overlay */
.card-hover          /* Card hover animation */
.link-underline      /* Animated underline */
.btn-glow            /* Button glow effect */
```

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
- `EMAIL` (optional): Email Workers binding

## Performance Optimizations

1. **Static Generation**: All pages are statically generated
2. **Font Optimization**: Google Fonts with `display: swap`
3. **Image Optimization**: Next.js Image component
4. **CSS-only Animations**: No JavaScript animation library
5. **Edge Deployment**: Cloudflare global CDN

## Security Considerations

1. **Input Sanitization**: Contact form inputs are sanitized
2. **CORS**: Configured in API routes
3. **CSP**: Recommended to add via Cloudflare headers
4. **Rate Limiting**: Recommended to add via Cloudflare

## Extensibility

### Adding New Pages

1. Create route directory in `src/app/`
2. Add `page.tsx` with metadata export
3. Update navigation in `data/navigation.ts`

### Adding New Sections

1. Create component in `src/components/sections/`
2. Export from `index.ts`
3. Add to page composition

### Integrating External Services

The API routes support Cloudflare bindings:
- D1 Database
- KV Storage
- Email Workers
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

