import type { Metadata } from "next";
import "./globals2.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";
export const metadata: Metadata = {
	title: "MerkMetryx - Market Research & Validation",
	description:
		"Full-spectrum market research and product validation firm helping businesses assess demand, feasibility, and market viability.",
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
				<ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
