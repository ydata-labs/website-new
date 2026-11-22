"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { mainNavigation } from "@/data/navigation";
import { Button } from "./Button";
import { Icon } from "./Icon";

export function Header() {
	const [open, setOpen] = useState(false);

	return (
		<header
			className={cn(
				"fixed inset-x-0 top-0 z-50 border-b border-line",
				// Solid while the phone menu is open, so page text does not show through.
				open ? "bg-page" : "bg-page/90 backdrop-blur",
			)}
		>
			<div className="max-w-xl mx-auto px-4 md:px-8">
				<nav
					aria-label="Main"
					className="flex h-20 items-center justify-between"
				>
					<Link href="/" className="flex items-center">
						<Image
							src="/logo.svg"
							alt="yDataLabs"
							width={500}
							height={103}
							priority
							className="h-9 w-auto md:h-10"
						/>
					</Link>

					<div className="hidden md:flex items-center gap-8">
						<ul className="flex items-center gap-7">
							{mainNavigation.map((item) => (
								<li key={item.label}>
									<Link
										href={item.href}
										className="font-heading text-sm lowercase text-muted hover:text-bright transition-colors"
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
						<Button
							href="/#contact"
							variant="outline"
							size="sm"
							className="border-accent text-accent lowercase hover:bg-accent hover:text-page"
						>
							Contact
						</Button>
					</div>

					<button
						type="button"
						className="md:hidden -mr-2 p-2 text-ink"
						onClick={() => setOpen(!open)}
						aria-label={open ? "Close menu" : "Open menu"}
						aria-expanded={open}
						aria-controls="mobile-menu"
					>
						<Icon name={open ? "close" : "menu"} className="h-6 w-6" />
					</button>
				</nav>

				{open && (
					<div id="mobile-menu" className="md:hidden border-t border-line py-4">
						<ul>
							{mainNavigation.map((item) => (
								<li key={item.label}>
									<Link
										href={item.href}
										className="block py-3 font-heading text-sm lowercase text-ink hover:text-accent"
										onClick={() => setOpen(false)}
									>
										{item.label}
									</Link>
								</li>
							))}
							<li>
								<Link
									href="/#contact"
									className="block py-3 font-heading text-sm lowercase text-accent"
									onClick={() => setOpen(false)}
								>
									Contact
								</Link>
							</li>
						</ul>
					</div>
				)}
			</div>
		</header>
	);
}
