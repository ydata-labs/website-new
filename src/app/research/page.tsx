import { Header, Footer, Button, ArrowIcon, Icon } from "@/components/ui";
import { pageMetadata } from "@/data/seo";
import { publications, talks, scholarUrl } from "@/data/research";

export const metadata = pageMetadata("research");

interface Row {
	title: string;
	year: number;
	source: string;
	url?: string;
}

function ResearchList({ heading, rows }: { heading: string; rows: Row[] }) {
	return (
		<section className="mt-16">
			<h2 className="text-h4 mb-6">{heading}</h2>
			<ol className="border-t border-line">
				{rows.map((row) => (
					<li
						key={row.title}
						className="grid grid-cols-[3.5rem_1fr] gap-x-4 border-b border-line py-5"
					>
						<span className="font-heading text-sm text-muted pt-0.5">
							{row.year}
						</span>
						<div>
							{row.url ? (
								<a
									href={row.url}
									target="_blank"
									rel="noopener noreferrer"
									className="text-bright hover:text-accent transition-colors"
								>
									{row.title}
									<Icon
										name="external"
										className="ml-1.5 inline h-3.5 w-3.5 text-muted"
									/>
								</a>
							) : (
								<span className="text-bright">{row.title}</span>
							)}
							<p className="mt-1 font-heading text-xs text-muted">
								{row.source}
							</p>
						</div>
					</li>
				))}
			</ol>
		</section>
	);
}

export default function ResearchPage() {
	return (
		<>
			<Header />
			<main className="pt-32 pb-24">
				<div className="max-w-lg mx-auto px-4 md:px-8">
					<p className="mb-3 font-heading text-sm text-accent">
						{"// research"}
					</p>
					<h1 className="text-h2 md:text-h1 mb-6">Papers and talks</h1>
					<p className="text-body-lg text-muted max-w-prose">
						Our work starts in research. Dr. Veysel Kocaman, the founder of
						yDataLabs, has more than 40 peer-reviewed publications in medical
						AI. His work covers clinical language processing, medical language
						models, and how to test them before they reach a hospital.
					</p>
					<p className="mt-4 text-muted max-w-prose">
						He holds a PhD in Computer Vision from Leiden University. This page
						shows a selection.
					</p>
					<a
						href={scholarUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="mt-6 inline-flex items-center gap-2 font-heading text-sm text-accent hover:text-accent-bright transition-colors"
					>
						Full list on Google Scholar
						<Icon name="external" className="h-4 w-4" />
					</a>

					<ResearchList
						heading="Selected publications"
						rows={publications.map((p) => ({ ...p, source: p.venue }))}
					/>

					{talks.length > 0 && (
						<ResearchList
							heading="Selected talks"
							rows={talks.map((t) => ({ ...t, source: t.event }))}
						/>
					)}

					<section className="mt-16 rounded-lg border border-line bg-surface p-8">
						<h2 className="text-h4 mb-3">Want to work on a hard problem?</h2>
						<p className="text-muted mb-6 max-w-prose">
							We bring this research into systems that run on your own
							servers. Tell us what you are working on.
						</p>
						<Button href="/#contact" icon={<ArrowIcon />}>
							Book a call
						</Button>
					</section>
				</div>
			</main>
			<Footer />
		</>
	);
}
