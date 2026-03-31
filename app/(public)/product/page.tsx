import { ProductHero } from "@/components/sections/product/product-hero";
import { PlatformTiersSection } from "@/components/sections/product/platform-tiers-section";
import { FeatureSpotlightSection } from "@/components/sections/product/feature-spotlight-section";
import { ResearchMethodsSection } from "@/components/sections/product/research-methods-section";
import { DataPipelineSection } from "@/components/sections/product/data-pipeline-section";
import { IntegrationsSection } from "@/components/sections/product/integrations-section";
import { ProductCtaSection } from "@/components/sections/product/product-cta-section";
import { Metadata } from "next";

export const metadata: Metadata = {
	title:
		"MerkMetryx AI Tools – AI Survey Builder, Sentiment Analysis & Predictive Insights",
	description:
		"Discover MerkMetryx's AI tools - AI Survey Builder, NLP Sentiment Engine, Predictive Analytics, and Natural Language Querying to collect different viewpoints, predict demand, and take faster, smarter decisions.",
	alternates: {
		canonical: "/product",
	},
};

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
