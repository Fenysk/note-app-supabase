<script setup lang="ts">
const supabaseClient = useSupabaseClient();

const {
    data: { session },
} = await supabaseClient.auth.getSession();
</script>

<template>
    <header>
        <nav>
            <ul>
                <li><NuxtLink to="/">Threads Deck</NuxtLink></li>
                <li v-if="session"><NuxtLink to="/dashboard">Dashboard</NuxtLink></li>
            </ul>
        </nav>
    </header>
</template>
