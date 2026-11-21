import { test } from "node:test";
import assert from "node:assert/strict";
import { parseContact, handleContact } from "./contact.ts";

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
