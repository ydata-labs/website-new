---
title: AI in the Clinic, 2026: What Works, What Doesn’t
description: AI is already in many clinics, but the proof that it helps patients is still thin. What the evidence shows, which tools are in use, and how to adopt AI safely.
date: 2026-11-16
audience: leaders
topic: ai-engineering
author: Dr. Veysel Kocaman
draft: false
---

AI is already in many clinics, but the proof that it helps patients is still thin. I recently gave a talk to physicians on this gap. This post is the full talk in writing: what the evidence shows, which tools are in use today, how to adopt AI safely, and what research is coming next.

## The short version

If you remember only three things, make them these.

1. **The models are impressive, and uneven.** On hard written case challenges, a leading model named the right diagnosis first 60% of the time, against 24% for physicians. Yet the same models fail in simple ways and rarely say “I don’t know”.
2. **Real-world proof is still thin.** Fewer than 5% of FDA-cleared AI devices have had rigorous peer-reviewed evaluation. The evidence is strong for narrow imaging tasks, and early almost everywhere else.
3. **Success depends on data, workflow and people.** Pick the right problem, validate on your own patients, keep a human in charge, and keep measuring. The model is the easy part.

## Where clinical AI stands in 2026

Adoption has raced ahead of the evidence. In 2026, 81% of US physicians say they use AI at work, double the 2023 rate. The FDA has authorised more than 1,400 AI-enabled devices. In an industry survey, 56% of providers and payers said they actively use AI, up from 43% a year earlier.

The evidence has not kept up. Fewer than 5% of FDA-cleared AI devices have had rigorous peer-reviewed evaluation. In a review of 519 studies of language models in medicine, only 5% used real patient data. Only about 1% checked whether a model knows when it is unsure. The ARISE authors put it in one line: clinical AI is widely deployed but poorly evaluated.

### Six areas of research

The ARISE network, a group of physician researchers from Stanford and Harvard, reviewed the most important clinical AI studies of the past year. They grouped them into six areas. A BMJ Digital Health review summarises the same work.

| Area | Key question | What the evidence says |
| --- | --- | --- |
| Model performance | How capable are models? | They beat doctors on hard written cases, yet update poorly when new facts arrive. |
| Benchmarks and evaluation | Do we measure what matters? | Most studies use exam questions. Scores drop in real conversation. |
| Foundational methods | How are systems built? | Tools, teams of agents and retrieval help. Better parts can still make a worse system. |
| AI in clinical workflows | How do clinicians and AI team up? | Processes improve in real clinics. Automation bias and deskilling are real. |
| Patient-facing AI | What if AI talks to patients? | It can match human coaches, but patients cannot spot bad advice. |
| Applied AI and demos | Where is AI already deployed? | Imaging leads. ECG and risk tools are moving into real care. |

It also helps to sort clinical AI by task. Documentation tools are used the most and carry the least risk, as long as a person reviews them. Diagnosis tools carry high risk and have strong evidence only in imaging. Treatment and prognosis tools are still early. Operations tools, such as triage and message routing, are common but mostly backed by local reports. So the useful question is never “does AI work?” It is: which task, for which patients, with what evidence?

## What the models can do, and where they break

### On paper, they out-diagnose doctors

On the famously hard NEJM case challenges, a reasoning model (o3) named the right diagnosis first 60% of the time. It had the answer in its top ten 84% of the time and chose the right next test 98% of the time. Physicians with internet search scored 24% and 45%. On a benchmark of 5,000 realistic health conversations, scores rose from 16% for GPT-3.5 to 60% for o3 in about two and a half years.

The caveat matters. These are written puzzle cases, not real patients. In some studies, doctors were also tested without the tools they would normally use.

### But the intelligence is jagged

The same models are superhuman on one task and careless on the next.

- **Pattern matching.** When the right exam answer was replaced by “none of the other answers”, one model fell from 81% to 43%. Every model tested dropped, by 9 to 38 points.
- **No sense of “I don’t know”.** In one test, 0% of models recognised questions that had no correct answer. They answered confidently anyway.
- **Weak at updating.** When new facts arrive mid-case, the best models reason about as well as medical students, below residents.
- **Harm by omission.** On real specialist consult questions, up to 22% of answers could cause severe harm. 77% of those harms were things the model left out, such as a key test.

So trust a tool for a specific, tested task, never in general.

### The gains now come from the system around the model

A newer finding is that the gains come from how the model is used, not only from bigger models.

