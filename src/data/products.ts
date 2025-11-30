export interface Product {
	id: string;
	name: string;
	tagline: string;
	description: string;
	features: string[];
	image: string;
	website: string;
	gradient: string;
}

export const products: Product[] = [
	{
		id: "modelpark",
		name: "ModelPark",
		tagline: "Revolutionizing App Sharing",
		description:
			"An innovative platform designed to revolutionize the way data scientists, AI researchers, and web developers share and demonstrate their applications. We simplify global app sharing by providing secure, easy-to-remember URLs for your locally deployed or cloud-based apps.",
		features: [
			"Secure URL Generation with custom, memorable URLs",
			"Real-time Monitoring for app status and engagement",
			"Advanced Analytics for user behavior insights",
			"Privacy Controls with private mode and password protection",
			"Custom Model Cards for rich metadata documentation",
			"Flexible Deployment for local and cloud apps",
			"Community Platform for collaboration and feedback",
		],
		image: "/images/products/modelpark.png",
		website: "https://modelpark.app",
		gradient: "from-teal-500 to-emerald-500",
	},
	{
		id: "minamed",
		name: "MinaMed",
		tagline: "Voice-Enabled AI Medical Assistant",
		description:
			"A comprehensive AI-powered medical assistant designed to streamline healthcare workflows and enhance patient care. Our platform combines advanced natural language processing with medical domain expertise to provide intelligent assistance to healthcare professionals.",
		features: [
			"AI Medical Scribe for automatic transcription",
			"Smart Documentation for EHR entry generation",
			"Medical Search for knowledge and references",
			"Voice Commands for hands-free operation",
			"HIPAA Compliance with enterprise-grade security",
			"Custom Workflows for practice-specific needs",
			"Integration Ready for existing EHR systems",
		],
		image: "/images/products/minamed.png",
		website: "https://minamed.app",
		gradient: "from-navy to-slate-700",
	},
];

