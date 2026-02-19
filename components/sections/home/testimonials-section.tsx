"use client";

import { motion } from "motion/react";
import { Quote } from "lucide-react";

const testimonials = [
	{
		quote:
			"MerkMetryx helped us avoid a costly product launch by identifying a pricing misalignment early.",
		author: "Director of Strategy",
		company: "Manufacturing Firm",
	},
	{
		quote:
			"Their production readiness assessment saved us months of operational setbacks.",
		author: "Founder",
		company: "Consumer Brand",
	},
];

export function TestimonialsSection() {
	return (
		<section className="px-4 py-12 sm:px-6 sm:py-20 md:px-10 lg:px-16">
			<div className="mx-auto max-w-7xl">
				{/* Section heading */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="mb-8 sm:mb-12"
				>
					<p className="text-xs font-semibold uppercase tracking-widest text-primary sm:text-sm">
						Testimonials
					</p>
					<h2 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
						Trusted by decision-makers.
					</h2>
				</motion.div>

				{/* Testimonial cards */}
				<div className="grid gap-4 sm:grid-cols-2">
					{testimonials.map((t, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{
								duration: 0.5,
								delay: i * 0.15,
							}}
							className="flex flex-col justify-between rounded-2xl border border-border/40 bg-card p-6 sm:rounded-3xl sm:p-8 md:rounded-[2rem] md:p-10"
						>
							<div>
								<Quote className="mb-4 size-5 text-primary sm:size-6" />
								<p className="text-base font-medium leading-relaxed text-foreground sm:text-lg md:text-xl">
									&ldquo;{t.quote}&rdquo;
								</p>
							</div>
							<div className="mt-6 flex items-center gap-3 border-t border-border/40 pt-5 sm:mt-8 sm:pt-6">
								<div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary sm:size-10">
									{t.author[0]}
								</div>
								<div>
									<p className="text-sm font-semibold text-foreground">
										{t.author}
									</p>
									<p className="text-xs text-muted-foreground">{t.company}</p>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
