# How to write a blog post

This guide is for anyone who writes a post for the yDataLabs blog: a person, or an AI assistant that drafts for a person.

It covers what to think about before you write, how to write the post, and how to publish it.

The file `content/blog/writing-a-post.md` is the template. It shows the syntax: the details block, tables, code, formulas, images. This guide does not repeat it.

## 1. Before you write

Need a subject? [blog-post-ideas.md](blog-post-ideas.md) has a list of possible posts.

Answer these five questions first. If you cannot answer one, the post is not ready.

| Question | Why it matters |
|---|---|
| Who is the one reader? | A post has one `audience`: `leaders` or `research`. A post for both serves neither |
| What one question does the post answer? | The reader came with a question. The post is the answer |
| What would the reader type into Google? | That phrase goes into the title, the description, and the first paragraph |
| What do we know that others do not? | A post that repeats other sites has no reason to exist. Write from our own work |
| Is every fact true and allowed? | See "Rules about truth" below |

### The two readers

| | `leaders` | `research` |
|---|---|---|
| Who | People who plan and pay for AI work | Engineers and researchers |
| They want | A decision: what to do, what it costs, what can go wrong | A method: how it works, how to repeat it |
| Style | No formulas. Little code. Explain every technical term | Code, formulas, and numbers are welcome |
| Example question | "What can a local LLM safely do in a hospital?" | "How do you measure errors in text extraction?" |

### The search phrase

- Pick one phrase per post. Make it specific. "On-premises LLM for patient letters" is better than "AI in healthcare".
- The home page already targets the broad terms: LLM integration, local LLM, on-premises AI. A post should target a narrower phrase, not compete with the home page.
- Do not repeat the phrase again and again. Use it in the title, the description, and once near the top. Then write normally.

### Rules about truth

These rules have no exceptions.

- Never invent a client, a project, a result, a number, or a quote.
- Do not write about client work without the owner's yes.
- Use only the confirmed company numbers. They are listed in `CLAUDE.md` under "Copy".
- Link only to sources you have opened and read.
- An AI assistant must not fill a gap with a guess. It asks the owner for the fact, or it leaves the part out.

## 2. The details block

| Detail | How to write it well |
|---|---|
| `title` | 60 characters at most. Put the search phrase near the start. Say what the reader gets. No tricks like "You won't believe" |
| `description` | 160 characters at most. One or two sentences. It is the text under the title in Google and on the blog list, so it must make sense alone |
| `date` | The day the post goes live |
| `audience` | `leaders` or `research`. See the table above |
| `topic` | The one that fits best: `ai-engineering`, `platform-engineering`, or `data-science` |
| `author` | The real name of the writer |
| `image` | Optional. The picture for shared links. Best size: 1200 by 630 pixels |
| `draft` | Keep `true` while you write |

### The file name

- The file name is the address. `local-llm-patient-letters.md` becomes `/blog/local-llm-patient-letters`.
- Use three to five words. Include the search phrase.
- **Do not rename the file after the post is live.** The old address stops working, and every link to it breaks.

## 3. The text

### Structure

1. **Start with the answer.** The first paragraph says what the post concludes. A reader who stops there still learned something.
2. **Use `##` headings that say what the section holds.** "What it costs" is better than "Considerations". Never use a `# ` heading: the title is the main heading.
3. **One idea per paragraph.** Two to four sentences.
4. **End when the answer is complete.** Do not add a summary that repeats the text.

Do not write your own "contact us" ending. Every post page already ends with a "Book a call" box.

### Words

- Use plain words and short sentences.
- Do not use sales words: "cutting-edge", "revolutionize", "seamless", and words like them.
- Explain an abbreviation the first time you use it.
- No emoji. `pnpm test` fails on one.

### Useful parts

| Part | When to use it |
|---|---|
| Table | To compare things. Readers scan tables before they read text |
| Code block | Always name the language, so the code gets colors |
| Formula | Only for `research` posts |
| Image | When it shows something the text cannot. Describe it in the square brackets, for readers who cannot see it |
| Link | To our own pages (`/portfolio`, `/research`, other posts) and to your sources |

### Images

1. Convert the image to WebP: `cwebp -q 80 -resize 1200 0 in.png -o out.webp`
2. Put it in `public/images/blog/`.
3. Write the path from the site root: `/images/blog/out.webp`.

### Length

There is no target length. Write until the question is answered, then stop. The page shows the reading time by itself.

## 4. From draft to live

1. Copy `content/blog/writing-a-post.md` to a new file in the same folder.
2. Fill in the details block. Keep `draft: true`.
3. Write the text.
4. Run `pnpm dev` and open `/blog/<file-name>`. Look at it at phone width too.
5. Run `pnpm test`. It checks every post.
6. Go through the checklist below.
7. Set `draft: false` and commit on a branch.
8. Open a pull request. A merge to `main` publishes the site, so it needs the owner's yes.

### What the build checks for you

You do not need to check these by hand. The message names the file.

| Problem | `pnpm test` | `pnpm build` |
|---|---|---|
| A missing or misspelled detail, or a wrong value | stops | stops |
| A date that is not a real day | stops | stops |
| A title over 60 characters, or a description over 160 | stops | stops |
| A `# ` heading in the text | stops | stops |
| A broken formula | stops | stops |
| An emoji | stops | does not check |
| An image file that does not exist | stops | does not check |

So always run `pnpm test` before you publish.

### Checklist before you publish

The build cannot check these. A person must.

- [ ] The post answers one question for one reader.
- [ ] The first paragraph gives the answer.
- [ ] The title and the description hold the search phrase and read well alone.
- [ ] Every fact, number, and name is true. Client work has the owner's yes.
- [ ] Every link opens the right page.
- [ ] Every image has a description.
- [ ] The post links to at least one other page of this site.
- [ ] The page looks right on a phone.
- [ ] Someone other than the writer has read it.

## 5. After the post is live

- **To fix or extend a post:** change the text and add `updated: YYYY-MM-DD` to the details block. The post shows the new day, and Google learns about the change. Do not change `date`.
- **Never rename the file.**
- **To take a post down:** set `draft: true`. The address then gives a "not found" page.
- **When a newer post covers the same subject:** link from the old post to the new one.
