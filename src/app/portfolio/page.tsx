import Image from "next/image";
import Link from "next/link";
import {
	Header,
	Footer,
	SectionHeader,
	Button,
	ArrowIcon,
	Icon,
} from "@/components/ui";
import {
	founderInfo,
	allProjects,
	caseStudies,
	activities,
} from "@/data/portfolio";
import { solutionGroups, advice } from "@/data/solutions";
import { pageMetadata } from "@/data/seo";

export const metadata = pageMetadata("portfolio");

const approach = [
	{
		title: "End-to-end delivery",
		desc: "From strategy to deployment and continuous improvement",
	},
	{
		title: "Research-led",
		desc: "We bring the latest results in AI, ML, and NLP into real systems",
	},
	{
		title: "Built for your case",
		desc: "Each solution fits the client's own data, rules, and team",
	},
	{
		title: "Measured results",
		desc: "We report impact in numbers wherever we can measure it",
	},
];

const sectionClass = "border-t border-line py-16 md:py-24";
const containerClass = "max-w-xl mx-auto px-4 md:px-8";
const cardClass = "rounded-lg border border-line bg-surface p-6 md:p-8";

export default function PortfolioPage() {
	return (
		<>
			<Header />
			<main>
				{/* Hero */}
				<section className="pt-32 pb-16 md:pt-40 md:pb-24">
					<div className={containerClass}>
						<p className="mb-5 font-heading text-sm text-accent">
							{"// healthcare AI work"}
						</p>
						<h1 className="text-h2 md:text-h1 mb-6 max-w-[22ch]">
							Our work in healthcare AI
						</h1>
						<p className="text-body-lg text-muted max-w-prose mb-8">
							LLM systems, medical language processing, and clinical MLOps
							platforms for hospitals and pharma.
						</p>
						<div className="flex flex-wrap gap-4">
							<Button href="/#contact" icon={<ArrowIcon />}>
								Book a call
							</Button>
							<Button href="#projects" variant="outline">
								See the projects
							</Button>
						</div>
					</div>
				</section>

				{/* About */}
				<section className={sectionClass}>
					<div className={containerClass}>
						<SectionHeader
							eyebrow="about yDataLabs"
							title="AI for the most sensitive data"
							description="yDataLabs is a Dutch AI consultancy with deep roots in healthcare. We advise teams, and we build and run the systems."
						/>

						<div className="mt-12 grid gap-6 lg:grid-cols-2">
							<div className={cardClass}>
								<h3 className="text-h4 mb-4">Our vision</h3>
								<p className="mb-4 text-muted">
									We want every organisation to use its own data to make
									better decisions, without giving that data away.
								</p>
								<p className="text-muted">
									Advanced AI should be usable and useful. We aim for clear,
									measurable results for our clients.
								</p>
							</div>

							<div className={cardClass}>
								<h3 className="text-h4 mb-4">Our approach</h3>
								<ul className="space-y-4">
									{approach.map((item) => (
										<li
											key={item.title}
											className="grid grid-cols-[1.25rem_1fr] gap-x-3"
										>
											<Icon name="check" className="mt-0.5 h-5 w-5 text-accent" />
											<p className="text-muted">
												<span className="font-heading text-sm font-bold text-bright">
													{item.title}.
												</span>{" "}
												{item.desc}
											</p>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</section>

				{/* Founder */}
				<section className={sectionClass}>
					<div
						className={`${containerClass} grid gap-10 md:grid-cols-[16rem_1fr] md:gap-14`}
					>
						<div className="w-48 self-start overflow-hidden rounded-lg border border-line bg-line md:w-full">
							<Image
								src={founderInfo.photo.src}
								alt={founderInfo.name}
								width={founderInfo.photo.width}
								height={founderInfo.photo.height}
								className="h-auto w-full"
							/>
						</div>
						<div>
							<p className="mb-3 font-heading text-sm text-accent">
								{"// our founder"}
							</p>
							<h2 className="text-h3 md:text-h2 mb-1">{founderInfo.name}</h2>
							<p className="mb-6 font-heading text-sm text-muted">
								{founderInfo.title}
							</p>
							<div className="max-w-prose space-y-4 text-muted">
								{founderInfo.bio.map((paragraph) => (
									<p key={paragraph}>{paragraph}</p>
								))}
							</div>
							<ul className="mt-6 flex flex-wrap gap-3">
								{founderInfo.achievements.map((achievement) => {
									const text =
										typeof achievement === "string"
											? achievement
											: achievement.text;
									const link =
										typeof achievement === "string"
											? undefined
											: achievement.link;
									const chipClass =
										"inline-flex items-center gap-2 rounded-md border border-line bg-surface px-3 py-1.5 font-heading text-xs text-ink";
									return (
										<li key={text}>
											{link ? (
												<a
													href={link}
													target="_blank"
													rel="noopener noreferrer"
													className={`${chipClass} transition-colors hover:border-accent hover:text-accent`}
												>
													<Icon name="check" className="h-4 w-4 text-accent" />
													{text}
													<Icon name="external" className="h-3.5 w-3.5" />
												</a>
											) : (
												<span className={chipClass}>
													<Icon name="check" className="h-4 w-4 text-accent" />
													{text}
												</span>
											)}
										</li>
									);
								})}
							</ul>
							<Button
								href="/research"
								variant="outline"
								className="mt-8"
								icon={<ArrowIcon />}
							>
								Read the research
							</Button>
						</div>
					</div>
				</section>

				{/* Services: the same three groups as on the home page */}
				<section className={sectionClass}>
					<div className={containerClass}>
						<SectionHeader
							eyebrow="services"
							title="What we do"
							description="Three strengths in one team, plus advice for leaders who are still deciding."
						/>

						<div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
							{solutionGroups.map((group) => (
								<div key={group.id} className={cardClass}>
									<h3 className="text-h4 mb-4 text-accent">{group.title}</h3>
									<ul className="space-y-2">
										{group.items.map((item) => (
											<li
												key={item.id}
												className="grid grid-cols-[1rem_1fr] gap-x-2 text-sm text-ink"
											>
												<Icon
													name="arrow-right"
													className="mt-1 h-3.5 w-3.5 text-accent"
												/>
												{item.title}
											</li>
										))}
									</ul>
								</div>
							))}
							<div className={cardClass}>
								<h3 className="text-h4 mb-4 text-accent">Advice</h3>
								<ul className="space-y-2">
									{advice.items.map((item) => (
										<li
											key={item.title}
											className="grid grid-cols-[1rem_1fr] gap-x-2 text-sm text-ink"
										>
											<Icon
												name="arrow-right"
												className="mt-1 h-3.5 w-3.5 text-accent"
											/>
											{item.title}
										</li>
									))}
								</ul>
							</div>
						</div>
						<Link
							href="/#solutions"
							className="mt-8 inline-flex items-center gap-2 font-heading text-sm text-accent hover:text-accent-bright transition-colors"
						>
							Read more about each solution
							<Icon name="arrow-right" className="h-4 w-4" />
						</Link>
					</div>
				</section>

				{/* Projects */}
				<section id="projects" className={sectionClass}>
					<div className={containerClass}>
						<SectionHeader
							eyebrow="healthcare and life sciences"
							title="Projects"
							description="Key projects in healthcare and life sciences. Many of them use generative AI and large language models."
						/>

						{/* The table scrolls inside this box on small screens. */}
						<div
							className="mt-12 overflow-x-auto rounded-lg border border-line bg-surface"
							tabIndex={0}
							role="region"
							aria-label="Projects table"
						>
							<table className="w-full min-w-[46rem] text-left text-sm">
								<thead>
									<tr className="border-b border-line font-heading text-xs text-muted">
										<th className="px-5 py-4 font-medium">Project</th>
										<th className="px-5 py-4 font-medium">Customer</th>
										<th className="px-5 py-4 font-medium">Duration</th>
										<th className="hidden px-5 py-4 font-medium lg:table-cell">
											Description
										</th>
										<th className="px-5 py-4 font-medium">Impact</th>
									</tr>
								</thead>
								<tbody>
									{allProjects.map((project) => (
										<tr
											key={project.id}
											className="border-b border-line align-top last:border-b-0"
										>
											<td className="px-5 py-4 font-heading font-bold text-bright">
												{project.title}
											</td>
											<td className="px-5 py-4 text-accent">
												{project.customer}
											</td>
											<td className="px-5 py-4 whitespace-nowrap text-muted">
												{project.duration}
											</td>
											<td className="hidden max-w-[28rem] px-5 py-4 text-muted lg:table-cell">
												{project.description}
											</td>
											<td className="px-5 py-4 text-ink">{project.impact}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</section>

				{/* Case studies */}
				<section className={sectionClass}>
					<div className={containerClass}>
						<SectionHeader
							eyebrow="other projects"
							title="More case studies"
							description="More projects across healthcare and life sciences."
						/>

						<div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{caseStudies.map((study) => (
								<article
									key={study.title}
									className="rounded-lg border border-line bg-surface p-6"
								>
									<p className="mb-3 font-heading text-xs text-muted">
										{study.period} · {study.client}
									</p>
									<h3 className="mb-2 font-heading font-bold text-bright">
										{study.title}
									</h3>
									<p className="mb-4 text-sm text-muted">{study.description}</p>
									<p className="grid grid-cols-[1.25rem_1fr] gap-x-2 text-sm text-ink">
										<Icon name="trend" className="mt-0.5 h-5 w-5 text-accent" />
										{study.result}
									</p>
								</article>
							))}
						</div>
					</div>
				</section>

				{/* Activities */}
				<section className={sectionClass}>
					<div className={containerClass}>
						<SectionHeader
							eyebrow="activities"
							title="Papers, events, and publications"
							description="Dr. Veysel Kocaman and yDataLabs take an active part in the global AI and healthcare community."
						/>

						<div className="mt-12 grid gap-4 md:grid-cols-3">
							{activities.map((activity) => (
								<article key={activity.title} className={cardClass}>
									<Icon name={activity.icon} className="mb-4 h-8 w-8 text-accent" />
									<h3 className="text-h4 mb-3">{activity.title}</h3>
									<p className="text-sm text-muted">{activity.description}</p>
								</article>
							))}
						</div>
						<Link
							href="/research"
							className="mt-8 inline-flex items-center gap-2 font-heading text-sm text-accent hover:text-accent-bright transition-colors"
						>
							See selected papers and talks
							<Icon name="arrow-right" className="h-4 w-4" />
						</Link>
					</div>
				</section>

				{/* Closing */}
				<section className={sectionClass}>
					<div className={containerClass}>
						<div className="rounded-lg border border-accent/40 bg-surface p-8 md:p-12">
							<h2 className="text-h3 md:text-h2 mb-4">
								Ready to put your healthcare data to work?
							</h2>
							<p className="text-body-lg text-muted max-w-prose mb-8">
								Tell us what you want to build, or where you need advice. We
								will tell you honestly what is possible.
							</p>
							<div className="flex flex-wrap gap-4">
								<Button href="/#contact" size="lg" icon={<ArrowIcon />}>
									Book a call
								</Button>
								<Button
									href="mailto:info@ydatalabs.nl"
									variant="outline"
									size="lg"
									icon={<Icon name="mail" className="h-5 w-5" />}
									iconPosition="left"
								>
									info@ydatalabs.nl
								</Button>
							</div>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