- **Using tools.** An agent that picks and runs the right clinical calculator, out of more than 2,000, got the risk score right 87.7% of the time. The model on its own managed 40.9%.
- **A team of AI agents.** Microsoft’s MAI-DxO acts like a virtual panel of doctors. It reached about 80% on hard NEJM cases, against 20% for physicians. The physicians worked alone, without books or colleagues, and the study is still a preprint.
- **Best parts, worse whole.** A system built from the best-scoring part for each step diagnosed 68% correctly. A simpler mix scored 77%.
- **Retrieval beats retraining.** Models fine-tuned on new facts memorised them, but applied only 12 to 30% of them to new questions. Looking up sources at answer time works better.

The lesson: judge the whole system in your workflow, not the model’s name.

### Most of the evidence sits on the lowest rungs

Think of evidence as a ladder with four rungs. Exam questions are at the bottom, then simulated cases, then retrospective tests on real records. Prospective trials in live care are at the top.

Most AI studies sit low on this ladder. Of 519 studies of language models, 45% used licensing exam questions and only 5% used real patient data. 95% measured accuracy, 16% fairness or bias, 5% real-world use, and about 1% uncertainty. When a vendor shows you an accuracy number, ask which rung it comes from. As ARISE says, benchmark success is not clinical readiness.

## Where AI already helps, and where it can hurt

### Narrow tasks with clear endpoints have the strongest evidence

| Use | Setting | Result |
| --- | --- | --- |
| Breast screening | 463,094 women, 12 sites in Germany | 17.6% more cancers found, no rise in recalls |
| Stroke imaging | 26 NHS hospitals | Thrombectomy rate doubled, 2.3% to 4.6%; transfers 64 minutes faster |
| Eye screening | Randomised trial, 668 patients | Correct diagnoses 75% to 92%, better follow-up |
| AI-ECG in the emergency department | 8,493 visits, 18 hospitals | Ruled out heart attack with a negative predictive value of 99.1% |

The pattern is the same each time: one narrow task, a human still in charge, and outcomes measured in real care.

### Language models in real clinics: promising, with fine print

The largest real-world study so far comes from Penda Health in Kenya. Across 39,849 visits in 15 primary care clinics, an AI safety net checked each visit in the background. Physician reviewers found 16% fewer diagnostic errors and 13% fewer treatment errors. Patient-reported outcomes did not clearly change, and the study is a preprint.

Other results point the same way. AI routing of patient portal messages cut the median time to resolve a message from 26.7 hours to 4.2 hours. In a randomised trial, AI prescreening of records roughly doubled enrolment in a heart failure trial (2% vs 1%). But AI-written discharge summaries, rated as good as physicians’, had more errors: 2.9 against 1.8 per summary.

### Doctor plus AI beats doctor alone, but not AI alone

In a randomised trial, 70 physicians solved diagnostic cases. With usual resources they scored 75%. With AI as a second opinion, 82%. With AI giving its view first, 85%. The AI alone scored 87%, and the teams were not significantly better than the AI by itself.

Humans and AI make different mistakes, though. In a trauma triage study across eight French hospitals, the AI missed 20 critical cases and clinicians missed 21, but not the same patients. That is the real case for a cross-check. Across 52 studies, true teamwork, where the pair beats both alone, was rare. How clinicians use AI matters as much as what the model can do.

### Six risks every clinician should be able to name

| Risk | What the evidence shows | Guardrail |
| --- | --- | --- |
| Omission | 77% of severe AI errors were things left out | Ask what is missing |
| Invention | Image models described features that were not there | Every claim links to a source |
| Automation bias | Flawed advice cut trained physicians’ accuracy from 85% to 73% | Training; show uncertainty |
| Deskilling | Adenoma detection fell after routine AI use | Keep skills in use; monitor people |
| Bias | 95% of FDA AI device summaries gave no demographic data | Check results by subgroup |
| Privacy | Patient data typed into public chatbots leaves your control | Approved tools only |

### AI that talks to patients: helpful, persuasive, hard to judge

There is real promise here. In a randomised trial of 368 adults, an AI-led diabetes prevention programme matched human coaches over 12 months (31.7% vs 31.9%). Plain-language versions of clinical notes improved understanding, most of all for older, Black and Hispanic patients.

Now the catch. In a study of 300 people, patients rated low-accuracy AI advice as trustworthy as a doctor’s, and were just as likely to follow it. Patients cannot be the safety check. Patient-facing AI should be judged by patient outcomes, not by how much people like it.

### Where the money is going

