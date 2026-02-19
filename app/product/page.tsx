import { ProductHero } from "@/components/sections/product/product-hero";
import { PlatformTiersSection } from "@/components/sections/product/platform-tiers-section";
import { FeatureSpotlightSection } from "@/components/sections/product/feature-spotlight-section";
import { ResearchMethodsSection } from "@/components/sections/product/research-methods-section";
import { DataPipelineSection } from "@/components/sections/product/data-pipeline-section";
import { IntegrationsSection } from "@/components/sections/product/integrations-section";
import { ProductCtaSection } from "@/components/sections/product/product-cta-section";

export default function Product() {
	return (
		<div className="min-h-screen bg-background">
			<ProductHero />
			<PlatformTiersSection />
			<FeatureSpotlightSection />
			<ResearchMethodsSection />
			<DataPipelineSection />
			<IntegrationsSection />
			<ProductCtaSection />
		</div>
	);
}
