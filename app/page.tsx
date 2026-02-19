import { HeroSection } from "@/components/sections/home/hero-section";
import { TestimonialsSection } from "@/components/sections/home/testimonials-section";

export default function Home() {
	return (
		<div className="min-h-screen bg-background">
			<HeroSection />
			<TestimonialsSection />
		</div>
	);
}