An NVIDIA survey of more than 600 people across health care and life sciences shows where organisations invest. Among providers and payers, the top uses are admin and workflow (52%), clinical documentation (40%) and decision support (39%). For large organisations, the main barriers are data privacy and location (39%), regulation and ethics (37%), and a lack of AI experts (33%). 85% plan to raise AI budgets in 2026. Read it with care: it is a vendor survey from the vendor’s own mailing lists, and the numbers are self-reported.

## The AI tools clinicians use today

AI tools now cover most of the working day. Before the visit, they summarise charts, triage referrals and run smart intake forms. During the visit, ambient scribes listen and draft the note. After the visit, they draft portal replies, letters, discharge summaries, codes and translations. All day, other tools flag findings on images and ECGs and warn of deterioration. And on demand, clinicians look things up with evidence assistants and general AI assistants.

Names you may meet include Epic AI Charting, Microsoft Dragon Copilot, Abridge, Ambience, Nabla, Heidi, OpenEvidence, UpToDate Expert AI, ChatGPT for Healthcare, Claude for Healthcare, Brainomix, Viz.ai and Aidoc. I name them only so you can recognise them, not to endorse them.

**Physicians use AI most to summarise research; help with diagnosis comes last**

| Use | Share of US physicians using AI for each task, 2026 |
| --- | --- |
| Summarising research and guidelines | 39% |
| Discharge, care plans, progress notes | 30% |
| Visit notes and billing codes | 28% |
| Chart summaries | 28% |
| Patient portal reply drafts | 19% |
| Translation | 18% |
| Help with diagnosis | 17% |

*AMA physician survey on AI, March 2026 · nearly 1,700 US physicians · selected uses*

The real use today is mostly reading and writing, not diagnosis. Physicians are not naive about it either: 88% say safety and efficacy validation is critical, and 88% have some concern about losing their own skills.

### Ambient scribes: big gains in how work feels, small gains in minutes

Scribes are the fastest-spreading clinical AI. In one study of 272 physicians over 30 days, burnout fell from 52% to 39%, and attention on the patient rose. But in randomised trials the time saved was only about 20 seconds per note. One large health system reported 14 minutes a day less on notes, and physicians did not see more patients.

Why do people stop using them? Too much editing, personal cost, set-up time, privacy worries and no EHR integration. About a quarter said their notes were already fine. There is also a hidden cost: in one survey, 62% of clinicians spent at least 30 minutes a day reviewing or fixing AI output.

### Evidence assistants: fast, popular, not yet proven

A JAMA study in October 2026 gives the first big picture, using data from OpenEvidence. Monthly active clinicians grew from 355 in January 2024 to 703,265 in June 2026, with 271 million questions in total. 51.9% of physicians said they use it for clinical decisions, and about 70% of surgeons’ questions were outside their specialty. The company supplied the data, and three co-authors work there.

These tools are a smarter literature search that shows its papers. But accuracy has not been measured at scale, and cited papers may not say what the answer says. Advertising is arriving inside them. Open the paper, treat the answer as a pointer, and never enter identifiable patient details into a public tool.

### The easiest AI to adopt is already in your EHR

In February 2026, Epic reported that 85% of its customers were live with at least one generative AI feature. Its patient summaries run about 16 million times a month, and it launched built-in ambient charting. These figures are vendor-reported. Academic centres are building their own “chat with the chart” tools too, one of them fully on-premises with sources you can check in the record. But built in does not mean validated for your patients, and switched on by default does not mean your patients have agreed.

### General AI assistants: same name, very different rules

| Version | Who buys it | Data protection | Rule |
| --- | --- | --- | --- |
| Consumer app | You, on a free or personal plan | No health data agreement; data may be kept or used for training | No patient data, ever |
| Healthcare edition | Your organisation | Signed data agreement, no training on your data, audit logs | Use within local policy |
| Open model, run locally | Your hospital IT | Data never leaves the building | A starting point; needs validation |

And remember the other side of the desk. About 230 million people a week ask ChatGPT health questions, and since January 2026, US patients can connect their medical records to it. Your patients arrive with AI answers. Ask about them.

## Choosing a tool for your own practice

Start from your pain, not from the product.

| If your pain is… | Look at… |
| --- | --- |
| Charting at night | An ambient scribe, set up with your own templates |
| An overflowing inbox | Message routing and reply drafts |
| Long, complex charts | Chart summaries that link back to the source |
| Quick evidence checks | An evidence assistant that cites papers |
| Patient understanding | Plain-language letters and translation, always reviewed |
| A research idea | AI data analysis or a quick vibe-coded prototype |

Then test it yourself with a two-week self-test:

