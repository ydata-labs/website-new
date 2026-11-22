# yDataLabs site upgrade: design

Date: 2026-11-21
Status: waiting for approval

## 1. Why we do this

The site was built last year. It looks dated, parts of it are broken, and Google sees very little of it.
We want a site that brings in the right people and gives them a reason to contact yDataLabs.

### Who the site is for

The site is not limited to healthcare. Leaders come from any industry that has sensitive data: hospitals and pharma first, and also banks, factories, governments, and others.

1. **Leaders who need advice.** They want a consultant.
2. **Leaders who need a solution.** They want something built or automated, mostly with large language models (LLMs) and other AI. Many of them need it to run on their own servers.
3. **Researchers.** They want to read the work: papers, talks, and technical posts. Some may want to collaborate. (The "collaborate" part is our guess, not confirmed.)

### Positioning: private AI, proven in healthcare

The owner chose this from three options (section 11).

- The main message: yDataLabs builds LLM and AI systems that run where the customer's data lives.
- This covers LLM integration into existing systems, local LLMs, and on-premises AI at industry level. On-premises means the AI runs on the customer's own servers, not in a public cloud.
- Healthcare is the proof, not the limit. yDataLabs learned to handle the most sensitive data there. All existing projects, papers, and partners stay visible as evidence.

### What yDataLabs wants to be known for

Three strengths, shown with equal weight. Today the site reads mostly as a data science shop. The owner wants the engineering side to be much stronger.

1. **AI engineering.** Building working AI systems: LLM applications, LLM integration into existing systems, agents, language processing, computer vision.
2. **Platform engineering.** Building and running the platforms that AI needs: local LLMs, on-premises AI, MLOps (machine learning operations), cloud infrastructure, data pipelines, secure and compliant deployment. (This definition is our reading of "platform engineering". The owner can correct it.)
3. **Data science.** Predictive models, analytics, simulation, and decision support.

### What success looks like

- A leader understands in a few seconds what yDataLabs does, and can send a message that really arrives.
- A visitor sees that yDataLabs builds and runs systems, not only analyses data.
- A researcher finds the papers and talks in one click.
- Google indexes every page correctly and has new blog pages to rank.

## 2. Goals

- Fix everything that is broken today (list in section 6).
- Give the whole site a new look: "Dark lab" (section 7).
- Rewrite the home page around the three readers (section 8).
- Add a Research page (section 9).
- Add a blog at `ydatalabs.nl/blog`, written as text files in the project (section 10).

## 3. Non-goals

We do not build these now. Add them when there is a real need.

- A page for every solution or case study. Blog posts fill this role over time.
- A light theme or a theme switch. The site is dark only.
- Other languages. English only.
- An editor screen (content management system) for the blog.
- Blog comments, blog search, newsletter signup, or page numbers on the blog list.
- Analytics or cookie banners. Nothing on the site sets tracking cookies today, and this stays so.
- Any change to ModelPark or MinaMed. They are separate sites.

## 4. Anti-goals

These would make the result a failure even if it works.

- It looks like a generic AI agency template. No emoji as icons. No vague headline about "data".
- The site reads as "only for healthcare". A leader from another industry must feel addressed on the first screen.
- The healthcare proof gets lost or looks like a side note.
- The site reads as "only data science". AI engineering and platform engineering must be as visible as data science.
- Facts disagree between pages (years of experience, number of papers).
- Thin pages with little real text.
- A slow first screen, or text that is invisible until an animation runs.
- A blog where adding a post needs more than adding one text file.
- A contact form that says "sent" when nothing was sent.

## 5. Constraints

- Keep the current stack: Next.js 15 (App Router), React 19, Tailwind CSS 4, pnpm.
- Hosting stays on Cloudflare Workers through OpenNext. There is no file system at run time. So every page, including blog posts, must be built as a static page at build time.
- No runtime image optimizer. Images are compressed before they go into the project.
- Keep existing addresses: `/` and `/portfolio`. Google already knows them.
- Email for `ydatalabs.nl` runs on Google Workspace (the MX record points to Google). Cloudflare Email Routing cannot be used together with that. The old plan in `wrangler.jsonc` and `CLAUDE.md` is therefore dropped.
- Fonts stay: JetBrains Mono for headings, Libre Franklin for body text.
- **A push to the `main` branch publishes the live site.** Cloudflare builds and deploys on every push. So a merge to `main` is a go-live.
- Nothing goes live without the owner saying yes. All work happens on a separate branch per phase. Nobody pushes or merges to `main` without that yes.

## 6. Phase 1: fix what is broken

This phase ships first, on the current light design, so the contact form works as soon as possible.

