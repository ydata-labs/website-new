import type { Metadata } from "next";
import { JetBrains_Mono, Libre_Franklin } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
    variable: "--font-heading",
    subsets: ["latin"],
    display: "swap",
});

const libreFranklin = Libre_Franklin({
    variable: "--font-body",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://ydatalabs.nl"),
    title: {
        default:
            "yDataLabs - Healthcare AI & Data Science Consulting | Dr. Veysel Kocaman",
        template: "%s | yDataLabs",
    },
    description:
        "Leading healthcare AI consulting firm specializing in medical NLP, clinical MLOps, and generative AI solutions. Founded by Dr. Veysel Kocaman, PhD, with 10+ years in healthcare AI.",
    keywords: [
        "healthcare AI",
        "medical NLP",
        "clinical MLOps",
        "generative AI",
        "healthcare data science",
        "medical AI consulting",
        "clinical decision support",
        "healthcare machine learning",
        "medical computer vision",
        "healthcare LLM",
        "Dr. Veysel Kocaman",
        "yDataLabs",
    ],
    authors: [{ name: "Dr. Veysel Kocaman", url: "https://ydatalabs.nl" }],
    creator: "yDataLabs",
    publisher: "yDataLabs",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://ydatalabs.nl",
        siteName: "yDataLabs",
        title: "yDataLabs - Healthcare AI & Data Science Consulting",
        description:
            "Leading healthcare AI consulting firm specializing in medical NLP, clinical MLOps, and generative AI solutions. Founded by Dr. Veysel Kocaman, PhD.",
    },
    twitter: {
        card: "summary_large_image",
        title: "yDataLabs - Healthcare AI & Data Science Consulting",
        description:
            "Leading healthcare AI consulting firm specializing in medical NLP, clinical MLOps, and generative AI solutions.",
        creator: "@ydatalabs",
    },
};

// JSON-LD Structured Data
const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "yDataLabs",
    alternateName: "yData Labs",
    url: "https://ydatalabs.nl",
    logo: "https://ydatalabs.nl/images/logo/logo-light.png",
    description:
        "Leading healthcare AI consulting firm specializing in medical NLP, clinical MLOps, and generative AI solutions for healthcare and life sciences organizations.",
    foundingDate: "2020",
    founder: {
        "@type": "Person",
        name: "Dr. Veysel Kocaman",
        jobTitle: "Founder & Director",
        description:
            "PhD in Computer Vision, 20+ years in software, 10+ years in healthcare AI and machine learning",
        alumniOf: "Leiden University",
        knowsAbout: [
            "Healthcare AI",
            "Medical NLP",
            "Clinical MLOps",
            "Generative AI",
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
    ],
    areaServed: "Global",
    knowsAbout: [
        "Healthcare AI",
        "Medical Natural Language Processing",
        "Clinical MLOps",
        "Generative AI",
        "Healthcare Machine Learning",
        "Medical Computer Vision",
        "Clinical Decision Support Systems",
        "Healthcare Data Science",
    ],
};

const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Dr. Veysel Kocaman",
    alternateName: "Veysel Kocaman",
    jobTitle: "Founder & Director of yDataLabs",
    description:
        "PhD in Computer Vision, seasoned Data Scientist and ML Engineer with over 20 years of software development and architecture experience, specializing in healthcare AI.",
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
        "Healthcare AI",
        "Medical Natural Language Processing",
        "Clinical MLOps",
        "Generative AI",
        "Machine Learning",
        "Computer Vision",
        "Data Science",
        "Healthcare Technology",
    ],
    award: "Google ML Developer Expert",
    memberOf: {
        "@type": "Organization",
        name: "yDataLabs",
    },
    email: "info@ydatalabs.nl",
    sameAs: [
        "https://linkedin.com/in/veyselkocaman",
        "https://twitter.com/veyselkocaman",
    ],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
        <html lang="en" className="scroll-smooth">
            <head>
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                <meta name="theme-color" content="#0f172a" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(organizationSchema),
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(personSchema),
                    }}
                />
            </head>
            <body
                className={`${jetbrainsMono.variable} ${libreFranklin.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