1. Pick 20 typical cases. Use test or de-identified data unless the tool is approved for patient data.
2. Do each case your usual way, then with the tool.
3. Count errors, omissions, edits and minutes.
4. Keep the tool only if it is better on your own numbers, not on the brochure’s.

### Vibe coding: describe the tool you need, and AI writes it

Vibe coding means building software by describing what you want in plain language. There are three ways in. You can ask a chat assistant for code and paste it into a simple editor. You can use an app builder such as Lovable or Replit, which hosts the app for you. Or you can use a coding agent such as Claude Code or Cursor, which builds and tests a whole project.

A group of eye specialists described real examples in April 2026. One built a calculator for eye injection intervals. Another built an eye-drop schedule after cataract surgery that went from a hackathon to a hospital pilot. In an afternoon, you could build a clickable mock-up to show IT what you need, a patient leaflet page, or a study dashboard on test data. The best use is not to replace engineers. It is to make your idea clear to them with a working prototype.

### Quick hypothesis testing, without fooling yourself

AI also lets you test a clinical hunch in days.

1. Write down the question and the analysis plan before you touch any data.
2. Pick safe data: a public dataset, synthetic data, or an approved de-identified extract.
3. Let the AI write the analysis code, and ask for code you can read, not just a number.
4. Check it: the variables, the patient counts, missing data, and the right test.
5. If there is a signal, run a real study with a statistician, a protocol and ethics approval.

There is a trap. AI makes it effortless to run fifty analyses and report the one that “worked”. That is p-hacking at machine speed. A fast first answer is a reason to study, not a result to publish.

### Vibe coding safely: three tiers

The closer a tool gets to patients, the more checking it needs.

| Tier | Who uses it | What it needs |
| --- | --- | --- |
| 1. Personal | Only you | Test it yourself; write down what it does and does not do |
| 2. Team admin | Your colleagues | Peer review by someone else; tell IT it exists |
| 3. Clinical | Touches patients or decisions | Formal validation, professional developers, possibly approval as a medical device |

Some rules apply at every tier. No real patient data goes into cloud tools without approval. Keep versions, and save the prompts you used. AI-written code can hide security holes, so get it reviewed. And when a prototype proves its value, hand it over to be built properly.

## Why AI stumbles at the bedside

Benchmarks test the model. Clinics test the model, the data, the workflow and the people together. Four reasons explain most of the gap.

| Reason | Example |
| --- | --- |
| Different patients | An ECG model scored an AUROC of about 85 at its home hospital and 78 to 80 at three other hospitals. |
| Messy inputs | GPT-4 got 82% of cases right as tidy vignettes, but 63% as a back-and-forth conversation. |
| Knowing is not doing | An AI agent answered questions about a record 85% of the time, but completed actions in it only 54% of the time. |
| Incomplete records | About 40% of important diagnoses appear only in free-text notes, not in coded fields. |

### Most of the patient’s story is not coded

The record is like an iceberg. Above the waterline is the coded chart: problem lists, medications, labs and billing codes. That is what most AI tools and risk scores read. Below the line are progress notes, discharge summaries, pathology and imaging reports, scanned letters and other hospitals’ records.

The studies are striking. Language models found adverse social needs in 93.8% of patients from notes, while codes captured 2.0%. Family history was in 58.7% of admission notes but only 5.2% of structured records. Medication lists had 4.9 discrepancies per patient on average. This is not poor coding. Codes were built for billing, and clinical reality is written in words.

### More of the chart is not better input

The obvious fix is to give the AI the whole chart. Unfortunately, more is not better. A long history is mostly copied-forward text, so the one decisive sentence competes with thousands of others. Every irrelevant page is also a chance to report a diagnosis that was never made. In our own registry tests, adding irrelevant pages cut precision by about 15 points.

Citations do not solve this on their own. In one study, 50 to 90% of AI answers were not fully supported by the sources they cited. AI does not fix data problems. It amplifies them.

## Adopting AI, end to end, in seven steps

Only one of these seven steps is about the algorithm. The rest is clinical and organisational work you already know how to do.

1. **Pick the problem.** A real bottleneck, not a shiny tool.
2. **Check the data.** Is the answer in codes, in text, or nowhere?
3. **Appraise the tool.** Like a new drug: evidence, population, outcomes, safety, cost.
4. **Validate locally.** On your own patients, silently, before anyone acts on it.
5. **Design the workflow.** Who sees the output, who acts, and how fast?
6. **Govern, get consent, train.** Rules in place, patients told, staff ready.
7. **Monitor and retire.** Track drift, report events, and decide in advance when to stop.

