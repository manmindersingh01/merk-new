"use client";

import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const faqs = [
	{
		question: "What happens if I exceed my plan limits?",
		answer:
			"We'll notify you before any overage charges. You can upgrade mid-cycle or purchase additional capacity.",
	},
	{
		question: "Can I change plans at any time?",
		answer:
			"Yes. Upgrade instantly. Downgrades take effect at your next billing cycle with prorated refunds.",
	},
	{
		question: "Do you offer educational or nonprofit discounts?",
		answer:
			"Yes. Contact sales@merkmetryx.com with proof of status for up to 30% off.",
	},
	{
		question: "What payment methods do you accept?",
		answer:
			"Credit card, ACH transfer, and invoicing for annual contracts.",
	},
	{
		question: "Is there a free trial?",
		answer:
			"Starter plan includes a free tier. Growth and Professional offer 14-day trials.",
	},
	{
		question: "What's included in 'dedicated support'?",
		answer:
			"Professional and Enterprise plans include a dedicated account manager, priority response SLAs, and custom training.",
	},
];

export function PricingFaqSection() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	return (
		<section className="bg-card/40 px-4 py-16 sm:px-6 sm:py-24 md:px-10 lg:px-16">
			<div className="mx-auto max-w-3xl">
				{/* Heading */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="mb-12 text-center sm:mb-16"
				>
					<p className="text-xs font-semibold uppercase tracking-widest text-primary sm:text-sm">
						FAQ
					</p>
					<h2 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
						Common questions about pricing.
					</h2>
					<p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
						Have a question not answered here? Contact our sales team.
					</p>
				</motion.div>

				{/* FAQ Items */}
				<div className="space-y-4">
					{faqs.map((faq, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: i * 0.05 }}
							className="rounded-2xl border border-border/40 bg-card"
						>
							<button
								onClick={() => setOpenIndex(openIndex === i ? null : i)}
								className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-muted/20"
							>
								<span className="text-sm font-semibold text-foreground sm:text-base">
									{faq.question}
								</span>
								<ChevronDown
									className={cn(
										"size-5 shrink-0 text-muted-foreground transition-transform duration-300",
										openIndex === i && "rotate-180"
									)}
								/>
							</button>
							<div
								className={cn(
									"overflow-hidden transition-all duration-300",
									openIndex === i ? "max-h-40" : "max-h-0"
								)}
							>
								<p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
									{faq.answer}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
