import { HeroSection } from "@/components/sections/home/hero-section";
import { LogosSection } from "@/components/sections/home/logos-section";
import { StatsSection } from "@/components/sections/home/stats-section";
import { HowItWorksSection } from "@/components/sections/home/how-it-works-section";
import { ServicesSection } from "@/components/sections/home/services-section";
import { ForWhoSection } from "@/components/sections/home/for-who-section";
import { IndustriesSection } from "@/components/sections/home/industries-section";
import { AiFeaturesSection } from "@/components/sections/home/ai-features-section";
import { SecuritySection } from "@/components/sections/home/security-section";
import { TestimonialsSection } from "@/components/sections/home/testimonials-section";
import { PricingSection } from "@/components/sections/home/pricing-section";
import { CtaSection } from "@/components/sections/home/cta-section";

export default function Home() {
	return (
		<div className="min-h-screen bg-background">
			<HeroSection />
			<LogosSection />
			<StatsSection />
			<HowItWorksSection />
			<ServicesSection />
			<ForWhoSection />
			<IndustriesSection />
			<AiFeaturesSection />
			<SecuritySection />
			<TestimonialsSection />
			{/* <PricingSection /> */}
			<CtaSection />
		</div>
	);
}
