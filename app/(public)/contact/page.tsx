import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/contact/contact-form";
import { Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
	title: "Contact MerkMetryx – Get in Touch",
	description:
		"Reach out to MerkMetryx for a free consultation. Book a demo, discuss your research needs, or get a custom proposal.",
	alternates: {
		canonical: "/contact",
	},
};

const NEXT_STEPS = [
	{
		title: "We review your enquiry",
		desc: "A senior research consultant reads your message and matches you with the right specialist.",
	},
	{
		title: "Discovery call",
		desc: "We schedule a 30-minute call to understand your goals, timeline, and budget.",
	},
	{
		title: "Custom proposal",
		desc: "You receive a tailored research plan with methodology, deliverables, and pricing.",
	},
	{
		title: "Kickoff",
		desc: "Once approved, your project starts — typically within 48 hours.",
	},
];

export default function ContactPage() {
	return (
		<div className="min-h-screen bg-background pt-28 mt-14">
			{/* Hero strip */}
			<section className="border-b border-border/40 bg-card/50 px-6 py-16 text-center md:py-20">
				<p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
					Get in touch
				</p>
				<h1 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
					Let&apos;s Talk About Your Research Needs
				</h1>
				<p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
					Whether you need a quick brand pulse check or a full-scale consumer
					study, our team is ready to help you get answers — fast.
				</p>
			</section>

			{/* Main content */}
			<section className="mx-auto max-w-6xl px-6 py-16">
				<div className="grid gap-12 lg:grid-cols-5">
					{/* Form — takes 3 of 5 columns */}
					<div className="lg:col-span-3">
						<h2 className="mb-6 text-xl font-bold text-foreground">
							Send us a message
						</h2>
						<Suspense>
							<ContactForm />
						</Suspense>
					</div>

					{/* Sidebar info — takes 2 of 5 columns */}
					<div className="flex flex-col gap-8 lg:col-span-2">
						{/* What happens next */}
						<div className="rounded-2xl border border-border/40 bg-card p-6">
							<h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-foreground">
								What happens next
							</h3>
							<ol className="flex flex-col gap-4">
								{NEXT_STEPS.map((step, i) => (
									<li key={i} className="flex gap-3">
										<span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
											{i + 1}
										</span>
										<div>
											<p className="text-sm font-semibold text-foreground">
												{step.title}
											</p>
											<p className="mt-0.5 text-xs text-muted-foreground">
												{step.desc}
											</p>
										</div>
									</li>
								))}
							</ol>
						</div>

						{/* Contact details */}
						<div className="rounded-2xl border border-border/40 bg-card p-6">
							<h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">
								Contact details
							</h3>
							<div className="flex flex-col gap-3">
								<div className="flex items-center gap-3 text-sm text-muted-foreground">
									<Mail className="size-4 shrink-0 text-primary" />
									business@agixinternational.com
								</div>
								<div className="flex items-center gap-3 text-sm text-muted-foreground">
									<MapPin className="size-4 shrink-0 text-primary" />
									606, Vindhya Complex, Sec-11, CBD Belapur, Navi Mumbai,
									Maharashtra 400614, INDIA.
								</div>
								<div className="flex items-center gap-3 text-sm text-muted-foreground">
									<MapPin className="size-4 shrink-0 text-primary" />
									801-4 Apricot Tower, Dubai Silicon Oasis, Dubai, UAE
								</div>
								<div className="flex items-center gap-3 text-sm text-muted-foreground">
									<Clock className="size-4 shrink-0 text-primary" />
									Mon – Fri, 9 am – 6 pm GMT
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
