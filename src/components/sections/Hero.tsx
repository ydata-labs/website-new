import { Button, ArrowIcon } from "@/components/ui";
import { proof } from "@/data/solutions";

function Mark({ children }: { children: React.ReactNode }) {
	return (
		<mark className="rounded-sm bg-accent/20 px-1 text-accent-bright">
			{children}
		</mark>
	);
}

// The note is invented. It contains no real personal data.
const extracted = [
	["age", "72"],
	["condition", "type 2 diabetes"],
	["drug", "metformin 500 mg"],
	["dose", "twice daily"],
	["follow_up", "3 months"],
];

function ExtractionPanel() {
	return (
		<div
			role="img"
			aria-label="Example: a language model turns a short clinical note into structured data. It runs on your own servers."
			className="overflow-hidden rounded-xl border border-line bg-surface font-heading text-[13px] shadow-[0_0_60px_rgb(45_212_191/0.08)]"
		>
			<div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-2.5 text-muted">
				<span>clinical note → structured data</span>
				<span className="rounded border border-accent/40 px-2 py-0.5 text-[11px] text-accent">
					runs on your own servers
				</span>
			</div>
			<p className="px-4 py-4 leading-7 text-ink">
				Patient is a <Mark>72-year-old</Mark> male with{" "}
				<Mark>type 2 diabetes</Mark>. Started <Mark>metformin 500 mg</Mark>{" "}
				<Mark>twice daily</Mark>. Follow-up in <Mark>3 months</Mark>.
			</p>
			<div className="border-t border-dashed border-line px-4 py-3.5 leading-7 text-muted">
				{extracted.map(([key, value]) => (
					<div key={key}>
						{key}: <span className="text-accent-bright">{value}</span>
					</div>
				))}
			</div>
		</div>
	);
}

export function Hero() {
	return (
		<section className="pt-32 pb-16 md:pt-40 md:pb-24">
			<div className="max-w-xl mx-auto grid gap-12 px-4 md:px-8 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16">
				<div>
					<p className="mb-5 font-heading text-sm text-accent">
						{"// private AI · proven in healthcare"}
					</p>
					<h1 className="text-h2 sm:text-h1 xl:text-display mb-6">
						LLMs and AI that run{" "}
						<span className="text-accent">where your data lives.</span>
					</h1>
					<p className="text-body-lg text-muted max-w-prose mb-8">
						We advise your team, and we build the system. AI engineering,
						platform engineering, and data science from a research-led team.
					</p>
					<div className="flex flex-wrap gap-4">
						<Button href="/#contact" size="lg" icon={<ArrowIcon />}>
							Book a call
						</Button>
						<Button href="/portfolio" variant="outline" size="lg">
							See our work
						</Button>
					</div>
					<dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-6 font-heading">
						{proof.map((item) => (
							<div key={item.label} className="flex flex-col-reverse">
								<dt className="text-xs text-muted">{item.label}</dt>
								<dd className="text-h4 font-bold text-bright">{item.value}</dd>
							</div>
						))}
						<div className="flex flex-col-reverse">
							<dt className="text-xs text-muted">partners</dt>
							<dd className="text-sm font-bold leading-7 text-bright">
								John Snow Labs, Gesund.ai
							</dd>
						</div>
					</dl>
				</div>
				<ExtractionPanel />
			</div>
		</section>
	);
}
