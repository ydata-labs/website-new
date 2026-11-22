export interface Product {
	id: string;
	name: string;
	tagline: string;
	description: string;
	features: string[];
	image: { src: string; width: number; height: number };
	website: string;
}

export const products: Product[] = [
	{
		id: "modelpark",
		name: "ModelPark",
		tagline: "Share your AI apps with one link",
		description:
			"A platform for data scientists and developers to share and demo their apps. It gives a secure, easy-to-remember address to an app that runs on your laptop or in the cloud.",
		features: [
			"Secure URL Generation with custom, memorable URLs",
			"Real-time Monitoring for app status and engagement",
			"Advanced Analytics for user behavior insights",
			"Privacy Controls with private mode and password protection",
			"Custom Model Cards for rich metadata documentation",
			"Flexible Deployment for local and cloud apps",
			"Community Platform for collaboration and feedback",
		],
		// Cropped on purpose: the full screenshot shows user names and app names.
		image: { src: "/images/products/modelpark.webp", width: 1200, height: 297 },
		website: "https://modelpark.app",
	},
	{
		id: "minamed",
		name: "MinaMed",
		tagline: "Voice-enabled AI medical assistant",
		description:
			"An AI assistant for healthcare professionals. It listens, writes the clinical note, and finds the medical reference a clinician needs, so less time goes to paperwork.",
		features: [
			"AI Medical Scribe for automatic transcription",
			"Smart Documentation for EHR entry generation",
			"Medical Search for knowledge and references",
			"Voice Commands for hands-free operation",
			"HIPAA Compliance with enterprise-grade security",
			"Custom Workflows for practice-specific needs",
			"Integration Ready for existing EHR systems",
		],
		image: { src: "/images/products/minamed.webp", width: 1200, height: 854 },
		website: "https://minamed.app",
	},
];
