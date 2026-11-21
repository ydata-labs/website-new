import { test } from "node:test";
import assert from "node:assert/strict";
import {
	parseContact,
	handleContact,
	readContactResult,
	SEND_FAILED,
} from "./contact.ts";

const valid = {
	name: " Ada Lovelace ",
	email: "ada@example.com",
	subject: "Hello",
	phone: "",
	message: "A real question.",
};
const env = { RESEND_API_KEY: "test-key" };
const post = (body) =>
	new Request("https://ydatalabs.nl/api/contact", {
		method: "POST",
		body: typeof body === "string" ? body : JSON.stringify(body),
	});
const fakeFetch = (status = 200) => {
	const calls = [];
	const fn = async (url, init) => {
		calls.push({ url, init });
		return new Response("{}", { status });
	};
	return { fn, calls };
};

test("accepts valid input and trims it", () => {
	const r = parseContact(valid);
	assert.equal(r.ok, true);
	assert.equal(r.data.name, "Ada Lovelace");
	assert.equal(r.data.phone, "");
});

test("phone may be absent", () => {
	const rest = { ...valid };
	delete rest.phone;
	assert.equal(parseContact(rest).ok, true);
});

test("rejects missing and invalid fields", () => {
	for (const bad of [
		{ ...valid, name: "  " },
		{ ...valid, message: "" },
		{ ...valid, email: "a@b" },
		{ ...valid, email: "a b@c.de" },
		{ ...valid, name: 5 },
		{ ...valid, message: { x: 1 } },
	]) {
		const r = parseContact(bad);
		assert.equal(r.ok, false);
		assert.equal(r.spam, false);
		assert.equal(typeof r.error, "string");
	}
});

test("rejects non-object bodies", () => {
	for (const bad of [null, [], "text", 42, undefined]) {
		assert.equal(parseContact(bad).ok, false);
	}
});

test("enforces length limits", () => {
	assert.equal(parseContact({ ...valid, message: "x".repeat(5000) }).ok, true);
	assert.equal(parseContact({ ...valid, message: "x".repeat(5001) }).ok, false);
	assert.equal(parseContact({ ...valid, name: "x".repeat(101) }).ok, false);
	assert.equal(parseContact({ ...valid, subject: "x".repeat(151) }).ok, false);
	assert.equal(parseContact({ ...valid, phone: "1".repeat(31) }).ok, false);
});

test("collapses line breaks in single-line fields", () => {
	const r = parseContact({ ...valid, subject: "Hi\r\nBcc: evil@example.com" });
	assert.equal(r.ok, true);
	assert.equal(/[\r\n]/.test(r.data.subject), false);
});

test("collapses line breaks in the name, rejects them in the email", () => {
	const r = parseContact({ ...valid, name: "Ada\r\nBcc: evil@example.com" });
	assert.equal(r.ok, true);
	assert.equal(/[\r\n]/.test(r.data.name), false);
	assert.equal(parseContact({ ...valid, email: "ada@example.com\nx@y.zz" }).ok, false);
});

test("honeypot marks spam before other checks", () => {
	const r = parseContact({ ...valid, email: "bad", ref_code: "http://spam" });
	assert.deepEqual(r, { ok: false, spam: true });
});

test("sends one email with the right fields", async () => {
	const f = fakeFetch(200);
	const res = await handleContact(post(valid), env, f.fn);
	assert.equal(res.status, 200);
	assert.deepEqual(await res.json(), { ok: true });
	assert.equal(f.calls.length, 1);
	assert.equal(f.calls[0].url, "https://api.resend.com/emails");
	assert.equal(f.calls[0].init.headers.Authorization, "Bearer test-key");
	const sent = JSON.parse(f.calls[0].init.body);
	assert.deepEqual(sent.to, ["info@ydatalabs.nl"]);
	assert.equal(sent.reply_to, "ada@example.com");
	assert.equal(sent.subject, "[ydatalabs.nl] Hello");
	assert.match(sent.text, /A real question\./);
});

test("spam gives 200 and sends nothing", async () => {
	const f = fakeFetch();
	const res = await handleContact(post({ ...valid, ref_code: "x" }), env, f.fn);
	assert.equal(res.status, 200);
	assert.equal(f.calls.length, 0);
});

test("invalid JSON gives 400", async () => {
	const f = fakeFetch();
	const res = await handleContact(post("{not json"), env, f.fn);
	assert.equal(res.status, 400);
	assert.equal(f.calls.length, 0);
});

test("bad input gives 400 with a sentence", async () => {
	const res = await handleContact(post({ ...valid, email: "nope" }), env, fakeFetch().fn);
	assert.equal(res.status, 400);
	assert.match((await res.json()).error, /email/i);
});

test("missing key gives 500", async () => {
	const f = fakeFetch();
	const res = await handleContact(post(valid), {}, f.fn);
	assert.equal(res.status, 500);
	assert.equal(f.calls.length, 0);
});

test("resend error gives 502", async () => {
	const res = await handleContact(post(valid), env, fakeFetch(500).fn);
	assert.equal(res.status, 502);
	assert.deepEqual(await res.json(), { error: "send_failed" });
});

test("fetch throw gives 502", async () => {
	const boom = async () => {
		throw new Error("network");
	};
	const res = await handleContact(post(valid), env, boom);
	assert.equal(res.status, 502);
});

test("email call carries an abort signal, so a stalled service cannot hang the form", async () => {
	const f = fakeFetch(200);
	await handleContact(post(valid), env, f.fn);
	assert.ok(f.calls[0].init.signal instanceof AbortSignal);
});

test("a honeypot drop is logged without personal data", async (t) => {
	const warn = t.mock.method(console, "warn", () => {});
	await handleContact(post({ ...valid, ref_code: "x" }), env, fakeFetch().fn);
	assert.equal(warn.mock.callCount(), 1);
	assert.equal(/ada|example\.com/i.test(warn.mock.calls[0].arguments.join(" ")), false);
});

test("uses CONTACT_EMAIL and CONTACT_FROM when set", async () => {
	const f = fakeFetch(200);
	const custom = { ...env, CONTACT_EMAIL: "a@b.cd", CONTACT_FROM: "X <x@b.cd>" };
	await handleContact(post(valid), custom, f.fn);
	const sent = JSON.parse(f.calls[0].init.body);
	assert.deepEqual(sent.to, ["a@b.cd"]);
	assert.equal(sent.from, "X <x@b.cd>");
});

test("form shows sent only for a 200 with ok true", async () => {
	assert.deepEqual(await readContactResult(Response.json({ ok: true })), { sent: true });
});

test("form does not show sent for a 200 without ok true", async () => {
	for (const res of [
		new Response("<html>challenge</html>", { status: 200 }),
		Response.json({}),
		Response.json(null),
	]) {
		assert.deepEqual(await readContactResult(res), { sent: false, message: SEND_FAILED });
	}
});

test("form shows the server sentence for a 400", async () => {
	const res = Response.json({ error: "Please enter a valid email address." }, { status: 400 });
	assert.deepEqual(await readContactResult(res), {
		sent: false,
		message: "Please enter a valid email address.",
	});
});

test("form shows the fallback with the email address for 5xx", async () => {
	for (const status of [500, 502]) {
		const res = Response.json({ error: "send_failed" }, { status });
		assert.deepEqual(await readContactResult(res), { sent: false, message: SEND_FAILED });
	}
	assert.match(SEND_FAILED, /info@ydatalabs\.nl/);
});
