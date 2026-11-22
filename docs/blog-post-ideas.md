# Ideas for blog posts

A list of possible posts. Written on 2026-11-22.

These are ideas only. No post exists yet. The facts, numbers, and examples of every post must come from the owner. Read [blog-writing-guide.md](blog-writing-guide.md) before you write one.

Every idea is based on something the site already names: a service, a product, or a paper.

When a post is published, remove its row from this file.

## For leaders

Use `audience: leaders`.

| # | Working title | Search phrase | Topic | Based on |
|---|---|---|---|---|
| 1 | Local LLM or cloud API: how to choose | local LLM vs cloud API | `platform-engineering` | Service: Local LLMs |
| 2 | What a local LLM costs to run | local LLM cost | `platform-engineering` | Service: Local LLMs |
| 3 | What LLMs can safely do in a hospital today | LLM in hospital | `ai-engineering` | Healthcare work |
| 4 | Air-gapped AI: what works without internet | air-gapped AI | `platform-engineering` | Service: On-premises and air-gapped AI |
| 5 | Open or commercial LLM: which fits your task? | open source LLM vs commercial | `ai-engineering` | Service: LLM applications |
| 6 | AI agents: where a person must stay in control | human in the loop AI agents | `ai-engineering` | Service: Agents and workflow automation |
| 7 | How to test an LLM before you trust it | LLM evaluation | `data-science` | Service: Model evaluation |
| 8 | How to check if an AI idea is feasible | AI feasibility study | `data-science` | Advice: Feasibility studies |
| 9 | MLOps explained for the people who pay for it | what is MLOps | `platform-engineering` | Service: MLOps and AI platforms |

## For researchers and engineers

Use `audience: research`.

| # | Working title | Search phrase | Topic | Based on |
|---|---|---|---|---|
| 10 | How to size a server for a local LLM | LLM server sizing | `platform-engineering` | Service: Local LLMs |
| 11 | LLM-as-a-judge: grading answers at scale | LLM as a judge | `data-science` | A portfolio project, and Service: Model evaluation |
| 12 | De-identifying clinical text: rules, models, or LLMs? | clinical de-identification | `ai-engineering` | The papers on de-identification |
| 13 | Extracting facts from clinical notes with an LLM | clinical information extraction | `ai-engineering` | Service: Language and vision models |
| 14 | RAG on FHIR: search over patient records | RAG FHIR | `ai-engineering` | A portfolio project |
| 15 | Tracking model versions so results can be repeated | model versioning | `platform-engineering` | Service: MLOps and AI platforms |
| 16 | Multi-criteria decision support: a short worked example | multi-criteria decision analysis | `data-science` | Service: Multi-criteria decision support |

## From our own work

| # | Idea | Why it is easy to write |
|---|---|---|
| 17 | "Our paper in plain words": one post per paper | The facts are already published. The research page lists the papers |
| 18 | How ModelPark or MinaMed solves one concrete problem | Our own products. No client approval is needed |

## A good start

1. **Post 1.** It matches the main search terms of the home page.
2. **Post 3.** Healthcare is our strongest field.
3. **Post 17.** It is the fastest to write, and nothing in it needs approval.

## Check before you pick one

- **Posts 11 and 14 come from client projects.** They need the client's yes, or they must stay general.
- **Posts 2 and 10 need real numbers.** They only work with costs and sizes from our own projects.
- **Nobody has checked the search phrases.** They are guesses at what people type. Confirm them with a keyword tool.
- **All working titles fit the limit** of 60 characters. A new title must fit too.

## Abbreviations

| Short | Long | Meaning |
|---|---|---|
| LLM | Large language model | A model that reads and writes text |
| MLOps | Machine learning operations | The work of running models in a repeatable way |
| RAG | Retrieval-augmented generation | The model first looks up documents, then answers |
| FHIR | Fast Healthcare Interoperability Resources | A standard format for health records |
