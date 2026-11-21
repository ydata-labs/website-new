import type { Metadata } from "next";
import { Header, Footer } from "@/components/ui";

export const metadata: Metadata = {
	title: "Privacy",
	description:
		"How yDataLabs handles the details you send through the contact form.",
	alternates: { canonical: "/privacy" },
};

const sections = [
	{
		title: "What we collect",
		body: "When you send the contact form, we receive your name, your email address, the subject, your message, and your phone number if you give one. We collect nothing else, and only when you send the form.",
	},
	{
		title: "Why we collect it",
		body: "We use your details only to answer your message.",
	},
	{
		title: "Who receives it",
		body: "yDataLabs receives your message. Resend delivers the email to our mailbox. Cloudflare hosts this website and processes technical data such as IP addresses to keep the site running and secure.",
	},
	{
		title: "How long we keep it",
		body: "We keep your message as long as we need it to handle your request, and at most 24 months after our last contact with you.",
	},
	{
		title: "Cookies and tracking",
		body: "This website sets no tracking cookies and uses no analytics.",
	},
	{
		title: "Your rights",
		body: "You can ask us to show, correct, or delete your details at any time. Write to info@ydatalabs.nl and we will handle it.",
	},
	{
		title: "Who we are",
		body: "yDataLabs, Maastricht, the Netherlands. You can reach us at info@ydatalabs.nl.",
	},
];

export default function PrivacyPage() {
	return (
		<>
			<Header />
			<main className="pt-24 bg-white">
				<article className="max-w-md mx-auto px-4 md:px-8 py-16 lg:py-24">
					<h1 className="text-h2 md:text-h1 text-navy mb-4">Privacy</h1>
					<p className="text-body-sm text-slate-500 mb-12">
						Last updated: 21 November 2026
					</p>
					{sections.map((section) => (
						<section key={section.title} className="mb-10">
							<h2 className="text-h4 text-navy mb-3">{section.title}</h2>
							<p className="text-body text-slate-600">{section.body}</p>
						</section>
					))}
				</article>
			</main>
			<Footer />
		</>
	);
}
