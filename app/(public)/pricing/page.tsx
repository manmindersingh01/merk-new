import { PricingHeroSection } from "@/components/sections/pricing/pricing-hero-section";
import { PricingTiersSection } from "@/components/sections/pricing/pricing-tiers-section";
import { EnterpriseSection } from "@/components/sections/pricing/enterprise-section";
import { PricingPhilosophySection } from "@/components/sections/pricing/pricing-philosophy-section";
import { PricingFaqSection } from "@/components/sections/pricing/pricing-faq-section";
import { PricingCtaSection } from "@/components/sections/pricing/pricing-cta-section";

export default function Pricing() {
	return (
		<div className="min-h-screen bg-background">
			<PricingHeroSection />
			<PricingTiersSection />
			<EnterpriseSection />
			<PricingPhilosophySection />
			<PricingFaqSection />
			<PricingCtaSection />
		</div>
	);
}
