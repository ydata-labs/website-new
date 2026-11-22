import type { Metadata } from "next";
import { JetBrains_Mono, Libre_Franklin } from "next/font/google";
import "./globals.css";
import {
    pages,
    shareImage,
    organizationSchema,
    personSchema,
} from "@/data/seo";

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

// Defaults only. Every page sets its own title, description, canonical
// address, and share data with pageMetadata() from src/data/seo.ts.
// Never set a canonical address here: every page would inherit it.
export const metadata: Metadata = {
    metadataBase: new URL("https://ydatalabs.nl"),
    title: {
        default: pages.home.title,
        template: "%s | yDataLabs",
    },
    description: pages.home.description,
    keywords: [
        "LLM integration",
        "local LLM",
        "private LLM",
        "on-premises AI",
        "AI engineering",
        "platform engineering",
        "MLOps",
        "data science",
        "healthcare AI",
        "medical NLP",
        "clinical MLOps",
        "generative AI",
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
        siteName: "yDataLabs",
        images: [shareImage],
    },
    twitter: {
        card: "summary_large_image",
        images: [shareImage],
    },
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                <meta name="theme-color" content="#0b1220" />
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
