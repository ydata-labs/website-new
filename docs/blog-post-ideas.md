# Ideas for blog posts

A list of possible posts. Written on 2026-11-22.

These are ideas only. No post exists yet. The facts, numbers, and examples of every post must come from the owner. Read [blog-writing-guide.md](blog-writing-guide.md) before you write one.

Every idea is based on something the site already names: a service, a product, or a paper.

When a post is published, remove its row from this file.

Already written: post 1, "Local LLM or cloud API: how to choose". It is `content/blog/local-llm-vs-cloud-api.md`.

## For leaders

Use `audience: leaders`.

| # | Working title | Search phrase | Topic | Based on |
|---|---|---|---|---|
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
| 12 | De-identifying notes: rules, models, or LLMs? | clinical de-identification | `ai-engineering` | The papers on de-identification |
| 13 | Extracting facts from clinical notes with an LLM | clinical information extraction | `ai-engineering` | Service: Language and vision models |
| 14 | RAG on FHIR: search over patient records | RAG FHIR | `ai-engineering` | A portfolio project |
| 15 | Model versions: how to repeat a result | model versioning | `platform-engineering` | Service: MLOps and AI platforms |
| 16 | Multi-criteria decisions: a worked example | multi-criteria decision analysis | `data-science` | Service: Multi-criteria decision support |

## From our own work

| # | Idea | Why it is easy to write |
|---|---|---|
| 17 | "Our paper in plain words": one post per paper | The facts are already published. The research page lists the papers |
| 18 | How ModelPark or MinaMed solves one concrete problem | Our own products. No client approval is needed |

## Search potential

Checked on 2026-11-22 with one web search per phrase. The check looked at who is on the first page of results.

The rule behind the rating: a small site cannot win a general question against IBM, Google, or Microsoft. It can win a narrow question that only papers or product manuals answer today.

**What the check does not show:** how many people search for a phrase. A keyword tool or Google Search Console gives that number.

### High

| # | Post | Who ranks today | Why we can win |
|---|---|---|---|
| 3 | What LLMs can safely do in a hospital today | Research papers only | No plain, practical answer exists. Healthcare is our field |
| 4 | Air-gapped AI: what works without internet | Almost only NVIDIA product manuals | No plain guide exists. The post matches a service we sell |
| 12 | De-identifying notes: rules, models, or LLMs? | Research papers only | We have our own papers on this subject |
| 14 | RAG on FHIR: search over patient records | One personal blog post and a few papers | Very narrow. Few pages compete |
| 2 | What a local LLM costs to run | One paper, small blogs, vendor reports | Buyers search this before they spend. Our own numbers would stand out |

### Medium

| # | Post | Who ranks today | How to raise the chance |
|---|---|---|---|
| 13 | Extracting facts from clinical notes with an LLM | Research papers | Write the practical version of what the papers say |
| 8 | How to check if an AI idea is feasible | Google and Microsoft guides, and small agencies | Small agencies rank here, so we can too. Add a healthcare example |
| 11 | LLM-as-a-judge: grading answers at scale | Microsoft, NVIDIA, Splunk | Narrow it to medical answers |
| 7 | How to test an LLM before you trust it | Thoughtworks, Microsoft | Narrow it to medical LLMs. Our paper on red teaming medical LLMs supports it |
| 17 | Our paper in plain words | The paper itself | Few searches, but easy to rank for the paper title. It builds trust |

### Low

| # | Post | Who ranks today |
|---|---|---|
| 5 | Open or commercial LLM: which fits your task? | Salesforce, Cloudera, Udemy, and many more |
| 6 | AI agents: where a person must stay in control | AWS, Atlassian, Zapier, Oracle, Auth0 |
| 9 | MLOps explained for the people who pay for it | IBM, Google, Lenovo, ServiceNow |
| 10 | How to size a server for a local LLM | Lenovo, VMware, DigitalOcean. Better as a part of post 2 |
| 15 | Model versions: how to repeat a result | Many tool vendors |
| 16 | Multi-criteria decisions: a worked example | Government guides. Few buyers search this |
| 18 | How ModelPark or MinaMed solves one concrete problem | Few people search for it. Better on the product sites |

A low rating is about search only. Such a post can still be useful to send to a client.

## A good order

1. **Post 3.** High potential, and our strongest field.
2. **Post 4.** High potential, and almost no competition.
3. **Post 12.** High potential, and our own papers back it.

## Check before you pick one

- **Posts 11 and 14 come from client projects.** They need the client's yes, or they must stay general.
- **Posts 2 and 10 need real numbers.** They only work with costs and sizes from our own projects.
- **All working titles fit the limit** of 48 characters. A new title must fit too.

## Abbreviations

| Short | Long | Meaning |
|---|---|---|
| LLM | Large language model | A model that reads and writes text |
| MLOps | Machine learning operations | The work of running models in a repeatable way |
| RAG | Retrieval-augmented generation | The model first looks up documents, then answers |
| FHIR | Fast Healthcare Interoperability Resources | A standard format for health records |
