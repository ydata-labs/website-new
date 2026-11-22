import { SectionHeader, Icon } from "@/components/ui";
import { solutionGroups } from "@/data/solutions";

export function Solutions() {
	return (
		<section id="solutions" className="border-t border-line py-16 md:py-24">
			<div className="max-w-xl mx-auto px-4 md:px-8">
				<SectionHeader
					eyebrow="solutions"
					title="Three strengths, one team"
					description="Most AI projects need all three: someone to build the AI, someone to run it safely, and someone to prove it works."
				/>

				<div className="mt-12 grid gap-6 lg:grid-cols-3">
					{solutionGroups.map((group, index) => (
						<article
							key={group.id}
							className="rounded-lg border border-line bg-surface p-6 md:p-8"
						>
							<p className="mb-2 font-heading text-xs text-muted">
								0{index + 1}
							</p>
							<h3 className="text-h3 mb-3 text-accent">{group.title}</h3>
							<p className="mb-8 text-sm text-muted">{group.summary}</p>
							<ul className="space-y-6">
								{group.items.map((item) => (
									<li key={item.id} className="grid grid-cols-[1.5rem_1fr] gap-x-4">
										<Icon name={item.icon} className="mt-0.5 h-6 w-6 text-accent" />
										<div>
											<h4 className="mb-1 font-heading text-sm font-bold text-bright">
												{item.title}
											</h4>
											<p className="text-sm text-muted">{item.description}</p>
										</div>
									</li>
								))}
							</ul>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
