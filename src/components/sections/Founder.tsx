import Image from "next/image";
import { Button, ArrowIcon, Icon } from "@/components/ui";
import { founderInfo } from "@/data/portfolio";

// The id stays "about": old links to /#about must keep working.
export function Founder() {
	return (
		<section id="about" className="border-t border-line py-16 md:py-24">
			<div className="max-w-xl mx-auto grid gap-10 px-4 md:grid-cols-[16rem_1fr] md:gap-14 md:px-8">
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
						{"// founder"}
					</p>
					<h2 className="text-h3 md:text-h2 mb-1">{founderInfo.name}</h2>
					<p className="mb-6 font-heading text-sm text-muted">
						{founderInfo.title}
					</p>
					<p className="max-w-prose text-muted">{founderInfo.bio[0]}</p>
					<ul className="mt-6 flex flex-wrap gap-3">
						{founderInfo.achievements.slice(0, 3).map((achievement) => {
							const text =
								typeof achievement === "string" ? achievement : achievement.text;
							return (
								<li
									key={text}
									className="inline-flex items-center gap-2 rounded-md border border-line bg-surface px-3 py-1.5 font-heading text-xs text-ink"
								>
									<Icon name="check" className="h-4 w-4 text-accent" />
									{text}
								</li>
							);
						})}
					</ul>
					<Button href="/research" className="mt-8" icon={<ArrowIcon />}>
						Read the research
					</Button>
				</div>
			</div>
		</section>
	);
}
