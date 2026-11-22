export interface NavItem {
	label: string;
	href: string;
	external?: boolean;
}

// "Contact" is the button in the header, so it is not in this list.
// "Blog" joins when the blog has its first post (phase 3).
export const mainNavigation: NavItem[] = [
	{ label: "Solutions", href: "/#solutions" },
	{ label: "Work", href: "/portfolio" },
	{ label: "Research", href: "/research" },
];

export const footerNavigation = {
	site: [
		...mainNavigation,
		{ label: "Contact", href: "/#contact" },
		{ label: "Privacy", href: "/privacy" },
	],
	products: [
		{ label: "ModelPark", href: "https://modelpark.app", external: true },
		{ label: "MinaMed", href: "https://minamed.app", external: true },
	],
};

// Keep these in step with `sameAs` in src/data/seo.ts.
export const socialLinks: NavItem[] = [
	{ label: "LinkedIn", href: "https://linkedin.com/company/ydatalabs" },
	{ label: "X", href: "https://twitter.com/ydatalabs" },
	{ label: "GitHub", href: "https://github.com/ydata-labs" },
];
