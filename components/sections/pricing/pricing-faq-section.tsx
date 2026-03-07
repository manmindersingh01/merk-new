"use client";

import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const faqs = [
	{
		question: "What is Merkmetryx?",
		answer:
			"Merkmetryx is a market research platform that helps businesses understand customers through reliable insights and data analysis. We conduct both online and offline research to provide a complete view of the market.",
	},
	{
		question: "What services does Merkmetryx provide?",
		answer:
			"Merkmetryx offers market surveys, consumer research, brand analysis, and data-driven insights. We help companies make better decisions based on real customer feedback.",
	},
	{
		question: "Does Merkmetryx conduct offline surveys?",
		answer:
			"Yes, Merkmetryx conducts offline surveys through trained surveyors who interact directly with respondents. These face-to-face interviews help collect authentic and detailed market insights.",
	},
	{
		question: "How are offline interviews conducted?",
		answer:
			"Our professional surveyors conduct structured interviews with respondents in targeted locations. This method helps capture genuine opinions and accurate field data.",
	},
	{
		question: "Who analyzes the survey results?",
		answer:
			"Our experienced research team carefully analyzes the collected data from both online and offline surveys. They transform responses into meaningful insights and actionable reports.",
	},
	{
		question: "Why are offline surveys important in market research?",
		answer:
			"Offline surveys help reach audiences who may not be active online. They provide deeper and more realistic insights from real-world consumers.",
	},
	{
		question: "What industries can benefit from Merkmetryx research?",
		answer:
			"Merkmetryx supports industries such as FMCG, retail, healthcare, technology, and startups. Our research helps businesses understand customer preferences and market trends.",
	},
	{
		question: "How does Merkmetryx ensure data accuracy?",
		answer:
			"We use trained surveyors, structured questionnaires, and professional data validation processes. This ensures reliable, unbiased, and high-quality research results.",
	},
	{
		question: "How long does a research project usually take?",
		answer:
			"The timeline depends on the research scope and sample size. Most projects are completed within a few days to a few weeks.",
	},
	{
		question: "Why choose Merkmetryx for market research?",
		answer:
			"Merkmetryx combines technology, expert researchers, and field surveyors to deliver reliable insights. We help businesses turn real market data into smart strategies.",
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
