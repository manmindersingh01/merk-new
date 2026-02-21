import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Build response with x-pathname header so layout can detect login route
	const requestHeaders = new Headers(request.headers);
	requestHeaders.set("x-pathname", pathname);

	const response = NextResponse.next({
		request: { headers: requestHeaders },
	});
	response.headers.set("x-pathname", pathname);

	// Login page is always accessible
	if (pathname === "/admin/login") return response;

	// Protect all other /admin/* routes
	const session = request.cookies.get("admin-session")?.value;
	if (!session || session !== "authenticated") {
		return NextResponse.redirect(new URL("/admin/login", request.url));
	}

	return response;
}

export const config = {
	matcher: "/admin/:path*",
};
