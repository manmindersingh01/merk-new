import type { Metadata } from "next";
import "./globals2.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";
export const metadata: Metadata = {
	title: "MerkMetryx: AI-Powered Market Research & Product Validation Platform",
	description:
		"MerkMetryx helps brands to make smarter decisions with AI-powered market research, consumer insights, demand forecasting, and competitive intelligence. Validate products, optimize marketing, and grow faster with data-driven insights.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
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
