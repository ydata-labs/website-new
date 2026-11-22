"use client";

import { useState } from "react";
import Link from "next/link";
// Single files, not the "@/components/ui" index: this is a client component,
// and the index also exports the Header, which imports the post data.
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button, ArrowIcon } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { readContactResult, SEND_FAILED } from "@/lib/contact";

interface FormData {
	name: string;
	email: string;
	subject: string;
	phone: string;
	message: string;
	ref_code: string; // honeypot: people never see or fill this
}

const emptyForm: FormData = {
	name: "",
	email: "",
	subject: "",
	phone: "",
	message: "",
	ref_code: "",
};

interface FormStatus {
	type: "idle" | "loading" | "success" | "error";
	message?: string;
}

const fieldClass =
	"w-full rounded-md border border-line-strong bg-page px-3 py-2.5 text-ink transition-colors focus:border-accent";
const labelClass = "mb-1.5 block font-heading text-xs text-muted";

export function Contact() {
	const [formData, setFormData] = useState<FormData>(emptyForm);
	const [status, setStatus] = useState<FormStatus>({ type: "idle" });

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setStatus({ type: "loading" });

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			const result = await readContactResult(response);
			if (result.sent) {
				setStatus({
					type: "success",
					message: "Thank you! Your message has been sent successfully.",
				});
				setFormData(emptyForm);
			} else {
				setStatus({ type: "error", message: result.message });
			}
		} catch {
			setStatus({ type: "error", message: SEND_FAILED });
		}
	};

	return (
		<section id="contact" className="border-t border-line py-16 md:py-24">
			<div className="max-w-xl mx-auto grid gap-12 px-4 md:px-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
				<div>
					<SectionHeader
						eyebrow="contact"
						title="Book a call"
						description="Tell us what you want to build, or where you need advice. A short message is enough."
					/>
					<dl className="mt-10 space-y-6">
						<div>
							<dt className={labelClass}>Email</dt>
							<dd>
								<a
									href="mailto:info@ydatalabs.nl"
									className="inline-flex items-center gap-2 text-accent hover:text-accent-bright transition-colors"
								>
									<Icon name="mail" className="h-4 w-4" />
									info@ydatalabs.nl
								</a>
							</dd>
						</div>
						<div>
							<dt className={labelClass}>Phone</dt>
							<dd>
								<a
									href="tel:+31655518053"
									className="text-ink hover:text-accent transition-colors"
								>
									+31 6 55518053
								</a>
							</dd>
						</div>
						<div>
							<dt className={labelClass}>Location</dt>
							<dd className="text-ink">Maastricht, the Netherlands</dd>
						</div>
					</dl>
				</div>

				<div className="rounded-lg border border-line bg-surface p-6 md:p-8">
					<h3 className="text-h4 mb-6">Send a message</h3>

					<form
						onSubmit={handleSubmit}
						method="post"
						action="/api/contact"
						className="relative space-y-5"
					>
						{/* Honeypot. Off-screen, so people never see or fill it. */}
						<input
							type="text"
							name="ref_code"
							value={formData.ref_code}
							onChange={handleChange}
							tabIndex={-1}
							autoComplete="off"
							aria-hidden="true"
							className="absolute -left-[9999px] h-0 w-0"
						/>
						<div className="grid gap-5 sm:grid-cols-2">
							<label className="block">
								<span className={labelClass}>Full name</span>
								<input
									type="text"
									name="name"
									value={formData.name}
									onChange={handleChange}
									autoComplete="name"
									required
									className={fieldClass}
								/>
							</label>
							<label className="block">
								<span className={labelClass}>Email address</span>
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									autoComplete="email"
									required
									className={fieldClass}
								/>
							</label>
						</div>

						<div className="grid gap-5 sm:grid-cols-2">
							<label className="block">
								<span className={labelClass}>Subject</span>
								<input
									type="text"
									name="subject"
									value={formData.subject}
									onChange={handleChange}
									required
									className={fieldClass}
								/>
							</label>
							<label className="block">
								<span className={labelClass}>Phone number (optional)</span>
								<input
									type="tel"
									name="phone"
									value={formData.phone}
									onChange={handleChange}
									autoComplete="tel"
									className={fieldClass}
								/>
							</label>
						</div>

						<label className="block">
							<span className={labelClass}>Your message</span>
							<textarea
								name="message"
								value={formData.message}
								onChange={handleChange}
								rows={5}
								required
								className={cn(fieldClass, "resize-y")}
							/>
						</label>

						<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
							<p className="text-sm text-muted">
								We use your details only to answer your message. See our{" "}
								<Link
									href="/privacy"
									className="text-accent underline hover:text-accent-bright"
								>
									privacy page
								</Link>
								.
							</p>

							<Button
								type="submit"
								disabled={status.type === "loading"}
								icon={<ArrowIcon />}
								className="shrink-0"
							>
								{status.type === "loading" ? "Sending..." : "Send message"}
							</Button>
						</div>

						{status.type !== "idle" && status.type !== "loading" && (
							<div
								role={status.type === "error" ? "alert" : "status"}
								className={cn(
									"rounded-md border p-4 text-sm",
									status.type === "success" &&
										"border-accent/40 bg-accent/10 text-accent-bright",
									status.type === "error" &&
										"border-danger/40 bg-danger/10 text-danger",
								)}
							>
								{status.message}
							</div>
						)}
					</form>
				</div>
			</div>
		</section>
	);
}
