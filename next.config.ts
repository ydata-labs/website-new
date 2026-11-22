import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Cloudflare Workers has no image optimizer. Images are sized and
	// converted to WebP by hand before they go into public/.
	images: { unoptimized: true },
};

export default nextConfig;

// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
