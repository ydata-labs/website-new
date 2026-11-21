// The share image shown when a link to the site is posted (LinkedIn, X, chat apps).
// A page that defines its own `openGraph` block replaces the inherited one, image
// included. So every such page must add `images: [shareImage]` itself.
export const shareImage = {
	url: "/og-image.png",
	width: 1200,
	height: 630,
	alt: "yDataLabs: LLMs and AI that run where your data lives.",
};
