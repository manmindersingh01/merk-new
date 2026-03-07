"use client";

import { motion } from "motion/react";
import { Target, Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const sections = [
	{
		icon: Target,
		tag: "Our Vision",
		title:
			"To be the driving force behind the businesses that shape the future through innovation and empirical evidence.",
		description:
			"We envision a world where every strategic decision is backed by rigorous market intelligence. Where launches aren't gambles, but calculated moves validated by real consumer evidence. MerkMetryx exists to make that vision reality — empowering businesses to move faster, with confidence, through evidence-based validation.",
		reverse: false,
	},
	{
		icon: Compass,
		tag: "Our Mission",
		title:
			"To deliver effective digital marketing and research solutions, provide a high-touch customer experience, and reinvest profits into client success and the broader community.",
		description:
			"Every client engagement is built on three pillars: methodological excellence, strategic partnership, and measurable impact. We deliver research intelligence that doesn't sit in a deck — it drives decisions, shapes roadmaps, and validates capital commitments before they're made.",
		reverse: true,
	},
];

export function VisionMissionSection() {
	return (
		<section className="px-4 py-16 sm:px-6 sm:py-24 md:px-10 lg:px-16">
			<div className="mx-auto max-w-6xl">
				{/* Alternating sections */}
				<div className="flex flex-col gap-20 sm:gap-28">
					{sections.map((section, i) => {
						const Icon = section.icon;
						return (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 32 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6 }}
								className={cn(
									"grid items-center gap-10 lg:grid-cols-2 lg:gap-16",
									section.reverse && "lg:[&>*:first-child]:order-2"
								)}
							>
								{/* Text side */}
								<div>
									<div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5">
										<Icon className="size-4 text-primary" />
										<span className="text-xs font-semibold text-primary">
											{section.tag}
										</span>
									</div>
									<h3 className="text-xl font-extrabold leading-snug text-foreground sm:text-2xl md:text-3xl">
										{section.title}
									</h3>
									<p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
										{section.description}
									</p>
								</div>

								{/* Visual side */}
								<div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl">
									<Image
										src={
											i === 0
												? "/vision-mission-section1.png"
												: "/vision-mission-section2.png"
										}
										alt={
											i === 0
												? "MerkMetryx vision - driving force behind businesses that shape the future"
												: "MerkMetryx mission - delivering effective digital marketing and research solutions"
										}
										width={1920}
										height={1080}
										className="w-full h-auto"
										priority={false}
									/>
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
