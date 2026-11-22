"use client";

import { cn } from "@/lib/cn";
import Link from "next/link";

interface ButtonProps {
	children: React.ReactNode;
	href?: string;
	variant?: "primary" | "outline";
	size?: "sm" | "md" | "lg";
	className?: string;
	external?: boolean;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
	disabled?: boolean;
	icon?: React.ReactNode;
	iconPosition?: "left" | "right";
}

export function Button({
	children,
	href,
	variant = "primary",
	size = "md",
	className,
	external = false,
	onClick,
	type = "button",
	disabled = false,
	icon,
	iconPosition = "right",
}: ButtonProps) {
	const baseStyles =
		"inline-flex items-center justify-center font-heading font-medium rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

	const variants = {
		primary: "bg-accent text-page hover:bg-accent-bright",
		outline:
			"border border-line-strong text-ink hover:border-accent hover:text-accent",
	};

	const sizes = {
		sm: "px-4 py-2 text-sm gap-1.5",
		md: "px-5 py-2.5 text-sm gap-2",
		lg: "px-6 py-3 text-base gap-2.5",
	};

	const classes = cn(baseStyles, variants[variant], sizes[size], className);

	const content = (
		<>
			{icon && iconPosition === "left" && (
				<span className="flex-shrink-0">{icon}</span>
			)}
			<span>{children}</span>
			{icon && iconPosition === "right" && (
				<span className="flex-shrink-0 transition-transform group-hover:translate-x-1">
					{icon}
				</span>
			)}
		</>
	);

	if (href) {
		if (external) {
			return (
				<a
					href={href}
					target="_blank"
					rel="noopener noreferrer"
					className={cn(classes, "group")}
				>
					{content}
				</a>
			);
		}
		return (
			<Link href={href} className={cn(classes, "group")}>
				{content}
			</Link>
		);
	}

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={cn(classes, "group")}
		>
			{content}
		</button>
	);
}

// Arrow icon component for buttons
export function ArrowIcon({ className }: { className?: string }) {
	return (
		<svg
			width="14"
			height="14"
			viewBox="0 0 14 14"
			fill="currentColor"
			className={className}
		>
			<path d="M10.4767 6.16701L6.00668 1.69701L7.18501 0.518677L13.6667 7.00034L7.18501 13.482L6.00668 12.3037L10.4767 7.83368H0.333344V6.16701H10.4767Z" />
		</svg>
	);
}

