import { SolutionsHero } from "@/components/sections/solutions/solutions-hero";
import { IndustrySolutionsSection } from "@/components/sections/solutions/industry-solutions-section";
import { RoleSolutionsSection } from "@/components/sections/solutions/role-solutions-section";
import { UseCasesSection } from "@/components/sections/solutions/use-cases-section";
import { SolutionsCtaSection } from "@/components/sections/solutions/solutions-cta-section";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "MerkMetryx Solutions – Market Sizing, Competitor Analysis & Consumer Insights",
	description:
		"Discover MerkMetryx solutions for market sizing, competitor analysis, consumer insights, concept testing, and pricing sensitivity. Make confident, data-driven decisions with our AI-powered research platform.",
};

export default function Solutions() {
	return (
		<div className="min-h-screen bg-background">
			<SolutionsHero />
			<IndustrySolutionsSection />
			<RoleSolutionsSection />
			<UseCasesSection />
			<SolutionsCtaSection />
		</div>
	);
}
