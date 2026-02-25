import { supabaseAdmin as supabase } from "@/lib/supabase-admin";
import { PostsTable } from "@/components/admin/posts-table";
import { Post } from "@/types/blog";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Globe, FileEdit } from "lucide-react";

export default async function PostsAdminPage() {
	const { data } = await supabase
		.from("posts")
		.select("*")
		.order("created_at", { ascending: false });

	const all: Post[] = data ?? [];
	const published = all.filter((p) => p.published).length;
	const drafts = all.filter((p) => !p.published).length;

	return (
		<div>
			{/* Header */}
			<div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h1 className="text-2xl font-extrabold tracking-tight text-foreground">
						Blog Posts
					</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						Manage your blog posts and insights.
					</p>
				</div>
				<Link href="/admin/posts/new">
					<Button size="sm" className="rounded-xl px-5 font-medium">
						<Plus className="mr-1 size-4" />
						New Post
					</Button>
				</Link>
			</div>

			{/* Stats */}
			<div className="mb-8 grid grid-cols-3 gap-4">
				{[
					{ icon: FileText, label: "Total", value: all.length },
					{ icon: Globe, label: "Published", value: published },
					{ icon: FileEdit, label: "Drafts", value: drafts },
				].map((stat) => {
					const Icon = stat.icon;
					return (
						<div
							key={stat.label}
							className="rounded-2xl border border-border/40 bg-card px-5 py-4"
						>
							<div className="mb-2 flex size-8 items-center justify-center rounded-lg bg-primary/10">
								<Icon className="size-4 text-primary" />
							</div>
							<p className="text-2xl font-extrabold text-foreground">
								{stat.value}
							</p>
							<p className="text-xs text-muted-foreground">{stat.label}</p>
						</div>
					);
				})}
			</div>

			<PostsTable posts={all} />
		</div>
	);
}
