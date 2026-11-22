import { SectionHeader, Button, ArrowIcon } from "@/components/ui";
import { advice } from "@/data/solutions";

export function Advice() {
	return (
		<section id="advice" className="border-t border-line py-16 md:py-24">
			<div className="max-w-xl mx-auto grid gap-12 px-4 md:px-8 lg:grid-cols-[1fr_1.4fr]">
				<div>
					<SectionHeader
						eyebrow="advice"
						title={advice.title}
						description={advice.intro}
					/>
					<Button href="/#contact" className="mt-8" icon={<ArrowIcon />}>
						Book a call
					</Button>
				</div>
				<ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
					{advice.items.map((item) => (
						<li key={item.title} className="bg-surface p-6">
							<h3 className="mb-2 font-heading text-sm font-bold text-bright">
								{item.title}
							</h3>
							<p className="text-sm text-muted">{item.description}</p>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
