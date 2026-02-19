"use client";

import { motion } from "motion/react";
import { Quote } from "lucide-react";

const testimonials = [
	{
		quote:
			"MerkMetryx helped us avoid a costly product launch by identifying a pricing misalignment early. The depth of insight we received in 48 hours would have taken our internal team three months.",
		author: "Sarah Mitchell",
		role: "Director of Strategy",
		company: "Global Manufacturing Firm",
		initial: "S",
	},
	{
		quote:
			"Their production readiness assessment saved us months of operational setbacks. For the first time, we had data that the board actually trusted to make a go/no-go decision.",
		author: "James Okafor",
		role: "Founder & CEO",
		company: "Consumer Brand",
		initial: "J",
	},
	{
		quote:
			"The competitive intelligence module completely changed how we approach product positioning. We now know exactly where our competitors are vulnerable — before they do.",
		author: "Priya Nair",
		role: "VP of Marketing",
		company: "B2B SaaS Company",
		initial: "P",
	},
	{
		quote:
			"We validated demand for our new healthcare product across three markets in under a week. The NLP analysis of open-ended responses was particularly revelatory — things we never would have found in a spreadsheet.",
		author: "Dr. Thomas Berger",
		role: "Chief Strategy Officer",
		company: "Healthcare Technology Group",
		initial: "T",
	},
];

export function TestimonialsSection() {
	return (
		<section className="bg-card/40 px-4 py-16 sm:px-6 sm:py-24 md:px-10 lg:px-16">
			<div className="mx-auto max-w-7xl">
				{/* Heading */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="mb-12 sm:mb-16"
				>
					<p className="text-xs font-semibold uppercase tracking-widest text-primary sm:text-sm">
						Client Testimonials
					</p>
					<h2 className="mt-2 max-w-2xl text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
						Trusted by the decision-makers who act on it.
					</h2>
					<p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
						From startups validating their first product to enterprise teams
						entering new markets — here is what our clients say.
					</p>
				</motion.div>

				{/* Testimonial cards */}
				<div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
					{testimonials.map((t, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: i * 0.1 }}
							className="flex flex-col justify-between rounded-2xl border border-border/40 bg-card p-6 sm:rounded-3xl sm:p-8"
						>
							<div>
								<Quote className="mb-4 size-5 text-primary sm:size-6" />
								<p className="text-sm font-medium leading-relaxed text-foreground sm:text-base md:text-lg">
									&ldquo;{t.quote}&rdquo;
								</p>
							</div>
							<div className="mt-6 flex items-center gap-3 border-t border-border/40 pt-5 sm:mt-8 sm:pt-6">
								<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
									{t.initial}
								</div>
								<div>
									<p className="text-sm font-semibold text-foreground">
										{t.author}
									</p>
									<p className="text-xs text-muted-foreground">
										{t.role}, {t.company}
									</p>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
