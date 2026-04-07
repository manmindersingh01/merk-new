import type { Metadata } from "next";
import Script from "next/script";
import "./globals2.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";
export const metadata: Metadata = {
	metadataBase: new URL("https://merkmetryx.com"),
	title: {
		default:
			"MerkMetryx – AI-Powered Market Research & Product Validation Platform",
		template: "%s | MerkMetryx",
	},
	description:
		"MerkMetryx helps brands make smarter decisions with AI-powered market research, consumer insights, demand forecasting, and competitive intelligence. Validate products, optimize marketing, and grow faster with data-driven insights.",
	keywords: [
		"market research",
		"AI market research",
		"consumer insights",
		"product validation",
		"competitive intelligence",
		"demand forecasting",
		"market analysis",
		"B2B research platform",
	],
	authors: [{ name: "MerkMetryx" }],
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://merkmetryx.com",
		siteName: "MerkMetryx",
		title: "MerkMetryx – AI-Powered Market Research & Product Validation",
		description:
			"Make smarter decisions with AI-powered market research, consumer insights, and competitive intelligence.",
		images: [
			{
				url: "https://merkmetryx.com/og-image.png",
				width: 1200,
				height: 630,
				alt: "MerkMetryx - AI-Powered Market Research Platform",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "MerkMetryx – AI-Powered Market Research",
		description:
			"Make smarter decisions with AI-powered market research, consumer insights, and competitive intelligence.",
		images: ["https://merkmetryx.com/og-image.png"],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@graph": [
								{
									"@type": "Organization",
									"@id": "https://merkmetryx.com/#organization",
									name: "MerkMetryx",
									url: "https://merkmetryx.com",
									logo: "https://merkmetryx.com/logo.svg",
									description:
										"AI-powered market research and product validation platform helping brands make smarter, data-driven decisions.",
									contactPoint: {
										"@type": "ContactPoint",
										email: "business@agixinternational.com",
										contactType: "sales",
									},
									sameAs: [
										"https://www.linkedin.com/company/merkmetryx",
										"https://twitter.com/merkmetryx",
									],
									address: [
										{
											"@type": "PostalAddress",
											streetAddress:
												"606, Vindhya Complex, Sec-11, CBD Belapur",
											addressLocality: "Navi Mumbai",
											addressRegion: "Maharashtra",
											postalCode: "400614",
											addressCountry: "IN",
										},
										{
											"@type": "PostalAddress",
											streetAddress: "801-4 Apricot Tower, Dubai Silicon Oasis",
											addressLocality: "Dubai",
											addressCountry: "AE",
										},
									],
								},
								{
									"@type": "WebSite",
									"@id": "https://merkmetryx.com/#website",
									url: "https://merkmetryx.com",
									name: "MerkMetryx",
									publisher: {
										"@id": "https://merkmetryx.com/#organization",
									},
									potentialAction: {
										"@type": "SearchAction",
										target: {
											"@type": "EntryPoint",
											urlTemplate:
												"https://merkmetryx.com/search?q={search_term_string}",
										},
										"query-input": "required name=search_term_string",
									},
								},
							],
						}),
					}}
				/>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
					rel="stylesheet"
				/>
				<link rel="manifest" href="/manifest.json" />
				<Script
					src="https://www.googletagmanager.com/gtag/js?id=G-JJBQMQPW0C"
					strategy="afterInteractive"
				/>
				<Script id="google-analytics" strategy="afterInteractive">
					{`window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', 'G-JJBQMQPW0C');`}
				</Script>
			</head>
			<body className="antialiased">
				<Toaster position="top-right" />
				<ThemeProvider defaultTheme="light" storageKey="theme">
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
