import { handleContact, type ContactEnv } from "@/lib/contact";

// The ProcessEnv type does not declare RESEND_API_KEY and the other contact
// vars, so TypeScript refuses to pass it as ContactEnv (all-optional fields,
// nothing in common). The values exist at run time, hence the cast.
export const POST = (request: Request) =>
	handleContact(request, process.env as ContactEnv);
