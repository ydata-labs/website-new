// Page titles, descriptions, share data, and structured data.
// Keep this file free of value imports: `pnpm test` runs it with plain Node.
import type { Metadata } from "next";

const SITE = "yDataLabs";

export const shareImage = {
	url: "/og-image.png",
	width: 1200,
	height: 630,
	alt: "yDataLabs: LLMs and AI that run where your data lives.",
};

export type PageKey = "home" | "portfolio" | "research" | "privacy";

export const pages: Record<
	PageKey,
	{ path: string; title: string; description: string }
> = {
	home: {
		path: "/",
		title: "yDataLabs: LLMs and AI that run where your data lives",
		description:
			"We build LLM and AI systems that run on your own servers. AI engineering, platform engineering, and data science, proven in healthcare.",
	},
	portfolio: {
		path: "/portfolio",
		title: "Healthcare AI, Medical NLP and MLOps Projects",
		description:
			"Healthcare AI projects by yDataLabs: medical NLP, clinical MLOps, and LLM systems for hospitals and pharma, with measured results.",
	},
	research: {
		path: "/research",
		title: "Research: Papers and Talks",
		description:
			"Selected papers and talks by Dr. Veysel Kocaman on clinical NLP, medical language models, and healthcare AI. 40+ peer-reviewed publications.",
	},
	privacy: {
		path: "/privacy",
		title: "Privacy",
		description:
			"How yDataLabs handles the details you send through the contact form: what we collect, why, who receives it, and how long we keep it.",
	},
};

// The home title already carries the brand name.
export const fullTitle = (key: PageKey) =>
	key === "home" ? pages.home.title : `${pages[key].title} | ${SITE}`;

// Every page calls this. A page that builds its own `openGraph` block by hand
// loses the share image and the site name, because Next.js replaces the
// parent's block instead of merging it.
export function pageMetadata(key: PageKey): Metadata {
	const { path, description } = pages[key];
	const title = fullTitle(key);
	return {
		title: { absolute: title },
		description,
		alternates: { canonical: path },
		openGraph: {
			type: "website",
			siteName: SITE,
			locale: "en_US",
			url: path,
			title,
			description,
			images: [shareImage],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [shareImage],
		},
	};
}

const founderFacts =
	"PhD in Computer Vision, 20+ years in software, 10+ years in healthcare AI and machine learning";

export const organizationSchema = {
	"@context": "https://schema.org",
	"@type": "Organization",
	name: SITE,
	alternateName: "yData Labs",
	url: "https://ydatalabs.nl",
	logo: "https://ydatalabs.nl/images/logo/logo-light.png",
	description:
		"yDataLabs builds LLM and AI systems that run where the customer's data lives: LLM integration, local LLMs, and on-premises AI. AI engineering, platform engineering, and data science, proven in healthcare and life sciences.",
	foundingDate: "2020",
	founder: {
		"@type": "Person",
		name: "Dr. Veysel Kocaman",
		jobTitle: "Founder & Director",
		description: founderFacts,
		alumniOf: "Leiden University",
		knowsAbout: [
			"Large Language Models",
			"Healthcare AI",
			"Medical NLP",
			"Clinical MLOps",
			"Machine Learning",
		],
	},
	address: {
		"@type": "PostalAddress",
		addressLocality: "Maastricht",
		addressCountry: "NL",
	},
	contactPoint: {
		"@type": "ContactPoint",
		email: "info@ydatalabs.nl",
		contactType: "business inquiries",
	},
	sameAs: [
		"https://linkedin.com/company/ydatalabs",
		"https://twitter.com/ydatalabs",
		"https://github.com/ydata-labs",
	],
	areaServed: "Global",
	knowsAbout: [
		"LLM Integration",
		"Local LLMs",
		"On-Premises AI",
		"AI Engineering",
		"Platform Engineering",
		"MLOps",
		"Data Science",
		"Healthcare AI",
		"Medical Natural Language Processing",
		"Clinical MLOps",
		"Generative AI",
		"Medical Computer Vision",
		"Clinical Decision Support Systems",
	],
};

export const personSchema = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: "Dr. Veysel Kocaman",
	alternateName: "Veysel Kocaman",
	jobTitle: "Founder & Director of yDataLabs",
	description:
		"PhD in Computer Vision. Data scientist and ML engineer with 20+ years in software development and architecture, and 10+ years in healthcare AI.",
	alumniOf: {
		"@type": "Organization",
		name: "Leiden University",
	},
	hasCredential: {
		"@type": "EducationalOccupationalCredential",
		credentialCategory: "degree",
		educationalLevel: "PhD",
		about: "Computer Vision",
	},
	knowsAbout: [
		"Large Language Models",
		"Healthcare AI",
		"Medical Natural Language Processing",
		"Clinical MLOps",
		"Generative AI",
		"Machine Learning",
		"Computer Vision",
		"Data Science",
	],
	award: "Google ML Developer Expert",
	memberOf: {
		"@type": "Organization",
		name: SITE,
	},
	email: "info@ydatalabs.nl",
	sameAs: [
		"https://linkedin.com/in/veyselkocaman",
		"https://twitter.com/veyselkocaman",
	],
};
