// Pricing data structure parsed from app/MD/Pricing.md

export interface PricingTier {
	id: "basic" | "growth" | "professional" | "enterprise";
	name: string;
	tagline: string;
	featured: boolean;
	recommendedFor: string;
	responsesPerMonth: string;
	users: string;
	highlights: string[];
	cta: string;
	ctaHref: string;
}

export interface ComparisonFeature {
	category?: string; // Optional category header
	feature: string;
	basic: string | boolean;
	growth: string | boolean;
	professional: string | boolean;
	enterprise: string | boolean;
}

export const pricingTiers: PricingTier[] = [
	{
		id: "basic",
		name: "Basic",
		tagline: "For Early-Stage Research",
		featured: false,
		recommendedFor: "Small teams, pilot studies",
		responsesPerMonth: "Up to 1,000",
		users: "Up to 5",
		highlights: [
			"Standard research types & criteria",
			"Core dashboards and CSV exports",
			"Standard targeting and quality controls",
			"Onboarding and email support",
			"Basic demographics targeting",
			"Limited survey templates",
		],
		cta: "Request Quote",
		ctaHref: "/contact?plan=Basic&source=pricing_page",
	},
	{
		id: "growth",
		name: "Growth",
		tagline: "Most Popular",
		featured: true,
		recommendedFor: "Agencies, Small and Medium-sized Businesses",
		responsesPerMonth: "Up to 10,000",
		users: "Up to 15",
		highlights: [
			"Full research types & criteria",
			"Survey Link (CAWI)",
			"AI Insights & Summaries",
			"Live Fieldwork Tracking",
			"Advanced dashboards",
			"Excel, CSV, PDF exports",
			"Priority email + chat support",
		],
		cta: "Request Quote",
		ctaHref: "/contact?plan=Growth&source=pricing_page",
	},
	{
		id: "professional",
		name: "Professional",
		tagline: "High-Volume Research",
		featured: false,
		recommendedFor: "Large Firm",
		responsesPerMonth: "Up to 50,000",
		users: "Up to 30",
		highlights: [
			"Advanced + Custom dashboards",
			"All export formats",
			"Behaviour + Interests targeting",
			"Bot + Fraud detection",
			"Custom surveys & templates",
			"Full AI predictive analytics",
			"Dedicated account manager",
		],
		cta: "Request Quote",
		ctaHref: "/contact?plan=Professional&source=pricing_page",
	},
	{
		id: "enterprise",
		name: "Enterprise",
		tagline: "Custom Infrastructure",
		featured: false,
		recommendedFor: "Corporates",
		responsesPerMonth: "Custom",
		users: "Unlimited",
		highlights: [
			"Custom dashboards + API access",
			"All formats + API exports",
			"Custom audience segments",
			"Enterprise-grade validation",
			"Custom AI models",
			"Real-time reports + Alerts",
			"Senior Manager + SLA",
		],
		cta: "Request Quote",
		ctaHref: "/contact?plan=Enterprise&source=pricing_page",
	},
];

export const comparisonFeatures: ComparisonFeature[] = [
	{
		feature: "Recommended For",
		basic: "Small teams, pilot studies",
		growth: "Agencies, Small and Medium-sized Businesses",
		professional: "Large Firm",
		enterprise: "Corporates",
	},
	{
		feature: "Responses / Month",
		basic: "Up to 1,000",
		growth: "Up to 10,000",
		professional: "Up to 50,000",
		enterprise: "Custom",
	},
	{
		feature: "Users",
		basic: "Up to 5",
		growth: "Up to 15",
		professional: "Up to 30",
		enterprise: "Unlimited",
	},
	{
		feature: "Research Types & Criteria",
		basic: "Standard",
		growth: "Full",
		professional: "Full",
		enterprise: "Custom",
	},
	{
		feature: "Survey Link (CAWI)",
		basic: false,
		growth: true,
		professional: true,
		enterprise: true,
	},
	{
		feature: "AI Insights & Summaries",
		basic: false,
		growth: true,
		professional: true,
		enterprise: true,
	},
	{
		feature: "Live Fieldwork Tracking",
		basic: false,
		growth: true,
		professional: true,
		enterprise: true,
	},
	{
		feature: "Dashboards & Reports",
		basic: "Core",
		growth: "Advanced",
		professional: "Advanced + Custom",
		enterprise: "Custom + API",
	},
	{
		feature: "Exports",
		basic: "CSV",
		growth: "Excel, CSV, PDF",
		professional: "All formats",
		enterprise: "All + API",
	},
	{
		feature: "Role-based Access",
		basic: "Limited",
		growth: "Full",
		professional: "Full",
		enterprise: "Custom",
	},
	{
		feature: "Support",
		basic: "Email",
		growth: "Priority email + chat",
		professional: "Priority support",
		enterprise: "Dedicated manager + Service Level Agreement",
	},
	{
		feature: "Onboarding & Training",
		basic: true,
		growth: true,
		professional: true,
		enterprise: true,
	},
	{
		feature: "Data Storage",
		basic: "Standard",
		growth: "High",
		professional: "Very High",
		enterprise: "Custom",
	},
	{
		feature: "Audience Targeting Filters",
		basic: "Basic demographics",
		growth: "Demographics + Location",
		professional: "Behaviour + Interests",
		enterprise: "Custom Segments",
	},
	{
		feature: "Sample Quality Controls",
		basic: "Standard",
		growth: "Bot detection",
		professional: "Bot + Fraud detection",
		enterprise: "Enterprise-grade validation",
	},
	{
		feature: "Multi-language Surveys",
		basic: false,
		growth: "Limited",
		professional: "Custom",
		enterprise: "Custom Localisation",
	},
	{
		feature: "Survey Templates Library",
		basic: "Limited",
		growth: "Full access",
		professional: "Custom",
		enterprise: "Industry-specific",
	},
	{
		feature: "AI Predictive Analytics",
		basic: false,
		growth: "Limited",
		professional: "Full",
		enterprise: "Custom Models",
	},
	{
		feature: "Scheduled Reports",
		basic: false,
		growth: "Weekly",
		professional: "Custom",
		enterprise: "Real-time + Alerts",
	},
	{
		feature: "Audit Logs & Activity Tracking",
		basic: false,
		growth: false,
		professional: true,
		enterprise: "Advanced + Export",
	},
	{
		feature: "Dedicated Account Manager",
		basic: false,
		growth: false,
		professional: true,
		enterprise: "Senior Manager + Service Level Agreement",
	},
];

export const valueProps: string[] = [
	"Transparent structure — no hidden scaling penalties",
	"AI-powered insights without enterprise lock-in",
	"Built-in quality control and fraud detection",
	"Designed for both agencies and corporates",
	"Scales from 1,000 to 50,000+ responses seamlessly",
];
