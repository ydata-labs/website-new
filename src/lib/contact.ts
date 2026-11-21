// Contact form logic. Keep this file free of imports and of non-erasable
// TypeScript syntax: `node --test` runs it directly (see contact.test.mjs).

export interface ContactInput {
	name: string;
	email: string;
	subject: string;
	phone: string; // "" when not given
	message: string;
}

export type ParseResult =
	| { ok: true; data: ContactInput }
	| { ok: false; spam: true }
	| { ok: false; spam: false; error: string };

export interface ContactEnv {
	RESEND_API_KEY?: string;
	CONTACT_EMAIL?: string;
	CONTACT_FROM?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const invalid = (error: string): ParseResult => ({ ok: false, spam: false, error });

export function parseContact(body: unknown): ParseResult {
	if (typeof body !== "object" || body === null || Array.isArray(body)) {
		return invalid("Please fill in the form.");
	}
	const raw = body as Record<string, unknown>;

	// Honeypot first: a bot that fills it gets no hint about other fields.
	// The name is meaningless on purpose. A name like "website" or "company"
	// gets filled by browser autofill, and a real message would be dropped.
	if (typeof raw.ref_code === "string" && raw.ref_code.trim() !== "") {
		return { ok: false, spam: true };
	}

	// Single-line fields: collapsing whitespace also removes line breaks,
	// so nothing a visitor types can start a new mail header.
	const line = (v: unknown) =>
		typeof v === "string" ? v.replace(/\s+/g, " ").trim() : null;

	const name = line(raw.name);
	const email = line(raw.email);
	const subject = line(raw.subject);
	const phone = raw.phone === undefined ? "" : line(raw.phone);
	const message = typeof raw.message === "string" ? raw.message.trim() : null;

	if (!name || name.length > 100) {
		return invalid("Please enter your name (at most 100 characters).");
	}
	if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
		return invalid("Please enter a valid email address.");
	}
	if (!subject || subject.length > 150) {
		return invalid("Please enter a subject (at most 150 characters).");
	}
	if (phone === null || phone.length > 30) {
		return invalid("Please enter a valid phone number, or leave it empty.");
	}
	if (!message || message.length > 5000) {
		return invalid("Please enter a message (at most 5000 characters).");
	}

	return { ok: true, data: { name, email, subject, phone, message } };
}

const sendFailed = (status: number) =>
	Response.json({ error: "send_failed" }, { status });

export async function handleContact(
	request: Request,
	env: ContactEnv,
	fetchFn: typeof fetch = fetch,
): Promise<Response> {
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return Response.json({ error: "Please fill in the form." }, { status: 400 });
	}

	const parsed = parseContact(body);
	if (!parsed.ok) {
		if (parsed.spam) {
			// Spam gets a fake success so bots do not learn the field is a trap.
			// The log line is the only trace if a real visitor is ever dropped.
			console.warn("contact: honeypot drop");
			return Response.json({ ok: true });
		}
		return Response.json({ error: parsed.error }, { status: 400 });
	}

	if (!env.RESEND_API_KEY) {
		console.error("contact: RESEND_API_KEY is not set");
		return sendFailed(500);
	}

	const { name, email, subject, phone, message } = parsed.data;
	try {
		const res = await fetchFn("https://api.resend.com/emails", {
			method: "POST",
			// A stalled service must not leave the visitor on "Sending..." forever.
			// The abort lands in the catch below and becomes a 502.
			signal: AbortSignal.timeout(10_000),
			headers: {
				Authorization: `Bearer ${env.RESEND_API_KEY}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				from: env.CONTACT_FROM || "yDataLabs Website <website@ydatalabs.nl>",
				to: [env.CONTACT_EMAIL || "info@ydatalabs.nl"],
				reply_to: email,
				subject: `[ydatalabs.nl] ${subject}`,
				text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "-"}\n\n${message}`,
			}),
		});
		if (!res.ok) {
			console.error(`contact: Resend answered ${res.status}`);
			return sendFailed(502);
		}
	} catch (err) {
		console.error("contact: Resend call failed", err);
		return sendFailed(502);
	}

	return Response.json({ ok: true });
}

export const SEND_FAILED =
	"Something went wrong. Please email us directly at info@ydatalabs.nl.";

export type ContactResult = { sent: true } | { sent: false; message: string };

// Used by the form. "Sent" needs a 200 AND our own `{ ok: true }` body, so a
// proxy or challenge page that answers 200 can never look like success.
export async function readContactResult(res: Response): Promise<ContactResult> {
	const body = (await res.json().catch(() => null)) as {
		ok?: unknown;
		error?: unknown;
	} | null;
	if (res.status === 200 && body?.ok === true) return { sent: true };
	if (res.status === 400 && typeof body?.error === "string") {
		return { sent: false, message: body.error };
	}
	return { sent: false, message: SEND_FAILED };
}
