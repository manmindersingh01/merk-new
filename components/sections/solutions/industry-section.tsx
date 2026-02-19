"use client";

import { Separator } from "@/components/ui/separator";
import { motion } from "motion/react";

const industries = [
	{
		title: "High-Regulation Sectors",
		items: ["Healthcare", "FinTech"],
	},
	{
		title: "High-Competition Markets",
		items: ["FMCG", "Retail"],
	},
	{
		title: "Innovation-Driven Industries",
		items: ["Tech", "SaaS"],
	},
	{
		title: "Capital-Intensive Sectors",
		items: ["Manufacturing"],
	},
];

export function IndustrySection() {
	return (
		<section className="pb-28 md:pb-36">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<h2 className="group text-center text-4xl md:text-6xl font-bold mb-20">
					Solutions By{" "}
					<span className="relative inline-block text-primary">
						Industry
						<span
							className="absolute left-0 -bottom-2 h-1 w-0 
                     bg-linear-to-r from-primary to-primary/60
                     transition-all duration-500 ease-out
                     group-hover:w-full"
						/>
					</span>
				</h2>

				<motion.div
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10"
				>
					<Card position="tl" {...industries[0]} />
					<Card position="tr" {...industries[1]} />
					<Card position="bl" {...industries[2]} />
					<Card position="br" {...industries[3]} />
				</motion.div>

				<Separator className="mt-32" />
			</div>
		</section>
	);
}

interface CardProps {
	title: string;
	items: string[];
	position: "tl" | "tr" | "bl" | "br";
}

function Card({ title, items, position }: CardProps) {
	const cornerStyles = {
		tl: "md:rounded-tl-[60px] md:rounded-br-[20px]",
		tr: "md:rounded-tr-[60px] md:rounded-bl-[20px]",
		bl: "md:rounded-bl-[60px] md:rounded-tr-[20px]",
		br: "md:rounded-br-[60px] md:rounded-tl-[20px]",
	};

	return (
		<div
			className={`
				group
				bg-card
				p-10 md:p-14
				rounded-2xl
				${cornerStyles[position]}
				min-h-65 md:min-h-75
				flex flex-col justify-center
				text-center md:text-left
				transition-all duration-300
				hover:scale-[1.02]
				hover:shadow-lg
			`}
		>
			<h3
				className="
					text-2xl md:text-3xl
					font-bold
					mb-6
					leading-tight
					transition-colors duration-300
					group-hover:text-primary
				"
			>
				{title}
			</h3>

			<ul className="space-y-3">
				{items.map((item, idx) => (
					<li key={idx} className="text-base md:text-lg text-muted-foreground">
						{item}
					</li>
				))}
			</ul>
		</div>
	);
}
