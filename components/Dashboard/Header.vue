<script setup lang="ts">
const supabaseClient = useSupabaseClient();

const { data, error } = await supabaseClient.auth.getUser();
if (error) navigateTo("/");
const user = computed(() => data.user?.user_metadata);

const handleSignOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) return;
    navigateTo("/");
};
</script>

<template>
    <header>
        <ul>
            <li>
                <NuxtLink to="/dashboard/posts/scheduled">Scheduled posts</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/dashboard/posts/new">Create new post</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/dashboard/account">{{ user?.nickname }}</NuxtLink>
            </li>
        </ul>

        <button @click="handleSignOut">Sign out</button>
    </header>
</template>
