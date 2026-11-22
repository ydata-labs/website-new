// What yDataLabs offers. Three groups with equal weight, plus advice.
// No value imports here: `pnpm test` runs this file with plain Node.
import type { IconName } from "@/components/ui/Icon";

export type GroupId = "ai-engineering" | "platform-engineering" | "data-science";

export interface Solution {
	id: string;
	title: string;
	description: string;
	icon: IconName;
}

export interface SolutionGroup {
	id: GroupId;
	title: string;
	summary: string;
	items: Solution[];
}

export const solutionGroups: SolutionGroup[] = [
	{
		id: "ai-engineering",
		title: "AI engineering",
		summary: "We build AI systems that work in daily use, not only in a demo.",
		items: [
			{
				id: "llm-applications",
				title: "LLM applications",
				description:
					"Assistants, search over your own documents, and tools that read and write text for your team. Built on the model that fits the task, open or commercial.",
				icon: "sparkles",
			},
			{
				id: "llm-integration",
				title: "LLM integration",
				description:
					"We connect language models to the systems you already run: databases, record systems, and internal tools. Your staff keep their way of working.",
				icon: "plug",
			},
			{
				id: "agentic-workflows",
				title: "Agents and workflow automation",
				description:
					"AI agents that carry out multi-step work, such as collecting documents and preparing reports. A person stays in control of every decision that matters.",
				icon: "workflow",
			},
			{
				id: "language-vision",
				title: "Language and vision models",
				description:
					"Models that pull structured facts out of free text, remove personal details from documents, and read images and scans. Tuned on your own data when needed.",
				icon: "eye",
			},
		],
	},
	{
		id: "platform-engineering",
		title: "Platform engineering",
		summary: "We build and run the platforms that AI needs, inside your own walls.",
		items: [
			{
				id: "local-llms",
				title: "Local LLMs",
				description:
					"Open models that run on your own hardware. We pick the model, size the servers, and tune speed and cost. No prompt and no document leaves your network.",
				icon: "chip",
			},
			{
				id: "on-premises-ai",
				title: "On-premises and air-gapped AI",
				description:
					"Full AI systems on your own servers, including networks with no internet access. Built with access control, audit logs, and the rules of your sector.",
				icon: "building",
			},
			{
				id: "mlops-platform",
				title: "MLOps and AI platforms",
				description:
					"Platforms to train, test, deploy, and monitor models in a repeatable way. Every model version is tracked, so you can explain and reproduce each result.",
				icon: "server",
			},
			{
				id: "data-pipelines",
				title: "Data pipelines",
				description:
					"Pipelines that collect, clean, and deliver data to your models and reports. Tested, monitored, and built to handle sensitive records safely.",
				icon: "pipeline",
			},
		],
	},
	{
		id: "data-science",
		title: "Data science",
		summary: "We turn data into forecasts and decisions that you can explain.",
		items: [
			{
				id: "predictive-modeling",
				title: "Predictive modeling",
				description:
					"Models that forecast outcomes and rank risks from your historical data. For example patient outcomes, demand, or equipment failure.",
				icon: "chart-line",
			},
			{
				id: "decision-support",
				title: "Multi-criteria decision support",
				description:
					"Tools that compare options across many weighted criteria. They make trade-offs visible, so a hard choice about resources can be explained and defended.",
				icon: "scale",
			},
			{
				id: "simulation",
				title: "Multi-agent simulation",
				description:
					"Simulations of complex systems, such as patient flows or supply chains. Test a change in a virtual setting before you make it in the real one.",
				icon: "network",
			},
			{
				id: "model-evaluation",
				title: "Model evaluation",
				description:
					"Independent testing of AI models before and after launch: accuracy, robustness, bias, and safety. Includes methods to check LLM answers at scale.",
				icon: "gauge",
			},
		],
	},
];

export const advice = {
	title: "Get advice",
	intro:
		"Not sure where to start? We help your leaders and your team make good AI decisions before you spend on building.",
	items: [
		{
			title: "AI strategy and roadmap",
			description:
				"Where AI pays off in your organisation, in what order, and what it takes to get there.",
		},
		{
			title: "Feasibility studies",
			description:
				"A short, honest check: can this idea work with your data, your budget, and your rules?",
		},
		{
			title: "Workshops and training",
			description:
				"Hands-on sessions for your engineers, analysts, and managers, built around your own cases.",
		},
		{
			title: "Mentorship and coaching",
			description:
				"A senior expert next to your team during design reviews and hard technical choices.",
		},
	],
};

// The owner has not confirmed these two numbers yet.
export const proof = [
	{ value: "100+", label: "projects" },
	{ value: "50+", label: "clients" },
];
