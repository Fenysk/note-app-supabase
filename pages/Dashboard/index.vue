<script setup lang="ts">
definePageMeta({
    layout: "dashboard",
});

import type { PostType } from "@/entities/post";

const supabaseClient = useSupabaseClient();

const {data: { session }} = await supabaseClient.auth.getSession();

const { data: posts } = await useAsyncData("scheduled-posts", async () => {
    const { data } = await supabaseClient
        .from("scheduled-posts")
        .select("*, posts-ready(*)")
        .eq("user_id", session?.user.id)
        .order("created_at");
    return data as PostType[];
});

const scheduledPosts = computed(() => posts.value?.filter(post => post['posts-ready'] === null));
</script>

<template>
    <div>
        <h1>Dashboard</h1>

        <p v-if="!scheduledPosts.length">You have no scheduled posts.</p>
        <p v-else>You have {{ scheduledPosts.length }} scheduled posts.</p>
    </div>
</template>
