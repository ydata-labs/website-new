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
- Do not use sales words: "cutting-edge", "revolutionize", "seamless", and words like them. `pnpm test` fails on the most common ones.
- Explain an abbreviation the first time you use it.
- No emoji. `pnpm test` fails on one.

### Say each thing once

A reader notices fast when a text repeats itself. It feels like padding.

- **Each fact appears once.** If two sections need the same fact, the sections are cut in the wrong place. Move them.
- **No opening that lists what the post will say.** Start with the answer.
- **No closing that repeats what the post said.** Stop after the last new point.
- **The first sentence under a heading must not repeat the heading.**
- **Test every paragraph:** what is new here? If the answer is "nothing", delete the paragraph.

`pnpm test` fails when the same sentence appears twice in a post. It cannot find the same idea in other words. Only a reader can find that.

### Sound like a person

A reader must not be able to tell that an AI assistant helped. There is no trick for this. The text sounds like a person when the content comes from a person.

Where the content comes from:

- **Start from your own material.** A case you saw, a number you measured, a mistake you made, a choice you would not make again. An assistant can turn notes into a draft. It cannot supply the experience.
- **Take a position.** "We would not use a cloud model for this, because..." is a sentence only someone with experience writes. A text that weighs "on the one hand" and "on the other hand" with no conclusion reads as machine text.
- **Be concrete.** Replace "many organisations" with who. Replace "significant" with the number.

Marks of machine text. Remove every one:

| Mark | Example | Do this |
|---|---|---|
| An opening that sets a scene | "In today's fast-paced world..." | Start with the answer |
| A closing that sums up | "In conclusion...", "Overall..." | End on the last new point |
| A filler warning | "It is important to note that..." | Say the thing |
| Groups of three, again and again | "fast, safe, and simple" | Name the one that matters |
| A fake contrast | "It is not just a tool, it is a partner" | Say what it is |
| A question as a bridge | "So what does this mean?" | Go straight to the point |
| Fashion words | "delve", "landscape", "unlock", "game-changer" | Use the plain word |
| The same shape in every section | One intro line, three bullets, one closing line | Let each section have the shape its content needs |
| Many long dashes | A dash in every paragraph | Use a full stop |
| Bold at the start of every bullet | As in a slide deck | Bold only what the reader must not miss |

`pnpm test` fails on the most common stock phrases. The list is `STOCK_PHRASES` in `src/lib/blog.mjs`.

Two last checks:

1. **Read the post out loud.** Rewrite every sentence you would not say to a colleague.
2. **The person named as `author` edits every sentence.** Their name is on the post, so the words must be theirs.

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
| The same sentence twice | stops | does not check |
| A stock phrase, such as "cutting-edge" or "in conclusion" | stops | does not check |
| An image file that does not exist | stops | does not check |

So always run `pnpm test` before you publish.

### Checklist before you publish

The build cannot check these. A person must.

- [ ] The post answers one question for one reader.
- [ ] The first paragraph gives the answer.
- [ ] The title and the description hold the search phrase and read well alone.
- [ ] No fact or idea appears twice.
- [ ] The post holds something from our own work: a case, a number, or a clear opinion.
- [ ] The author has read the post out loud and edited every sentence.
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
