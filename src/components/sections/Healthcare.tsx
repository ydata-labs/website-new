import Image from "next/image";
import { SectionHeader, Button, ArrowIcon, Icon } from "@/components/ui";
import { featuredProjects, partners } from "@/data/portfolio";

export function Healthcare() {
	return (
		<section id="healthcare" className="border-t border-line py-16 md:py-24">
			<div className="max-w-xl mx-auto px-4 md:px-8">
				<SectionHeader eyebrow="proof" title="Proven in healthcare" />
				<div className="mt-2 max-w-prose space-y-4 text-body-lg text-muted">
					<p>
						Healthcare is the hardest test for private AI. Patient records are
						among the most sensitive data there is. The rules are strict, and
						many hospital systems have no internet access at all.
					</p>
					<p>
						We build and run AI under these conditions: a clinical-grade MLOps
						platform inside air-gapped environments, de-identification of
						patient notes, and medical language models at the point of care.
						What works here works in any industry that must protect its data.
					</p>
				</div>

				<div className="mt-12 grid gap-4 md:grid-cols-2">
					{featuredProjects.map((project) => (
						<article
							key={project.id}
							className="rounded-lg border border-line bg-surface p-6"
						>
							<p className="mb-3 font-heading text-xs text-muted">
								{project.duration} · {project.customer}
							</p>
							<h3 className="text-h4 mb-3">{project.title}</h3>
							<p className="grid grid-cols-[1.25rem_1fr] gap-x-3 text-sm text-ink">
								<Icon name="trend" className="mt-0.5 h-5 w-5 text-accent" />
								{project.impact}
							</p>
						</article>
					))}
				</div>

				<div className="mt-10 flex flex-wrap items-center justify-between gap-8">
					<Button href="/portfolio" variant="outline" icon={<ArrowIcon />}>
						See all work
					</Button>
					<div className="flex flex-wrap items-center gap-x-10 gap-y-4">
						<span className="font-heading text-xs text-muted">partners</span>
						{partners.map((partner) => (
							<a
								key={partner.name}
								href={partner.website}
								target="_blank"
								rel="noopener noreferrer"
								className="block rounded-sm"
							>
								<Image
									src={partner.logo.src}
									alt={partner.name}
									width={partner.logo.width}
									height={partner.logo.height}
									className="h-8 w-auto"
								/>
							</a>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