| Problem today | Fix |
|---|---|
| The contact form posts to `/api/contact`. That route does not exist. The live site returns 404. | Build the route (see below). |
| `/og-image.png` is missing. Shared links show no picture. | Add a 1200x630 share image. |
| `/apple-touch-icon.png` is missing. | Add it. |
| `/portfolio` says its canonical address is the home page. Google may drop it. | Remove the canonical from the root layout. Each page sets its own. |
| No sitemap. `robots.txt` has no sitemap line. | Add `sitemap.ts` and `robots.ts` (built into Next.js). |
| Google verification code is the placeholder text `your-google-verification-code`. | Delete it. The domain is already verified through a DNS record. |
| Facts disagree: "10+ years" in the hero, "20+ years" in the page description. "30" papers in one text, "40+" in another. | Use one set of numbers everywhere. **The owner must give the true numbers** (section 13). |
| Unused starter files in `public/` (`next.svg`, `globe.svg`, `file.svg`, `window.svg`). | Delete. |

### Contact form route

- `POST /api/contact` takes name, email, subject, phone, and message.
- The server checks the input: required fields, a valid email shape, and length limits. Bad input gets a clear error.
- A hidden "honeypot" field catches simple spam bots. If it is filled, the server answers "ok" and sends nothing.
- The server sends the message to `info@ydatalabs.nl` through an email-sending service, with one HTTP call. The visitor's email goes in the reply-to field.
- The API key is stored as a Cloudflare secret. It is never in the code.
- If sending fails, the visitor sees an error and the direct email address. The form never claims success on failure.
- **Builder's call:** which email service. Resend is the default pick (free tier, one HTTP call). Cloudflare's own Email Service is fine too if it is available on the account. Either one needs the owner to create an account and add DNS records (section 13).
- Left out for now: a CAPTCHA. Add Cloudflare Turnstile if spam shows up.

### Consent text and privacy page

The form has a required checkbox today. It says "you agree to our terms and consent to cookie usage". The site has no terms page and no cookies, so the text is false. The owner chose this fix:

- Remove the checkbox.
- Show one true line under the form: "We use your details only to answer your message." It links to the privacy page.
- Add a short privacy page at `/privacy`. It says what the form collects, why, who receives it (yDataLabs and the email-sending service), how long it is kept, and how to ask for deletion.
- The builder drafts the page in plain language. **The owner checks the text before go-live** (section 13). The builder is not a lawyer.
- The footer links to the privacy page. The page is in the sitemap.

## 7. Phase 2: the new look ("Dark lab")

The owner picked this look from three mockups. The mockup file is kept at
`docs/superpowers/mockups/2026-11-21-visual-style.html` (option B).
The mockup shows the look only. Its words are out of date: they still say "for hospitals and pharma". Section 8 has the current wording.

### Tokens

| Role | Value |
|---|---|
| Page background | `#0b1220`, with a faint 32px grid |
| Surface (cards, panels) | `#111a2e` |
| Border | `#1e293b` |
| Text | `#e2e8f0` |
| Heading text | `#f8fafc` |
| Muted text | `#94a3b8` |
| Accent | `#2dd4bf` (bright teal) |
| Heading font | JetBrains Mono |
| Body font | Libre Franklin |

The builder may adjust shades for contrast. The feel must stay: dark, technical, calm, one accent color.

### Rules

- All icons are line icons in SVG. No emoji.
- Body text and controls meet WCAG AA contrast (Web Content Accessibility Guidelines, level AA).
- Every link and button has a visible keyboard focus ring.
- Motion is small. It turns off when the visitor's system asks for reduced motion.
- Content is visible without animation. Nothing starts at zero opacity and waits.
- The menu works on phones.
- Small labels and the menu use the mono font. Long text uses the body font.

### Images

No page loads the large files in `public/images/` today. Only the logo is used. So they do not slow the site now.

- The new design uses the founder photo, the product screenshots, and the partner logos where they fit. (Our call. The owner can change it at review.)
- Each image that is used is resized, converted to WebP, and given a width and height.
- Image files that no page uses are deleted.

### Applies to

Every page: home, portfolio, research, blog list, blog post, and the 404 page.

## 8. Phase 2: home page

### Menu

`Solutions` · `Work` · `Research` · `Blog` · `Contact` (button)

- "Work" links to `/portfolio`. The address does not change.
- "Blog" appears only when the blog has at least one published post (section 10).
- "Products" and "About" leave the menu. Their sections stay on the page.

### Sections, in order

