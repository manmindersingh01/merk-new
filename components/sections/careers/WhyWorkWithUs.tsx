"use client";

import { motion } from "motion/react";

const benefits = [
	{
		title: "Meaningful Work",
		description:
			"Work on research and analytics that directly influence product strategy, market positioning, and real-world business decisions.",
	},
	{
		title: "Solve Complex Problems",
		description:
			"Analyze large datasets, uncover hidden insights, and build analytical frameworks that shape how companies launch and improve products.",
	},
	{
		title: "Collaborative Environment",
		description:
			"Collaborate with analysts, researchers, strategists, and engineers who care deeply about thoughtful decision-making and high-quality insights.",
	},
	{
		title: "Career Growth",
		description:
			"Grow your expertise in data analytics, market intelligence, and advanced analytical methods while working on challenging projects.",
	},
	{
		title: "Innovation-Driven Culture",
		description:
			"We encourage experimentation, new ideas, and analytical curiosity. Great insights often come from asking better questions.",
	},
	{
		title: "Build the Future of Market Intelligence",
		description:
			"Join a company focused on improving how organizations validate ideas, understand markets, and launch better products.",
	},
];

export function WhyWorkWithUs() {
	return (
		<section className="px-4 py-24 sm:px-6 md:px-10 lg:px-16">
			<div className="mx-auto max-w-6xl">
				{/* Header */}
				<div className="text-center mb-16">
					<h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
						Why Work With Us
					</h2>

					<p className="mt-4 mx-auto max-w-2xl text-muted-foreground">
						At MerkMetryx, we combine analytical thinking, market research, and
						data science to help companies make smarter decisions. If you enjoy
						solving complex problems with data, you'll feel at home here.
					</p>
				</div>

				{/* Cards */}
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{benefits.map((benefit, index) => (
						<motion.div
							key={benefit.title}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.4, delay: index * 0.05 }}
							className="rounded-2xl bg-card p-6"
						>
							<h3 className="text-lg font-semibold text-foreground">
								{benefit.title}
							</h3>

							<p className="mt-3 text-sm leading-relaxed text-muted-foreground">
								{benefit.description}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
