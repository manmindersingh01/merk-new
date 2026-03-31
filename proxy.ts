import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const host = request.headers.get("host");

	// REDIRECT: www.merkmetryx.com → merkmetryx.com (SEO canonical)
	if (host?.startsWith("www.")) {
		const newHost = host.replace("www.", "");
		const newUrl = new URL(request.url);
		newUrl.host = newHost;
		return NextResponse.redirect(newUrl, { status: 301 });
	}

	// Build response with x-pathname header so layout can detect login route
	const requestHeaders = new Headers(request.headers);
	requestHeaders.set("x-pathname", pathname);

	const response = NextResponse.next({
		request: { headers: requestHeaders },
	});
	response.headers.set("x-pathname", pathname);

	// Admin authentication - only for /admin/* routes
	if (pathname.startsWith("/admin")) {
		// Login page is always accessible
		if (pathname === "/admin/login") return response;

		// Protect all other /admin/* routes
		const session = request.cookies.get("admin-session")?.value;
		if (!session || session !== "authenticated") {
			return NextResponse.redirect(new URL("/admin/login", request.url));
		}
	}

	return response;
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico, sitemap.xml, robots.txt (metadata files)
		 * - public folder files
		 */
		"/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|icon.png|apple-icon.png|manifest.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
	],
};
