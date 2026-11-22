---
title: "Local LLM or cloud API: how to choose"
description: Local LLM or cloud API? Start from the data, not from the model. Four questions, with examples from healthcare, help you choose for each task.
date: 2026-11-22
audience: leaders
topic: platform-engineering
author: yDataLabs
draft: true
---

Choose for each task, not once for the whole organisation. A cloud API is the right start for public text and for a first test. A local LLM is the right choice when patient data goes into the model every day. A hospital that takes AI seriously ends up with both.

Three terms first. An LLM (large language model) is a model that reads and writes text. A cloud API is a way to send your text over the internet to a model that a provider runs. A local LLM runs on servers that you control, in your own building or your own data centre.

Four questions decide the choice. Ask them in this order.

## 1. What goes into the prompt?

The prompt is the text you send to the model. If a patient can be recognised in it, the rules change.

In the European Union, the privacy law is the General Data Protection Regulation (GDPR). It puts health data in a special group. Using it is forbidden unless an exception applies. The exceptions are listed in [Article 9](https://gdpr-info.eu/art-9-gdpr/).

The law does not forbid the cloud. It asks you to know where the data goes and who can read it. The large providers have answers. Microsoft, for example, [states](https://learn.microsoft.com/en-us/azure/ai-foundry/responsible-ai/openai/data-privacy) that prompts are not used to train the models, and that they are processed inside a geographic area that you choose. Be careful with that second promise. Some of its setups process data across the whole European Union, or worldwide, so the setup you buy matters. Your privacy officer must check the contract itself, because a web page is not a contract.

So a cloud API can be legal for patient data. We still advise against it for daily work. A contract limits what the provider may do with your data. With a local model, the provider never receives the data at all.

Here is how we would sort five common tasks.

| Task | Patient data in the prompt? | Our choice |
|---|---|---|
| Draft a discharge letter from the patient record | Yes, in every prompt | Local |
| Remove names and birth dates from notes before research | Yes, that is the whole task | Local |
| Sort incoming referrals by urgency | Yes | Local |
| Answer staff questions about public treatment guidelines | No | Cloud |
| Rewrite a patient leaflet in simpler words | No | Cloud |

The second row has no real alternative. The notes are sent for cleaning because they may not leave the building in their raw form.

## 2. How hard is the task?

The largest models run in the cloud. For open questions that need broad knowledge, they are usually ahead of what you can run yourself.

Most hospital tasks are not open questions. Pull the medication list out of a letter. Find the tumour stage in a pathology report. Summarise one visit. These are narrow tasks, and a smaller open model handles a narrow task well.

### A model that knows medicine

A general model learned its language from the open internet. A clinical note is written in another way, full of short forms and half sentences. Oncology adds a vocabulary of its own: tumour stages, treatment lines, drug combinations known only by their initials.

A medical LLM is a model that was trained further on medical text. Some are trained for one field only.

Two public examples show what exists. Google released [MedGemma](https://research.google/blog/medgemma-our-most-capable-open-models-for-health-ai-development), a family of open medical models that run on a single graphics card (GPU). Memorial Sloan Kettering Cancer Center trained an open oncology model, [Woollie](https://www.nature.com/articles/s41746-025-01780-2), on its own cancer records. Woollie read about 39,000 radiology notes of 4,000 patients and judged whether the cancer was progressing. On a score where 0.5 is a guess and 1 is perfect, it reached 0.97.

That study holds a second number. At another hospital, the University of California, San Francisco, the same model scored 0.88. A likely reason is that every hospital writes its notes in its own way. Try a medical model on your own notes before you trust the number on its label.

For the choice between local and cloud, medical models point to local. Both models above are open, so you can run them on your own servers. If you train one further on your own records, that training is work with patient data from start to finish.

We have used healthcare-specific models in our own projects, for example to build timelines of oncology patients. Those projects are on our [portfolio page](/portfolio).

### What a fixed workflow adds

A 2026 [technical report](https://arxiv.org/abs/2607.22555) from John Snow Labs, which our founder co-wrote, measured what happens when the work is cut into clear steps. A small medical model worked through 915 diagnosis cases. On its own, it found the right diagnosis in 24% of them. Inside a workflow of five fixed steps, the same model reached 60%. That was about 9 points more than two large cloud models on the same cases, and 35 to 45% cheaper for each case.

One benchmark does not settle every task. It does show that a well-designed process can count for more than the size of the model. More of this work is on our [research page](/research).

## 3. How much will you use it?

A cloud API sends a bill for every use. A local model costs money before it gives its first answer: servers with GPUs, and people who keep them running. After that, one more answer costs almost nothing.

Low or uneven use favours the cloud. Think of a tool that a few specialists open twice a week. High and steady use favours local. A model that reads every referral that comes in, all day, is steady use.

Where the two lines cross depends on your volume and on the model you need. A [2025 study](https://arxiv.org/abs/2509.18101) gives a method to compare the cost of local models with commercial services. Fill in your own numbers before you order hardware.

The people are the part that budgets forget. A [local LLM](/#solutions) needs updates, monitoring, and someone to call when it is slow. If you have no team for that and no partner, wait with local.

## 4. Who decides when the model changes?

Cloud providers retire models. OpenAI keeps a public [list of retirement dates](https://developers.openai.com/api/docs/deprecations). When your model is retired, you move to a newer one, and the newer one does not give the same answers.

In a hospital, that is more than a technical detail. Suppose you tested a model on five hundred of your own letters and a medical lead signed off on the result. A different model is a different product. The test has to be done again.

With a local model, you keep the exact version for as long as you want. You change it when you have had time to test the next one.

## How to start

1. Write down the tasks you want a model for. One line for each.
2. Answer the four questions for every task.
3. Try the most promising task on a cloud API, with invented or public text. You learn fast whether the idea works at all.
4. Move a task to a local model once it has proven its worth and needs real patient data.

Do not build a local platform first and look for tasks later. The tasks tell you how large the platform must be.
