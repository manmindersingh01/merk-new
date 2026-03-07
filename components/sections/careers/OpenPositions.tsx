"use client";

import { ApplyForm } from "@/components/careers/apply-form";
import { motion } from "motion/react";

export function OpenPositions() {
	return (
		<section className="px-4 py-20 sm:px-6 md:px-10 lg:px-16">
			<div className="mx-auto max-w-5xl">
				{/* Section header */}
				<div className="mb-16 text-center">
					<h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
						Open Positions
					</h2>
					<p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
						Join MerkMetryx and help organizations make better product and
						market decisions using data, analytics, and strategic insights.
					</p>
				</div>

				{/* Job Card */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.4 }}
					className="rounded-2xl bg-card p-8 md:p-10"
				>
					{/* Job Header */}
					<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
						<div>
							<h3 className="text-2xl font-semibold text-foreground">
								Senior Data Analyst
							</h3>

							<p className="text-muted-foreground mt-1">
								MerkMetryx • Data Analytics / Market Intelligence
							</p>
						</div>

						<div className="flex flex-wrap gap-2 text-xs">
							<span className="rounded-full bg-primary/10 px-3 py-1 text-primary font-medium">
								5 – 15 Years Experience
							</span>

							<span className="rounded-full bg-muted px-3 py-1 text-muted-foreground">
								Full-Time
							</span>

							<span className="rounded-full bg-muted px-3 py-1 text-muted-foreground">
								Location: Remote / TBD
							</span>
						</div>
					</div>

					{/* About Role */}
					<div className="mt-10 space-y-4">
						<h4 className="text-lg font-semibold text-foreground">
							About the Role
						</h4>

						<p className="text-muted-foreground leading-relaxed">
							MerkMetryx is seeking a highly skilled and experienced Senior Data
							Analyst to join our growing analytics team. The ideal candidate
							will have strong expertise in data analysis, statistical modeling,
							data visualization, and business intelligence.
						</p>

						<p className="text-muted-foreground leading-relaxed">
							In this role, you will transform complex datasets into actionable
							insights that support strategic decision-making, market
							intelligence, and business growth. The candidate should possess
							strong analytical thinking, advanced technical skills, and the
							ability to communicate insights effectively to stakeholders.
						</p>
					</div>

					{/* Responsibilities */}
					<div className="mt-10">
						<h4 className="text-lg font-semibold text-foreground mb-4">
							Key Responsibilities
						</h4>

						<ul className="space-y-3 text-muted-foreground list-disc ml-4">
							<li>Analyze large datasets to identify patterns and trends.</li>
							<li>
								Translate complex data into meaningful insights for business
								stakeholders.
							</li>
							<li>
								Conduct exploratory data analysis (EDA) to uncover opportunities
								and risks.
							</li>
							<li>
								Develop dashboards and reports using business intelligence
								tools.
							</li>
							<li>
								Build predictive models and forecasting tools using advanced
								analytical techniques.
							</li>
							<li>
								Support product, marketing, and leadership teams with
								data-driven insights.
							</li>
							<li>
								Collaborate with engineers and analysts to improve data
								infrastructure.
							</li>
						</ul>
					</div>

					{/* Skills */}
					<div className="mt-10">
						<h4 className="text-lg font-semibold text-foreground mb-4">
							Required Skills
						</h4>

						<ul className="grid gap-3 sm:grid-cols-2 text-muted-foreground">
							<li>Advanced Excel</li>
							<li>Power BI / Tableau / Looker</li>
							<li>Data Visualization</li>
							<li>Statistical Analysis</li>
							<li>Machine Learning Concepts</li>
							<li>ETL & Data Warehousing</li>
							<li>Big Data Technologies</li>
							<li>Business Intelligence</li>
						</ul>
					</div>

					{/* Education */}
					<div className="mt-10">
						<h4 className="text-lg font-semibold text-foreground mb-4">
							Education
						</h4>

						<p className="text-muted-foreground">
							Bachelor’s or Master’s degree in Data Science, Statistics,
							Mathematics, Computer Science, Economics, Business Analytics, or
							Engineering. A Master’s degree is preferred.
						</p>
					</div>

					{/* Competencies */}
					<div className="mt-10">
						<h4 className="text-lg font-semibold text-foreground mb-4">
							Key Competencies
						</h4>

						<div className="flex flex-wrap gap-2">
							{[
								"Analytical Thinking",
								"Data Storytelling",
								"Problem Solving",
								"Strategic Thinking",
								"Business Intelligence",
								"Attention to Detail",
							].map((skill) => (
								<span
									key={skill}
									className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
								>
									{skill}
								</span>
							))}
						</div>
					</div>

					{/* What we offer */}
					<div className="mt-10">
						<h4 className="text-lg font-semibold text-foreground mb-4">
							What We Offer
						</h4>

						<ul className="space-y-3 text-muted-foreground list-disc ml-4">
							<li>
								Opportunity to work on large-scale data analytics projects.
							</li>
							<li>Collaborative and innovative work environment.</li>
							<li>Career growth in data science and advanced analytics.</li>
						</ul>
					</div>

					{/* Apply section */}
					<div className="mt-12 rounded-xl bg-muted/40 p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
						<div>
							<h5 className="font-semibold text-foreground">
								Interested in this role?
							</h5>

							<p className="text-sm text-muted-foreground">
								Send your resume and portfolio to apply for this position.
							</p>
						</div>
						{/* TODO:
						Replace this with resume upload + form submission.
						Include resume file + applicant details.
						*/}
						<ApplyForm appliedFor="Senior Data Analyst" />
					</div>
				</motion.div>
			</div>
		</section>
	);
}
