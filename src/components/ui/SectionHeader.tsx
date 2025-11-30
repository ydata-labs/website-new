import { cn } from "@/lib/cn";

interface SectionHeaderProps {
	eyebrow?: string;
	title: string;
	description?: string;
	centered?: boolean;
	className?: string;
}

export function SectionHeader({
	eyebrow,
	title,
	description,
	centered = true,
	className,
}: SectionHeaderProps) {
	return (
		<div
			className={cn(
				"max-w-3xl",
				centered && "mx-auto text-center",
				className
			)}
		>
			{eyebrow && (
				<span className="inline-block px-4 py-1.5 mb-4 text-sm font-heading font-medium tracking-wider text-teal bg-teal/10 rounded-full uppercase">
					{eyebrow}
				</span>
			)}
			<h2 className="text-h2 md:text-h1 text-navy mb-4">{title}</h2>
			{description && (
				<p className="text-body-lg text-slate-600 max-w-2xl mx-auto">
					{description}
				</p>
			)}
		</div>
	);
}