1. **Hero.**
   - Headline: "LLMs and AI that run where your data lives." (Wording can be polished. It must name LLMs and the private, own-servers idea. It must not name one industry.)
   - A small line near the headline says "Proven in healthcare", so the proof is visible on the first screen.
   - One or two lines under it: we advise your team, and we build the system. This text names the three strengths: AI engineering, platform engineering, and data science.
   - Two buttons: "Book a call" (goes to contact) and "See our work" (goes to `/portfolio`).
   - On the right: a panel that shows a short document turning into structured data. It carries a small label: "runs on your own servers". This is static markup, not a live demo. The document may be a clinical note, as in the mockup. It is invented and contains no real personal data.
   - Proof line: project and client numbers, partner names.
2. **Three paths.** "Get advice", "Get it built", "Read the research".
   - "Get advice" links to the Advice section (item 4 below).
   - "Get it built" links to the Solutions section.
   - "Read the research" links to `/research`.
3. **Solutions.** Grouped under three headings: AI engineering, platform engineering, data science. Each group has similar weight on the page.
   - The current items in `src/data/solutions.ts` are sorted into the groups, with new icons.
   - The builder drafts new items for: LLM integration, local LLMs, and on-premises AI. Platform engineering has only one item today (MLOps), so it also gets items such as data pipelines and secure deployment. The owner checks this text in the preview.
   - Items that are healthcare-only today (for example medical computer vision) are reworded to be general, or moved to the Healthcare section. The builder decides per item.
   - Consulting and coaching is not a fourth group. It is the "Get advice" path and applies to all three.
4. **Advice.** A short section for leaders who want a consultant. (Our call, so the first reader group has something to read.)
   - It reuses text that exists today: the strategy and coaching item in `src/data/solutions.ts`, and the workshops, mentorship, and knowledge transfer items in `src/data/portfolio.ts`.
   - It ends with a "Book a call" button that goes to contact.
5. **Proven in healthcare.** A strong section of its own. It says why healthcare is the hardest test for private AI, and shows the featured healthcare projects with a link to `/portfolio`. It also names the healthcare partners.
6. **Products.** ModelPark and MinaMed, shown as proof that yDataLabs ships real products.
7. **Founder.** Short. Links to `/research`.
8. **Latest posts.** The three newest blog posts. Hidden until the blog has at least one post.
9. **Contact.** The working form from phase 1, restyled.

### Search details for every page

- One clear `h1` per page.
- A unique title and description per page.
- Its own canonical address.
- Organization and Person structured data stay, with the corrected facts.
- Titles, descriptions, and structured data name all three strengths, not only data science.
- The home page targets the private AI terms: LLM integration, local LLM, on-premises AI, private LLM. The portfolio and research pages keep the healthcare terms: healthcare AI, medical NLP (natural language processing), clinical MLOps. This way the site gains the new terms without losing the old ones.

### Portfolio page

Same projects, new look. No change to the address or the structure.
The "services" block on this page uses the same three groups as the home page.

## 9. Phase 2: Research page (`/research`)

- A short intro about the founder's research.
- **Selected publications:** title, venue, year, and a link. About 10 to 15 items.
- **Selected talks:** title, event, year, and a link if there is one.
- A link to the full Google Scholar profile.
- The data lives in a new file, `src/data/research.ts`.
- **The owner supplies or confirms the list** (section 13). The builder may draft it from Google Scholar, but the owner checks it before it goes live.

## 10. Phase 3: blog

### Writing a post

- A post is one Markdown file in `content/blog/`. The file name is the address: `my-post.md` becomes `/blog/my-post`.
- The top of the file holds the post's details:

```yaml
---
title: What LLMs can safely do in a hospital today
description: One or two sentences for Google and for the blog list.
date: 2026-12-01
audience: leaders        # "leaders" or "research"
topic: platform-engineering   # "ai-engineering", "platform-engineering", or "data-science"
author: Dr. Veysel Kocaman
draft: false             # optional. Drafts are not built.
image: /images/blog/x.webp   # optional share image
---
```

- Posts support headings, links, images, tables, code blocks with highlighting, and math formulas.
- To publish: add the file, commit, and deploy.

### Pages

- **`/blog`:** all posts, newest first. Each shows title, date, description, an audience label, and a topic label. Two simple filters: "For leaders" and "Research". The topic is shown as a label only, with no filter for now.
- **`/blog/[slug]`:** the post. Readable column width, comfortable line height, clear code blocks. Shows date, author, and reading time.
- **`/blog/rss.xml`:** a feed, for readers who use feed apps.

### Search

- Every post has its own title, description, canonical address, and share data.
- Every post carries `BlogPosting` structured data.
- Posts appear in the sitemap automatically.

### How it is built

