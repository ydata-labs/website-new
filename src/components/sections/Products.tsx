import { SectionHeader, Button, ArrowIcon } from "@/components/ui";
import { products } from "@/data/products";
import { cn } from "@/lib/cn";

export function Products() {
	return (
		<section id="products" className="py-20 lg:py-28 bg-white">
			<div className="container-xl mx-auto px-4 md:px-8">
				<SectionHeader
					eyebrow="Our Products"
					title="Innovative Solutions for the Digital Age"
					description="Discover our cutting-edge products designed to transform how you work with AI and data."
				/>

				<div className="mt-16 grid lg:grid-cols-2 gap-8">
					{products.map((product, index) => (
						<article
							key={product.id}
							className={cn(
								"group relative bg-slate-bg rounded-3xl p-8 lg:p-10 overflow-hidden card-hover",
								"animate-fade-in-up",
								index === 1 && "delay-200"
							)}
						>
							{/* Background Pattern */}
							<div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-teal/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />

							{/* Product Number */}
							<div className="absolute top-8 right-8 text-8xl font-heading font-bold text-slate-100 select-none">
								0{index + 1}
							</div>

							<div className="relative z-10">
								{/* Icon/Visual */}
								<div
									className={cn(
										"w-16 h-16 rounded-2xl flex items-center justify-center mb-6",
										"bg-gradient-to-br",
										product.gradient
									)}
								>
									<span className="text-3xl text-white">
										{product.id === "modelpark" ? "🚀" : "🏥"}
									</span>
								</div>

								{/* Title & Tagline */}
								<h3 className="text-h3 text-navy mb-2">{product.name}</h3>
								<p className="text-teal font-heading text-sm font-medium mb-4">
									{product.tagline}
								</p>

								{/* Description */}
								<p className="text-slate-600 mb-6 line-clamp-3">
									{product.description}
								</p>

								{/* Features List */}
								<ul className="space-y-2 mb-8">
									{product.features.slice(0, 4).map((feature) => (
										<li
											key={feature}
											className="flex items-start gap-2 text-sm text-slate-600"
										>
											<svg
												className="w-5 h-5 text-teal flex-shrink-0 mt-0.5"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												strokeWidth={2}
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M5 13l4 4L19 7"
												/>
											</svg>
											<span>{feature}</span>
										</li>
									))}
								</ul>

								{/* CTA */}
								<Button
									href={product.website}
									variant="primary"
									size="sm"
									external
									icon={<ArrowIcon />}
								>
									Visit {product.name}
								</Button>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}

