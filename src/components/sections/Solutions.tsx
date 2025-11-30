import Link from "next/link";
import { SectionHeader } from "@/components/ui";
import { capabilities } from "@/data/solutions";
import { cn } from "@/lib/cn";

const iconMap: Record<string, React.ReactNode> = {
	sparkles: (
		<svg
			className="w-8 h-8"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth={1.5}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
			/>
		</svg>
	),
	"chart-line": (
		<svg
			className="w-8 h-8"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth={1.5}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
			/>
		</svg>
	),
	"message-text": (
		<svg
			className="w-8 h-8"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth={1.5}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
			/>
		</svg>
	),
	eye: (
		<svg
			className="w-8 h-8"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth={1.5}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
			/>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
			/>
		</svg>
	),
	server: (
		<svg
			className="w-8 h-8"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth={1.5}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M21.75 17.25v-.228a4.5 4.5 0 00-.12-1.03l-2.268-9.64a3.375 3.375 0 00-3.285-2.602H7.923a3.375 3.375 0 00-3.285 2.602l-2.268 9.64a4.5 4.5 0 00-.12 1.03v.228m19.5 0a3 3 0 01-3 3H5.25a3 3 0 01-3-3m19.5 0a3 3 0 00-3-3H5.25a3 3 0 00-3 3m16.5 0h.008v.008h-.008v-.008zm-3 0h.008v.008h-.008v-.008z"
			/>
		</svg>
	),
	users: (
		<svg
			className="w-8 h-8"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth={1.5}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
			/>
		</svg>
	),
};

export function Solutions() {
	return (
		<section id="solutions" className="py-20 lg:py-28 bg-slate-bg relative overflow-hidden">
			{/* Background decoration */}
			<div className="absolute top-0 left-0 w-full h-full bg-dot-pattern opacity-30" />
			<div className="absolute -top-40 -right-40 w-80 h-80 bg-teal/5 rounded-full blur-3xl" />
			<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-navy/5 rounded-full blur-3xl" />

			<div className="container-xl mx-auto px-4 md:px-8 relative z-10">
				<SectionHeader
					eyebrow="What We Do"
					title="Healthcare AI, Data Science & Generative AI Solutions"
					description="We transform complex medical data into life-saving insights and competitive advantage. Our comprehensive solutions cover the full spectrum of AI, ML, and GenAI capabilities, specialized for Healthcare and Life Sciences."
				/>

				<div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{capabilities.map((capability, index) => (
						<article
							key={capability.id}
							className={cn(
								"group bg-white rounded-2xl p-8 shadow-sm border border-slate-100 card-hover",
								"animate-fade-in-up"
							)}
							style={{ animationDelay: `${index * 100}ms` }}
						>
							{/* Icon */}
							<div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center text-teal mb-6 group-hover:from-teal group-hover:to-teal-light group-hover:text-white transition-all duration-300">
								{iconMap[capability.icon]}
							</div>

							{/* Content */}
							<h3 className="text-h4 text-navy mb-3 group-hover:text-teal transition-colors duration-300">
								{capability.title}
							</h3>
							<p className="text-slate-600 text-body-sm">
								{capability.description}
							</p>
						</article>
					))}
				</div>

				{/* Bottom CTA */}
				<div className="mt-16 text-center">
					<p className="text-slate-600 mb-4">
						In Healthcare or Life Sciences? Let us help you harness the full potential of your data.
					</p>
					<Link
						href="/#contact"
						className="inline-flex items-center gap-2 text-teal font-heading font-medium hover:text-teal-dark transition-colors link-underline"
					>
						<span>Let&apos;s discuss your requirements</span>
						<svg
							className="w-4 h-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
							/>
						</svg>
					</Link>
				</div>
			</div>
		</section>
	);
}

