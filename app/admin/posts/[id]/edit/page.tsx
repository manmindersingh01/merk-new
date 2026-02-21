import { supabase } from "@/lib/supabase";
import { PostForm } from "@/components/admin/post-form";
import { Post } from "@/types/blog";
import { notFound } from "next/navigation";

interface EditPostPageProps {
	params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
	const { id } = await params;

	const { data: post, error } = await supabase
		.from("posts")
		.select("*")
		.eq("id", id)
		.single();

	if (error || !post) notFound();

	return <PostForm post={post as Post} />;
}
