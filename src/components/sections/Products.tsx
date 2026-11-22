import Image from "next/image";
import { SectionHeader, Button, Icon } from "@/components/ui";
import { products } from "@/data/products";

export function Products() {
	return (
		<section id="products" className="border-t border-line py-16 md:py-24">
			<div className="max-w-xl mx-auto px-4 md:px-8">
				<SectionHeader
					eyebrow="products"
					title="Products we built and run"
					description="We do not only advise. These are our own products, live and in use."
				/>

				<div className="mt-12 grid gap-6 lg:grid-cols-2">
					{products.map((product) => (
						<article
							key={product.id}
							className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface"
						>
							<Image
								src={product.image.src}
								alt={`Screenshot of ${product.name}`}
								width={product.image.width}
								height={product.image.height}
								className="aspect-[16/9] w-full border-b border-line object-cover object-top"
							/>
							<div className="flex flex-1 flex-col p-6 md:p-8">
								<h3 className="text-h3 mb-1">{product.name}</h3>
								<p className="mb-4 font-heading text-sm text-accent">
									{product.tagline}
								</p>
								<p className="mb-6 text-sm text-muted">{product.description}</p>
								<ul className="mb-8 space-y-2">
									{product.features.slice(0, 4).map((feature) => (
										<li
											key={feature}
											className="grid grid-cols-[1.25rem_1fr] gap-x-2 text-sm text-ink"
										>
											<Icon name="check" className="mt-0.5 h-5 w-5 text-accent" />
											{feature}
										</li>
									))}
								</ul>
								<div className="mt-auto">
									<Button
										href={product.website}
										variant="outline"
										size="sm"
										external
										icon={<Icon name="external" className="h-4 w-4" />}
									>
										Visit {product.name}
									</Button>
								</div>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
