import { ImageResponse } from "next/og";

// Image metadata
export const size = {
	width: 180,
	height: 180,
};
export const contentType = "image/png";

// Image generation
export default function AppleIcon() {
	return new ImageResponse(
		(
			<div
				style={{
					fontSize: 120,
					background: "linear-gradient(135deg, #2F80ED 0%, #26C6DA 100%)",
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					color: "white",
					fontWeight: "900",
					fontFamily: "Arial, sans-serif",
					letterSpacing: "-2px",
					borderRadius: "30px",
				}}
			>
				M
			</div>
		),
		{
			...size,
		}
	);
}
