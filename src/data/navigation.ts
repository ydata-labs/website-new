export interface NavItem {
	label: string;
	href: string;
	external?: boolean;
}

export const mainNavigation: NavItem[] = [
	{ label: "Home", href: "/" },
	{ label: "Products", href: "/#products" },
	{ label: "Solutions", href: "/#solutions" },
	{ label: "About", href: "/#about" },
	{ label: "Portfolio", href: "/portfolio" },
	{ label: "Contact", href: "/#contact" },
];

export const footerNavigation = {
	products: [
		{ label: "ModelPark", href: "https://modelpark.app", external: true },
		{ label: "MinaMed", href: "https://minamed.app", external: true },
	],
	company: [
		{ label: "About Us", href: "/#about" },
		{ label: "Portfolio", href: "/portfolio" },
		{ label: "Contact", href: "/#contact" },
	],
	solutions: [
		{ label: "Healthcare AI", href: "/#solutions" },
		{ label: "Medical NLP", href: "/#solutions" },
		{ label: "MLOps", href: "/#solutions" },
	],
};