### Step 1: Start with the workflow, not the tool

In one clinic, patients were never in the room on time. It looked like a staffing problem. Mapping the arrival journey showed that reminders said 9:00 while staff meant 8:45, and one queue served both arrivals and departures. The fix was a corrected reminder, a check-in kiosk and a second queue. No new hire, no software, no AI.

If AI is the answer, a good first use case is frequent, painful, safe to get wrong because a person checks it, measurable before and after, and based on data that already exists. Match the risk of the task to the strength of the evidence:

**Start where the risk is low and the evidence is strong**

| Risk if the output is wrong | Weaker evidence in real clinics | Stronger evidence in real clinics |
| --- | --- | --- |
| Higher | **Wait, or research only.** Autonomous diagnosis or treatment. Unsupervised advice to patients | **Adopt with local validation.** Imaging as a second reader. AI-ECG rule-out, deterioration alerts |
| Lower | **Pilot and measure.** Inbox assistants, chart summaries. Evidence search, discharge drafts | **Start here.** Ambient scribe with review. Message routing, plain-language letters. Trial prescreening |

*Risk vs evidence · author’s judgement from ARISE 2026 and BMJ Digit Health 2026*

Most clinics should begin bottom right: low risk, real evidence, and a person always checks. The placement is my judgement from the evidence above; your context may move things.

### Step 2: Five questions about your data

- Where is the answer written: coded fields, free-text notes, scanned letters, images, or another hospital’s system?
- Does everyone use the same words, or do local codes need mapping to standards such as SNOMED CT and LOINC?
- Does the data look like your patients in age, sex, ethnicity, language, severity and setting?
- May it leave the building, given consent, legal basis and where it is processed?
- Can you build a local test set of a few hundred cases, labelled by your own clinicians?

### Step 3: Appraise AI like a new drug

Use five lenses: evidence (peer-reviewed, prospective, who paid?), population (patients like yours?), outcomes (better care, or only accuracy?), safety (how does it fail, does it show sources?) and cost (licence, set-up, staff time, and how easy it is to leave). Clearance is not proof. In a review of 691 cleared AI devices, under 1% of public summaries reported patient outcomes, 95% gave no demographic data, and 91% had no bias assessment. And there is no free tool: if it is free, your patients’ data is the price.

### Step 4: Validate on your patients, silently first

Measure current practice first. Set pass marks before you see results. Run the tool in silent mode, on live data, with nobody seeing the output. Check subgroups: age, sex, ethnicity, language, ward and site. Then go, change or stop.

Unity Health Toronto shows how. Before its deterioration model went live, the team collected more than 3,000 clinician predictions as a baseline and ran the model silently for about nine months. Now it checks every inpatient hourly and pages a team that must respond within an hour. Over five years, unexpected deaths fell by about 26%.

### Step 5: Design the workflow around the human

An accurate tool in the wrong place still fails. Put the output inside the record, give it a named owner, link every claim to its source, and make it easy to disagree. Watch for alert fatigue. A widely used sepsis model, tested independently in 2021, missed 67% of sepsis cases, and 88% of its alerts were for patients without sepsis. Later versions improved, but the lesson stands: workflow design matters as much as model quality.

### Step 6: Govern, protect, get consent, train

**Governance.** In September 2025, the Joint Commission and the Coalition for Health AI named seven elements: a governance group, privacy and transparency, data security, quality monitoring, safety event reporting, risk and bias checks, and education. Add an AI inventory: every tool, its owner, purpose, version and last check. A small practice can do the same at small scale: one owner, one page of rules, one log.

**Regulation (not legal advice).** In the EU, AI that is part of a medical device counts as high-risk under the AI Act. After the 2026 AI Omnibus, those duties apply from 2 August 2028. The Medical Device Regulation and GDPR apply now, and staff who use AI have needed AI literacy since February 2025. In the US, the FDA has authorised more than 1,400 AI-enabled devices, most in radiology, while many scribes and chat tools are not regulated as devices. Not regulated does not mean safe. It means the checking is up to you.

**Privacy.** Never paste identifiable patient data into a public chatbot. Use tools that run inside your network or come with a signed data agreement. Ask where audio and text are stored, for how long, and whether your data trains the vendor’s models. De-identify for research, and measure how well it worked: in one benchmark, a specialised model reached an F1 score of 96% against 79% for GPT-4o.

**Consent.** Telling patients is not the same as informed consent. In one study, 81.6% of patients were comfortable when simply told an AI scribe was in use. After one more minute about data storage and the companies involved, that fell to 55.3%. Real consent includes notice before the visit, consent for this tool and purpose, a clear way to say no, where data goes, when audio is deleted, and a copy of what was written.

