import type { MetadataRoute } from "next";

const BASE = "https://ydatalabs.nl";

export default function sitemap(): MetadataRoute.Sitemap {
	return [{ url: BASE }, { url: `${BASE}/portfolio` }, { url: `${BASE}/privacy` }];
}
