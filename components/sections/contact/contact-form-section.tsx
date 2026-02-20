"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export function ContactFormSection() {
	return (
		<section id="form" className="bg-card/40 px-4 py-16 sm:px-6 sm:py-24 md:px-10 lg:px-16">
			<div className="mx-auto max-w-3xl">
				{/* Heading */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="mb-8 text-center sm:mb-12"
				>
					<p className="text-xs font-semibold uppercase tracking-widest text-primary sm:text-sm">
						Send Us a Message
					</p>
					<h2 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
						We'll respond within 24 hours.
					</h2>
				</motion.div>

				{/* Form Card */}
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="rounded-2xl border border-border/40 bg-card p-6 sm:rounded-3xl sm:p-10"
				>
					<form className="space-y-6">
						{/* Name */}
						<div>
							<label
								htmlFor="name"
								className="mb-2 block text-sm font-semibold text-foreground"
							>
								Full Name
							</label>
							<input
								type="text"
								id="name"
								name="name"
								required
								className="w-full rounded-xl border border-border/40 bg-background px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
								placeholder="John Doe"
							/>
						</div>

						{/* Email */}
						<div>
							<label
								htmlFor="email"
								className="mb-2 block text-sm font-semibold text-foreground"
							>
								Work Email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								required
								className="w-full rounded-xl border border-border/40 bg-background px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
								placeholder="john@company.com"
							/>
						</div>

						{/* Company */}
						<div>
							<label
								htmlFor="company"
								className="mb-2 block text-sm font-semibold text-foreground"
							>
								Company
							</label>
							<input
								type="text"
								id="company"
								name="company"
								required
								className="w-full rounded-xl border border-border/40 bg-background px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
								placeholder="Acme Inc."
							/>
						</div>

						{/* Industry */}
						<div>
							<label
								htmlFor="industry"
								className="mb-2 block text-sm font-semibold text-foreground"
							>
								Industry
							</label>
							<select
								id="industry"
								name="industry"
								required
								className="w-full rounded-xl border border-border/40 bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
							>
								<option value="">Select your industry</option>
								<option value="retail">Retail & E-commerce</option>
								<option value="healthcare">Healthcare & Life Sciences</option>
								<option value="technology">Technology & SaaS</option>
								<option value="finance">Financial Services</option>
								<option value="consumer">Consumer Goods & CPG</option>
								<option value="other">Other</option>
							</select>
						</div>

						{/* Research Challenge */}
						<div>
							<label
								htmlFor="message"
								className="mb-2 block text-sm font-semibold text-foreground"
							>
								Research Challenge
							</label>
							<textarea
								id="message"
								name="message"
								rows={5}
								required
								className="w-full rounded-xl border border-border/40 bg-background px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
								placeholder="Tell us about your research needs, market challenges, or what you're looking to validate..."
							/>
						</div>

						{/* Launch Timeline */}
						<div>
							<label
								htmlFor="timeline"
								className="mb-2 block text-sm font-semibold text-foreground"
							>
								Launch Timeline
							</label>
							<select
								id="timeline"
								name="timeline"
								required
								className="w-full rounded-xl border border-border/40 bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
							>
								<option value="">When do you need insights?</option>
								<option value="immediate">Immediate (within 2 weeks)</option>
								<option value="1-3months">1-3 months</option>
								<option value="3-6months">3-6 months</option>
								<option value="exploring">Exploring options</option>
							</select>
						</div>

						{/* Submit Button */}
						<div className="pt-4">
							<Button size="lg" className="w-full rounded-xl font-medium">
								<Send className="mr-2 size-4" />
								Send Message
							</Button>
							<p className="mt-3 text-center text-xs text-muted-foreground">
								We'll respond within 24 hours. Your information is kept
								confidential.
							</p>
						</div>
					</form>
				</motion.div>
			</div>
		</section>
	);
}