**Accountability.** The software assists; the responsibility stays with you. Read before you sign, record your reasoning on key decisions, use approved tools within their intended use, know your regulator’s and insurer’s guidance, and report AI errors like any incident. In the 2026 AMA survey, clear liability rules were physicians’ top regulatory request.

**Training.** Train for how AI fails, not just for which buttons to press. After a 20-hour AI literacy course, physicians’ diagnostic accuracy rose from 43% to 71% with AI. Yet trained physicians still dropped from 85% to 73% when the AI advice was flawed. Before you trust an output, ask: is it finding evidence or making a decision, is the source named, what is missing, what happens if it is wrong, and would I have reached this myself?

### Step 7: Monitor, and know when to retire a tool

Go-live is the start of the evidence, not the end. Watch performance against your baseline, fairness across groups, override and edit rates, safety events, and drift from new templates, assays, patients or model versions. Decide in advance when you would switch it off. Monitor people too: in one observational study, adenoma detection in colonoscopies done without AI fell from 28.4% to 22.4% after AI was introduced.

### Count the real costs, then run one small pilot

The costs people forget are set-up, training, monitoring and supervision. When someone reports “time saved”, ask whether it includes the time spent checking the AI. Measure benefits you can see in the system logs: time, quality and safety, staff and patient experience, and equity.

Then start small. Pick one pain point, one tool and one owner. Name the metric before you start, such as no charting after 7 pm. Give it three to six months, then an honest verdict. If it helped, scale it through governance. If it did not, stop it. A failed pilot is still a useful result.

## An applied view: lessons from building AI on real patient records

This section describes my own company’s work, so read it as you would any vendor’s claims. Our platform, Patient Journey Intelligence (PJI), is used for the secondary use of clinical data: research, registries, quality work and trials. It is deployed at many sites and runs inside each hospital’s own infrastructure. It brings in notes, PDFs, EHR data and FHIR feeds, de-identifies them, extracts facts from free text with a source and a confidence, and builds one timeline per patient on the open OMOP data model.

Three design rules came out of that work, and they apply to any clinical AI:

1. **Read the text, not just the codes.** As shown above, codes miss much of the story.
2. **Cut the noise before the model reasons.** We rank documents first. In one registry test, 984 documents became 120. Recall stayed at 100%, and precision rose from 60% to 75%. Less input gave a better answer.
3. **Every value has a source and a reviewer.** Click a value, and the source note opens with the supporting sentence highlighted. A person approves the value before it counts.

The results support specialised, grounded models, when you measure them. On AJCC cancer staging from pathology reports, a domain-tuned oncology model reached 90.73% against 76.36% for the best general model before it (Scientific Reports, 2025). On 56 registry fields and 269 unseen documents, we measured 87.7% strict accuracy. In one deployment, registrar time per case fell from about two hours to about two minutes, with a person still reviewing.

These are our own benchmarks. Ask every vendor, including us, for results on your own data, judged by your own clinicians. The deeper lesson is that the clinical value is rarely one clever model. It is a complete, sourced record that registries, care-gap checks, trial prescreening, cohorts and quality measures can all share.

## On the horizon: research not yet in clinics

Six research frontiers are worth watching. None of them is routine care yet. I label each by maturity: lab (research data only), pilot (real patients, supervised or silent), or trial (a prospective clinical trial).

| Frontier | Example | Maturity |
| --- | --- | --- |
| AI that takes the history | An AI interviewed real patients before their visit | Pilot |
| Agents that know your cases | Tumour board advice grounded in past local decisions | Pilot |
| Forecasting the future | Risk of more than 1,000 diseases, up to 20 years ahead | Lab |
| New signals from cheap tests | Hidden heart disease found in a routine ECG | Trial |
| Physical AI | Autonomous surgical steps; speech from brain signals | Lab |
| AI as a research partner | An AI-designed drug in a phase 2 trial | Trial |

### An AI that takes the history

In October 2026, The Lancet published the first test of Google’s AMIE with real patients, at a Beth Israel Deaconess primary care clinic. Patients chatted with the AI by text before the visit while a physician watched live. 98 patients completed both steps. There were no safety stops and one noted hallucination. Clinicians called it a helpful way to prepare in 33 of 44 ratings. It was one clinic, with no control group and funding from the developer, so it shows feasibility, not better outcomes.

### Agents grounded in local knowledge

