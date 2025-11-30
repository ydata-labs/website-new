export interface Solution {
	id: string;
	title: string;
	description: string;
	icon: string;
}

export const capabilities: Solution[] = [
	{
		id: "generative-ai",
		title: "Generative AI & LLMs for Healthcare",
		description:
			"Harnessing the power of Large Language Models and Generative AI to revolutionize patient interaction, automate pharmacovigilance, and provide evidence-based clinical support.",
		icon: "sparkles",
	},
	{
		id: "clinical-data-science",
		title: "Clinical Data Science & Predictive Modeling",
		description:
			"Advanced predictive modeling and risk stratification using vast medical datasets (EHRs, claims, imaging). We forecast patient outcomes and anticipate future results with high accuracy.",
		icon: "chart-line",
	},
	{
		id: "nlp-clinical",
		title: "Advanced NLP for Clinical Insights",
		description:
			"Specialized Natural Language Processing to unlock critical information from unstructured clinical documents, including de-identification of patient notes and extraction of complex medical entities.",
		icon: "message-text",
	},
	{
		id: "medical-vision",
		title: "Medical Computer Vision",
		description:
			"Cutting-edge computer vision solutions for medical imaging analysis, including object detection, visual analysis for diagnostics, and AI-enhanced oncology data processing.",
		icon: "eye",
	},
	{
		id: "mlops-platform",
		title: "Clinical-Grade MLOps & AI Platforms",
		description:
			"Building robust, scalable, and compliant MLOps platforms for the secure deployment and management of medical AI models, ensuring clinical-grade reliability and regulatory adherence.",
		icon: "server",
	},
	{
		id: "ai-strategy",
		title: "Expert AI Strategy & Coaching",
		description:
			"Strategic guidance and mentorship from seasoned healthcare AI professionals. We help organizations define their AI roadmap, ensure successful implementation, and accelerate digital transformation.",
		icon: "users",
	},
	{
		id: "multi-criteria-decision",
		title: "Multi-Criteria Decision Making",
		description:
			"Advanced decision support systems that evaluate complex healthcare scenarios across multiple weighted criteria. Optimize resource allocation, treatment selection, and operational decisions with transparent, explainable AI.",
		icon: "scale",
	},
	{
		id: "multi-agent-simulation",
		title: "Multi-Agent Simulation",
		description:
			"Sophisticated agent-based modeling to simulate complex healthcare ecosystems, patient flows, and epidemic dynamics. Predict outcomes and test interventions in virtual environments before real-world implementation.",
		icon: "network",
	},
	{
		id: "agentic-workflows",
		title: "Agentic Workflows for Automation",
		description:
			"Design and deploy autonomous AI agents that orchestrate complex healthcare workflows. From clinical documentation to care coordination, our agentic systems work seamlessly with human oversight.",
		icon: "workflow",
	},
];

export const coreFeatures = [
	{
		title: "Healthcare Focus",
		description:
			"Specialized in Healthcare and Life Sciences for over a decade",
		stat: "10+",
		statLabel: "Years Experience",
	},
	{
		title: "Global Reach",
		description:
			"Partnered with leading healthcare companies across USA and EU",
		stat: "50+",
		statLabel: "Happy Clients",
	},
	{
		title: "Proven Results",
		description:
			"Delivered measurable value through AI-driven healthcare innovation",
		stat: "100+",
		statLabel: "Projects Delivered",
	},
];

