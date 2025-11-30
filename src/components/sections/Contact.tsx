"use client";

import { useState } from "react";
import { SectionHeader, Button, ArrowIcon } from "@/components/ui";
import { cn } from "@/lib/cn";

interface FormData {
	name: string;
	email: string;
	subject: string;
	phone: string;
	message: string;
}

interface FormStatus {
	type: "idle" | "loading" | "success" | "error";
	message?: string;
}

export function Contact() {
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		subject: "",
		phone: "",
		message: "",
	});
	const [status, setStatus] = useState<FormStatus>({ type: "idle" });
	const [agreed, setAgreed] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!agreed) {
			setStatus({
				type: "error",
				message: "Please agree to the terms before submitting.",
			});
			return;
		}

		setStatus({ type: "loading" });

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				setStatus({
					type: "success",
					message: "Thank you! Your message has been sent successfully.",
				});
				setFormData({ name: "", email: "", subject: "", phone: "", message: "" });
				setAgreed(false);
			} else {
				throw new Error("Failed to send message");
			}
		} catch {
			setStatus({
				type: "error",
				message: "Something went wrong. Please try again or email us directly.",
			});
		}
	};

	return (
		<section id="contact" className="py-20 lg:py-28 bg-white relative overflow-hidden">
			{/* Background decoration */}
			<div className="absolute top-0 left-0 w-full h-2/3 bg-gradient-to-b from-slate-bg to-transparent" />
			<div className="absolute bottom-0 left-0 w-full">
				<div className="absolute inset-0 bg-dot-pattern opacity-20" />
			</div>

			<div className="container-xl mx-auto px-4 md:px-8 relative z-10">
				<div className="max-w-5xl mx-auto">
					<div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
						{/* Contact Form */}
						<div className="lg:col-span-3">
							<div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 lg:p-10">
								<h2 className="text-h3 text-navy mb-8">Send a message</h2>

								<form onSubmit={handleSubmit} className="space-y-6">
									<div className="grid sm:grid-cols-2 gap-6">
										<div>
											<input
												type="text"
												name="name"
												value={formData.name}
												onChange={handleChange}
												placeholder="Full name"
												required
												className="w-full px-0 py-3 border-b-2 border-slate-200 bg-transparent focus:border-teal focus:outline-none transition-colors placeholder:text-slate-400"
											/>
										</div>
										<div>
											<input
												type="email"
												name="email"
												value={formData.email}
												onChange={handleChange}
												placeholder="Email address"
												required
												className="w-full px-0 py-3 border-b-2 border-slate-200 bg-transparent focus:border-teal focus:outline-none transition-colors placeholder:text-slate-400"
											/>
										</div>
									</div>

									<div className="grid sm:grid-cols-2 gap-6">
										<div>
											<input
												type="text"
												name="subject"
												value={formData.subject}
												onChange={handleChange}
												placeholder="Subject"
												required
												className="w-full px-0 py-3 border-b-2 border-slate-200 bg-transparent focus:border-teal focus:outline-none transition-colors placeholder:text-slate-400"
											/>
										</div>
										<div>
											<input
												type="tel"
												name="phone"
												value={formData.phone}
												onChange={handleChange}
												placeholder="Phone number (optional)"
												className="w-full px-0 py-3 border-b-2 border-slate-200 bg-transparent focus:border-teal focus:outline-none transition-colors placeholder:text-slate-400"
											/>
										</div>
									</div>

									<div>
										<textarea
											name="message"
											value={formData.message}
											onChange={handleChange}
											placeholder="Your message"
											rows={4}
											required
											className="w-full px-0 py-3 border-b-2 border-slate-200 bg-transparent focus:border-teal focus:outline-none transition-colors placeholder:text-slate-400 resize-none"
										/>
									</div>

									<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
										<label className="flex items-start gap-3 cursor-pointer">
											<input
												type="checkbox"
												checked={agreed}
												onChange={(e) => setAgreed(e.target.checked)}
												className="sr-only peer"
											/>
											<span className="w-5 h-5 rounded border-2 border-slate-300 flex items-center justify-center flex-shrink-0 mt-0.5 peer-checked:bg-teal peer-checked:border-teal transition-colors">
												<svg
													className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
													strokeWidth={3}
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M5 13l4 4L19 7"
													/>
												</svg>
											</span>
											<span className="text-sm text-slate-500">
												By clicking, you agree to our terms and consent to
												cookie usage.
											</span>
										</label>

										<Button
											type="submit"
											variant="primary"
											disabled={status.type === "loading"}
											icon={<ArrowIcon />}
										>
											{status.type === "loading" ? "Sending..." : "Send Message"}
										</Button>
									</div>

									{/* Status message */}
									{status.type !== "idle" && status.type !== "loading" && (
										<div
											className={cn(
												"p-4 rounded-lg text-sm",
												status.type === "success" &&
													"bg-emerald/10 text-emerald",
												status.type === "error" && "bg-rose/10 text-rose"
											)}
										>
											{status.message}
										</div>
									)}
								</form>
							</div>
						</div>

						{/* Contact Info */}
						<div className="lg:col-span-2">
							<div className="sticky top-32">
								<SectionHeader
									eyebrow="Get in Touch"
									title="Let's Talk"
									description="Ready to transform your healthcare data into actionable insights? Let's discuss how yDataLabs can help drive innovation in your organization."
									centered={false}
									className="mb-10"
								/>

								<div className="space-y-8">
									<div>
										<h4 className="font-heading font-semibold text-navy mb-2">
											Our Location
										</h4>
										<p className="text-slate-600">Maastricht, Netherlands</p>
									</div>

									<div>
										<h4 className="font-heading font-semibold text-navy mb-2">
											Email Address
										</h4>
										<a
											href="mailto:info@ydatalabs.nl"
											className="text-teal hover:text-teal-dark transition-colors link-underline"
										>
											info@ydatalabs.nl
										</a>
									</div>

									<div>
										<h4 className="font-heading font-semibold text-navy mb-2">
											Phone Number
										</h4>
										<a
											href="tel:+31655518053"
											className="text-slate-600 hover:text-navy transition-colors"
										>
											+31 6 55518053
										</a>
									</div>
								</div>

								{/* Quick contact card */}
								<div className="mt-10 p-6 bg-gradient-to-br from-teal to-teal-dark rounded-2xl text-white">
									<h4 className="font-heading font-semibold mb-2">
										Prefer email?
									</h4>
									<p className="text-white/80 text-sm mb-4">
										Drop us a line directly and we&apos;ll get back to you
										within 24 hours.
									</p>
									<a
										href="mailto:info@ydatalabs.nl"
										className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
									>
										<svg
											className="w-4 h-4"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											strokeWidth={2}
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
											/>
										</svg>
										info@ydatalabs.nl
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