HemaGuide, from Heidelberg and published in Nature Medicine, is a tumour board agent for blood cancers. It reads physician reports and checks guidelines, the literature and more than 2,000 past tumour board cases, all on hospital servers. It agreed with experts about 82% of the time on 555 cases from another hospital, and about 83% during a month running silently beside doctors. A molecular assessment that took hours took under a minute. A trial of patient outcomes is next. The winning pattern is local cases and guidelines, visible sources, data kept inside, and a human who decides.

### A weather forecast for health

Delphi-2M reads a person’s history like a sentence and forecasts the risk of 1,258 diseases up to 20 years ahead. It learned from 400,000 people in UK Biobank and was tested on 1.9 million people in Denmark. Its average AUC was about 0.76 at home and 0.67 externally, and for diabetes a plain HbA1c test still did better. Epic has built a similar model on 115 billion medical events from 118 million patients. The promise is prevention planned for each person, years ahead.

### Seeing more in tests we already do

A Columbia model called EchoNext finds structural heart disease from a routine ECG. On 3,200 ECGs it found 77% of cases, against 64% for 13 cardiologists, and a trial is running in eight emergency departments. In a cluster randomised trial of 15,596 patients, ECG alerts doubled the detection of liver disease, from 0.5% to 1.0%. Another model predicts TP53 mutation from a standard H&E slide across 32 tumour types, to choose who needs gene testing. Every new flag creates downstream work, so plan the capacity.

### Physical AI

A surgical robot from Johns Hopkins, Stanford and Columbia performed the key step of a gallbladder removal on its own in 8 of 8 procedures on pig organs outside the body. It was slower than surgeons, and patient use is years away. A brain-computer interface from UCSF and Berkeley let a woman who could not speak for 18 years hear her own voice again, decoded from brain signals at 47.5 words a minute. It is one participant, but life-changing for her.

### AI as a research partner

Google’s AI co-scientist is a team of agents that propose, debate and rank research ideas. Its ideas held up in real labs, including repurposed drugs that slowed leukaemia cells and new liver fibrosis targets. Rentosertib, for lung fibrosis, is the first drug where AI found both the target and the molecule. In a phase 2a trial of 71 patients over 12 weeks, lung capacity rose by 98.4 mL on the highest dose and fell by 20.3 mL on placebo. Ideas are getting cheaper; testing them is the new bottleneck.

### The next breakthrough is evidence, not models

In June 2026, Nature Medicine published a cluster randomised trial from 16 primary care clinics in Kenya, with more than 9,600 patients. AI decision support produced better notes and treatment plans, lower antibiotic costs and no sign of harm. But treatment failure was 2.2% against 2.0%: no difference in patient outcome. Showing modest outcome gains may need trials of more than 100,000 patients. Of 8,532 registered AI trials, only 30.5% are randomised.

### What to expect, and what it asks of you

The ARISE authors predict that AI agents for urgent care will go mainstream, that over 90% of note text will be AI-written, and that scribes will take on orders, coding and follow-up. They also expect an AI “bot war” between insurers and providers, and the first malpractice case where AI is central to the error.

Our role shifts with it: from doing to supervising, from recall to verifying, explaining AI to patients, keeping core skills in deliberate use, and helping build the evidence.

## Twelve questions to ask before you sign

Get the answers in writing. A vague answer is an answer.

| Topic | Questions |
| --- | --- |
| Evidence | 1. Is there peer-reviewed, prospective evidence? 2. Was it tested on patients like ours? |
| Fit | 3. Which step of our workflow does it change? 4. Who acts on the output, and how fast? |
| Safety | 5. Does it show sources and uncertainty? 6. How do we report and fix errors? |
| Data | 7. Where is data stored, and when is it deleted? 8. Is our data used to train your models? |
| Money | 9. What is the total cost, including our review time? 10. Can we leave and take our data with us? |
| Over time | 11. What will you report to us every month? 12. What happens when the model is updated? |

## Three things to take with you

1. **The evidence is real, and uneven.** It is strong for narrow tasks like imaging and thin for broad reasoning in real clinics. The right response is neither hype nor dismissal, but calibrated engagement.
2. **The hard part is not the model.** It is the data, the workflow, local validation and monitoring. That is clinical work, which clinicians already know how to do.
3. **Clinicians are needed at the table.** Pick the problems, judge the evidence, protect patients’ rights, and keep your own skills sharp.

If AI is used in your setting, understanding it and being open about your own use of it is now part of the job. As the ARISE report reminds us, we shape our tools, and thereafter our tools shape us. Let us make sure we do the shaping.

## Sources

**Reviews and surveys**

