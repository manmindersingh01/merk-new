import type { Metadata } from "next";
import "./globals2.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";
export const metadata: Metadata = {
	metadataBase: new URL("https://www.merkmetryx.com"),
	title: {
		default:
			"MerkMetryx – AI-Powered Market Research & Product Validation Platform",
		template: "%s | MerkMetryx",
	},
	description:
		"MerkMetryx helps brands make smarter decisions with AI-powered market research, consumer insights, demand forecasting, and competitive intelligence. Validate products, optimize marketing, and grow faster with data-driven insights.",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://www.merkmetryx.com",
		siteName: "MerkMetryx",
		title: "MerkMetryx – AI-Powered Market Research & Product Validation",
		description:
			"Make smarter decisions with AI-powered market research, consumer insights, and competitive intelligence.",
	},
	twitter: {
		card: "summary_large_image",
		title: "MerkMetryx – AI-Powered Market Research",
		description:
			"Make smarter decisions with AI-powered market research, consumer insights, and competitive intelligence.",
	},
	alternates: {
		canonical: "https://www.merkmetryx.com",
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
									"@id": "https://www.merkmetryx.com/#organization",
									name: "MerkMetryx",
									url: "https://www.merkmetryx.com",
									logo: "https://www.merkmetryx.com/logo.svg",
									description:
										"AI-powered market research and product validation platform helping brands make smarter, data-driven decisions.",
									contactPoint: {
										"@type": "ContactPoint",
										email: "business@agixinternational.com",
										contactType: "sales",
									},
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
											streetAddress:
												"801-4 Apricot Tower, Dubai Silicon Oasis",
											addressLocality: "Dubai",
											addressCountry: "AE",
										},
									],
								},
								{
									"@type": "WebSite",
									"@id": "https://www.merkmetryx.com/#website",
									url: "https://www.merkmetryx.com",
									name: "MerkMetryx",
									publisher: {
										"@id": "https://www.merkmetryx.com/#organization",
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
