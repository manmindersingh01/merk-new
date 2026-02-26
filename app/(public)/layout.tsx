import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageViewTracker } from "@/components/providers/page-view-tracker";

export default function PublicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<PageViewTracker />
			<Navbar />
			{children}
			<Footer />
		</>
	);
}
