import { SectionHeader } from "@/components/ui";
import { partners } from "@/data/portfolio";
import { cn } from "@/lib/cn";

export function Partners() {
	return (
		<section className="py-16 lg:py-20 bg-slate-bg">
			<div className="container-xl mx-auto px-4 md:px-8">
				<SectionHeader
					eyebrow="Businesses We Help Grow"
					title="Our Partners"
					description="We partner with innovative companies to transform their industries through AI and data science solutions."
				/>

				<div className="mt-12 grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
					{partners.map((partner, index) => (
						<a
							key={partner.name}
							href={partner.website}
							target="_blank"
							rel="noopener noreferrer"
							className={cn(
								"group bg-white rounded-2xl p-8 shadow-sm border border-slate-100 card-hover text-center",
								"animate-fade-in-up"
							)}
							style={{ animationDelay: `${index * 100}ms` }}
						>
							{/* Logo placeholder - using text as fallback */}
							<div className="h-16 flex items-center justify-center mb-4">
								<span className="text-2xl font-heading font-bold text-slate-300 group-hover:text-navy transition-colors duration-300">
									{partner.name}
								</span>
							</div>

							<p className="text-slate-600 text-sm">{partner.description}</p>

							{/* External link indicator */}
							<div className="mt-4 flex items-center justify-center gap-1 text-teal opacity-0 group-hover:opacity-100 transition-opacity">
								<span className="text-sm">Visit website</span>
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
										d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
									/>
								</svg>
							</div>
						</a>
					))}
				</div>
			</div>
		</section>
	);
}

