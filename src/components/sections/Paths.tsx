import Link from "next/link";
import { Icon, type IconName } from "@/components/ui";

const paths: { title: string; text: string; href: string; icon: IconName }[] = [
	{
		title: "Get advice",
		text: "You want a clear plan before you invest. We help you decide what to build, and what not to build.",
		href: "/#advice",
		icon: "users",
	},
	{
		title: "Get it built",
		text: "You need a working system. We design it, build it, and run it on your own servers.",
		href: "/#solutions",
		icon: "workflow",
	},
	{
		title: "Read the research",
		text: "You want to see the science first. Read our papers and talks on medical language models.",
		href: "/research",
		icon: "book",
	},
];

export function Paths() {
	return (
		<section aria-label="Three ways to start" className="pb-16 md:pb-24">
			<div className="max-w-xl mx-auto grid gap-4 px-4 md:grid-cols-3 md:px-8">
				{paths.map((path) => (
					<Link
						key={path.title}
						href={path.href}
						className="group rounded-lg border border-line bg-surface p-6 transition-colors hover:border-accent"
					>
						<Icon name={path.icon} className="mb-4 h-6 w-6 text-accent" />
						<h2 className="text-h4 mb-2 flex items-center gap-2">
							{path.title}
							<Icon
								name="arrow-right"
								className="h-4 w-4 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent"
							/>
						</h2>
						<p className="text-sm text-muted">{path.text}</p>
					</Link>
				))}
			</div>
		</section>
	);
}
