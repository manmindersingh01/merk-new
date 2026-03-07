"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/app/actions/track-page-view";

export function PageViewTracker() {
	const pathname = usePathname();
	const lastTracked = useRef<string | null>(null);

	useEffect(() => {
		if (pathname === lastTracked.current) return;
		lastTracked.current = pathname;

		const referrer = typeof document !== "undefined" ? document.referrer : null;
		trackPageView(pathname, referrer);
	}, [pathname]);

	return null;
}
