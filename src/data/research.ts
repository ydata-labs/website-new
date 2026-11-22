// Selected publications and talks of Dr. Veysel Kocaman.
// Every entry was checked on its own page on 2026-11-22. Add an entry only
// with a link you have opened. Keep publications sorted newest first.
// No value imports here: `pnpm test` runs this file with plain Node.

export interface Publication {
	title: string;
	venue: string;
	year: number;
	url: string;
}

export interface Talk {
	title: string;
	event: string;
	year: number;
	url?: string;
}

export const scholarUrl =
	"https://scholar.google.com/citations?user=rrDNhSEAAAAJ";

export const publications: Publication[] = [
	{
		title:
			"DeepLens Diagnosis Agent: Agentic Workflow Design Lets a Small Reasoning Model Compete with Frontier LLMs",
		venue: "arXiv technical report",
		year: 2026,
		url: "https://arxiv.org/abs/2607.22555",
	},
	{
		title:
			"A Multi-Domain Red Teaming Framework for Safety, Robustness, and Fairness Evaluation of Medical Large Language Models",
		venue: "Text2Story workshop at ECIR 2026",
		year: 2026,
		url: "https://arxiv.org/abs/2606.00027",
	},
	{
		title:
			"Clinical Large Language Model Evaluation by Expert Review (CLEVER): Framework Development and Validation",
		venue: "JMIR AI",
		year: 2025,
		url: "https://doi.org/10.2196/72153",
	},
	{
		title:
			"Can Zero-Shot Commercial APIs Deliver Regulatory-Grade Clinical Text DeIdentification?",
		venue: "Text2Story workshop at ECIR 2025",
		year: 2025,
		url: "https://arxiv.org/abs/2503.20794",
	},
	{
		title:
			"Beyond Negation Detection: Comprehensive Assertion Detection Models for Clinical NLP",
		venue: "Text2Story workshop at ECIR 2025",
		year: 2025,
		url: "https://arxiv.org/abs/2503.17425",
	},
	{
		title:
			"LangTest: A comprehensive evaluation library for custom LLM and NLP models",
		venue: "Software Impacts",
		year: 2024,
		url: "https://doi.org/10.1016/j.simpa.2024.100619",
	},
	{
		title:
			"Holistic Evaluation of Large Language Models: Assessing Robustness, Accuracy, and Toxicity for Real-World Applications",
		venue: "TrustNLP workshop at NAACL 2024",
		year: 2024,
		url: "https://aclanthology.org/2024.trustnlp-1.11/",
	},
	{
		title:
			"Beyond Accuracy: Automated De-Identification of Large Real-World Clinical Text Datasets",
		venue: "Machine Learning for Health (ML4H) symposium 2023",
		year: 2023,
		url: "https://arxiv.org/abs/2312.08495",
	},
	{
		title: "Automated De-Identification of Arabic Medical Records",
		venue: "ArabicNLP 2023",
		year: 2023,
		url: "https://aclanthology.org/2023.arabicnlp-1.4/",
	},
	{
		title:
			"Accurate Clinical and Biomedical Named Entity Recognition at Scale",
		venue: "Software Impacts",
		year: 2022,
		url: "https://doi.org/10.1016/j.simpa.2022.100373",
	},
	{
		title:
			"Preparing for the next pandemic via transfer learning from existing diseases with hierarchical multi-modal BERT: a study on COVID-19 outcome prediction",
		venue: "Scientific Reports",
		year: 2022,
		url: "https://doi.org/10.1038/s41598-022-13072-w",
	},
	{
		title: "Mining Adverse Drug Reactions from Unstructured Mediums at Scale",
		venue: "W3PHIAI workshop at AAAI 2022",
		year: 2022,
		url: "https://arxiv.org/abs/2201.01405",
	},
	{
		title: "Deeper Clinical Document Understanding Using Relation Extraction",
		venue: "SDU workshop at AAAI 2022",
		year: 2022,
		url: "https://arxiv.org/abs/2112.13259",
	},
	{
		title: "Spark NLP: Natural Language Understanding at Scale",
		venue: "Software Impacts",
		year: 2021,
		url: "https://arxiv.org/abs/2101.10848",
	},
	{
		title: "Biomedical Named Entity Recognition at Scale",
		venue: "CADL workshop at ICPR 2020",
		year: 2020,
		url: "https://arxiv.org/abs/2011.06315",
	},
];

export const talks: Talk[] = [
	{
		title:
			"Evaluating Large Language Models on Clinical & Biomedical NLP Benchmarks",
		event: "NLP Summit",
		year: 2023,
		url: "https://www.nlpsummit.org/evaluating-large-language-models-on-clinical-biomedical-nlp-benchmarks/",
	},
	{
		title:
			"Current State-of-the-Art Accuracy for Key Medical Natural Language Processing Benchmarks",
		event: "NLP Summit",
		year: 2022,
		url: "https://www.nlpsummit.org/current-state-of-the-art-accuracy-for-key-medical-natural-language-processing-benchmarks/",
	},
	{
		title: "Modular Approach to Solve Problems at Scale in Healthcare NLP",
		event: "NLP Summit",
		year: 2021,
		url: "https://www.nlpsummit.org/spark-nlp-for-healthcare-batteries-included/",
	},
	{
		title:
			"Connecting the Dots in Clinical Document Understanding and Information Extraction",
		event: "NLP Summit",
		year: 2021,
		url: "https://www.nlpsummit.org/connecting-the-dots-in-clinical-document-understanding-and-information-extraction/",
	},
	{
		title:
			"Apache Spark NLP for Healthcare: Lessons Learned Building Real-World Healthcare AI Systems",
		event: "Spark + AI Summit",
		year: 2020,
		url: "https://events.johnsnowlabs.com/apache-spark-nlp-for-healthcare-lessons-learned-building-real-world-healthcare-ai-systems",
	},
];
