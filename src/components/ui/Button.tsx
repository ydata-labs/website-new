"use client";

import { cn } from "@/lib/cn";
import Link from "next/link";

interface ButtonProps {
	children: React.ReactNode;
	href?: string;
	variant?: "primary" | "secondary" | "outline" | "ghost";
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
		"inline-flex items-center justify-center font-heading font-medium rounded-full transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

	const variants = {
		primary:
			"bg-navy text-white hover:bg-navy-light focus:ring-navy btn-glow",
		secondary:
			"bg-teal text-white hover:bg-teal-light focus:ring-teal btn-glow",
		outline:
			"border-2 border-navy text-navy hover:bg-navy hover:text-white focus:ring-navy",
		ghost: "text-navy hover:bg-slate-100 focus:ring-slate-300",
	};

	const sizes = {
		sm: "px-4 py-2 text-sm gap-1.5",
		md: "px-6 py-3 text-base gap-2",
		lg: "px-8 py-4 text-lg gap-2.5",
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

