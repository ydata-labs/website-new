import { SectionHeader, Button, ArrowIcon } from "@/components/ui";
import { featuredProjects } from "@/data/portfolio";
import { cn } from "@/lib/cn";

export function PortfolioSummary() {
	return (
		<section className="py-20 lg:py-28 bg-slate-bg relative overflow-hidden">
			{/* Background elements */}
			<div className="absolute top-0 right-0 w-96 h-96 bg-teal/5 rounded-full blur-3xl -translate-y-1/2" />
			<div className="absolute bottom-0 left-0 w-96 h-96 bg-navy/5 rounded-full blur-3xl translate-y-1/2" />

			<div className="container-xl mx-auto px-4 md:px-8 relative z-10">
				<SectionHeader
					eyebrow="Featured Work"
					title="Healthcare AI Projects"
					description="Explore our impactful projects in healthcare AI, medical NLP, and clinical MLOps that are transforming the industry."
				/>

				<div className="mt-16 grid md:grid-cols-2 gap-6">
					{featuredProjects.map((project, index) => (
						<article
							key={project.id}
							className={cn(
								"group bg-white rounded-2xl p-8 shadow-sm border border-slate-100 card-hover relative overflow-hidden",
								"animate-fade-in-up"
							)}
							style={{ animationDelay: `${index * 100}ms` }}
						>
							{/* Accent bar */}
							<div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-teal to-navy group-hover:w-2 transition-all duration-300" />

							{/* Duration badge */}
							<span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-heading rounded-full mb-4">
								{project.duration}
							</span>

							{/* Title */}
							<h3 className="text-h4 text-navy mb-2 group-hover:text-teal transition-colors">
								{project.title}
							</h3>

							{/* Customer */}
							<p className="text-teal text-sm font-medium mb-4">
								{project.customer}
							</p>

							{/* Description */}
							<p className="text-slate-600 text-sm mb-4 line-clamp-2">
								{project.description}
							</p>

							{/* Impact */}
							<div className="flex items-start gap-2 text-sm">
								<svg
									className="w-5 h-5 text-emerald flex-shrink-0 mt-0.5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
									/>
								</svg>
								<span className="text-slate-700">{project.impact}</span>
							</div>
						</article>
					))}
				</div>

				{/* CTA */}
				<div className="mt-12 text-center">
					<Button href="/portfolio" variant="primary" size="lg" icon={<ArrowIcon />}>
						View Full Portfolio
					</Button>
				</div>
			</div>
		</section>
	);
}

