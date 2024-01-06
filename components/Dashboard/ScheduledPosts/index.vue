<script setup lang="ts">
import type PostType from "@/entities/post";

const supabaseClient = useSupabaseClient();

const {data: { session }} = await supabaseClient.auth.getSession();

const { data: posts } = await useAsyncData("scheduled-posts", async () => {
    const { data } = await supabaseClient
        .from("scheduled-posts")
        .select("*, posts-ready(*)")
        .eq("user_id", session?.user?.id)
        .order("created_at");
    return data as PostType[];
});

const scheduledPosts = computed(() => posts.value?.filter(post => post['posts-ready'] === null));
</script>

<template>
    <div>
        <ul v-if="scheduledPosts">
            <li v-for="post in scheduledPosts" :key="post.id">
                <DashboardPost :post="post" />
            </li>
        </ul>
    </div>
</template>