- [ARISE Network, State of Clinical AI Report 2026](https://arise-ai.org) (Brodeur, Goh, Rodman, Chen et al., January 2026)
- [Worth et al., State of clinical AI in 2026, BMJ Digital Health & AI](https://doi.org/10.1136/bmjdh-2026-000113)
- [AMA physician survey on AI, March 2026](https://ama-assn.org/practice-management/digital-health/more-80-physicians-use-ai-professionally-ama-survey)
- [NVIDIA, State of AI in Healthcare and Life Sciences: 2026 Trends](https://www.nvidia.com/content/dam/en-zz/Solutions/lp/survey-report/healthcare-state-of-ai-report-2026-4559650-web.pdf)
- [FDA AI-enabled device count (MedTech Dive)](https://www.medtechdive.com/news/ai-medtech-track-new-devices-fda/748397/)

**Tools in use**

- [Epic AI Charting and adoption (Fierce Healthcare)](https://www.fiercehealthcare.com/ai-and-machine-learning/epic-rolls-out-ai-charting-and-more-built-automation-clinicians-and)
- [OpenEvidence usage study in JAMA (TechTarget)](https://www.techtarget.com/healthtechanalytics/news/366652436/AI-based-clinical-intelligence-is-all-the-rage-But-who-is-using-it)
- [Ambient scribes at six health systems (AHA)](https://www.aha.org/aha-center-health-innovation-market-scan/2026-04-14-6-health-systems-enhancing-care-delivery-ambient-ai-scribes)
- [OpenAI for Healthcare](https://openai.com/index/openai-for-healthcare/) and [ChatGPT Health](https://openai.com/index/introducing-chatgpt-health/)
- [Google MedGemma 1.5](https://research.google/blog/next-generation-medical-image-interpretation-with-medgemma-15-and-medical-speech-to-text-with-medasr/)
- [Vibe coding for clinicians (arXiv 2604.22604)](https://www.emergentmind.com/papers/2604.22604)

**Governance and regulation**

- [Joint Commission and CHAI guidance on responsible AI use](https://www.polsinelli.com/publications/tjc-chai-release-guidance-responsible-ai-use-healthcare)
- [EU AI Omnibus enters into force (White & Case)](https://www.whitecase.com/insight-alert/eu-ai-omnibus-enters-force-amending-ai-act)

**Research on the horizon**

- [AMIE with real primary care patients](https://www.iatrox.com/blog/google-amies-lancet-study-what-happened-when-ai-met-real-primary-care-patients)
- [HemaGuide tumour board agent (DKFZ)](https://www.dkfz.de/en/news/press-releases/detail/new-ai-system-provides-treatment-recommendations-for-complex-blood-cancers)
- [Delphi-2M disease forecasting (Scientific American)](https://www.scientificamerican.com/article/new-ai-tool-predicts-which-of-1-000-diseases-someone-may-develop-in-20-years/)
- [EchoNext ECG model (EurekAlert)](https://www.eurekalert.org/news-releases/1091097)
- [TP53 prediction from H&E slides (News-Medical)](https://www.news-medical.net/news/20260813/AI-model-predicts-cancer-subtype-genetic-mutations-and-survival-outcomes-across-32-solid-tumors.aspx)
- [Autonomous surgical robot SRT-H (ZME Science)](https://www.zmescience.com/science/news-science/ai-powered-surgical-robot-performed-a-full-operation-with-zero-help-from-humans)
- [Speech neuroprosthesis (NIH)](https://www.nih.gov/news-events/nih-research-matters/brain-computer-interface-restores-natural-speech-after-paralysis)
- [Google AI co-scientist](https://research.google/blog/accelerating-scientific-breakthroughs-with-an-ai-co-scientist/)
- [Rentosertib phase 2a (BioPharmaTrend)](https://www.biopharmatrend.com/post/1282-ai-designed-tnik-inhibitor-shows-lung-function-gains-in-ipf)
- [AI Consult randomised trial in Kenya (EurekAlert)](https://www.eurekalert.org/news-releases/1133583)
- [Analysis of 8,532 registered AI trials (arXiv)](https://arxiv.org/abs/2607.22607)

**Other studies cited:** Wong et al., JAMA Internal Medicine 2021 (sepsis model); JAMA Network Open, July 2025 (scribe consent); Black Book Market Research, December 2025 (AI supervision time); Unity Health Toronto deterioration model; [AJCC staging benchmark, Scientific Reports 2025](https://doi.org/10.1038/s41598-025-10709-4); Kocaman et al., ECIR Text2Story 2025 (de-identification).
