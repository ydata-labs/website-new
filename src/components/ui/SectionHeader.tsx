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
	centered = false,
	className,
}: SectionHeaderProps) {
	return (
		<div
			className={cn("max-w-3xl", centered && "mx-auto text-center", className)}
		>
			{eyebrow && (
				<p className="mb-3 font-heading text-sm text-accent">
					{"// "}
					{eyebrow}
				</p>
			)}
			<h2 className="text-h3 md:text-h2 mb-4">{title}</h2>
			{description && (
				<p className="text-body-lg text-muted max-w-2xl">{description}</p>
			)}
		</div>
	);
}
