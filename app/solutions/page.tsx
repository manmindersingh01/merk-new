import { SolutionsHero } from "@/components/sections/solutions/solutions-hero";
import { IndustrySection } from "@/components/sections/solutions/industry-section";
import { BusinessStageSection } from "@/components/sections/solutions/business-stage-section";
import { UseCasesSection } from "@/components/sections/solutions/use-cases-section";

export default function Solutions() {
	return (
		<div className="min-h-screen bg-background">
			<SolutionsHero />
			<IndustrySection />
			<BusinessStageSection />
			<UseCasesSection />
		</div>
	);
}
