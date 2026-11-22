# OpenNext Starter

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Read the documentation at https://opennext.js.org/cloudflare.

## Develop

Run the Next.js development server:

```bash
npm run dev
# or similar package manager command
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Write a blog post

1. Copy `content/blog/writing-a-post.md` to a new file in the same folder. The file name becomes the address: `my-post.md` is `/blog/my-post`.
2. Change the details at the top and write your text in Markdown.
3. Run `pnpm dev` and open `http://localhost:3000/blog` to see it. Drafts show here only.
4. Run `pnpm test`. It checks every post.
5. Set `draft: false` and commit. The post is live with the next deploy.

The blog is hidden on the live site until the first post is published.

Read [docs/blog-writing-guide.md](docs/blog-writing-guide.md) before you write. It covers what to think about first, how to write the title and the text, and a checklist.

## Preview

Preview the application locally on the Cloudflare runtime:

```bash
npm run preview
# or similar package manager command
```

## Deploy

Deploy the application to Cloudflare:

```bash
npm run deploy
# or similar package manager command
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
