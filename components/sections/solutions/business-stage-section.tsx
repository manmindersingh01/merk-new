"use client";

import { motion } from "motion/react";
import { Separator } from "@/components/ui/separator";

const stages = [
	{
		stage: "Startups",
		description: "Validate before raising capital.",
	},
	{
		stage: "Growth Companies",
		description: "Assess expansion into new markets.",
	},
	{
		stage: "Enterprises",
		description: "Test innovation initiatives before full-scale deployment.",
	},
	{
		stage: "Investors & Private Equity",
		description: "Independent feasibility and commercial due diligence.",
	},
];

export function BusinessStageSection() {
	return (
		<section className="pb-32 md:pb-40">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				{/* Heading */}
				<div className="text-center mb-28">
					<h2 className="group text-center text-4xl md:text-6xl font-bold mb-20">
						Solutions By{" "}
						<span className="relative inline-block text-primary">
							Business Stage
							<span
								className="absolute left-0 -bottom-2 h-1 w-0 
                     bg-linear-to-r from-primary to-primary/60
                     transition-all duration-500 ease-out
                     group-hover:w-full"
							/>
						</span>
					</h2>
				</div>

				{/* Alternating Split Layout */}
				<div className="space-y-32">
					{stages.map((stage, idx) => {
						const isReversed = idx % 2 !== 0;

						return (
							<motion.div
								key={idx}
								initial={{ opacity: 0, y: 60 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.4 }}
								transition={{ duration: 0.6, ease: "easeOut" }}
								className={`relative grid md:grid-cols-2 items-center gap-12 md:gap-20 ${
									isReversed ? "md:[&>*:first-child]:order-2" : ""
								}`}
							>
								{/* Large Background Number */}
								<div className="relative">
									<div className="absolute -top-10 md:-top-16 left-0 text-[100px] md:text-[160px] font-bold text-primary/10 select-none pointer-events-none">
										0{idx + 1}
									</div>

									<div className="relative">
										<h3 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
											{stage.stage}
										</h3>
										<p className="text-muted-foreground text-lg leading-relaxed max-w-md">
											{stage.description}
										</p>
									</div>
								</div>

								{/* Subtle Divider Line (Desktop Only) */}
								<div className="hidden md:block h-px bg-border w-full" />
							</motion.div>
						);
					})}
				</div>

				<Separator className="mt-32" />
			</div>
		</section>
	);
}
