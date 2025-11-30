"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { mainNavigation } from "@/data/navigation";
import { Button, ArrowIcon } from "./Button";

export function Header() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className={cn(
				"fixed top-0 left-0 right-0 z-50 transition-all duration-300",
				isScrolled
					? "bg-white/95 backdrop-blur-md shadow-md py-3"
					: "bg-transparent py-5"
			)}
		>
			<div className="container-xl mx-auto px-4 md:px-8">
				<nav className="flex items-center justify-between">
					{/* Logo */}
					<Link href="/" className="flex items-center gap-3 group">
						<Image
							src="/logo.svg"
							alt="yDataLabs"
							width={250}
							height={120}
							className="group-hover:scale-105 transition-transform duration-300"
						/>
						{/* <span
							className={cn(
								"font-heading font-bold text-xl transition-colors duration-300",
								isScrolled ? "text-navy" : "text-navy"
							)}
						>
							yDataLabs
						</span> */}
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden lg:flex items-center gap-8">
						<ul className="flex items-center gap-6">
							{mainNavigation.map((item) => (
								<li key={item.label}>
									<Link
										href={item.href}
										className={cn(
											"font-body text-sm font-medium transition-colors duration-200 link-underline",
											isScrolled
												? "text-slate-600 hover:text-navy"
												: "text-slate-700 hover:text-navy"
										)}
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
						<Button
							href="/#contact"
							variant="primary"
							size="sm"
							icon={<ArrowIcon />}
						>
							Get in Touch
						</Button>
					</div>

					{/* Mobile Menu Button */}
					<button
						type="button"
						className="lg:hidden p-2 text-navy"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						aria-label="Toggle mobile menu"
						aria-expanded={isMobileMenuOpen}
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							{isMobileMenuOpen ? (
								<>
									<line x1="18" y1="6" x2="6" y2="18" />
									<line x1="6" y1="6" x2="18" y2="18" />
								</>
							) : (
								<>
									<line x1="3" y1="6" x2="21" y2="6" />
									<line x1="3" y1="12" x2="21" y2="12" />
									<line x1="3" y1="18" x2="21" y2="18" />
								</>
							)}
						</svg>
					</button>
				</nav>

				{/* Mobile Menu */}
				<div
					className={cn(
						"lg:hidden overflow-hidden transition-all duration-300",
						isMobileMenuOpen
							? "max-h-96 opacity-100 mt-4"
							: "max-h-0 opacity-0"
					)}
				>
					<div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
						<ul className="space-y-4">
							{mainNavigation.map((item) => (
								<li key={item.label}>
									<Link
										href={item.href}
										className="block text-slate-700 hover:text-navy font-medium py-2 transition-colors"
										onClick={() => setIsMobileMenuOpen(false)}
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
						<div className="mt-6 pt-6 border-t border-slate-100">
							<Button
								href="/#contact"
								variant="primary"
								className="w-full"
								icon={<ArrowIcon />}
							>
								Get in Touch
							</Button>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}

