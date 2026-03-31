/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: "https://merkmetryx.com",
	generateRobotsTxt: false, // We already have a custom robots.ts
	generateIndexSitemap: false,
	exclude: ["/admin/*", "/api/*"],
	robotsTxtOptions: {
		policies: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/admin/", "/api/"],
			},
		],
	},
};
