---
title: How to write a post for this blog
description: A template for writers. It shows the details block and every kind of content a post can hold, from tables to formulas.
date: 2026-11-22
audience: research        # "leaders" or "research"
topic: platform-engineering   # "ai-engineering", "platform-engineering", or "data-science"
author: yDataLabs
draft: true               # this post is a template, so it never goes live
image: /images/blog/sample.webp
---

This post is a template. It is marked as a draft, so it is never on the live site. Copy this file, change the details at the top, and write your text.

## The details block

Every post starts with a block between two `---` lines. It holds the details of the post.

```yaml
---
title: What LLMs can safely do in a hospital today
description: One or two sentences for Google and for the blog list.
date: 2026-12-01
audience: leaders
topic: platform-engineering
author: Dr. Veysel Kocaman
draft: false
image: /images/blog/my-image.webp
updated: 2027-01-15
---
```

| Key | Needed | Allowed values | Example | What it does |
|---|---|---|---|---|
| `title` | yes | any text, 48 characters at most | `Local LLMs: a short guide` | The heading of the page and the title in Google |
| `description` | yes | one or two sentences, 160 characters at most | `What a local LLM is.` | Shown in the blog list and in Google |
| `date` | yes | `YYYY-MM-DD` | `2026-12-01` | Shown on the post. Newer posts come first |
| `audience` | yes | `leaders`, `research` | `leaders` | The label and the filter on the blog page |
| `topic` | yes | `ai-engineering`, `platform-engineering`, `data-science` | `data-science` | A label on the post |
| `author` | yes | a name, or `yDataLabs` | `Dr. Veysel Kocaman` | Shown on the post |
| `draft` | no | `true`, `false` | `true` | A draft is not on the live site |
| `image` | no | a path that starts with `/` | `/images/blog/x.webp` | The picture for shared links |
| `updated` | no | `YYYY-MM-DD`, not before `date` | `2027-01-15` | The day of the last change. Shown on the post and told to Google |

Two rules for the block:

- A value may contain a colon. `title: Local LLMs: a short guide` works.
- Text after ` #` is a comment. If your value needs a `#`, put the value in quotes.

A misspelled key, a missing detail, a wrong date, or a title that is too long stops the build with a clear message. Nothing half-right goes live.

## The file name is the address

Save the file in `content/blog/`. The file `my-first-post.md` becomes the page `/blog/my-first-post`.

Use only small letters, numbers, and dashes in the file name.

## Headings

The title of the post is the main heading of the page. So inside the text, start at `##`.

### A smaller heading

Use `###` for a part inside a section. A heading with a single `#` is not allowed.

## Text, links, and lists

Write plain paragraphs. Leave an empty line between them. You can make text **bold** or *italic*, and you can link to [the research page](/research) or to [another site](https://www.markdownguide.org/basic-syntax/).

A list with points:

- Keep sentences short.
- Use one idea per paragraph.
- Explain a technical word the first time you use it.

A list with steps:

1. Write the post.
2. Read it once more, out loud.
3. Publish it.

> A quote starts with the `>` sign. Use it for a sentence from another person or paper.

## Code

Put short code inside a line with backticks, like `pip install pandas`.

Put longer code in a block. Name the language after the first three backticks to get colors.

```python
from collections import Counter


def most_common_words(text: str, limit: int = 10) -> list[tuple[str, int]]:
    """Return the most common words in a text."""
    words = [word.strip(".,;:!?()").lower() for word in text.split() if len(word.strip(".,;:!?()")) > 3]
    return Counter(words).most_common(limit)


print(most_common_words("A long line of code does not break the page. The block scrolls sideways."))
```

A long line does not break the page. The block scrolls sideways.

## Formulas

Write a formula inside a line between two dollar signs. For example, `$a^2 + b^2 = c^2$` gives $a^2 + b^2 = c^2$.

Put a bigger formula on its own lines, between two lines with `$$`. This one is how the blog works out the reading time of a post:

$$
\text{minutes} = \max\left(1,\ \operatorname{round}\left(\frac{\text{words}}{200}\right)\right)
$$

A price such as $5 or $10 stays normal text. To be safe, you can also write a backslash before the sign: `\$5`.

## Images

Save the image in `public/images/blog/`. Make it a WebP file, at most 1200 pixels wide:

```bash
cwebp -q 80 -resize 1200 0 my-image.png -o public/images/blog/my-image.webp
```

Then add it to the text. The words in the square brackets describe the image for people who cannot see it.

![The yDataLabs share image, used here as a sample picture](/images/blog/sample.webp)

## Check and publish

1. Run `pnpm dev` and open `http://localhost:3000/blog`. Drafts show here, and only here.
2. Run `pnpm test`. It checks every post.
3. Set `draft: false`, or remove the line.
4. Commit the file. The post goes live with the next deploy to `main`.

When the first post is live, the "Blog" link in the menu and the "Latest posts" part of the home page turn on by themselves.