- Posts are read and turned into HTML at build time only. Unknown addresses return 404.
- **Builder's call:** which Markdown libraries. Use the smallest set that covers code highlighting and math.
- One small automated check covers the post loader: sorting by date, skipping drafts, and rejecting a post with missing details.

### Launch

The owner chose: build the blog now, publish posts later. The builder does not write posts about client work.

- While there are no published posts:
  - The "Blog" menu link and the "Latest posts" home section are hidden.
  - `/blog` shows a short "no posts yet" line. It is marked `noindex` and left out of the sitemap.
- When the first post is published, all of this turns on by itself. No code change is needed.
- The builder adds one sample post with `draft: true`. It shows every feature: headings, a table, a code block, a formula, an image. It serves as a template for writers.
- Draft posts show in local development (`pnpm dev`). They are never in the live build.

## 11. Approaches we considered

**How the site positions yDataLabs**

| Option | Trade-off | Picked |
|---|---|---|
| 1. Private AI, proven in healthcare | Any industry with sensitive data feels addressed. Healthcare is the proof. | **Yes (owner's choice)** |
| 2. Fully general: AI for every industry | Widest reach. Nothing sets yDataLabs apart. The healthcare proof looks like a side note. | No |
| 3. Two doors: healthcare and industry | Simple. But it reads as two businesses, and the page gets longer. | No |

An earlier draft was healthcare-only. The owner rejected that as too narrow.

**How big the rebuild is**

| Option | Trade-off | Picked |
|---|---|---|
| 1. Repaint the two existing pages, add the blog | Fastest. Researchers get no landing place. | No |
| 2. Option 1 plus a Research page | A little more work. Needs a list of papers. | **Yes** |
| 3. Option 2 plus a page per solution and case study | About 15 more pages. Each needs real text, or it hurts ranking. | No, maybe later |

Why option 2: researchers get a real page now. Blog posts add rankable pages over time without thin content.

**The look**

| Option | Trade-off | Picked |
|---|---|---|
| A. Clean clinic: light, current navy and teal | Safest. Closest to today. | No |
| B. Dark lab: dark, technical, LLM panel in the hero | Strong with researchers and engineers. Some leaders may find it cold. | **Yes (owner's choice)** |
| C. Journal: warm paper tone, serif headline | Biggest change. Research-led feel. | No |

**How blog posts are written**

| Option | Trade-off | Picked |
|---|---|---|
| Text files in the project | Simple and free. The writer uses Git or sends text to a developer. | **Yes (owner's choice)** |
| An editor screen | Easy for anyone. One more tool to run. | No |

**Where the blog lives**

| Option | Trade-off | Picked |
|---|---|---|
| `ydatalabs.nl/blog` | One project, one deploy. Posts help the main site rank. | **Yes (our proposal, owner did not object)** |
| `blog.ydatalabs.nl` | Google treats it more like a separate site. A second project to run. | No |

## 12. Order of work and checks

1. **Phase 1:** fixes. Ships alone.
2. **Phase 2:** new look, home page, portfolio restyle, Research page.
3. **Phase 3:** blog.

Each phase ends the same way:

- `pnpm build` and `pnpm lint` pass.
- The builder checks the pages in a browser, on desktop and phone width.
- The owner reviews a local preview of the phase branch.
- The owner says yes. Only then is the branch merged to `main`, which publishes it.

After phase 1 is live: send one real test message through the form and confirm it arrives. Submit the sitemap in Google Search Console.

## 13. What we need from the owner

1. **True numbers.** Years of experience. Number of peer-reviewed papers. Number of talks, clients, and projects.
2. **Email service.** Create the account (Resend by default), add its DNS records, and give the API key as a Cloudflare secret.
3. **Research list.** Supply 10 to 15 papers and a few talks, or approve a list drafted from Google Scholar.
4. **Privacy page.** Check the drafted text.
5. **Social links.** Confirm the LinkedIn, X (Twitter), and GitHub addresses in the footer are real and current.
6. **New solution text.** Check the items the builder drafts for LLM integration, local LLMs, on-premises AI, and platform engineering. The builder must not claim projects or clients that do not exist.
7. **First blog post.** Not needed to finish the work. The blog turns on when the first post is added.

Phase 1 needs items 1, 2, and 4. Phase 2 needs items 3, 5, and 6. Phase 3 needs nothing from the owner.

## 14. Left to the builder

- Exact spacing, sizes, and component structure.
- Icon set, as long as icons are SVG.
- The share image design, in the Dark lab look.
- Email service and Markdown libraries, within the limits above.
- Whether `ARCHITECTURE.md`, `README.md`, and `CLAUDE.md` need updates after each phase. They do if they describe things that changed.
