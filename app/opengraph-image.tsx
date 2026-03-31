import { ImageResponse } from "next/og";

// Image metadata
export const alt = "MerkMetryx - AI-Powered Market Research Platform";
export const size = {
	width: 1200,
	height: 630,
};
export const contentType = "image/png";

// Image generation
export default async function OgImage() {
	return new ImageResponse(
		<div
			style={{
				background: "linear-gradient(135deg, #0F1419 0%, #1a1a2e 100%)",
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				padding: "60px",
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					textAlign: "center",
				}}
			>
				<h1
					style={{
						fontSize: 72,
						fontWeight: "bold",
						color: "white",
						marginBottom: 20,
						lineHeight: 1.2,
					}}
				>
					MerkMetryx
				</h1>
				<p
					style={{
						fontSize: 32,
						color: "#a0a0a0",
						marginTop: 0,
						maxWidth: 900,
						lineHeight: 1.4,
					}}
				>
					AI-Powered Market Research & Product Validation Platform
				</p>
				<div
					style={{
						display: "flex",
						gap: 20,
						marginTop: 40,
						fontSize: 20,
						color: "#666",
					}}
				>
					<span>Consumer Insights</span>
					<span>•</span>
					<span>Competitive Intelligence</span>
					<span>•</span>
					<span>Demand Forecasting</span>
				</div>
			</div>
		</div>,
		{
			...size,
		}
	);
}
