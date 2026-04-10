import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "MerkMetryx - AI-Powered Market Research",
		short_name: "MerkMetryx",
		description:
			"AI-powered market research and product validation platform helping brands make smarter, data-driven decisions.",
		start_url: "/",
		display: "standalone",
		background_color: "#ffffff",
		theme_color: "#2F80ED",
		icons: [
			{
				src: "/icon-192.png",
				sizes: "192x192",
				type: "image/png",
				purpose: "maskable",
			},
			{
				src: "/icon-512.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "maskable",
			},
		],
	};
}
