export interface Project {
	id: string;
	title: string;
	customer: string;
	duration: string;
	description: string;
	impact: string;
	featured?: boolean;
}

export type Achievement = string | { text: string; link?: string };

export const featuredProjects: Project[] = [
    {
        id: "mlops-platform",
        title: "Clinical-Grade MLOps Platform Development",
        customer: "Healthcare AI Platform",
        duration: "Aug 2021 - Present",
        description:
            "Building a clinical-grade MLOps platform for training and validation of medical AI models within secure, air-gapped environments, ensuring data privacy and regulatory compliance.",
        impact: "30% reduction in model deployment time and 100% regulatory compliance for over 50 medical AI models.",
        featured: true,
    },
    {
        id: "metastasis-detection",
        title: "Advanced NLP for Metastasis Detection",
        customer: "Pharmaceutical Company",
        duration: "2022 - 2023",
        description:
            "Developed and deployed a sophisticated NLP predictive model to analyze longitudinal patient records and extract critical information from medical reports using BERT-based NER and Assertion Status models.",
        impact: "84% F1 score across seven classes, 12% improvement over previous state-of-the-art methods, and 25% reduction in diagnostic time.",
        featured: true,
    },
    {
        id: "oncology-llms",
        title: "Healthcare-Specific LLMs for Oncology Patient Timelines",
        customer: "Pharmaceutical Company",
        duration: "2022 - Present",
        description:
            "Leveraged healthcare-specific Large Language Models (LLMs) to construct detailed oncology patient timelines and provide recommendations based on clinical guidelines.",
        impact: "15% increase in guideline adherence and 40% reduction in manual chart review time.",
        featured: true,
    },
    {
        id: "generative-ai-clinical",
        title: "Generative AI for Data Extraction Clinical Support",
        customer: "Healthcare Provider",
        duration: "2023 - Present",
        description:
            "Implemented Generative AI solutions to enhance data extraction for clinical support, streamlining clinical workflows and improving data accuracy for healthcare applications.",
        impact: "50% faster data extraction process and 20% improvement in data accuracy.",
        featured: true,
    },
];

export const allProjects: Project[] = [
    {
        id: "multilingual-patient",
        title: "Multilingual Patient Interaction",
        customer: "Pharmaceutical Company",
        duration: "2023 – Present",
        description:
            "Integrated speech-to-text, language detection, and real-time translation into a patient-facing robotic assistant to enable seamless multilingual greetings and interactions.",
        impact: "Improved inclusivity in patient engagement, reducing communication barriers for non-English speakers.",
    },
    {
        id: "pharmacovigilance",
        title: "Pharmacovigilance Translation Automation",
        customer: "Pharmaceutical Company",
        duration: "2022 – Present",
        description:
            "Embedded AI-powered translation workflows into pharmacovigilance systems with terminology database integration to ensure consistent and regulatory-compliant outputs.",
        impact: "Reduced translation turnaround time by 40% while ensuring regulatory compliance in global safety reporting.",
    },
    {
        id: "life-sciences-translation",
        title: "Domain-Adapted Life Sciences Translation",
        customer: "Healthcare Provider",
        duration: "2021 – Present",
        description:
            "Delivered domain-specific AI translation models for clinical trial protocols, regulatory documents, and research content, combined with human-in-the-loop post-editing.",
        impact: "Reduced manual effort by 35% and accelerated global clinical research workflows.",
    },
    ...featuredProjects,
    {
        id: "medical-genai-agents",
        title: "Medical Generative AI & Agents for Evidence-Based Care",
        customer: "Healthcare Organization",
        duration: "2023 - Present",
        description:
            "Deployed medical Generative AI and intelligent agents to empower clinicians with evidence-based care, providing real-time insights and reducing cognitive load.",
        impact: "10% improvement in diagnostic accuracy and 15% reduction in physician burnout due to reduced information overload.",
    },
    {
        id: "oncology-ehr",
        title: "AI-Enhanced Oncology Data: EHR Insights with NLP and LLMs",
        customer: "Healthcare Research Institute",
        duration: "2022 - 2023",
        description:
            "Utilized Natural Language Processing (NLP) and Large Language Models (LLMs) to unlock critical insights from Electronic Health Records (EHRs) for oncology research.",
        impact: "20% more eligible patients identified for clinical trials and 30% faster analysis of patient cohorts.",
    },
    {
        id: "opioid-detection",
        title: "Opioid-Related Adverse Events Detection from EHRs",
        customer: "Healthcare Provider",
        duration: "2021 - 2022",
        description:
            "Developed solutions for identifying opioid-related adverse events by analyzing unstructured text within Electronic Health Records using advanced NLP techniques.",
        impact: "25% increase in the detection rate of adverse events and 10% reduction in false positives.",
    },
    {
        id: "deidentification",
        title: "De-identifying Free-Text Patient Notes",
        customer: "Pharmaceutical Company",
        duration: "2020 - 2021",
        description:
            "Developed robust solutions for de-identifying free-text patient notes without compromising data utility, enabling secure and compliant use of sensitive patient data.",
        impact: "99.9% de-identification accuracy while preserving 95% of data utility for research purposes.",
    },
    {
        id: "robotics-genai",
        title: "Robotics and Generative AI Medical Language Models at Point of Care",
        customer: "Healthcare Provider",
        duration: "2023 - Present",
        description:
            "Integrated robotics and Generative AI medical language models at the point of care, bringing advanced AI directly into clinical settings for immediate impact.",
        impact: "10% increase in physician-patient interaction time and 5% reduction in medical errors.",
    },
];

