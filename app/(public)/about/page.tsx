import { AboutHero } from "@/components/sections/about/about-hero";
import { VisionMissionSection } from "@/components/sections/about/vision-mission-section";
import { CoreValuesSection } from "@/components/sections/about/core-values-section";
import { LeadershipSection } from "@/components/sections/about/leadership-section";
import { PlatformStatsSection } from "@/components/sections/about/platform-stats-section";
import { DifferentiationSection } from "@/components/sections/about/differentiation-section";
import { AboutCtaSection } from "@/components/sections/about/about-cta-section";

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
