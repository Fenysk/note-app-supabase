<script setup>
definePageMeta({
    layout: 'dashboard',
})

const supabaseClient = useSupabaseClient()

const user = await supabaseClient.auth.getUser()

const deleteAccount = async () => {
    if (!confirm('Are you sure you want to delete your account?')) return

    // TODO: Delete account

    await supabaseClient.auth.signOut()
    navigateTo('/')
}
</script>

<template>
    <h1>{{ user.data.user.user_metadata.full_name }}</h1>

    <button @click="deleteAccount">Delete my account</button>

    <pre>{{ user }}</pre>
</template>
