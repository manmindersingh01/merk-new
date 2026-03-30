import type { Metadata } from "next";
import { CareersHero } from "@/components/sections/careers/CareersHero";
import { OpenPositions } from "@/components/sections/careers/OpenPositions";
import { WhyWorkWithUs } from "@/components/sections/careers/WhyWorkWithUs";

export const metadata: Metadata = {
	title: "Careers at MerkMetryx – Join Our Team",
	description:
		"Explore open positions at MerkMetryx. Join a team building the future of AI-powered market research.",
	alternates: {
		canonical: "/careers",
	},
};

export default function Solutions() {
	return (
		<div className="min-h-screen bg-background">
			<CareersHero />
			<OpenPositions />
			<WhyWorkWithUs />
		</div>
	);
}