export const caseStudies = [
    {
        title: "AI-Enhanced HCC Code Discovery",
        client: "Healthcare Provider",
        period: "2022-2023",
        description:
            "Leveraging AI to enhance Hierarchical Condition Category (HCC) code discovery for accurate risk adjustment and reimbursement.",
        result: "15% increase in HCC capture rate and 10% reduction in audit risks.",
    },
    {
        title: "Healthcare ChatBots with Medical LLM-as-a-Judge",
        client: "Healthcare Technology Company",
        period: "2023-Present",
        description:
            "Productizing healthcare chatbots by integrating Medical LLM-as-a-Judge for more accurate and context-aware responses.",
        result: "25% improvement in chatbot accuracy.",
    },
    {
        title: "RAG on FHIR: Making Healthcare Less Opaque",
        client: "Healthcare Interoperability Platform",
        period: "2023-Present",
        description:
            "Integrating Retrieval-Augmented Generation (RAG) with FHIR standards using Generative AI.",
        result: "30% improvement in data accessibility for clinicians.",
    },
    {
        title: "De-Identifying 700 Million Patient Notes",
        client: "Large Healthcare System",
        period: "2020-2021",
        description:
            "Large-scale de-identification of patient notes using Spark NLP.",
        result: "99.8% accuracy in PHI removal while maintaining data utility for research.",
    },
    {
        title: "Regulatory Grade Oncology Data Curation",
        client: "Oncology Data Provider",
        period: "2022-Present",
        description:
            "Leveraging healthcare NLP models for regulatory grade oncology data curation.",
        result: "20% reduction in data curation time and 10% improvement in data quality.",
    },
    {
        title: "Building Patient Cohorts with NLP and Knowledge Graphs",
        client: "Healthcare Research Institute",
        period: "2022-Present",
        description:
            "Building sophisticated patient cohorts using NLP and Knowledge Graphs.",
        result: "40% faster cohort identification and 25% increase in precision of patient selection.",
    },
];

