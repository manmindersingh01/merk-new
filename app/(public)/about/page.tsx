import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/about/about-hero";
import { VisionMissionSection } from "@/components/sections/about/vision-mission-section";
import { CoreValuesSection } from "@/components/sections/about/core-values-section";
import { LeadershipSection } from "@/components/sections/about/leadership-section";
import { PlatformStatsSection } from "@/components/sections/about/platform-stats-section";
import { DifferentiationSection } from "@/components/sections/about/differentiation-section";
import { AboutCtaSection } from "@/components/sections/about/about-cta-section";

export const metadata: Metadata = {
	title: "About MerkMetryx – Our Mission, Vision & Team",
	description:
		"Learn about MerkMetryx, our mission to deliver actionable market research and strategic insights, our core values, and the team behind the platform.",
	alternates: {
		canonical: "/about",
	},
	openGraph: {
		url: "https://merkmetryx.com/about",
	},
};

export default function About() {
	return (
		<div className="min-h-screen bg-background">
			<AboutHero />
			<VisionMissionSection />
			<CoreValuesSection />
			<LeadershipSection />
			<PlatformStatsSection />
			<DifferentiationSection />
			{/* <CareersSection /> */}
			<AboutCtaSection />
		</div>
	);
}
