import { handleContact, type ContactEnv } from "@/lib/contact";

// The generated ProcessEnv type (cloudflare-env.d.ts) lists only the vars in
// wrangler.jsonc. Secrets such as RESEND_API_KEY exist at run time but not in
// that type, hence the cast.
export const POST = (request: Request) =>
	handleContact(request, process.env as ContactEnv);