export const services = [
    {
        title: "Healthcare & Life Sciences AI Strategy & Consulting",
        items: [
            "AI/ML Feasibility Studies for Clinical & Research Applications",
            "Data Governance & Ethics in Healthcare",
            "Cloud Data Architecture for Health Data",
            "Digital Transformation Roadmapping for Pharma & Biotech",
            "Multilingual AI Translation & Global Communication Workflows",
        ],
    },
    {
        title: "Advanced AI & Generative AI Solutions for Healthcare",
        items: [
            "Clinical Natural Language Processing (NLP) & Large Language Models (LLMs)",
            "Medical Computer Vision (CV)",
            "Predictive Analytics for Patient Outcomes & Disease Progression",
            "Generative AI for Drug Discovery & Research",
            "AI-Powered Clinical Decision Support Systems",
        ],
    },
    {
        title: "MLOps & AI Operationalization in Regulated Environments",
        items: [
            "Clinical MLOps Platform Design & Implementation",
            "Model Deployment & Integration with EHR/LIMS",
            "Performance Monitoring & Explainability for Medical AI",
            "Data Pipeline Engineering for Health Data",
        ],
    },
    {
        title: "Training & Enablement for Healthcare Professionals",
        items: [
            "Customized Workshops & Training",
            "Mentorship & Coaching",
            "Knowledge Transfer & Best Practices",
        ],
    },
];

export const founderInfo = {
    name: "Dr. Veysel Kocaman",
    title: "Founder & Director",
    photo: { src: "/images/founder.webp", width: 480, height: 510 },
    bio: [
        "Dr. Veysel Kocaman is a seasoned Data Scientist and ML Engineer with over a decade of experience leading advanced AI and machine learning initiatives across healthcare, life sciences, and enterprise domains. He is the Director of yDataLabs, a Dutch consultancy that builds AI systems and turns data into business value.",
        'In addition to his role at yDataLabs, Veysel serves as the VP of Engineering and fractional CTO at several US-based AI startups, contributing strategic leadership to AI driven healthcare innovation and medical NLP platforms. He earned his Ph.D. in Computer Vision from Leiden University with a dissertation on "Learning from Small Samples" and has taught graduate-level AI courses during his academic tenure.',
        "Veysel has led multimillion-dollar AI programs for global pharmaceutical and healthcare companies, integrating intelligent systems into mission-critical workflows. With more than 40 peer-reviewed publications in medical AI, Dr. Kocaman is recognized internationally for his contributions to the field.",
    ],
    achievements: [
        "Google-recognized ML Developer Expert",
        {
            text: "40+ peer-reviewed publications in medical AI",
            link: "https://scholar.google.co.id/citations?hl=nl&user=rrDNhSEAAAAJ",
        },
        "100+ keynote talks at conferences worldwide",
        "PhD in Computer Vision from Leiden University",
    ],
};

export const activities = [
	{
		title: "Peer-reviewed Publications",
		icon: "book",
		description:
			"With more than 40 peer-reviewed publications in medical AI, Dr. Kocaman is recognized internationally for his contributions to the field. His research spans clinical NLP, computer vision, machine learning, and healthcare AI applications.",
	},
	{
		title: "Public Speaking Engagements",
		icon: "microphone",
		description:
			"As a frequent keynote speaker, Dr. Kocaman has delivered over 100 talks at conferences, meetups, and workshops around the world, sharing insights on AI in healthcare, machine learning best practices, and the future of medical technology.",
	},
	{
		title: "Technical Blogposts",
		icon: "pen",
		description:
			"Regular contributions to the AI and healthcare community through thought leadership articles, technical blog posts, and insights on emerging trends in medical AI, data science, and healthcare technology innovation.",
	},
];

// Each logo is the variant that reads on a dark background.
export const partners = [
	{
		name: "John Snow Labs",
		logo: { src: "/images/businesses/jsl-dark.svg", width: 180, height: 49 },
		description: "Healthcare AI and NLP solutions",
		website: "https://johnsnowlabs.com",
	},
	{
		name: "Gesund.ai",
		logo: { src: "/images/businesses/gesundai-dark.svg", width: 152, height: 38 },
		description: "Leading AI solutions for healthcare",
		website: "https://gesund.ai",
	},
];
