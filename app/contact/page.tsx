import { ContactHero } from "@/components/sections/contact/contact-hero";
import { ContactMethodsSection } from "@/components/sections/contact/contact-methods-section";
import { ContactFormSection } from "@/components/sections/contact/contact-form-section";
import { OfficeLocationsSection } from "@/components/sections/contact/office-locations-section";
import { SupportChannelsSection } from "@/components/sections/contact/support-channels-section";
import { ContactCtaSection } from "@/components/sections/contact/contact-cta-section";

export default function Contact() {
	return (
		<div className="min-h-screen bg-background">
			<ContactHero />
			<ContactMethodsSection />
			<ContactFormSection />
			<OfficeLocationsSection />
			<SupportChannelsSection />
			<ContactCtaSection />
		</div>
	);
}
