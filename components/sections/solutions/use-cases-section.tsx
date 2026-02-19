"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const useCases = [
	"New product launch validation",
	"Market entry assessment",
	"Consumer preference studies",
	"Pricing optimization",
	"Feasibility studies for capital investments",
	"Expansion strategy validation",
];

export function UseCasesSection() {
	return (
		<section className="pb-32 md:pb-40">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="grid lg:grid-cols-2 gap-20 items-start"
				>
					{/* Left Column — Heading + Intro */}
					<div>
						<h2 className="group text-4xl md:text-6xl font-bold leading-tight">
							Key{" "}
							<span className="relative inline-block text-primary">
								Use Cases
								<span
									className="absolute left-0 -bottom-2 h-1 w-0 
									bg-linear-to-r from-primary to-primary/60
									transition-all duration-500 ease-out
									group-hover:w-full"
								/>
							</span>
						</h2>

						<p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-md">
							Practical applications where structured validation reduces
							uncertainty and supports confident strategic decisions.
						</p>
					</div>

					{/* Right Column — Clean List */}
					<div className="space-y-8">
						{useCases.map((text, idx) => (
							<motion.div
								key={idx}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{
									duration: 0.4,
									delay: idx * 0.05,
								}}
								className="group"
							>
								<div className="flex items-start gap-6">
									<div className="text-sm font-medium text-primary mt-1">
										0{idx + 1}
									</div>

									<h3
										className="
											text-lg md:text-xl
											font-medium
											leading-relaxed
											transition-colors duration-300
											group-hover:text-primary
										"
									>
										{text}
									</h3>
								</div>
							</motion.div>
						))}
					</div>
				</motion.div>

				{/* CTA */}
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.3 }}
					className="mt-28 flex justify-center"
				>
					<Button
						size="lg"
						className="px-10 py-6 text-sm font-medium rounded-full hover:cursor-pointer hover:bg-foreground"
					>
						View Solutions
					</Button>
				</motion.div>
				<Separator className="mt-32" />
			</div>
		</section>
	);
}
