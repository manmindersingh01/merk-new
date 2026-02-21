import { supabase } from "@/lib/supabase";
import { PostsTable } from "@/components/admin/posts-table";
import { Post } from "@/types/blog";
import Link from "next/link";
import { Plus, FileText, Globe, FileEdit, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminPage() {
	const [{ data: posts }, { data: leads }] = await Promise.all([
		supabase.from("posts").select("*").order("created_at", { ascending: false }),
		supabase.from("leads").select("id, created_at"),
	]);

	const allPosts: Post[] = posts ?? [];
	const published = allPosts.filter((p) => p.published).length;
	const drafts = allPosts.filter((p) => !p.published).length;
	const totalLeads = (leads ?? []).length;

	return (
		<div>
			{/* Page header */}
			<div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h1 className="text-2xl font-extrabold tracking-tight text-foreground">
						Dashboard
					</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						Manage your blog posts and leads.
					</p>
				</div>
				<Link href="/admin/posts/new">
					<Button size="sm" className="rounded-xl px-5 font-medium">
						<Plus className="mr-1 size-4" />
						New Post
					</Button>
				</Link>
			</div>

			{/* Stats row */}
			<div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
				{[
					{ icon: FileText, label: "Total Posts", value: allPosts.length },
					{ icon: Globe, label: "Published", value: published },
					{ icon: FileEdit, label: "Drafts", value: drafts },
					{ icon: Users, label: "Leads", value: totalLeads, href: "/admin/leads" },
				].map((stat) => {
					const Icon = stat.icon;
					const card = (
						<div className="rounded-2xl border border-border/40 bg-card px-5 py-4 transition-colors hover:border-border/60">
							<div className="mb-2 flex size-8 items-center justify-center rounded-lg bg-primary/10">
								<Icon className="size-4 text-primary" />
							</div>
							<p className="text-2xl font-extrabold text-foreground">
								{stat.value}
							</p>
							<p className="text-xs text-muted-foreground">{stat.label}</p>
						</div>
					);
					return stat.href ? (
						<Link key={stat.label} href={stat.href}>
							{card}
						</Link>
					) : (
						<div key={stat.label}>{card}</div>
					);
				})}
			</div>

			{/* Posts table */}
			<div className="mb-2 flex items-center justify-between">
				<h2 className="text-base font-bold text-foreground">Blog Posts</h2>
				<Link
					href="/admin/posts/new"
					className="text-xs font-semibold text-primary hover:underline"
				>
					+ New post
				</Link>
			</div>
			<PostsTable posts={allPosts} />
		</div>
	);
}
